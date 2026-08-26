import assert from "node:assert/strict"
import test from "node:test"
import { AUTHORIZED_CURSOR_TRAILER, removeAuthorizedTrailer } from "../rewrite-history.mjs"

test("history rewrite removes only the exact authorized Cursor trailer line", () => {
  const source = Buffer.from(`Subject\n\nBody stays exact.\n\n${AUTHORIZED_CURSOR_TRAILER}\n`)
  const result = removeAuthorizedTrailer(source)
  assert.equal(result.targetCount, 1)
  assert.equal(result.message.toString("utf8"), "Subject\n\nBody stays exact.\n\n")
})

test("history rewrite preserves messages with no target byte-for-byte", () => {
  const source = Buffer.from("Subject\n\nHuman-authored body.\n")
  const result = removeAuthorizedTrailer(source)
  assert.equal(result.targetCount, 0)
  assert.equal(Buffer.compare(result.message, source), 0)
})

test("history rewrite rejects non-authorized AI attribution lines", () => {
  const unsafe = ["Subject", "", ["Co-authored-by: Co", "dex <bot@example.invalid>"].join(""), ""].join("\n")
  assert.throws(() => removeAuthorizedTrailer(Buffer.from(unsafe)), /UNAUTHORIZED_AI_TRAILER/)
})
