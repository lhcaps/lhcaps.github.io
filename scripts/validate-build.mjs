import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { discoverRegularFiles, parseJsonNoDuplicateKeys, sha256Bytes } from "./digest.mjs"
import {
  CANONICAL_URL,
  RELEASE_REF,
  REPOSITORY,
  assertExactKeys,
  git,
  publicReleaseIdentity,
} from "./release-utils.mjs"

export const PUBLIC_ALLOWLIST = [
  "favicon.svg",
  "le-huy-software-engineer-cv.pdf",
  "og-image.png",
  "robots.txt",
  "sitemap.xml",
]

const ROOT_OUTPUTS = new Set(["index.html", "release.json", ...PUBLIC_ALLOWLIST])
const SAFE_ASSET_EXTENSION = new Set([".css", ".js", ".woff", ".woff2"])

function equalLists(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

export async function validatePublicSource(root = process.cwd()) {
  const records = await discoverRegularFiles(path.join(root, "public"))
  const paths = records.map((record) => record.path)
  if (!equalLists(paths, PUBLIC_ALLOWLIST)) throw new Error("PUBLIC_ALLOWLIST_MISMATCH")
  return records
}

function validateManifest(manifest, distPaths) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) throw new Error("BUILD_MANIFEST_INVALID")
  const entries = Object.entries(manifest)
  if (entries.length === 0) throw new Error("BUILD_MANIFEST_EMPTY")
  const entryChunks = entries.filter(([, value]) => value?.isEntry === true)
  if (entryChunks.length !== 1 || entryChunks[0][0] !== "index.html") throw new Error("BUILD_MANIFEST_ENTRY_INVALID")
  const atlasChunks = entries.filter(([key, value]) => key === "src/atlas/scene/AtlasScene.tsx" && value?.isDynamicEntry === true)
  if (atlasChunks.length !== 1) throw new Error("BUILD_MANIFEST_ATLAS_INVALID")
  const dynamicImports = entryChunks[0][1].dynamicImports ?? []
  if (!equalLists(dynamicImports, ["src/atlas/scene/AtlasScene.tsx"])) throw new Error("BUILD_MANIFEST_DYNAMIC_ROOT_INVALID")

  for (const [key, value] of entries) {
    if (!value || typeof value !== "object" || Array.isArray(value) || typeof value.file !== "string") {
      throw new Error(`BUILD_MANIFEST_RECORD_INVALID:${key}`)
    }
    if (!distPaths.has(value.file)) throw new Error(`BUILD_MANIFEST_FILE_MISSING:${key}`)
    for (const reference of [...(value.imports ?? []), ...(value.dynamicImports ?? [])]) {
      if (!Object.hasOwn(manifest, reference)) throw new Error(`BUILD_MANIFEST_REFERENCE_MISSING:${key}`)
    }
    for (const asset of [...(value.css ?? []), ...(value.assets ?? [])]) {
      if (!distPaths.has(asset)) throw new Error(`BUILD_MANIFEST_ASSET_MISSING:${key}`)
    }
  }
}

export async function validateBuild(root = process.cwd()) {
  const publicRecords = await validatePublicSource(root)
  const distRoot = path.join(root, "dist")
  const distRecords = await discoverRegularFiles(distRoot)
  const distPaths = new Set(distRecords.map((record) => record.path))

  for (const record of distRecords) {
    const relativePath = record.path
    const lowered = relativePath.toLowerCase()
    if (lowered.endsWith(".map")) throw new Error("BUILD_SOURCE_MAP_REJECTED")
    if (/credentials|portfolio-evidence|release-evidence|attestation|receipt|private/.test(lowered)) {
      throw new Error("BUILD_INTERNAL_PATH_REJECTED")
    }
    if (relativePath.startsWith(".vite/")) {
      if (relativePath !== ".vite/manifest.json") throw new Error("BUILD_INTERNAL_OUTPUT_UNEXPECTED")
      continue
    }
    if (relativePath.startsWith("assets/")) {
      if (!SAFE_ASSET_EXTENSION.has(path.extname(relativePath).toLowerCase())) throw new Error("BUILD_ASSET_EXTENSION_REJECTED")
      continue
    }
    if (!ROOT_OUTPUTS.has(relativePath)) throw new Error("BUILD_ROOT_OUTPUT_UNEXPECTED")
  }

  for (const required of ["index.html", "release.json", ".vite/manifest.json", ...PUBLIC_ALLOWLIST]) {
    if (!distPaths.has(required)) throw new Error(`BUILD_REQUIRED_OUTPUT_MISSING:${required}`)
  }

  const distByPath = new Map(distRecords.map((record) => [record.path, record]))
  for (const source of publicRecords) {
    const emitted = distByPath.get(source.path)
    if (!emitted || emitted.bytes !== source.bytes || emitted.sha256 !== source.sha256) {
      throw new Error(`BUILD_PUBLIC_COPY_MISMATCH:${source.path}`)
    }
  }

  const releaseSource = await readFile(path.join(distRoot, "release.json"), "utf8")
  const release = parseJsonNoDuplicateKeys(releaseSource)
  assertExactKeys(release, ["schemaVersion", "sha", "repository", "ref", "canonicalUrl"], "PUBLIC_RELEASE_IDENTITY")
  const expectedSha = process.env.VITE_COMMIT_SHA?.trim() || git(["rev-parse", "HEAD"], root)
  if (JSON.stringify(release) !== JSON.stringify(publicReleaseIdentity(expectedSha))) throw new Error("PUBLIC_RELEASE_IDENTITY_MISMATCH")
  if (release.repository !== REPOSITORY || release.ref !== RELEASE_REF || release.canonicalUrl !== CANONICAL_URL) {
    throw new Error("PUBLIC_RELEASE_CONSTANT_MISMATCH")
  }

  const html = await readFile(path.join(distRoot, "index.html"), "utf8")
  for (const required of [
    '<link rel="canonical" href="https://lhcaps.github.io/"',
    '<meta property="og:image" content="https://lhcaps.github.io/og-image.png"',
    '<meta name="twitter:card" content="summary_large_image"',
  ]) {
    if (!html.includes(required)) throw new Error("BUILD_METADATA_REQUIRED_VALUE_MISSING")
  }
  if (!/"@type"\s*:\s*"ProfilePage"/.test(html) || !/"name"\s*:\s*"Le Huy"/.test(html)) {
    throw new Error("BUILD_STRUCTURED_DATA_REQUIRED_VALUE_MISSING")
  }
  if (/fonts\.(?:googleapis|gstatic)\.com|<link[^>]+stylesheet[^>]+https?:\/\//i.test(html)) {
    throw new Error("BUILD_REMOTE_FONT_REJECTED")
  }

  const manifestSource = await readFile(path.join(distRoot, ".vite", "manifest.json"), "utf8")
  const manifest = parseJsonNoDuplicateKeys(manifestSource)
  validateManifest(manifest, distPaths)

  const ogImage = distByPath.get("og-image.png")
  if (!ogImage || ogImage.bytes > 256 * 1024) throw new Error("BUILD_OG_IMAGE_BUDGET_EXCEEDED")
  const cv = distByPath.get("le-huy-software-engineer-cv.pdf")
  if (!cv || cv.bytes > 512 * 1024) throw new Error("BUILD_CV_BUDGET_EXCEEDED")

  return {
    fileCount: distRecords.length,
    release,
    manifest,
    publicDigests: Object.fromEntries(publicRecords.map((record) => [record.path, sha256Bytes(record.data)])),
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const result = await validateBuild()
  console.log(`Build verified: ${result.fileCount} files, release ${result.release.sha}, one eager entry, one Atlas dynamic root.`)
}
