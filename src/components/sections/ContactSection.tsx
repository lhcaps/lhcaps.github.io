import { portfolio } from "@/content/portfolio"

export function ContactSection() {
  return (
    <section className="chapter contact" id="contact" aria-labelledby="contact-heading">
      <div className="page-shell contact__grid">
        <div>
          <p className="eyebrow">09 / CLOSING</p>
          <h2 id="contact-heading">Bring the problem that refuses to stay still.</h2>
          <p>I am targeting a full-time Junior Software Engineer role and the work around it: typed product surfaces, backend boundaries, operational handoffs, and proof that survives the release.</p>
          <a className="primary-action" href={`mailto:${portfolio.contact.email}`}>
            {portfolio.opening.primaryAction} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <address className="contact__destinations">
          <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>
          <a href={portfolio.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub <span aria-hidden="true">↗</span></a>
          <a href={portfolio.contact.cv} download>Download CV <span aria-hidden="true">↓</span></a>
        </address>
      </div>
      <footer className="page-shell site-footer">
        <a href="#opening">Le Huy / Systems Atlas</a>
        <p>Meaning stays in the DOM. Evidence stays inside its boundary.</p>
      </footer>
    </section>
  )
}
