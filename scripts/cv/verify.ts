import { readFile, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { PDFDocument } from "pdf-lib"
import { PDFParse } from "pdf-parse"
import { buildCvBytes, CV_EMAIL_URI, CV_FILENAME, CV_GENERATOR_VERSION, CV_GITHUB_URI, cvProjectionDigest } from "./cv"
import { portfolio } from "../../src/content/portfolio"

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const committedPath = path.join(repositoryRoot, "public", CV_FILENAME)
const candidatePath = path.join(repositoryRoot, "artifacts", "release", "cv-candidate.pdf")
const committed = await readFile(committedPath)
const candidate = Buffer.from(await buildCvBytes())

await mkdir(path.dirname(candidatePath), { recursive: true })
await writeFile(candidatePath, candidate)

if (!committed.equals(candidate)) throw new Error("CV_BYTES_NOT_DETERMINISTIC")
if (committed.length === 0 || committed.length > 524_288) throw new Error("CV_SIZE_INVALID")
if (path.basename(committedPath) !== CV_FILENAME) throw new Error("CV_FILENAME_INVALID")

const document = await PDFDocument.load(committed)
if (document.getPageCount() !== 1) throw new Error("CV_PAGE_COUNT_INVALID")
if (document.getSubject() !== `${CV_GENERATOR_VERSION} sha256:${cvProjectionDigest()}`) {
  throw new Error("CV_PROVENANCE_INVALID")
}

const parser = new PDFParse({ data: committed })
const result = await parser.getText()
await parser.destroy()
const text = result.text.replace(/\s+/gu, " ").trim()
const requiredText = [
  portfolio.identity.name,
  portfolio.identity.role,
  "Junior Software Engineer",
  "Backend-leaning full-stack",
  portfolio.contact.email,
  "github.com/lhcaps",
  ...portfolio.systems.map((system) => system.title),
]
for (const required of requiredText) {
  if (!text.toLocaleLowerCase("en-US").includes(required.toLocaleLowerCase("en-US"))) {
    throw new Error(`CV_REQUIRED_TEXT_MISSING:${required}`)
  }
}

const orderedMarkers = [portfolio.identity.name, portfolio.identity.role, "CAPABILITY SUMMARY", "SYSTEMS", "CONTACT"]
let previousIndex = -1
for (const marker of orderedMarkers) {
  const index = text.indexOf(marker, previousIndex + 1)
  if (index <= previousIndex) throw new Error(`CV_READING_ORDER_INVALID:${marker}`)
  previousIndex = index
}

const raw = committed.toString("latin1")
for (const uri of [CV_EMAIL_URI, CV_GITHUB_URI]) {
  if (!raw.includes(`/URI (${uri})`)) throw new Error(`CV_LINK_MISSING:${uri}`)
}
const linkAnnotations = raw.match(/\/Subtype \/Link/g)?.length ?? 0
if (linkAnnotations !== 2) throw new Error("CV_LINK_ANNOTATION_COUNT")

process.stdout.write(`CV verified: 1 page, ${committed.length} bytes, ${requiredText.length} required text markers, 2 links.\n`)
