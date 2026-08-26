import { execFileSync } from "node:child_process"
import { lstat, readFile, realpath } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { digestFileRecords, discoverRegularFiles, sha256Bytes } from "./digest.mjs"
import { assertCurrentIso, assertExactKeys, repositoryIdentity, writeJsonAtomic } from "./release-utils.mjs"

export const REVIEW_LENSES = [
  "product",
  "evidence-privacy",
  "visual-responsive",
  "motion",
  "accessibility",
  "simplicity",
  "code-integration",
  "local-screenshot",
]

export const REVIEW_ROOTS = [".github/workflows", "public", "scripts", "src", "e2e"]
export const REVIEW_FIXED_FILES = [
  ".gitignore",
  "DESIGN.md",
  "EXPERIENCE.md",
  "PRODUCT.md",
  "README.md",
  "eslint.config.js",
  "index.html",
  "package.json",
  "package-lock.json",
  "playwright.config.ts",
  "postcss.config.js",
  "tailwind.config.js",
  "tsconfig.app.json",
  "tsconfig.json",
  "tsconfig.node.json",
  "vite.config.ts",
  "vitest.config.ts",
  "docs/performance-budget.md",
  "docs/release/confidentiality-review.v1.json",
  "docs/release/history-safe-patterns.v1.json",
]

const FRONTMATTER_KEYS = ["lens", "sourceDigest", "verdict", "findingDisposition", "reviewedAt"]

function tracked(root, relativePath) {
  try {
    execFileSync("git", ["ls-files", "--error-unmatch", "--", relativePath], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
    return true
  } catch {
    return false
  }
}

async function fixedRecord(root, relativePath) {
  const absolute = path.resolve(root, ...relativePath.split("/"))
  const rootReal = await realpath(root)
  const stats = await lstat(absolute)
  if (!stats.isFile() || stats.isSymbolicLink()) throw new Error(`REVIEW_SOURCE_FIXED_INVALID:${relativePath}`)
  const resolved = await realpath(absolute)
  const relative = path.relative(rootReal, resolved)
  if (relative.startsWith(`..${path.sep}`) || relative === ".." || path.isAbsolute(relative)) throw new Error(`REVIEW_SOURCE_FIXED_ESCAPE:${relativePath}`)
  const data = await readFile(absolute)
  return { path: relativePath, bytes: data.length, sha256: sha256Bytes(data), data }
}

export async function computeReviewSource(root = process.cwd(), options = {}) {
  const records = []
  for (const sourceRoot of REVIEW_ROOTS) {
    const rootRecords = await discoverRegularFiles(path.join(root, ...sourceRoot.split("/")))
    for (const record of rootRecords) records.push({ ...record, path: `${sourceRoot}/${record.path}` })
  }
  for (const fixed of REVIEW_FIXED_FILES) records.push(await fixedRecord(root, fixed))
  const paths = new Set()
  for (const record of records) {
    if (paths.has(record.path)) throw new Error(`REVIEW_SOURCE_DUPLICATE:${record.path}`)
    paths.add(record.path)
    if (!tracked(root, record.path) && !options.allowUntracked) throw new Error(`REVIEW_SOURCE_UNTRACKED:${record.path}`)
  }
  if (!options.allowDirty) {
    const status = execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all", "--", ...REVIEW_ROOTS, ...REVIEW_FIXED_FILES], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim()
    if (status !== "") throw new Error("REVIEW_SOURCE_DIRTY")
  }
  return { sourceDigest: digestFileRecords("REVIEW-SOURCE-V1\0", records), records }
}

export function parseReviewFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/u)
  if (!match) throw new Error("REVIEW_FRONTMATTER_MISSING")
  const result = Object.create(null)
  for (const line of match[1].split(/\r?\n/u)) {
    const separator = line.indexOf(":")
    if (separator <= 0) throw new Error("REVIEW_FRONTMATTER_LINE_INVALID")
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    if (Object.hasOwn(result, key)) throw new Error("REVIEW_FRONTMATTER_DUPLICATE")
    result[key] = value
  }
  assertExactKeys(result, FRONTMATTER_KEYS, "REVIEW_FRONTMATTER")
  return result
}

export function validateReviewRecord(record, expected, identity, sourceDigest) {
  assertExactKeys(record, ["lens", "sourceSha", "sourceTree", "sourceDigest", "verdict", "findingDisposition", "reviewedAt", "evidenceRef", "evidenceDigest"], "REVIEW_ATTESTATION_RECORD")
  if (record.lens !== expected.lens || record.sourceSha !== identity.sha || record.sourceTree !== identity.tree || record.sourceDigest !== sourceDigest) {
    throw new Error("REVIEW_ATTESTATION_BINDING_INVALID")
  }
  if (record.verdict !== "pass" || !["none", "resolved"].includes(record.findingDisposition)) throw new Error("REVIEW_ATTESTATION_FINDING_UNRESOLVED")
  if (record.evidenceRef !== expected.evidenceRef || !/^[a-f0-9]{64}$/u.test(record.evidenceDigest)) throw new Error("REVIEW_ATTESTATION_EVIDENCE_INVALID")
  assertCurrentIso(record.reviewedAt, "REVIEW_ATTESTATION")
}

export async function verifyReviews(root = process.cwd(), options = {}) {
  const identity = repositoryIdentity({ requireClean: !options.allowDirty, requireNonShallow: true })
  const { sourceDigest } = await computeReviewSource(root, {
    allowDirty: options.allowDirty,
    allowUntracked: options.allowUntracked,
  })
  const reviews = []
  for (const lens of REVIEW_LENSES) {
    const evidenceRef = `docs/release/reviews/${lens}.md`
    const absolute = path.join(root, ...evidenceRef.split("/"))
    const stats = await lstat(absolute)
    if (!stats.isFile() || stats.isSymbolicLink()) throw new Error(`REVIEW_REPORT_INVALID:${lens}`)
    if (!tracked(root, evidenceRef) && !options.allowUntracked) throw new Error(`REVIEW_REPORT_UNTRACKED:${lens}`)
    if (!options.allowDirty) {
      const status = execFileSync("git", ["status", "--porcelain=v1", "--untracked-files=all", "--", evidenceRef], { cwd: root, encoding: "utf8" }).trim()
      if (status !== "") throw new Error(`REVIEW_REPORT_DIRTY:${lens}`)
    }
    const data = await readFile(absolute)
    const frontmatter = parseReviewFrontmatter(data.toString("utf8"))
    if (frontmatter.lens !== lens || frontmatter.sourceDigest !== sourceDigest || frontmatter.verdict !== "pass" || !["none", "resolved"].includes(frontmatter.findingDisposition)) {
      throw new Error(`REVIEW_REPORT_FRONTMATTER_INVALID:${lens}`)
    }
    assertCurrentIso(frontmatter.reviewedAt, `REVIEW_REPORT:${lens}`)
    const record = {
      lens,
      sourceSha: identity.sha,
      sourceTree: identity.tree,
      sourceDigest,
      verdict: frontmatter.verdict,
      findingDisposition: frontmatter.findingDisposition,
      reviewedAt: frontmatter.reviewedAt,
      evidenceRef,
      evidenceDigest: sha256Bytes(data),
    }
    validateReviewRecord(record, { lens, evidenceRef }, identity, sourceDigest)
    reviews.push(record)
  }
  const attestation = {
    schemaVersion: 1,
    sourceSha: identity.sha,
    sourceTree: identity.tree,
    sourceDigest,
    reviews,
  }
  assertExactKeys(attestation, ["schemaVersion", "sourceSha", "sourceTree", "sourceDigest", "reviews"], "REVIEW_ATTESTATION")
  await writeJsonAtomic(path.join(root, "artifacts", "release", "review-attestations.v1.json"), attestation)
  return attestation
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const printDigest = process.argv.includes("--print-source-digest")
  const allowDirty = process.argv.includes("--allow-dirty")
  const allowUntracked = process.argv.includes("--allow-untracked")
  if (printDigest) {
    const source = await computeReviewSource(process.cwd(), { allowDirty, allowUntracked })
    console.log(source.sourceDigest)
  } else {
    const result = await verifyReviews(process.cwd(), { allowDirty, allowUntracked })
    console.log(`Reviews verified: ${result.reviews.length} lenses, source ${result.sourceDigest}.`)
  }
}
