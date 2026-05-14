import { motion } from 'framer-motion'

interface HaloDecorationProps {
  width?: number
  height?: number
}

export function HaloDecoration({ width = 420, height = 280 }: HaloDecorationProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ width, height }}
      aria-hidden="true"
    >
      {/* Soft radial glow behind text */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(103,232,249,0.08) 0%, transparent 65%)',
        }}
      />

      {/* SVG orbit rings */}
      <svg
        className="absolute inset-0"
        viewBox="0 0 420 280"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Outer ring — violet, slowest */}
        <ellipse
          cx="210"
          cy="140"
          rx="180"
          ry="90"
          stroke="#A78BFA"
          strokeWidth="0.8"
          strokeOpacity="0.25"
          strokeDasharray="4 3"
        />

        {/* Middle ring — cyan, medium speed */}
        <ellipse
          cx="210"
          cy="140"
          rx="145"
          ry="72"
          stroke="#67E8F9"
          strokeWidth="0.6"
          strokeOpacity="0.2"
          strokeDasharray="3 4"
        />

        {/* Inner ring — faint cyan */}
        <ellipse
          cx="210"
          cy="140"
          rx="110"
          ry="55"
          stroke="#67E8F9"
          strokeWidth="0.4"
          strokeOpacity="0.12"
          strokeDasharray="2 5"
        />

        {/* Orbiting dot on outer ring — CSS animation */}
        <circle
          cx="390"
          cy="140"
          r="3"
          fill="#A78BFA"
          opacity="0.5"
          style={{
            animation: 'orbit-outer 20s linear infinite',
            transformOrigin: '210px 140px',
          }}
        />

        {/* Orbiting dot on middle ring */}
        <circle
          cx="355"
          cy="140"
          r="2.5"
          fill="#67E8F9"
          opacity="0.4"
          style={{
            animation: 'orbit-middle 14s linear infinite',
            transformOrigin: '210px 140px',
          }}
        />
      </svg>

      {/* CSS keyframes injected via inline style tag */}
      <style>{`
        @keyframes orbit-outer {
          from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
        }
        @keyframes orbit-middle {
          from { transform: rotate(0deg) translateX(145px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(145px) rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}
