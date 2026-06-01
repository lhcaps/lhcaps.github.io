import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle2, Github, Play } from "lucide-react"
import { LazyRuntimeScene } from "@/components/scene"
import { systemScenes } from "@/data/runtimeConfig"
import { projects } from "@/data/systems"
import { useReducedMotion } from "@/hooks"

export function SystemsSection() {
  const [activeProject, setActiveProject] = useState<string>("parkly")
  const reducedMotion = useReducedMotion()

  const currentScene = systemScenes[activeProject as keyof typeof systemScenes] ?? systemScenes.core

  return (
    <section id="systems" className="relative py-20 md:py-28 lg:py-36">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-6 md:px-8">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-4">
            <span className="mono-label" style={{ color: "var(--accent)" }}>01</span>
            <div className="h-px w-10 hairline" />
            <span className="mono-label" style={{ color: "var(--dim)" }}>Systems</span>
          </div>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight md:text-5xl" style={{ color: "var(--fg)", fontFamily: "var(--font-heading)" }}>
            Three systems, three runtime topologies.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 md:text-base" style={{ color: "var(--muted)" }}>
            Each project is a distinct topology. Hover or click to shift the runtime map.
          </p>
        </motion.div>

        {/* Main content: 3D scene + project list */}
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
          {/* Left: 3D scene */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="runtime-scene" style={{ height: "min(52vh, 520px)" }}>
              <LazyRuntimeScene
                scene={currentScene}
                reducedMotion={reducedMotion}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="mono-label" style={{ color: "var(--dim)" }}>
                {currentScene.tagline}
              </p>
            </div>
          </motion.div>

          {/* Right: Project cards */}
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-card focus-ring group relative cursor-pointer overflow-hidden rounded-[1.75rem] border p-5"
                style={{
                  borderColor: activeProject === project.id
                    ? `color-mix(in oklch, ${project.color} 50%, transparent)`
                    : "var(--line)",
                  background: activeProject === project.id
                    ? `color-mix(in oklch, ${project.color} 6%, var(--surface))`
                    : "var(--surface)",
                }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.07 }}
                onClick={() => setActiveProject(project.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="mono-label" style={{ color: project.color }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-bold" style={{ color: project.color, fontFamily: "var(--font-heading)" }}>
                        {project.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm font-medium" style={{ color: "var(--fg)" }}>
                      {project.subtitle}
                    </p>
                  </div>
                  <span
                    className="grid h-8 w-8 flex-none place-items-center rounded-full border text-xs font-bold"
                    style={{
                      borderColor: `color-mix(in oklch, ${project.color} 40%, transparent)`,
                      background: `color-mix(in oklch, ${project.color} 12%, transparent)`,
                      color: project.color,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {activeProject === project.id && (
                  <motion.div
                    className="mt-4 space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
                      {project.description}
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="mono-label mb-2" style={{ color: "var(--dim)" }}>Built</p>
                        <ul className="space-y-1.5">
                          {project.built.map((item) => (
                            <li key={item} className="flex gap-2 text-xs leading-5" style={{ color: "var(--muted)" }}>
                              <span className="mt-1.5 h-1 w-1 flex-none rounded-full" style={{ background: project.color }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mono-label mb-2" style={{ color: "var(--dim)" }}>Proof</p>
                        <ul className="space-y-1.5">
                          {project.proof.map((item) => (
                            <li key={item} className="flex gap-2 text-xs leading-5" style={{ color: "var(--muted)" }}>
                              <CheckCircle2 className="mt-1 h-3 w-3 flex-none" style={{ color: project.color }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t pt-4" style={{ borderColor: "var(--line)" }}>
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold"
                          style={{
                            color: project.color,
                            borderColor: `color-mix(in oklch, ${project.color} 24%, transparent)`,
                            background: `color-mix(in oklch, ${project.color} 8%, transparent)`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-link focus-ring inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold"
                        style={{ color: project.color }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link focus-ring inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold"
                          style={{ color: project.color }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play className="h-3.5 w-3.5" />
                          Demo
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
