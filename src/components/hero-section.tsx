import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Github, Mail } from "lucide-react"
import { easeOutExpo } from "@/lib/animations"

/* ── SVG Tech Icons ──────────────────────────────────────────────── */
function TsIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill={color} fillOpacity="0.12" />
      <path d="M13.5 2L11 4.5H17L13.5 2Z" fill={color} />
      <path d="M11 23.5L13.5 21H17L13.5 23.5H11Z" fill={color} />
      <path d="M11 4.5V19L13.5 21.5M11 4.5H17V10.5H13M17 4.5V13.5L17 17.5H13M13 13.5L11 19L17 21.5V14.5H13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ReactIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill={color} fillOpacity="0.12" />
      <circle cx="14" cy="14" r="2.5" stroke={color} strokeWidth="1.5" />
      <ellipse cx="14" cy="14" rx="8.5" ry="4" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
      <ellipse cx="14" cy="14" rx="8.5" ry="4" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" transform="rotate(60 14 14)" />
      <ellipse cx="14" cy="14" rx="8.5" ry="4" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" transform="rotate(120 14 14)" />
    </svg>
  )
}

function PythonIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill={color} fillOpacity="0.12" />
      <path d="M13.5 3C9 3 8 5 8 7V9H14V10.5H5.5C4.5 10.5 3 11 3 13.5V15.5C3 18 4.5 18.5 5.5 18.5H8V22.5C8 25 10 26.5 13 26.5C15.5 26.5 17 25.5 18 24H18.5C18.5 24 18.5 25.5 20.5 25.5C22 25.5 23.5 24 23.5 22V12C23.5 9.5 21.5 8 20 8L21 4C21 4 19 3 17 3H13.5Z" fill={color} fillOpacity="0.3" />
      <path d="M13.5 3C17 3 18 5 18 7V9H12V10.5H20.5C21.5 10.5 23 11 23 13.5V15.5C23 18 21.5 18.5 20.5 18.5H18V22.5C18 25 16 26.5 13 26.5C10.5 26.5 9 25.5 8 24H7.5C7.5 24 7.5 25.5 5.5 25.5C4 25.5 2.5 24 2.5 22V12C2.5 9.5 4.5 8 6 8L5 4C5 4 7 3 9 3H13.5Z" fill={color} />
    </svg>
  )
}

function NodeIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill={color} fillOpacity="0.12" />
      <path d="M21.5 16.5C21.8 17.3 21.5 18 20.5 18.5C18.5 19.5 17.5 18 17.2 17.5L16 18.5C16.3 19 17.5 20.5 20 19.5C22 18.7 22.5 17.5 22.2 16.5C21.9 15.5 20.5 15 19 15.3L18 15.5C17.8 15.5 17.6 15.6 17.5 15.7C17.3 15.9 17.2 16 17.2 16.3C17.2 16.6 17.4 16.8 17.7 17C18.5 17.5 19.5 18 20.5 17.7C21.2 17.5 21.5 17 21.3 16.5C21.1 16 20 15.7 19 15.8L18.5 15.9C17.9 16 17.4 16.2 17 16.4C16.5 16.6 16.2 16.8 16 17.1C15.7 17.5 15.7 18 16 18.5C16.3 19 17 19.2 17.7 19.5C18.3 19.7 18.9 20 19.5 20.2C20.3 20.4 20.8 20.7 21.1 21C21.6 21.5 21.8 22.3 21.5 23C21.2 23.8 20.5 24 19.5 24C18.7 24 18 23.5 17.5 23L16.5 24C17.2 24.5 18 25 19 25C20.5 25 21.5 24 22 23C22.5 22 22.2 21 21.5 20.5C21 20.1 20.3 20 19.7 20L20.2 19.8C20.8 19.6 21.4 19.2 21.8 18.7C22.2 18.2 22.3 17.6 22.1 17C21.9 16.4 21.3 16 20.6 15.7C19.8 15.3 19 15.3 18.3 15.5L19 15.3C19.8 15 20.7 15.2 21.5 15.8V16.5Z" fill={color} />
      <path d="M10.5 11.5C10.2 10.7 10.5 10 11.5 9.5C13.5 8.5 14.5 10 14.8 10.5L16 9.5C15.7 9 14.5 7.5 12 8.5C10 9.3 9.5 10.5 9.8 11.5C10.1 12.5 11.5 13 13 12.7L14 12.5C14.2 12.5 14.4 12.4 14.5 12.3C14.7 12.1 14.8 12 14.8 11.7C14.8 11.4 14.6 11.2 14.3 11C13.5 10.5 12.5 10 11.5 10.3C10.8 10.5 10.5 11 10.7 11.5C10.9 12 12 12.3 13 12.2L13.5 12.1C14.1 12 14.6 11.8 15 11.6C15.5 11.4 15.8 11.2 16 10.9C16.3 10.5 16.3 10 16 9.5C15.7 9 15 8.8 14.3 8.5C13.7 8.3 13.1 8 12.5 7.8C11.7 7.6 11.2 7.3 10.9 7C10.4 6.5 10.2 5.7 10.5 5C10.8 4.2 11.5 4 12.5 4C13.3 4 14 4.5 14.5 5L15.5 4C14.8 3.5 14 3 13 3C11.5 3 10.5 4 10 5C9.5 6 9.8 7 10.5 7.5C11 7.9 11.7 8 12.3 8L11.8 8.2C11.2 8.4 10.6 8.8 10.2 9.3C9.8 9.8 9.7 10.4 9.9 11C10.1 11.6 10.7 12 11.4 12.3C12.2 12.7 13 12.7 13.7 12.5L13 12.7C12.2 13 11.3 12.8 10.5 12.2V11.5Z" fill={color} />
    </svg>
  )
}

function DockerIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill={color} fillOpacity="0.12" />
      <path d="M14 3C8 3 5.5 5 5 7H14V3Z" fill={color} fillOpacity="0.4" />
      <path d="M5 7.5C4 8.5 3 10.5 3 14C3 17.5 4 19.5 5 20.5V24H23V20.5C24 19.5 25 17.5 25 14C25 10.5 24 8.5 23 7.5V14H17V7.5C16 8.5 15 10.5 15 14H9C9 10.5 8 8.5 7 7.5V14H5.5V7.5C5.5 7.5 5.5 7.5 5 7.5Z" fill={color} fillOpacity="0.3" />
      <path d="M5 7H14V9H5V7ZM5 10.5H14V12.5H5V10.5Z" fill={color} />
      <circle cx="18.5" cy="18" r="1.5" fill={color} />
      <path d="M22 18.5C22.5 19.5 22.5 20 22 20.5H23.5C24.5 19.5 25 18.5 25 17C25 15.5 24.5 14.5 23.5 14L22 17.5V14H20V18C20 19.5 21 19.5 22 18.5Z" fill={color} />
    </svg>
  )
}

function PostgresIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill={color} fillOpacity="0.12" />
      <ellipse cx="14" cy="9" rx="5.5" ry="2.5" stroke={color} strokeWidth="1.5" />
      <path d="M8.5 9V15C8.5 18 11 20 14 20C17 20 19.5 18 19.5 15V9" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 12.5C8.5 15.5 11 17.5 14 17.5C17 17.5 19.5 15.5 19.5 12.5" stroke={color} strokeWidth="1.5" />
      <path d="M11 9C10 10 8.5 11.5 8.5 14M17 9C18 10 19.5 11.5 19.5 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FastApiIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill={color} fillOpacity="0.12" />
      <path d="M6 20L10 8H14L11 14H14L10 20H6Z" fill={color} />
      <path d="M14 8H18L14 20H10L14 14H11L14 8Z" fill={color} fillOpacity="0.5" />
      <path d="M18 8H22L18 20H14L18 14H21L18 8Z" fill={color} fillOpacity="0.25" />
    </svg>
  )
}

function AIMLIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill={color} fillOpacity="0.12" />
      <circle cx="14" cy="14" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M14 5V8M14 20V23M5 14H8M20 14H23M7.9 7.9L9.8 9.8M18.2 18.2L20.1 20.1M20.1 7.9L18.2 9.8M9.8 18.2L7.9 20.1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="14" r="0.75" fill={color} />
    </svg>
  )
}

/* ── Skill tile data ─────────────────────────────────────────────── */
const skillTiles = [
  { label: "TypeScript", color: "#60A5FA", Icon: TsIcon },
  { label: "React", color: "#67E8F9", Icon: ReactIcon },
  { label: "Python", color: "#A78BFA", Icon: PythonIcon },
  { label: "Node.js", color: "#4ADE80", Icon: NodeIcon },
  { label: "Docker", color: "#38BDF8", Icon: DockerIcon },
  { label: "PostgreSQL", color: "#F472B6", Icon: PostgresIcon },
  { label: "FastAPI", color: "#34D399", Icon: FastApiIcon },
  { label: "AI / ML", color: "#FB923C", Icon: AIMLIcon },
]

/* Float animation variants per tile — 8 distinct trajectories */
const floatVariants = [
  { y: [-8, 8, -8], rotate: [-2, 2, -2] },
  { y: [8, -8, 8], rotate: [2, -2, 2] },
  { y: [-5, 10, -5], rotate: [1, -1, 1] },
  { y: [10, -5, 10], rotate: [-1.5, 1.5, -1.5] },
  { y: [-10, 5, -10], rotate: [-3, 1, -3] },
  { y: [5, -10, 5], rotate: [1.5, -3, 1.5] },
  { y: [-6, 6, -6], rotate: [2.5, -1.5, 2.5] },
  { y: [6, -6, 6], rotate: [-2.5, 1.5, -2.5] },
]

/* ── Individual Skill Tile ───────────────────────────────────────── */
function SkillTile({
  tile,
  index,
  mouseX,
  mouseY,
}: {
  tile: (typeof skillTiles)[0]
  index: number
  mouseX: number
  mouseY: number
}) {
  const Icon = tile.Icon
  const delay = index * 0.15
  const variant = floatVariants[index % floatVariants.length]
  const duration = 5 + (index % 3) * 1.5

  /* Mouse parallax — each tile gets a different parallax multiplier */
  const parallaxMultiplier = 0.3 + (index % 4) * 0.1

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const springPx = useSpring(px, { stiffness: 40, damping: 12 })
  const springPy = useSpring(py, { stiffness: 40, damping: 12 })

  /* Update spring targets when mouse moves */
  useEffect(() => {
    px.set(mouseX * parallaxMultiplier * 20)
    py.set(mouseY * parallaxMultiplier * 12)
  }, [mouseX, mouseY, px, py, parallaxMultiplier])

  return (
    <motion.div
      className="absolute hidden xl:flex items-center pointer-events-none"
      style={{ x: springPx, y: springPy }}
      initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        opacity: { duration: 0.7, delay, ease: easeOutExpo as unknown as string },
        scale: { duration: 0.7, delay, ease: easeOutExpo as unknown as string },
        rotate: { duration: 0.7, delay, ease: easeOutExpo as unknown as string },
      }}
    >
      <motion.div
        className="glass-card relative flex flex-col items-center justify-center rounded-2xl cursor-default select-none group"
        style={{ width: 72, height: 72, gap: 0 }}
        animate={variant}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay,
        }}
      >
        {/* Inner icon area */}
        <div className="flex items-center justify-center flex-1">
          <Icon color={tile.color} />
        </div>

        {/* Label */}
        <span
          className="text-[9px] font-bold tracking-wide pb-1.5 transition-opacity duration-200"
          style={{ color: tile.color, opacity: 0.75 }}
        >
          {tile.label}
        </span>

        {/* Animated top border accent */}
        <motion.div
          className="absolute top-0 left-3 right-3 h-px rounded-full"
          style={{ background: tile.color }}
          animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
        />
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

/* ── Tile positions — viewport-relative, won't overlap hero text ── */
const tileLayout = [
  { x: "-42%", y: "-48%" },  //  TypeScript — upper-left
  { x: "38%",  y: "-52%" },  //  React     — upper-right
  { x: "-46%", y: "0%"   },  //  Python    — left-center
  { x: "42%",  y: "0%"   },  //  Node.js   — right-center
  { x: "-38%", y: "48%"  },  //  Docker    — lower-left
  { x: "40%",  y: "48%"  },  //  PostgreSQL— lower-right
  { x: "-20%", y: "36%"  },  //  FastAPI   — mid-left
  { x: "22%",  y: "36%"  },  //  AI / ML   — mid-right
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
      /* Normalize to [-1, 1] range */
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
      {/* Spotlight — moves with mouse */}
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

      {/* Skill tiles layer — absolutely positioned around hero */}
      <div className="absolute inset-0" aria-hidden="true">
        {mounted &&
          skillTiles.map((tile, i) => (
            <div
              key={tile.label}
              className="absolute"
              style={{
                left: tileLayout[i].x,
                top: tileLayout[i].y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <SkillTile tile={tile} index={i} mouseX={mousePos.x} mouseY={mousePos.y} />
            </div>
          ))}
      </div>

      {/* Main content — centered, z-10 above tiles */}
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
