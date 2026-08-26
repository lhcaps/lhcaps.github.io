import { fireEvent, render, screen, within } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import App from "@/App"
import { portfolio } from "@/content/portfolio"

const setViewport = (width: number, reducedMotion = false) => {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width })
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? reducedMotion : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe("Systems Atlas application", () => {
  it("renders the complete nine-chapter DOM journey before scene readiness", () => {
    setViewport(390)
    const { container } = render(<App />)

    expect(screen.getByRole("heading", { level: 1, name: "Le Huy" })).toBeInTheDocument()
    expect(screen.getByText("Software Engineer", { selector: "p" })).toBeInTheDocument()
    expect(screen.getByText(portfolio.identity.target)).toBeInTheDocument()
    expect(screen.getByText(portfolio.opening.proposition)).toBeInTheDocument()

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
    ]
    for (const id of chapterIds) {
      expect(container.querySelector(`section#${id}`)).toBeInTheDocument()
    }
    expect(Array.from(container.querySelectorAll("main > section")).map((section) => section.id)).toEqual(chapterIds)
    const ids = Array.from(container.querySelectorAll<HTMLElement>("[id]")).map((element) => element.id)
    expect(new Set(ids).size).toBe(ids.length)

    expect(screen.getAllByRole("link", { name: "Work with me" })).toHaveLength(2)
    expect(screen.getAllByRole("link", { name: "Work with me" })[0]).toHaveAttribute(
      "href",
      `mailto:${portfolio.contact.email}`,
    )
    expect(screen.queryByRole("img", { name: /portrait|headshot|profile/i })).not.toBeInTheDocument()
    expect(screen.queryByTestId("atlas-canvas")).not.toBeInTheDocument()
    expect(screen.getByText("3D view unavailable. The complete system map is shown here.")).toBeInTheDocument()
  })

  it("selects all five Systems from one accessible source of product state", () => {
    setViewport(390)
    render(<App />)

    const selector = screen.getByRole("group", { name: "Select a system topology" })
    const buttons = within(selector).getAllByRole("button")
    expect(buttons.map((button) => button.getAttribute("aria-label"))).toEqual(portfolio.systems.map((system) => system.title))
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true")

    for (const system of portfolio.systems) {
      const button = within(selector).getByRole("button", { name: system.title })
      fireEvent.click(button)
      expect(button).toHaveAttribute("aria-pressed", "true")
      expect(screen.getByRole("heading", { name: `${system.title} topology` })).toBeInTheDocument()
      expect(screen.getByText(`${system.title} selected. ${system.topology.nodes.length} nodes, ${system.topology.routes.length} routes.`)).toHaveAttribute("aria-live", "polite")
      expect(screen.getByRole("link", { name: "Read this case" })).toHaveAttribute("href", system.anchor)
    }
  })

  it("supports adjacent, Home, and End keyboard selection", () => {
    setViewport(390)
    render(<App />)

    const selector = screen.getByRole("group", { name: "Select a system topology" })
    const form = within(selector).getByRole("button", { name: "Form Management" })
    form.focus()
    fireEvent.keyDown(form, { key: "End" })
    expect(within(selector).getByRole("button", { name: "TFT Local Copilot" })).toHaveAttribute("aria-pressed", "true")

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowLeft" })
    expect(within(selector).getByRole("button", { name: "Parkly" })).toHaveAttribute("aria-pressed", "true")

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Home" })
    expect(form).toHaveAttribute("aria-pressed", "true")
    expect(form).toHaveFocus()
  })

  it("keeps all five narratives and their evidence limitations readable", () => {
    setViewport(390)
    render(<App />)

    for (const system of portfolio.systems) {
      const narrative = document.getElementById(system.anchor.slice(1))
      expect(narrative).toBeInTheDocument()
      expect(within(narrative as HTMLElement).getByRole("heading", { name: system.title })).toBeInTheDocument()
      expect(within(narrative as HTMLElement).getByText(system.evidenceBoundary)).toBeInTheDocument()
      for (const link of within(narrative as HTMLElement).getAllByRole("link", { name: "How this claim is classified" })) {
        expect(link).toHaveAttribute("href", "#evidence-boundary")
      }
      const compare = within(narrative as HTMLElement).getByRole("link", { name: "Compare this topology" })
      expect(compare).toHaveAttribute("href", "#atlas")
      fireEvent.click(compare)
      expect(screen.getByRole("button", { name: system.title })).toHaveAttribute("aria-pressed", "true")
    }
  })

  it("exposes the complete Harness and keeps Claim and release vocabularies separate", () => {
    setViewport(390)
    render(<App />)

    const harness = screen.getByRole("table", { name: "Verification Harness categories" })
    expect(within(harness).getAllByRole("row")).toHaveLength(portfolio.harness.length + 1)
    for (const row of portfolio.harness) expect(within(harness).getByText(row.category)).toBeInTheDocument()
    const evidenceBoundary = within(document.getElementById("evidence-boundary") as HTMLElement)
    for (const classification of portfolio.evidenceBoundary.claimClassifications) {
      expect(evidenceBoundary.getByText(classification)).toBeInTheDocument()
    }
    for (const assertion of portfolio.evidenceBoundary.releaseAssertions) {
      expect(evidenceBoundary.getByText(assertion)).toBeInTheDocument()
    }
  })

  it("provides a direct skip target before navigation", () => {
    setViewport(1024, true)
    const { container } = render(<App />)

    const skip = screen.getByRole("link", { name: "Skip to main content" })
    expect(skip).toHaveAttribute("href", "#main-content")
    expect(container.firstElementChild).toBe(skip)
    expect(document.getElementById("main-content")).toHaveAttribute("tabindex", "-1")
  })

  it("opens and closes mobile navigation with focus restoration", () => {
    setViewport(390)
    render(<App />)

    const trigger = screen.getByRole("button", { name: "Open navigation" })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Opening" })).toHaveFocus()
    expect(document.querySelector("main")).toHaveAttribute("inert")
    expect(document.body.style.overflow).toBe("hidden")

    const contact = screen.getByRole("link", { name: "Contact" })
    contact.focus()
    fireEvent.keyDown(contact, { key: "Tab" })
    expect(screen.getByRole("link", { name: "Opening" })).toHaveFocus()

    fireEvent.keyDown(document, { key: "Escape" })
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.querySelector("main")).not.toHaveAttribute("inert")
    expect(document.body.style.overflow).toBe("")
  })

  it("dismisses mobile navigation from its backdrop and when crossing the breakpoint", () => {
    setViewport(390)
    const { container } = render(<App />)
    const trigger = screen.getByRole("button", { name: "Open navigation" })

    fireEvent.click(trigger)
    fireEvent.mouseDown(container.querySelector(".mobile-navigation-backdrop") as HTMLElement)
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()

    fireEvent.click(trigger)
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 1024 })
    fireEvent(window, new Event("resize"))
    expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument()
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument()
  })

  it("publishes only the approved contact destinations", () => {
    setViewport(390)
    render(<App />)

    expect(screen.getByRole("link", { name: "GitHub (opens in a new tab)" })).toHaveAttribute("href", portfolio.contact.github)
    expect(screen.getByRole("link", { name: portfolio.contact.email })).toHaveAttribute(
      "href",
      `mailto:${portfolio.contact.email}`,
    )
    expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute("href", portfolio.contact.cv)
  })
})
