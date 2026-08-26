import { gzipSync } from "node:zlib"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { digestDirectory, discoverRegularFiles, parseJsonNoDuplicateKeys } from "./digest.mjs"
import { assertExactKeys, repositoryIdentity, writeJsonAtomic } from "./release-utils.mjs"
import { validateBuild } from "./validate-build.mjs"

const KIB = 1024
export const BUDGETS = {
  eagerJsGzipBytes: 170 * KIB,
  atlasJsGzipBytes: 425 * KIB,
  cssGzipBytes: 25 * KIB,
  firstViewFontBytes: 220 * KIB,
  initialTransferBytes: 450 * KIB,
  largestStaticNonFontBytes: 256 * KIB,
  cvBytes: 512 * KIB,
}

const TEXT_KINDS = new Set(["html", "javascript", "css", "json", "xml", "text"])

function classifyKind(relativePath) {
  const extension = path.extname(relativePath).toLowerCase()
  if (extension === ".html") return "html"
  if (extension === ".js") return "javascript"
  if (extension === ".css") return "css"
  if (extension === ".woff" || extension === ".woff2") return "font"
  if (extension === ".png" || extension === ".svg") return "image"
  if (extension === ".pdf") return "pdf"
  if (extension === ".json") return "json"
  if (extension === ".xml") return "xml"
  if (extension === ".txt") return "text"
  throw new Error(`BUDGET_KIND_UNKNOWN:${relativePath}`)
}

export function manifestClosure(manifest, rootKey, eagerKeys, includeDynamic) {
  const visited = new Set()
  const active = new Set()
  const visit = (key) => {
    if (eagerKeys?.has(key)) return
    if (active.has(key)) throw new Error(`BUDGET_MANIFEST_CYCLE:${key}`)
    if (visited.has(key)) return
    const entry = manifest[key]
    if (!entry) throw new Error(`BUDGET_MANIFEST_REFERENCE_MISSING:${key}`)
    active.add(key)
    visited.add(key)
    for (const imported of entry.imports ?? []) visit(imported)
    if (includeDynamic) for (const imported of entry.dynamicImports ?? []) visit(imported)
    active.delete(key)
  }
  visit(rootKey)
  return visited
}

export function classifyManifestGraph(manifest) {
  const entryKeys = Object.keys(manifest).filter((key) => manifest[key].isEntry === true)
  if (entryKeys.length !== 1) throw new Error("BUDGET_ENTRY_MISSING")
  const entryKey = entryKeys[0]
  const eagerKeys = manifestClosure(manifest, entryKey, null, false)
  const dynamicRoots = manifest[entryKey].dynamicImports ?? []
  if (dynamicRoots.length !== 1 || dynamicRoots[0] !== "src/atlas/scene/AtlasScene.tsx") throw new Error("BUDGET_DYNAMIC_ROOT_INVALID")
  const atlasKeys = manifestClosure(manifest, dynamicRoots[0], eagerKeys, true)
  const roleByFile = new Map()
  for (const key of eagerKeys) {
    const file = manifest[key].file
    if (file.endsWith(".js")) roleByFile.set(file, "eager-js")
  }
  for (const key of atlasKeys) {
    const file = manifest[key].file
    if (file.endsWith(".js")) {
      if (roleByFile.has(file)) throw new Error(`BUDGET_JS_ROLE_AMBIGUOUS:${file}`)
      roleByFile.set(file, "atlas-js")
    }
  }
  const manifestJavaScript = new Set(Object.values(manifest).map((entry) => entry.file).filter((file) => file.endsWith(".js")))
  if (JSON.stringify([...manifestJavaScript].sort()) !== JSON.stringify([...roleByFile.keys()].sort())) {
    throw new Error("BUDGET_JS_UNCLASSIFIED")
  }
  return { entryKey, eagerKeys, atlasKeys, roleByFile }
}

function cssFilesForKeys(manifest, keys) {
  return new Set([...keys].flatMap((key) => manifest[key]?.css ?? []))
}

async function firstViewFonts(stageRoot, eagerCssFiles) {
  const fonts = new Set()
  for (const cssPath of eagerCssFiles) {
    const source = await readFile(path.join(stageRoot, ...cssPath.split("/")), "utf8")
    for (const match of source.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
      const block = match[1]
      if (!/unicode-range:[^}]*U\+(?:0000-00FF|\?\?)/i.test(block)) continue
      const urls = [...block.matchAll(/url\((['"]?)([^)'"\s]+)\1\)/g)].map((url) => url[2])
      const preferred = urls.find((url) => url.toLowerCase().endsWith(".woff2")) ?? urls[0]
      if (!preferred) throw new Error(`BUDGET_LATIN_FONT_URL_MISSING:${cssPath}`)
      const normalized = preferred.startsWith("/")
        ? preferred.slice(1)
        : path.posix.normalize(path.posix.join(path.posix.dirname(cssPath), preferred))
      fonts.add(normalized)
    }
  }
  if (fonts.size !== 2) throw new Error("BUDGET_FIRST_VIEW_FONT_SET_INVALID")
  return fonts
}

async function validateChunkInventory(root, roleByFile) {
  const inventoryPath = path.join(root, "artifacts", "release", "chunk-modules.v1.json")
  const inventory = parseJsonNoDuplicateKeys(await readFile(inventoryPath, "utf8"))
  assertExactKeys(inventory, ["schemaVersion", "chunks"], "CHUNK_MODULE_INVENTORY")
  if (inventory.schemaVersion !== 1 || !Array.isArray(inventory.chunks)) throw new Error("CHUNK_MODULE_INVENTORY_INVALID")
  const observed = new Set()
  for (const chunk of inventory.chunks) {
    assertExactKeys(chunk, ["fileName", "isEntry", "isDynamicEntry", "imports", "dynamicImports", "modules"], "CHUNK_MODULE")
    if (typeof chunk.fileName !== "string" || !Array.isArray(chunk.modules) || !Array.isArray(chunk.imports) || !Array.isArray(chunk.dynamicImports)) {
      throw new Error("CHUNK_MODULE_RECORD_INVALID")
    }
    if (observed.has(chunk.fileName)) throw new Error("CHUNK_MODULE_DUPLICATE")
    observed.add(chunk.fileName)
    if (!roleByFile.has(chunk.fileName)) throw new Error(`CHUNK_MODULE_UNCLASSIFIED:${chunk.fileName}`)
    if (chunk.modules.some((moduleId) => typeof moduleId !== "string" || moduleId.includes("\\") || /^[a-zA-Z]:/.test(moduleId))) {
      throw new Error(`CHUNK_MODULE_PATH_INVALID:${chunk.fileName}`)
    }
    if (roleByFile.get(chunk.fileName) === "eager-js" && chunk.modules.some((moduleId) => /(?:^|\/)three(?:\/|$)|@react-three/.test(moduleId))) {
      throw new Error("CHUNK_MODULE_THREE_LEAKED_EAGER")
    }
  }
  const expected = [...roleByFile.keys()].sort()
  if (JSON.stringify([...observed].sort()) !== JSON.stringify(expected)) throw new Error("CHUNK_MODULE_FILE_SET_MISMATCH")
}

export async function verifyBudget(root = process.cwd(), options = {}) {
  const build = await validateBuild(root)
  const stageRoot = path.join(root, "artifacts", "pages-site")
  const stageRecords = await discoverRegularFiles(stageRoot)
  const stageByPath = new Map(stageRecords.map((record) => [record.path, record]))
  const { digest: pagesSiteDigest } = await digestDirectory(stageRoot, "PAGES-SITE-V1\0")
  const identity = repositoryIdentity({ requireClean: options.requireClean ?? true })
  const manifest = build.manifest
  const { entryKey, eagerKeys, roleByFile } = classifyManifestGraph(manifest)

  await validateChunkInventory(root, roleByFile)
  const eagerCss = cssFilesForKeys(manifest, eagerKeys)
  const allCss = new Set(Object.values(manifest).flatMap((entry) => entry.css ?? []))
  const latinFonts = await firstViewFonts(stageRoot, eagerCss)
  for (const file of [...roleByFile.keys(), ...allCss, ...latinFonts]) {
    if (!stageByPath.has(file)) throw new Error(`BUDGET_STAGED_FILE_MISSING:${file}`)
  }

  const files = stageRecords.map((record) => {
    const kind = classifyKind(record.path)
    const role = roleByFile.get(record.path) ?? "static"
    const gzipBytes = TEXT_KINDS.has(kind) ? gzipSync(record.data, { level: 9, mtime: 0 }).length : null
    const firstViewFont = latinFonts.has(record.path)
    const initialTransfer = record.path === "index.html"
      || record.path === "favicon.svg"
      || role === "eager-js"
      || eagerCss.has(record.path)
      || firstViewFont
    return {
      path: record.path,
      kind,
      role,
      bytes: record.bytes,
      gzipBytes,
      sha256: record.sha256,
      initialTransfer,
      firstViewFont,
    }
  })

  const transferBytes = (file) => file.gzipBytes ?? file.bytes
  const totals = {
    fileCount: files.length,
    eagerJsGzipBytes: files.filter((file) => file.role === "eager-js").reduce((sum, file) => sum + (file.gzipBytes ?? 0), 0),
    atlasJsGzipBytes: files.filter((file) => file.role === "atlas-js").reduce((sum, file) => sum + (file.gzipBytes ?? 0), 0),
    cssGzipBytes: files.filter((file) => file.kind === "css").reduce((sum, file) => sum + (file.gzipBytes ?? 0), 0),
    firstViewFontBytes: files.filter((file) => file.firstViewFont).reduce((sum, file) => sum + file.bytes, 0),
    initialTransferBytes: files.filter((file) => file.initialTransfer).reduce((sum, file) => sum + transferBytes(file), 0),
    largestStaticNonFontBytes: Math.max(0, ...files.filter((file) => file.role === "static" && file.kind !== "font" && file.kind !== "pdf").map((file) => file.bytes)),
    cvBytes: files.find((file) => file.path === "le-huy-software-engineer-cv.pdf")?.bytes ?? 0,
  }

  for (const [budget, maximum] of Object.entries(BUDGETS)) {
    if (totals[budget] > maximum) throw new Error(`BUDGET_EXCEEDED:${budget}`)
  }

  const inventory = {
    schemaVersion: 1,
    sourceSha: identity.sha,
    sourceTree: identity.tree,
    pagesSiteDigest,
    files,
    totals,
  }
  await writeJsonAtomic(path.join(root, "artifacts", "release", "asset-inventory.v1.json"), inventory)
  return inventory
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const inventory = await verifyBudget(process.cwd(), { requireClean: !process.argv.includes("--allow-dirty") })
  console.log(`Budgets verified: eager ${inventory.totals.eagerJsGzipBytes} B gzip, Atlas ${inventory.totals.atlasJsGzipBytes} B gzip, CSS ${inventory.totals.cssGzipBytes} B gzip, initial ${inventory.totals.initialTransferBytes} B.`)
}
