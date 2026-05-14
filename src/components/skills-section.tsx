import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { easeOutExpo } from "@/lib/animations"

const skillCategories = [
  {
    label: "LANGUAGES",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
    color: "#3178C6",
  },
  {
    label: "FRONTEND",
    skills: ["React", "Vite", "Tailwind CSS", "React Query", "Zustand"],
    color: "#61DAFB",
  },
  {
    label: "BACKEND",
    skills: ["Node.js", "Express", "FastAPI", "REST APIs", "SSE", "Background Jobs"],
    color: "#339933",
  },
  {
    label: "DATABASE / INFRA",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Docker"],
    color: "#4169E1",
  },
  {
    label: "AI / CV",
    skills: ["Local RAG", "Vector Search", "Ollama", "pgvector", "OpenCV", "ONNX"],
    color: "#FF6F61",
  },
  {
    label: "QUALITY & ARCH",
    skills: ["Clean Architecture", "Typed Contracts", "Playwright", "Vitest", "CI/CD"],
    color: "#9B59B6",
  },
]

function SkillTag({
  skill,
  color,
  delay,
}: {
  skill: string
  color: string
  delay: number
}) {
  return (
    <motion.span
      className="inline-flex items-center px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-medium cursor-default"
      style={{
        backgroundColor: `${color}15`,
        border: `1px solid ${color}30`,
        color: color,
      }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay, ease: easeOutExpo as unknown as string }}
      whileHover={{
        scale: 1.08,
        borderColor: `${color}60`,
        boxShadow: `0 0 20px ${color}20`,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {skill}
    </motion.span>
  )
}

function SkillCategory({
  category,
  index,
}: {
  category: (typeof skillCategories)[0]
  index: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.3"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      style={{ opacity, y }}
    >
      <motion.div
        className="mb-3 md:mb-4 flex items-center gap-2 md:gap-3"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: easeOutExpo as unknown as string }}
      >
        <motion.div
          className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full"
          style={{ backgroundColor: category.color }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.25 }}
        />
        <h3 className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-muted-foreground">
          {category.label}
        </h3>
        <motion.div
          className="flex-1 h-px bg-border"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.05 + 0.2, ease: easeOutExpo as unknown as string }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>

      <div className="flex flex-wrap gap-1.5 md:gap-2">
        {category.skills.map((skill, i) => (
          <SkillTag
            key={skill}
            skill={skill}
            color={category.color}
            delay={index * 0.05 + i * 0.04}
          />
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const numberOpacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 1])
  const numberScale = useTransform(scrollYProgress, [0.05, 0.12], [0.8, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 md:opacity-50" />

      {/* Large background text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[16vw] font-black text-primary/[0.03] select-none pointer-events-none leading-none"
        style={{ y: bgY }}
      >
        SKILLS
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-3 md:gap-4 mb-10 md:mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo as unknown as string }}
        >
          <motion.span
            className="text-5xl md:text-6xl lg:text-7xl font-black text-primary/10 select-none"
            style={{ opacity: numberOpacity, scale: numberScale }}
          >
            02
          </motion.span>
          <div>
            <motion.h2
              className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Technical Skills
            </motion.h2>
            <motion.div
              className="h-px bg-primary/30 mt-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo as unknown as string }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-10 md:gap-y-8 lg:gap-x-12 lg:gap-y-10">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.label}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
