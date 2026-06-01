import { motion } from "framer-motion"
import { ArrowUpRight, Download, Github, Mail, MapPin } from "lucide-react"
import { Container, SectionHeader } from "@/components/layout"
import { profile } from "@/data/profile"

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
    accent: "var(--accent)",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/lhcaps",
    href: profile.contact.github,
    accent: "var(--accent-3)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.contact.location,
    href: null,
    accent: "var(--accent-2)",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="05"
          label="Contact"
          title="Open to internships and product engineering work."
          intro="I am based in Ho Chi Minh City. The fastest way to reach me is email. GitHub is open for code review."
        />

        <motion.div
          className="grid gap-6 rounded-[2rem] border p-6 md:p-8 lg:grid-cols-[1fr_0.9fr]"
          style={{ borderColor: "var(--line)" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="mono-label" style={{ color: "var(--accent)" }}>
              Get in touch
            </p>
            <h3 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
              Looking for: Backend / Full-stack Intern.
            </h3>
            <p className="mt-5 max-w-xl text-sm leading-7 md:text-base" style={{ color: "var(--muted)" }}>
              I am available for internships and product engineering work. Best stack fit: React, TypeScript, Node.js, FastAPI, SQL, Docker. Ho Chi Minh City based.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="action-link focus-ring inline-flex px-5 py-3 text-sm font-semibold" href={`mailto:${profile.contact.email}`}>
                <Mail className="h-4 w-4" />
                Email me
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                className="action-link focus-ring inline-flex px-5 py-3 text-sm font-semibold"
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                className="action-link focus-ring inline-flex px-5 py-3 text-sm font-semibold"
                href="/Le_Huy_CV.pdf"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          <div className="rounded-[1.5rem] border" style={{ borderColor: "var(--line)" }}>
            {contactItems.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 place-items-center rounded-2xl border"
                      style={{
                        borderColor: `color-mix(in oklch, ${item.accent} 34%, transparent)`,
                        background: `color-mix(in oklch, ${item.accent} 10%, transparent)`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.accent }} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="mono-label" style={{ color: "var(--dim)" }}>
                        {item.label}
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold md:text-base">{item.value}</p>
                    </div>
                  </div>
                  {item.href && <ArrowUpRight className="h-4 w-4 flex-none" style={{ color: "var(--dim)" }} />}
                </>
              )

              const className = "focus-ring flex items-center justify-between gap-4 border-b p-5 text-left last:border-b-0"
              const style = { borderColor: "var(--line)" }

              if (!item.href) {
                return (
                  <div key={item.label} className={className} style={style}>
                    {content}
                  </div>
                )
              }

              return (
                <a
                  key={item.label}
                  className={className}
                  style={style}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t py-7" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
        <span style={{ color: "var(--dim)" }}>Le Huy / Louwis</span>
        <a className="focus-ring rounded-full text-[var(--muted)] hover:text-[var(--fg)]" href="#">
          Back to top
        </a>
      </div>
    </footer>
  )
}
