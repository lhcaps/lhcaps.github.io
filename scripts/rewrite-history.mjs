import { execFileSync } from "node:child_process"
import { lstat, realpath } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { FULL_SHA, git, repositoryIdentity, safeError } from "./release-utils.mjs"

export const AUTHORIZED_CURSOR_TRAILER = "Co-authored-by: Cursor <cursoragent@cursor.com>"

function gitBuffer(args, options = {}) {
  return execFileSync("git", args, {
    cwd: options.cwd ?? process.cwd(),
    encoding: options.encoding ?? null,
    input: options.input,
    env: options.env ?? process.env,
    stdio: [options.input === undefined ? "ignore" : "pipe", "pipe", "pipe"],
  })
}

function splitCommit(buffer) {
  const separator = buffer.indexOf(Buffer.from("\n\n"))
  if (separator < 0) throw new Error("HISTORY_REWRITE_COMMIT_INVALID")
  const headerSource = buffer.subarray(0, separator).toString("utf8")
  const message = buffer.subarray(separator + 2)
  const headers = []
  for (const line of headerSource.split("\n")) {
    if (line.startsWith(" ")) {
      const previous = headers.at(-1)
      if (!previous) throw new Error("HISTORY_REWRITE_HEADER_CONTINUATION_INVALID")
      previous.value += `\n${line}`
      continue
    }
    const separatorIndex = line.indexOf(" ")
    if (separatorIndex <= 0) throw new Error("HISTORY_REWRITE_HEADER_INVALID")
    headers.push({ key: line.slice(0, separatorIndex), value: line.slice(separatorIndex + 1) })
  }
  const values = (key) => headers.filter((header) => header.key === key).map((header) => header.value)
  const singleton = (key) => {
    const matches = values(key)
    if (matches.length !== 1) throw new Error(`HISTORY_REWRITE_HEADER_CARDINALITY:${key}`)
    return matches[0]
  }
  const unexpected = headers.filter((header) => !["tree", "parent", "author", "committer", "gpgsig"].includes(header.key))
  if (unexpected.length > 0) throw new Error("HISTORY_REWRITE_UNSUPPORTED_HEADER")
  return {
    tree: singleton("tree"),
    parents: values("parent"),
    author: singleton("author"),
    committer: singleton("committer"),
    signed: values("gpgsig").length > 0,
    message,
  }
}

function parseIdentity(source, label) {
  const match = source.match(/^(.*) <([^<>]+)> (\d+) ([+-]\d{4})$/u)
  if (!match) throw new Error(`HISTORY_REWRITE_${label}_INVALID`)
  return { name: match[1], email: match[2], timestamp: match[3], timezone: match[4] }
}

export function removeAuthorizedTrailer(message) {
  if (!Buffer.isBuffer(message)) throw new Error("HISTORY_REWRITE_MESSAGE_NOT_BUFFER")
  const source = message.toString("utf8")
  if (Buffer.from(source, "utf8").compare(message) !== 0) throw new Error("HISTORY_REWRITE_MESSAGE_UTF8_INVALID")
  const hadFinalNewline = source.endsWith("\n")
  const lines = source.split("\n")
  if (hadFinalNewline) lines.pop()
  let targetCount = 0
  const retained = []
  for (const line of lines) {
    if (line === AUTHORIZED_CURSOR_TRAILER) {
      targetCount += 1
      continue
    }
    if (/^(?:Co-authored-by:.*(?:Codex|Claude)|Generated-by:|AI-assisted-by:)/iu.test(line)) {
      throw new Error("HISTORY_REWRITE_UNAUTHORIZED_AI_TRAILER")
    }
    retained.push(line)
  }
  const output = `${retained.join("\n")}${hadFinalNewline ? "\n" : ""}`
  return { message: Buffer.from(output, "utf8"), targetCount }
}

async function verifyExternalBundle(root, bundlePath, expectedHead) {
  if (!path.isAbsolute(bundlePath)) throw new Error("HISTORY_REWRITE_BUNDLE_NOT_ABSOLUTE")
  const rootReal = await realpath(root)
  const bundleReal = await realpath(bundlePath)
  const relative = path.relative(rootReal, bundleReal)
  if (relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative))) {
    throw new Error("HISTORY_REWRITE_BUNDLE_INSIDE_REPOSITORY")
  }
  const stats = await lstat(bundleReal)
  if (!stats.isFile() || stats.isSymbolicLink()) throw new Error("HISTORY_REWRITE_BUNDLE_INVALID")
  execFileSync("git", ["bundle", "verify", bundleReal], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
  const heads = execFileSync("git", ["bundle", "list-heads", bundleReal], { cwd: root, encoding: "utf8" })
  if (!heads.split(/\r?\n/u).some((line) => line.startsWith(`${expectedHead} `))) throw new Error("HISTORY_REWRITE_BUNDLE_HEAD_MISSING")
}

function remoteMain(root) {
  const output = execFileSync("git", ["ls-remote", "--heads", "origin", "refs/heads/main"], { cwd: root, encoding: "utf8" }).trim()
  const match = output.match(/^([a-f0-9]{40})\s+refs\/heads\/main$/u)
  if (!match) throw new Error("HISTORY_REWRITE_REMOTE_MAIN_INVALID")
  return match[1]
}

function commitMetadata(root, sha) {
  return splitCommit(gitBuffer(["cat-file", "commit", sha], { cwd: root }))
}

function createCommit(root, original, rewrittenParents, message) {
  const author = parseIdentity(original.author, "AUTHOR")
  const committer = parseIdentity(original.committer, "COMMITTER")
  const args = ["-c", "commit.gpgsign=false", "commit-tree", original.tree]
  for (const parent of rewrittenParents) args.push("-p", parent)
  args.push("-F", "-")
  const output = gitBuffer(args, {
    cwd: root,
    encoding: "utf8",
    input: message,
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: author.name,
      GIT_AUTHOR_EMAIL: author.email,
      GIT_AUTHOR_DATE: `${author.timestamp} ${author.timezone}`,
      GIT_COMMITTER_NAME: committer.name,
      GIT_COMMITTER_EMAIL: committer.email,
      GIT_COMMITTER_DATE: `${committer.timestamp} ${committer.timezone}`,
    },
  }).trim()
  if (!FULL_SHA.test(output)) throw new Error("HISTORY_REWRITE_NEW_COMMIT_INVALID")
  return output
}

export async function auditAndRewrite(root, options) {
  const identity = repositoryIdentity({ requireClean: true, requireNonShallow: true })
  if (git(["branch", "--show-current"], root) !== "main") throw new Error("HISTORY_REWRITE_BRANCH_INVALID")
  if (identity.sha !== options.expectedHead || !FULL_SHA.test(options.expectedRemote) || options.expectedRemote !== identity.sha) throw new Error("HISTORY_REWRITE_EXPECTATION_INVALID")
  if (remoteMain(root) !== options.expectedRemote) throw new Error("HISTORY_REWRITE_REMOTE_ADVANCED")
  await verifyExternalBundle(root, options.bundlePath, identity.sha)

  const commits = git(["rev-list", "--reverse", "--topo-order", "HEAD"], root).split(/\r?\n/u).filter(Boolean)
  const originals = new Map(commits.map((sha) => [sha, commitMetadata(root, sha)]))
  let targetCount = 0
  let signedCommitCount = 0
  for (const original of originals.values()) {
    if (original.parents.length > 1) throw new Error("HISTORY_REWRITE_MERGE_UNSUPPORTED")
    const result = removeAuthorizedTrailer(original.message)
    targetCount += result.targetCount
    if (original.signed) signedCommitCount += 1
  }
  if (!options.apply) return { oldHead: identity.sha, newHead: identity.sha, commitCount: commits.length, targetCount, signedCommitCount, applied: false }
  if (targetCount === 0) return { oldHead: identity.sha, newHead: identity.sha, commitCount: commits.length, targetCount, signedCommitCount, applied: false }

  const rewritten = new Map()
  for (const sha of commits) {
    const original = originals.get(sha)
    const cleaned = removeAuthorizedTrailer(original.message)
    const rewrittenParents = original.parents.map((parent) => {
      const mapped = rewritten.get(parent)
      if (!mapped) throw new Error("HISTORY_REWRITE_PARENT_ORDER_INVALID")
      return mapped
    })
    const newSha = createCommit(root, original, rewrittenParents, cleaned.message)
    const candidate = commitMetadata(root, newSha)
    if (candidate.tree !== original.tree || candidate.author !== original.author || candidate.committer !== original.committer || candidate.parents.length !== rewrittenParents.length || candidate.parents.some((parent, index) => parent !== rewrittenParents[index]) || Buffer.compare(candidate.message, cleaned.message) !== 0) {
      throw new Error("HISTORY_REWRITE_EQUIVALENCE_FAILED")
    }
    rewritten.set(sha, newSha)
  }
  const newHead = rewritten.get(identity.sha)
  if (!FULL_SHA.test(newHead) || commitMetadata(root, newHead).tree !== identity.tree) throw new Error("HISTORY_REWRITE_FINAL_TREE_CHANGED")
  execFileSync("git", ["update-ref", "refs/heads/main", newHead, identity.sha], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
  const after = repositoryIdentity({ requireClean: true, requireNonShallow: true })
  if (after.sha !== newHead || after.tree !== identity.tree) throw new Error("HISTORY_REWRITE_REF_UPDATE_FAILED")
  return { oldHead: identity.sha, newHead, commitCount: commits.length, targetCount, signedCommitCount, applied: true }
}

function argument(name) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : undefined
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  try {
    const result = await auditAndRewrite(process.cwd(), {
      apply: process.argv.includes("--apply"),
      expectedHead: argument("--expected-head"),
      expectedRemote: argument("--expected-remote"),
      bundlePath: argument("--bundle"),
    })
    console.log(JSON.stringify(result))
  } catch (error) {
    console.error(safeError(error))
    process.exitCode = 1
  }
}
