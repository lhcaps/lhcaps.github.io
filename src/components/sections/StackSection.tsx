import { motion } from "framer-motion"
import { Brain, Cpu, Database, MonitorPlay, Zap } from "lucide-react"
import { Container, SectionHeader } from "@/components/layout"
import { stackLayers, type StackLayer } from "@/data/stack"

const LAYER_ICON_MAP: Record<StackLayer["icon"], React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>> = {
  frontend: MonitorPlay,
  api: Zap,
  data: Database,
  workers: Cpu,
  ai: Brain,
}

function StackLayerRow({ layer, index }: { layer: StackLayer; index: number }) {
  const Icon = LAYER_ICON_MAP[layer.icon]

  return (
    <motion.div
      className="grid gap-5 border-t py-7 md:grid-cols-[180px_1fr] md:gap-8"
      style={{ borderColor: "var(--line)" }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 md:items-start">
        <div
          className="grid h-11 w-11 flex-none place-items-center rounded-2xl border"
          style={{
            borderColor: `color-mix(in oklch, ${layer.accent} 36%, transparent)`,
            background: `color-mix(in oklch, ${layer.accent} 10%, var(--surface))`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color: layer.accent }} strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-lg font-bold" style={{ color: "var(--fg)" }}>
            {layer.label}
          </p>
          <p className="mono-label mt-1" style={{ color: layer.accent }}>
            {layer.tag}
          </p>
        </div>
      </div>

      <div>
        <p className="max-w-2xl text-sm leading-7 md:text-base" style={{ color: "var(--muted)" }}>
          {layer.purpose}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {layer.primary.map((item) => (
            <span
              key={item}
              className="rounded-full border px-3 py-1.5 font-mono text-xs font-semibold"
              style={{
                color: layer.accent,
                borderColor: `color-mix(in oklch, ${layer.accent} 26%, transparent)`,
                background: `color-mix(in oklch, ${layer.accent} 8%, transparent)`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
        {layer.supporting && (
          <p className="mt-4 text-xs font-mono leading-6" style={{ color: "var(--dim)" }}>
            Supporting: {layer.supporting.join(", ")}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export function StackSection() {
  return (
    <section id="stack" className="relative py-20 md:py-28 lg:py-32">
      <Container>
        <SectionHeader
          number="02"
          label="Stack"
          title="Core stack for backend-heavy full-stack work."
          intro="Recruiter summary: React, TypeScript, Node.js, FastAPI, SQL (Prisma / MariaDB), Redis, BullMQ, Docker, Playwright. Organized so each layer maps to a runtime concern, not just a list of tools."
        />

        <div className="rounded-[2rem] border px-5 md:px-7" style={{ borderColor: "var(--line)" }}>
          {stackLayers.map((layer, index) => (
            <StackLayerRow key={layer.label} layer={layer} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
