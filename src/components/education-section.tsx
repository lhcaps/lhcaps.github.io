import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Award, ExternalLink, CheckCircle, ChevronDown } from "lucide-react"
import { Reveal } from "@/lib/reveal"
import { easeOutExpo } from "@/lib/animations"

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function EducationCard() {
  const [h, setH] = useState(false)
  return (
    <motion.div
      className="relative rounded-2xl p-6 md:p-8 glass-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      style={{ borderColor: h ? "hsl(var(--primary) / 0.3)" : undefined }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-8 bottom-8 w-0.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />

      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6 pl-3">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.2)" }}
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
        >
          <GraduationCap className="w-5 h-5 md:w-6 md:h-6" style={{ color: "hsl(var(--primary))" }} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold mb-1">B.Sc. Information Technology</h3>
          <p className="text-xs md:text-sm mb-3" style={{ color: "hsl(var(--muted-fg))" }}>HUFLIT — Ho Chi Minh City University of Foreign Languages and IT</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{ background: "hsl(var(--primary) / 0.08)", border: "1px solid hsl(var(--primary) / 0.2)", color: "hsl(var(--primary))" }}>
              2023 — 2027
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{ background: "hsl(var(--muted-fg) / 0.08)", border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-fg))" }}>
              Software Engineering
            </span>
          </div>
        </div>
      </div>

      <ul className="space-y-2 pl-3">
        {[
          "Specialized in Software Engineering methodologies and best practices",
          "Strong foundation in algorithms, data structures, and system design",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs md:text-sm">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary))" }} />
            <span style={{ color: "hsl(var(--muted-fg))" }}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function IeltsCard() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      className="relative rounded-2xl glass-card overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={cardVariants}
      style={{ borderColor: "hsl(var(--border))" }}
    >
      {/* Amber bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: "#F59E0B" }} />

      {/* Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full p-6 md:p-8 pl-8 flex items-center gap-3 md:gap-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(252, 211, 77, 0.08)", border: "1px solid rgba(252, 211, 77, 0.2)" }}
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Award className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#F59E0B" }} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold mb-1">IELTS Academic 6.5 (B2)</h3>
          <p className="text-xs md:text-sm" style={{ color: "hsl(var(--muted-fg))" }}>British Council — Verified English Proficiency</p>
        </div>

        <motion.div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "hsl(var(--muted-fg) / 0.08)" }}
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: "hsl(var(--muted-fg))" }} />
        </motion.div>
      </button>

      {/* Collapsible */}
      <motion.div
        initial={false}
        animate={{ height: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{ background: "rgba(252, 211, 77, 0.08)", border: "1px solid rgba(252, 211, 77, 0.2)", color: "#F59E0B" }}>
              2023
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{ background: "hsl(var(--muted-fg) / 0.08)", border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-fg))" }}>
              TRF: 22VN026805LEH028A
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-medium"
              style={{ background: "rgba(74, 222, 128, 0.08)", border: "1px solid rgba(74, 222, 128, 0.2)", color: "#4ADE80" }}>
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
          </div>

          {/* Certificate */}
          <div className="mb-4 rounded-xl overflow-hidden relative" style={{ border: "1px solid hsl(var(--border))" }}>
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse" style={{ background: "hsl(var(--muted-fg) / 0.05)" }} />
            )}
            <img
              src="/ielts-cert.jpg"
              alt="IELTS Certificate"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              style={{ opacity: imageLoaded ? 1 : 0, transition: "opacity 0.3s" }}
              onLoad={() => setImageLoaded(true)}
            />
            {imageLoaded && (
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)" }}>
                <a href="https://ielts.ucles.org.uk/verify/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-medium"
                  style={{ background: "#fff", color: "#111" }}
                  onClick={(e) => e.stopPropagation()}>
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" /> Verify Certificate
                </a>
              </div>
            )}
          </div>

          {/* Score bands */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Listening", score: 6.5 },
              { label: "Reading", score: 6.5 },
              { label: "Writing", score: 6.0 },
              { label: "Speaking", score: 6.5 },
            ].map((band, i) => (
              <div key={band.label} className="flex flex-col items-center">
                <span className="text-[10px] md:text-xs mb-2 text-center leading-tight" style={{ color: "hsl(var(--muted-fg))" }}>{band.label}</span>
                <span className="text-base md:text-lg font-bold mb-2 font-mono tabular-nums leading-none" style={{ color: "#F59E0B" }}>{band.score}</span>
                <div className="relative h-1 w-full rounded-full overflow-hidden" style={{ background: "hsl(var(--border))" }}>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "#F59E0B" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(band.score / 9) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: easeOutExpo as unknown as string }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function EducationSection() {
  return (
    <section id="education" className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <Reveal direction="left" className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-5xl md:text-6xl lg:text-7xl font-black select-none leading-none pb-2 section-num">
            03
          </span>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "hsl(var(--muted-fg))" }}>
              Education
            </h2>
            <div className="accent-line mt-3" />
          </div>
        </Reveal>

        {/* Cards */}
        <div className="space-y-4">
          <EducationCard />
          <IeltsCard />
        </div>
      </div>
    </section>
  )
}
