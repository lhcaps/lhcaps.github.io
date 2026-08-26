import { execFileSync } from "node:child_process"
import { lstat, readFile, rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { canonicalJson, discoverRegularFiles, parseJsonNoDuplicateKeys, sha256Bytes } from "./digest.mjs"
import { assertCurrentIso, assertExactKeys, repositoryIdentity, writeJsonAtomic } from "./release-utils.mjs"

const RULE_KEYS = ["schemaVersion", "rulesVersion", "commitMessageRules", "pathRules", "textRules", "binaryPolicy", "allowedExactCommitLines", "generatedEvidenceRoots"]
const GENERATED_ROOTS = ["artifacts/release", "test-results", "playwright-report", ".playwright-cli", "artifacts/screenshots"]
const RECEIPT_RELATIVE = "artifacts/release/history-audit-receipt.v1.json"

function gitBuffer(args, root) {
  return execFileSync("git", args, { cwd: root, encoding: "buffer", maxBuffer: 128 * 1024 * 1024 })
}

export function compileRules(records, label) {
  if (!Array.isArray(records)) throw new Error(`${label}:NOT_ARRAY`)
  const ids = new Set()
  return records.map((record) => {
    assertExactKeys(record, ["id", "pattern", "flags"], label)
    if (typeof record.id !== "string" || !/^[a-z0-9-]+$/.test(record.id) || ids.has(record.id)) throw new Error(`${label}:ID_INVALID`)
    if (typeof record.pattern !== "string" || typeof record.flags !== "string" || !/^[im]*$/.test(record.flags)) throw new Error(`${label}:REGEX_INVALID`)
    ids.add(record.id)
    return { id: record.id, expression: new RegExp(record.pattern, record.flags) }
  })
}

function addFinding(findings, ruleId) {
  findings.set(ruleId, (findings.get(ruleId) ?? 0) + 1)
}

export function scanText(text, rules, findings, allowedExactLines = new Set()) {
  for (const rule of rules) {
    if (!rule.expression.test(text)) continue
    if (allowedExactLines.size > 0) {
      const unsafeLine = text.split(/\r?\n/).some((line) => rule.expression.test(line) && !allowedExactLines.has(line))
      if (!unsafeLine) continue
    }
    addFinding(findings, rule.id)
  }
}

export function scanPath(relativePath, rules, findings) {
  for (const rule of rules) if (rule.expression.test(relativePath)) addFinding(findings, rule.id)
}

function decodeText(buffer) {
  if (buffer.includes(0)) return null
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer)
  } catch {
    return null
  }
}

function signatureFor(buffer, signatures) {
  const hex = buffer.subarray(0, 16).toString("hex")
  return signatures.find((signature) => hex.startsWith(signature.hexPrefix))
}

export function validateBinary(buffer, relativePath, scope, policy, findings) {
  const extension = path.extname(relativePath).toLowerCase()
  const signature = signatureFor(buffer, policy.magicSignatures)
  const signatureExtension = signature?.extension === ".jpg" && extension === ".jpeg" ? ".jpeg" : signature?.extension
  if (!signature || (signatureExtension !== extension && !(signature.extension === ".jpg" && extension === ".jpeg"))) {
    addFinding(findings, `binary-magic-mismatch-${scope}`)
    return
  }
  const allowed = scope === "current"
    ? policy.allowedCurrentExtensions
    : scope === "generated"
      ? policy.allowedGeneratedExtensions
      : policy.allowedHistoricalExtensions
  if (!allowed.includes(extension)) addFinding(findings, `binary-extension-rejected-${scope}`)
  if ((scope === "current" || scope === "generated") && policy.forbiddenCurrentExtensions.includes(extension)) {
    addFinding(findings, `binary-forbidden-${scope}`)
  }
}

function parseTree(buffer) {
  return buffer.toString("utf8").split("\0").filter(Boolean).map((entry) => {
    const match = entry.match(/^[0-7]+ blob ([a-f0-9]{40})\t([\s\S]+)$/)
    if (!match) throw new Error("HISTORY_TREE_RECORD_INVALID")
    return { sha: match[1], path: match[2].split(path.sep).join("/") }
  })
}

export function validateRules(rules) {
  assertExactKeys(rules, RULE_KEYS, "HISTORY_RULES")
  if (rules.schemaVersion !== 1 || rules.rulesVersion !== "systems-atlas-history-safety-v1") throw new Error("HISTORY_RULES_VERSION_INVALID")
  if (JSON.stringify(rules.allowedExactCommitLines) !== JSON.stringify(["Co-authored-by: Cursor <cursoragent@cursor.com>"])) {
    throw new Error("HISTORY_ALLOWED_LINE_INVALID")
  }
  if (JSON.stringify(rules.generatedEvidenceRoots) !== JSON.stringify(GENERATED_ROOTS)) throw new Error("HISTORY_GENERATED_ROOTS_INVALID")
  assertExactKeys(rules.binaryPolicy, ["allowedHistoricalExtensions", "allowedCurrentExtensions", "allowedGeneratedExtensions", "forbiddenCurrentExtensions", "magicSignatures", "rejectUnknownCurrentBinary"], "HISTORY_BINARY_POLICY")
  if (rules.binaryPolicy.rejectUnknownCurrentBinary !== true || !Array.isArray(rules.binaryPolicy.magicSignatures)) throw new Error("HISTORY_BINARY_POLICY_INVALID")
  for (const signature of rules.binaryPolicy.magicSignatures) {
    assertExactKeys(signature, ["id", "extension", "hexPrefix"], "HISTORY_MAGIC_SIGNATURE")
    if (!/^[a-f0-9]+$/.test(signature.hexPrefix) || signature.hexPrefix.length % 2 !== 0) throw new Error("HISTORY_MAGIC_SIGNATURE_INVALID")
  }
}

export async function verifyHistory(root = process.cwd()) {
  const identity = repositoryIdentity({ requireClean: false, requireNonShallow: true })
  const receiptPath = path.join(root, ...RECEIPT_RELATIVE.split("/"))
  await rm(receiptPath, { force: true })
  const rules = parseJsonNoDuplicateKeys(await readFile(path.join(root, "docs", "release", "history-safe-patterns.v1.json"), "utf8"))
  validateRules(rules)
  const messageRules = compileRules(rules.commitMessageRules, "HISTORY_MESSAGE_RULE")
  const pathRules = compileRules(rules.pathRules, "HISTORY_PATH_RULE")
  const textRules = compileRules(rules.textRules, "HISTORY_TEXT_RULE")
  const findings = new Map()
  const commits = execFileSync("git", ["rev-list", "HEAD"], { cwd: root, encoding: "utf8" }).trim().split(/\r?\n/).filter(Boolean)
  const blobs = new Map()
  const historicalPaths = new Set()
  const currentPaths = new Set()

  for (const commit of commits) {
    const message = execFileSync("git", ["show", "-s", "--format=%B", commit], { cwd: root, encoding: "utf8" })
    scanText(message, messageRules, findings, new Set(rules.allowedExactCommitLines))
    for (const entry of parseTree(gitBuffer(["ls-tree", "-r", "-z", "--full-tree", commit], root))) {
      historicalPaths.add(entry.path)
      if (commit === identity.sha) currentPaths.add(entry.path)
      const record = blobs.get(entry.sha) ?? { paths: new Set(), current: false }
      record.paths.add(entry.path)
      if (commit === identity.sha) record.current = true
      blobs.set(entry.sha, record)
    }
  }

  for (const relativePath of historicalPaths) scanPath(relativePath, pathRules, findings)
  for (const [blobSha, record] of blobs) {
    const buffer = gitBuffer(["cat-file", "blob", blobSha], root)
    const text = decodeText(buffer)
    if (text !== null) {
      scanText(text, textRules, findings)
      continue
    }
    const paths = [...record.paths]
    const currentPath = paths.find((candidate) => currentPaths.has(candidate))
    validateBinary(buffer, currentPath ?? paths[0], currentPath ? "current" : "historical", rules.binaryPolicy, findings)
  }

  for (const generatedRoot of GENERATED_ROOTS) {
    const absolute = path.join(root, ...generatedRoot.split("/"))
    try {
      const stats = await lstat(absolute)
      if (!stats.isDirectory() || stats.isSymbolicLink()) throw new Error("HISTORY_GENERATED_ROOT_INVALID")
    } catch (error) {
      if (error?.code === "ENOENT") continue
      throw error
    }
    for (const record of await discoverRegularFiles(absolute)) {
      const qualifiedPath = `${generatedRoot}/${record.path}`
      scanPath(qualifiedPath, pathRules, findings)
      const text = decodeText(record.data)
      if (text !== null) scanText(text, textRules, findings)
      else validateBinary(record.data, qualifiedPath, "generated", rules.binaryPolicy, findings)
    }
  }

  const receipt = {
    schemaVersion: 1,
    headSha: identity.sha,
    headTree: identity.tree,
    rulesVersion: rules.rulesVersion,
    rulesDigest: sha256Bytes(Buffer.from(canonicalJson(rules), "utf8")),
    commitCount: commits.length,
    blobCount: blobs.size,
    scannedScopes: ["reachable-history", "generated-evidence"],
    result: findings.size === 0 ? "pass" : "fail",
    recordedAt: new Date().toISOString(),
  }
  await writeJsonAtomic(receiptPath, receipt)
  const written = parseJsonNoDuplicateKeys(await readFile(receiptPath, "utf8"))
  assertExactKeys(written, ["schemaVersion", "headSha", "headTree", "rulesVersion", "rulesDigest", "commitCount", "blobCount", "scannedScopes", "result", "recordedAt"], "HISTORY_RECEIPT")
  assertCurrentIso(written.recordedAt, "HISTORY_RECEIPT")
  if (findings.size > 0) {
    const summary = [...findings].sort(([left], [right]) => left.localeCompare(right, "en")).map(([id, count]) => `${id}=${count}`).join(",")
    console.error(`History audit failed: ${summary}`)
    throw new Error("HISTORY_AUDIT_FAILED")
  }
  return receipt
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const receipt = await verifyHistory()
  console.log(`History verified: ${receipt.commitCount} commits, ${receipt.blobCount} unique blobs, rules ${receipt.rulesDigest}.`)
}
