import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Satellite {
  id: string
  label: string
  sub: string
  color: string
  x: number
  y: number
}

const satellites: Satellite[] = [
  { id: 'api', label: 'API', sub: 'REST / SSE', color: '#67E8F9', x: 0, y: -110 },
  { id: 'db', label: 'DB', sub: 'PostgreSQL', color: '#60A5FA', x: -190, y: -50 },
  { id: 'queue', label: 'QUEUE', sub: 'BullMQ', color: '#A78BFA', x: 190, y: -50 },
  { id: 'worker', label: 'WORKER', sub: 'FastAPI', color: '#FB923C', x: -155, y: 85 },
  { id: 'ai', label: 'AI', sub: 'Ollama', color: '#8B5CF6', x: 155, y: 85 },
  { id: 'ui', label: 'UI', sub: 'React', color: '#4ADE80', x: 0, y: 140 },
]

function ConnectorLines({ reduced }: { reduced: boolean }) {
  const revealed = reduced

  if (!revealed) return null

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.01 }}
    >
      {satellites.map((s) => {
        const cx = 50
        const cy = 50
        const sx = cx + (s.x / 480) * 100
        const sy = cy + (s.y / 340) * 100
        return (
          <motion.line
            key={s.id}
            x1={cx}
            y1={cy}
            x2={sx}
            y2={sy}
            stroke={s.color}
            strokeWidth="0.06"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100, strokeOpacity: 0 }}
            animate={{ strokeDashoffset: 0, strokeOpacity: 0.22 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          />
        )
      })}
    </motion.svg>
  )
}

function SatelliteNode({ sat, index, reduced }: { sat: Satellite; index: number; reduced: boolean }) {
  const initialState = reduced
    ? { x: sat.x, y: sat.y, opacity: 1, scale: 1, filter: 'blur(0px)' }
    : { x: 0, y: 0, opacity: 0, scale: 0.15, filter: 'blur(8px)' }

  const animateState = { x: sat.x, y: sat.y, opacity: 1, scale: 1, filter: 'blur(0px)' }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={initialState}
      animate={animateState}
      transition={
        reduced
          ? { duration: 0, delay: index * 0.01 }
          : { duration: 0.9, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
      }
    >
      <div className="relative flex flex-col items-center gap-0.5 group">
        {/* Outer ring glow */}
        <div
          className="absolute -inset-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${sat.color}18 0%, transparent 70%)`,
            filter: 'blur(4px)',
          }}
        />

        {/* Orb dot */}
        <div
          className="w-1.5 h-1.5 rounded-full mb-0.5"
          style={{
            background: sat.color,
            boxShadow: `0 0 6px ${sat.color}, 0 0 12px ${sat.color}50`,
          }}
        />

        {/* Glass chip */}
        <div
          className="relative px-2.5 py-1 rounded-lg text-[9px] font-bold font-mono tracking-[0.12em] uppercase"
          style={{
            background: `${sat.color}14`,
            border: `1px solid ${sat.color}30`,
            color: sat.color,
            boxShadow: `
              0 1px 0 rgba(255,255,255,0.06) inset,
              0 -1px 3px rgba(0,0,0,0.3),
              0 0 12px ${sat.color}20
            `,
          }}
        >
          {/* Subtle top shine */}
          <div
            className="absolute inset-x-1 top-px h-px rounded-full"
            style={{ background: `${sat.color}40` }}
          />
          {sat.label}
        </div>

        {/* Sublabel */}
        <div
          className="text-[7px] font-mono tracking-wider"
          style={{ color: `${sat.color}60` }}
        >
          {sat.sub}
        </div>
      </div>
    </motion.div>
  )
}

interface SatelliteSystemProps {
  reduced?: boolean
}

export function SatelliteSystem({ reduced = false }: SatelliteSystemProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(id)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="relative w-full max-w-[480px] mx-auto"
      style={{ height: 340 }}
      aria-hidden="true"
    >
      <ConnectorLines reduced={reduced} />
      {satellites.map((sat, i) => (
        <SatelliteNode key={sat.id} sat={sat} index={i} reduced={reduced} />
      ))}
    </div>
  )
}
