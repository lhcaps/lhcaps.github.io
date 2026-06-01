import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import type { RuntimeNode } from "@/data/runtimeConfig"

interface RuntimeNodeProps {
  node: RuntimeNode
  isHovered: boolean
  onHover: (id: string | null) => void
  onClick: (id: string) => void
  reducedMotion: boolean
}

export function RuntimeNodeBlock({ node, isHovered, onHover, onClick, reducedMotion }: RuntimeNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [localHover, setLocalHover] = useState(false)

  const targetScale = isHovered || localHover ? 1.12 : 1.0
  const activeScale = useRef(1.0)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    if (!reducedMotion) {
      activeScale.current = THREE.MathUtils.lerp(activeScale.current, targetScale, delta * 8)
      meshRef.current.scale.setScalar(activeScale.current)
    } else {
      meshRef.current.scale.setScalar(targetScale)
    }
  })

  const handlePointerOver = () => {
    setLocalHover(true)
    onHover(node.id)
    document.body.style.cursor = "pointer"
  }

  const handlePointerOut = () => {
    setLocalHover(false)
    onHover(null)
    document.body.style.cursor = "auto"
  }

  const handleClick = () => {
    onClick(node.id)
  }

  const emissiveIntensity = (isHovered || localHover) ? 0.9 : 0.45

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <RoundedBox args={[1.3, 0.52, 0.22]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={node.color}
            emissive={node.emissive}
            emissiveIntensity={emissiveIntensity}
            metalness={0.2}
            roughness={0.55}
          />
        </RoundedBox>
      </mesh>

      {/* Subtle glow plane behind */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[1.6, 0.7]} />
        <meshBasicMaterial
          color={node.emissive}
          transparent
          opacity={(isHovered || localHover) ? 0.25 : 0.08}
        />
      </mesh>

      <Text
        position={[0, 0.06, 0.14]}
        fontSize={0.105}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2"
        fontWeight={700}
      >
        {node.label}
      </Text>

      <Text
        position={[0, -0.15, 0.14]}
        fontSize={0.065}
        color={node.color}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2"
        fontWeight={400}
        maxWidth={1.1}
        textAlign="center"
      >
        {node.sublabel}
      </Text>
    </group>
  )
}
