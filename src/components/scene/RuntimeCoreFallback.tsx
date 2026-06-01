import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Torus } from "@react-three/drei"
import * as THREE from "three"

interface RuntimeCoreFallbackProps {
  reducedMotion: boolean
}

export function RuntimeCoreFallback({ reducedMotion }: RuntimeCoreFallbackProps) {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.18
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      {/* Core body */}
      <RoundedBox args={[1.1, 0.42, 0.3]} radius={0.07} smoothness={4}>
        <meshStandardMaterial
          color="#1a2540"
          metalness={0.75}
          roughness={0.28}
        />
      </RoundedBox>

      {/* Top emissive strip */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.88, 0.04, 0.22]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Bottom emissive strip */}
      <mesh position={[0, -0.22, 0]}>
        <boxGeometry args={[0.88, 0.04, 0.22]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Hologram ring */}
      <Torus
        ref={ringRef}
        args={[0.62, 0.012, 8, 48]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </Torus>

      {/* Floating accent spheres */}
      <mesh position={[0.7, 0, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh position={[-0.7, 0, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, 0, 0.7]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, 0, -0.7]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  )
}
