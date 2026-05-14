import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Github, Mail } from "lucide-react"
import { easeOutExpo } from "@/lib/animations"

const floatingIcons = [
  { label: "TypeScript", color: "#60A5FA", symbol: "TS", w: 80, h: 52 },
  { label: "React", color: "#67E8F9", symbol: "React", w: 88, h: 56 },
  { label: "Python", color: "#A78BFA", symbol: "Python", w: 90, h: 56 },
  { label: "Node.js", color: "#4ADE80", symbol: "Node", w: 88, h: 52 },
  { label: "Docker", color: "#38BDF8", symbol: "Docker", w: 88, h: 52 },
  { label: "PostgreSQL", color: "#F472B6", symbol: "Postgres", w: 96, h: 56 },
  { label: "FastAPI", color: "#34D399", symbol: "FastAPI", w: 88, h: 52 },
  { label: "AI/ML", color: "#FB923C", symbol: "AI/ML", w: 80, h: 52 },
]

function FloatingIcon({ icon, index }: { icon: (typeof floatingIcons)[0]; index: number }) {
  const xRaw = useMotionValue(0)
  const yRaw = useMotionValue(0)
  const springX = useSpring(xRaw, { stiffness: 50, damping: 14, mass: 0.8 })
  const springY = useSpring(yRaw, { stiffness: 50, damping: 14, mass: 0.8 })
  const delay = 0.7 + index * 0.12

  return (
    <motion.div
      className="absolute hidden xl:block pointer-events-none"
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        opacity: { duration: 0.8, delay, ease: easeOutExpo as unknown as string },
        scale: { duration: 0.8, delay, ease: easeOutExpo as unknown as string },
        rotate: { duration: 0.8, delay, ease: easeOutExpo as unknown as string },
      }}
    >
      <motion.div
        drag dragConstraints={{ left: -80, right: 80, top: -60, bottom: 60 }}
        dragElastic={0.03}
        dragMomentum={false}
        whileHover={{ scale: 1.12, rotate: 3 }}
        whileTap={{ scale: 0.92 }}
        className="group relative cursor-grab active:cursor-grabbing"
      >
        <div
          className="relative flex flex-col items-center justify-center gap-0.5 font-mono font-bold select-none rounded-2xl"
          style={{
            width: icon.w,
            height: icon.h,
            background: `linear-gradient(135deg, ${icon.color}18, ${icon.color}06)`,
            border: `1px solid ${icon.color}35`,
            boxShadow: `0 8px 32px ${icon.color}12, inset 0 1px 0 ${icon.color}30`,
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `linear-gradient(135deg, transparent 30%, ${icon.color}12 50%, transparent 70%)` }}
          />
          <span className="text-[10px] font-black tracking-tight" style={{ color: icon.color }}>
            {icon.symbol}
          </span>
          <span className="text-[7px] tracking-wider opacity-40" style={{ color: icon.color }}>
            {icon.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function AnimatedText({ text, delayStart = 0.1 }: { text: string; delayStart?: number }) {
  return (
    <span className="inline-flex flex-wrap justify-center">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={char === " " ? "inline-block w-3" : "inline-block"}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: delayStart + i * 0.04, ease: easeOutExpo as unknown as string }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const ww = window.innerWidth
      const wh = window.innerHeight
      setMousePos({ x: e.clientX / ww, y: e.clientY / wh })
    }
    window.addEventListener("mousemove", h, { passive: true })
    return () => window.removeEventListener("mousemove", h)
  }, [])

  const spotX = useTransform(useMotionValue(mousePos.x), [0, 1], ["-15%", "15%"])
  const spotY = useTransform(useMotionValue(mousePos.y), [0, 1], ["-15%", "15%"])

  const iconPositions = [
    { x: 0, y: -40 },   // TypeScript — top-center
    { x: -200, y: -10 }, // React — left-center
    { x: 210, y: -10 },  // Python — right-center
    { x: -210, y: 50 },  // Node.js — bottom-left
    { x: 215, y: 50 },   // Docker — bottom-right
    { x: -100, y: 100 }, // PostgreSQL — lower-left
    { x: 100, y: 100 },  // FastAPI — lower-right
    { x: 0, y: 130 },    // AI/ML — bottom-center
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: spotX, y: spotY }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 600px 400px at 50% 50%, hsl(200, 100%, 60%) / 0.08, transparent)" }}
        />
      </motion.div>

      {/* Floating icons layer */}
      <div className="absolute inset-0" aria-hidden="true">
        {mounted &&
          floatingIcons.map((icon, i) => (
            <div
              key={icon.label}
              className="absolute hidden xl:block pointer-events-none"
              style={{
                left: `calc(50% + ${iconPositions[i].x}px)`,
                top: `calc(50% + ${iconPositions[i].y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <FloatingIcon icon={icon} index={i} />
            </div>
          ))}
      </div>

      {/* Main content */}
      <div
        id="hero-content"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 liquid-glass rounded-full text-xs font-medium tracking-wide"
            style={{ color: "hsl(var(--muted-fg))" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#4ADE80" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Available for opportunities
          </span>
        </motion.div>

        {/* Name — clip-path reveal */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={mounted ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 1.0, delay: 0.55, ease: easeOutExpo as unknown as string }}
          >
            <h1
              className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-bold tracking-tighter leading-none"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <AnimatedText text="Le Huy" delayStart={0.55} />
            </h1>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mb-6"
        >
          <span
            className="text-base sm:text-lg md:text-xl font-light tracking-[0.25em] uppercase"
            style={{ color: "hsl(var(--muted-fg))", opacity: 0.55 }}
          >
            Full-Stack Developer
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed px-4"
          style={{ color: "hsl(var(--muted-fg))" }}
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          Backend-leaning full-stack developer. Building practical systems that hold up under real use.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.35 }}
        >
          <motion.a
            href="#profile"
            className="relative liquid-glass-strong rounded-full px-7 py-3 text-sm font-semibold flex items-center gap-2 btn-press"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>Explore My Work</span>
            <motion.span animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown className="w-4 h-4" />
            </motion.span>
          </motion.a>

          <motion.a
            href="https://github.com/lhcaps"
            target="_blank"
            rel="noopener noreferrer"
            className="relative liquid-glass rounded-full px-7 py-3 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
            style={{ color: "hsl(var(--muted-fg))" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <Github className="w-4 h-4" />
            GitHub
          </motion.a>

          <motion.a
            href="mailto:huyle210525@gmail.com"
            className="relative liquid-glass rounded-full px-7 py-3 text-sm font-semibold flex items-center gap-2 transition-colors duration-300"
            style={{ color: "hsl(var(--muted-fg))" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <Mail className="w-4 h-4" />
            Contact
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2.0 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span
            className="text-[9px] font-medium tracking-[0.25em] uppercase"
            style={{ color: "hsl(var(--muted-fg))", opacity: 0.25 }}
          >
            Scroll
          </span>
          <div
            className="relative w-[22px] h-[34px] rounded-full flex justify-center pt-2"
            style={{ border: "1px solid hsl(var(--muted-fg) / 0.12)" }}
          >
            <motion.div
              className="w-1.5 h-2.5 rounded-full"
              style={{ background: "hsl(var(--primary))" }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
