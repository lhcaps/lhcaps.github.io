import { execFileSync, spawnSync } from "node:child_process"
import { mkdir, rename, writeFile } from "node:fs/promises"
import path from "node:path"

export const REPOSITORY = "lhcaps/lhcaps.github.io"
export const RELEASE_REF = "refs/heads/main"
export const CANONICAL_URL = "https://lhcaps.github.io/"
export const FULL_SHA = /^[a-f0-9]{40}$/
export const SHA256 = /^[a-f0-9]{64}$/

export function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? process.cwd(),
    encoding: "utf8",
    env: options.env ?? process.env,
    shell: false,
    stdio: options.capture === false ? "inherit" : "pipe",
  })
  return {
    exitCode: result.status ?? 1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    error: result.error,
  }
}

export function git(args, cwd = process.cwd()) {
  return execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim()
}

export function assertExactKeys(value, expected, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label}:NOT_OBJECT`)
  const actual = Object.keys(value).sort()
  const required = [...expected].sort()
  if (actual.length !== required.length || actual.some((key, index) => key !== required[index])) {
    throw new Error(`${label}:KEYS_MISMATCH`)
  }
}

export function assertCurrentIso(value, label) {
  if (typeof value !== "string") throw new Error(`${label}:INVALID_TIME`)
  const timestamp = Date.parse(value)
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString() !== value || timestamp > Date.now() + 5_000) {
    throw new Error(`${label}:INVALID_TIME`)
  }
}

export function repositoryIdentity({ requireClean = false, requireNonShallow = true } = {}) {
  if (requireNonShallow && git(["rev-parse", "--is-shallow-repository"]) !== "false") throw new Error("GIT_SHALLOW_REPOSITORY")
  const sha = git(["rev-parse", "HEAD"])
  const tree = git(["rev-parse", "HEAD^{tree}"])
  if (!FULL_SHA.test(sha) || !FULL_SHA.test(tree)) throw new Error("GIT_IDENTITY_INVALID")
  if (requireClean && git(["status", "--porcelain=v1", "--untracked-files=all"]) !== "") throw new Error("GIT_CANDIDATE_NOT_CLEAN")
  return { sha, tree }
}

export async function writeJsonAtomic(filePath, value) {
  const absolute = path.resolve(filePath)
  await mkdir(path.dirname(absolute), { recursive: true })
  const temporary = `${absolute}.tmp-${process.pid}`
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8")
  await rename(temporary, absolute)
}

export function publicReleaseIdentity(sha) {
  if (!FULL_SHA.test(sha)) throw new Error("PUBLIC_RELEASE_SHA_INVALID")
  return {
    schemaVersion: 1,
    sha,
    repository: REPOSITORY,
    ref: RELEASE_REF,
    canonicalUrl: CANONICAL_URL,
  }
}

export function safeError(error) {
  if (error instanceof Error) return error.message.split(/\r?\n/, 1)[0].slice(0, 240)
  return "UNKNOWN_ERROR"
}
