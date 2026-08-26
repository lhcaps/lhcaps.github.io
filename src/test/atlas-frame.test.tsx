import { useEffect } from "react"
import { act, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { portfolio } from "@/content/portfolio"

const sceneControl = vi.hoisted(() => ({ fail: false }))
const probe = vi.hoisted(() => vi.fn(() => true))

vi.mock("@/atlas/browser/probeWebGLSupport", () => ({ probeWebGLSupport: probe }))
vi.mock("@/atlas/scene/AtlasScene", () => ({
  default: function MockAtlasScene({ onReady }: { onReady: () => void }) {
    useEffect(onReady, [onReady])
    if (sceneControl.fail) throw new Error("scene failed")
    return <canvas aria-hidden="true" data-testid="atlas-canvas" />
  },
}))

import { AtlasFrame } from "@/components/atlas/AtlasFrame"

const setEnvironment = (width: number, reducedMotion = false) => {
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

describe("Atlas scene boundary", () => {
  beforeEach(() => {
    sceneControl.fail = false
    probe.mockClear()
    vi.restoreAllMocks()
  })

  it("never probes or mounts Canvas below 768px", () => {
    setEnvironment(767)
    render(<AtlasFrame system={portfolio.systems[0]} />)
    expect(probe).not.toHaveBeenCalled()
    expect(screen.queryByTestId("atlas-canvas")).not.toBeInTheDocument()
    expect(screen.getByText("3D view unavailable. The complete system map is shown here.")).toBeInTheDocument()
  })

  it("never probes or mounts Canvas under Reduced Motion", () => {
    setEnvironment(1024, true)
    render(<AtlasFrame system={portfolio.systems[0]} />)
    expect(probe).not.toHaveBeenCalled()
    expect(screen.queryByTestId("atlas-canvas")).not.toBeInTheDocument()
  })

  it("mounts one lazy scene after eligibility and reports readiness", async () => {
    setEnvironment(1024)
    render(<AtlasFrame system={portfolio.systems[0]} />)
    expect(screen.getByText("Atlas scene loading. The system map is available below.")).toBeInTheDocument()
    await waitFor(() => expect(screen.getByTestId("atlas-canvas")).toBeInTheDocument())
    expect(screen.getAllByTestId("atlas-canvas")).toHaveLength(1)
    await waitFor(() => expect(screen.getByText("Interactive scene ready")).toBeInTheDocument())
  })

  it("contains a scene failure as reload-only sticky bypass", async () => {
    setEnvironment(1024)
    sceneControl.fail = true
    vi.spyOn(console, "error").mockImplementation(() => undefined)
    render(<AtlasFrame system={portfolio.systems[0]} />)
    await waitFor(() => expect(screen.getByText("3D view unavailable. The complete system map is shown here.")).toBeInTheDocument())

    sceneControl.fail = false
    act(() => {
      Object.defineProperty(window, "innerWidth", { configurable: true, value: 1200 })
      window.dispatchEvent(new Event("resize"))
    })
    expect(screen.queryByTestId("atlas-canvas")).not.toBeInTheDocument()
    expect(probe).toHaveBeenCalledTimes(1)
  })
})
