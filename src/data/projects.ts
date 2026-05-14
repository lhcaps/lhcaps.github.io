export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  problem: string
  built: string[]
  tags: string[]
  github: string
  color: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Parkly",
    subtitle: "Gate Operations Platform",
    description:
      "End-to-end gate management platform handling vehicle entry/exit sessions, review queues, incident handling, device health monitoring, and operational evidence.",
    problem: "Manual gate operations need review queues, incidents, device health, and evidence tracking.",
    built: [
      "Typed API contracts",
      "Prisma schema and migrations",
      "Redis/BullMQ background jobs",
      "Docker Compose runtime",
      "Verification scripts",
    ],
    tags: ["TypeScript", "React", "Express", "Prisma", "Redis", "BullMQ", "MariaDB", "Docker"],
    github: "https://github.com/lhcaps/parkly",
    color: "#4ADE80",
  },
  {
    id: 2,
    title: "VisionFlow Studio",
    subtitle: "Computer Vision Workflow Platform",
    description:
      "A CV workflow application covering media ingestion, dataset versioning, annotation pipelines, asynchronous inference, result review, and export.",
    problem: "CV teams need versioned datasets, annotation pipelines, and async inference tracking.",
    built: [
      "React workbenches with typed contracts",
      "Prisma-backed persistence",
      "FastAPI workers",
      "Playwright/Vitest test suites",
      "Turborepo monorepo",
    ],
    tags: ["TypeScript", "React", "Python/FastAPI", "Prisma", "Playwright", "Vitest", "Turborepo"],
    github: "https://github.com/lhcaps/Vision",
    color: "#FB923C",
  },
  {
    id: 3,
    title: "TFT Local Copilot",
    subtitle: "Local AI/RAG Assistant",
    description:
      "A local-first RAG assistant for Markdown and game data: ingestion, chunking, embeddings, vector retrieval, and streaming chat.",
    problem: "Local RAG needs ingestion, chunking, embeddings, and streaming responses without cloud dependencies.",
    built: [
      "React frontend with streaming UI",
      "FastAPI backend with Ollama integration",
      "pgvector semantic search",
      "n8n automation workflows",
      "Docker Compose local deployment",
    ],
    tags: ["React", "Vite", "FastAPI", "Ollama", "Supabase", "pgvector", "n8n", "Docker"],
    github: "https://github.com/lhcaps/TFT-CHATBOX",
    color: "#A78BFA",
  },
]
