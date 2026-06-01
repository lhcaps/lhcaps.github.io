import { Component, type ReactNode } from "react"
import { RuntimeCanvas } from "./RuntimeCanvas"
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

class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-950" style={{ height: "min(60vh, 580px)", minHeight: 300 }}>
          <div className="text-center px-6">
            <p className="text-sm font-medium text-slate-300">Runtime preview unavailable</p>
            <p className="mt-2 text-xs text-slate-500 font-mono">UI → API → DB → Queue → Proof</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function RuntimeGraph({ scene, reducedMotion }: { scene: SystemScene; reducedMotion: boolean }) {
  const packetLinks = scene.links.map((link) => {
    const from = scene.nodes.find((n) => n.id === link.from)!
    const to = scene.nodes.find((n) => n.id === link.to)!
    return { from: from.position, to: to.position, color: from.color }
  })

  return (
    <>
      {scene.links.map((link) => (
        <DataLink
          key={`${link.from}-${link.to}`}
          link={link}
          nodes={scene.nodes}
          activeNodeId={null}
          reducedMotion={reducedMotion}
        />
      ))}

      {scene.nodes.map((node) => (
        <RuntimeNodeBlock
          key={node.id}
          node={node}
          isHovered={false}
          onHover={() => {}}
          onClick={() => {}}
          reducedMotion={reducedMotion}
        />
      ))}

      <DataPacket
        links={packetLinks}
        active={true}
        reducedMotion={reducedMotion}
      />

      <RuntimeCoreFallback reducedMotion={reducedMotion} />

      <SceneLabels
        activeNodeId={null}
        sceneLabel={scene.label}
        sceneTagline={scene.tagline}
      />
    </>
  )
}

export function RuntimeScene({ scene, reducedMotion }: RuntimeSceneProps) {
  return (
    <div className="w-full">
      {/* Debug overlay — outside Canvas so it's always visible */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-300">
        {scene.label} active
      </div>

      <div
        className="runtime-scene"
        style={{ height: "min(60vh, 580px)", minHeight: 300 }}
      >
        <SceneErrorBoundary>
          <RuntimeCanvas reducedMotion={reducedMotion}>
            <RuntimeGraph scene={scene} reducedMotion={reducedMotion} />
          </RuntimeCanvas>
        </SceneErrorBoundary>
      </div>
    </div>
  )
}
