import { useState } from "react"
import { RuntimeCanvas } from "./RuntimeCanvas"
import { CameraRig } from "./CameraRig"
import { RuntimeNodeBlock } from "./RuntimeNode"
import { DataLink } from "./DataLink"
import { DataPacket } from "./DataPacket"
import { SceneLabels } from "./SceneLabels"
import { RuntimeCoreFallback } from "./RuntimeCoreFallback"
import type { SystemScene } from "@/data/runtimeConfig"

interface RuntimeSceneProps {
  scene: SystemScene
  reducedMotion: boolean
}

function RuntimeGraph({ scene, reducedMotion }: { scene: SystemScene; reducedMotion: boolean }) {
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

      {/* Center runtime core */}
      <group position={[0, 0, -0.5]}>
        <RuntimeCoreFallback reducedMotion={reducedMotion} />
      </group>
    </group>
  )
}

export function RuntimeScene({ scene, reducedMotion }: RuntimeSceneProps) {
  return (
    <div className="runtime-scene-wrapper">
      <RuntimeCanvas reducedMotion={reducedMotion}>
        <RuntimeGraph scene={scene} reducedMotion={reducedMotion} />
        <CameraRig scene={scene} reducedMotion={reducedMotion} />
      </RuntimeCanvas>
    </div>
  )
}
