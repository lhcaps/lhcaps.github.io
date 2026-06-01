import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"

interface SceneLabelsProps {
  activeNodeId: string | null
  sceneLabel: string
  sceneTagline: string
  reducedMotion?: boolean
}

export function SceneLabels({ activeNodeId, sceneLabel, sceneTagline }: SceneLabelsProps) {
  const labelRef = useRef<THREE.Group>(null)
  const opacity = useRef(1)

  useFrame((_, delta) => {
    if (!labelRef.current) return
    const targetOpacity = activeNodeId ? 0 : 1
    opacity.current = THREE.MathUtils.lerp(opacity.current, targetOpacity, delta * 4)
    labelRef.current.visible = opacity.current > 0.01
  })

  return (
    <group ref={labelRef}>
      <Text
        position={[-1.6, -2.6, 0]}
        fontSize={0.11}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2"
        fontWeight={600}
        letterSpacing={0.08}
      >
        {sceneLabel.toUpperCase()}
      </Text>
      <Text
        position={[-1.6, -2.8, 0]}
        fontSize={0.085}
        color="#475569"
        anchorX="left"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2"
        maxWidth={4}
      >
        {sceneTagline}
      </Text>
    </group>
  )
}
