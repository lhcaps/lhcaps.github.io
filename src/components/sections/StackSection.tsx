import { motion } from "framer-motion"
import { stackGroups } from "@/data/stack"

export function StackSection() {
  return (
    <section id="stack" className="relative py-20 md:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 md:px-8">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-4">
            <span className="mono-label" style={{ color: "var(--accent)" }}>02</span>
            <div className="h-px w-10 hairline" />
            <span className="mono-label" style={{ color: "var(--dim)" }}>Stack</span>
          </div>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight md:text-5xl" style={{ color: "var(--fg)", fontFamily: "var(--font-heading)" }}>
            Runtime layers, not a tool list.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 md:text-base" style={{ color: "var(--muted)" }}>
            Each group maps to a runtime concern. No fluff, no "also familiar with."
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(5,1fr)]">
          {stackGroups.map((group, index) => (
            <motion.div
              key={group.label}
              className="stack-card rounded-[1.5rem] border p-5"
              style={{
                borderColor: "var(--line)",
                background: `color-mix(in oklch, ${group.accent} 5%, var(--surface))`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <div className="mb-4">
                <p className="text-lg font-bold" style={{ color: group.accent, fontFamily: "var(--font-heading)" }}>
                  {group.label}
                </p>
                <p className="mono-label mt-1" style={{ color: "var(--dim)" }}>
                  {group.tag}
                </p>
              </div>

              <div className="space-y-2">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    <span
                      className="h-1.5 w-1.5 flex-none rounded-full"
                      style={{ background: group.accent }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
