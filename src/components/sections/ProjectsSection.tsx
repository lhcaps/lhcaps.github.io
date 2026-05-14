'use client'

import { useRef } from 'react'
import { Github, ArrowRight, CheckCircle2 } from 'lucide-react'
import { projects, type Project } from '@/data/projects'
import { Container, SectionHeader } from '@/components/layout'
import { TechPill } from '@/components/ui'
import { useScroll, useTransform, motion } from 'framer-motion'

// -------------------------------------------------------------- //
// MiniSystemVisual — full-panel absolute SVG architecture diagram   //
// Fills the right panel completely. Distinct visual per project.   //
// -------------------------------------------------------------- //
function MiniSystemVisual({ project }: { project: Project }) {
  const { layers, archNodes } = project.system

  // Layout nodes across a 3x3 logical grid using tier + indexWithinTier
  type NodeWithPos = { label: string; tier: number; x: number; y: number; idx: number }
  const nodePositions: NodeWithPos[] = archNodes.map((node, globalIdx) => {
    const nodesInSameTier = archNodes.filter(n => n.tier === node.tier)
    const idxInTier = nodesInSameTier.indexOf(node)
    const xBase = node.tier === 0 ? 15 : node.tier === 4 ? 85 : node.tier === 2 ? 50 : 35
    const xSpread = nodesInSameTier.length > 1 ? 18 : 0
    const x = xBase + (idxInTier - (nodesInSameTier.length - 1) / 2) * xSpread
    const y = 12 + node.tier * 20
    return { ...node, x, y, idx: globalIdx }
  })

  // SVG connector lines: from each node to the next tier's nodes
  const connectors: { x1: number; y1: number; x2: number; y2: number }[] = []
  nodePositions.forEach((node) => {
    const targets = nodePositions.filter(n => n.tier === node.tier + 1)
    if (targets.length === 0) {
      // Last tier connects horizontally
      const sameTier = nodePositions.filter(n => n.tier === node.tier)
      const nextIdx = sameTier.indexOf(node) + 1
      if (nextIdx < sameTier.length) {
        const next = sameTier[nextIdx]
        connectors.push({ x1: node.x, y1: node.y, x2: next.x, y2: next.y })
      }
    } else {
      targets.forEach(target => {
        connectors.push({ x1: node.x, y1: node.y, x2: target.x, y2: target.y })
      })
    }
  })

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-full flex flex-col">
      {/* SVG connectors behind everything */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <filter id={`glow-${project.id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {connectors.map((c, i) => (
          <line
            key={i}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke={project.color}
            strokeWidth="0.5"
            strokeOpacity="0.35"
            strokeDasharray="2,1"
          />
        ))}
      </svg>

      {/* Architecture nodes absolutely positioned */}
      <div className="relative flex-1 w-full">
        {nodePositions.map((node) => (
          <div
            key={node.label}
            className="absolute"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              className="px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold tracking-[0.1em] uppercase whitespace-nowrap"
              style={{
                background: project.color + '14',
                border: `1px solid ${project.color}35`,
                color: project.color,
                filter: `url(#glow-${project.id})`,
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: node.idx * 0.06 }}
              whileHover={{ scale: 1.08 }}
            >
              {node.label}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Pipeline bar at bottom */}
      <div className="relative flex items-center justify-center gap-0 py-3 px-4 border-t" style={{ borderColor: project.color + '18' }}>
        {layers.map((layer, i) => (
          <div key={layer} className="flex items-center">
            <div
              className="px-2 py-0.5 rounded text-[7px] font-mono font-bold tracking-widest uppercase"
              style={{
                background: project.color + '10',
                border: `1px solid ${project.color}22`,
                color: project.color + '99',
              }}
            >
              {layer}
            </div>
            {i < layers.length - 1 && (
              <svg
                className="w-4 h-3 flex-shrink-0"
                viewBox="0 0 16 12"
                fill="none"
                style={{ color: project.color + '30' }}
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

// -------------------------------------------------------------- //
// ProjectCard — split layout: content left, visual right             //
// -------------------------------------------------------------- //
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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
          style={{ background: 'linear-gradient(90deg, transparent, ' + project.color + ', transparent)' }}
        />

        {/* Split layout: content left, visual right */}
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 items-start">
          {/* Left: Text content */}
          <div>
            {/* Title row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-start gap-3">
                <span
                  className="text-3xl md:text-4xl font-black font-heading select-none leading-none mt-1"
                  style={{
                    fontStyle: 'italic',
                    WebkitTextStroke: '1px ' + project.color + '30',
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
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                <Github className="w-5 h-5" style={{ color: 'hsl(var(--muted-fg))' }} />
              </motion.a>
            </div>

            {/* Problem */}
            <div className="mb-4">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5 block" style={{ color: project.color + '80' }}>
                Problem
              </span>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted-fg))' }}>
                {project.problem}
              </p>
            </div>

            {/* Built */}
            <div className="mb-4">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2 block" style={{ color: project.color + '80' }}>
                Built
              </span>
              <ul className="space-y-1">
                {project.built.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: 'hsl(var(--muted-fg))' }}
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Proof */}
            <div className="mb-5 p-4 rounded-xl" style={{ background: project.color + '06', border: '1px solid ' + project.color + '15' }}>
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2 block" style={{ color: project.color + '80' }}>
                Proof
              </span>
              <ul className="space-y-1.5">
                {project.proof.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs"
                    style={{ color: 'hsl(var(--muted-fg))' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag: string, i: number) => (
                <TechPill key={tag} label={tag} color={project.color} index={i} />
              ))}
            </div>

            {/* CTA */}
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

          {/* Right: Full-height mini system visual */}
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

// -------------------------------------------------------------- //
// ProjectsSection                                                  //
// -------------------------------------------------------------- //
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
