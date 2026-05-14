import { useRef } from 'react'
import { Github, ArrowRight } from 'lucide-react'
import { projects, type Project } from '@/data/projects'
import { Container, SectionHeader } from '@/components/layout'
import { TechPill } from '@/components/ui'
import { useScroll, useTransform, motion } from 'framer-motion'

function ProjectArchitecture({ project }: { project: Project }) {
  const layers = ['UI', 'API', 'DB', 'Queue', 'Worker']
  return (
    <div className='flex items-center justify-center gap-1.5 py-3'>
      {layers.map((layer, i) => (
        <div key={layer} className='flex flex-col items-center gap-1'>
          <div
            className='w-8 md:w-10 h-3 rounded-sm'
            style={{
              background: project.color + Math.max(15, 50 - i * 8).toString(16).padStart(2, '0'),
              border: '1px solid ' + project.color + Math.max(15, 40 - i * 8).toString(16).padStart(2, '0'),
            }}
          />
          <div className='w-px h-1.5 rounded-full' style={{ background: project.color + '40' }} />
        </div>
      ))}
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
      className='relative rounded-2xl overflow-hidden'
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className='relative p-7 md:p-10 rounded-2xl'
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
        }}
      >
        <div
          className='absolute top-0 left-0 right-0 h-px rounded-t-2xl'
          style={{ background: 'linear-gradient(90deg, transparent, ' + project.color + ', transparent)' }}
        />

        <div className='flex items-start justify-between mb-6'>
          <div className='flex items-start gap-3'>
            <span
              className='text-3xl md:text-4xl font-black font-heading select-none leading-none mt-1'
              style={{ fontStyle: 'italic', WebkitTextStroke: '1px ' + project.color + '30', color: 'transparent' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className='text-xl md:text-2xl font-bold mb-1 font-heading' style={{ color: project.color }}>
                {project.title}
              </h3>
              <p className='text-sm font-medium' style={{ color: 'hsl(var(--muted-fg))' }}>
                {project.subtitle}
              </p>
            </div>
          </div>

          <motion.a
            href={project.github}
            target='_blank'
            rel='noopener noreferrer'
            className='p-2.5 rounded-xl flex-shrink-0'
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            <Github className='w-5 h-5' style={{ color: 'hsl(var(--muted-fg))' }} />
          </motion.a>
        </div>

        <div className='mb-6'>
          <ProjectArchitecture project={project} />
        </div>

        <div className='mb-4'>
          <span className='text-[10px] font-bold tracking-[0.15em] uppercase mb-1 block' style={{ color: project.color + '80' }}>
            Problem
          </span>
          <p className='text-sm leading-relaxed' style={{ color: 'hsl(var(--muted-fg))' }}>
            {project.problem}
          </p>
        </div>

        <div className='mb-5'>
          <span className='text-[10px] font-bold tracking-[0.15em] uppercase mb-2 block' style={{ color: project.color + '80' }}>
            Built
          </span>
          <ul className='space-y-1'>
            {project.built.map((item: string, i: number) => (
              <li key={i} className='flex items-start gap-2 text-sm' style={{ color: 'hsl(var(--muted-fg))' }}>
                <span className='mt-1.5 w-1 h-1 rounded-full flex-shrink-0' style={{ background: project.color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-wrap gap-1.5 mb-5'>
          {project.tags.map((tag: string, i: number) => (
            <TechPill key={tag} label={tag} color={project.color} index={i} />
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <motion.a
            href={project.github}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-sm font-semibold'
            style={{ color: project.color }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Github className='w-4 h-4' />
            <span>View on GitHub</span>
            <ArrowRight className='w-4 h-4' />
          </motion.a>
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
    <section id='projects' ref={sectionRef} className='relative py-24 md:py-32 lg:py-44 overflow-hidden'>
      <motion.div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black select-none pointer-events-none leading-none'
        style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          WebkitTextStroke: '1px rgba(103, 232, 249, 0.04)',
          color: 'transparent',
          y: bgY,
        }}
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
