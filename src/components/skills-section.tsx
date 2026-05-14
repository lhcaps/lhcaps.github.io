import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Reveal } from "@/lib/reveal"

const skillCategories = [
  {
    label: "LANGUAGES",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
    color: "#60A5FA",
    dotColor: "#60A5FA",
  },
  {
    label: "FRONTEND",
    skills: ["React", "Vite", "Tailwind CSS", "React Query", "Zustand"],
    color: "#67E8F9",
    dotColor: "#67E8F9",
  },
  {
    label: "BACKEND",
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "SSE", "Background Jobs"],
    color: "#4ADE80",
    dotColor: "#4ADE80",
  },
  {
    label: "DATABASE / INFRA",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Docker"],
    color: "#F472B6",
    dotColor: "#F472B6",
  },
  {
    label: "AI / CV",
    skills: ["Local RAG", "Vector Search", "Ollama", "pgvector", "OpenCV", "ONNX"],
    color: "#A78BFA",
    dotColor: "#A78BFA",
  },
  {
    label: "QUALITY & ARCH",
    skills: ["Clean Architecture", "Typed Contracts", "Playwright", "Vitest", "CI/CD"],
    color: "#FB923C",
    dotColor: "#FB923C",
  },
]

function SkillTag({
  skill,
  color,
  index,
}: {
  skill: string
  color: string
  index: number
}) {
  return (
    <motion.span
      key={skill}
      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium select-none"
      style={{
        background: `${color}12`,
        border: `1px solid ${color}28`,
        color: color,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.07,
        borderColor: `${color}60`,
        background: `${color}1A`,
      }}
    >
      {skill}
    </motion.span>
  )
}

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0]
  index: number
}) {
  return (
    <Reveal direction="up" delay={index * 0.07}>
      <div className="glass-card rounded-2xl p-5 md:p-6">
        {/* Category header */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: category.color,
              boxShadow: `0 0 8px ${category.color}80`,
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.35 }}
          />
          <h3
            className="text-[10px] md:text-xs font-bold tracking-widest uppercase"
            style={{ color: category.color }}
          >
            {category.label}
          </h3>
          <div className="flex-1 h-px rounded-full" style={{ background: `${category.color}20` }} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, si) => (
            <SkillTag key={skill} skill={skill} color={category.color} index={si} />
          ))}
        </div>
      </div>
    </Reveal>
  )
}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.label} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
