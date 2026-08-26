import assert from "node:assert/strict"
import test from "node:test"
import { sha256Bytes } from "../digest.mjs"
import { generatedEvidenceDigest, validateGeneratedAttestation, validateProductionSmoke } from "../verify-generated-evidence.mjs"

const identity = { sha: "a".repeat(40), tree: "b".repeat(40) }
const bytes = Buffer.from("safe fixture\n")
const record = { path: "artifacts/release/fixture.txt", bytes: bytes.length, sha256: sha256Bytes(bytes), data: bytes }

test("GeneratedEvidenceV1 digest is phase and byte bound", () => {
  const preupload = generatedEvidenceDigest("preupload", [record])
  const hosted = generatedEvidenceDigest("hosted-final", [record])
  assert.match(preupload, /^[a-f0-9]{64}$/u)
  assert.notEqual(preupload, hosted)
  const changed = Buffer.from("changed\n")
  assert.notEqual(preupload, generatedEvidenceDigest("preupload", [{ ...record, data: changed, bytes: changed.length, sha256: sha256Bytes(changed) }]))
})

test("generated attestation enforces closed schema, ordered manifest, and current binding", () => {
  const files = [{ path: record.path, bytes: record.bytes, sha256: record.sha256 }]
  const digest = generatedEvidenceDigest("preupload", [record])
  const value = {
    schemaVersion: 1,
    phase: "preupload",
    sourceSha: identity.sha,
    sourceTree: identity.tree,
    generatedEvidenceDigest: digest,
    fileCount: 1,
    files,
    result: "pass",
    recordedAt: new Date().toISOString(),
  }
  assert.doesNotThrow(() => validateGeneratedAttestation(value, "preupload", identity, { digest, files }))
  assert.throws(() => validateGeneratedAttestation({ ...value, sourceTree: "c".repeat(40) }, "preupload", identity), /BINDING/)
  assert.throws(() => validateGeneratedAttestation({ ...value, fileCount: 2 }, "preupload", identity), /FILE_COUNT/)
})

test("production smoke requires all eleven ordered, broad passing checks", () => {
  const ids = ["release-identity", "navigation", "systems", "mobile-no-canvas", "contact", "metadata", "pdf", "console", "overflow", "payloads", "major-assets"]
  const smoke = {
    schemaVersion: 1,
    sha: identity.sha,
    url: "https://lhcaps.github.io/",
    checks: ids.map((id) => ({ id, viewport: id === "mobile-no-canvas" ? "390x844" : "1440x900", result: "pass", count: 1, limitation: "" })),
    result: "pass",
    recordedAt: new Date().toISOString(),
  }
  assert.doesNotThrow(() => validateProductionSmoke(smoke, identity.sha))
  assert.throws(() => validateProductionSmoke({ ...smoke, checks: smoke.checks.slice(1) }, identity.sha), /CHECK_SET/)
  assert.throws(() => validateProductionSmoke({ ...smoke, checks: smoke.checks.map((check, index) => index === 0 ? { ...check, limitation: "narrow" } : check) }, identity.sha), /FAILED_OR_NARROWED/)
})
