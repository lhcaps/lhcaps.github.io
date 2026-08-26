import { spawnSync } from "node:child_process"
import { rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { repositoryIdentity, safeError, writeJsonAtomic } from "./release-utils.mjs"

const RELEASE_EVIDENCE = "artifacts/release/release-evidence.v1.json"
const GENERATED_ROOTS = [
  "artifacts/release",
  "test-results",
  "playwright-report",
  ".playwright-cli",
  "artifacts/screenshots",
]

export const LOCAL_GATES = [
  { category: "history-and-private-output", script: "verify:history", evidence: "artifacts/release/history-audit-receipt.v1.json" },
  { category: "public-content-contract", script: "validate:content", evidence: "src/content/portfolio.ts" },
  { category: "typescript", script: "typecheck", evidence: "TypeScript project references" },
  { category: "lint", script: "lint", evidence: "ESLint zero-warning gate" },
  { category: "release-fixtures", script: "test:release", evidence: "scripts/test" },
  { category: "unit-component-tests", script: "test", evidence: "Vitest unit and component suite" },
  { category: "coverage", script: "test:coverage", evidence: "coverage/index.html" },
  { category: "production-build", script: "build", evidence: "dist" },
  { category: "build-output", script: "validate:build", evidence: "dist/.vite/manifest.json" },
  { category: "cv", script: "verify:cv", evidence: "public/le-huy-software-engineer-cv.pdf" },
  { category: "browser-qa", script: "e2e", evidence: "playwright-report/index.html" },
  { category: "dependency-audit", command: ["audit", "--json"], evidence: "npm audit --json" },
  { category: "pages-staging", script: "stage:pages", evidence: "artifacts/pages-site" },
  { category: "confidentiality", script: "verify:confidentiality", evidence: "docs/release/confidentiality-review.v1.json" },
  { category: "performance-budget", script: "verify:budget", evidence: "artifacts/release/asset-inventory.v1.json" },
  { category: "independent-reviews", script: "verify:reviews", evidence: "artifacts/release/review-attestations.v1.json" },
]

function npmExecutable() {
  return process.platform === "win32" ? "npm.cmd" : "npm"
}

function commandLabel(gate) {
  return gate.script ? `npm run ${gate.script}` : `npm ${gate.command.join(" ")}`
}

function extractCount(category, output) {
  const candidates = category === "browser-qa"
    ? [/\b(\d+) passed\b/u]
    : category === "unit-component-tests" || category === "coverage"
      ? [/Tests\s+(\d+) passed/u]
      : category === "release-fixtures"
        ? [/# tests (\d+)/u]
        : [/\b(\d+) (?:files|claims|checks|tests|commits|reviews)\b/iu]
  for (const expression of candidates) {
    const match = output.match(expression)
    if (match) return Number(match[1])
  }
  return null
}

function auditCount(stdout) {
  try {
    const report = JSON.parse(stdout)
    const vulnerabilities = report?.metadata?.vulnerabilities
    if (!vulnerabilities || typeof vulnerabilities !== "object") return null
    return Object.values(vulnerabilities).reduce((sum, value) => sum + (Number.isInteger(value) ? value : 0), 0)
  } catch {
    return null
  }
}

export function validateReleaseEvidence(evidence, identity) {
  const rootKeys = Object.keys(evidence).sort().join(",")
  if (rootKeys !== "records,schemaVersion,sha" || evidence.schemaVersion !== 1 || evidence.sha !== identity.sha || !Array.isArray(evidence.records)) {
    throw new Error("RELEASE_EVIDENCE_ROOT_INVALID")
  }
  const requiredKeys = ["assertion", "category", "command", "count", "durationMs", "environment", "evidence", "exitCode", "limitation", "recordedAt", "result", "sha"].sort().join(",")
  const categories = new Set()
  for (const record of evidence.records) {
    if (Object.keys(record).sort().join(",") !== requiredKeys) throw new Error("RELEASE_EVIDENCE_RECORD_KEYS_INVALID")
    if (categories.has(record.category)) throw new Error("RELEASE_EVIDENCE_CATEGORY_DUPLICATE")
    categories.add(record.category)
    if (!Number.isInteger(record.exitCode) || record.exitCode < 0 || !Number.isInteger(record.durationMs) || record.durationMs < 0) {
      throw new Error("RELEASE_EVIDENCE_NUMERIC_INVALID")
    }
    if (record.count !== null && (!Number.isInteger(record.count) || record.count < 0)) throw new Error("RELEASE_EVIDENCE_COUNT_INVALID")
    if (!["pass", "fail", "blocked"].includes(record.result) || !["VERIFIED", "OBSERVED", "INFERRED", "BLOCKED"].includes(record.assertion)) {
      throw new Error("RELEASE_EVIDENCE_RESULT_INVALID")
    }
    if (record.sha !== identity.sha || record.environment !== "local" || typeof record.command !== "string" || typeof record.evidence !== "string") {
      throw new Error("RELEASE_EVIDENCE_BINDING_INVALID")
    }
    if (record.result === "pass" && record.limitation !== "") throw new Error("RELEASE_EVIDENCE_PASS_LIMITATION_INVALID")
    if (record.result !== "pass" && record.limitation.length === 0) throw new Error("RELEASE_EVIDENCE_FAILURE_LIMITATION_MISSING")
    const timestamp = Date.parse(record.recordedAt)
    if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString() !== record.recordedAt || timestamp > Date.now() + 5_000) {
      throw new Error("RELEASE_EVIDENCE_TIME_INVALID")
    }
  }
}

async function clearGeneratedRoots(root) {
  for (const relative of GENERATED_ROOTS) {
    const target = path.resolve(root, ...relative.split("/"))
    if (target === path.resolve(root)) throw new Error("VERIFY_CLEANUP_TARGET_INVALID")
    await rm(target, { recursive: true, force: true })
  }
}

function runGate(root, identity, gate) {
  const args = gate.script ? ["run", gate.script] : gate.command
  const started = performance.now()
  const result = spawnSync(npmExecutable(), args, {
    cwd: root,
    encoding: "utf8",
    env: process.env,
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  })
  const durationMs = Math.max(0, Math.round(performance.now() - started))
  const stdout = result.stdout ?? ""
  const stderr = result.stderr ?? ""
  if (gate.category === "dependency-audit") {
    const count = auditCount(stdout)
    process.stdout.write(`Dependency audit vulnerabilities: ${count ?? "unavailable"}.\n`)
  } else {
    if (stdout) process.stdout.write(stdout)
    if (stderr) process.stderr.write(stderr)
  }
  const exitCode = result.status ?? 1
  const count = gate.category === "dependency-audit" ? auditCount(stdout) : extractCount(gate.category, `${stdout}\n${stderr}`)
  const failedReason = result.error ? safeError(result.error) : exitCode === 0 ? "" : `Command exited ${exitCode}`
  return {
    category: gate.category,
    command: commandLabel(gate),
    exitCode,
    count,
    durationMs,
    result: exitCode === 0 ? "pass" : "fail",
    assertion: exitCode === 0 ? "VERIFIED" : "BLOCKED",
    sha: identity.sha,
    environment: "local",
    evidence: gate.evidence,
    limitation: failedReason,
    recordedAt: new Date().toISOString(),
  }
}

export async function verify(root = process.cwd()) {
  const identity = repositoryIdentity({ requireClean: true, requireNonShallow: true })
  await clearGeneratedRoots(root)
  const records = []
  for (const gate of LOCAL_GATES) {
    process.stdout.write(`\n[verify] ${commandLabel(gate)}\n`)
    const record = runGate(root, identity, gate)
    records.push(record)
    const evidence = { schemaVersion: 1, sha: identity.sha, records }
    validateReleaseEvidence(evidence, identity)
    await writeJsonAtomic(path.join(root, ...RELEASE_EVIDENCE.split("/")), evidence)
    if (record.result !== "pass") throw new Error(`VERIFY_GATE_FAILED:${record.category}`)
  }

  const finalEvidence = { schemaVersion: 1, sha: identity.sha, records }
  validateReleaseEvidence(finalEvidence, identity)
  await writeJsonAtomic(path.join(root, ...RELEASE_EVIDENCE.split("/")), finalEvidence)

  process.stdout.write("\n[verify] npm run verify:generated:preupload\n")
  const attestation = spawnSync(npmExecutable(), ["run", "verify:generated:preupload"], {
    cwd: root,
    encoding: "utf8",
    env: process.env,
    shell: false,
    stdio: "inherit",
  })
  if ((attestation.status ?? 1) !== 0) throw new Error("VERIFY_PREUPLOAD_ATTESTATION_FAILED")
  return finalEvidence
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  try {
    const evidence = await verify()
    console.log(`Local verification complete for ${evidence.sha}: ${evidence.records.length} gates and passing preupload attestation.`)
  } catch (error) {
    console.error(safeError(error))
    process.exitCode = 1
  }
}
