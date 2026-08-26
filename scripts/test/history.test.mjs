import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import { parseJsonNoDuplicateKeys } from "../digest.mjs"
import { compileRules, scanPath, scanText, validateBinary, validateRules } from "../verify-history.mjs"

const rules = parseJsonNoDuplicateKeys(await readFile(new URL("../../docs/release/history-safe-patterns.v1.json", import.meta.url), "utf8"))

test("history rules have the closed schema and permit only the authorized Cursor trailer line", () => {
  validateRules(rules)
  const findings = new Map()
  scanText(
    "Subject\n\nCo-authored-by: Cursor <cursoragent@cursor.com>\n",
    compileRules(rules.commitMessageRules, "TEST_MESSAGE"),
    findings,
    new Set(rules.allowedExactCommitLines),
  )
  assert.equal(findings.size, 0)
  assert.deepEqual(rules.allowedExactCommitLines, ["Co-authored-by: Cursor <cursoragent@cursor.com>"])
})

test("history text and path rules detect generic unsafe fixtures without flagging references", () => {
  const textRules = compileRules(rules.textRules, "TEST_TEXT")
  const pathRules = compileRules(rules.pathRules, "TEST_PATH")
  const unsafeText = new Map()
  scanText(["pass", "word=", "'fictional-password-42'"].join(""), textRules, unsafeText)
  assert.equal(unsafeText.get("text-secret-assignment"), 1)
  const bearer = new Map()
  scanText(["Authorization: Bear", "er abcdefghijklmnopqrstuvwxyz"].join(""), textRules, bearer)
  assert.equal(bearer.get("text-bearer-token"), 1)
  const safeReference = new Map()
  scanText("token: ${{ secrets.GITHUB_TOKEN }}", textRules, safeReference)
  assert.equal(safeReference.size, 0)
  const unsafePath = new Map()
  scanPath("nested/.env.production", pathRules, unsafePath)
  assert.equal(unsafePath.get("path-dotenv"), 1)
})

test("binary policy classifies known current and historical fixtures and rejects unknown output", () => {
  const png = Buffer.from("89504e470d0a1a0a", "hex")
  const svgPrefix = Buffer.from("3c73766700", "hex")
  const current = new Map()
  validateBinary(png, "public/example.png", "current", rules.binaryPolicy, current)
  assert.equal(current.size, 0)
  const historical = new Map()
  validateBinary(svgPrefix, "legacy/example.svg", "historical", rules.binaryPolicy, historical)
  assert.equal(historical.size, 0)
  const unknown = new Map()
  validateBinary(Buffer.from([0, 1, 2, 3]), "artifacts/release/example.bin", "generated", rules.binaryPolicy, unknown)
  assert.equal(unknown.get("binary-magic-mismatch-generated"), 1)
})
