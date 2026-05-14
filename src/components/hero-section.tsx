import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Github, Mail } from "lucide-react"
import { easeOutExpo } from "@/lib/animations"

/* ── Clean geometric icons ─────────────────────────────────────────── */
function TsIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="16" height="16" rx="3" fill={color} fillOpacity="0.15" />
      <path d="M9 3L7 4.5H11L9 3Z" fill={color} />
      <path d="M7 14L9 12.5H11L7 14Z" fill={color} />
      <path d="M7 4.5V10.5L9 12.5M7 4.5H11V8H9M11 4.5V10L11 12.5H9M9 10.5L7 12.5L11 12.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ReactIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="1.8" stroke={color} strokeWidth="1.2" />
      <ellipse cx="9" cy="9" rx="6.5" ry="2.8" stroke={color} strokeWidth="1.1" strokeDasharray="2.5 1.5" />
      <ellipse cx="9" cy="9" rx="6.5" ry="2.8" stroke={color} strokeWidth="1.1" strokeDasharray="2.5 1.5" transform="rotate(60 9 9)" />
      <ellipse cx="9" cy="9" rx="6.5" ry="2.8" stroke={color} strokeWidth="1.1" strokeDasharray="2.5 1.5" transform="rotate(120 9 9)" />
    </svg>
  )
}

function PythonIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="5" r="2.2" fill={color} />
      <circle cx="9" cy="13" r="2.2" fill={color} />
      <rect x="7.5" y="5" width="3" height="4.5" rx="1" fill={color} fillOpacity="0.4" />
      <path d="M5.5 5.5C5.5 5.5 4 4.5 4 5.8C4 7.1 5.5 7.5 5.5 7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12.5 10.5C12.5 10.5 14 9.5 14 10.8C14 12.1 12.5 12.5 12.5 12.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function NodeIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <polygon points="9,1.5 15.6,5.25 15.6,12.75 9,16.5 2.4,12.75 2.4,5.25" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.15" strokeLinejoin="round" />
      <text x="9" y="10.5" textAnchor="middle" fill={color} fontSize="4.5" fontFamily="monospace" fontWeight="bold">N</text>
    </svg>
  )
}

function DockerIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="16" height="16" rx="3" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.1" />
      <rect x="5.5" y="7" width="7" height="5" rx="1.5" fill={color} />
      <rect x="7" y="5" width="4" height="2.5" rx="1" fill={color} fillOpacity="0.6" />
    </svg>
  )
}

function PostgresIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="5.5" r="2" fill={color} />
      <circle cx="5" cy="10" r="2" fill={color} />
      <circle cx="13" cy="10" r="2" fill={color} />
      <circle cx="9" cy="14" r="2" fill={color} />
      <line x1="9" y1="7.5" x2="9" y2="12" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="7" y1="10" x2="11" y2="10" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function FastApiIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="16" height="16" rx="3" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.12" />
      <path d="M5 13L8 5H11L9 9.5H11L8 13H5Z" fill={color} />
      <path d="M11 5H14L11 13H8L11 9.5H9.5L11 5Z" fill={color} fillOpacity="0.5" />
    </svg>
  )
}

function AIMLIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2.5" stroke={color} strokeWidth="1.2" />
      <circle cx="9" cy="9" r="0.8" fill={color} />
      <circle cx="9" cy="3" r="1.2" fill={color} fillOpacity="0.7" />
      <circle cx="9" cy="15" r="1.2" fill={color} fillOpacity="0.7" />
      <circle cx="3" cy="9" r="1.2" fill={color} fillOpacity="0.7" />
      <circle cx="15" cy="9" r="1.2" fill={color} fillOpacity="0.7" />
      <circle cx="4.5" cy="4.5" r="1" fill={color} fillOpacity="0.5" />
      <circle cx="13.5" cy="4.5" r="1" fill={color} fillOpacity="0.5" />
      <circle cx="4.5" cy="13.5" r="1" fill={color} fillOpacity="0.5" />
      <circle cx="13.5" cy="13.5" r="1" fill={color} fillOpacity="0.5" />
      <line x1="7.5" y1="7.5" x2="4.5" y2="4.5" stroke={color} strokeWidth="0.9" strokeOpacity="0.5" />
      <line x1="10.5" y1="7.5" x2="13.5" y2="4.5" stroke={color} strokeWidth="0.9" strokeOpacity="0.5" />
      <line x1="7.5" y1="10.5" x2="4.5" y2="13.5" stroke={color} strokeWidth="0.9" strokeOpacity="0.5" />
      <line x1="10.5" y1="10.5" x2="13.5" y2="13.5" stroke={color} strokeWidth="0.9" strokeOpacity="0.5" />
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

/* ── Arc positions — single clean row, no overlaps, above hero text ── */
/*
  Hero name ~176px tall, center at 50%/50%.
  Pills go in a single horizontal arc row above the name.
  x: spread evenly from left to right.
  y: -200px from center (safely above all hero text).
  Each pill is ~120px wide max. With 8 pills at 8px gap:
  Total width needed = 8 * 120 + 7 * 8 = ~1016px.
  At 1440px screen, that's ±508px from center.
  We space them evenly at ±100, ±225, ±350, ±475 from center.
*/
const pillLayout = [
  { x: -470, y: -200, rot: -5  },  // TypeScript
  { x: -345, y: -210, rot: -3  },  // React
  { x: -220, y: -215, rot: -1  },  // Python
  { x:  -95, y: -210, rot:  0  },  // Node.js
  { x:   95, y: -210, rot:  0  },  // Docker
  { x:  220, y: -215, rot:  1  },  // PostgreSQL
  { x:  345, y: -210, rot:  3  },  // FastAPI
  { x:  470, y: -200, rot:  5  },  // AI / ML
]

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
  const pos = pillLayout[index]
  const depth = 0.12 + (index % 3) * 0.05

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const springPx = useSpring(px, { stiffness: 40, damping: 14 })
  const springPy = useSpring(py, { stiffness: 40, damping: 14 })

  useEffect(() => {
    px.set(mouseX * depth * 18)
    py.set(mouseY * depth * 12)
  }, [mouseX, mouseY, px, py, depth])

  return (
    <motion.div
      className="absolute hidden xl:flex items-center pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        translateX: pos.x,
        translateY: pos.y,
        x: springPx,
        y: springPy,
      }}
      initial={{ opacity: 0, scale: 0.2, rotate: -30 }}
      animate={{ opacity: 1, scale: 1, rotate: pos.rot }}
      transition={{
        opacity: { duration: 0.5, delay: 0.85 + index * 0.07, ease: "easeOut" },
        scale: { duration: 0.55, delay: 0.85 + index * 0.07, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 0.65, delay: 0.85 + index * 0.07, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <motion.div
        className="relative flex items-center gap-1.5 px-4 py-2 rounded-full glass-card select-none cursor-default"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 5 + (index % 3) * 0.8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: index * 0.4,
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: pill.color, boxShadow: `0 0 5px ${pill.color}` }}
        />
        <Icon color={pill.color} />
        <span
          className="text-[11px] font-semibold tracking-wide whitespace-nowrap"
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

  const spotX = useTransform(useMotionValue(mousePos.x), [-1, 1], ["-12%", "12%"])
  const spotY = useTransform(useMotionValue(mousePos.y), [-1, 1], ["-12%", "12%"])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: spotX, y: spotY }}>
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 600px 400px at 50% 50%, hsl(200, 100%, 60%) / 0.08, transparent)" }}
        />
      </motion.div>

      {/* Skill pills — arc row above hero */}
      {mounted && (
        <div className="absolute inset-0" aria-hidden="true">
          {skillPills.map((pill, i) => (
            <SkillPill
              key={pill.label}
              pill={pill}
              index={i}
              mouseX={mousePos.x}
              mouseY={mousePos.y}
            />
          ))}
        </div>
      )}

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
