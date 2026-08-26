import type { SceneSlot } from "@/content/types"

export type ScenePosition = readonly [number, number, number]

export const SCENE_SLOT_POSITIONS = {
  "left-far": [-2.4, 1.1, -0.9],
  "center-far": [0, 1.35, -1.15],
  "right-far": [2.4, 1.1, -0.9],
  "left-mid": [-2.25, 0, 0],
  "center-mid": [0, 0.15, -0.15],
  "right-mid": [2.25, 0, 0],
  "left-near": [-2.1, -1.05, 0.8],
  "center-near": [0, -1.15, 1],
  "right-near": [2.1, -1.05, 0.8],
  "separate-bottom": [0, -2.1, 0],
} as const satisfies Record<SceneSlot, ScenePosition>

export function positionForSceneSlot(slot: SceneSlot): ScenePosition {
  const position = SCENE_SLOT_POSITIONS[slot]

  if (!position) {
    throw new Error("SCENE_SLOT_UNKNOWN")
  }

  return position
}
