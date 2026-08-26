import assert from "node:assert/strict"
import test from "node:test"
import { parseReviewFrontmatter, REVIEW_LENSES, validateReviewRecord } from "../verify-reviews.mjs"

const sha = "a".repeat(40)
const tree = "b".repeat(40)
const sourceDigest = "c".repeat(64)
const reviewedAt = new Date().toISOString()

test("review lens order is closed", () => {
  assert.deepEqual(REVIEW_LENSES, [
    "product",
    "evidence-privacy",
    "visual-responsive",
    "motion",
    "accessibility",
    "simplicity",
    "code-integration",
    "local-screenshot",
  ])
})

test("review frontmatter parses the exact five fields", () => {
  const parsed = parseReviewFrontmatter(`---\nlens: product\nsourceDigest: ${sourceDigest}\nverdict: pass\nfindingDisposition: none\nreviewedAt: ${reviewedAt}\n---\n# Product\n`)
  assert.equal(parsed.lens, "product")
  assert.throws(() => parseReviewFrontmatter("---\nlens: product\nextra: no\n---\n"), /KEYS_MISMATCH/)
})

test("review attestation record is SHA, tree, digest, report, and verdict bound", () => {
  const expected = { lens: "product", evidenceRef: "docs/release/reviews/product.md" }
  const record = {
    lens: expected.lens,
    sourceSha: sha,
    sourceTree: tree,
    sourceDigest,
    verdict: "pass",
    findingDisposition: "resolved",
    reviewedAt,
    evidenceRef: expected.evidenceRef,
    evidenceDigest: "d".repeat(64),
  }
  assert.doesNotThrow(() => validateReviewRecord(record, expected, { sha, tree }, sourceDigest))
  assert.throws(() => validateReviewRecord({ ...record, verdict: "blocked" }, expected, { sha, tree }, sourceDigest), /UNRESOLVED/)
  assert.throws(() => validateReviewRecord({ ...record, sourceTree: "e".repeat(40) }, expected, { sha, tree }, sourceDigest), /BINDING/)
  assert.throws(() => validateReviewRecord({ ...record, evidenceDigest: "0" }, expected, { sha, tree }, sourceDigest), /EVIDENCE/)
})
