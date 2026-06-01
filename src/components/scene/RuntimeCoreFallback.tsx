import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Torus } from "@react-three/drei"
import * as THREE from "three"

interface RuntimeCoreFallbackProps {
  reducedMotion: boolean
}

export function RuntimeCoreFallback({ reducedMotion }: RuntimeCoreFallbackProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.18
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

      {/* Hologram ring — visible */}
      <Torus args={[0.62, 0.015, 12, 64]}>
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={1.0}
          transparent
          opacity={0.7}
        />
      </Torus>

      {/* Second ring at 45 degrees */}
      <Torus args={[0.72, 0.01, 8, 64]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial
          color="#34d399"
          emissive="#34d399"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </Torus>

      {/* Floating accent spheres */}
      {[
        [0.7, 0, 0],
        [-0.7, 0, 0],
        [0, 0, 0.7],
        [0, 0, -0.7],
        [0.5, 0.5, 0.5],
        [-0.5, -0.5, 0.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#22c55e" : "#60a5fa"}
            emissive={i % 2 === 0 ? "#22c55e" : "#60a5fa"}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  )
}
