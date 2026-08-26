import { portfolio } from "@/content/portfolio"

export function VerificationSection() {
  return (
    <section className="chapter verification" id="verification" aria-labelledby="verification-heading">
      <div className="page-shell">
        <header className="chapter-heading chapter-heading--split">
          <div><p className="eyebrow">06 / VERIFICATION HARNESS</p><h2 id="verification-heading">A result keeps its limits.</h2></div>
          <p>This public matrix explains the categories. It does not publish the current release record or pretend that one passing check closes another.</p>
        </header>

        <div className="harness-table" role="table" aria-label="Verification Harness categories">
          <div className="harness-table__head" role="row"><span role="columnheader">Category</span><span role="columnheader">Acceptance job</span><span role="columnheader">Public qualification</span></div>
          {portfolio.harness.map((row) => (
            <div className={`harness-row${row.assertion === "BLOCKED" ? " harness-row--failed" : ""}`} role="row" key={row.id}>
              <div role="cell"><span>{row.assertion ?? "CATEGORY"}</span><strong>{row.category}</strong></div>
              <p role="cell">{row.acceptanceJob}</p>
              <div role="cell"><p>{row.explanation}</p><small>{row.limitation}</small><a href="#evidence-boundary">Read the Evidence Boundary</a></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
