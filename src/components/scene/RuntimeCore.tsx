import { Suspense } from "react"
import { RuntimeCoreFallback } from "./RuntimeCoreFallback"

interface RuntimeCoreProps {
  activeProject?: string
  reducedMotion: boolean
}

export function RuntimeCore({ reducedMotion }: RuntimeCoreProps) {
  return (
    <Suspense fallback={<RuntimeCoreFallback reducedMotion={reducedMotion} />}>
      <RuntimeCoreFallback reducedMotion={reducedMotion} />
    </Suspense>
  )
}
