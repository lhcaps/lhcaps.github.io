export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  problem: string
  built: string[]
  proof: string[]
  tags: string[]
  github: string
  color: string
  // Mini system visual config
  system: {
    layers: string[]
    archNodes: { label: string; tier: number }[]
  }
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Parkly",
    subtitle: "Gate Operations Platform",
    description: "End-to-end gate management platform handling vehicle entry/exit sessions, review queues, incident handling, device health monitoring, and operational evidence.",
    problem: "Manual gate operations need review queues, incidents, device health, and evidence tracking.",
    built: [
      "Typed API contracts",
      "Prisma schema and migrations",
      "Redis/BullMQ background jobs",
      "Docker Compose runtime",
      "Verification scripts",
    ],
    proof: [
      "Dockerized local runtime with one-command startup",
      "BullMQ worker queue for asynchronous session processing",
      "Prisma migrations with repeatable database setup",
    ],
    tags: ["TypeScript", "React", "Express", "Prisma", "Redis", "BullMQ", "MariaDB", "Docker"],
    github: "https://github.com/lhcaps/parkly",
    color: "#4ADE80",
    system: {
      layers: ["UI", "API", "DB", "Queue", "Worker"],
      archNodes: [
        { label: "Gate", tier: 0 },
        { label: "Session", tier: 1 },
        { label: "Review", tier: 2 },
        { label: "Incident", tier: 2 },
        { label: "Evidence", tier: 2 },
        { label: "Device", tier: 3 },
      ],
    },
  },
  {
    id: 2,
    title: "VisionFlow Studio",
    subtitle: "Computer Vision Workflow Platform",
    description: "A CV workflow application covering media ingestion, dataset versioning, annotation pipelines, asynchronous inference, result review, and export.",
    problem: "CV teams need versioned datasets, annotation pipelines, and async inference tracking.",
    built: [
      "React workbenches with typed contracts",
      "Prisma-backed persistence",
      "FastAPI workers",
      "Playwright/Vitest test suites",
      "Turborepo monorepo",
    ],
    proof: [
      "Turborepo monorepo with shared types across frontend/backend",
      "Playwright E2E tests covering all workflow stages",
      "FastAPI async inference pipeline with job queue",
    ],
    tags: ["TypeScript", "React", "Python/FastAPI", "Prisma", "Playwright", "Vitest", "Turborepo"],
    github: "https://github.com/lhcaps/Vision",
    color: "#FB923C",
    system: {
      layers: ["UI", "API", "DB", "Worker", "AI"],
      archNodes: [
        { label: "Media", tier: 0 },
        { label: "Dataset", tier: 1 },
        { label: "Annotate", tier: 2 },
        { label: "Inference", tier: 3 },
        { label: "Review", tier: 2 },
        { label: "Export", tier: 4 },
      ],
    },
  },
  {
    id: 3,
    title: "TFT Local Copilot",
    subtitle: "Local AI/RAG Assistant",
    description: "A local-first RAG assistant for Markdown and game data: ingestion, chunking, embeddings, vector retrieval, and streaming chat.",
    problem: "Local RAG needs ingestion, chunking, embeddings, and streaming responses without cloud dependencies.",
    built: [
      "React frontend with streaming UI",
      "FastAPI backend with Ollama integration",
      "pgvector semantic search",
      "n8n automation workflows",
      "Docker Compose local deployment",
    ],
    proof: [
      "Streaming responses via SSE — no polling required",
      "pgvector retrieval pipeline for local document chunks",
      "Fully offline — zero external API calls",
    ],
    tags: ["React", "Vite", "FastAPI", "Ollama", "Supabase", "pgvector", "n8n", "Docker"],
    github: "https://github.com/lhcaps/TFT-CHATBOX",
    color: "#A78BFA",
    system: {
      layers: ["UI", "API", "DB", "Queue", "AI"],
      archNodes: [
        { label: "Chunk", tier: 0 },
        { label: "Embed", tier: 1 },
        { label: "Vector DB", tier: 2 },
        { label: "Retriever", tier: 2 },
        { label: "Ollama", tier: 3 },
        { label: "Stream", tier: 4 },
      ],
    },
  },
]
