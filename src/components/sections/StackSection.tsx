import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MonitorPlay, Zap, Database, Cpu, Brain } from 'lucide-react'
import { Container, SectionHeader } from '@/components/layout'
import { stackLayers, type StackLayer } from '@/data/stack'

const LAYER_ICON_MAP: Record<StackLayer['icon'], React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  frontend: MonitorPlay,
  api: Zap,
  data: Database,
  workers: Cpu,
  ai: Brain,
}

function StackLayerRow({ layer }: { layer: StackLayer }) {
  const Icon = LAYER_ICON_MAP[layer.icon]

  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {stackLayers.indexOf(layer) < stackLayers.length - 1 && (
        <div className="absolute left-8 -top-6 w-px h-6 overflow-hidden">
          <motion.div
            className="w-px rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${layer.accent}40, transparent)`,
              height: '24px',
            }}
            initial={{ scaleY: 0, originY: 'top' }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </div>
      )}

      <div
        className="rounded-2xl p-5 md:p-6 relative overflow-hidden flex items-center gap-5"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02))',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
          style={{
            background: `linear-gradient(to bottom, ${layer.accent}, transparent)`,
            boxShadow: `0 0 12px ${layer.accent}40`,
          }}
        />

        {/* Icon block */}
        <motion.div
          className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${layer.accent}10`,
            border: `1px solid ${layer.accent}25`,
          }}
          whileHover={{ scale: 1.06, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: layer.accent }} />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="text-base md:text-lg font-bold font-heading" style={{ color: layer.accent }}>
              {layer.label}
            </h3>
            <span
              className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
              style={{
                background: `${layer.accent}10`,
                border: `1px solid ${layer.accent}20`,
                color: `${layer.accent}90`,
              }}
            >
              {layer.tag}
            </span>
          </div>

          <p className="text-[10px] md:text-xs mb-3 leading-relaxed" style={{ color: `${layer.accent}70` }}>
            {layer.purpose}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {layer.primary.map((item: string) => (
              <span
                key={item}
                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] md:text-xs font-mono font-medium"
                style={{
                  background: `${layer.accent}08`,
                  border: `1px solid ${layer.accent}18`,
                  color: `${layer.accent}90`,
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {layer.supporting && layer.supporting.length > 0 && (
            <div className="mt-1.5">
              <span className="text-[9px] font-mono" style={{ color: `${layer.accent}45` }}>
                Supporting:{' '}
              </span>
              <span className="text-[9px] font-mono" style={{ color: `${layer.accent}55` }}>
                {layer.supporting.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Right status dot */}
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{
            background: layer.accent,
            boxShadow: `0 0 8px ${layer.accent}`,
          }}
        />
      </div>
    </motion.div>
  )
}

export function StackSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section id="stack" ref={sectionRef} className="relative py-24 md:py-32 lg:py-44 overflow-hidden">
      {/* Background watermark */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black select-none pointer-events-none leading-none"
        style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          WebkitTextStroke: '1px rgba(103, 232, 249, 0.03)',
          color: 'transparent',
          y: bgY,
        }}
        aria-hidden="true"
      >
        STACK
      </motion.div>

      <Container>
        <SectionHeader number='02' label='System Stack' />

        {/* Vertical pipeline */}
        <div className="space-y-4 max-w-3xl">
          {stackLayers.map((layer: StackLayer) => (
            <StackLayerRow key={layer.label} layer={layer} />
          ))}
        </div>
      </Container>
    </section>
  )
}
