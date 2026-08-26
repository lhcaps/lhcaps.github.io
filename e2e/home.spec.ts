import AxeBuilder from "@axe-core/playwright"
import { expect, test, type Page } from "@playwright/test"
import { portfolio } from "../src/content/portfolio"

const chapterIds = [
  "opening",
  "atlas",
  "systems",
  "adaptation",
  "ai-engineering",
  "verification",
  "evidence-boundary",
  "capabilities",
  "contact",
] as const

const exactViewports = [
  { width: 375, height: 667 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
  { width: 767, height: 720 },
  { width: 769, height: 720 },
  { width: 1023, height: 640 },
  { width: 1025, height: 640 },
] as const

function observeConsole(page: Page) {
  const messages: string[] = []
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      messages.push(`${message.type()}:${message.text()}`)
    }
  })
  page.on("pageerror", (error) => messages.push(`pageerror:${error.message}`))
  return messages
}

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const clientWidth = document.documentElement.clientWidth
    const isClippedByAncestor = (element: HTMLElement) => {
      let parent = element.parentElement
      while (parent && parent !== document.body) {
        const overflowX = getComputedStyle(parent).overflowX
        const parentRect = parent.getBoundingClientRect()
        const rect = element.getBoundingClientRect()
        if (["auto", "scroll", "hidden", "clip"].includes(overflowX) && (rect.left < parentRect.left || rect.right > parentRect.right)) return true
        parent = parent.parentElement
      }
      return false
    }
    return {
      clientWidth,
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      body: { clientWidth: document.body.clientWidth, offsetWidth: document.body.offsetWidth, scrollWidth: document.body.scrollWidth },
      offenders: Array.from(document.querySelectorAll<HTMLElement>("body *"))
        .filter((element) => !isClippedByAncestor(element))
        .map((element) => {
          const rect = element.getBoundingClientRect()
          return { tag: element.tagName, id: element.id, className: element.className, left: rect.left, right: rect.right, width: rect.width }
        })
        .filter((rect) => rect.left < -1 || rect.right > clientWidth + 1)
        .sort((left, right) => right.right - left.right)
        .slice(0, 12),
    }
  })
  expect(overflow.scrollWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.clientWidth + 1)
}

test.describe("Systems Atlas reader journeys", () => {
  test("renders the ordered nine-chapter contract and approved destinations", async ({ page }) => {
    const consoleMessages = observeConsole(page)
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/")

    await expect(page.getByRole("heading", { level: 1, name: "Le Huy" })).toBeVisible()
    await expect(page.getByText("Full-time Junior Software Engineer", { exact: true })).toBeVisible()
    await expect(page.getByRole("link", { name: "Work with me" }).first()).toHaveAttribute("href", `mailto:${portfolio.contact.email}`)
    await expect(page.locator("main > section")).toHaveCount(chapterIds.length)
    expect(await page.locator("main > section").evaluateAll((sections) => sections.map((section) => section.id))).toEqual(chapterIds)
    expect(await page.locator("[id]").evaluateAll((elements) => {
      const ids = elements.map((element) => element.id)
      return new Set(ids).size === ids.length
    })).toBe(true)

    await expect(page.getByRole("link", { name: "GitHub (opens in a new tab)" })).toHaveAttribute("href", portfolio.contact.github)
    await expect(page.getByRole("link", { name: "GitHub (opens in a new tab)" })).toHaveAttribute("rel", "noopener noreferrer")
    await expect(page.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", portfolio.contact.cv)
    await expect(page.locator("img")).toHaveCount(0)
    await assertNoHorizontalOverflow(page)
    expect(consoleMessages).toEqual([])
  })

  test("keeps one selector state across five topologies, rapid changes, and narrative returns", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/#atlas")
    const selector = page.getByRole("group", { name: "Select a system topology" })

    for (const system of portfolio.systems) {
      const button = selector.getByRole("button", { name: system.title })
      await button.click()
      await expect(button).toHaveAttribute("aria-pressed", "true")
      await expect(page.getByRole("heading", { name: `${system.title} topology` })).toBeVisible()
      await expect(page.getByText(`${system.title} selected. ${system.topology.nodes.length} nodes, ${system.topology.routes.length} routes.`)).toHaveAttribute("aria-live", "polite")
      await expect(page.getByRole("link", { name: "Read this case" })).toHaveAttribute("href", system.anchor)
    }

    await selector.getByRole("button").evaluateAll((buttons) => {
      for (const button of buttons) (button as HTMLButtonElement).click()
    })
    await expect(selector.getByRole("button", { name: portfolio.systems.at(-1)!.title })).toHaveAttribute("aria-pressed", "true")

    for (let index = 0; index < portfolio.systems.length; index += 1) {
      await page.getByRole("link", { name: "Compare this topology" }).nth(index).click()
      await expect(selector.getByRole("button", { name: portfolio.systems[index].title })).toHaveAttribute("aria-pressed", "true")
    }
  })

  test("supports selector keyboard semantics and preserves selection through resize", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.goto("/#atlas")
    const selector = page.getByRole("group", { name: "Select a system topology" })
    const first = selector.getByRole("button", { name: portfolio.systems[0].title })
    await first.focus()
    await first.press("End")
    await expect(selector.getByRole("button", { name: portfolio.systems[4].title })).toHaveAttribute("aria-pressed", "true")
    await page.keyboard.press("ArrowLeft")
    await expect(selector.getByRole("button", { name: portfolio.systems[3].title })).toHaveAttribute("aria-pressed", "true")
    await page.keyboard.press("Home")
    await expect(first).toHaveAttribute("aria-pressed", "true")
    await selector.getByRole("button", { name: portfolio.systems[2].title }).focus()
    await page.keyboard.press("Enter")
    await expect(selector.getByRole("button", { name: portfolio.systems[2].title })).toHaveAttribute("aria-pressed", "true")
    await page.setViewportSize({ width: 390, height: 844 })
    await expect(selector.getByRole("button", { name: portfolio.systems[2].title })).toHaveAttribute("aria-pressed", "true")
    await expect(page.locator("canvas")).toHaveCount(0)
    await page.setViewportSize({ width: 1024, height: 768 })
    await expect(selector.getByRole("button", { name: portfolio.systems[2].title })).toHaveAttribute("aria-pressed", "true")
  })

  test("contains mobile navigation, traps focus, and restores the trigger", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/")
    const trigger = page.locator(".menu-trigger")
    await expect(trigger).toHaveAccessibleName("Open navigation")
    await trigger.click()
    await expect(trigger).toHaveAccessibleName("Close navigation")
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    await expect(page.locator("main")).toHaveAttribute("inert", "")
    await expect(page.getByRole("link", { name: "Opening" })).toBeFocused()
    await page.getByRole("link", { name: "Contact" }).focus()
    await page.keyboard.press("Tab")
    await expect(page.getByRole("link", { name: "Opening" })).toBeFocused()
    await page.keyboard.press("Shift+Tab")
    await expect(page.getByRole("link", { name: "Contact" })).toBeFocused()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("navigation", { name: "Mobile" })).toHaveCount(0)
    await expect(trigger).toBeFocused()
    await expect(page.locator("main")).not.toHaveAttribute("inert", "")
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("")
  })

  test("resolves direct case anchors below the fixed header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto("/#system-parkly")
    const target = page.locator("#system-parkly")
    await expect(target).toBeVisible()
    await expect.poll(async () => target.evaluate((element) => Math.round(element.getBoundingClientRect().top))).toBeGreaterThanOrEqual(72)
    expect(await target.evaluate((element) => element.getBoundingClientRect().top)).toBeLessThan(720)
  })

  test("passes automated WCAG checks on the DOM-primary mobile path", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/")
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze()
    expect(results.violations).toEqual([])
  })

  test("serves the CV and metadata assets from same-origin paths", async ({ page, request }) => {
    await page.goto("/")
    const cv = await request.get(portfolio.contact.cv)
    expect(cv.status()).toBe(200)
    expect(cv.headers()["content-type"]).toContain("application/pdf")
    expect((await cv.body()).byteLength).toBeGreaterThan(0)

    for (const path of ["/robots.txt", "/sitemap.xml", "/favicon.svg", "/og-image.png", "/release.json"]) {
      const response = await request.get(path)
      expect(response.status(), path).toBe(200)
      expect((await response.body()).byteLength, path).toBeGreaterThan(0)
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", portfolio.publication.canonicalUrl)
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${portfolio.publication.canonicalUrl}og-image.png`)
    const structuredData = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "null")
    expect(structuredData).toMatchObject({ "@type": "ProfilePage", mainEntity: { "@type": "Person", name: "Le Huy" } })
  })
})

test.describe("Canvas containment", () => {
  test("mounts exactly one demand Canvas on an eligible desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/#atlas")
    await expect(page.getByTestId("atlas-canvas")).toHaveCount(1, { timeout: 15_000 })
    await expect(page.getByText("Interactive scene ready")).toBeVisible()
    await expect(page.getByTestId("atlas-canvas")).toHaveAttribute("aria-hidden", "true")
    await expect(page.getByTestId("atlas-canvas")).toHaveAttribute("tabindex", "-1")
  })

  test("never requests the scene chunk below 768 or with Reduced Motion", async ({ page }) => {
    const sceneRequests: string[] = []
    page.on("request", (request) => {
      if (/\/assets\/AtlasScene-[^/]+\.js/.test(request.url())) sceneRequests.push(request.url())
    })
    await page.setViewportSize({ width: 767, height: 720 })
    await page.goto("/")
    await expect(page.locator("canvas")).toHaveCount(0)
    expect(sceneRequests).toEqual([])

    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.reload()
    await expect(page.locator("canvas")).toHaveCount(0)
    expect(sceneRequests).toEqual([])
  })

  test("contains a rejected scene chunk as a reload-only sticky fallback", async ({ page }) => {
    await page.route(/\/assets\/AtlasScene-[^/]+\.js/, (route) => route.abort("failed"))
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/#atlas")
    await expect(page.getByText("3D view unavailable. The complete system map is shown here.")).toBeVisible({ timeout: 15_000 })
    await expect(page.locator("canvas")).toHaveCount(0)
    for (const system of portfolio.systems) await page.getByRole("button", { name: system.title }).click()
    await expect(page.locator("canvas")).toHaveCount(0)
    await expect(page.getByRole("heading", { name: `${portfolio.systems[4].title} topology` })).toBeVisible()
  })
})

for (const reducedMotion of [false, true]) {
  for (const viewport of exactViewports) {
    test(`matrix ${viewport.width}x${viewport.height} / ${reducedMotion ? "reduced" : "normal"}`, async ({ page }) => {
      const consoleMessages = observeConsole(page)
      await page.emulateMedia({ reducedMotion: reducedMotion ? "reduce" : "no-preference" })
      await page.setViewportSize(viewport)
      await page.goto("/")
      await expect(page.getByRole("heading", { level: 1, name: "Le Huy" })).toBeVisible()
      await expect(page.getByRole("heading", { name: "Systems Atlas", exact: true })).toBeAttached()
      await expect(page.getByRole("heading", { name: "Selected Systems" })).toBeAttached()
      await expect(page.getByRole("heading", { name: "Bring the problem that refuses to stay still." })).toBeAttached()
      await assertNoHorizontalOverflow(page)

      if (viewport.width < 768 || reducedMotion) {
        await expect(page.locator("canvas")).toHaveCount(0)
        await expect(page.getByText("3D view unavailable. The complete system map is shown here.")).toBeAttached()
      }

      const selectorBoxes = await page.getByRole("group", { name: "Select a system topology" }).getByRole("button").evaluateAll((buttons) => buttons.map((button) => {
        const rect = button.getBoundingClientRect()
        return { width: rect.width, height: rect.height }
      }))
      expect(selectorBoxes.every((box) => box.width >= 44 && box.height >= 44)).toBe(true)
      expect(consoleMessages).toEqual([])
    })
  }
}

test("touch-emulated selection and local visual evidence", async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto("/")
  await page.screenshot({ path: "artifacts/screenshots/local/systems-atlas-390x844.png" })
  await page.getByRole("button", { name: "Parkly" }).tap()
  await expect(page.getByRole("button", { name: "Parkly" })).toHaveAttribute("aria-pressed", "true")
  await page.screenshot({ path: "artifacts/screenshots/local/systems-atlas-390x844-atlas.png" })
  await context.close()
})

test("desktop local visual evidence", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/")
  await page.screenshot({ path: "artifacts/screenshots/local/systems-atlas-1440x900.png" })
  const atlasHeading = page.getByRole("heading", { name: "Systems Atlas", exact: true })
  await atlasHeading.scrollIntoViewIfNeeded()
  await expect(atlasHeading).toBeInViewport()
  await page.screenshot({ path: "artifacts/screenshots/local/systems-atlas-1440x900-atlas.png" })
})
