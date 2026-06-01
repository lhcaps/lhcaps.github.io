import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import type { SystemScene } from "@/data/runtimeConfig"

interface CameraRigProps {
  scene: SystemScene
  reducedMotion: boolean
}

const CAMERA_PRESETS: Record<string, { position: THREE.Vector3; target: THREE.Vector3 }> = {
  core: {
    position: new THREE.Vector3(0, 1.2, 7),
    target: new THREE.Vector3(0, 0, 0),
  },
  parkly: {
    position: new THREE.Vector3(0, 1.4, 7.2),
    target: new THREE.Vector3(0, 0.1, 0),
  },
  visionflow: {
    position: new THREE.Vector3(0, 1.0, 7.0),
    target: new THREE.Vector3(0, 0, 0),
  },
  tft: {
    position: new THREE.Vector3(0, 1.3, 7.0),
    target: new THREE.Vector3(0, 0, 0),
  },
}

export function CameraRig({ scene, reducedMotion }: CameraRigProps) {
  const { camera } = useThree()
  const preset = CAMERA_PRESETS[scene.id] ?? CAMERA_PRESETS.core
  const targetRef = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    if (reducedMotion) {
      camera.position.copy(preset.position)
      targetRef.current.copy(preset.target)
      return
    }
    camera.position.lerp(preset.position, delta * 2.5)
    targetRef.current.lerp(preset.target, delta * 2.5)
    camera.lookAt(targetRef.current)
  })

  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
      autoRotate={false}
    />
  )
}
