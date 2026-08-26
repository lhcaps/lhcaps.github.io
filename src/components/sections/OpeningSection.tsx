import { portfolio } from "@/content/portfolio"

export function OpeningSection() {
  return (
    <section className="chapter opening" id="opening" aria-labelledby="opening-heading">
      <div className="page-shell opening__grid">
        <div className="opening__lead">
          <p className="eyebrow">LE HUY / SOFTWARE SYSTEMS</p>
          <h1 id="opening-heading">Le Huy</h1>
          <p className="opening__role">{portfolio.identity.role}</p>
          <p className="opening__target">{portfolio.identity.target}</p>
          <p className="opening__proposition">{portfolio.opening.proposition}</p>
          <div className="opening__positioning">
            <p>{portfolio.identity.positioning}</p>
            <p>{portfolio.identity.strongestDimension}</p>
          </div>
          <a className="primary-action" href={`mailto:${portfolio.contact.email}`}>
            {portfolio.opening.primaryAction} <span aria-hidden="true">↗</span>
          </a>
        </div>

        <aside className="opening__index" aria-labelledby="proof-index-heading">
          <div className="register-line">
            <span>PROOF INDEX</span>
            <span>05 SYSTEMS</span>
          </div>
          <h2 id="proof-index-heading">Built around the handoff.</h2>
          <ol className="system-index">
            {portfolio.systems.map((system) => (
              <li key={system.id}>
                <span>{String(system.order).padStart(2, "0")}</span>
                <div>
                  <strong>{system.title}</strong>
                  <small>{system.tier === "flagship" ? "Flagship System" : "Supporting System"}</small>
                </div>
                <a href={system.anchor} aria-label={`Read ${system.title}`}>↘</a>
              </li>
            ))}
          </ol>
          <a className="text-link" href="#systems">Read the five System narratives</a>
        </aside>
      </div>
    </section>
  )
}
