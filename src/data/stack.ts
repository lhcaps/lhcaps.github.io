export interface StackGroup {
  label: string
  tag: string
  accent: string
  items: string[]
}

export const stackGroups: StackGroup[] = [
  {
    label: "UI",
    tag: "React, Tailwind, motion",
    accent: "oklch(77% 0.11 210)",
    items: ["React", "Vite", "Tailwind CSS", "TanStack Query", "Framer Motion"],
  },
  {
    label: "API",
    tag: "Node.js, Express, FastAPI",
    accent: "oklch(78% 0.14 154)",
    items: ["Node.js", "Express", "FastAPI", "REST", "SSE"],
  },
  {
    label: "Data",
    tag: "PostgreSQL, Redis, Prisma",
    accent: "oklch(74% 0.11 230)",
    items: ["PostgreSQL", "MariaDB", "Prisma", "Redis", "pgvector"],
  },
  {
    label: "Runtime",
    tag: "Docker, BullMQ, workers",
    accent: "oklch(78% 0.13 58)",
    items: ["Docker", "BullMQ", "Playwright", "Vitest", "n8n"],
  },
  {
    label: "AI / CV",
    tag: "RAG, Ollama, OpenCV",
    accent: "oklch(76% 0.1 310)",
    items: ["Ollama", "pgvector", "OpenCV", "ONNX", "Local RAG"],
  },
]
