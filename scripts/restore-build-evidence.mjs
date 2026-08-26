import { lstat, mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { extractZipRegularFiles } from "./archive.mjs"
import { parseJsonNoDuplicateKeys, publicFileRecords } from "./digest.mjs"
import { artifactsForRun, downloadArtifact } from "./github-artifacts.mjs"
import { FULL_SHA, REPOSITORY, repositoryIdentity, safeError } from "./release-utils.mjs"
import { GENERATED_ROOTS, PHASE_PATHS, discoverGeneratedRecords, generatedEvidenceDigest, validateGeneratedAttestation } from "./verify-generated-evidence.mjs"

async function assertRootAbsent(root, relativePath) {
  try {
    await lstat(path.join(root, ...relativePath.split("/")))
    throw new Error(`RESTORE_TARGET_EXISTS:${relativePath}`)
  } catch (error) {
    if (error?.code !== "ENOENT") throw error
  }
}

export async function restoreBuildEvidence(root, context) {
  const identity = repositoryIdentity({ requireClean: true, requireNonShallow: true })
  if (!FULL_SHA.test(context.sha) || context.sha !== identity.sha || !Number.isInteger(context.runId) || !Number.isInteger(context.artifactId)) throw new Error("RESTORE_CONTEXT_INVALID")
  for (const generatedRoot of GENERATED_ROOTS) await assertRootAbsent(root, generatedRoot)
  const artifacts = await artifactsForRun(REPOSITORY, context.runId, context.token)
  const expectedName = `release-evidence-${context.sha}`
  const matches = artifacts.filter((artifact) => artifact.name === expectedName && artifact.expired === false)
  if (matches.length !== 1 || matches[0].id !== context.artifactId) throw new Error("RESTORE_ARTIFACT_SET_INVALID")
  const download = await downloadArtifact(REPOSITORY, context.artifactId, context.token)
  if (download.metadata.id !== context.artifactId || download.metadata.name !== expectedName || download.metadata.expired !== false || download.metadata.workflow_run?.id !== context.runId || download.metadata.workflow_run?.head_sha !== context.sha) throw new Error("RESTORE_ARTIFACT_METADATA_INVALID")
  if (download.metadata.digest !== null && download.metadata.digest !== undefined && download.metadata.digest !== `sha256:${download.sha256}`) throw new Error("RESTORE_ARTIFACT_DIGEST_INVALID")
  const files = extractZipRegularFiles(download.bytes)
  if (files.length === 0) throw new Error("RESTORE_ARCHIVE_EMPTY")
  for (const file of files) {
    if (!GENERATED_ROOTS.some((generatedRoot) => file.path === generatedRoot || file.path.startsWith(`${generatedRoot}/`))) throw new Error("RESTORE_ARCHIVE_PATH_REJECTED")
    const destination = path.join(root, ...file.path.split("/"))
    await mkdir(path.dirname(destination), { recursive: true })
    await writeFile(destination, file.data)
  }
  const selfPath = PHASE_PATHS.preupload
  const attestation = parseJsonNoDuplicateKeys(await readFile(path.join(root, ...selfPath.split("/")), "utf8"))
  const records = await discoverGeneratedRecords(root, selfPath)
  const expected = { digest: generatedEvidenceDigest("preupload", records), files: publicFileRecords(records) }
  validateGeneratedAttestation(attestation, "preupload", identity, expected)
  if (attestation.result !== "pass") throw new Error("RESTORE_PREUPLOAD_FAILED")
  return { fileCount: files.length, archiveDigest: download.sha256, generatedEvidenceDigest: attestation.generatedEvidenceDigest }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  try {
    const result = await restoreBuildEvidence(process.cwd(), {
      sha: process.env.EXPECTED_SHA,
      runId: Number(process.env.WORKFLOW_RUN_ID),
      artifactId: Number(process.env.RELEASE_EVIDENCE_ARTIFACT_ID),
      token: process.env.GITHUB_TOKEN,
    })
    console.log(`Build evidence restored: ${result.fileCount} files, preupload ${result.generatedEvidenceDigest}.`)
  } catch (error) {
    console.error(safeError(error))
    process.exitCode = 1
  }
}
