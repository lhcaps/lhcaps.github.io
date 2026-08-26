import { portfolio } from "@/content/portfolio"

const claimMeanings: Record<string, string> = {
  VERIFIED_IMPLEMENTED: "Current source inspection supports the described implementation, not a fresh runtime.",
  VERIFIED_LOCAL: "A fresh local observation supports only its named environment and scope.",
  VERIFIED_TESTED: "A fresh deterministic test supports only the tested behavior and boundary.",
  DOCUMENTED_ONLY: "Documentation describes the assembly; implementation or runtime is not established.",
  PLANNED: "A future direction that cannot be presented as current capability.",
  UNVERIFIED: "Available evidence does not support a public technical Claim.",
  PRIVATE_DO_NOT_PUBLISH: "The detail must never enter public source, output, evidence, or deployment.",
}

const releaseMeanings: Record<string, string> = {
  VERIFIED: "A named current gate completed with retained evidence.",
  OBSERVED: "A state was directly inspected but does not close a broader gate.",
  INFERRED: "A conclusion was derived from evidence rather than directly executed.",
  BLOCKED: "A gate failed, was not run, or lacks required authority or evidence.",
}

export function EvidenceBoundarySection() {
  return (
    <section className="chapter evidence-boundary" id="evidence-boundary" aria-labelledby="evidence-heading">
      <div className="page-shell">
        <header className="chapter-heading chapter-heading--split">
          <div><p className="eyebrow">07 / EVIDENCE BOUNDARY</p><h2 id="evidence-heading">Two vocabularies. No borrowed certainty.</h2></div>
          <p>A Public Claim classification describes what a technical statement may say. A release assertion describes what a current acceptance gate proved.</p>
        </header>

        <div className="evidence-vocabularies">
          <article><h3>Public Claim Manifest</h3><ul>{portfolio.evidenceBoundary.claimClassifications.map((classification) => <li key={classification}><strong>{classification}</strong><span>{claimMeanings[classification]}</span></li>)}</ul></article>
          <article><h3>Release assertions</h3><ul>{portfolio.evidenceBoundary.releaseAssertions.map((assertion) => <li key={assertion}><strong>{assertion}</strong><span>{releaseMeanings[assertion]}</span></li>)}</ul></article>
        </div>

        <aside className="exclusion-rule">
          <p className="eyebrow">COMPLETE PRIVATE-LEDGER EXCLUSION</p>
          <h3>Category names may be public. Values never are.</h3>
          <p>The private Evidence Ledger, internal Release Evidence, review attestations, history receipts, and production review stay outside the public page and bundle.</p>
          <ul aria-label="Excluded public evidence categories">{portfolio.evidenceBoundary.excludedCategories.map((category) => <li key={category}>{category}</li>)}</ul>
        </aside>
      </div>
    </section>
  )
}
