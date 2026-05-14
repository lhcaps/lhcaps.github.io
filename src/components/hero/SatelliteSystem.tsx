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

function OrbitalLines({ reduced }: { reduced: boolean }) {
  if (!reduced) return null

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {satellites.map((s) => {
        const cx = 50
        const cy = 50
        const sx = cx + (s.x / 340) * 100
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
            initial={{ strokeDashoffset: 100, strokeOpacity: 0 }}
            animate={{ strokeDashoffset: 0, strokeOpacity: 0.18 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          />
        )
      })}
    </svg>
  )
}

function SatelliteNode({ sat, index, reduced }: { sat: Satellite; index: number; reduced: boolean }) {
  const init = reduced
    ? { x: sat.x, y: sat.y, opacity: 1 as const, scale: 1, filter: 'blur(0px)' }
    : { x: 0, y: 0, opacity: 0 as const, scale: 0.15, filter: 'blur(8px)' }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
      initial={init}
      animate={{ x: sat.x, y: sat.y, opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={
        reduced
          ? { duration: 0, delay: index * 0.01 }
          : { duration: 0.9, delay: 0.55 + index * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
      }
    >
      <div className="relative flex flex-col items-center gap-1 group">
        {/* Module shell */}
        <div
          className="relative px-3 py-1.5 rounded-xl flex flex-col items-center gap-0.5"
          style={{
            background: `${sat.color}0D`,
            border: `1px solid ${sat.color}28`,
            boxShadow: `
              0 0 0 1px ${sat.color}08 inset,
              0 2px 8px rgba(0,0,0,0.4),
              0 0 16px ${sat.color}14
            `,
            backdropFilter: 'blur(4px)',
          }}
        >
          {/* Top-edge shine */}
          <div
            className="absolute inset-x-2 top-px h-px rounded-full"
            style={{ background: `${sat.color}30` }}
          />

          {/* Mini orb */}
          <div
            className="w-1.5 h-1.5 rounded-full mb-0.5"
            style={{
              background: sat.color,
              boxShadow: `0 0 5px ${sat.color}, 0 0 10px ${sat.color}60`,
            }}
          />

          {/* Label */}
          <span
            className="text-[9px] font-bold font-mono tracking-[0.1em] uppercase whitespace-nowrap"
            style={{ color: sat.color }}
          >
            {sat.label}
          </span>

          {/* Sublabel */}
          <span
            className="text-[7px] font-mono tracking-wider"
            style={{ color: `${sat.color}55` }}
          >
            {sat.sub}
          </span>
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
      className="absolute inset-0"
      style={{ height: 340 }}
      aria-hidden="true"
    >
      <OrbitalLines reduced={reduced} />
      {satellites.map((sat, i) => (
        <SatelliteNode key={sat.id} sat={sat} index={i} reduced={reduced} />
      ))}
    </div>
  )
}
