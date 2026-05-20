import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Database, GitBranch, Github, Mail, Server, ShieldCheck } from "lucide-react"
import heroPlate from "@/assets/hero.png"
import { Button } from "@/components/ui"
import { profile } from "@/data/profile"
import { projects } from "@/data/projects"

const getReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const systemSignals = [
  { icon: Server, label: "API", value: "Typed contracts" },
  { icon: Database, label: "Data", value: "Prisma, SQL, Redis" },
  { icon: GitBranch, label: "Runtime", value: "Workers and queues" },
  { icon: ShieldCheck, label: "Proof", value: "Smokeable flows" },
]

function OperationsPanel({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <motion.aside
      className="technical-panel overflow-hidden rounded-[2rem] p-5 md:p-6"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Operational systems overview"
    >
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mono-label" style={{ color: "var(--dim)" }}>
              Current focus
            </p>
            <h2 className="mt-2 max-w-sm text-2xl font-bold leading-tight">
              Systems that keep their promises under real state.
            </h2>
          </div>
          <img
            src={heroPlate}
            alt=""
            className="hidden h-20 w-20 object-contain opacity-80 sm:block"
            loading="eager"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {systemSignals.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                className="rounded-2xl border p-3.5"
                style={{
                  borderColor: "var(--line)",
                  background: "color-mix(in oklch, var(--surface) 72%, transparent)",
                }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 + index * 0.06 }}
              >
                <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} strokeWidth={1.8} />
                <p className="mt-3 mono-label" style={{ color: "var(--accent)" }}>
                  {item.label}
                </p>
                <p className="mt-1 text-sm leading-5" style={{ color: "var(--muted)" }}>
                  {item.value}
                </p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border px-3 py-1.5 font-mono text-xs font-semibold"
              style={{
                borderColor: `color-mix(in oklch, ${project.color} 28%, transparent)`,
                background: `color-mix(in oklch, ${project.color} 8%, transparent)`,
                color: project.color,
              }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.42, delay: 0.58 + index * 0.06 }}
              whileHover={prefersReduced ? undefined : { x: 3 }}
            >
              {project.title}
            </motion.a>
          ))}
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
            Backend-heavy systems with frontends that tell the truth.
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 md:text-lg"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.26 }}
          >
            <Button href="#projects" size="lg">
              View systems
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button href={profile.contact.github} variant="secondary" size="lg" external>
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button href={`mailto:${profile.contact.email}`} variant="ghost" size="lg">
              <Mail className="h-4 w-4" />
              Contact
            </Button>
          </motion.div>

        </div>

        <div className="hidden lg:block">
          <OperationsPanel prefersReduced={prefersReduced} />
        </div>
      </div>

      <a
        href="#projects"
        className="focus-ring absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full px-3 py-2"
        style={{ color: "var(--dim)" }}
      >
        <span className="mono-label" style={{ color: "var(--accent)" }}>01</span>
        <span className="h-px w-10 hairline" />
        <span className="mono-label">Selected Systems</span>
      </a>
    </section>
  )
}
