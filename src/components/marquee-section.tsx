import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const techStack = [
  "TypeScript",
  "React",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "AI/ML",
  "Computer Vision",
  "Clean Architecture",
  "REST APIs",
  "Prisma",
  "Redis",
  "Tailwind CSS",
  "Playwright",
  "Vitest",
]

export function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60])

  const doubledStack = [...techStack, ...techStack]

  return (
    <section
      ref={containerRef}
      className="relative py-12 md:py-16 overflow-hidden border-y border-border"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]) }}
      />

      <motion.div className="flex" style={{ opacity, y }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {doubledStack.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="mx-6 md:mx-8 flex items-center gap-3 md:gap-4 text-lg md:text-2xl lg:text-3xl font-bold text-muted-foreground/30"
            >
              <span
                className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--primary)), hsl(280, 80%, 60%))`,
                }}
              />
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
