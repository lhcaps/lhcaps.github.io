import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Github, ArrowRight } from "lucide-react"
import { Reveal } from "@/lib/reveal"

const projects = [
  {
    id: 1, title: "Parkly", subtitle: "Gate Operations Platform",
    description: "End-to-end gate management platform handling vehicle entry/exit sessions, review queues, incident handling, device health monitoring, and operational evidence. Architected the entire backend: data modeling, typed API contracts, database migrations, Redis/BullMQ job queues, Docker Compose setup, and verification scripts.",
    tags: ["TypeScript", "React", "Express", "Prisma", "Redis", "BullMQ", "MariaDB", "Docker"],
    github: "https://github.com/lhcaps/parkly", color: "#4ADE80",
  },
  {
    id: 2, title: "VisionFlow Studio", subtitle: "Computer Vision Workflow Platform",
    description: "A CV workflow application covering media ingestion, dataset versioning, annotation pipelines, asynchronous inference, result review, and export. Integrated React workbenches with typed contracts, Prisma-backed persistence, FastAPI workers, Playwright/Vitest test suites, and Turborepo.",
    tags: ["TypeScript", "React", "Python/FastAPI", "Prisma", "Playwright", "Vitest", "Turborepo"],
    github: "https://github.com/lhcaps/Vision", color: "#FB923C",
  },
  {
    id: 3, title: "TFT Local Copilot", subtitle: "Local AI/RAG Assistant",
    description: "A local-first RAG assistant for Markdown and game data: ingestion, chunking, embeddings, vector retrieval, and streaming chat. Packaged frontend, backend, Ollama/Supabase runtime, and n8n automation into a repeatable local deployment with automated data refresh.",
    tags: ["React", "Vite", "FastAPI", "Ollama", "Supabase", "pgvector", "n8n", "Docker"],
    github: "https://github.com/lhcaps/TFT-CHATBOX", color: "#A78BFA",
  },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function TiltCard({ project }: { project: (typeof projects)[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25, mass: 0.5 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25, mass: 0.5 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateX.set(-dy * 5)
    rotateY.set(dx * 7)
  }

  const handleMouseLeave = () => {
    rotateX.set(0); rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative p-6 md:p-8 rounded-2xl glass-card"
        style={{ borderColor: "hsl(var(--border))" }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl" style={{ background: project.color }} />

        {/* Spotlight on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}08 0%, transparent 60%)` }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1" style={{ color: project.color }}>{project.title}</h3>
              <p className="text-sm font-medium" style={{ color: "hsl(var(--muted-fg))" }}>{project.subtitle}</p>
            </div>
            <motion.a
              href={project.github} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors"
              style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--muted-fg) / 0.05)" }}
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              whileTap={{ scale: 0.92 }}
            >
              <Github className="w-5 h-5" style={{ color: "hsl(var(--muted-fg))" }} />
            </motion.a>
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: "hsl(var(--muted-fg))" }}>{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] md:text-xs font-medium"
                style={{ background: `${project.color}10`, border: `1px solid ${project.color}20`, color: project.color }}>
                {tag}
              </span>
            ))}
          </div>

          <motion.a
            href={project.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: project.color }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <span>View on GitHub</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black select-none pointer-events-none leading-none section-num"
        style={{ y: bgY }}
      >
        WORK
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <Reveal direction="left" className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-5xl md:text-6xl lg:text-7xl font-black select-none leading-none pb-2 section-num">
            04
          </span>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "hsl(var(--muted-fg))" }}>
              Selected Projects
            </h2>
            <div className="accent-line mt-3" />
          </div>
        </Reveal>

        <motion.div
          key="projects-list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-5 md:space-y-6"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}><TiltCard project={project} /></motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
