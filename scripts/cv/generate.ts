import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { buildCvBytes, CV_FILENAME } from "./cv"

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const outputPath = path.join(repositoryRoot, "public", CV_FILENAME)

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, await buildCvBytes())
process.stdout.write(`${outputPath}\n`)
