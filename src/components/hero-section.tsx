import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Github, Mail } from "lucide-react"
import { easeOutExpo } from "@/lib/animations"

/* ── SVG Tech Icons — 20px line style ────────────────────────────── */
function TsIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 1L7.5 3H12.5L10 1Z" fill={color} />
      <path d="M7.5 18L10 16H12.5L7.5 18Z" fill={color} />
      <path d="M7.5 3V13L10 16M7.5 3H12.5V7.5H10M12.5 3V12.5L12.5 16H10M10 12.5L7.5 16L12.5 16V12.5H10.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ReactIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2" stroke={color} strokeWidth="1.2" />
      <ellipse cx="10" cy="10" rx="7" ry="3" stroke={color} strokeWidth="1.2" strokeDasharray="2.5 1.5" />
      <ellipse cx="10" cy="10" rx="7" ry="3" stroke={color} strokeWidth="1.2" strokeDasharray="2.5 1.5" transform="rotate(60 10 10)" />
      <ellipse cx="10" cy="10" rx="7" ry="3" stroke={color} strokeWidth="1.2" strokeDasharray="2.5 1.5" transform="rotate(120 10 10)" />
    </svg>
  )
}

function PythonIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 1.5C7 1.5 5.5 2.5 5.5 4V5.5H10.5V6.5H4C3 6.5 2 7 2 9V10C2 12 3.5 12.5 4.5 12.5H5.5V17C5.5 18.5 7.5 19.5 10 19.5C12 19.5 13.5 18.5 14 17H14.5C14.5 17 14.5 18.5 16 18.5C17.5 18.5 18.5 17.5 18.5 16V9C18.5 7.5 17.5 6.5 16.5 6.5L17 4C17 4 15 3 13 3H10Z" fill={color} fillOpacity="0.35" />
      <path d="M10 1.5C13 1.5 14.5 2.5 14.5 4V5.5H9.5V6.5H15.5C16.5 6.5 17.5 7 17.5 9V10C17.5 12 16 12.5 15 12.5H14.5V17C14.5 18.5 12.5 19.5 10 19.5C8 19.5 6.5 18.5 6 17H5.5C5.5 17 5.5 18.5 4 18.5C2.5 18.5 1.5 17.5 1.5 16V9C1.5 7.5 2.5 6.5 3.5 6.5L3 4C3 4 5 3 7 3H10Z" fill={color} />
    </svg>
  )
}

function NodeIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12 9C12.3 9.6 12 10.3 11.3 10.6C9.8 11.3 9 10.3 8.8 9.9L8 10.4C8.2 10.7 9 12 10.7 11.6C12.2 11.1 12.6 10.3 12.4 9.8C12.2 9.3 11.3 9 10.3 9.2L9.8 9.3C9.7 9.3 9.6 9.35 9.5 9.4C9.4 9.5 9.3 9.55 9.3 9.7C9.3 9.85 9.5 10 9.7 10.1C10.4 10.5 11 10.8 11.6 10.6C12.1 10.4 12.3 10.1 12.1 9.7C11.9 9.3 11.1 9.1 10.6 9.2L10.3 9.25C9.8 9.3 9.4 9.4 9.1 9.6C8.8 9.8 8.6 9.9 8.5 10.1C8.3 10.4 8.3 10.7 8.5 11.1C8.7 11.4 9.2 11.5 9.6 11.8C10 12 10.4 12.2 10.8 12.3C11.5 12.5 11.8 12.7 12 12.8C12.3 13.1 12.5 13.5 12.3 13.9C12.1 14.4 11.5 14.5 11 14.5C10.5 14.5 10 14.2 9.7 13.9L9 14.5C9.6 14.8 10.2 15.1 11 15.1C12 15.1 12.8 14.5 13.1 13.9C13.4 13.3 13.2 12.7 12.8 12.4C12.5 12.1 12.1 12 11.7 12L12.2 11.9C12.7 11.7 13.2 11.5 13.4 11.2C13.6 10.9 13.7 10.5 13.5 10.1C13.3 9.7 12.9 9.4 12.5 9.2C12 9 11.5 9 11.1 9.1L11.7 9C12.2 8.8 12.7 8.9 13.2 9.3V9.2Z" fill={color} />
      <path d="M6.5 7C6.3 6.4 6.5 5.7 7.2 5.4C8.7 4.7 9.5 5.7 9.7 6.1L10.5 5.6C10.3 5.3 9.5 4 7.8 4.4C6.3 4.9 5.9 5.7 6.1 6.2C6.3 6.7 7.2 7 8.2 6.8L8.7 6.7C8.8 6.7 8.9 6.65 9 6.6C9.1 6.5 9.2 6.45 9.2 6.3C9.2 6.15 9 6 8.8 5.9C8.1 5.5 7.5 5.2 6.9 5.4C6.4 5.6 6.2 5.9 6.4 6.3C6.6 6.7 7.4 6.9 7.9 6.8L8.2 6.75C8.7 6.7 9.1 6.6 9.4 6.4C9.7 6.2 9.9 6.1 10 5.9C10.2 5.6 10.2 5.3 10 4.9C9.8 4.6 9.3 4.5 8.9 4.2C8.5 4 8.1 3.8 7.7 3.7C7 3.5 6.7 3.3 6.5 3.2C6.2 2.9 6 2.5 6.2 2.1C6.4 1.6 7 1.5 7.5 1.5C8 1.5 8.5 1.8 8.8 2.1L9.5 1.5C9 1.2 8.4 0.9 7.6 0.9C6.6 0.9 5.8 1.5 5.5 2.1C5.2 2.7 5.4 3.3 5.8 3.6C6.1 3.9 6.5 4 6.9 4L6.4 4.1C5.9 4.3 5.4 4.5 5.2 4.8C5 5.1 4.9 5.5 5.1 5.9C5.3 6.3 5.7 6.6 6.1 6.8C6.6 7 7.1 7 7.5 6.9L6.9 7C6.4 7.2 5.9 7.1 5.4 6.7V6.8Z" fill={color} />
    </svg>
  )
}

function DockerIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="18" height="18" rx="4" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <path d="M10 2C7 2 5 3.5 5 5H10V2Z" fill={color} fillOpacity="0.6" />
      <path d="M5 5.5C4 6.5 3 8 3 10C3 12.5 4 14 5 14.5V18H15V14.5C16 14 17 12.5 17 10C17 8 16 6.5 15 5.5V10H12V5.5C11 6.5 10 8 10 10H7C7 8 6 6.5 5 5.5V10H5.5V5.5C5.5 5.5 5.5 5.5 5 5.5Z" fill={color} fillOpacity="0.4" />
      <path d="M5 5H10V7H5V5ZM5 8H10V10H5V8Z" fill={color} />
    </svg>
  )
}

function PostgresIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="6.5" rx="4.5" ry="2" stroke={color} strokeWidth="1.2" />
      <path d="M5.5 6.5V11C5.5 13.5 7.5 15 10 15C12.5 15 14.5 13.5 14.5 11V6.5" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5.5 9C5.5 11.5 7.5 13 10 13C12.5 13 14.5 11.5 14.5 9" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
      <path d="M7.5 6.5C6.5 7.5 5 9 5 11M12.5 6.5C13.5 7.5 15 9 15 11" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
    </svg>
  )
}

function FastApiIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 15L8 5H12L9.5 10.5H12L8 15H4Z" fill={color} />
      <path d="M12 5H16L12 15H8L12 10.5H9.5L12 5Z" fill={color} fillOpacity="0.5" />
    </svg>
  )
}

function AIMLIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2.5" stroke={color} strokeWidth="1.2" />
      <path d="M10 4V6.5M10 13.5V16M4 10H6.5M13.5 10H16M5.8 5.8L7.6 7.6M12.4 12.4L14.2 14.2M14.2 5.8L12.4 7.6M7.6 12.4L5.8 14.2" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="10" cy="10" r="0.8" fill={color} />
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

/* ── Arc positions around hero — clear of Le Huy text ──────────────── */
/*
  Hero name ~11rem (~176px tall), centered at 50% y.
  Subtitle below name. Tagline + CTAs below that.
  Pills positioned: x = ±390px–480px from center, y = -160px to +100px.
  All positions avoid the name's bounding box.
*/
const pillLayout = [
  { x: -420, y: -160, rot: -8  },  // TypeScript  — far upper-left
  { x:  420, y: -160, rot:  8  },  // React      — far upper-right
  { x: -470, y:  -30, rot: -5  },  // Python     — left-upper
  { x:  470, y:  -30, rot:  5  },  // Node.js    — right-upper
  { x: -450, y:   90, rot: -3  },  // Docker     — left-lower
  { x:  450, y:   90, rot:  3  },  // PostgreSQL — right-lower
  { x: -300, y: -190, rot: -6  },  // FastAPI    — upper-mid-left
  { x:  300, y: -190, rot:  6  },  // AI / ML    — upper-mid-right
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
  const depth = 0.18 + (index % 3) * 0.08

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const springPx = useSpring(px, { stiffness: 40, damping: 14 })
  const springPy = useSpring(py, { stiffness: 40, damping: 14 })

  useEffect(() => {
    px.set(mouseX * depth * 20)
    py.set(mouseY * depth * 14)
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
      initial={{
        opacity: 0,
        scale: 0.3,
        rotate: pos.rot - 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: pos.rot,
      }}
      transition={{
        opacity: { duration: 0.5, delay: 0.9 + index * 0.08, ease: "easeOut" },
        scale: { duration: 0.6, delay: 0.9 + index * 0.08, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 0.7, delay: 0.9 + index * 0.08, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Floating pill with subtle Y oscillation */}
      <motion.div
        className="relative flex items-center gap-2 px-4 py-2.5 rounded-full glass-card select-none cursor-default"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: index * 0.3,
        }}
      >
        {/* Pulsing glow dot */}
        <motion.div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: pill.color, boxShadow: `0 0 6px ${pill.color}` }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.85, 1, 0.85] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.25 }}
        />
        <Icon color={pill.color} />
        <span
          className="text-xs font-bold tracking-wide whitespace-nowrap"
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
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: spotX, y: spotY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 600px 400px at 50% 50%, hsl(200, 100%, 60%) / 0.08, transparent)",
          }}
        />
      </motion.div>

      {/* Skill pills layer — explode outward from center */}
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

      {/* Main content — z-10 above pills */}
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
