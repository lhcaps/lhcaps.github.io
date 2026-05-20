export interface StackLayer {
  label: string
  tag: string
  accent: string
  purpose: string
  primary: string[]
  supporting?: string[]
  icon: "frontend" | "api" | "data" | "workers" | "ai"
}

export const stackLayers: StackLayer[] = [
  {
    label: "Frontend",
    tag: "State Surfaces",
    accent: "oklch(77% 0.11 210)",
    purpose: "Workflow screens, review tables, progress logs, and motion that explains state changes.",
    primary: ["React", "Vite", "Tailwind", "Framer Motion"],
    supporting: ["React Query", "Zustand"],
    icon: "frontend",
  },
  {
    label: "API",
    tag: "Contract Layer",
    accent: "oklch(78% 0.14 154)",
    purpose: "Typed transport for sessions, jobs, streaming updates, and backend boundaries.",
    primary: ["Express", "FastAPI", "REST", "SSE"],
    supporting: ["TypeScript", "Node.js"],
    icon: "api",
  },
  {
    label: "Data",
    tag: "Truth Store",
    accent: "oklch(74% 0.11 230)",
    purpose: "Relational state, cache, vector retrieval, and schema-driven persistence.",
    primary: ["PostgreSQL", "MariaDB", "Redis", "Prisma"],
    supporting: ["pgvector", "SQL"],
    icon: "data",
  },
  {
    label: "Workers",
    tag: "Runtime Layer",
    accent: "oklch(78% 0.13 58)",
    purpose: "Background jobs, automation, verification, packaging, and local service orchestration.",
    primary: ["BullMQ", "Docker", "Playwright", "CI/CD"],
    supporting: ["n8n", "Docker Compose"],
    icon: "workers",
  },
  {
    label: "AI / CV",
    tag: "Inference Layer",
    accent: "oklch(76% 0.1 310)",
    purpose: "Local model workflows, retrieval, vision experiments, and async inference review.",
    primary: ["Ollama", "OpenCV", "ONNX", "RAG"],
    supporting: ["Vector Search", "FastAPI Workers"],
    icon: "ai",
  },
]
