import assert from "node:assert/strict"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import {
  assertSafeRelativePath,
  canonicalJson,
  digestDirectory,
  parseJsonNoDuplicateKeys,
  publicFileRecords,
} from "../digest.mjs"

test("CanonicalJsonV1 pins nested ordering, arrays, escapes, Unicode, and integers", () => {
  const input = { z: [3, "line\n", true, null], a: { "é": "ok", A: -7 } }
  assert.equal(canonicalJson(input), '{"a":{"A":-7,"é":"ok"},"z":[3,"line\\n",true,null]}')
  assert.equal(canonicalJson(parseJsonNoDuplicateKeys('{"z":1,"a":[true,null]}')), '{"a":[true,null],"z":1}')
})

test("CanonicalJsonV1 rejects every unsupported numeric, value, Unicode, and duplicate-key domain", () => {
  for (const value of [1.25, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1, -0, undefined, 1n]) {
    assert.throws(() => canonicalJson(value))
  }
  assert.throws(() => canonicalJson("\ud800"), /LONE_SURROGATE/)
  assert.throws(() => canonicalJson(new Date()), /UNSUPPORTED_OBJECT/)
  assert.throws(() => parseJsonNoDuplicateKeys('{"a":1,"a":2}'), /DUPLICATE_KEY/)
  assert.throws(() => parseJsonNoDuplicateKeys('{"a":1} trailing'), /TRAILING_CONTENT/)
})

test("FileRecordV1 sorts by UTF-8 path bytes and changes when bytes change", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "systems-atlas-digest-"))
  try {
    await mkdir(path.join(root, "nested"))
    await writeFile(path.join(root, "z.txt"), "z")
    await writeFile(path.join(root, "nested", "a.txt"), "a")
    const first = await digestDirectory(root, "PAGES-SITE-V1\0")
    assert.deepEqual(publicFileRecords(first.records).map((record) => record.path), ["nested/a.txt", "z.txt"])
    const second = await digestDirectory(root, "PAGES-SITE-V1\0")
    assert.equal(first.digest, second.digest)
    await writeFile(path.join(root, "nested", "a.txt"), "changed")
    const changed = await digestDirectory(root, "PAGES-SITE-V1\0")
    assert.notEqual(changed.digest, first.digest)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

test("FileRecordV1 rejects path escapes, separators, dot segments, and non-NFC paths", () => {
  for (const value of ["", "/absolute", "C:/drive", "a\\b", "a/../b", "a//b", "e\u0301.txt"]) {
    assert.throws(() => assertSafeRelativePath(value))
  }
  assert.equal(assertSafeRelativePath("nested/é.txt"), "nested/é.txt")
})
