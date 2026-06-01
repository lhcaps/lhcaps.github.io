import { test, expect } from "@playwright/test"

test.describe("Portfolio", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Le Huy/i)
  })

  test("hero headline is visible", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })

  test("project switcher is visible", async ({ page }) => {
    await page.goto("/")
    const switcher = page.locator("button:has-text('Runtime Core')")
    await expect(switcher).toBeVisible()
  })

  test("systems section is visible", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("#systems")).toBeVisible()
  })

  test("contact section is visible", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("#contact")).toBeVisible()
  })

  test("no critical console errors", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text())
      }
    })
    await page.goto("/")
    await page.waitForLoadState("domcontentloaded")
    await page.waitForTimeout(2000)
    const critical = errors.filter(
      (e) =>
        !e.includes("favicon") &&
        !e.includes("404") &&
        !e.includes("net::ERR") &&
        !e.includes("fonts.gstatic.com") &&
        !e.includes("Failure loading font") &&
        !e.includes("Failed to load resource")
    )
    expect(critical).toHaveLength(0)
  })
})
