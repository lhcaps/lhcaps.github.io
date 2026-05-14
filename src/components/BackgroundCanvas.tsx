import { useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function BackgroundCanvas() {
  const { scrollYProgress } = useScroll()

  const dotsY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])

  const stars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: `${5 + (i * 97) % 90}%`,
      y: `${5 + (i * 71) % 80}%`,
      size: 1 + (i % 3) * 0.8,
      delay: (i * 0.7) % 5,
      duration: 3 + (i % 4),
    }))
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: "hsl(var(--bg))" }} />

      {/* Technical grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(103, 232, 249, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(103, 232, 249, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          y: dotsY,
        }}
      />

      {/* Orb 1 - top left, cyan */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(103, 232, 249, 0.08) 0%, transparent 65%)",
          filter: "blur(80px)",
          left: "-10%",
          top: "-5%",
          animation: "orb-float-1 30s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 2 - bottom right, violet */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 65%)",
          filter: "blur(70px)",
          right: "-8%",
          bottom: "10%",
          animation: "orb-float-2 25s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Orb 3 - center-top, deep */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 65%)",
          filter: "blur(60px)",
          left: "35%",
          top: "20%",
          animation: "orb-float-3 20s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Star field - reduced from 40 to 20 */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            background:
              star.id % 3 === 0
                ? "rgba(103, 232, 249, 0.6)"
                : "rgba(103, 232, 249, 0.4)",
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
