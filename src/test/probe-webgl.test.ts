import { describe, expect, it, vi } from "vitest"
import { probeWebGLSupport } from "@/atlas/browser/probeWebGLSupport"

describe("detached WebGL support probe", () => {
  it("requires and invokes WEBGL_lose_context before returning support", () => {
    const loseContext = vi.fn()
    const remove = vi.fn()
    const canvas = {
      getContext: vi.fn().mockReturnValue({ getExtension: vi.fn().mockReturnValue({ loseContext }) }),
      remove,
    }
    const documentRef = { createElement: vi.fn().mockReturnValue(canvas) } as unknown as Document

    expect(probeWebGLSupport(documentRef)).toBe(true)
    expect(loseContext).toHaveBeenCalledOnce()
    expect(remove).toHaveBeenCalledOnce()
  })

  it("fails closed for a missing context or release extension and still removes the canvas", () => {
    const missingContext = { getContext: vi.fn().mockReturnValue(null), remove: vi.fn() }
    expect(
      probeWebGLSupport({ createElement: vi.fn().mockReturnValue(missingContext) } as unknown as Document),
    ).toBe(false)
    expect(missingContext.remove).toHaveBeenCalledOnce()

    const missingRelease = {
      getContext: vi.fn().mockReturnValue({ getExtension: vi.fn().mockReturnValue(null) }),
      remove: vi.fn(),
    }
    expect(
      probeWebGLSupport({ createElement: vi.fn().mockReturnValue(missingRelease) } as unknown as Document),
    ).toBe(false)
    expect(missingRelease.remove).toHaveBeenCalledOnce()
  })

  it("fails closed when acquisition or release throws", () => {
    const acquireFailure = { getContext: vi.fn(() => { throw new Error("blocked") }), remove: vi.fn() }
    expect(
      probeWebGLSupport({ createElement: vi.fn().mockReturnValue(acquireFailure) } as unknown as Document),
    ).toBe(false)
    expect(acquireFailure.remove).toHaveBeenCalledOnce()

    const releaseFailure = {
      getContext: vi.fn().mockReturnValue({ getExtension: vi.fn().mockReturnValue({ loseContext: () => { throw new Error("blocked") } }) }),
      remove: vi.fn(),
    }
    expect(
      probeWebGLSupport({ createElement: vi.fn().mockReturnValue(releaseFailure) } as unknown as Document),
    ).toBe(false)
    expect(releaseFailure.remove).toHaveBeenCalledOnce()
  })
})
