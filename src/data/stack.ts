export interface StackLayer {
  label: string
  tag: string
  accent: string
  items: string[]
}

export const stackLayers: StackLayer[] = [
  {
    label: 'Frontend',
    tag: 'UI / UX Layer',
    accent: '#67E8F9',
    items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Query', 'Zustand'],
  },
  {
    label: 'API',
    tag: 'Contract / Transport',
    accent: '#4ADE80',
    items: ['Express', 'FastAPI', 'REST', 'SSE', 'TypeScript', 'Node.js'],
  },
  {
    label: 'Data',
    tag: 'Persistence / ORM',
    accent: '#60A5FA',
    items: ['PostgreSQL', 'MariaDB', 'Redis', 'Prisma', 'pgvector', 'SQL'],
  },
  {
    label: 'Workers',
    tag: 'Queue / Runtime',
    accent: '#FB923C',
    items: ['BullMQ', 'Docker', 'Docker Compose', 'Playwright', 'CI/CD', 'n8n'],
  },
  {
    label: 'AI',
    tag: 'Inference / Vision',
    accent: '#A78BFA',
    items: ['Ollama', 'OpenCV', 'ONNX', 'RAG', 'Vector Search', 'FastAPI Workers'],
  },
]
