export interface Project {
  id: number
  title: string
  subtitle: string
  signal: string
  description: string
  problem: string
  role: string
  built: string[]
  proof: string[]
  tags: string[]
  github: string
  demo?: string
  screenshots?: string[]
  color: string
  system: {
    layers: string[]
    nodes: {
      id: string
      label: string
      x: number
      y: number
      kind?: "primary" | "process" | "storage" | "runtime"
    }[]
    connections: [string, string][]
  }
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Parkly",
    subtitle: "Gate Operations Platform",
    signal: "Gate sessions, payments, edge replay, operator review",
    description:
      "A parking operations platform handling entry/exit sessions, payment state, review queues, and device health. Built to run locally with Docker Compose.",
    problem:
      "Gate workflows break when each part of the system invents its own version of truth instead of sharing one source.",
    role:
      "Built the core operational path around one session truth, real payment contracts, and scripts that smoke the entry/payment/exit flow.",
    built: [
      "React operator dashboard",
      "Express REST API with typed contracts",
      "Prisma schema with repairable migrations",
      "Redis/BullMQ background payment jobs",
      "Docker Compose local runtime",
      "Smoke scripts for real entry/payment/exit paths",
    ],
    proof: [
      "Entry, payment, and exit flows can be smoked against the real database",
      "Payment writes preserve fee truth and avoid generated-column drift",
      "Operator screens read from backend state, not optimistic success paths",
    ],
    tags: ["TypeScript", "React", "Express", "Prisma", "Redis", "BullMQ", "MariaDB", "Docker"],
    github: "https://github.com/lhcaps/parkly",
    color: "oklch(78% 0.14 154)",
    system: {
      layers: ["UI", "API", "DB", "Queue", "Worker"],
      nodes: [
        { id: "gate", label: "Gate", x: 50, y: 13, kind: "primary" },
        { id: "session", label: "Session", x: 50, y: 33, kind: "primary" },
        { id: "review", label: "Review", x: 28, y: 55, kind: "process" },
        { id: "payment", label: "Payment", x: 50, y: 55, kind: "storage" },
        { id: "edge", label: "Edge", x: 72, y: 55, kind: "runtime" },
        { id: "exit", label: "Exit", x: 50, y: 78, kind: "runtime" },
      ],
      connections: [
        ["gate", "session"],
        ["session", "review"],
        ["session", "payment"],
        ["session", "edge"],
        ["review", "exit"],
        ["payment", "exit"],
        ["edge", "exit"],
      ],
    },
  },
  {
    id: 2,
    title: "VisionFlow Studio",
    subtitle: "Computer Vision Workflow Platform",
    signal: "Media ingestion, datasets, annotation, async inference",
    description:
      "A CV workflow platform for dataset management, annotation review, worker-backed inference, and exportable results. Built to run locally with Turborepo.",
    problem:
      "CV tools become fragile when the UI, worker output, and persisted job state drift apart and each shows a different story.",
    role:
      "Connected the FastAPI CV worker, shared contracts, API client, persistence, and job UI so progress is backed by real worker output.",
    built: [
      "React workbenches with shared TypeScript contracts",
      "FastAPI worker service",
      "API-side worker client and persistence",
      "Job progress and log surfaces",
      "Playwright and package-level verification",
      "Turborepo monorepo setup",
    ],
    proof: [
      "Worker and API contracts stay aligned through shared schemas",
      "Inference jobs expose backend logs and real progress state",
      "Smoke checks cover worker health and job creation",
    ],
    tags: ["TypeScript", "React", "Python", "FastAPI", "Prisma", "Playwright", "Turborepo"],
    github: "https://github.com/lhcaps/Vision",
    color: "oklch(78% 0.13 58)",
    system: {
      layers: ["UI", "API", "DB", "Worker", "AI"],
      nodes: [
        { id: "media", label: "Media", x: 50, y: 13, kind: "primary" },
        { id: "dataset", label: "Dataset", x: 50, y: 33, kind: "primary" },
        { id: "annotate", label: "Annotate", x: 28, y: 55, kind: "process" },
        { id: "review", label: "Review", x: 50, y: 55, kind: "process" },
        { id: "worker", label: "Worker", x: 72, y: 55, kind: "runtime" },
        { id: "export", label: "Export", x: 50, y: 78, kind: "runtime" },
      ],
      connections: [
        ["media", "dataset"],
        ["dataset", "annotate"],
        ["dataset", "review"],
        ["dataset", "worker"],
        ["annotate", "export"],
        ["review", "export"],
        ["worker", "export"],
      ],
    },
  },
  {
    id: 3,
    title: "TFT Local Copilot",
    subtitle: "Local RAG Assistant",
    signal: "Offline retrieval, streaming chat, local model loop",
    description:
      "A local-first assistant for game knowledge with document ingestion, chunking, embeddings, vector search, and streamed responses. No external model API required.",
    problem:
      "RAG systems fail quietly when ingestion, retrieval, and response streaming are treated as separate demos instead of one pipeline.",
    role:
      "Designed the local runtime path so chunks, vector retrieval, and the chat UI streaming state work as one verifiable loop.",
    built: [
      "React frontend with SSE streaming message state",
      "FastAPI backend with Ollama integration",
      "pgvector retrieval pipeline",
      "Docker Compose local deployment",
      "n8n automation experiments",
    ],
    proof: [
      "SSE streaming avoids fake loading loops",
      "Vector retrieval works without external model APIs",
      "The full stack runs locally for repeatable testing",
    ],
    tags: ["React", "Vite", "FastAPI", "Ollama", "PostgreSQL", "pgvector", "n8n", "Docker"],
    github: "https://github.com/lhcaps/TFT-CHATBOX",
    color: "oklch(74% 0.11 230)",
    system: {
      layers: ["UI", "API", "DB", "Queue", "AI"],
      nodes: [
        { id: "chunk", label: "Chunk", x: 50, y: 13, kind: "primary" },
        { id: "embed", label: "Embed", x: 30, y: 35, kind: "process" },
        { id: "vectordb", label: "Vector DB", x: 70, y: 35, kind: "storage" },
        { id: "retriever", label: "Retrieve", x: 50, y: 55, kind: "process" },
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
