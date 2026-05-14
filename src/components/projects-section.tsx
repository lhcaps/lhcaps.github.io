import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, ArrowRight } from "lucide-react"
import { easeOutExpo } from "@/lib/animations"

const projects = [
  {
    id: 1,
    title: "Parkly",
    subtitle: "Gate Operations Platform",
    description:
      "End-to-end gate management platform handling vehicle entry/exit sessions, review queues, incident handling, device health monitoring, and operational evidence. Architected and owned the entire backend: data modeling, typed API contracts, database migrations, Redis/BullMQ job queues, Docker Compose setup, and verification scripts for reproducible deployments.",
    tags: ["TypeScript", "React", "Express", "Prisma", "Redis", "BullMQ", "MariaDB", "Docker"],
    github: "https://github.com/lhcaps/parkly",
    color: "#10B981",
    gradient: "from-emerald-500/5 to-teal-500/5",
  },
  {
    id: 2,
    title: "VisionFlow Studio",
    subtitle: "Computer Vision Workflow Platform",
    description:
      "A CV workflow application covering media ingestion, dataset versioning, annotation pipelines, asynchronous inference, result review, and export. Integrated React workbenches with typed contracts, Prisma-backed persistence, FastAPI workers, Playwright/Vitest test suites, and reproducible local environments via Turborepo.",
    tags: ["TypeScript", "React", "Python/FastAPI", "Prisma", "Playwright", "Vitest", "Turborepo"],
    github: "https://github.com/lhcaps/Vision",
    color: "#F59E0B",
    gradient: "from-amber-500/5 to-orange-500/5",
  },
  {
    id: 3,
    title: "TFT Local Copilot",
    subtitle: "Local AI/RAG Assistant",
    description:
      "A local-first RAG assistant for Markdown and game data: ingestion, chunking, embeddings, vector retrieval, and streaming chat. Packaged frontend, backend, Ollama/Supabase runtime, and n8n automation into a repeatable local deployment with automated data refresh.",
    tags: ["React", "Vite", "FastAPI", "Ollama", "Supabase", "pgvector", "n8n", "Docker"],
    github: "https://github.com/lhcaps/TFT-CHATBOX",
    color: "#8B5CF6",
    gradient: "from-violet-500/5 to-purple-500/5",
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.85", "start 0.25"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1])

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{ opacity, y }}
    >
      <motion.div
        className={`relative p-6 md:p-8 rounded-2xl border border-border bg-gradient-to-br ${project.gradient} backdrop-blur-sm overflow-hidden`}
        style={{ scale }}
        whileHover={{ y: -6, borderColor: `${project.color}40` }}
        transition={{ duration: 0.3 }}
      >
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
          style={{
            background: `linear-gradient(90deg, ${project.color}, ${project.color}60)`,
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOutExpo as unknown as string }}
        />

        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${project.color}08, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.h3
                className="text-xl md:text-2xl font-bold mb-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="text-sm font-medium"
                style={{ color: project.color }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.05 }}
              >
                {project.subtitle}
              </motion.p>
            </div>

            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 text-muted-foreground" />
            </motion.a>
          </div>

          {/* Description */}
          <motion.p
            className="text-sm text-muted-foreground leading-relaxed mb-5 md:mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          >
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-1 rounded-md text-[10px] md:text-xs font-medium bg-secondary/80 text-muted-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + i * 0.03 }}
                whileHover={{ backgroundColor: `${project.color}15`, color: project.color }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold group/link"
            style={{ color: project.color }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            View on GitHub
            <motion.span
              className="inline-flex"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const numberOpacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 1])
  const numberScale = useTransform(scrollYProgress, [0.05, 0.12], [0.8, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 md:opacity-50" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] md:text-[12vw] font-black text-primary/[0.03] select-none pointer-events-none leading-none"
        style={{ y: bgY }}
      >
        WORK
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
            04
          </motion.span>
          <div>
            <motion.h2
              className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Selected Projects
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

        {/* Projects */}
        <div className="space-y-6 md:space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
