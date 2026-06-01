import { useEffect, useState, type PointerEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  ArrowDown,
  Brain,
  Database,
  Download,
  GitBranch,
  Github,
  Mail,
  MonitorPlay,
  Server,
  ShieldCheck,
} from "lucide-react"
import heroPlate from "@/assets/hero.png"
import { Button } from "@/components/ui"
import { profile } from "@/data/profile"

const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const systemSignals = [
  { icon: Server, label: "API", value: "Typed contracts" },
  { icon: Database, label: "Data", value: "Prisma, SQL, Redis" },
  { icon: GitBranch, label: "Runtime", value: "Workers and queues" },
  { icon: ShieldCheck, label: "Proof", value: "Smokeable flows" },
]

const heroNodes = [
  { icon: Server, label: "Node.js / FastAPI", x: 50, y: 15, accent: "var(--accent)" },
  { icon: MonitorPlay, label: "React UI", x: 30, y: 38, accent: "var(--accent-3)" },
  { icon: Database, label: "SQL / Prisma", x: 70, y: 38, accent: "var(--accent-2)" },
  { icon: Brain, label: "AI / CV", x: 34, y: 78, accent: "oklch(76% 0.1 310)" },
  { icon: ShieldCheck, label: "Smoke tests", x: 66, y: 78, accent: "var(--accent)" },
]

function RecruiterBar() {
  return (
    <motion.div
      className="mb-7 inline-flex flex-wrap items-center gap-x-5 gap-y-2 rounded-full border px-4 py-2 text-xs font-medium"
      style={{
        borderColor: "color-mix(in oklch, var(--accent) 30%, var(--line))",
        background: "color-mix(in oklch, var(--accent) 7%, transparent)",
        color: "var(--muted)",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <span style={{ color: "var(--accent)" }} className="font-semibold">Best fit:</span>
      <span>Backend Intern</span>
      <span className="opacity-40">/</span>
      <span>Full-stack Intern</span>
      <span className="opacity-40">|</span>
      <span style={{ color: "var(--accent-2)" }} className="font-semibold">Stack:</span>
      <span>React, TypeScript, Node.js, FastAPI, SQL, Docker</span>
    </motion.div>
  )
}

function QuickFacts() {
  const items = [
    { label: "Location", value: "Ho Chi Minh City, Vietnam" },
    { label: "Education", value: "HUFLIT, Software Engineering, 2023–2027" },
    { label: "IELTS", value: "6.5" },
    { label: "Status", value: "Open to internships" },
  ]
  return (
    <motion.div
      className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 border-t pt-3"
          style={{ borderColor: "var(--line)" }}
        >
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider" style={{ color: "var(--dim)" }}>
            {item.label}
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
            {item.value}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

function OperationsPanel({ prefersReduced }: { prefersReduced: boolean }) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.45 })
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.45 })
  const rotateY = useTransform(springX, [-1, 1], [-4, 4])
  const rotateX = useTransform(springY, [-1, 1], [4, -4])
  const panelX = useTransform(springX, [-1, 1], [-7, 7])
  const panelY = useTransform(springY, [-1, 1], [-5, 5])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const handlePointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.aside
      className="hero-console technical-panel overflow-hidden rounded-[2rem] p-5 md:p-6"
      onPointerMove={prefersReduced ? undefined : handlePointerMove}
      onPointerLeave={prefersReduced ? undefined : handlePointerLeave}
      style={prefersReduced ? undefined : { rotateX, rotateY, x: panelX, y: panelY }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Le Huy system map"
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mono-label" style={{ color: "var(--dim)" }}>
              Le Huy operating map
            </p>
            <h2 className="mt-2 max-w-sm text-2xl font-bold leading-tight">
              APIs, data, workers, and UI tied into one proof loop.
            </h2>
          </div>
          <img
            src={heroPlate}
            alt=""
            className="hidden h-20 w-20 object-contain opacity-80 sm:block"
            loading="eager"
          />
        </div>

        <div className="relative mt-5 h-[260px] overflow-hidden rounded-[1.5rem] border" style={{ borderColor: "var(--line)" }}>
          <div className="hero-map-grid absolute inset-0" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <motion.circle
              cx="50"
              cy="50"
              r="23"
              fill="none"
              stroke="var(--line-strong)"
              strokeWidth="0.34"
              strokeDasharray="2.2 2.8"
              animate={prefersReduced ? undefined : { rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50% 50%" }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="color-mix(in oklch, var(--accent-3) 38%, transparent)"
              strokeWidth="0.22"
              strokeDasharray="1.5 5"
              animate={prefersReduced ? undefined : { rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50% 50%" }}
            />
            {heroNodes.map((node, index) => (
              <motion.line
                key={node.label}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke={node.accent}
                strokeWidth="0.32"
                strokeOpacity="0.36"
                strokeDasharray="2 3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.72, delay: 0.44 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center"
            style={{
              borderColor: "color-mix(in oklch, var(--accent) 42%, transparent)",
              background: "color-mix(in oklch, var(--surface-strong) 92%, transparent)",
              boxShadow: "0 18px 50px oklch(6% 0.02 250 / 0.28)",
            }}
            animate={prefersReduced ? undefined : { scale: [1, 1.035, 1] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
              Le Huy
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--dim)" }}>
              Full-stack
            </span>
          </motion.div>

          {heroNodes.map((node, index) => {
            const Icon = node.icon
            return (
              <motion.div
                key={node.label}
                className="hero-node absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  borderColor: `color-mix(in oklch, ${node.accent} 38%, transparent)`,
                  background: `color-mix(in oklch, ${node.accent} 10%, var(--surface))`,
                  color: node.accent,
                }}
                initial={{ opacity: 0, scale: 0.86, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.46, delay: 0.58 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                <span className="whitespace-nowrap font-mono text-[10px] font-bold uppercase tracking-[0.08em]">
                  {node.label}
                </span>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {systemSignals.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                className="rounded-2xl border p-3"
                style={{
                  borderColor: "var(--line)",
                  background: "color-mix(in oklch, var(--surface) 72%, transparent)",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 + index * 0.06 }}
              >
                <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} strokeWidth={1.8} />
                <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--accent)" }}>
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] leading-4" style={{ color: "var(--muted)" }}>
                  {item.value}
                </p>
            </motion.div>
          )
          })}
        </div>
      </div>
    </motion.aside>
  )
}

export function CoreHeroSection() {
  const [mounted, setMounted] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(getReducedMotion)

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 40)
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mq.addEventListener("change", handler)
    return () => {
      window.clearTimeout(id)
      mq.removeEventListener("change", handler)
    }
  }, [])

  return (
    <section className="relative flex min-h-[86dvh] items-center overflow-hidden pb-10 pt-24 md:pt-28">
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 sm:px-6 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.42 }}
          >
            <span className="status-marker" aria-hidden="true" />
            <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
              {profile.availability.text}
            </p>
          </motion.div>

          <motion.h1
            className="mt-7 max-w-4xl text-[2.6rem] font-bold leading-[1] text-balance sm:text-5xl md:text-6xl"
            style={{ color: "var(--fg)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.hero.headline}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 md:text-lg"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            {profile.hero.summary}
          </motion.p>

          {/* Recruiter summary bar */}
          <RecruiterBar />

          {/* CTA Buttons */}
          <motion.div
            className="mt-7 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.26 }}
          >
            <Button href="#projects" size="lg">
              View Projects
              <ArrowDown className="h-4 w-4" />
            </Button>
            <a
              href="/Le_Huy_CV.pdf"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--accent)_50%,var(--line))] bg-[color-mix(in_oklch,var(--accent)_12%,transparent)] px-6 py-3 text-base font-semibold text-[var(--accent)] transition-colors hover:border-[color-mix(in_oklch,var(--accent)_70%,var(--line))]"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <Button href={profile.contact.github} variant="secondary" size="lg" external>
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button href={`mailto:${profile.contact.email}`} variant="ghost" size="lg">
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </motion.div>

          {/* Quick facts */}
          <QuickFacts />
        </div>

        <div className="hidden lg:block">
          <OperationsPanel prefersReduced={prefersReduced} />
        </div>
      </div>

      <a
        href="#projects"
        className="focus-ring absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full px-3 py-2 md:flex"
        style={{ color: "var(--dim)" }}
      >
        <span className="mono-label" style={{ color: "var(--accent)" }}>01</span>
        <span className="h-px w-10 hairline" />
        <span className="mono-label">Selected Systems</span>
      </a>
    </section>
  )
}
