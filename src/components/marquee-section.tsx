import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMemo } from "react"

const techStack = [
  "TypeScript", "React", "Node.js", "FastAPI", "PostgreSQL", "Docker",
  "AI/ML", "Computer Vision", "Clean Architecture", "REST APIs",
  "Prisma", "Redis", "Tailwind CSS", "Playwright", "Vitest", "Ollama",
  "pgvector", "React Query",
]

export function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [30, 0, 0, -30])

  const stars = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i, left: `${(i * 97) % 100}%`, top: `${(i * 71) % 100}%`, size: 1 + (i % 3) * 0.5, delay: i * 0.4,
  })), [])

  const doubledStack = [...techStack, ...techStack]

  return (
    <section ref={containerRef} className="relative py-12 md:py-16 overflow-hidden border-y" style={{ borderColor: "hsl(var(--border) / 0.3)" }}>
      {/* Star field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size, background: "hsl(var(--primary))" }}
            animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: [
            "linear-gradient(90deg, hsl(var(--bg)) 0%, transparent 12%)",
            "linear-gradient(90deg, transparent 88%, hsl(var(--bg)) 100%)",
          ].join(", "),
        }}
      />

      {/* Marquee */}
      <motion.div className="relative z-20" style={{ opacity, y }}>
        <div className="animate-marquee whitespace-nowrap">
          {doubledStack.map((tech, index) => (
            <div key={`${tech}-${index}`} className="mx-6 md:mx-10 flex items-center gap-3 md:gap-4">
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary))" }} />
              <span className="text-base md:text-xl lg:text-2xl font-semibold select-none tracking-tight"
                style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--muted-fg))", opacity: 0.25 }}>
                {tech}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
