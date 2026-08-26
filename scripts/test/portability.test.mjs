import assert from "node:assert/strict"
import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const publicRoot = path.join(root, "public")
const passthroughTextExtensions = new Set([".svg", ".txt", ".xml"])

test("tracked text and public passthrough assets are LF-stable across Git checkouts", async () => {
  const attributes = await readFile(path.join(root, ".gitattributes"), "utf8")
  assert.match(attributes, /^\* text=auto eol=lf$/m)

  const entries = await readdir(publicRoot, { withFileTypes: true })
  const textFiles = entries
    .filter((entry) => entry.isFile() && passthroughTextExtensions.has(path.extname(entry.name)))
    .map((entry) => entry.name)
    .sort()

  assert.ok(textFiles.length > 0)
  for (const fileName of textFiles) {
    const bytes = await readFile(path.join(publicRoot, fileName))
    assert.equal(bytes.includes(Buffer.from("\r\n")), false, `${fileName} must use LF line endings`)
  }
})
