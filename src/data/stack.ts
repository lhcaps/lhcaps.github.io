export interface StackLayer {
  label: string
  tag: string
  accent: string
  purpose: string
  primary: string[]
  supporting?: string[]
}

export const stackLayers: StackLayer[] = [
  {
    label: 'Frontend',
    tag: 'UI Layer',
    accent: '#67E8F9',
    purpose: 'Interactive dashboard shell, motion system, and client workflow state.',
    primary: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    supporting: ['React Query', 'Zustand'],
  },
  {
    label: 'API',
    tag: 'Contract Layer',
    accent: '#4ADE80',
    purpose: 'Typed transport for product workflows, streaming updates, and backend boundaries.',
    primary: ['Express', 'FastAPI', 'REST', 'SSE'],
    supporting: ['TypeScript', 'Node.js'],
  },
  {
    label: 'Data',
    tag: 'Persistence Layer',
    accent: '#60A5FA',
    purpose: 'Relational state, cache, vector retrieval, and schema-driven persistence.',
    primary: ['PostgreSQL', 'Redis', 'Prisma', 'pgvector'],
    supporting: ['MariaDB', 'SQL'],
  },
  {
    label: 'Workers',
    tag: 'Runtime Layer',
    accent: '#FB923C',
    purpose: 'Background jobs, automation, verification, packaging, and local runtime.',
    primary: ['BullMQ', 'Docker', 'Playwright', 'CI/CD'],
    supporting: ['n8n', 'Docker Compose'],
  },
  {
    label: 'AI',
    tag: 'Inference Layer',
    accent: '#A78BFA',
    purpose: 'Local model workflows, retrieval, vision experiments, and async inference.',
    primary: ['Ollama', 'OpenCV', 'ONNX', 'RAG'],
    supporting: ['Vector Search', 'FastAPI Workers'],
  },
]
