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
  { id: 'api', label: 'API', sub: 'REST / SSE', color: '#67E8F9', x: 0, y: -130 },
  { id: 'db', label: 'DB', sub: 'PostgreSQL', color: '#60A5FA', x: -200, y: -60 },
  { id: 'queue', label: 'QUEUE', sub: 'BullMQ', color: '#A78BFA', x: 200, y: -60 },
  { id: 'worker', label: 'WORKER', sub: 'FastAPI', color: '#FB923C', x: -160, y: 80 },
  { id: 'ai', label: 'AI', sub: 'Ollama', color: '#8B5CF6', x: 160, y: 80 },
  { id: 'ui', label: 'UI', sub: 'React', color: '#4ADE80', x: 0, y: 150 },
]

function OrbitalLines() {
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
        const sx = cx + (s.x / 360) * 100
        const sy = cy + (s.y / 360) * 100
        return (
          <line
            key={s.id}
            x1={cx}
            y1={cy}
            x2={sx}
            y2={sy}
            stroke={s.color}
            strokeWidth="0.06"
            strokeOpacity="0.18"
          />
        )
      })}
    </svg>
  )
}

function SatelliteNode({ sat, index, reduced }: { sat: Satellite; index: number; reduced: boolean }) {
  const init = reduced
    ? { x: sat.x, y: sat.y, opacity: 1 as const, scale: 1 }
    : { x: 0, y: 0, opacity: 0 as const, scale: 0.2 }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '50%', translateX: '-50%', translateY: '-50%' }}
      initial={init}
      animate={{ x: sat.x, y: sat.y, opacity: 1, scale: 1 }}
      transition={
        reduced
          ? { duration: 0, delay: index * 0.01 }
          : { duration: 1.0, delay: 0.5 + index * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
      }
    >
      <div className="relative flex flex-col items-center gap-1 group">
        {/* Module card — 3D glass effect */}
        <div
          className="relative px-3.5 py-2 rounded-xl flex flex-col items-center gap-0.5"
          style={{
            background: `${sat.color}10`,
            border: `1px solid ${sat.color}30`,
            boxShadow: `
              0 0 0 1px ${sat.color}06 inset,
              0 4px 16px rgba(0,0,0,0.45),
              0 0 20px ${sat.color}18
            `,
            backdropFilter: 'blur(6px)',
          }}
        >
          {/* Top shimmer */}
          <div
            className="absolute inset-x-2 top-px h-px rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${sat.color}50, transparent)` }}
          />

          {/* Mini orb with glow */}
          <div
            className="w-2 h-2 rounded-full mb-0.5"
            style={{
              background: `radial-gradient(circle at 35% 30%, #fff, ${sat.color})`,
              boxShadow: `0 0 8px ${sat.color}, 0 0 16px ${sat.color}80, 0 0 24px ${sat.color}30`,
            }}
          />

          {/* Label */}
          <span
            className="text-[9px] font-bold font-mono tracking-[0.12em] uppercase whitespace-nowrap"
            style={{ color: sat.color }}
          >
            {sat.label}
          </span>

          {/* Sublabel */}
          <span
            className="text-[7px] font-mono tracking-wider"
            style={{ color: `${sat.color}60` }}
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
      aria-hidden="true"
    >
      <OrbitalLines />
      {satellites.map((sat, i) => (
        <SatelliteNode key={sat.id} sat={sat} index={i} reduced={reduced} />
      ))}
    </div>
  )
}
