import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { RuntimeNodeBlock } from "./RuntimeNode"
import { DataLink } from "./DataLink"
import { DataPacket } from "./DataPacket"
import { SceneLabels } from "./SceneLabels"
import { type SystemScene } from "@/data/runtimeConfig"

interface RuntimeSceneProps {
  scene: SystemScene
  reducedMotion: boolean
}

function RuntimeGraph({ scene, reducedMotion }: RuntimeSceneProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const packetLinks = scene.links.map((link) => {
    const from = scene.nodes.find((n) => n.id === link.from)!
    const to = scene.nodes.find((n) => n.id === link.to)!
    return { from: from.position, to: to.position, color: from.color }
  })

  return (
    <group>
      {scene.links.map((link) => (
        <DataLink
          key={`${link.from}-${link.to}`}
          link={link}
          nodes={scene.nodes}
          activeNodeId={hoveredId}
          reducedMotion={reducedMotion}
        />
      ))}

      {scene.nodes.map((node) => (
        <RuntimeNodeBlock
          key={node.id}
          node={node}
          isHovered={hoveredId === node.id}
          onHover={setHoveredId}
          onClick={() => {}}
          reducedMotion={reducedMotion}
        />
      ))}

      <DataPacket
        links={packetLinks}
        active={true}
        reducedMotion={reducedMotion}
      />

      <SceneLabels
        activeNodeId={hoveredId}
        sceneLabel={scene.label}
        sceneTagline={scene.tagline}
      />
    </group>
  )
}

export function RuntimeScene({ scene, reducedMotion }: RuntimeSceneProps) {
  return (
    <div className="runtime-scene-wrapper">
      <Canvas
        camera={{ position: [0, -0.3, 8.5], fov: 48 }}
        dpr={[1, reducedMotion ? 1 : 1.5]}
        gl={{
          antialias: !reducedMotion,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#0c1425"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 4, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 2, 4]} intensity={1.0} color="#60a5fa" />
        <pointLight position={[-3, -1, 3]} intensity={0.5} color="#22c55e" />
        <pointLight position={[3, -1, 3]} intensity={0.3} color="#a78bfa" />
        <RuntimeGraph scene={scene} reducedMotion={reducedMotion} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
