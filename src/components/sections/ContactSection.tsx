import { motion } from "framer-motion"
import { ArrowUpRight, Download, Github, Mail, MapPin } from "lucide-react"
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
    <section id="contact" className="relative py-20 md:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 md:px-8">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-4">
            <span className="mono-label" style={{ color: "var(--accent)" }}>03</span>
            <div className="h-px w-10 hairline" />
            <span className="mono-label" style={{ color: "var(--dim)" }}>Contact</span>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left: CTA */}
          <div>
            <h2 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl" style={{ color: "var(--fg)", fontFamily: "var(--font-heading)" }}>
              Available for<br />
              <span style={{ color: "var(--accent)" }}>Backend</span> /<br />
              Full-stack Intern.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8" style={{ color: "var(--muted)" }}>
              Based in Ho Chi Minh City. Best fit: React, TypeScript, Node.js, FastAPI, SQL, Docker. Email is the fastest way to reach me.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.contact.email}`}
                className="action-link focus-ring inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
              >
                <Mail className="h-4 w-4" />
                Email me
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link focus-ring inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="/Le_Huy_CV.pdf"
                className="action-link focus-ring inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Right: Contact card */}
          <div className="rounded-[2rem] border p-6 md:p-8" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
            {contactItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-b py-4 first:pt-0 last:border-b-0 last:pb-0"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 flex-none place-items-center rounded-2xl border"
                      style={{
                        borderColor: `color-mix(in oklch, ${item.accent} 34%, transparent)`,
                        background: `color-mix(in oklch, ${item.accent} 10%, transparent)`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.accent }} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="mono-label" style={{ color: "var(--dim)" }}>{item.label}</p>
                      <p className="mt-1 truncate text-sm font-semibold">{item.value}</p>
                    </div>
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="focus-ring"
                      style={{ color: "var(--dim)" }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t py-7" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-5 text-sm sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
        <span style={{ color: "var(--dim)" }}>Le Huy / Louwis</span>
        <a className="focus-ring rounded-full hover:text-[var(--fg)]" style={{ color: "var(--muted)" }} href="#">
          Back to top
        </a>
      </div>
    </footer>
  )
}
