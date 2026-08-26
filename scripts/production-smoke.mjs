import { createHash } from "node:crypto"
import { mkdir, readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "@playwright/test"
import { canonicalJson, parseJsonNoDuplicateKeys } from "./digest.mjs"
import { CANONICAL_URL, FULL_SHA, publicReleaseIdentity, safeError, writeJsonAtomic } from "./release-utils.mjs"

const SYSTEMS = [
  "Form Management",
  "VisionFlow Studio",
  "Production Booking & Operations Platform",
  "Parkly",
  "TFT Local Copilot",
]
const CHECKS = [
  ["release-identity", "not-applicable"],
  ["navigation", "1440x900"],
  ["systems", "1440x900"],
  ["mobile-no-canvas", "390x844"],
  ["contact", "1440x900"],
  ["metadata", "not-applicable"],
  ["pdf", "not-applicable"],
  ["console", "not-applicable"],
  ["overflow", "not-applicable"],
  ["payloads", "not-applicable"],
  ["major-assets", "not-applicable"],
]

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex")
}

async function fetchBytes(relativePath, sha) {
  const url = new URL(relativePath, CANONICAL_URL)
  url.searchParams.set("sha", sha)
  url.searchParams.set("t", String(Date.now()))
  const response = await fetch(url, { cache: "no-store", redirect: "error" })
  if (!response.ok) throw new Error(`PRODUCTION_FETCH_HTTP_${response.status}`)
  return { response, bytes: Buffer.from(await response.arrayBuffer()) }
}

async function waitForIdentity(sha) {
  let lastError
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const { bytes } = await fetchBytes("release.json", sha)
      const identity = parseJsonNoDuplicateKeys(bytes.toString("utf8"))
      if (canonicalJson(identity) === canonicalJson(publicReleaseIdentity(sha))) return identity
      lastError = new Error("PRODUCTION_IDENTITY_STALE")
    } catch (error) {
      lastError = error
    }
    await new Promise((resolve) => setTimeout(resolve, 10_000))
  }
  throw lastError ?? new Error("PRODUCTION_IDENTITY_UNAVAILABLE")
}

export function horizontalOverflowSnapshot() {
  const clientWidth = document.documentElement.clientWidth
  const isClippedByAncestor = (element) => {
    const rect = element.getBoundingClientRect()
    let parent = element.parentElement
    while (parent && parent !== document.body) {
      const overflowX = getComputedStyle(parent).overflowX
      const parentRect = parent.getBoundingClientRect()
      if (["auto", "scroll", "hidden", "clip"].includes(overflowX) && (rect.left < parentRect.left || rect.right > parentRect.right)) return true
      parent = parent.parentElement
    }
    return false
  }
  const offenders = Array.from(document.querySelectorAll("body *"))
    .filter((element) => !isClippedByAncestor(element))
    .map((element) => {
      const rect = element.getBoundingClientRect()
      return {
        tag: element.tagName,
        id: element.id,
        className: typeof element.className === "string" ? element.className : "",
        left: rect.left,
        right: rect.right,
      }
    })
    .filter((rect) => rect.left < -1 || rect.right > clientWidth + 1)
    .slice(0, 12)
  return {
    clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    rootOverflow: document.documentElement.scrollWidth > clientWidth + 1,
    offenderCount: offenders.length,
    offenders,
  }
}

async function overflowCount(page) {
  const snapshot = await page.evaluate(horizontalOverflowSnapshot)
  return Number(snapshot.rootOverflow) + snapshot.offenderCount
}

function newRecord(id, viewport) {
  return { id, viewport, result: "fail", count: 0, limitation: "Check did not complete." }
}

async function observe(id, records, procedure) {
  const record = records.get(id)
  try {
    record.count = await procedure()
    record.result = "pass"
    record.limitation = ""
  } catch (error) {
    record.result = "fail"
    record.limitation = safeError(error)
  }
}

export async function runProductionSmoke(root, sha) {
  if (!FULL_SHA.test(sha)) throw new Error("PRODUCTION_SHA_INVALID")
  const records = new Map(CHECKS.map(([id, viewport]) => [id, newRecord(id, viewport)]))
  const inventory = parseJsonNoDuplicateKeys(await readFile(path.join(root, "artifacts", "release", "asset-inventory.v1.json"), "utf8"))
  if (inventory.sourceSha !== sha || !Array.isArray(inventory.files)) throw new Error("PRODUCTION_INVENTORY_INVALID")
  await observe("release-identity", records, async () => {
    await waitForIdentity(sha)
    return 1
  })

  let browser
  let desktop
  let mobile
  const consoleMessages = []
  try {
    browser = await chromium.launch({ headless: true, args: ["--enable-webgl", "--ignore-gpu-blocklist", "--use-angle=swiftshader"] })
    const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", reducedMotion: "no-preference" })
    desktop = await desktopContext.newPage()
    desktop.on("console", (message) => {
      if (["warning", "error"].includes(message.type())) consoleMessages.push(`${message.type()}:${message.text()}`)
    })
    desktop.on("pageerror", (error) => consoleMessages.push(`pageerror:${safeError(error)}`))
    await desktop.goto(`${CANONICAL_URL}?sha=${sha}`, { waitUntil: "networkidle" })

    await observe("navigation", records, async () => {
      const links = desktop.locator('nav[aria-label="Primary"] a')
      const count = await links.count()
      if (count !== 6) throw new Error("PRODUCTION_NAVIGATION_COUNT_INVALID")
      for (let index = 0; index < count; index += 1) {
        const href = await links.nth(index).getAttribute("href")
        if (!href?.startsWith("#")) throw new Error("PRODUCTION_NAVIGATION_HREF_INVALID")
        await links.nth(index).click()
        await desktop.locator(href).waitFor({ state: "visible" })
      }
      return count
    })

    await observe("systems", records, async () => {
      await desktop.goto(`${CANONICAL_URL}#atlas`, { waitUntil: "networkidle" })
      for (const title of SYSTEMS) {
        const button = desktop.getByRole("button", { name: title, exact: true })
        await button.click()
        if (await button.getAttribute("aria-pressed") !== "true") throw new Error("PRODUCTION_SYSTEM_SELECTION_INVALID")
        await desktop.getByRole("heading", { name: `${title} topology`, exact: true }).waitFor({ state: "visible" })
      }
      return SYSTEMS.length
    })

    await observe("contact", records, async () => {
      const mail = desktop.getByRole("link", { name: "Work with me" }).first()
      const github = desktop.getByRole("link", { name: "GitHub (opens in a new tab)" })
      const cv = desktop.getByRole("link", { name: "Download CV" })
      if (await mail.getAttribute("href") !== "mailto:huyle210525@gmail.com" || await github.getAttribute("href") !== "https://github.com/lhcaps" || await cv.getAttribute("href") !== "/le-huy-software-engineer-cv.pdf") throw new Error("PRODUCTION_CONTACT_DESTINATION_INVALID")
      return 3
    })

    const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light", reducedMotion: "reduce", isMobile: true, hasTouch: true })
    mobile = await mobileContext.newPage()
    const sceneRequests = []
    mobile.on("request", (request) => {
      if (/\/assets\/AtlasScene-[^/]+\.js/u.test(request.url())) sceneRequests.push(request.url())
    })
    mobile.on("console", (message) => {
      if (["warning", "error"].includes(message.type())) consoleMessages.push(`${message.type()}:${message.text()}`)
    })
    mobile.on("pageerror", (error) => consoleMessages.push(`pageerror:${safeError(error)}`))
    await mobile.goto(`${CANONICAL_URL}?sha=${sha}`, { waitUntil: "networkidle" })
    await observe("mobile-no-canvas", records, async () => {
      if (await mobile.locator("canvas").count() !== 0 || sceneRequests.length !== 0) throw new Error("PRODUCTION_MOBILE_CANVAS_PRESENT")
      return 1
    })

    await observe("overflow", records, async () => {
      const desktopOverflow = await overflowCount(desktop)
      const mobileOverflow = await overflowCount(mobile)
      if (desktopOverflow !== 0 || mobileOverflow !== 0) throw new Error("PRODUCTION_HORIZONTAL_OVERFLOW")
      return 2
    })

    const screenshotRoot = path.join(root, "artifacts", "screenshots", "production")
    await mkdir(screenshotRoot, { recursive: true })
    await desktop.goto(`${CANONICAL_URL}?sha=${sha}`, { waitUntil: "networkidle" })
    await desktop.screenshot({ path: path.join(screenshotRoot, "systems-atlas-1440x900.png"), animations: "disabled" })
    await mobile.goto(`${CANONICAL_URL}?sha=${sha}`, { waitUntil: "networkidle" })
    await mobile.screenshot({ path: path.join(screenshotRoot, "systems-atlas-390x844.png"), animations: "disabled" })
  } catch (error) {
    for (const id of ["navigation", "systems", "mobile-no-canvas", "contact", "overflow"]) {
      const record = records.get(id)
      if (record.result !== "pass") record.limitation = safeError(error)
    }
  }

  await observe("metadata", records, async () => {
    const { bytes: htmlBytes } = await fetchBytes("index.html", sha)
    const html = htmlBytes.toString("utf8")
    for (const marker of ['<link rel="canonical" href="https://lhcaps.github.io/"', '<meta property="og:image" content="https://lhcaps.github.io/og-image.png"']) if (!html.includes(marker)) throw new Error("PRODUCTION_METADATA_MARKER_MISSING")
    if (!/"@type"\s*:\s*"ProfilePage"/u.test(html)) throw new Error("PRODUCTION_STRUCTURED_DATA_MISSING")
    for (const endpoint of ["robots.txt", "sitemap.xml", "favicon.svg", "og-image.png"]) await fetchBytes(endpoint, sha)
    return 5
  })

  await observe("pdf", records, async () => {
    const { response, bytes } = await fetchBytes("le-huy-software-engineer-cv.pdf", sha)
    if (!(response.headers.get("content-type") ?? "").toLowerCase().includes("application/pdf") || bytes.length === 0) throw new Error("PRODUCTION_CV_RESPONSE_INVALID")
    return 1
  })

  await observe("payloads", records, async () => {
    for (const file of inventory.files) {
      const { bytes } = await fetchBytes(file.path, sha)
      if (bytes.length !== file.bytes || sha256(bytes) !== file.sha256) throw new Error("PRODUCTION_PAYLOAD_MISMATCH")
    }
    return inventory.files.length
  })

  await observe("major-assets", records, async () => {
    const major = inventory.files.filter((file) => file.kind === "image" || file.kind === "pdf" || file.kind === "font")
    if (major.length < 5) throw new Error("PRODUCTION_MAJOR_ASSET_SET_INVALID")
    return major.length
  })

  await observe("console", records, async () => {
    if (consoleMessages.length > 0) throw new Error(`PRODUCTION_CONSOLE_MESSAGES_${consoleMessages.length}`)
    return 2
  })

  if (browser) await browser.close()
  const checks = CHECKS.map(([id]) => records.get(id))
  const result = checks.every((check) => check.result === "pass" && check.limitation === "") ? "pass" : "fail"
  const smoke = { schemaVersion: 1, sha, url: CANONICAL_URL, checks, result, recordedAt: new Date().toISOString() }
  await writeJsonAtomic(path.join(root, "artifacts", "release", "production-smoke.v1.json"), smoke)
  if (result !== "pass") throw new Error(`PRODUCTION_SMOKE_FAILED:${checks.filter((check) => check.result !== "pass").map((check) => check.id).join(",")}`)
  return smoke
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  try {
    const smoke = await runProductionSmoke(process.cwd(), process.env.EXPECTED_SHA)
    console.log(`Production smoke passed: ${smoke.checks.length} ordered checks for ${smoke.sha}.`)
  } catch (error) {
    console.error(safeError(error))
    process.exitCode = 1
  }
}
