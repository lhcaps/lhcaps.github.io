import { groupNodesByLayer, readableRoutes, resolveActiveHandoff } from "@/atlas/core/topology"
import type { SystemDefinition } from "@/content/types"

interface ReadableTopologyProps {
  system: SystemDefinition
}

export function ReadableTopology({ system }: ReadableTopologyProps) {
  const handoff = resolveActiveHandoff(system)
  const activeSentence = `${system.topology.nodes.find((node) => node.id === handoff.route.from)?.label} → ${handoff.route.verb} → ${handoff.focusNode.label}`
  const routes = readableRoutes(system)

  return (
    <div className="readable-topology" data-testid="readable-topology">
      <div className="active-handoff">
        <p className="eyebrow">ACTIVE HANDOFF</p>
        {system.topology.activeHandoff.label && <p className="handoff-label">{system.topology.activeHandoff.label}</p>}
        <p>{activeSentence}</p>
        <span>Focus owner: {handoff.focusNode.label}</span>
      </div>

      <div className="topology-layers" aria-label={`${system.title} layers`}>
        {groupNodesByLayer(system).map(({ layer, nodes }) => (
          <section className="topology-layer" key={layer.id} aria-labelledby={`${layer.id}-heading`}>
            <div>
              <h4 id={`${layer.id}-heading`}>{layer.label}</h4>
              <p>{layer.meaning}</p>
            </div>
            <ul>
              {nodes.map((node) => (
                <li key={node.id} className={node.id === handoff.focusNode.id ? "topology-node topology-node--active" : "topology-node"}>
                  <strong>{node.label}</strong>
                  <span>{node.responsibility}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="topology-routes">
        <h4>Ordered relationships</h4>
        <ol>
          {routes.map((route, index) => (
            <li key={system.topology.routes[index].id} className={system.topology.routes[index].id === handoff.route.id ? "route route--active" : "route"}>
              {route}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
