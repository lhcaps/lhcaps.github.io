import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { computeCanvasEligibility } from "@/atlas/core/eligibility"
import { probeWebGLSupport } from "@/atlas/browser/probeWebGLSupport"
import type { SceneStatus, SystemDefinition } from "@/content/types"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useViewportWidth } from "@/hooks/useViewportWidth"

const LazyAtlasScene = lazy(() => import("@/atlas/scene/AtlasScene"))

interface SceneErrorBoundaryProps {
  children: ReactNode
  onFailure: () => void
}

interface SceneErrorBoundaryState {
  failed: boolean
}

class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  state: SceneErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(): void {
    this.props.onFailure()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

interface AtlasFrameProps {
  system: SystemDefinition
}

export function AtlasFrame({ system }: AtlasFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const width = useViewportWidth()
  const reducedMotion = useReducedMotion()
  const observerUnavailable = typeof IntersectionObserver === "undefined"
  const [hasEnteredViewport, setHasEnteredViewport] = useState(observerUnavailable)
  const [visible, setVisible] = useState(observerUnavailable)
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const [sceneStatus, setSceneStatus] = useState<SceneStatus>("untried")

  const failSticky = useCallback(() => {
    setSceneStatus((current) => (current === "failed-sticky" ? current : "failed-sticky"))
  }, [])

  const readyScene = useCallback(() => setSceneStatus("ready"), [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return undefined

    if (typeof IntersectionObserver === "undefined") return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setHasEnteredViewport(true)
      },
      { rootMargin: "180px 0px" },
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (
      width >= 768 &&
      !reducedMotion &&
      hasEnteredViewport &&
      webglSupported === null &&
      sceneStatus !== "failed-sticky"
    ) {
      let cancelled = false
      queueMicrotask(() => {
        if (!cancelled) setWebglSupported(probeWebGLSupport())
      })
      return () => {
        cancelled = true
      }
    }
    return undefined
  }, [hasEnteredViewport, reducedMotion, sceneStatus, webglSupported, width])

  const eligibility =
    webglSupported === null
      ? { eligible: false, reason: "webgl-unavailable" as const }
      : computeCanvasEligibility({ width, reducedMotion, webglSupported, hasEnteredViewport, sceneStatus })

  const shouldMountScene = eligibility.eligible && sceneStatus !== "failed-sticky"
  const isBypassed =
    width < 768 || reducedMotion || webglSupported === false || sceneStatus === "failed-sticky"

  return (
    <div className={`atlas-frame${isBypassed ? " atlas-frame--bypassed" : ""}`} ref={frameRef}>
      <div className="atlas-frame__register" aria-hidden="true">
        <span>FIELD 05</span>
        <span>{String(system.order).padStart(2, "0")} / 05</span>
      </div>

      <div className="atlas-frame__scene">
        {shouldMountScene && (
          <SceneErrorBoundary onFailure={failSticky}>
            <Suspense fallback={null}>
              <LazyAtlasScene
                system={system}
                visible={visible}
                onReady={readyScene}
                onFailure={failSticky}
              />
            </Suspense>
          </SceneErrorBoundary>
        )}
        {!shouldMountScene && <div className="atlas-frame__fallback-mark" aria-hidden="true" />}
      </div>

      <p className="atlas-frame__status" aria-live="polite">
        {sceneStatus === "ready" && shouldMountScene
          ? "Interactive scene ready"
          : isBypassed
            ? "3D view unavailable. The complete system map is shown here."
            : "Atlas scene loading. The system map is available below."}
      </p>
    </div>
  )
}
