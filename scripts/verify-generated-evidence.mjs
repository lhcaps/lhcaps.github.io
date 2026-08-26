import { lstat, readFile, rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
  canonicalJson,
  comparePathBytes,
  digestFileRecords,
  discoverRegularFiles,
  parseJsonNoDuplicateKeys,
  publicFileRecords,
  sha256Bytes,
} from "./digest.mjs"
import {
  CANONICAL_URL,
  SHA256,
  assertCurrentIso,
  assertExactKeys,
  publicReleaseIdentity,
  repositoryIdentity,
  safeError,
  writeJsonAtomic,
} from "./release-utils.mjs"
import { compileRules, scanPath, scanText, validateBinary, validateRules } from "./verify-history.mjs"
import { validateReleaseEvidence } from "./verify.mjs"

export const GENERATED_ROOTS = [
  "artifacts/release",
  "test-results",
  "playwright-report",
  ".playwright-cli",
  "artifacts/screenshots",
]

export const PHASE_PATHS = {
  preupload: "artifacts/release/generated-evidence-preupload-attestation.v1.json",
  "hosted-final": "artifacts/release/generated-evidence-hosted-attestation.v1.json",
}

const HOSTED_FIXED = [
  "artifacts/release/deployment-attestation.v1.json",
  "artifacts/release/production-smoke.v1.json",
  "artifacts/release/production-review-evidence.v1.json",
  "artifacts/release/production-review-attestation.v1.json",
]
const SMOKE_CHECKS = [
  "release-identity",
  "navigation",
  "systems",
  "mobile-no-canvas",
  "contact",
  "metadata",
  "pdf",
  "console",
  "overflow",
  "payloads",
  "major-assets",
]

function addFinding(findings, id) {
  findings.set(id, (findings.get(id) ?? 0) + 1)
}

function decodeText(buffer) {
  if (buffer.includes(0)) return null
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(buffer)
  } catch {
    return null
  }
}

function exactTime(value, label) {
  try {
    assertCurrentIso(value, label)
    return true
  } catch {
    return false
  }
}

export function generatedEvidenceDigest(phase, records) {
  if (!Object.hasOwn(PHASE_PATHS, phase)) throw new Error("GENERATED_PHASE_INVALID")
  return digestFileRecords(`GENERATED-EVIDENCE-V1\0${phase}\0`, records)
}

export function validateGeneratedAttestation(attestation, phase, identity, expected) {
  assertExactKeys(attestation, ["schemaVersion", "phase", "sourceSha", "sourceTree", "generatedEvidenceDigest", "fileCount", "files", "result", "recordedAt"], "GENERATED_ATTESTATION")
  if (attestation.schemaVersion !== 1 || attestation.phase !== phase || attestation.sourceSha !== identity.sha || attestation.sourceTree !== identity.tree) {
    throw new Error("GENERATED_ATTESTATION_BINDING_INVALID")
  }
  if (!SHA256.test(attestation.generatedEvidenceDigest) || !Number.isInteger(attestation.fileCount) || attestation.fileCount < 0 || !Array.isArray(attestation.files)) {
    throw new Error("GENERATED_ATTESTATION_MANIFEST_INVALID")
  }
  if (!['pass', 'fail'].includes(attestation.result)) throw new Error("GENERATED_ATTESTATION_RESULT_INVALID")
  assertCurrentIso(attestation.recordedAt, "GENERATED_ATTESTATION")
  let previous = null
  for (const file of attestation.files) {
    assertExactKeys(file, ["path", "bytes", "sha256"], "GENERATED_ATTESTATION_FILE")
    if (typeof file.path !== "string" || !Number.isInteger(file.bytes) || file.bytes < 0 || !SHA256.test(file.sha256)) throw new Error("GENERATED_ATTESTATION_FILE_INVALID")
    if (previous !== null && comparePathBytes(previous, file.path) >= 0) throw new Error("GENERATED_ATTESTATION_FILE_ORDER_INVALID")
    previous = file.path
  }
  if (attestation.fileCount !== attestation.files.length) throw new Error("GENERATED_ATTESTATION_FILE_COUNT_INVALID")
  if (expected) {
    if (attestation.generatedEvidenceDigest !== expected.digest || canonicalJson(attestation.files) !== canonicalJson(expected.files) || attestation.fileCount !== expected.files.length) {
      throw new Error("GENERATED_ATTESTATION_CONTENT_INVALID")
    }
  }
}

export function validateProductionSmoke(smoke, expectedSha) {
  assertExactKeys(smoke, ["schemaVersion", "sha", "url", "checks", "result", "recordedAt"], "PRODUCTION_SMOKE")
  if (smoke.schemaVersion !== 1 || smoke.sha !== expectedSha || smoke.url !== CANONICAL_URL || !Array.isArray(smoke.checks)) throw new Error("PRODUCTION_SMOKE_BINDING_INVALID")
  if (smoke.checks.length !== SMOKE_CHECKS.length) throw new Error("PRODUCTION_SMOKE_CHECK_SET_INVALID")
  let allPass = true
  smoke.checks.forEach((check, index) => {
    assertExactKeys(check, ["id", "viewport", "result", "count", "limitation"], "PRODUCTION_SMOKE_CHECK")
    if (check.id !== SMOKE_CHECKS[index] || !["1440x900", "390x844", "not-applicable"].includes(check.viewport) || !["pass", "fail"].includes(check.result) || !Number.isInteger(check.count) || check.count < 0 || typeof check.limitation !== "string") {
      throw new Error("PRODUCTION_SMOKE_CHECK_INVALID")
    }
    if (check.result !== "pass" || check.limitation !== "") allPass = false
  })
  if (!allPass) throw new Error("PRODUCTION_SMOKE_FAILED_OR_NARROWED")
  if (smoke.result !== "pass" || !exactTime(smoke.recordedAt, "PRODUCTION_SMOKE")) throw new Error("PRODUCTION_SMOKE_RESULT_INVALID")
}

function validateHistoryReceipt(value, identity) {
  assertExactKeys(value, ["schemaVersion", "headSha", "headTree", "rulesVersion", "rulesDigest", "commitCount", "blobCount", "scannedScopes", "result", "recordedAt"], "HISTORY_RECEIPT")
  if (value.schemaVersion !== 1 || value.headSha !== identity.sha || value.headTree !== identity.tree || value.rulesVersion !== "systems-atlas-history-safety-v1" || !SHA256.test(value.rulesDigest) || !Number.isInteger(value.commitCount) || !Number.isInteger(value.blobCount) || canonicalJson(value.scannedScopes) !== canonicalJson(["reachable-history", "generated-evidence"]) || value.result !== "pass") throw new Error("HISTORY_RECEIPT_INVALID")
  assertCurrentIso(value.recordedAt, "HISTORY_RECEIPT")
}

function validateAssetInventory(value, identity) {
  assertExactKeys(value, ["schemaVersion", "sourceSha", "sourceTree", "pagesSiteDigest", "files", "totals"], "ASSET_INVENTORY")
  if (value.schemaVersion !== 1 || value.sourceSha !== identity.sha || value.sourceTree !== identity.tree || !SHA256.test(value.pagesSiteDigest) || !Array.isArray(value.files)) throw new Error("ASSET_INVENTORY_INVALID")
  assertExactKeys(value.totals, ["fileCount", "eagerJsGzipBytes", "atlasJsGzipBytes", "cssGzipBytes", "firstViewFontBytes", "initialTransferBytes", "largestStaticNonFontBytes", "cvBytes"], "ASSET_TOTALS")
  for (const file of value.files) assertExactKeys(file, ["path", "kind", "role", "bytes", "gzipBytes", "sha256", "initialTransfer", "firstViewFont"], "ASSET_FILE")
}

function validateReviewAttestation(value, identity) {
  assertExactKeys(value, ["schemaVersion", "sourceSha", "sourceTree", "sourceDigest", "reviews"], "REVIEW_ATTESTATION")
  if (value.schemaVersion !== 1 || value.sourceSha !== identity.sha || value.sourceTree !== identity.tree || !SHA256.test(value.sourceDigest) || !Array.isArray(value.reviews) || value.reviews.length !== 8) throw new Error("REVIEW_ATTESTATION_INVALID")
  for (const review of value.reviews) assertExactKeys(review, ["lens", "sourceSha", "sourceTree", "sourceDigest", "verdict", "findingDisposition", "reviewedAt", "evidenceRef", "evidenceDigest"], "REVIEW_ATTESTATION_RECORD")
}

function validateChunkInventory(value) {
  assertExactKeys(value, ["schemaVersion", "chunks"], "CHUNK_INVENTORY")
  if (value.schemaVersion !== 1 || !Array.isArray(value.chunks)) throw new Error("CHUNK_INVENTORY_INVALID")
  for (const chunk of value.chunks) assertExactKeys(chunk, ["fileName", "isEntry", "isDynamicEntry", "imports", "dynamicImports", "modules"], "CHUNK_INVENTORY_RECORD")
}

function validateProductionReviewEvidence(value, identity, recordsByPath) {
  assertExactKeys(value, ["schemaVersion", "sha", "files"], "PRODUCTION_REVIEW_EVIDENCE")
  if (value.schemaVersion !== 1 || value.sha !== identity.sha || !Array.isArray(value.files) || value.files.length < 2) throw new Error("PRODUCTION_REVIEW_EVIDENCE_INVALID")
  let previous = null
  let desktop = false
  let mobile = false
  const viewports = new Set()
  for (const file of value.files) {
    assertExactKeys(file, ["path", "viewport", "bytes", "sha256"], "PRODUCTION_REVIEW_FILE")
    if (!/^artifacts\/screenshots\/production\/.+\.png$/u.test(file.path) || !/^\d+x\d+$/u.test(file.viewport) || !Number.isInteger(file.bytes) || file.bytes <= 0 || !SHA256.test(file.sha256)) throw new Error("PRODUCTION_REVIEW_FILE_INVALID")
    if (previous !== null && comparePathBytes(previous, file.path) >= 0) throw new Error("PRODUCTION_REVIEW_FILE_ORDER_INVALID")
    if (viewports.has(file.viewport)) throw new Error("PRODUCTION_REVIEW_VIEWPORT_DUPLICATE")
    previous = file.path
    viewports.add(file.viewport)
    const current = recordsByPath.get(file.path)
    if (!current || current.bytes !== file.bytes || current.sha256 !== file.sha256) throw new Error("PRODUCTION_REVIEW_FILE_CONTENT_INVALID")
    const width = Number(file.viewport.split("x")[0])
    if (width < 768) mobile = true
    else desktop = true
  }
  if (!desktop || !mobile) throw new Error("PRODUCTION_REVIEW_VIEWPORT_SET_INVALID")
  return new Set(value.files.map((file) => file.path))
}

function validateProductionReviewAttestation(value, identity, evidenceRecord) {
  assertExactKeys(value, ["schemaVersion", "sha", "releaseIdentitySha", "verdict", "findingDisposition", "reviewedAt", "evidenceRef", "evidenceDigest"], "PRODUCTION_REVIEW_ATTESTATION")
  if (value.schemaVersion !== 1 || value.sha !== identity.sha || value.releaseIdentitySha !== identity.sha || value.verdict !== "pass" || !["none", "resolved"].includes(value.findingDisposition) || value.evidenceRef !== "artifacts/release/production-review-evidence.v1.json" || value.evidenceDigest !== evidenceRecord.sha256) throw new Error("PRODUCTION_REVIEW_ATTESTATION_INVALID")
  assertCurrentIso(value.reviewedAt, "PRODUCTION_REVIEW_ATTESTATION")
}

function validateDeploymentAttestation(value, identity) {
  assertExactKeys(value, ["schemaVersion", "sha", "startingMainSha", "workflowRunId", "pagesArtifactId", "pagesArtifactName", "pagesArchiveDigest", "pagesSiteDigest", "publicIdentity", "remoteMainShaAfterSmoke", "branchAdvanced", "result", "recordedAt"], "DEPLOYMENT_ATTESTATION")
  if (value.schemaVersion !== 1 || value.sha !== identity.sha || value.startingMainSha !== identity.sha || !Number.isInteger(value.workflowRunId) || value.workflowRunId <= 0 || !Number.isInteger(value.pagesArtifactId) || value.pagesArtifactId <= 0 || value.pagesArtifactName !== "github-pages" || !/^sha256:[a-f0-9]{64}$/u.test(value.pagesArchiveDigest) || !SHA256.test(value.pagesSiteDigest) || canonicalJson(value.publicIdentity) !== canonicalJson(publicReleaseIdentity(identity.sha)) || value.remoteMainShaAfterSmoke !== identity.sha || value.branchAdvanced !== false || value.result !== "pass") throw new Error("DEPLOYMENT_ATTESTATION_INVALID")
  assertCurrentIso(value.recordedAt, "DEPLOYMENT_ATTESTATION")
}

function validateKnownJson(relativePath, value, identity, recordsByPath) {
  if (relativePath === "artifacts/release/history-audit-receipt.v1.json") validateHistoryReceipt(value, identity)
  else if (relativePath === "artifacts/release/asset-inventory.v1.json") validateAssetInventory(value, identity)
  else if (relativePath === "artifacts/release/review-attestations.v1.json") validateReviewAttestation(value, identity)
  else if (relativePath === "artifacts/release/chunk-modules.v1.json") validateChunkInventory(value)
  else if (relativePath === "artifacts/release/release-evidence.v1.json") validateReleaseEvidence(value, identity)
  else if (relativePath === "artifacts/release/production-smoke.v1.json") validateProductionSmoke(value, identity.sha)
  else if (relativePath === "artifacts/release/deployment-attestation.v1.json") validateDeploymentAttestation(value, identity)
  else if (relativePath === "artifacts/release/production-review-evidence.v1.json") validateProductionReviewEvidence(value, identity, recordsByPath)
}

export async function discoverGeneratedRecords(root, excludedPath) {
  const records = []
  for (const generatedRoot of GENERATED_ROOTS) {
    const absolute = path.join(root, ...generatedRoot.split("/"))
    try {
      const stats = await lstat(absolute)
      if (!stats.isDirectory() || stats.isSymbolicLink()) throw new Error("GENERATED_ROOT_INVALID")
    } catch (error) {
      if (error?.code === "ENOENT") continue
      throw error
    }
    for (const record of await discoverRegularFiles(absolute)) {
      const qualified = `${generatedRoot}/${record.path}`
      if (qualified === excludedPath) continue
      records.push({ ...record, path: qualified })
    }
  }
  records.sort((left, right) => comparePathBytes(left.path, right.path))
  return records
}

function sameProjection(left, right) {
  return canonicalJson(left) === canonicalJson(right)
}

function validateHostedDelta(records, preupload, identity, findings) {
  const byPath = new Map(records.map((record) => [record.path, record]))
  let evidence
  let screenshots = new Set()
  try {
    const evidenceRecord = byPath.get("artifacts/release/production-review-evidence.v1.json")
    if (!evidenceRecord) throw new Error("missing")
    evidence = parseJsonNoDuplicateKeys(evidenceRecord.data.toString("utf8"))
    screenshots = validateProductionReviewEvidence(evidence, identity, byPath)
    const attestationRecord = byPath.get("artifacts/release/production-review-attestation.v1.json")
    if (!attestationRecord) throw new Error("missing")
    validateProductionReviewAttestation(parseJsonNoDuplicateKeys(attestationRecord.data.toString("utf8")), identity, evidenceRecord)
  } catch {
    addFinding(findings, "hosted-production-review-invalid")
  }
  const actualProduction = new Set(records.filter((record) => record.path.startsWith("artifacts/screenshots/production/")).map((record) => record.path))
  if (!sameProjection([...actualProduction].sort(comparePathBytes), [...screenshots].sort(comparePathBytes))) addFinding(findings, "hosted-production-screenshot-set-invalid")

  const additions = new Set([...HOSTED_FIXED, ...screenshots, PHASE_PATHS.preupload, PHASE_PATHS["hosted-final"]])
  for (const fixed of HOSTED_FIXED) if (!byPath.has(fixed)) addFinding(findings, "hosted-required-output-missing")
  const preuploadPaths = new Set(preupload.files.map((file) => file.path))
  for (const addition of additions) if (preuploadPaths.has(addition)) addFinding(findings, "hosted-path-collision")
  const baseRecords = records.filter((record) => !additions.has(record.path))
  const baseProjection = publicFileRecords(baseRecords)
  if (!sameProjection(baseProjection, preupload.files) || generatedEvidenceDigest("preupload", baseRecords) !== preupload.generatedEvidenceDigest || baseRecords.length !== preupload.fileCount) {
    addFinding(findings, "hosted-preupload-bytes-changed")
  }
}

export async function verifyGeneratedEvidence(root = process.cwd(), phase) {
  if (!Object.hasOwn(PHASE_PATHS, phase)) throw new Error("GENERATED_PHASE_INVALID")
  const identity = repositoryIdentity({ requireClean: true, requireNonShallow: true })
  const selfPath = PHASE_PATHS[phase]
  await rm(path.join(root, ...selfPath.split("/")), { force: true })
  if (phase === "preupload") await rm(path.join(root, ...PHASE_PATHS["hosted-final"].split("/")), { force: true })

  const rules = parseJsonNoDuplicateKeys(await readFile(path.join(root, "docs", "release", "history-safe-patterns.v1.json"), "utf8"))
  validateRules(rules)
  const pathRules = compileRules(rules.pathRules, "GENERATED_PATH_RULE")
  const textRules = compileRules(rules.textRules, "GENERATED_TEXT_RULE")
  const findings = new Map()
  const records = await discoverGeneratedRecords(root, selfPath)
  const recordsByPath = new Map(records.map((record) => [record.path, record]))

  for (const record of records) {
    scanPath(record.path, pathRules, findings)
    const extension = path.extname(record.path).toLowerCase()
    if (!rules.binaryPolicy.allowedGeneratedExtensions.includes(extension)) addFinding(findings, "generated-extension-rejected")
    const text = decodeText(record.data)
    if (text === null) validateBinary(record.data, record.path, "generated", rules.binaryPolicy, findings)
    else {
      scanText(text, textRules, findings)
      if (extension === ".json") {
        try {
          validateKnownJson(record.path, parseJsonNoDuplicateKeys(text), identity, recordsByPath)
        } catch {
          addFinding(findings, "generated-known-json-invalid")
        }
      }
    }
  }

  if (phase === "preupload") {
    if (HOSTED_FIXED.some((candidate) => recordsByPath.has(candidate)) || records.some((record) => record.path.startsWith("artifacts/screenshots/production/"))) {
      addFinding(findings, "preupload-hosted-output-present")
    }
  } else {
    try {
      const preuploadRecord = recordsByPath.get(PHASE_PATHS.preupload)
      if (!preuploadRecord) throw new Error("missing")
      const preupload = parseJsonNoDuplicateKeys(preuploadRecord.data.toString("utf8"))
      validateGeneratedAttestation(preupload, "preupload", identity)
      if (preupload.result !== "pass") throw new Error("failed")
      validateHostedDelta(records, preupload, identity, findings)
    } catch {
      addFinding(findings, "hosted-preupload-attestation-invalid")
    }
  }

  if (phase === "hosted-final") {
    try {
      const evidenceRecord = recordsByPath.get("artifacts/release/production-review-evidence.v1.json")
      const attestationRecord = recordsByPath.get("artifacts/release/production-review-attestation.v1.json")
      if (!evidenceRecord || !attestationRecord) throw new Error("missing")
      validateProductionReviewAttestation(parseJsonNoDuplicateKeys(attestationRecord.data.toString("utf8")), identity, evidenceRecord)
    } catch {
      addFinding(findings, "hosted-production-review-attestation-invalid")
    }
  }

  const projection = publicFileRecords(records)
  const digest = generatedEvidenceDigest(phase, records)
  const attestation = {
    schemaVersion: 1,
    phase,
    sourceSha: identity.sha,
    sourceTree: identity.tree,
    generatedEvidenceDigest: digest,
    fileCount: records.length,
    files: projection,
    result: findings.size === 0 ? "pass" : "fail",
    recordedAt: new Date().toISOString(),
  }
  await writeJsonAtomic(path.join(root, ...selfPath.split("/")), attestation)
  const writtenBytes = await readFile(path.join(root, ...selfPath.split("/")))
  const written = parseJsonNoDuplicateKeys(writtenBytes.toString("utf8"))
  validateGeneratedAttestation(written, phase, identity, { digest, files: projection })
  const selfFindings = new Map()
  scanPath(selfPath, pathRules, selfFindings)
  scanText(writtenBytes.toString("utf8"), textRules, selfFindings)
  if (selfFindings.size > 0) addFinding(findings, "generated-self-attestation-unsafe")
  if (findings.size > 0) {
    const summary = [...findings].sort(([left], [right]) => left.localeCompare(right, "en")).map(([id, count]) => `${id}=${count}`).join(",")
    console.error(`Generated evidence failed: ${summary}`)
    throw new Error("GENERATED_EVIDENCE_FAILED")
  }
  return attestation
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const phaseIndex = process.argv.indexOf("--phase")
  const phase = phaseIndex >= 0 ? process.argv[phaseIndex + 1] : undefined
  try {
    const result = await verifyGeneratedEvidence(process.cwd(), phase)
    console.log(`Generated evidence verified: ${result.phase}, ${result.fileCount} files, ${result.generatedEvidenceDigest}.`)
  } catch (error) {
    console.error(safeError(error))
    process.exitCode = 1
  }
}
