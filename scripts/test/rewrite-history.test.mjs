import assert from "node:assert/strict"
import { execFileSync, spawnSync } from "node:child_process"
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"
import { AUTHORIZED_CURSOR_TRAILER, removeAuthorizedTrailer } from "../rewrite-history.mjs"

const rewriteScript = fileURLToPath(new URL("../rewrite-history.mjs", import.meta.url))

function git(cwd, args) {
  return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
}

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

test("history rewrite audits an unpublished local head against the recorded remote baseline", async () => {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "systems-atlas-rewrite-"))
  const repository = path.join(temporaryRoot, "repository")
  const remote = path.join(temporaryRoot, "remote.git")
  const bundle = path.join(temporaryRoot, "before-rewrite.bundle")

  try {
    await mkdir(repository)
    git(temporaryRoot, ["init", "--bare", remote])
    git(repository, ["init", "-b", "main"])
    git(repository, ["config", "user.name", "Release Fixture"])
    git(repository, ["config", "user.email", "release-fixture@example.invalid"])
    await writeFile(path.join(repository, "fixture.txt"), "baseline\n", "utf8")
    git(repository, ["add", "--", "fixture.txt"])
    git(repository, ["commit", "-m", "baseline"])
    git(repository, ["remote", "add", "origin", remote])
    git(repository, ["push", "-u", "origin", "main"])
    const remoteBaseline = git(repository, ["rev-parse", "HEAD"])

    await writeFile(path.join(repository, "fixture.txt"), "candidate\n", "utf8")
    git(repository, ["add", "--", "fixture.txt"])
    git(repository, ["commit", "-m", `candidate\n\n${AUTHORIZED_CURSOR_TRAILER}`])
    const localHead = git(repository, ["rev-parse", "HEAD"])
    git(repository, ["bundle", "create", bundle, "--all"])

    const result = spawnSync(process.execPath, [
      rewriteScript,
      "--expected-head", localHead,
      "--expected-remote", remoteBaseline,
      "--bundle", bundle,
    ], { cwd: repository, encoding: "utf8", shell: false })

    assert.equal(result.status, 0, result.stderr)
    assert.deepEqual(JSON.parse(result.stdout), {
      oldHead: localHead,
      newHead: localHead,
      commitCount: 2,
      targetCount: 1,
      signedCommitCount: 0,
      applied: false,
    })
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true })
  }
})
