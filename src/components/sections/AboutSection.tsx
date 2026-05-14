import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container, SectionHeader } from "@/components/layout"
import { profile } from "@/data/profile"

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -20])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-44 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black select-none pointer-events-none leading-none"
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          WebkitTextStroke: "1px rgba(103, 232, 249, 0.03)",
          color: "transparent",
          y: bgY,
        }}
      >
        ABOUT
      </motion.div>

      <Container>
        <SectionHeader number="03" label="About" />

        <div className="max-w-3xl">
          {/* Main bio statements */}
          <div className="space-y-6 mb-12">
            {profile.bio.map((line, i) => (
              <motion.div
                key={i}
                className="relative pl-6"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-px rounded-full"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(to bottom, hsl(200, 100%, 65%), hsl(270, 100%, 70%))"
                        : "rgba(255,255,255,0.08)",
                  }}
                />
                <p
                  className={
                    i === 0
                      ? "text-lg md:text-xl lg:text-2xl font-medium leading-relaxed"
                      : "text-sm md:text-base lg:text-lg leading-relaxed"
                  }
                  style={{ color: i === 0 ? "hsl(var(--fg))" : "hsl(var(--muted-fg))" }}
                >
                  {line}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Availability card */}
          <motion.div
            className="p-6 md:p-8 rounded-2xl"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.25)",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                style={{
                  background: "#4ADE80",
                  boxShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "hsl(var(--muted-fg))" }}>
                Currently open to internships and collaborative projects in full-stack development,
                backend systems, and AI/ML applications. Based in Ho Chi Minh City, Vietnam.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
