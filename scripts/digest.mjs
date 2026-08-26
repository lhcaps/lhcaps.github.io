import { createHash } from "node:crypto"
import { lstat, readdir, readFile, realpath } from "node:fs/promises"
import path from "node:path"

const NUL = Buffer.from([0])

export function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex")
}

function assertUnicodeScalarString(value, label) {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index)
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1)
      if (!(next >= 0xdc00 && next <= 0xdfff)) throw new Error(`CANONICAL_JSON_LONE_SURROGATE:${label}`)
      index += 1
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      throw new Error(`CANONICAL_JSON_LONE_SURROGATE:${label}`)
    }
  }
}

export function canonicalJson(value, label = "root") {
  if (value === null) return "null"
  if (typeof value === "boolean") return value ? "true" : "false"
  if (typeof value === "string") {
    assertUnicodeScalarString(value, label)
    return JSON.stringify(value)
  }
  if (typeof value === "number") {
    if (!Number.isSafeInteger(value) || Object.is(value, -0)) throw new Error(`CANONICAL_JSON_UNSAFE_NUMBER:${label}`)
    return String(value)
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry, index) => canonicalJson(entry, `${label}[${index}]`)).join(",")}]`
  }
  if (typeof value === "object") {
    const prototype = Object.getPrototypeOf(value)
    if (prototype !== Object.prototype && prototype !== null) throw new Error(`CANONICAL_JSON_UNSUPPORTED_OBJECT:${label}`)
    const keys = Object.keys(value).sort()
    return `{${keys.map((key) => {
      assertUnicodeScalarString(key, `${label}.key`)
      const entry = value[key]
      if (entry === undefined) throw new Error(`CANONICAL_JSON_UNSUPPORTED_VALUE:${label}.${key}`)
      return `${JSON.stringify(key)}:${canonicalJson(entry, `${label}.${key}`)}`
    }).join(",")}}`
  }
  throw new Error(`CANONICAL_JSON_UNSUPPORTED_VALUE:${label}`)
}

export function parseJsonNoDuplicateKeys(source) {
  if (typeof source !== "string") throw new Error("JSON_SOURCE_NOT_STRING")
  let cursor = 0
  const whitespace = /\s/
  const skipWhitespace = () => {
    while (cursor < source.length && whitespace.test(source[cursor])) cursor += 1
  }
  const parseString = () => {
    if (source[cursor] !== '"') throw new Error(`JSON_EXPECTED_STRING:${cursor}`)
    const start = cursor
    cursor += 1
    while (cursor < source.length) {
      if (source[cursor] === "\\") {
        cursor += 2
        continue
      }
      if (source[cursor] === '"') {
        cursor += 1
        const value = JSON.parse(source.slice(start, cursor))
        assertUnicodeScalarString(value, `json@${start}`)
        return value
      }
      cursor += 1
    }
    throw new Error(`JSON_UNTERMINATED_STRING:${start}`)
  }
  const parseValue = () => {
    skipWhitespace()
    const character = source[cursor]
    if (character === '"') return parseString()
    if (character === "[") {
      cursor += 1
      const result = []
      skipWhitespace()
      if (source[cursor] === "]") {
        cursor += 1
        return result
      }
      while (cursor < source.length) {
        result.push(parseValue())
        skipWhitespace()
        if (source[cursor] === "]") {
          cursor += 1
          return result
        }
        if (source[cursor] !== ",") throw new Error(`JSON_EXPECTED_COMMA:${cursor}`)
        cursor += 1
      }
      throw new Error("JSON_UNTERMINATED_ARRAY")
    }
    if (character === "{") {
      cursor += 1
      const result = Object.create(null)
      const keys = new Set()
      skipWhitespace()
      if (source[cursor] === "}") {
        cursor += 1
        return result
      }
      while (cursor < source.length) {
        skipWhitespace()
        const key = parseString()
        if (keys.has(key)) throw new Error(`JSON_DUPLICATE_KEY:${key}`)
        keys.add(key)
        skipWhitespace()
        if (source[cursor] !== ":") throw new Error(`JSON_EXPECTED_COLON:${cursor}`)
        cursor += 1
        result[key] = parseValue()
        skipWhitespace()
        if (source[cursor] === "}") {
          cursor += 1
          return result
        }
        if (source[cursor] !== ",") throw new Error(`JSON_EXPECTED_COMMA:${cursor}`)
        cursor += 1
      }
      throw new Error("JSON_UNTERMINATED_OBJECT")
    }
    for (const [literal, value] of [["true", true], ["false", false], ["null", null]]) {
      if (source.startsWith(literal, cursor)) {
        cursor += literal.length
        return value
      }
    }
    const numberMatch = source.slice(cursor).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/)
    if (numberMatch) {
      cursor += numberMatch[0].length
      return Number(numberMatch[0])
    }
    throw new Error(`JSON_UNEXPECTED_TOKEN:${cursor}`)
  }

  const value = parseValue()
  skipWhitespace()
  if (cursor !== source.length) throw new Error(`JSON_TRAILING_CONTENT:${cursor}`)
  canonicalJson(value)
  return value
}

export function assertSafeRelativePath(relativePath) {
  if (typeof relativePath !== "string" || relativePath.length === 0) throw new Error("FILE_RECORD_EMPTY_PATH")
  if (relativePath.includes("\0") || relativePath.includes("\\")) throw new Error("FILE_RECORD_UNSAFE_PATH")
  if (relativePath !== relativePath.normalize("NFC")) throw new Error("FILE_RECORD_NON_NFC_PATH")
  if (path.posix.isAbsolute(relativePath) || /^[a-zA-Z]:/.test(relativePath)) throw new Error("FILE_RECORD_ABSOLUTE_PATH")
  const segments = relativePath.split("/")
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) throw new Error("FILE_RECORD_UNSAFE_SEGMENT")
  return relativePath
}

export function comparePathBytes(left, right) {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"))
}

function isInside(root, candidate) {
  const relative = path.relative(root, candidate)
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative))
}

export async function discoverRegularFiles(rootPath, options = {}) {
  const rootAbsolute = path.resolve(rootPath)
  const rootStats = await lstat(rootAbsolute)
  if (!rootStats.isDirectory() || rootStats.isSymbolicLink()) throw new Error("FILE_RECORD_ROOT_NOT_DIRECTORY")
  const rootReal = await realpath(rootAbsolute)
  const records = []

  async function visit(directoryAbsolute) {
    const entries = await readdir(directoryAbsolute, { withFileTypes: true })
    entries.sort((left, right) => comparePathBytes(left.name.normalize("NFC"), right.name.normalize("NFC")))
    for (const entry of entries) {
      const absolute = path.join(directoryAbsolute, entry.name)
      const stats = await lstat(absolute)
      if (stats.isSymbolicLink()) throw new Error("FILE_RECORD_LINK_REJECTED")
      const resolved = await realpath(absolute)
      if (!isInside(rootReal, resolved)) throw new Error("FILE_RECORD_ESCAPE")
      if (stats.isDirectory()) {
        await visit(absolute)
        continue
      }
      if (!stats.isFile()) throw new Error("FILE_RECORD_NON_FILE")
      const relative = assertSafeRelativePath(path.relative(rootAbsolute, absolute).split(path.sep).join("/").normalize("NFC"))
      if (options.exclude?.(relative)) continue
      const data = await readFile(absolute)
      records.push({ path: relative, bytes: data.length, sha256: sha256Bytes(data), data })
    }
  }

  await visit(rootAbsolute)
  records.sort((left, right) => comparePathBytes(left.path, right.path))
  return records
}

function updateFileRecords(hash, records) {
  const sorted = [...records].sort((left, right) => comparePathBytes(left.path, right.path))
  for (const record of sorted) {
    assertSafeRelativePath(record.path)
    if (!Buffer.isBuffer(record.data) || record.bytes !== record.data.length || record.sha256 !== sha256Bytes(record.data)) {
      throw new Error(`FILE_RECORD_CONTENT_MISMATCH:${record.path}`)
    }
    hash.update(Buffer.from(record.path, "utf8"))
    hash.update(NUL)
    hash.update(Buffer.from(String(record.bytes), "ascii"))
    hash.update(NUL)
    hash.update(record.data)
    hash.update(NUL)
  }
}

export function digestFileRecords(domain, records) {
  const hash = createHash("sha256")
  hash.update(Buffer.from(domain, "utf8"))
  updateFileRecords(hash, records)
  return hash.digest("hex")
}

export function digestCanonicalAndFileRecords(domain, value, records) {
  const hash = createHash("sha256")
  hash.update(Buffer.from(domain, "utf8"))
  hash.update(Buffer.from(canonicalJson(value), "utf8"))
  hash.update(NUL)
  updateFileRecords(hash, records)
  return hash.digest("hex")
}

export function publicFileRecords(records) {
  return records.map(({ path: relativePath, bytes, sha256 }) => ({ path: relativePath, bytes, sha256 }))
}

export async function digestDirectory(rootPath, domain, options = {}) {
  const records = await discoverRegularFiles(rootPath, options)
  return { digest: digestFileRecords(domain, records), records }
}
