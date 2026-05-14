import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Award, ExternalLink, CheckCircle, ChevronDown } from "lucide-react"

function EducationCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.8", "start 0.3"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  return (
    <motion.div
      ref={cardRef}
      className="relative p-6 md:p-8 rounded-2xl border border-border bg-card/80 backdrop-blur-sm"
      style={{ opacity, y }}
      whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.3)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute left-0 top-6 bottom-6 md:top-8 md:bottom-8 w-1 rounded-full bg-gradient-to-b from-primary to-purple-500"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ transformOrigin: "top" }}
      />

      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
          style={{ background: "hsl(var(--primary) / 0.1)" }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ rotate: [0, -5, 5, 0] }}
        >
          <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold mb-1">B.Sc. Information Technology</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            HUFLIT — Ho Chi Minh City University of Foreign Languages and IT
          </p>
          <div className="flex items-center gap-2 md:gap-3 mt-2 flex-wrap">
            <span className="inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-primary/10 text-primary">
              2023 — 2027
            </span>
            <span className="inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-secondary text-muted-foreground">
              Software Engineering
            </span>
          </div>
        </div>
      </div>

      <ul className="space-y-1.5 md:space-y-2 ml-3 md:ml-4">
        <li className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
          <span>Specialized in Software Engineering methodologies and best practices</span>
        </li>
        <li className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
          <span>Strong foundation in algorithms, data structures, and system design</span>
        </li>
      </ul>
    </motion.div>
  )
}

function IeltsCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.8", "start 0.3"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden"
      style={{ opacity, y }}
    >
      {/* Left accent bar - amber gradient, always visible */}
      <motion.div
        className="absolute left-0 top-0 w-1 bg-gradient-to-b from-amber-400 via-amber-500 to-orange-500"
        animate={{ height: isCollapsed ? "calc(100% - 0px)" : "100%" }}
        initial={false}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      {/* Header - always visible */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full p-6 md:p-8 pl-8 flex items-center gap-3 md:gap-4 text-left hover:bg-muted/5 transition-colors cursor-pointer"
      >
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-amber-500/10 flex-shrink-0"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ rotate: [0, -5, 5, 0] }}
        >
          <Award className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold mb-1">IELTS Academic 6.5 (B2)</h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            British Council — Verified English Proficiency
          </p>
        </div>

        <motion.div
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary/80 flex-shrink-0"
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Collapsible content */}
      <motion.div
        initial={false}
        animate={{ height: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          {/* Tags */}
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 flex-wrap">
            <span className="inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
              2023
            </span>
            <span className="inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-secondary text-muted-foreground">
              TRF: 22VN026805LEH028A
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          </div>

          {/* Certificate Image */}
          <div className="mb-4 md:mb-6">
            <div className="relative rounded-xl overflow-hidden border border-border group cursor-pointer">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <img
                src="/ielts-cert.jpg"
                alt="IELTS Certificate"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <a
                  href="https://ielts.ucles.org.uk/verify/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/95 text-foreground text-xs md:text-sm font-medium hover:bg-white transition-colors shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  Verify Certificate
                </a>
              </div>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground mt-2 text-center">
              Click to verify at British Council
            </p>
          </div>

          {/* Score bands */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Listening", score: 6.5 },
              { label: "Reading", score: 6.5 },
              { label: "Writing", score: 6.0 },
              { label: "Speaking", score: 6.5 },
            ].map((band, i) => (
              <div key={band.label} className="text-center">
                <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, hsl(var(--primary)), hsl(280, 80%, 60%))",
                      width: `${(band.score / 9) * 100}%`,
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(band.score / 9) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                  />
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground">{band.label}</span>
                <span className="block text-xs md:text-sm font-semibold">{band.score}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const numberOpacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 1])
  const numberScale = useTransform(scrollYProgress, [0.05, 0.12], [0.8, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] md:text-[14vw] font-black text-primary/[0.03] select-none pointer-events-none leading-none"
        style={{ y: bgY }}
      >
        EDU
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-3 md:gap-4 mb-10 md:mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="text-5xl md:text-6xl lg:text-7xl font-black text-primary/10 select-none"
            style={{ opacity: numberOpacity, scale: numberScale }}
          >
            03
          </motion.span>
          <div>
            <h2 className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground">
              Education
            </h2>
            <motion.div
              className="h-px bg-primary/30 mt-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="space-y-6 md:space-y-8">
          <EducationCard />
          <IeltsCard />
        </div>
      </div>
    </section>
  )
}
