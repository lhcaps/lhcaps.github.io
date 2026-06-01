export interface RuntimeNode {
  id: string
  label: string
  sublabel: string
  position: [number, number, number]
  color: string
  emissive: string
}

export interface RuntimeLink {
  from: string
  to: string
}

export type SystemId = "core" | "parkly" | "visionflow" | "tft"

export interface SystemScene {
  id: SystemId
  label: string
  tagline: string
  nodes: RuntimeNode[]
  links: RuntimeLink[]
}

export const systemScenes: Record<SystemId, SystemScene> = {
  core: {
    id: "core",
    label: "Runtime Core",
    tagline: "The base topology I return to on every project.",
    nodes: [
      {
        id: "ui",
        label: "React UI",
        sublabel: "Tailwind, TanStack Query, motion",
        position: [-2.8, 1.0, 0],
        color: "#60a5fa",
        emissive: "#1e3a5f",
      },
      {
        id: "api",
        label: "API",
        sublabel: "Express / FastAPI, typed contracts",
        position: [0, 1.3, 0],
        color: "#34d399",
        emissive: "#1a3a2e",
      },
      {
        id: "db",
        label: "SQL",
        sublabel: "Prisma, PostgreSQL, Redis",
        position: [2.8, 1.0, 0],
        color: "#f59e0b",
        emissive: "#3d2a06",
      },
      {
        id: "queue",
        label: "Queue",
        sublabel: "BullMQ, Redis workers",
        position: [0, -0.4, 0],
        color: "#a78bfa",
        emissive: "#2e1f4e",
      },
      {
        id: "proof",
        label: "Proof",
        sublabel: "Playwright, smoke tests, logs",
        position: [0, -1.9, 0],
        color: "#22c55e",
        emissive: "#0f3d1e",
      },
    ],
    links: [
      { from: "ui", to: "api" },
      { from: "api", to: "db" },
      { from: "api", to: "queue" },
      { from: "queue", to: "proof" },
      { from: "db", to: "queue" },
    ],
  },
  parkly: {
    id: "parkly",
    label: "Parkly",
    tagline: "Gate operations: session truth, payment queue, smoke-tested paths.",
    nodes: [
      {
        id: "gate",
        label: "Gate",
        sublabel: "Entry / Exit device",
        position: [0, 1.8, 0],
        color: "#34d399",
        emissive: "#1a3a2e",
      },
      {
        id: "session",
        label: "Session",
        sublabel: "Prisma, MariaDB, fee truth",
        position: [0, 0.7, 0],
        color: "#60a5fa",
        emissive: "#1e3a5f",
      },
      {
        id: "payment",
        label: "Payment",
        sublabel: "BullMQ, Redis queue",
        position: [-1.8, -0.4, 0],
        color: "#f59e0b",
        emissive: "#3d2a06",
      },
      {
        id: "review",
        label: "Review",
        sublabel: "Operator queue, audit log",
        position: [1.8, -0.4, 0],
        color: "#a78bfa",
        emissive: "#2e1f4e",
      },
      {
        id: "exit",
        label: "Exit",
        sublabel: "Smoke-tested close path",
        position: [0, -1.6, 0],
        color: "#22c55e",
        emissive: "#0f3d1e",
      },
    ],
    links: [
      { from: "gate", to: "session" },
      { from: "session", to: "payment" },
      { from: "session", to: "review" },
      { from: "payment", to: "exit" },
      { from: "review", to: "exit" },
      { from: "gate", to: "exit" },
    ],
  },
  visionflow: {
    id: "visionflow",
    label: "VisionFlow Studio",
    tagline: "Media pipeline: upload, annotate, infer, export.",
    nodes: [
      {
        id: "media",
        label: "Media",
        sublabel: "Upload, storage, thumbnails",
        position: [0, 1.8, 0],
        color: "#34d399",
        emissive: "#1a3a2e",
      },
      {
        id: "dataset",
        label: "Dataset",
        sublabel: "Prisma, media index",
        position: [-2.2, 0.6, 0],
        color: "#60a5fa",
        emissive: "#1e3a5f",
      },
      {
        id: "annotate",
        label: "Annotate",
        sublabel: "CV labeling, review flow",
        position: [2.2, 0.6, 0],
        color: "#f59e0b",
        emissive: "#3d2a06",
      },
      {
        id: "worker",
        label: "Worker",
        sublabel: "FastAPI CV inference, logs",
        position: [0, -0.7, 0],
        color: "#a78bfa",
        emissive: "#2e1f4e",
      },
      {
        id: "export",
        label: "Export",
        sublabel: "Results, reports, artifacts",
        position: [0, -2.0, 0],
        color: "#22c55e",
        emissive: "#0f3d1e",
      },
    ],
    links: [
      { from: "media", to: "dataset" },
      { from: "media", to: "annotate" },
      { from: "dataset", to: "worker" },
      { from: "annotate", to: "worker" },
      { from: "worker", to: "export" },
    ],
  },
  tft: {
    id: "tft",
    label: "TFT Local Copilot",
    tagline: "Local RAG: chunk, embed, retrieve, stream.",
    nodes: [
      {
        id: "chunk",
        label: "Chunk",
        sublabel: "Markdown parsing, split",
        position: [0, 1.8, 0],
        color: "#34d399",
        emissive: "#1a3a2e",
      },
      {
        id: "embed",
        label: "Embed",
        sublabel: "Ollama, local model",
        position: [-2.2, 0.2, 0],
        color: "#60a5fa",
        emissive: "#1e3a5f",
      },
      {
        id: "vectordb",
        label: "Vector DB",
        sublabel: "pgvector, retrieval index",
        position: [2.2, 0.2, 0],
        color: "#f59e0b",
        emissive: "#3d2a06",
      },
      {
        id: "retrieve",
        label: "Retrieve",
        sublabel: "Top-k, context assembly",
        position: [0, -1.0, 0],
        color: "#a78bfa",
        emissive: "#2e1f4e",
      },
      {
        id: "stream",
        label: "Stream",
        sublabel: "SSE, chat UI, local only",
        position: [0, -2.3, 0],
        color: "#22c55e",
        emissive: "#0f3d1e",
      },
    ],
    links: [
      { from: "chunk", to: "embed" },
      { from: "chunk", to: "vectordb" },
      { from: "embed", to: "retrieve" },
      { from: "vectordb", to: "retrieve" },
      { from: "retrieve", to: "stream" },
    ],
  },
}

export const defaultScene: SystemId = "core"
