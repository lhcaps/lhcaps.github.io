import { useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface GlobalBackgroundProps {
  children: React.ReactNode
}

export function GlobalBackground({ children }: GlobalBackgroundProps) {
  const { scrollYProgress } = useScroll()

  /* Parallax — only the dots move, orbs are fixed-position */
  const dotsY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])

  const stars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: `${5 + (i * 97) % 90}%`,
      y: `${5 + (i * 71) % 80}%`,
      size: 1 + (i % 3) * 0.8,
      delay: (i * 0.7) % 5,
      duration: 3 + (i % 4),
    }))
  }, [])

  return (
    <div className="relative">
      {/* Fixed background layer */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Base */}
        <div className="absolute inset-0" style={{ background: "hsl(var(--bg))" }} />

        {/* Dot grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            y: dotsY,
          }}
        />

        {/* Orb 1 — top-left, cyan (CSS animated) */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full orb-anim-1"
          style={{
            background: "radial-gradient(circle, hsl(200, 100%, 60%, 0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
            left: "-10%",
            top: "-5%",
            willChange: "transform",
          }}
        />

        {/* Orb 2 — bottom-right, accent (CSS animated) */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full orb-anim-2"
          style={{
            background: "radial-gradient(circle, hsl(195, 100%, 60%, 0.10) 0%, transparent 65%)",
            filter: "blur(70px)",
            right: "-8%",
            bottom: "10%",
            willChange: "transform",
          }}
        />

        {/* Orb 3 — center-top, deep violet (CSS animated) */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full orb-anim-3"
          style={{
            background: "radial-gradient(circle, hsl(270, 60%, 50%, 0.06) 0%, transparent 65%)",
            filter: "blur(60px)",
            left: "35%",
            top: "20%",
            willChange: "transform",
          }}
        />

        {/* Orb 4 — bottom-left, warm (CSS animated) */}
        <div
          className="absolute w-[350px] h-[350px] rounded-full orb-anim-4"
          style={{
            background: "radial-gradient(circle, hsl(185, 100%, 55%, 0.05) 0%, transparent 65%)",
            filter: "blur(50px)",
            left: "5%",
            bottom: "20%",
            willChange: "transform",
          }}
        />

        {/* Star field (Framer Motion for staggered timing) */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              background: star.id % 3 === 0 ? "hsl(195, 100%, 70%)" : "hsl(200, 100%, 70%)",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.8, 1.3, 0.8],
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

      {/* Content */}
      {children}
    </div>
  )
}
