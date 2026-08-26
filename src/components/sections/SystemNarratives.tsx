import { portfolio } from "@/content/portfolio"
import type { SystemId } from "@/content/types"
import { EvidenceMarker } from "@/components/EvidenceMarker"

interface SystemNarrativesProps {
  onCompare: (systemId: SystemId) => void
}

export function SystemNarratives({ onCompare }: SystemNarrativesProps) {
  const claims = new Map(portfolio.claims.map((claim) => [claim.evidenceKey, claim]))
  const instances = new Map(portfolio.claimInstances.map((instance) => [instance.claimInstanceId, instance]))

  return (
    <section className="chapter systems-chapter" id="systems" aria-labelledby="systems-heading">
      <div className="page-shell">
        <header className="chapter-heading chapter-heading--split">
          <div>
            <p className="eyebrow">03 / SELECTED SYSTEMS</p>
            <h2 id="systems-heading">Selected Systems</h2>
          </div>
          <p>{portfolio.opening.systemsLead} Three flagships carry the longer argument. Two supporting systems keep their limits close.</p>
        </header>

        <div className="narrative-list">
          {portfolio.systems.map((system) => {
            const narrativeClaims = system.narrative.claimInstanceIds.flatMap((instanceId) => {
              const instance = instances.get(instanceId)
              const claim = instance ? claims.get(instance.evidenceKey) : undefined
              return claim ? [claim] : []
            })

            return (
              <article
                className={`system-narrative system-narrative--${system.narrative.form} system-narrative--${system.tier}`}
                id={system.anchor.slice(1)}
                key={system.id}
                aria-labelledby={`${system.id}-heading`}
              >
                <div className="system-narrative__register">
                  <span>{String(system.order).padStart(2, "0")}</span>
                  <span>{system.tier === "flagship" ? "FLAGSHIP NARRATIVE" : "SUPPORTING NARRATIVE"}</span>
                </div>
                <div className="system-narrative__body">
                  <div className="system-narrative__lead">
                    <p className="tier-label">{system.narrative.title}</p>
                    <h3 id={`${system.id}-heading`}>{system.title}</h3>
                    <p className="narrative-lead">{system.narrative.lead}</p>
                    <ul>{system.narrative.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    <p className="narrative-boundary">{system.evidenceBoundary}</p>
                    <a className="text-link" href="#atlas" onClick={() => onCompare(system.id)}>
                      Compare this topology <span aria-hidden="true">↖</span>
                    </a>
                  </div>
                  <div className="system-narrative__evidence">
                    {narrativeClaims.map((claim) => (
                      <EvidenceMarker claim={claim} compact={system.tier === "supporting"} key={claim.evidenceKey} />
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
