import { createHash } from "node:crypto"
import { PDFArray, PDFDocument, PDFFont, PDFName, PDFString, StandardFonts, rgb, type PDFPage } from "pdf-lib"
import { portfolio } from "../../src/content/portfolio"

export const CV_GENERATOR_VERSION = "cv-v1"
export const CV_FILENAME = "le-huy-software-engineer-cv.pdf"
export const CV_EMAIL_URI = `mailto:${portfolio.contact.email}`
export const CV_GITHUB_URI = portfolio.contact.github

function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`).join(",")}}`
  }
  return JSON.stringify(value)
}

export function cvProjection() {
  return {
    identity: {
      name: portfolio.identity.name,
      role: portfolio.identity.role,
      target: portfolio.identity.target,
      orientation: "backend-leaning full-stack",
    },
    capabilitySummary: portfolio.capabilities.map(({ title, outcome }) => ({ title, outcome })),
    systems: portfolio.systems.map(({ order, title, tier, publicAnchor, summary }) => ({
      order,
      title,
      tier,
      publicAnchor,
      summary,
    })),
    contact: {
      email: portfolio.contact.email,
      github: portfolio.contact.github,
    },
  }
}

export function cvProjectionDigest(): string {
  return createHash("sha256").update(canonicalJson(cvProjection()), "utf8").digest("hex")
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/u)
  const lines: string[] = []
  let line = ""

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate
    } else {
      if (line) lines.push(line)
      line = word
    }
  }
  if (line) lines.push(line)
  return lines
}

function drawWrappedText(
  page: PDFPage,
  text: string,
  options: { x: number; y: number; font: PDFFont; size: number; maxWidth: number; lineHeight: number; color: ReturnType<typeof rgb> },
): number {
  const lines = wrapText(text, options.font, options.size, options.maxWidth)
  lines.forEach((line, index) => {
    page.drawText(line, {
      x: options.x,
      y: options.y - index * options.lineHeight,
      font: options.font,
      size: options.size,
      color: options.color,
    })
  })
  return options.y - lines.length * options.lineHeight
}

function addLinkAnnotation(
  pdf: PDFDocument,
  page: PDFPage,
  annots: PDFArray,
  uri: string,
  rectangle: [number, number, number, number],
): void {
  const annotation = pdf.context.obj({
    Type: "Annot",
    Subtype: "Link",
    Rect: rectangle,
    Border: [0, 0, 0],
    A: {
      Type: "Action",
      S: "URI",
      URI: PDFString.of(uri),
    },
  })
  annots.push(pdf.context.register(annotation))
  page.node.set(PDFName.of("Annots"), annots)
}

export async function buildCvBytes(): Promise<Uint8Array> {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595.28, 841.89])
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const mono = await pdf.embedFont(StandardFonts.Courier)
  const paper = rgb(0.953, 0.937, 0.894)
  const raisedPaper = rgb(0.984, 0.973, 0.937)
  const ink = rgb(0.125, 0.137, 0.118)
  const muted = rgb(0.408, 0.404, 0.369)
  const rust = rgb(0.706, 0.263, 0.173)
  const fixedDate = new Date("2026-08-22T00:00:00.000Z")
  const digest = cvProjectionDigest()

  pdf.setTitle("Le Huy - Software Engineer CV")
  pdf.setAuthor("Le Huy")
  pdf.setSubject(`${CV_GENERATOR_VERSION} sha256:${digest}`)
  pdf.setKeywords(["Software Engineer", "Junior Software Engineer", "backend-leaning full-stack", "Systems Atlas"])
  pdf.setCreator(`Le Huy Systems Atlas ${CV_GENERATOR_VERSION}`)
  pdf.setProducer(`Le Huy Systems Atlas ${CV_GENERATOR_VERSION}`)
  pdf.setCreationDate(fixedDate)
  pdf.setModificationDate(fixedDate)

  page.drawRectangle({ x: 0, y: 0, width: 595.28, height: 841.89, color: paper })
  page.drawRectangle({ x: 36, y: 36, width: 523.28, height: 769.89, color: raisedPaper, borderColor: ink, borderWidth: 0.8 })
  page.drawLine({ start: { x: 48, y: 792 }, end: { x: 547, y: 792 }, color: muted, thickness: 0.5 })
  page.drawText("SYSTEMS ATLAS / FACTS-ONLY CV", { x: 48, y: 800, font: mono, size: 7.5, color: muted })
  page.drawText("01", { x: 530, y: 800, font: mono, size: 7.5, color: rust })

  page.drawText(portfolio.identity.name, { x: 48, y: 742, font: bold, size: 42, color: ink })
  page.drawText(portfolio.identity.role, { x: 50, y: 716, font: bold, size: 16, color: rust })
  page.drawText(portfolio.identity.target, { x: 50, y: 698, font: mono, size: 8.5, color: muted })
  page.drawLine({ start: { x: 48, y: 680 }, end: { x: 547, y: 680 }, color: ink, thickness: 1 })

  page.drawText("CAPABILITY SUMMARY", { x: 48, y: 658, font: mono, size: 7.5, color: rust })
  page.drawText("Backend-leaning full-stack, from contract to release.", { x: 48, y: 634, font: bold, size: 16, color: ink })
  let summaryY = 612
  for (const summary of [
    "Governed domain contracts and typed product boundaries",
    "Asynchronous execution, deterministic data, and operational handoffs",
    "Scoped implementation, verification harnesses, and release evidence",
  ]) {
    page.drawText("+", { x: 50, y: summaryY, font: mono, size: 9, color: rust })
    page.drawText(summary, { x: 68, y: summaryY, font: regular, size: 9.4, color: ink })
    summaryY -= 19
  }

  page.drawText("SYSTEMS", { x: 48, y: 540, font: mono, size: 7.5, color: rust })
  page.drawText("Five systems. Five different failure surfaces.", { x: 48, y: 517, font: bold, size: 15, color: ink })

  let systemY = 486
  for (const system of portfolio.systems) {
    page.drawText(String(system.order).padStart(2, "0"), { x: 48, y: systemY, font: mono, size: 7.5, color: rust })
    page.drawText(system.title, { x: 78, y: systemY - 1, font: bold, size: 10.5, color: ink })
    page.drawText(`${system.tier.toUpperCase()} / ${system.publicAnchor}`, { x: 78, y: systemY - 15, font: mono, size: 6.8, color: muted })
    drawWrappedText(page, system.summary, { x: 78, y: systemY - 29, font: regular, size: 7.8, maxWidth: 445, lineHeight: 10, color: muted })
    page.drawLine({ start: { x: 48, y: systemY - 42 }, end: { x: 547, y: systemY - 42 }, color: rgb(0.847, 0.82, 0.761), thickness: 0.45 })
    systemY -= 57
  }

  page.drawText("CONTACT", { x: 48, y: 176, font: mono, size: 7.5, color: rust })
  page.drawText("Work with me", { x: 48, y: 146, font: bold, size: 18, color: ink })
  page.drawText(portfolio.contact.email, { x: 48, y: 116, font: regular, size: 10, color: rust })
  page.drawText("github.com/lhcaps", { x: 320, y: 116, font: regular, size: 10, color: rust })

  const annots = pdf.context.obj([]) as PDFArray
  addLinkAnnotation(pdf, page, annots, CV_EMAIL_URI, [46, 109, 224, 126])
  addLinkAnnotation(pdf, page, annots, CV_GITHUB_URI, [318, 109, 430, 126])

  page.drawLine({ start: { x: 48, y: 78 }, end: { x: 547, y: 78 }, color: ink, thickness: 0.8 })
  page.drawText("LE HUY / SOFTWARE ENGINEER / SYSTEMS ATLAS", { x: 48, y: 60, font: mono, size: 7, color: muted })
  page.drawText("huyle210525@gmail.com", { x: 395, y: 60, font: mono, size: 7, color: muted })

  return pdf.save({ useObjectStreams: false })
}
