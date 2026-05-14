import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Github, Mail } from "lucide-react"
import { easeOutExpo } from "@/lib/animations"

/* ── SVG Tech Icons — minimal line style ─────────────────────────── */
function TsIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L6 2H10L8 1Z" fill={color} />
      <path d="M6 14L8 13H10L6 14Z" fill={color} />
      <path d="M6 2V11L8 13M6 2H10V6H8M10 2V10L10 13H8M8 10L6 13L10 13V10H8.5" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ReactIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="1.5" stroke={color} strokeWidth="1" />
      <ellipse cx="8" cy="8" rx="5.5" ry="2.5" stroke={color} strokeWidth="1" strokeDasharray="2 1.5" />
      <ellipse cx="8" cy="8" rx="5.5" ry="2.5" stroke={color} strokeWidth="1" strokeDasharray="2 1.5" transform="rotate(60 8 8)" />
      <ellipse cx="8" cy="8" rx="5.5" ry="2.5" stroke={color} strokeWidth="1" strokeDasharray="2 1.5" transform="rotate(120 8 8)" />
    </svg>
  )
}

function PythonIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1C5.5 1 4.5 2 4.5 3V4H8.5V5H3.5C3 5 2 5.5 2 7V8C2 9.5 3 10 3.5 10H4.5V13.5C4.5 15 6 16 8 16C9.5 16 10.5 15.5 11 14.5H11.5C11.5 14.5 11.5 15.5 12.5 15.5C13.5 15.5 14.5 14.5 14.5 13V7C14.5 5.5 13.5 4.5 12.5 4.5L13 1.5C13 1.5 11.5 1 9.5 1H8Z" fill={color} />
      <path d="M8 1C10.5 1 11.5 2 11.5 3V4H7.5V5H12.5C13 5 14 5.5 14 7V8C14 9.5 13 10 12.5 10H11.5V13.5C11.5 15 10 16 8 16C6.5 16 5.5 15.5 5 14.5H4.5C4.5 14.5 4.5 15.5 3.5 15.5C2.5 15.5 1.5 14.5 1.5 13V7C1.5 5.5 2.5 4.5 3.5 4.5L3 1.5C3 1.5 4.5 1 6.5 1H8Z" fill={color} fillOpacity="0.5" />
    </svg>
  )
}

function NodeIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M12 9.5C12.2 10 12 10.5 11.5 10.8C10.5 11.3 10 10.5 9.8 10.2L9 10.8C9.2 11.1 9.8 12 11.5 11.5C13 11 13.3 10.3 13.1 9.8C12.9 9.3 12 9 11 9.2L10.5 9.3C10.4 9.3 10.3 9.35 10.2 9.4C10.1 9.55 10 9.6 10 9.8C10 10 10.2 10.1 10.4 10.2C11 10.5 11.5 10.8 12 10.6C12.5 10.5 12.7 10.2 12.5 9.8C12.3 9.4 11.5 9.2 11 9.3L10.7 9.35C10.3 9.4 10 9.5 9.7 9.7C9.4 9.9 9.2 10 9.1 10.2C8.9 10.5 8.9 10.8 9.1 11.2C9.3 11.6 9.8 11.7 10.2 12C10.6 12.2 11 12.4 11.4 12.5C12 12.7 12.3 12.9 12.5 13C12.8 13.3 12.9 13.8 12.7 14.2C12.5 14.7 12 14.8 11.5 14.8C11 14.8 10.5 14.5 10.2 14.2L9.5 14.8C10 15.1 10.5 15.4 11 15.4C12 15.4 12.7 14.8 13 14.2C13.3 13.6 13.1 13 12.7 12.7C12.4 12.4 12 12.3 11.6 12.3L12 12.2C12.5 12 13 11.8 13.2 11.5C13.4 11.2 13.5 10.8 13.3 10.4C13.1 10 12.7 9.7 12.3 9.5C11.8 9.3 11.3 9.3 10.9 9.4L11.5 9.3C12 9.1 12.5 9.2 13 9.6V9.5Z" fill={color} />
      <path d="M6 6.5C5.8 6 6 5.5 6.5 5.2C7.5 4.7 8 5.5 8.2 5.8L9 5.2C8.8 4.9 8.2 4 6.5 4.5C5 5 4.7 5.7 4.9 6.2C5.1 6.7 6 7 7 6.8L7.5 6.7C7.6 6.7 7.7 6.65 7.8 6.6C7.9 6.45 8 6.4 8 6.2C8 6 7.8 5.9 7.6 5.8C7 5.5 6.5 5.2 6 5.4C5.5 5.5 5.3 5.8 5.5 6.2C5.7 6.6 6.5 6.8 7 6.7L7.3 6.65C7.7 6.6 8 6.5 8.3 6.3C8.6 6.1 8.8 6 8.9 5.8C9.1 5.5 9.1 5.2 8.9 4.8C8.7 4.4 8.2 4.3 7.8 4C7.4 3.8 7 3.6 6.6 3.5C6 3.3 5.7 3.1 5.5 3C5.2 2.7 5.1 2.2 5.3 1.8C5.5 1.3 6 1.2 6.5 1.2C7 1.2 7.5 1.5 7.8 1.8L8.5 1.2C8 0.9 7.5 0.6 7 0.6C6 0.6 5.3 1.2 5 1.8C4.7 2.4 4.9 3 5.3 3.3C5.6 3.6 6 3.7 6.4 3.7L5.8 3.8C5.3 4 4.8 4.2 4.6 4.5C4.4 4.8 4.3 5.2 4.5 5.6C4.7 6 5.1 6.3 5.5 6.5C6 6.7 6.5 6.7 6.9 6.6L6.3 6.7C5.8 6.9 5.3 6.8 4.8 6.4V6.5Z" fill={color} />
    </svg>
  )
}

function DockerIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="14" height="14" rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      <path d="M8 2C5.5 2 4 3 4 4H8V2Z" fill={color} fillOpacity="0.5" />
      <path d="M4 4.5C3.5 5 3 6 3 8C3 10 4 11 4.5 11.5V14H11.5V11.5C12 11 12.5 10 12.5 8C12.5 6 12 5 11.5 4.5V8H9V4.5C8.5 5 8 6 8 8H6.5C6.5 6 6 5 5.5 4.5V8H4.5V4.5C4.5 4.5 4.5 4.5 4 4.5Z" fill={color} fillOpacity="0.4" />
      <path d="M4 4H8V5.5H4V4ZM4 6.5H8V8H4V6.5Z" fill={color} />
    </svg>
  )
}

function PostgresIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="5.5" rx="3.5" ry="1.5" stroke={color} strokeWidth="1" />
      <path d="M4.5 5.5V9C4.5 11 6 12 8 12C10 12 11.5 11 11.5 9V5.5" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      <path d="M4.5 7.5C4.5 9.5 6 11 8 11C10 11 11.5 9.5 11.5 7.5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <path d="M6.5 5.5C6 6 5 7 5 9M9.5 5.5C10 6 11 7 11 9" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  )
}

function FastApiIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 12L6 4H9L7 8H9L6 12H3Z" fill={color} />
      <path d="M9 4H12L9 12H6L9 8H7L9 4Z" fill={color} fillOpacity="0.5" />
    </svg>
  )
}

function AIMLIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke={color} strokeWidth="1" />
      <path d="M8 3V5M8 11V13M3 8H5M11 8H13M4.8 4.8L6.1 6.1M9.9 9.9L11.2 11.2M11.2 4.8L9.9 6.1M6.1 9.9L4.8 11.2" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <circle cx="8" cy="8" r="0.5" fill={color} />
    </svg>
  )
}

/* ── Skill pill data ──────────────────────────────────────────────── */
const skillPills = [
  { label: "TypeScript", color: "#60A5FA", Icon: TsIcon },
  { label: "React", color: "#67E8F9", Icon: ReactIcon },
  { label: "Python", color: "#A78BFA", Icon: PythonIcon },
  { label: "Node.js", color: "#4ADE80", Icon: NodeIcon },
  { label: "Docker", color: "#38BDF8", Icon: DockerIcon },
  { label: "PostgreSQL", color: "#F472B6", Icon: PostgresIcon },
  { label: "FastAPI", color: "#34D399", Icon: FastApiIcon },
  { label: "AI / ML", color: "#FB923C", Icon: AIMLIcon },
]

/* ── Float keyframe per pill (offset phases) ────────────────────── */
const floatOffsets = [0, 0.4, 0.8, 1.2, 0.2, 0.6, 1.0, 1.5]

/* ── Single Skill Pill ───────────────────────────────────────────── */
function SkillPill({
  pill,
  index,
  mouseX,
  mouseY,
}: {
  pill: (typeof skillPills)[0]
  index: number
  mouseX: number
  mouseY: number
}) {
  const Icon = pill.Icon
  const offset = floatOffsets[index]
  const depth = 0.12 + (index % 3) * 0.06

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const springPx = useSpring(px, { stiffness: 45, damping: 14 })
  const springPy = useSpring(py, { stiffness: 45, damping: 14 })

  useEffect(() => {
    px.set(mouseX * depth * 24)
    py.set(mouseY * depth * 16)
  }, [mouseX, mouseY, px, py, depth])

  return (
    <motion.div
      className="absolute hidden xl:flex items-center pointer-events-none"
      style={{ x: springPx, y: springPy }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.5, delay: 0.8 + offset, ease: "easeOut" },
        scale: { duration: 0.5, delay: 0.8 + offset, ease: "easeOut" },
      }}
    >
      <motion.div
        className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card select-none cursor-default"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: offset,
        }}
      >
        {/* Glow dot */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: pill.color, boxShadow: `0 0 4px ${pill.color}` }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: offset }}
        />
        <Icon color={pill.color} />
        <span
          className="text-[10px] font-semibold tracking-wide whitespace-nowrap"
          style={{ color: pill.color }}
        >
          {pill.label}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ── Animated Text ───────────────────────────────────────────────── */
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

/* ── Pill positions — gentle arc around hero, no overlap ──────────── */
/*
  Hero name ~11rem, roughly 240px tall on desktop.
  Pill zone: x outside ~±360px, y above ~-150px and below ~+100px.
  This leaves a clear center for the name.
*/
const pillLayout = [
  { x: "-62%", y: "-38%" },  // TypeScript  — far upper-left
  { x: "58%",   y: "-42%" },  // React      — far upper-right
  { x: "-60%",  y: "4%"   },  // Python     — mid-left
  { x: "56%",   y: "4%"   },  // Node.js    — mid-right
  { x: "-54%",  y: "38%"  },  // Docker     — lower-left
  { x: "50%",   y: "38%"  },  // PostgreSQL — lower-right
  { x: "-38%",  y: "56%"  },  // FastAPI    — lower-mid-left
  { x: "34%",   y: "56%"  },  // AI / ML    — lower-mid-right
]

/* ── Hero Section ───────────────────────────────────────────────── */
export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const ww = window.innerWidth
      const wh = window.innerHeight
      setMousePos({ x: (e.clientX / ww) * 2 - 1, y: (e.clientY / wh) * 2 - 1 })
    }
    window.addEventListener("mousemove", h, { passive: true })
    return () => window.removeEventListener("mousemove", h)
  }, [])

  const spotX = useTransform(
    useMotionValue(mousePos.x),
    [-1, 1],
    ["-12%", "12%"]
  )
  const spotY = useTransform(
    useMotionValue(mousePos.y),
    [-1, 1],
    ["-12%", "12%"]
  )

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: spotX, y: spotY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 600px 400px at 50% 50%, hsl(200, 100%, 60%) / 0.08, transparent)",
          }}
        />
      </motion.div>

      {/* Skill pills layer */}
      <div className="absolute inset-0" aria-hidden="true">
        {mounted &&
          skillPills.map((pill, i) => (
            <div
              key={pill.label}
              className="absolute"
              style={{
                left: pillLayout[i].x,
                top: pillLayout[i].y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <SkillPill pill={pill} index={i} mouseX={mousePos.x} mouseY={mousePos.y} />
            </div>
          ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
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

        {/* Name */}
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
