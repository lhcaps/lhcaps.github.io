import assert from "node:assert/strict"
import test from "node:test"
import { extractTarRegularFiles, extractZipRegularFiles } from "../archive.mjs"

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
  }
  return (crc ^ 0xffffffff) >>> 0
}

function zip(entries) {
  const locals = []
  const central = []
  let localOffset = 0
  for (const [name, data] of entries) {
    const nameBytes = Buffer.from(name)
    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0x0800, 6)
    local.writeUInt32LE(crc32(data), 14)
    local.writeUInt32LE(data.length, 18)
    local.writeUInt32LE(data.length, 22)
    local.writeUInt16LE(nameBytes.length, 26)
    locals.push(local, nameBytes, data)
    const record = Buffer.alloc(46)
    record.writeUInt32LE(0x02014b50, 0)
    record.writeUInt16LE(0x0314, 4)
    record.writeUInt16LE(20, 6)
    record.writeUInt16LE(0x0800, 8)
    record.writeUInt32LE(crc32(data), 16)
    record.writeUInt32LE(data.length, 20)
    record.writeUInt32LE(data.length, 24)
    record.writeUInt16LE(nameBytes.length, 28)
    record.writeUInt32LE(0x81a40000, 38)
    record.writeUInt32LE(localOffset, 42)
    central.push(record, nameBytes)
    localOffset += local.length + nameBytes.length + data.length
  }
  const centralBytes = Buffer.concat(central)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)
  eocd.writeUInt16LE(entries.length, 8)
  eocd.writeUInt16LE(entries.length, 10)
  eocd.writeUInt32LE(centralBytes.length, 12)
  eocd.writeUInt32LE(localOffset, 16)
  return Buffer.concat([...locals, centralBytes, eocd])
}

function octal(value, width) {
  return `${value.toString(8).padStart(width - 1, "0")}\0`
}

function tar(entries) {
  const chunks = []
  for (const [name, data] of entries) {
    const header = Buffer.alloc(512)
    header.write(name, 0, 100, "utf8")
    header.write("0000644\0", 100, 8, "ascii")
    header.write("0000000\0", 108, 8, "ascii")
    header.write("0000000\0", 116, 8, "ascii")
    header.write(octal(data.length, 12), 124, 12, "ascii")
    header.write(octal(0, 12), 136, 12, "ascii")
    header.fill(0x20, 148, 156)
    header[156] = 0x30
    header.write("ustar\0", 257, 6, "ascii")
    let checksum = 0
    for (const byte of header) checksum += byte
    header.write(`${checksum.toString(8).padStart(6, "0")}\0 `, 148, 8, "ascii")
    chunks.push(header, data, Buffer.alloc((512 - (data.length % 512)) % 512))
  }
  chunks.push(Buffer.alloc(1024))
  return Buffer.concat(chunks)
}

test("tar parser returns sorted byte-exact regular files", () => {
  const archive = tar([["z.txt", Buffer.from("z")], ["a/index.html", Buffer.from("atlas")]])
  const files = extractTarRegularFiles(archive)
  assert.deepEqual(files.map((file) => file.path), ["a/index.html", "z.txt"])
  assert.equal(files[0].data.toString("utf8"), "atlas")
})

test("tar parser rejects link types and traversal", () => {
  const linked = tar([["safe.txt", Buffer.from("x")]])
  linked[156] = 0x32
  linked.fill(0x20, 148, 156)
  let checksum = 0
  for (const byte of linked.subarray(0, 512)) checksum += byte
  linked.write(`${checksum.toString(8).padStart(6, "0")}\0 `, 148, 8, "ascii")
  assert.throws(() => extractTarRegularFiles(linked), /TYPE_REJECTED/)
  assert.throws(() => extractTarRegularFiles(tar([["../escape.txt", Buffer.from("x")]])), /UNSAFE_SEGMENT/)
})

test("zip parser returns byte-exact regular files and rejects traversal", () => {
  const files = extractZipRegularFiles(zip([["nested/evidence.json", Buffer.from("{}\n")]]))
  assert.equal(files[0].path, "nested/evidence.json")
  assert.equal(files[0].data.toString("utf8"), "{}\n")
  assert.throws(() => extractZipRegularFiles(zip([["../escape", Buffer.from("x")]])), /UNSAFE_SEGMENT/)
})
