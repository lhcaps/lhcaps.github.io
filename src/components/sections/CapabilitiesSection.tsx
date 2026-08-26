import { portfolio } from "@/content/portfolio"

export function CapabilitiesSection() {
  const systems = new Map(portfolio.systems.map((system) => [system.id, system]))

  return (
    <section className="chapter capabilities" id="capabilities" aria-labelledby="capabilities-heading">
      <div className="page-shell">
        <header className="chapter-heading chapter-heading--split">
          <div><p className="eyebrow">08 / CAPABILITIES</p><h2 id="capabilities-heading">Outcomes, with coordinates.</h2></div>
          <p>No percentage bars or technology inventory. Each capability points back to the System where the outcome has a concrete boundary.</p>
        </header>

        <ol className="capability-list">
          {portfolio.capabilities.map((capability, index) => (
            <li key={capability.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{capability.title}</h3><p>{capability.outcome}</p></div>
              <div className="capability-list__links">{capability.systemIds.map((systemId) => { const system = systems.get(systemId)!; return <a href={system.anchor} key={systemId}>{system.title}</a> })}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
