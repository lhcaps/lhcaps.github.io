export interface Project {
  id: string
  title: string
  subtitle: string
  sceneId: "parkly" | "visionflow" | "tft"
  description: string
  built: string[]
  proof: string[]
  tags: string[]
  github: string
  demo?: string
  color: string
}

export const projects: Project[] = [
  {
    id: "parkly",
    title: "Parkly",
    subtitle: "Gate operations platform.",
    sceneId: "parkly",
    description:
      "Entry/exit sessions, payment queues, and operator screens built around one source of truth. Docker Compose runtime with smoke-tested paths.",
    built: [
      "React operator dashboard",
      "Express API, typed contracts",
      "Prisma / MariaDB",
      "Redis / BullMQ",
      "Docker Compose",
      "Smoke tests",
    ],
    proof: [
      "Entry → payment → exit smoked against real DB",
      "Payment preserves fee truth across migrations",
      "Operator screens read backend state, not optimistic UI",
    ],
    tags: ["TypeScript", "React", "Express", "Prisma", "Redis", "BullMQ", "Docker"],
    github: "https://github.com/lhcaps/parkly",
    color: "oklch(78% 0.14 154)",
  },
  {
    id: "visionflow",
    title: "VisionFlow Studio",
    subtitle: "CV workflow platform.",
    sceneId: "visionflow",
    description:
      "Dataset management, annotation review, and async CV inference backed by shared TypeScript contracts. Turborepo monorepo.",
    built: [
      "React workbenches",
      "FastAPI CV worker",
      "Shared TS contracts",
      "Prisma persistence",
      "Job progress & logs",
      "Playwright verification",
    ],
    proof: [
      "Worker and API contracts stay aligned",
      "Inference jobs expose real backend logs",
      "Smoke checks cover worker health",
    ],
    tags: ["TypeScript", "React", "FastAPI", "Prisma", "Playwright", "Turborepo"],
    github: "https://github.com/lhcaps/Vision",
    color: "oklch(78% 0.13 58)",
  },
  {
    id: "tft",
    title: "TFT Local Copilot",
    subtitle: "Local RAG assistant.",
    sceneId: "tft",
    description:
      "Document ingestion, chunking, pgvector retrieval, Ollama streaming. No external model API. Full stack runs locally.",
    built: [
      "React + SSE streaming",
      "FastAPI + Ollama",
      "pgvector retrieval",
      "Docker Compose",
      "n8n automation",
    ],
    proof: [
      "SSE streaming — no fake loading loops",
      "Works without external model APIs",
      "Repeatable local testing",
    ],
    tags: ["React", "FastAPI", "Ollama", "PostgreSQL", "pgvector", "n8n", "Docker"],
    github: "https://github.com/lhcaps/TFT-CHATBOX",
    color: "oklch(74% 0.11 230)",
  },
]
