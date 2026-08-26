import { SYSTEM_IDS, type PortfolioGraph, type ValidationIssue } from "./types"
import { validateTopology } from "../atlas/core/topology"

const ALLOWED_DESTINATIONS = new Set([
  "huyle210525@gmail.com",
  "https://github.com/lhcaps",
  "/le-huy-software-engineer-cv.pdf",
])

const PROHIBITED_PUBLIC_VALUE_PATTERNS = [
  /[$€£]\s*\d/u,
  /\b[A-Z]-\d{3,}\b/u,
]

function addDuplicateIssues(
  values: readonly string[],
  code: string,
  pathFor: (index: number) => string,
  issues: ValidationIssue[],
): void {
  const seen = new Set<string>()
  values.forEach((value, index) => {
    if (seen.has(value)) {
      issues.push({ code, path: pathFor(index) })
    }
    seen.add(value)
  })
}

function walkStrings(value: unknown, path: string, visit: (text: string, path: string) => void): void {
  if (typeof value === "string") {
    visit(value, path)
    return
  }

  if (Array.isArray(value)) {
    value.forEach((entry, index) => walkStrings(entry, `${path}[${index}]`, visit))
    return
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => walkStrings(entry, path ? `${path}.${key}` : key, visit))
  }
}

export function validatePortfolio(graph: PortfolioGraph): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  for (const key of ["name", "role", "target", "positioning", "strongestDimension"] as const) {
    if (!graph.identity[key].trim()) {
      issues.push({ code: "IDENTITY_REQUIRED", path: `identity.${key}` })
    }
  }

  for (const key of ["email", "github", "cv"] as const) {
    if (!ALLOWED_DESTINATIONS.has(graph.contact[key])) {
      issues.push({ code: "DESTINATION_NOT_ALLOWED", path: `contact.${key}` })
    }
  }

  if (graph.systems.length !== SYSTEM_IDS.length) {
    issues.push({ code: "SYSTEM_COUNT", path: "systems" })
  }

  addDuplicateIssues(
    graph.systems.map((system) => system.id),
    "SYSTEM_ID_DUPLICATE",
    (index) => `systems[${index}].id`,
    issues,
  )

  const claimKeys = new Set(graph.claims.map((claim) => claim.evidenceKey))
  addDuplicateIssues(
    graph.claims.map((claim) => claim.evidenceKey),
    "CLAIM_KEY_DUPLICATE",
    (index) => `claims[${index}].evidenceKey`,
    issues,
  )

  graph.claims.forEach((claim, index) => {
    if (!claim.publicSafe) {
      issues.push({ code: "CLAIM_NOT_PUBLIC_SAFE", path: `claims[${index}].publicSafe` })
    }
    if (!claim.limitation.trim()) {
      issues.push({ code: "CLAIM_LIMITATION_REQUIRED", path: `claims[${index}].limitation` })
    }
  })

  addDuplicateIssues(
    graph.claimInstances.map((instance) => instance.claimInstanceId),
    "CLAIM_INSTANCE_ID_DUPLICATE",
    (index) => `claimInstances[${index}].claimInstanceId`,
    issues,
  )

  graph.claimInstances.forEach((instance, index) => {
    if (!claimKeys.has(instance.evidenceKey)) {
      issues.push({ code: "CLAIM_REFERENCE_UNKNOWN", path: `claimInstances[${index}].evidenceKey` })
    }
    if (Object.keys(instance).some((key) => key !== "claimInstanceId" && key !== "evidenceKey")) {
      issues.push({ code: "CLAIM_INSTANCE_OVERRIDE", path: `claimInstances[${index}]` })
    }
  })

  graph.systems.forEach((system, index) => {
    issues.push(...validateTopology(system, claimKeys, `systems[${index}]`))
  })

  walkStrings(graph, "", (text, path) => {
    if (PROHIBITED_PUBLIC_VALUE_PATTERNS.some((pattern) => pattern.test(text))) {
      issues.push({ code: "PUBLIC_VALUE_PROHIBITED", path })
    }
  })

  return issues
}

export function assertValidPortfolio(graph: PortfolioGraph): void {
  const issues = validatePortfolio(graph)
  if (issues.length > 0) {
    const summary = issues.map((issue) => `${issue.code}@${issue.path}`).join(", ")
    throw new Error(`Portfolio content validation failed: ${summary}`)
  }
}
