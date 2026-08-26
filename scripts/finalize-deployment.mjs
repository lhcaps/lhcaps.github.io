import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { extractTarRegularFiles, extractZipRegularFiles } from "./archive.mjs"
import { canonicalJson, digestFileRecords, discoverRegularFiles, parseJsonNoDuplicateKeys, publicFileRecords, sha256Bytes } from "./digest.mjs"
import { artifactsForRun, downloadArtifact, githubJson } from "./github-artifacts.mjs"
import { CANONICAL_URL, FULL_SHA, RELEASE_REF, REPOSITORY, publicReleaseIdentity, repositoryIdentity, safeError, writeJsonAtomic } from "./release-utils.mjs"
import { validateProductionSmoke } from "./verify-generated-evidence.mjs"

function parseContext(environment) {
  const context = {
    sha: environment.EXPECTED_SHA,
    startingMainSha: environment.STARTING_MAIN_SHA,
    workflowRunId: Number(environment.WORKFLOW_RUN_ID),
    pagesArtifactId: Number(environment.PAGES_ARTIFACT_ID),
    pagesSiteDigest: environment.PAGES_SITE_DIGEST,
    token: environment.GITHUB_TOKEN,
  }
  if (!FULL_SHA.test(context.sha) || context.startingMainSha !== context.sha || !Number.isInteger(context.workflowRunId) || context.workflowRunId <= 0 || !Number.isInteger(context.pagesArtifactId) || context.pagesArtifactId <= 0 || !/^[a-f0-9]{64}$/u.test(context.pagesSiteDigest)) throw new Error("DEPLOYMENT_CONTEXT_INVALID")
  return context
}

async function fetchPublicIdentity(sha) {
  const response = await fetch(`${CANONICAL_URL}release.json?sha=${sha}&t=${Date.now()}`, { cache: "no-store", redirect: "error" })
  if (!response.ok) throw new Error(`PUBLIC_IDENTITY_HTTP_${response.status}`)
  const identity = parseJsonNoDuplicateKeys(await response.text())
  if (canonicalJson(identity) !== canonicalJson(publicReleaseIdentity(sha))) throw new Error("PUBLIC_IDENTITY_MISMATCH")
  return identity
}

async function productionReview(root, sha) {
  const screenshotRoot = path.join(root, "artifacts", "screenshots", "production")
  const screenshots = await discoverRegularFiles(screenshotRoot)
  const expected = new Map([
    ["systems-atlas-1440x900.png", "1440x900"],
    ["systems-atlas-390x844.png", "390x844"],
  ])
  if (screenshots.length !== expected.size || screenshots.some((record) => !expected.has(record.path))) throw new Error("PRODUCTION_SCREENSHOT_SET_INVALID")
  const files = screenshots.map((record) => ({
    path: `artifacts/screenshots/production/${record.path}`,
    viewport: expected.get(record.path),
    bytes: record.bytes,
    sha256: record.sha256,
  }))
  const evidence = { schemaVersion: 1, sha, files }
  const evidencePath = path.join(root, "artifacts", "release", "production-review-evidence.v1.json")
  await writeJsonAtomic(evidencePath, evidence)
  const evidenceBytes = await readFile(evidencePath)
  const attestation = {
    schemaVersion: 1,
    sha,
    releaseIdentitySha: sha,
    verdict: "pass",
    findingDisposition: "none",
    reviewedAt: new Date().toISOString(),
    evidenceRef: "artifacts/release/production-review-evidence.v1.json",
    evidenceDigest: sha256Bytes(evidenceBytes),
  }
  await writeJsonAtomic(path.join(root, "artifacts", "release", "production-review-attestation.v1.json"), attestation)
  return evidence
}

export async function finalizeDeployment(root, environment = process.env) {
  const context = parseContext(environment)
  const identity = repositoryIdentity({ requireClean: true, requireNonShallow: true })
  if (identity.sha !== context.sha) throw new Error("DEPLOYMENT_CHECKOUT_SHA_MISMATCH")
  const artifacts = await artifactsForRun(REPOSITORY, context.workflowRunId, context.token)
  const pageArtifacts = artifacts.filter((artifact) => artifact.name === "github-pages" && artifact.expired === false)
  if (pageArtifacts.length !== 1 || pageArtifacts[0].id !== context.pagesArtifactId) throw new Error("PAGES_ARTIFACT_SET_INVALID")
  const download = await downloadArtifact(REPOSITORY, context.pagesArtifactId, context.token)
  const metadata = download.metadata
  if (metadata.id !== context.pagesArtifactId || metadata.name !== "github-pages" || metadata.expired !== false || metadata.workflow_run?.id !== context.workflowRunId || metadata.workflow_run?.head_sha !== context.sha || metadata.digest !== `sha256:${download.sha256}`) throw new Error("PAGES_ARTIFACT_METADATA_INVALID")
  const outer = extractZipRegularFiles(download.bytes)
  if (outer.length !== 1 || outer[0].path !== "artifact.tar") throw new Error("PAGES_ARCHIVE_SHAPE_INVALID")
  const siteRecords = extractTarRegularFiles(outer[0].data)
  const pagesSiteDigest = digestFileRecords("PAGES-SITE-V1\0", siteRecords)
  if (pagesSiteDigest !== context.pagesSiteDigest) throw new Error("PAGES_SITE_DIGEST_MISMATCH")

  const publicIdentity = await fetchPublicIdentity(context.sha)
  const smoke = parseJsonNoDuplicateKeys(await readFile(path.join(root, "artifacts", "release", "production-smoke.v1.json"), "utf8"))
  validateProductionSmoke(smoke, context.sha)
  await productionReview(root, context.sha)

  const remote = await githubJson(`https://api.github.com/repos/${REPOSITORY}/git/ref/heads/main`, context.token)
  const remoteMainShaAfterSmoke = remote?.ref === RELEASE_REF && FULL_SHA.test(remote?.object?.sha) ? remote.object.sha : null
  if (!remoteMainShaAfterSmoke) throw new Error("REMOTE_MAIN_RESPONSE_INVALID")
  const branchAdvanced = remoteMainShaAfterSmoke !== context.startingMainSha
  const attestation = {
    schemaVersion: 1,
    sha: context.sha,
    startingMainSha: context.startingMainSha,
    workflowRunId: context.workflowRunId,
    pagesArtifactId: context.pagesArtifactId,
    pagesArtifactName: "github-pages",
    pagesArchiveDigest: `sha256:${download.sha256}`,
    pagesSiteDigest,
    publicIdentity,
    remoteMainShaAfterSmoke,
    branchAdvanced,
    result: branchAdvanced ? "blocked" : "pass",
    recordedAt: new Date().toISOString(),
  }
  await writeJsonAtomic(path.join(root, "artifacts", "release", "deployment-attestation.v1.json"), attestation)
  if (branchAdvanced) throw new Error("REMOTE_MAIN_ADVANCED_DURING_DEPLOYMENT")
  return { ...attestation, siteFileCount: siteRecords.length }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  try {
    const result = await finalizeDeployment(process.cwd())
    console.log(`Deployment attested: run ${result.workflowRunId}, artifact ${result.pagesArtifactId}, ${result.siteFileCount} site files, SHA ${result.sha}.`)
  } catch (error) {
    console.error(safeError(error))
    process.exitCode = 1
  }
}
