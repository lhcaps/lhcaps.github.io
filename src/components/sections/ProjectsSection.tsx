import { useRef } from 'react'
import { Github, ArrowRight, CheckCircle2 } from 'lucide-react'
import { projects, type Project } from '@/data/projects'
import { Container, SectionHeader } from '@/components/layout'
import { TechPill } from '@/components/ui'
import { useScroll, useTransform, motion } from 'framer-motion'

function MiniSystemVisual({ project }: { project: Project }) {
  const { layers, nodes, connections } = project.system
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  const nodeKindStyle = (kind?: string) => {
    const alpha = kind === 'primary' ? 'FF' : kind === 'runtime' ? '80' : 'AA'
    const size = kind === 'primary' ? 'px-3 py-1.5 text-[10px]' : 'px-2.5 py-1 text-[8px]'
    return { alpha, size }
  }

  return (
    <div className="relative w-full min-h-[360px] flex flex-col">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 42%, ${project.color}07 0%, transparent 68%)`,
        }}
        aria-hidden="true"
      />

      {/* SVG connections — no SVG filters */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {connections.map(([fromId, toId], i) => {
          const a = nodeMap.get(fromId)
          const b = nodeMap.get(toId)
          if (!a || !b) return null
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={project.color}
              strokeWidth="0.4"
              strokeOpacity="0.28"
              strokeDasharray="2 2"
            />
          )
        })}
      </svg>

      {/* Nodes at explicit positions */}
      <div className="relative flex-1 w-full">
        {nodes.map((node, idx) => {
          const { alpha, size } = nodeKindStyle(node.kind)
          return (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.div
                className={`rounded-lg font-mono font-bold tracking-[0.08em] uppercase whitespace-nowrap ${size}`}
                style={{
                  background: `${project.color}${alpha}10`,
                  border: `1px solid ${project.color}${alpha}28`,
                  color: project.color,
                  boxShadow: `0 0 12px ${project.color}${alpha}18, 0 2px 6px rgba(0,0,0,0.35)`,
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                whileHover={{ scale: 1.08 }}
              >
                {node.label}
              </motion.div>
            </div>
          )
        })}
      </div>

      {/* Pipeline bar */}
      <div
        className="relative flex items-center justify-center gap-0 py-2.5 px-4 border-t"
        style={{ borderColor: `${project.color}18` }}
      >
        {layers.map((layer, i) => (
          <div key={layer} className="flex items-center">
            <div
              className="px-2 py-0.5 rounded text-[7px] font-mono font-bold tracking-widest uppercase"
              style={{
                background: `${project.color}0D`,
                border: `1px solid ${project.color}20`,
                color: `${project.color}90`,
              }}
            >
              {layer}
            </div>
            {i < layers.length - 1 && (
              <svg
                className="w-4 h-3 flex-shrink-0"
                viewBox="0 0 16 12"
                fill="none"
                style={{ color: `${project.color}28` }}
                aria-hidden="true"
              >
                <path d="M1 6h12M10 2l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden"
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <div
        className="relative p-6 md:p-8 rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 items-start">
          {/* Left: content */}
          <div>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-start gap-3">
                <span
                  className="text-3xl md:text-4xl font-black font-heading select-none leading-none mt-1"
                  style={{
                    fontStyle: 'italic',
                    WebkitTextStroke: `1px ${project.color}28`,
                    color: 'transparent',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1 font-heading" style={{ color: project.color }}>
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: 'hsl(var(--muted-fg))' }}>
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl flex-shrink-0"
                style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                <Github className="w-5 h-5" style={{ color: 'hsl(var(--muted-fg))' }} />
              </motion.a>
            </div>

            <div className="mb-4">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5 block" style={{ color: `${project.color}80` }}>
                Problem
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-fg))' }}>
                {project.problem}
              </p>
            </div>

            <div className="mb-4">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2 block" style={{ color: `${project.color}80` }}>
                Built
              </span>
              <ul className="space-y-1">
                {project.built.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'hsl(var(--muted-fg))' }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5 p-4 rounded-xl" style={{ background: `${project.color}06`, border: `1px solid ${project.color}14` }}>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2 block" style={{ color: `${project.color}80` }}>
                Proof
              </span>
              <ul className="space-y-1.5">
                {project.proof.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'hsl(var(--muted-fg))' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag: string, i: number) => (
                <TechPill key={tag} label={tag} color={project.color} index={i} />
              ))}
            </div>

            <div className="flex items-center gap-4 mt-5">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: project.color }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Right: system visual */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.06)',
              minHeight: 320,
              height: '100%',
            }}
          >
            <MiniSystemVisual project={project} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 lg:py-44 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black select-none pointer-events-none leading-none"
        style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          WebkitTextStroke: '1px rgba(103, 232, 249, 0.04)',
          color: 'transparent',
          y: bgY,
        }}
        aria-hidden="true"
      >
        SYSTEMS
      </motion.div>

      <Container>
        <SectionHeader number='01' label='Selected Systems' />

        <div className='space-y-6'>
          {projects.map((project: Project, i: number) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
