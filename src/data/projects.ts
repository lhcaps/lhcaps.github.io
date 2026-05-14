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
  system: {
    layers: string[]
    nodes: {
      id: string
      label: string
      x: number
      y: number
      kind?: 'primary' | 'process' | 'storage' | 'runtime'
    }[]
    connections: [string, string][]
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
      nodes: [
        { id: "gate", label: "Gate", x: 50, y: 13, kind: "primary" },
        { id: "session", label: "Session", x: 50, y: 33, kind: "primary" },
        { id: "review", label: "Review", x: 28, y: 55, kind: "process" },
        { id: "incident", label: "Incident", x: 50, y: 55, kind: "process" },
        { id: "evidence", label: "Evidence", x: 72, y: 55, kind: "storage" },
        { id: "device", label: "Device", x: 50, y: 78, kind: "runtime" },
      ],
      connections: [
        ["gate", "session"],
        ["session", "review"],
        ["session", "incident"],
        ["session", "evidence"],
        ["review", "device"],
        ["incident", "device"],
        ["evidence", "device"],
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
      nodes: [
        { id: "media", label: "Media", x: 50, y: 13, kind: "primary" },
        { id: "dataset", label: "Dataset", x: 50, y: 33, kind: "primary" },
        { id: "annotate", label: "Annotate", x: 28, y: 55, kind: "process" },
        { id: "review", label: "Review", x: 50, y: 55, kind: "process" },
        { id: "inference", label: "Inference", x: 72, y: 55, kind: "runtime" },
        { id: "export", label: "Export", x: 50, y: 78, kind: "runtime" },
      ],
      connections: [
        ["media", "dataset"],
        ["dataset", "annotate"],
        ["dataset", "review"],
        ["dataset", "inference"],
        ["annotate", "export"],
        ["review", "export"],
        ["inference", "export"],
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
      nodes: [
        { id: "chunk", label: "Chunk", x: 50, y: 13, kind: "primary" },
        { id: "embed", label: "Embed", x: 30, y: 35, kind: "process" },
        { id: "vectordb", label: "Vector DB", x: 70, y: 35, kind: "storage" },
        { id: "retriever", label: "Retriever", x: 50, y: 55, kind: "process" },
        { id: "ollama", label: "Ollama", x: 30, y: 78, kind: "runtime" },
        { id: "stream", label: "Stream", x: 70, y: 78, kind: "runtime" },
      ],
      connections: [
        ["chunk", "embed"],
        ["chunk", "vectordb"],
        ["embed", "retriever"],
        ["vectordb", "retriever"],
        ["retriever", "ollama"],
        ["retriever", "stream"],
      ],
    },
  },
]
