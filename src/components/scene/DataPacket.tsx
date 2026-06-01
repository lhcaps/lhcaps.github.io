import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface DataPacketProps {
  links: Array<{ from: [number, number, number]; to: [number, number, number]; color: string }>
  active: boolean
  reducedMotion: boolean
  speed?: number
}

export function DataPacket({ links, active, reducedMotion, speed = 1.4 }: DataPacketProps) {
  const groupRef = useRef<THREE.Group>(null)

  const packets = useMemo(() => {
    return links.map((link, i) => {
      const from = new THREE.Vector3(...link.from)
      const to = new THREE.Vector3(...link.to)
      return { from, to, color: link.color, key: i }
    })
  }, [links])

  useFrame(() => {
    if (!groupRef.current || reducedMotion || !active) {
      if (groupRef.current) groupRef.current.visible = false
      return
    }
    groupRef.current.visible = true
  })

  if (reducedMotion || !active) return null

  return (
    <group ref={groupRef}>
      {packets.map(({ from, to, color, key }) => {
        const dir = to.clone().sub(from)
        const length = dir.length()
        dir.normalize()

        return (
          <_DataPacketSingle
            key={key}
            from={from}
            direction={dir}
            length={length}
            color={color}
            speed={speed + key * 0.3}
          />
        )
      })}
    </group>
  )
}

function _DataPacketSingle({
  from,
  direction,
  length,
  color,
  speed,
}: {
  from: THREE.Vector3
  direction: THREE.Vector3
  length: number
  color: string
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const offset = useRef(Math.random() * length)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = ((state.clock.elapsedTime * speed + offset.current) % length) / length
    meshRef.current.position.copy(from).addScaledVector(direction, t * length)
    meshRef.current.position.z = 0.05
  })

  return (
    <mesh ref={meshRef} position={from}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}
