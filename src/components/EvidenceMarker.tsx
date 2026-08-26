import type { PublicClaim } from "@/content/types"

interface EvidenceMarkerProps {
  claim: PublicClaim
  compact?: boolean
}

export function EvidenceMarker({ claim, compact = false }: EvidenceMarkerProps) {
  return (
    <aside className={`evidence-marker${compact ? " evidence-marker--compact" : ""}`} aria-label="Claim evidence">
      <div className="evidence-marker__label">
        <span>PUBLIC CLAIM</span>
        <strong>{claim.classification}</strong>
      </div>
      <p>{claim.scope}</p>
      <p className="evidence-marker__limitation">
        <span>Limitation</span>
        {claim.limitation}
      </p>
      <a href="#evidence-boundary">How this claim is classified</a>
    </aside>
  )
}
