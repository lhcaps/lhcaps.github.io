import { Text } from "@react-three/drei"
import type { RuntimeNode } from "@/data/runtimeConfig"

interface RuntimeDetailPanelProps {
  node: RuntimeNode | null
}

const DETAIL_CONTENT: Record<string, { detail: string; api?: string; db?: string; queue?: string; proof?: string }> = {
  ui: { detail: "React interface with typed state contracts.", api: "TanStack Query, typed request/response", db: "Optimistic UI backed by server state" },
  api: { detail: "Express or FastAPI with typed route contracts.", api: "REST routes, input validation, error contracts", db: "Schema-mapped persistence" },
  db: { detail: "PostgreSQL / MariaDB via Prisma ORM.", db: "Schema migrations, relational model", queue: "Fee writes, session state" },
  queue: { detail: "BullMQ with Redis-backed job queues.", queue: "Background payment jobs, retry policies", proof: "Job logs, completion events" },
  proof: { detail: "Playwright smoke tests, operational logs.", proof: "Smoke-tested entry/payment/exit paths" },
  gate: { detail: "Entry/Exit device integration layer.", api: "Device event ingestion" },
  session: { detail: "Single source of truth for gate sessions.", db: "MariaDB, Prisma, fee truth", queue: "Triggers payment job" },
  payment: { detail: "BullMQ background payment processing.", queue: "Payment job, retry on failure", proof: "Verified against real DB" },
  review: { detail: "Operator queue with audit trail.", queue: "Operator review events" },
  exit: { detail: "Smoke-tested close path from session.", proof: "Exit confirmation from backend state" },
  media: { detail: "Upload, storage, thumbnail generation.", api: "S3-compatible storage, signed URLs" },
  dataset: { detail: "Prisma-indexed media dataset.", db: "Prisma schema, media index", queue: "Triggers annotation pipeline" },
  annotate: { detail: "CV labeling with review workflow.", queue: "Annotation jobs, review events" },
  worker: { detail: "FastAPI CV inference worker.", api: "Worker client, job persistence", queue: "Inference jobs, result callbacks", proof: "Backend logs, job state" },
  export: { detail: "Results, reports, exported artifacts.", proof: "Reproducible export verification" },
  chunk: { detail: "Markdown parsing and text chunking.", api: "Chunking pipeline, size control" },
  embed: { detail: "Ollama local embedding generation.", api: "Embedding requests, batch processing" },
  vectordb: { detail: "pgvector retrieval index.", db: "pgvector schema, top-k retrieval" },
  retrieve: { detail: "Top-k context assembly from vector DB.", db: "Vector similarity search", api: "Context injection to model" },
  stream: { detail: "SSE streaming to chat UI.", api: "SSE endpoint, token streaming", proof: "No fake loading loops" },
}

export function RuntimeDetailPanel({ node }: RuntimeDetailPanelProps) {
  if (!node) return null
  const info = DETAIL_CONTENT[node.id]
  if (!info) return null

  return (
    <group position={[-3.0, 1.5, 0]}>
      <Text
        fontSize={0.09}
        color={node.color}
        anchorX="left"
        anchorY="top"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2"
        maxWidth={2.8}
      >
        {node.label}
      </Text>
      <Text
        position={[0, -0.18, 0]}
        fontSize={0.07}
        color="#94a3b8"
        anchorX="left"
        anchorY="top"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2"
        maxWidth={2.6}
      >
        {info.detail}
      </Text>
    </group>
  )
}
