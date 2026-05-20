import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle2, Github } from "lucide-react"
import { Container, SectionHeader } from "@/components/layout"
import { TechPill } from "@/components/ui"
import { projects, type Project } from "@/data/projects"

function MiniSystemVisual({ project }: { project: Project }) {
  const nodeMap = new Map(project.system.nodes.map((node) => [node.id, node]))

  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[1.75rem] border p-4" style={{ borderColor: "var(--line)" }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklch, var(--surface-strong) 70%, transparent), color-mix(in oklch, var(--surface) 78%, transparent))",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {project.system.connections.map(([fromId, toId]) => {
          const from = nodeMap.get(fromId)
          const to = nodeMap.get(toId)
          if (!from || !to) return null
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={project.color}
              strokeWidth="0.28"
              strokeOpacity="0.34"
              strokeDasharray="2 3"
            />
          )
        })}
      </svg>

      <div className="relative h-[270px]">
        {project.system.nodes.map((node, index) => {
          const isPrimary = node.kind === "primary"
          return (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.045 }}
            >
              <div
                className="rounded-full border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]"
                style={{
                  background: `color-mix(in oklch, ${project.color} ${isPrimary ? 16 : 9}%, var(--surface))`,
                  borderColor: `color-mix(in oklch, ${project.color} ${isPrimary ? 45 : 24}%, transparent)`,
                  color: project.color,
                }}
              >
                {node.label}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="relative flex flex-wrap items-center gap-2 border-t pt-4" style={{ borderColor: "var(--line)" }}>
        {project.system.layers.map((layer) => (
          <span
            key={layer}
            className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em]"
            style={{
              color: "var(--muted)",
              borderColor: "var(--line)",
              background: "color-mix(in oklch, var(--surface) 70%, transparent)",
            }}
          >
            {layer}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCase({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      className="grid gap-8 border-t py-10 md:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12"
      style={{ borderColor: "var(--line)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
    >
      <div>
        <div className="flex items-center gap-4">
          <span className="mono-label" style={{ color: project.color }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 hairline" />
        </div>

        <h3 className="mt-5 text-3xl font-bold leading-tight md:text-5xl" style={{ color: project.color }}>
          {project.title}
        </h3>
        <p className="mt-2 text-base font-semibold" style={{ color: "var(--fg)" }}>
          {project.subtitle}
        </p>
        <p className="mt-5 max-w-xl text-sm leading-7 md:text-base" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        <div className="mt-7 space-y-5">
          <div>
            <p className="mono-label" style={{ color: "var(--dim)" }}>
              Problem
            </p>
            <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
              {project.problem}
            </p>
          </div>
          <div>
            <p className="mono-label" style={{ color: "var(--dim)" }}>
              My role
            </p>
            <p className="mt-2 text-sm leading-7" style={{ color: "var(--muted)" }}>
              {project.role}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <TechPill key={tag} label={tag} color={project.color} index={tagIndex} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="action-link focus-ring px-4 py-2 text-sm font-semibold"
            style={{ color: project.color }}
          >
            <Github className="h-4 w-4" />
            Repository
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="space-y-5">
        <MiniSystemVisual project={project} />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border p-5" style={{ borderColor: "var(--line)" }}>
            <p className="mono-label" style={{ color: "var(--dim)" }}>
              Built
            </p>
            <ul className="mt-4 space-y-3">
              {project.built.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ background: project.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] border p-5" style={{ borderColor: "var(--line)" }}>
            <p className="mono-label" style={{ color: "var(--dim)" }}>
              Proof
            </p>
            <ul className="mt-4 space-y-3">
              {project.proof.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6" style={{ color: "var(--muted)" }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none" style={{ color: project.color }} strokeWidth={1.8} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="01"
          label="Selected Systems"
          title="Case studies, not thumbnails."
          intro="Each project is framed by the operational problem it tries to make less fragile: state ownership, worker truth, local runtime, and proof that a flow can survive contact with real data."
        />

        <div>
          {projects.map((project, index) => (
            <ProjectCase key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
