import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { Suspense } from "react"
import { SystemCore } from "./SystemCore"

interface SceneCanvasProps {
  className?: string
}

export function SceneCanvas({ className = "" }: SceneCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SystemCore />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
