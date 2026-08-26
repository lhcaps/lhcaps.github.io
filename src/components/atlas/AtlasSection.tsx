import { useRef, type KeyboardEvent } from "react"
import { portfolio } from "@/content/portfolio"
import type { SystemDefinition, SystemId } from "@/content/types"
import { AtlasFrame } from "./AtlasFrame"
import { ReadableTopology } from "./ReadableTopology"
import { EvidenceMarker } from "@/components/EvidenceMarker"

interface AtlasSectionProps {
  selectedSystemId: SystemId
  onSelect: (systemId: SystemId) => void
}

export function AtlasSection({ selectedSystemId, onSelect }: AtlasSectionProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedSystem = portfolio.systems.find((system) => system.id === selectedSystemId) as SystemDefinition
  const claim = portfolio.claims.find((candidate) => candidate.evidenceKey === selectedSystem.evidenceKeys[0])

  const selectAt = (index: number) => {
    const boundedIndex = Math.max(0, Math.min(portfolio.systems.length - 1, index))
    const system = portfolio.systems[boundedIndex]
    onSelect(system.id)
    buttonRefs.current[boundedIndex]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyTargets: Record<string, number> = {
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      Home: 0,
      End: portfolio.systems.length - 1,
    }
    const target = keyTargets[event.key]
    if (target === undefined) return
    event.preventDefault()
    selectAt(target)
  }

  return (
    <section className="chapter atlas-chapter" id="atlas" aria-labelledby="atlas-heading">
      <div className="page-shell">
        <header className="chapter-heading chapter-heading--split">
          <div>
            <p className="eyebrow">02 / SYSTEMS ATLAS</p>
            <h2 id="atlas-heading">Systems Atlas</h2>
          </div>
          <p>{portfolio.opening.atlasLead} Select a topology to inspect its owners, routes, and failure boundary.</p>
        </header>

        <div className="system-selector" role="group" aria-label="Select a system topology">
          {portfolio.systems.map((system, index) => (
            <button
              aria-label={system.title}
              aria-pressed={system.id === selectedSystemId}
              className="system-selector__button"
              key={system.id}
              onClick={() => onSelect(system.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => {
                buttonRefs.current[index] = node
              }}
              type="button"
            >
              <span aria-hidden="true">{String(system.order).padStart(2, "0")}</span>
              {system.title}
            </button>
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite" aria-atomic="true">
          {selectedSystem.title} selected. {selectedSystem.topology.nodes.length} nodes, {selectedSystem.topology.routes.length} routes.
        </p>

        <div className="atlas-layout">
          <div className="atlas-copy">
            <div className="atlas-copy__title">
              <p className="tier-label">{selectedSystem.tier === "flagship" ? "Flagship System" : "Supporting System"}</p>
              <h3>{selectedSystem.title} topology</h3>
              <p>{selectedSystem.summary}</p>
            </div>
            <ReadableTopology system={selectedSystem} />
            {claim && <EvidenceMarker claim={claim} compact />}
            <a className="text-link" href={selectedSystem.anchor}>
              Read this case <span aria-hidden="true">↘</span>
            </a>
          </div>
          <AtlasFrame system={selectedSystem} />
        </div>
      </div>
    </section>
  )
}
