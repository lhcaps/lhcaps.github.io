import { sha256Bytes } from "./digest.mjs"

export function githubHeaders(token) {
  if (typeof token !== "string" || token.length < 8) throw new Error("GITHUB_TOKEN_MISSING")
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "systems-atlas-release-attestor",
  }
}

export async function githubJson(url, token) {
  const response = await fetch(url, { headers: githubHeaders(token), redirect: "follow" })
  if (!response.ok) throw new Error(`GITHUB_API_HTTP_${response.status}`)
  return response.json()
}

export async function downloadArtifact(repository, artifactId, token) {
  if (!/^lhcaps\/lhcaps\.github\.io$/u.test(repository) || !Number.isInteger(artifactId) || artifactId <= 0) throw new Error("GITHUB_ARTIFACT_ARGUMENT_INVALID")
  const base = `https://api.github.com/repos/${repository}/actions/artifacts/${artifactId}`
  const metadata = await githubJson(base, token)
  const response = await fetch(`${base}/zip`, { headers: githubHeaders(token), redirect: "follow" })
  if (!response.ok) throw new Error(`GITHUB_ARTIFACT_DOWNLOAD_HTTP_${response.status}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  return { metadata, bytes, sha256: sha256Bytes(bytes) }
}

export async function artifactsForRun(repository, runId, token) {
  if (!Number.isInteger(runId) || runId <= 0) throw new Error("GITHUB_RUN_ID_INVALID")
  const value = await githubJson(`https://api.github.com/repos/${repository}/actions/runs/${runId}/artifacts?per_page=100`, token)
  if (!value || !Array.isArray(value.artifacts)) throw new Error("GITHUB_RUN_ARTIFACTS_INVALID")
  return value.artifacts
}
