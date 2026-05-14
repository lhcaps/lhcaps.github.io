'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const easeOutExpo = [0.16, 1, 0.3, 1]

interface Satellite {
  id: string
  label: string
  sub: string
  color: string
  x: number
  y: number
  angle: number
}

const satellites: Satellite[] = [
  { id: 'api', label: 'API', sub: 'REST / SSE', color: '#67E8F9', x: 0, y: -180, angle: -Math.PI / 2 },
  { id: 'db', label: 'DB', sub: 'PostgreSQL', color: '#60A5FA', x: -295, y: -65, angle: (Math.PI * 2) / 3 },
  { id: 'queue', label: 'QUEUE', sub: 'BullMQ', color: '#A78BFA', x: 295, y: -65, angle: Math.PI / 3 },
  { id: 'worker', label: 'WORKER', sub: 'FastAPI', color: '#FB923C', x: -240, y: 155, angle: (Math.PI * 4) / 3 },
  { id: 'ai', label: 'AI', sub: 'Ollama', color: '#8B5CF6', x: 240, y: 155, angle: (Math.PI * 5) / 3 },
  { id: 'ui', label: 'UI', sub: 'React', color: '#4ADE80', x: 0, y: 230, angle: 0 },
]

// SVG connector data: from center (50, 50) to each satellite position in percent
const connectorData = satellites.map((s) => {
  const cx = 50
  const cy = 50
  const sx = cx + (s.x / 620) * 100
  const sy = cy + (s.y / 480) * 100
  return { id: s.id, x1: cx, y1: cy, x2: sx, y2: sy, color: s.color }
})

function SatelliteNode({ sat, index }: { sat: Satellite; index: number }) {
  const [visible, setVisible] = useState(false)
  const delay = 550 + index * 60

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0.15,
            filter: 'blur(8px)',
          }}
          animate={{
            x: sat.x,
            y: sat.y,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.9,
            delay: index * 0.07,
            ease: easeOutExpo as unknown as number[],
          }}
        >
          <div
            className="flex flex-col items-center gap-0.5"
          >
            <div
              className="px-2.5 py-1 rounded-lg text-[9px] font-bold font-mono tracking-[0.12em] uppercase"
              style={{
                background: sat.color + '14',
                border: `1px solid ${sat.color}30`,
                color: sat.color,
                textShadow: `0 0 12px ${sat.color}60`,
              }}
            >
              {sat.label}
            </div>
            <div
              className="text-[7px] font-mono tracking-wider"
              style={{ color: sat.color + '60' }}
            >
              {sat.sub}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ConnectorLines() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {connectorData.map((conn) => (
        <motion.line
          key={conn.id}
          x1={conn.x1}
          y1={conn.y1}
          x2={conn.x2}
          y2={conn.y2}
          stroke={conn.color}
          strokeWidth="0.06"
          strokeOpacity="0"
          strokeDasharray="100"
          initial={{ strokeDashoffset: 100, strokeOpacity: 0 }}
          animate={{ strokeDashoffset: 0, strokeOpacity: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  )
}

export function SatelliteSystem() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="relative w-full max-w-[620px] mx-auto"
      style={{ height: 480 }}
      aria-hidden="true"
    >
      <ConnectorLines />
      {satellites.map((sat, i) => (
        <SatelliteNode key={sat.id} sat={sat} index={i} />
      ))}
    </div>
  )
}
