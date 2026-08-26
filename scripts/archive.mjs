import { inflateRawSync } from "node:zlib"
import { assertSafeRelativePath, comparePathBytes, sha256Bytes } from "./digest.mjs"

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
  }
  return (crc ^ 0xffffffff) >>> 0
}

function decodeName(buffer, flags) {
  if ((flags & 0x0800) === 0 && buffer.some((byte) => byte > 0x7f)) throw new Error("ZIP_FILENAME_ENCODING_UNSAFE")
  const name = new TextDecoder("utf-8", { fatal: true }).decode(buffer)
  if (name !== name.normalize("NFC")) throw new Error("ZIP_FILENAME_NON_NFC")
  return name
}

function findEndOfCentralDirectory(buffer) {
  const minimum = Math.max(0, buffer.length - 65_557)
  for (let offset = buffer.length - 22; offset >= minimum; offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) return offset
  }
  throw new Error("ZIP_EOCD_MISSING")
}

export function extractZipRegularFiles(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 22) throw new Error("ZIP_INVALID")
  const eocd = findEndOfCentralDirectory(buffer)
  const disk = buffer.readUInt16LE(eocd + 4)
  const centralDisk = buffer.readUInt16LE(eocd + 6)
  const diskEntries = buffer.readUInt16LE(eocd + 8)
  const totalEntries = buffer.readUInt16LE(eocd + 10)
  const centralSize = buffer.readUInt32LE(eocd + 12)
  const centralOffset = buffer.readUInt32LE(eocd + 16)
  const commentLength = buffer.readUInt16LE(eocd + 20)
  if (disk !== 0 || centralDisk !== 0 || diskEntries !== totalEntries || totalEntries === 0xffff || centralSize === 0xffffffff || centralOffset === 0xffffffff || eocd + 22 + commentLength !== buffer.length || centralOffset + centralSize !== eocd) {
    throw new Error("ZIP_EOCD_UNSUPPORTED")
  }
  const files = []
  const observed = new Set()
  let cursor = centralOffset
  for (let index = 0; index < totalEntries; index += 1) {
    if (cursor + 46 > eocd || buffer.readUInt32LE(cursor) !== 0x02014b50) throw new Error("ZIP_CENTRAL_INVALID")
    const flags = buffer.readUInt16LE(cursor + 8)
    const method = buffer.readUInt16LE(cursor + 10)
    const expectedCrc = buffer.readUInt32LE(cursor + 16)
    const compressedSize = buffer.readUInt32LE(cursor + 20)
    const uncompressedSize = buffer.readUInt32LE(cursor + 24)
    const nameLength = buffer.readUInt16LE(cursor + 28)
    const extraLength = buffer.readUInt16LE(cursor + 30)
    const entryCommentLength = buffer.readUInt16LE(cursor + 32)
    const diskStart = buffer.readUInt16LE(cursor + 34)
    const externalAttributes = buffer.readUInt32LE(cursor + 38)
    const localOffset = buffer.readUInt32LE(cursor + 42)
    if ((flags & 1) !== 0 || ![0, 8].includes(method) || compressedSize === 0xffffffff || uncompressedSize === 0xffffffff || diskStart !== 0 || localOffset === 0xffffffff) throw new Error("ZIP_ENTRY_UNSUPPORTED")
    const nameStart = cursor + 46
    const nameEnd = nameStart + nameLength
    if (nameEnd + extraLength + entryCommentLength > eocd) throw new Error("ZIP_CENTRAL_BOUNDS_INVALID")
    const name = decodeName(buffer.subarray(nameStart, nameEnd), flags)
    const directory = name.endsWith("/")
    const normalizedName = directory ? name.slice(0, -1) : name
    if (normalizedName !== "") assertSafeRelativePath(normalizedName)
    const unixMode = (externalAttributes >>> 16) & 0xffff
    const fileType = unixMode & 0xf000
    if (fileType !== 0 && fileType !== 0x8000 && !(directory && fileType === 0x4000)) throw new Error("ZIP_ENTRY_TYPE_REJECTED")
    if (!directory && fileType === 0x4000) throw new Error("ZIP_DIRECTORY_FLAG_MISMATCH")

    if (localOffset + 30 > centralOffset || buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error("ZIP_LOCAL_INVALID")
    const localFlags = buffer.readUInt16LE(localOffset + 6)
    const localMethod = buffer.readUInt16LE(localOffset + 8)
    const localNameLength = buffer.readUInt16LE(localOffset + 26)
    const localExtraLength = buffer.readUInt16LE(localOffset + 28)
    const localNameStart = localOffset + 30
    const localNameEnd = localNameStart + localNameLength
    const dataStart = localNameEnd + localExtraLength
    const dataEnd = dataStart + compressedSize
    if (localFlags !== flags || localMethod !== method || dataEnd > centralOffset || decodeName(buffer.subarray(localNameStart, localNameEnd), flags) !== name) throw new Error("ZIP_LOCAL_MISMATCH")
    const compressed = buffer.subarray(dataStart, dataEnd)
    const data = method === 0 ? Buffer.from(compressed) : inflateRawSync(compressed)
    if (data.length !== uncompressedSize || crc32(data) !== expectedCrc) throw new Error("ZIP_CONTENT_MISMATCH")
    if (!directory) {
      if (observed.has(normalizedName)) throw new Error("ZIP_PATH_DUPLICATE")
      observed.add(normalizedName)
      files.push({ path: normalizedName, bytes: data.length, sha256: sha256Bytes(data), data })
    }
    cursor = nameEnd + extraLength + entryCommentLength
  }
  if (cursor !== eocd) throw new Error("ZIP_CENTRAL_SIZE_MISMATCH")
  files.sort((left, right) => comparePathBytes(left.path, right.path))
  return files
}

function tarString(block, start, length) {
  const slice = block.subarray(start, start + length)
  const nul = slice.indexOf(0)
  return slice.subarray(0, nul < 0 ? slice.length : nul).toString("utf8")
}

function tarOctal(block, start, length) {
  const source = tarString(block, start, length).trim()
  if (source === "") return 0
  if (!/^[0-7]+$/u.test(source)) throw new Error("TAR_OCTAL_INVALID")
  const value = Number.parseInt(source, 8)
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("TAR_OCTAL_UNSAFE")
  return value
}

export function extractTarRegularFiles(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length % 512 !== 0) throw new Error("TAR_LENGTH_INVALID")
  const files = []
  const observed = new Set()
  let offset = 0
  let zeroBlocks = 0
  while (offset < buffer.length) {
    const block = buffer.subarray(offset, offset + 512)
    if (block.every((byte) => byte === 0)) {
      zeroBlocks += 1
      offset += 512
      if (zeroBlocks >= 2) {
        if (!buffer.subarray(offset).every((byte) => byte === 0)) throw new Error("TAR_TRAILING_CONTENT")
        break
      }
      continue
    }
    if (zeroBlocks > 0) throw new Error("TAR_ZERO_BLOCK_SEQUENCE_INVALID")
    const expectedChecksum = tarOctal(block, 148, 8)
    let actualChecksum = 0
    for (let index = 0; index < 512; index += 1) actualChecksum += index >= 148 && index < 156 ? 0x20 : block[index]
    if (actualChecksum !== expectedChecksum) throw new Error("TAR_CHECKSUM_INVALID")
    const name = tarString(block, 0, 100)
    const prefix = tarString(block, 345, 155)
    const rawPath = prefix ? `${prefix}/${name}` : name
    const stripped = rawPath.startsWith("./") ? rawPath.slice(2) : rawPath
    const type = String.fromCharCode(block[156] || 0x30)
    const size = tarOctal(block, 124, 12)
    const dataStart = offset + 512
    const dataEnd = dataStart + size
    if (dataEnd > buffer.length) throw new Error("TAR_ENTRY_BOUNDS_INVALID")
    if (type === "5") {
      const directory = stripped.endsWith("/") ? stripped.slice(0, -1) : stripped
      if (directory !== "" && directory !== ".") assertSafeRelativePath(directory)
      if (size !== 0) throw new Error("TAR_DIRECTORY_SIZE_INVALID")
    } else if (type === "0" || type === "\0") {
      assertSafeRelativePath(stripped)
      if (observed.has(stripped)) throw new Error("TAR_PATH_DUPLICATE")
      observed.add(stripped)
      const data = Buffer.from(buffer.subarray(dataStart, dataEnd))
      files.push({ path: stripped, bytes: data.length, sha256: sha256Bytes(data), data })
    } else {
      throw new Error("TAR_ENTRY_TYPE_REJECTED")
    }
    offset = dataStart + Math.ceil(size / 512) * 512
  }
  if (zeroBlocks < 2) throw new Error("TAR_END_MARKER_MISSING")
  files.sort((left, right) => comparePathBytes(left.path, right.path))
  return files
}
