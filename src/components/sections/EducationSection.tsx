import { motion } from "framer-motion"
import { Award, ExternalLink, GraduationCap } from "lucide-react"
import { Container, SectionHeader } from "@/components/layout"
import { education } from "@/data/profile"

function ScoreBand({ label, score, index }: { label: string; score: number; index: number }) {
  return (
    <motion.div
      className="border-t py-4"
      style={{ borderColor: "var(--line)" }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
          {label}
        </span>
        <span className="font-mono text-lg font-semibold" style={{ color: "var(--accent-2)" }}>
          {score.toFixed(1)}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: "var(--surface)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--accent-2)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${(score / 9) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}

export function EducationSection() {
  return (
    <section id="education" className="relative py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="04"
          label="Proof"
          title="Credentials are useful when they stay honest and private."
          intro="The public portfolio keeps the credential summary visible while avoiding raw personal document scans in the deployed site."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
          <motion.article
            className="rounded-[2rem] border p-6 md:p-8"
            style={{ borderColor: "var(--line)" }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4">
              <div
                className="grid h-12 w-12 flex-none place-items-center rounded-2xl border"
                style={{
                  borderColor: "color-mix(in oklch, var(--accent) 34%, transparent)",
                  background: "color-mix(in oklch, var(--accent) 10%, transparent)",
                }}
              >
                <GraduationCap className="h-6 w-6" style={{ color: "var(--accent)" }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="mono-label" style={{ color: "var(--accent)" }}>
                  Degree
                </p>
                <h3 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">{education.degree.title}</h3>
                <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  {education.degree.institution}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border-t pt-4" style={{ borderColor: "var(--line)" }}>
                <p className="mono-label" style={{ color: "var(--dim)" }}>
                  Period
                </p>
                <p className="mt-2 font-semibold">{education.degree.period}</p>
              </div>
              <div className="border-t pt-4" style={{ borderColor: "var(--line)" }}>
                <p className="mono-label" style={{ color: "var(--dim)" }}>
                  Track
                </p>
                <p className="mt-2 font-semibold">{education.degree.track}</p>
              </div>
            </div>

            <ul className="mt-7 space-y-3">
              {education.degree.highlights.map((item) => (
                <li key={item} className="text-sm leading-7" style={{ color: "var(--muted)" }}>
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            className="rounded-[2rem] border p-6 md:p-8"
            style={{ borderColor: "var(--line)" }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className="grid h-12 w-12 flex-none place-items-center rounded-2xl border"
                  style={{
                    borderColor: "color-mix(in oklch, var(--accent-2) 34%, transparent)",
                    background: "color-mix(in oklch, var(--accent-2) 10%, transparent)",
                  }}
                >
                  <Award className="h-6 w-6" style={{ color: "var(--accent-2)" }} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="mono-label" style={{ color: "var(--accent-2)" }}>
                    IELTS Academic
                  </p>
                  <h3 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">
                    {education.ielts.score.toFixed(1)} / CEFR {education.ielts.level}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                    Test year {education.ielts.year}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {education.ielts.bands.map((band, index) => (
                <ScoreBand key={band.label} label={band.label} score={band.score} index={index} />
              ))}
            </div>

            <a
              href="/credentials/ielts/index.html"
              className="action-link focus-ring mt-6 px-4 py-2 text-sm font-semibold"
            >
              Credential summary
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.article>
        </div>
      </Container>
    </section>
  )
}
