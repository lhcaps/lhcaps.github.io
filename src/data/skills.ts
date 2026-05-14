export interface SkillLayer {
  id: string
  label: string
  description: string
  color: string
  skills: string[]
}

export const skillLayers: SkillLayer[] = [
  {
    id: "frontend",
    label: "Frontend Layer",
    description: "User interfaces that expose real operational state",
    color: "#67E8F9",
    skills: ["React", "Vite", "Tailwind CSS", "Framer Motion", "React Query", "Zustand"],
  },
  {
    id: "api",
    label: "API Layer",
    description: "Typed contracts, REST endpoints, and server-sent events",
    color: "#4ADE80",
    skills: ["Express", "FastAPI", "REST APIs", "SSE", "TypeScript", "Node.js"],
  },
  {
    id: "data",
    label: "Data Layer",
    description: "Reliable persistence with schema discipline",
    color: "#60A5FA",
    skills: ["PostgreSQL", "MariaDB", "Redis", "Prisma", "pgvector", "SQL"],
  },
  {
    id: "workers",
    label: "Automation Layer",
    description: "Background jobs, containerized runtimes, and CI/CD",
    color: "#FB923C",
    skills: ["BullMQ", "Docker", "Docker Compose", "Playwright", "CI/CD", "n8n"],
  },
  {
    id: "ai",
    label: "AI / CV Layer",
    description: "Local inference, vector retrieval, and CV pipelines",
    color: "#A78BFA",
    skills: ["Ollama", "OpenCV", "ONNX", "RAG", "Vector Search", "FastAPI Workers"],
  },
]
