import { portfolio } from "@/content/portfolio"
import { EvidenceMarker } from "@/components/EvidenceMarker"

export function AdaptationSection() {
  const booking = portfolio.systems.find((system) => system.id === "production-booking-operations")!
  const claim = portfolio.claims.find((candidate) => candidate.evidenceKey === "booking.revision-history")!

  return (
    <section className="chapter adaptation" id="adaptation" aria-labelledby="adaptation-heading">
      <div className="page-shell">
        <header className="chapter-heading chapter-heading--split">
          <div>
            <p className="eyebrow">04 / ADAPTATION LOOP</p>
            <h2 id="adaptation-heading">Pricing changed again.</h2>
          </div>
          <p>The release loop already knew the route. The representative revision is named without publishing the value that changed.</p>
        </header>

        <div className="adaptation__loop">
          <div className="adaptation__label">
            <span>REPRESENTATIVE REVISION</span>
            <strong>Fourth Pricing Change</strong>
          </div>
          <ol>
            {booking.topology.nodes.map((node, index) => (
              <li key={node.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{node.label}</strong>
                <p>{node.responsibility}</p>
              </li>
            ))}
          </ol>
          <p className="loop-return">Release learning returns to the next review. No client identity, real price, payment detail, or room identity enters this account.</p>
        </div>

        <div className="adaptation__evidence">
          <EvidenceMarker claim={claim} />
          <a className="text-link" href={booking.anchor}>Read the booking narrative <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
