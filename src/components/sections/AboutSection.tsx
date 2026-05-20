import { motion } from "framer-motion"
import { Container, SectionHeader } from "@/components/layout"
import { profile } from "@/data/profile"

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="03"
          label="Principles"
          title="I am trying to become the kind of engineer whose UI does not lie."
          intro="The work is backend-heavy, but the portfolio is intentionally not just a list of repositories. It shows how I think about state, contracts, and proof."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.bio.map((line) => (
              <p key={line} className="text-lg leading-8 md:text-xl" style={{ color: "var(--muted)" }}>
                {line}
              </p>
            ))}
          </motion.div>

          <div className="rounded-[2rem] border" style={{ borderColor: "var(--line)" }}>
            {profile.principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="grid gap-3 border-b p-6 last:border-b-0 md:grid-cols-[120px_1fr]"
                style={{ borderColor: "var(--line)" }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.42, delay: index * 0.05 }}
              >
                <span className="mono-label" style={{ color: "var(--accent)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: "var(--fg)" }}>
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 md:text-base" style={{ color: "var(--muted)" }}>
                    {principle.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
