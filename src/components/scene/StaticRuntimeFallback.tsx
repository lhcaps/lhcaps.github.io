import type { SystemScene } from "@/data/runtimeConfig"

interface StaticRuntimeFallbackProps {
  scene: SystemScene
}

export function StaticRuntimeFallback({ scene }: StaticRuntimeFallbackProps) {
  const nodes = scene.nodes
  const links = scene.links

  return (
    <div className="static-runtime-fallback">
      <div className="static-runtime-core">
        <span className="static-runtime-label">Runtime Lab</span>
        <span className="static-runtime-sublabel">{scene.label}</span>
      </div>

      <div className="static-runtime-nodes">
        {nodes.map((node) => (
          <div key={node.id} className="static-runtime-node">
            <span className="static-node-label">{node.label}</span>
            <span className="static-node-sublabel">{node.sublabel}</span>
          </div>
        ))}
      </div>

      <div className="static-runtime-flow">
        {links.map((link, i) => {
          const from = nodes.find((n) => n.id === link.from)
          const to = nodes.find((n) => n.id === link.to)
          if (!from || !to) return null
          return (
            <div key={i} className="static-flow-line">
              <span style={{ color: from.color }}>{from.label}</span>
              <span className="static-arrow">→</span>
              <span style={{ color: to.color }}>{to.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
