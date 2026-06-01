import { Suspense, lazy } from "react"
import type { SystemScene } from "@/data/runtimeConfig"

export function LazyRuntimeScene({ scene, reducedMotion }: { scene: SystemScene; reducedMotion: boolean }) {
  return (
    <Suspense fallback={<SceneFallback />}>
      <SceneInner scene={scene} reducedMotion={reducedMotion} />
    </Suspense>
  )
}

function SceneFallback() {
  return (
    <div className="runtime-scene-wrapper">
      <div className="runtime-scene" />
    </div>
  )
}

const SceneInner = lazy(() =>
  import("./RuntimeSceneImpl").then((m) => ({ default: m.RuntimeScene as typeof m.RuntimeScene }))
)
