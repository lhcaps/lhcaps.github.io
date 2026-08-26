import { mkdir, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { digestDirectory, discoverRegularFiles } from "./digest.mjs"
import { validateBuild } from "./validate-build.mjs"

function assertExactTarget(root, target) {
  const expected = path.resolve(root, "artifacts", "pages-site")
  const resolved = path.resolve(target)
  if (resolved !== expected || resolved === path.resolve(root)) throw new Error("STAGE_TARGET_UNSAFE")
}

export async function stagePages(root = process.cwd()) {
  await validateBuild(root)
  const distRoot = path.resolve(root, "dist")
  const targetRoot = path.resolve(root, "artifacts", "pages-site")
  assertExactTarget(root, targetRoot)

  const distRecords = await discoverRegularFiles(distRoot)
  const deployable = distRecords.filter((record) => !record.path.startsWith(".vite/"))
  for (const record of deployable) {
    const segments = record.path.split("/")
    if (segments.some((segment) => segment.startsWith("."))) throw new Error(`STAGE_DOTFILE_REJECTED:${record.path}`)
    if (record.path.endsWith(".map")) throw new Error(`STAGE_SOURCE_MAP_REJECTED:${record.path}`)
  }

  await rm(targetRoot, { recursive: true, force: true })
  await mkdir(targetRoot, { recursive: true })
  for (const record of deployable) {
    const destination = path.join(targetRoot, ...record.path.split("/"))
    await mkdir(path.dirname(destination), { recursive: true })
    await writeFile(destination, record.data)
  }

  const staged = await discoverRegularFiles(targetRoot)
  if (staged.length !== deployable.length) throw new Error("STAGE_FILE_COUNT_MISMATCH")
  for (let index = 0; index < staged.length; index += 1) {
    const actual = staged[index]
    const expected = deployable[index]
    if (actual.path !== expected.path || actual.bytes !== expected.bytes || actual.sha256 !== expected.sha256) {
      throw new Error(`STAGE_BYTE_MISMATCH:${actual.path}`)
    }
  }
  const { digest } = await digestDirectory(targetRoot, "PAGES-SITE-V1\0")
  return { fileCount: staged.length, pagesSiteDigest: digest, targetRoot }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const result = await stagePages()
  console.log(`Pages staged: ${result.fileCount} files, PAGES-SITE-V1 ${result.pagesSiteDigest}.`)
}
