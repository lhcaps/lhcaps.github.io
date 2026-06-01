import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import * as THREE from "three"
import type { RuntimeLink, RuntimeNode } from "@/data/runtimeConfig"

interface DataLinkProps {
  link: RuntimeLink
  nodes: RuntimeNode[]
  activeNodeId: string | null
  reducedMotion: boolean
}

export function DataLink({ link, nodes, activeNodeId, reducedMotion }: DataLinkProps) {
  const fromNode = nodes.find((n) => n.id === link.from)
  const toNode = nodes.find((n) => n.id === link.to)

  if (!fromNode || !toNode) return null

  const from = new THREE.Vector3(...fromNode.position)
  const to = new THREE.Vector3(...toNode.position)


  const isActive =
    activeNodeId === link.from ||
    activeNodeId === link.to ||
    (fromNode.position[1] === toNode.position[1] && fromNode.position[1] === -0.4)

  const pulseRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!pulseRef.current || reducedMotion) return
    const t = (Math.sin(state.clock.elapsedTime * 2.5 + fromNode.position[0] * 3) + 1) / 2
    pulseRef.current.position.lerpVectors(from, to, t)
    pulseRef.current.visible = isActive || activeNodeId === null
  })

  const baseOpacity = isActive ? 0.7 : 0.3

  return (
    <>
      <Line
        points={[fromNode.position, toNode.position]}
        color="#64748b"
        lineWidth={1.2}
        transparent
        opacity={baseOpacity}
        dashed
        dashSize={0.08}
        dashScale={1.5}
        dashOffset={0}
      />

      {!reducedMotion && (isActive || activeNodeId === null) && (
        <mesh ref={pulseRef} position={fromNode.position}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={fromNode.color} transparent opacity={0.85} />
        </mesh>
      )}
    </>
  )
}
