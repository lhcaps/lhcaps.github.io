export const RECONFIGURE_MS = 520
export const HANDOFF_MS = 360

export type MotionPhase = "reconfigure" | "handoff" | "settled"

export interface MotionPlanInput {
  changed: boolean
  visible: boolean
  reducedMotion: boolean
}

export interface MotionPlan {
  phase: MotionPhase
  reconfigureMs: number
  handoffMs: number
  animate: boolean
}

export interface SceneTransitionInput {
  firstRender: boolean
  systemChanged: boolean
  visible: boolean
  wasVisible: boolean | null
}

export function motionPhaseAt(elapsedMs: number): MotionPhase {
  if (elapsedMs < RECONFIGURE_MS) {
    return "reconfigure"
  }

  if (elapsedMs < RECONFIGURE_MS + HANDOFF_MS) {
    return "handoff"
  }

  return "settled"
}

export function createMotionPlan(input: MotionPlanInput): MotionPlan {
  const animate = input.changed && input.visible && !input.reducedMotion

  return {
    phase: animate ? "reconfigure" : "settled",
    reconfigureMs: RECONFIGURE_MS,
    handoffMs: HANDOFF_MS,
    animate,
  }
}

export function createSceneTransitionPlan(input: SceneTransitionInput): MotionPlan {
  return createMotionPlan({
    changed: input.firstRender || (input.wasVisible === true && input.systemChanged),
    visible: input.visible,
    reducedMotion: false,
  })
}

export function shouldInvalidate(phase: MotionPhase, visible: boolean): boolean {
  return visible && phase !== "settled"
}
