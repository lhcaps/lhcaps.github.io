import assert from "node:assert/strict"
import test from "node:test"
import { LOCAL_GATES, validateReleaseEvidence } from "../verify.mjs"

const identity = { sha: "a".repeat(40), tree: "b".repeat(40) }

function record(overrides = {}) {
  return {
    category: "fixture",
    command: "npm run fixture",
    exitCode: 0,
    count: null,
    durationMs: 1,
    result: "pass",
    assertion: "VERIFIED",
    sha: identity.sha,
    environment: "local",
    evidence: "fixture",
    limitation: "",
    recordedAt: new Date().toISOString(),
    ...overrides,
  }
}

test("local gates preserve the required dependency order and terminal review gate", () => {
  assert.deepEqual(LOCAL_GATES.map((gate) => gate.category), [
    "history-and-private-output",
    "public-content-contract",
    "typescript",
    "lint",
    "release-fixtures",
    "unit-component-tests",
    "coverage",
    "production-build",
    "build-output",
    "cv",
    "browser-qa",
    "dependency-audit",
    "pages-staging",
    "confidentiality",
    "performance-budget",
    "independent-reviews",
  ])
})

test("release evidence accepts a closed passing record", () => {
  assert.doesNotThrow(() => validateReleaseEvidence({ schemaVersion: 1, sha: identity.sha, records: [record()] }, identity))
})

test("release evidence rejects duplicate categories and dishonest limitations", () => {
  assert.throws(
    () => validateReleaseEvidence({ schemaVersion: 1, sha: identity.sha, records: [record(), record()] }, identity),
    /CATEGORY_DUPLICATE/,
  )
  assert.throws(
    () => validateReleaseEvidence({ schemaVersion: 1, sha: identity.sha, records: [record({ limitation: "narrow" })] }, identity),
    /PASS_LIMITATION_INVALID/,
  )
})

test("release evidence requires a qualification for failures", () => {
  assert.throws(
    () => validateReleaseEvidence({ schemaVersion: 1, sha: identity.sha, records: [record({ exitCode: 1, result: "fail", assertion: "BLOCKED" })] }, identity),
    /FAILURE_LIMITATION_MISSING/,
  )
})
