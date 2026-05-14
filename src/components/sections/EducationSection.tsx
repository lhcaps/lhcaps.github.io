import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Award, CheckCircle } from "lucide-react"
import { Container } from "@/components/layout/Container"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { education } from "@/data/profile"

function DegreeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl p-6 md:p-8"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-8 bottom-8 w-0.5 rounded-full"
        style={{ background: "hsl(var(--primary))" }}
      />

      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6 pl-3">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(103,232,249,0.08)", border: "1px solid rgba(103,232,249,0.2)" }}
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
        >
          <GraduationCap className="w-5 h-5 md:w-6 md:h-6" style={{ color: "hsl(var(--primary))" }} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold mb-1">{education.degree.title}</h3>
          <p className="text-xs md:text-sm mb-3" style={{ color: "hsl(var(--muted-fg))" }}>
            {education.degree.institution}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{
                background: "rgba(103,232,249,0.08)",
                border: "1px solid rgba(103,232,249,0.2)",
                color: "hsl(var(--primary))",
              }}
            >
              {education.degree.period}
            </span>
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "hsl(var(--muted-fg))",
              }}
            >
              {education.degree.track}
            </span>
          </div>
        </div>
      </div>

      <ul className="space-y-2 pl-3">
        {education.degree.highlights.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-xs md:text-sm">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "hsl(var(--primary))" }}
            />
            <span style={{ color: "hsl(var(--muted-fg))" }}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function IeltsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
      }}
    >
      {/* Amber bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "#F59E0B" }} />

      {/* Content */}
      <div className="p-6 md:p-8 pl-8">
        <div className="flex items-start gap-3 md:gap-4 mb-4">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(252,211,77,0.08)", border: "1px solid rgba(252,211,77,0.2)" }}
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Award className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#F59E0B" }} />
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold mb-1">IELTS Academic {education.ielts.score} ({education.ielts.level})</h3>
            <p className="text-xs md:text-sm" style={{ color: "hsl(var(--muted-fg))" }}>
              British Council — Verified English Proficiency
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{ background: "rgba(252,211,77,0.08)", border: "1px solid rgba(252,211,77,0.2)", color: "#F59E0B" }}
            >
              {education.ielts.year}
            </span>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ADE80" }}
            >
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
          </div>
        </div>

        {/* Score bands */}
        <div className="grid grid-cols-4 gap-3">
          {education.ielts.bands.map((band: { label: string; score: number }, i: number) => (
            <div key={band.label} className="flex flex-col items-center">
              <span className="text-[10px] md:text-xs mb-2 text-center leading-tight" style={{ color: "hsl(var(--muted-fg))" }}>
                {band.label}
              </span>
              <span className="text-base md:text-lg font-bold mb-2 font-mono tabular-nums leading-none" style={{ color: "#F59E0B" }}>
                {band.score}
              </span>
              <div className="relative h-1 w-full rounded-full overflow-hidden" style={{ background: "hsl(var(--border))" }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: "#F59E0B" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(band.score / 9) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section id="education" ref={sectionRef} className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
      {/* Background watermark */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black select-none pointer-events-none leading-none section-num"
        style={{ y: bgY, opacity: 0.03 }}
      >
        EDU
      </motion.div>

      <Container>
        <SectionHeader number="04" label="Education" />

        <div className="space-y-4 max-w-3xl">
          <DegreeCard />
          <IeltsCard />
        </div>
      </Container>
    </section>
  )
}
