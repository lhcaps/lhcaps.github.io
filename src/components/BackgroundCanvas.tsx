import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function BackgroundCanvas() {
  const { scrollYProgress } = useScroll()

  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base background */}
      <div className="absolute inset-0" style={{ background: 'hsl(var(--bg))' }} />

      {/* Technical grid — subtle, slow parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(103, 232, 249, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(103, 232, 249, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          y: gridY,
        }}
      />

      {/* Single soft ambient glow — static, no animation, no blur */}
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '600px',
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(103,232,249,0.05) 0%, transparent 65%)',
        }}
      />
    </div>
  )
}
