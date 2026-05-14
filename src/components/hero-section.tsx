import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, Github, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { easeOutExpo } from "@/lib/animations"

const floatingIcons = [
  { label: "TypeScript", color: "#3178C6", symbol: "TS" },
  { label: "React", color: "#61DAFB", symbol: "React" },
  { label: "Python", color: "#3776AB", symbol: "Python" },
  { label: "Node.js", color: "#339933", symbol: "Node" },
  { label: "Docker", color: "#2496ED", symbol: "Docker" },
  { label: "PostgreSQL", color: "#4169E1", symbol: "Postgres" },
  { label: "FastAPI", color: "#009688", symbol: "FastAPI" },
  { label: "AI/ML", color: "#FF6F61", symbol: "AI/ML" },
]

function FloatingIcon({ icon, index }: { icon: (typeof floatingIcons)[0]; index: number }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 60, damping: 15, mass: 0.8 })
  const springY = useSpring(y, { stiffness: 60, damping: 15, mass: 0.8 })

  const positions = [
    { x: -38, y: -12 },
    { x: 40, y: -15 },
    { x: -35, y: 10 },
    { x: 42, y: 8 },
    { x: -25, y: -25 },
    { x: 30, y: -25 },
    { x: -48, y: 0 },
    { x: 50, y: 15 },
  ]

  const pos = positions[index % positions.length]

  return (
    <motion.div
      ref={ref}
      className="absolute hidden lg:block"
      style={{
        left: `calc(50% + ${pos.x}vw)`,
        top: `calc(50% + ${pos.y}vh)`,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: easeOutExpo as unknown as string }}
    >
      <motion.div
        className="relative group cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={ref}
        dragElastic={0.05}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="w-20 h-24 rounded-xl flex flex-col items-center justify-center gap-1 font-mono font-bold text-xs select-none"
          style={{
            backgroundColor: `${icon.color}12`,
            border: `1px solid ${icon.color}30`,
            color: icon.color,
            boxShadow: `0 4px 24px ${icon.color}15`,
          }}
        >
          <span className="text-sm font-black">{icon.symbol}</span>
          <span className="text-[9px] opacity-60 tracking-wide">{icon.label}</span>
        </div>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-muted-foreground">
          {icon.label}
        </span>
      </motion.div>
    </motion.div>
  )
}

function AnimatedMeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-25 md:opacity-35"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.5), transparent 70%)",
          filter: "blur(60px)",
          left: "5%",
          top: "15%",
        }}
        animate={{ x: [0, 80, -30, 0], y: [0, -60, 30, 0], scale: [1, 1.15, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 md:opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(280, 80%, 65% / 0.5), transparent 70%)",
          filter: "blur(60px)",
          right: "5%",
          bottom: "15%",
        }}
        animate={{ x: [0, -60, 40, 0], y: [0, 80, -20, 0], scale: [1, 0.85, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 md:opacity-25"
        style={{
          background: "radial-gradient(circle, hsl(320, 80%, 65% / 0.5), transparent 70%)",
          filter: "blur(50px)",
          left: "35%",
          top: "45%",
        }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 50, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mesh grid - desktop only */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] hidden md:block">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(280, 80%, 60%)" />
          </linearGradient>
        </defs>
        {[...Array(12)].map((_, i) => (
          <motion.line
            key={`h-${i}`}
            x1="0"
            y1={`${(i + 1) * 8}%`}
            x2="100%"
            y2={`${(i + 1) * 8}%`}
            stroke="url(#lineGrad)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: i * 0.15 }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <motion.line
            key={`v-${i}`}
            x1={`${(i + 1) * 9}%`}
            y1="0"
            x2={`${(i + 1) * 9}%`}
            y2="100%"
            stroke="url(#lineGrad)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: i * 0.15 + 0.5 }}
          />
        ))}
      </svg>

      {/* Particles - desktop only */}
      <div className="hidden md:block">
        {useMemo(() =>
          [...Array(12)].map((_, i) => {
            const opacity = 0.2 + (i * 0.03) % 0.3
            const left = 10 + (i * 17) % 80
            const top = 10 + (i * 23) % 80
            const duration = 4 + (i * 0.7) % 3
            const delay = (i * 0.4) % 3
            return (
              <motion.div
                key={`p-${i}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: `hsl(var(--primary) / ${opacity})`,
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.15, 0.5, 0.15],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            )
          }), [])}
      </div>
    </div>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const nameChars = "Le Huy".split("")

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-60" />
      <AnimatedMeshGradient />

      {/* Mouse spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 500px 350px at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(var(--primary) / 0.06), transparent)`,
          transition: "background 0.3s ease",
        }}
      />

      {/* Floating icons */}
      {mounted && floatingIcons.map((icon, i) => (
        <FloatingIcon key={icon.label} icon={icon} index={i} />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Name */}
        <div className="overflow-hidden mb-4">
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                className={cn("inline-block", char === " " ? "w-2" : "")}
                initial={{ y: "100%", opacity: 0 }}
                animate={mounted ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: easeOutExpo as unknown as string }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-6"
        >
          <span className="text-base sm:text-lg md:text-xl font-light text-muted-foreground tracking-wide">
            Full-Stack Developer
          </span>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border">
            <motion.span
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-muted-foreground">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          Software Engineering student with a backend-leaning full-stack development
          background. Building practical systems that hold up under real use.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-wrap gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.05 }}
        >
          <motion.a
            href="#profile"
            className="px-7 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
            style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px hsl(var(--primary) / 0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Explore My Work
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ArrowDown className="w-4 h-4" />
            </motion.span>
          </motion.a>

          <motion.a
            href="https://github.com/lhcaps"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-xl font-semibold text-sm bg-secondary hover:bg-secondary/80 border border-border flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github className="w-4 h-4" />
            GitHub
          </motion.a>

          <motion.a
            href="mailto:huyle210525@gmail.com"
            className="px-7 py-3 rounded-xl font-semibold text-sm bg-secondary hover:bg-secondary/80 border border-border flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail className="w-4 h-4" />
            Contact
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium text-muted-foreground/50 tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[18px] h-[28px] rounded-full border border-muted-foreground/20 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-muted-foreground/30"
              animate={{ y: [0, 10, 0], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
