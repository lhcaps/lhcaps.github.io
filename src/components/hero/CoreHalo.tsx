'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// -------------------------------------------------------------- //
// CoreHalo — decorative R3F: only rings, glow, particles           //
// Replaces full SystemCore in hero. No system diagram nodes.        //
// -------------------------------------------------------------- //

function HaloRing({ radius, thickness, color, opacity, speed, axis }: {
  radius: number
  thickness: number
  color: string
  opacity: number
  speed: number
  axis: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * speed
  })
  return (
    <mesh ref={ref} rotation={axis}>
      <torusGeometry args={[radius, thickness, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function PulsingCore() {
  const ref = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      const pulse = 1 + Math.sin(t * 1.2) * 0.08
      ref.current.scale.setScalar(pulse)
    }
    if (glowRef.current) {
      const glowPulse = 1 + Math.sin(t * 0.8) * 0.12
      glowRef.current.scale.setScalar(glowPulse)
    }
  })

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.025} side={THREE.BackSide} />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial
          color="#67E8F9"
          emissive="#67E8F9"
          emissiveIntensity={2.5}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>
    </group>
  )
}

function HaloParticles() {
  const count = 45
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 233280
    return x - Math.floor(x)
  }

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const s1 = pseudoRandom(i * 3)
      const s2 = pseudoRandom(i * 3 + 1)
      const s3 = pseudoRandom(i * 3 + 2)
      const r = 1.8 + s1 * 3.5
      const theta = s2 * Math.PI * 2
      const phi = s3 * Math.PI
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.4
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.02
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#67E8F9" size={0.018} transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const targetRef = useRef(new THREE.Vector3(0, 0, 8))

  useFrame(({ pointer }) => {
    const mouseX = pointer.x * 0.4
    const mouseY = pointer.y * 0.25
    targetRef.current.set(mouseX * 0.3, mouseY * 0.2, 8)
    camera.position.lerp(targetRef.current, 0.025)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export function CoreHalo() {
  return (
    <group>
      <CameraRig />
      <PulsingCore />
      <HaloRing radius={0.7} thickness={0.004} color="#A78BFA" opacity={0.4} speed={0.4} axis={[Math.PI / 2, 0, 0]} />
      <HaloRing radius={1.0} thickness={0.006} color="#67E8F9" opacity={0.18} speed={0.18} axis={[Math.PI / 3, 0, Math.PI / 6]} />
      <HaloRing radius={1.15} thickness={0.004} color="#67E8F9" opacity={0.12} speed={-0.1} axis={[Math.PI / 5, Math.PI / 4, 0]} />
      <HaloRing radius={1.35} thickness={0.003} color="#8B5CF6" opacity={0.08} speed={0.08} axis={[0, 0, 0]} />
      <HaloParticles />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} color="#67E8F9" intensity={2.0} />
      <pointLight position={[2, 1, 2]} color="#8B5CF6" intensity={0.6} />
    </group>
  )
}
