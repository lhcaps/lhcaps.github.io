import { portfolio } from "@/content/portfolio"

export function AiEngineeringSection() {
  return (
    <section className="chapter ai-engineering" id="ai-engineering" aria-labelledby="ai-heading">
      <div className="page-shell">
        <header className="chapter-heading">
          <p className="eyebrow">05 / AI-ASSISTED ENGINEERING</p>
          <h2 id="ai-heading">THE AGENT WRITES. THE HARNESS DECIDES.</h2>
        </header>

        <ol className="lifecycle" aria-label="AI-assisted engineering lifecycle" tabIndex={0}>
          {portfolio.aiLifecycle.map((stage, index) => (
            <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></li>
          ))}
        </ol>

        <div className="method-boundaries">
          <article><span>01</span><h3>Contract and context</h3><p>Intent, public evidence, product scope, UX rules, and architecture constrain what implementation is allowed to mean.</p></article>
          <article><span>02</span><h3>Deterministic acceptance</h3><p>Type, content, topology, test, build, privacy, and artifact gates decide whether authored work is accepted.</p></article>
          <article><span>03</span><h3>Observed closure</h3><p>Browser QA, independent review, Release Evidence, and exact-SHA production attestation close the remaining gap.</p></article>
        </div>
      </div>
    </section>
  )
}
