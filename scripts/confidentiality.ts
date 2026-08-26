import { readFile } from "node:fs/promises"
import path from "node:path"
import { portfolio } from "../src/content/portfolio"
import {
  digestCanonicalAndFileRecords,
  discoverRegularFiles,
  parseJsonNoDuplicateKeys,
} from "./digest.mjs"
import { assertCurrentIso, assertExactKeys, writeJsonAtomic } from "./release-utils.mjs"

const scopeIds = ["public-copy", "metadata", "cv", "build-output"] as const
const receiptPath = path.join(process.cwd(), "docs", "release", "confidentiality-review.v1.json")

async function computeDigest() {
  const records = await discoverRegularFiles(path.join(process.cwd(), "artifacts", "pages-site"), {
    exclude: (relativePath: string) => relativePath === "release.json",
  })
  return digestCanonicalAndFileRecords("CONFIDENTIALITY-V1\0", portfolio, records)
}

const reviewedContentDigest = await computeDigest()

if (process.argv.includes("--write")) {
  await writeJsonAtomic(receiptPath, {
    schemaVersion: 1,
    scopeIds,
    reviewedContentDigest,
    result: "pass",
    reviewedAt: new Date().toISOString(),
  })
  console.log(`Confidentiality receipt written for ${reviewedContentDigest}.`)
} else {
  const receipt = parseJsonNoDuplicateKeys(await readFile(receiptPath, "utf8"))
  assertExactKeys(receipt, ["schemaVersion", "scopeIds", "reviewedContentDigest", "result", "reviewedAt"], "CONFIDENTIALITY_RECEIPT")
  if (receipt.schemaVersion !== 1 || JSON.stringify(receipt.scopeIds) !== JSON.stringify(scopeIds)) {
    throw new Error("CONFIDENTIALITY_RECEIPT_SCOPE_INVALID")
  }
  if (receipt.reviewedContentDigest !== reviewedContentDigest || receipt.result !== "pass") {
    throw new Error("CONFIDENTIALITY_RECEIPT_STALE_OR_FAILED")
  }
  assertCurrentIso(receipt.reviewedAt, "CONFIDENTIALITY_RECEIPT")
  console.log(`Confidentiality receipt verified for ${reviewedContentDigest}.`)
}
