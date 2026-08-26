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

function gitWithInput(cwd, args, input) {
  return execFileSync("git", args, { cwd, encoding: "utf8", input, stdio: ["pipe", "pipe", "pipe"] }).trim()
}

function signHead(repository) {
  const unsignedHead = git(repository, ["rev-parse", "HEAD"])
  const source = execFileSync("git", ["cat-file", "commit", unsignedHead], { cwd: repository, encoding: "utf8" })
  const separator = source.indexOf("\n\n")
  const signedSource = `${source.slice(0, separator)}\ngpgsig -----BEGIN PGP SIGNATURE-----\n fixture-signature\n -----END PGP SIGNATURE-----${source.slice(separator)}`
  const signedHead = gitWithInput(repository, ["hash-object", "-t", "commit", "-w", "--stdin"], signedSource)
  git(repository, ["update-ref", "refs/heads/main", signedHead, unsignedHead])
  return signedHead
}

function commitSnapshot(repository, sha) {
  const source = execFileSync("git", ["cat-file", "commit", sha], { cwd: repository, encoding: "utf8" })
  const separator = source.indexOf("\n\n")
  assert.notEqual(separator, -1)
  const headers = source.slice(0, separator).split("\n")
  const value = (key) => headers.find((line) => line.startsWith(`${key} `))?.slice(key.length + 1)
  return {
    tree: value("tree"),
    parents: headers.filter((line) => line.startsWith("parent ")).map((line) => line.slice(7)),
    author: value("author"),
    committer: value("committer"),
    message: source.slice(separator + 2),
  }
}

async function createRewriteFixture({
  signedRoot = false,
  signedTarget = false,
  includeDescendant = false,
  candidateIdentity = "allowed",
  bundleKind = "all",
} = {}) {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "systems-atlas-rewrite-"))
  const repository = path.join(temporaryRoot, "repository")
  const remote = path.join(temporaryRoot, "remote.git")
  const bundle = path.join(temporaryRoot, "before-rewrite.bundle")

  await mkdir(repository)
  git(temporaryRoot, ["init", "--bare", remote])
  git(repository, ["init", "-b", "main"])
  git(repository, ["config", "user.name", "Huy Le"])
  git(repository, ["config", "user.email", "huyle210525@gmail.com"])
  await writeFile(path.join(repository, "fixture.txt"), "baseline\n", "utf8")
  git(repository, ["add", "--", "fixture.txt"])
  git(repository, ["commit", "-m", "baseline"])

  if (signedRoot) {
    signHead(repository)
  }

  git(repository, ["remote", "add", "origin", remote])
  git(repository, ["push", "-u", "origin", "main"])
  const remoteBaseline = git(repository, ["rev-parse", "HEAD"])
  await writeFile(path.join(repository, "fixture.txt"), "candidate\n", "utf8")
  git(repository, ["add", "--", "fixture.txt"])
  const identityArguments = candidateIdentity === "allowed"
    ? []
    : ["-c", "user.name=Unexpected Contributor", "-c", "user.email=unexpected@example.invalid"]
  git(repository, [...identityArguments, "commit", "-m", `candidate\n\n${AUTHORIZED_CURSOR_TRAILER}`])
  if (signedTarget) signHead(repository)
  const targetSha = git(repository, ["rev-parse", "HEAD"])
  if (includeDescendant) {
    await writeFile(path.join(repository, "descendant.txt"), "descendant\n", "utf8")
    git(repository, ["add", "--", "descendant.txt"])
    git(repository, ["commit", "-m", "descendant"])
  }
  const localHead = git(repository, ["rev-parse", "HEAD"])
  if (bundleKind === "tag-only") {
    git(repository, ["tag", "bundle-candidate", localHead])
    git(repository, ["bundle", "create", bundle, "refs/tags/bundle-candidate"])
  } else {
    git(repository, ["bundle", "create", bundle, "--all"])
  }
  return { temporaryRoot, repository, remote, remoteBaseline, targetSha, localHead, bundle }
}

function runRewrite(fixture, apply = false) {
  return spawnSync(process.execPath, [
    rewriteScript,
    ...(apply ? ["--apply"] : []),
    "--expected-head", fixture.localHead,
    "--expected-remote", fixture.remoteBaseline,
    "--expected-origin", fixture.remote,
    "--bundle", fixture.bundle,
  ], { cwd: fixture.repository, encoding: "utf8", shell: false })
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
  const fixture = await createRewriteFixture()

  try {
    const result = runRewrite(fixture)

    assert.equal(result.status, 0, result.stderr)
    assert.deepEqual(JSON.parse(result.stdout), {
      oldHead: fixture.localHead,
      newHead: fixture.localHead,
      commitCount: 2,
      targetCount: 1,
      signedCommitCount: 0,
      applied: false,
    })
  } finally {
    await rm(fixture.temporaryRoot, { recursive: true, force: true })
  }
})

test("history rewrite apply preserves a signed prefix and rewrites only the target lineage", async () => {
  const fixture = await createRewriteFixture({ signedRoot: true, includeDescendant: true })
  const beforeTarget = commitSnapshot(fixture.repository, fixture.targetSha)
  const beforeDescendant = commitSnapshot(fixture.repository, fixture.localHead)

  try {
    const result = runRewrite(fixture, true)
    assert.equal(result.status, 0, result.stderr)
    const record = JSON.parse(result.stdout)
    assert.equal(record.oldHead, fixture.localHead)
    assert.notEqual(record.newHead, fixture.localHead)
    assert.equal(record.commitCount, 3)
    assert.equal(record.targetCount, 1)
    assert.equal(record.signedCommitCount, 1)
    assert.equal(record.applied, true)

    const rewritten = git(fixture.repository, ["rev-list", "--reverse", "HEAD"]).split(/\r?\n/u)
    assert.equal(rewritten.length, 3)
    assert.equal(rewritten[0], fixture.remoteBaseline)
    assert.notEqual(rewritten[1], fixture.targetSha)
    assert.equal(rewritten[2], record.newHead)
    const afterTarget = commitSnapshot(fixture.repository, rewritten[1])
    const afterDescendant = commitSnapshot(fixture.repository, rewritten[2])
    assert.equal(afterTarget.tree, beforeTarget.tree)
    assert.deepEqual(afterTarget.parents, [fixture.remoteBaseline])
    assert.equal(afterTarget.author, beforeTarget.author)
    assert.equal(afterTarget.committer, beforeTarget.committer)
    assert.equal(afterTarget.message, "candidate\n\n")
    assert.equal(afterDescendant.tree, beforeDescendant.tree)
    assert.deepEqual(afterDescendant.parents, [rewritten[1]])
    assert.equal(afterDescendant.author, beforeDescendant.author)
    assert.equal(afterDescendant.committer, beforeDescendant.committer)
    assert.equal(afterDescendant.message, beforeDescendant.message)
    assert.equal(git(fixture.repository, ["status", "--porcelain=v1", "--untracked-files=all"]), "")
    assert.equal(git(fixture.repository, ["ls-remote", "--heads", "origin", "refs/heads/main"]).split(/\s/u, 1)[0], fixture.remoteBaseline)
    assert.equal(git(fixture.repository, ["log", "--format=%B"]).includes(AUTHORIZED_CURSOR_TRAILER), false)
  } finally {
    await rm(fixture.temporaryRoot, { recursive: true, force: true })
  }
})

test("history rewrite requires the backup bundle to advertise the candidate as main", async () => {
  const fixture = await createRewriteFixture({ bundleKind: "tag-only" })

  try {
    const result = runRewrite(fixture)
    assert.equal(result.status, 1)
    assert.match(result.stderr, /HISTORY_REWRITE_BUNDLE_HEAD_MISSING/u)
  } finally {
    await rm(fixture.temporaryRoot, { recursive: true, force: true })
  }
})

test("history rewrite aborts rather than removing a signature from a changed commit", async () => {
  const fixture = await createRewriteFixture({ signedTarget: true })

  try {
    const result = runRewrite(fixture, true)
    assert.equal(result.status, 1)
    assert.match(result.stderr, /HISTORY_REWRITE_SIGNED_COMMIT_REQUIRES_REWRITE/u)
    assert.equal(git(fixture.repository, ["rev-parse", "HEAD"]), fixture.localHead)
  } finally {
    await rm(fixture.temporaryRoot, { recursive: true, force: true })
  }
})

test("history rewrite binds the configured operator identity and exact origin", async () => {
  const wrongIdentity = await createRewriteFixture()
  const wrongOrigin = await createRewriteFixture()

  try {
    git(wrongIdentity.repository, ["config", "user.email", "wrong@example.invalid"])
    const identityResult = runRewrite(wrongIdentity)
    assert.equal(identityResult.status, 1)
    assert.match(identityResult.stderr, /HISTORY_REWRITE_LOCAL_IDENTITY_INVALID/u)

    wrongOrigin.remote = `${wrongOrigin.remote}.unexpected`
    const originResult = runRewrite(wrongOrigin)
    assert.equal(originResult.status, 1)
    assert.match(originResult.stderr, /HISTORY_REWRITE_ORIGIN_INVALID/u)
  } finally {
    await rm(wrongIdentity.temporaryRoot, { recursive: true, force: true })
    await rm(wrongOrigin.temporaryRoot, { recursive: true, force: true })
  }
})

test("history rewrite stops when history contains an unaudited human identity", async () => {
  const fixture = await createRewriteFixture({ candidateIdentity: "unexpected" })

  try {
    const result = runRewrite(fixture)
    assert.equal(result.status, 1)
    assert.match(result.stderr, /HISTORY_REWRITE_IDENTITY_UNAUDITED/u)
  } finally {
    await rm(fixture.temporaryRoot, { recursive: true, force: true })
  }
})
