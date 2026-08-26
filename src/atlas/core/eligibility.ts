import type { SceneStatus } from "@/content/types"

export interface CanvasEligibilityInput {
  width: number
  reducedMotion: boolean
  webglSupported: boolean
  hasEnteredViewport: boolean
  sceneStatus: SceneStatus
}

export type CanvasEligibilityReason =
  | "eligible"
  | "narrow"
  | "reduced-motion"
  | "webgl-unavailable"
  | "not-entered"
  | "failed-sticky"

export interface CanvasEligibility {
  eligible: boolean
  reason: CanvasEligibilityReason
}

export function computeCanvasEligibility(input: CanvasEligibilityInput): CanvasEligibility {
  if (input.width < 768) {
    return { eligible: false, reason: "narrow" }
  }

  if (input.reducedMotion) {
    return { eligible: false, reason: "reduced-motion" }
  }

  if (!input.webglSupported) {
    return { eligible: false, reason: "webgl-unavailable" }
  }

  if (!input.hasEnteredViewport) {
    return { eligible: false, reason: "not-entered" }
  }

  if (input.sceneStatus === "failed-sticky") {
    return { eligible: false, reason: "failed-sticky" }
  }

  return { eligible: true, reason: "eligible" }
}
