import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Reveal } from "@/lib/reveal"

const skillCategories = [
  { label: "LANGUAGES", skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"], color: "#60A5FA" },
  { label: "FRONTEND", skills: ["React", "Vite", "Tailwind CSS", "React Query", "Zustand"], color: "#67E8F9" },
  { label: "BACKEND", skills: ["Node.js", "Express", "FastAPI", "REST APIs", "SSE", "Background Jobs"], color: "#4ADE80" },
  { label: "DATABASE / INFRA", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Docker"], color: "#F472B6" },
  { label: "AI / CV", skills: ["Local RAG", "Vector Search", "Ollama", "pgvector", "OpenCV", "ONNX"], color: "#A78BFA" },
  { label: "QUALITY & ARCH", skills: ["Clean Architecture", "Typed Contracts", "Playwright", "Vitest", "CI/CD"], color: "#FB923C" },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section id="skills" ref={sectionRef} className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
      {/* Background watermark */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black select-none pointer-events-none leading-none section-num"
        style={{ y: bgY }}
      >
        SKILLS
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <Reveal direction="left" className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-5xl md:text-6xl lg:text-7xl font-black select-none leading-none pb-2 section-num">
            02
          </span>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "hsl(var(--muted-fg))" }}>
              Technical Skills
            </h2>
            <div className="accent-line mt-3" />
          </div>
        </Reveal>

        {/* Skill grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
          {skillCategories.map((category, ci) => (
            <Reveal key={category.label} direction="up" delay={ci * 0.07}>
              {/* Category header */}
              <div className="mb-3 md:mb-4 flex items-center gap-3">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: category.color, boxShadow: `0 0 8px ${category.color}60` }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: ci * 0.4 }}
                />
                <h3 className="text-[10px] md:text-xs font-bold tracking-wider uppercase" style={{ color: "hsl(var(--muted-fg))" }}>
                  {category.label}
                </h3>
                <div className="flex-1 h-px" style={{ background: `${category.color}18` }} />
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium"
                    style={{ background: `${category.color}10`, border: `1px solid ${category.color}25`, color: category.color }}
                    whileHover={{ scale: 1.08, borderColor: `${category.color}50` }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
