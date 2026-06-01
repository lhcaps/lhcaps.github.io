import { Suspense, lazy, useMemo } from "react"
import { StaticRuntimeFallback } from "./StaticRuntimeFallback"
import { useIsMobile, useReducedMotion } from "@/hooks"
import type { SystemScene } from "@/data/runtimeConfig"

interface LazyRuntimeSceneProps {
  scene: SystemScene
  reducedMotion?: boolean
}

function SceneFallback() {
  return (
    <div className="runtime-scene-wrapper">
      <div className="runtime-scene" />
    </div>
  )
}

export function LazyRuntimeScene({ scene, reducedMotion }: LazyRuntimeSceneProps) {
  const isMobile = useIsMobile()
  const prefersReduced = useReducedMotion()

  const showStatic = useMemo(() => {
    const effectiveReduced = reducedMotion ?? prefersReduced
    return isMobile === "mobile" || effectiveReduced
  }, [isMobile, reducedMotion, prefersReduced])

  if (showStatic) {
    return (
      <div className="runtime-scene-wrapper">
        <StaticRuntimeFallback scene={scene} />
      </div>
    )
  }

  return (
    <Suspense fallback={<SceneFallback />}>
      <SceneInnerWrapper scene={scene} reducedMotion={prefersReduced} />
    </Suspense>
  )
}

function SceneInnerWrapper({ scene, reducedMotion }: { scene: SystemScene; reducedMotion: boolean }) {
  return <SceneInner scene={scene} reducedMotion={reducedMotion} />
}

const SceneInner = lazy(() =>
  import("./RuntimeSceneImpl").then((m) => ({ default: m.RuntimeScene }))
)
