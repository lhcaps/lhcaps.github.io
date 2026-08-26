export const SYSTEM_IDS = [
  "form-management",
  "visionflow-studio",
  "production-booking-operations",
  "parkly",
  "tft-local-copilot",
] as const

export type SystemId = (typeof SYSTEM_IDS)[number]
export type SystemTier = "flagship" | "supporting"
export type ClaimClassification =
  | "VERIFIED_IMPLEMENTED"
  | "VERIFIED_LOCAL"
  | "VERIFIED_TESTED"
  | "DOCUMENTED_ONLY"
  | "PLANNED"
  | "UNVERIFIED"
  | "PRIVATE_DO_NOT_PUBLISH"
export type ReleaseAssertion = "VERIFIED" | "OBSERVED" | "INFERRED" | "BLOCKED"
export type SceneStatus = "untried" | "loading" | "ready" | "failed-sticky"
export type SceneSlot =
  | "left-far"
  | "center-far"
  | "right-far"
  | "left-mid"
  | "center-mid"
  | "right-mid"
  | "left-near"
  | "center-near"
  | "right-near"
  | "separate-bottom"
export type RouteKind = "dependency" | "transition" | "handoff" | "loop"

export interface PublicClaim {
  evidenceKey: string
  systemId: SystemId
  scope: string
  classification: ClaimClassification
  publicSafe: boolean
  limitation: string
}

export interface ClaimInstance {
  claimInstanceId: string
  evidenceKey: string
}

export interface TopologyLayer {
  id: string
  label: string
  meaning: string
}

export interface TopologyNode {
  id: string
  label: string
  responsibility: string
  layerId: string
  sceneSlot: SceneSlot
}

export interface TopologyRoute {
  id: string
  from: string
  to: string
  verb: string
  kind: RouteKind
  evidenceKey: string
}

export interface ActiveHandoff {
  routeId: string
  focusNodeId: string
  label?: string
}

export interface SystemTopology {
  layers: TopologyLayer[]
  nodes: TopologyNode[]
  routes: TopologyRoute[]
  activeHandoff: ActiveHandoff
}

export type NarrativeForm = "contract" | "cross-runtime" | "adaptation-loop" | "branch-strip" | "lab-note"

export interface SystemNarrative {
  form: NarrativeForm
  title: string
  lead: string
  details: string[]
  claimInstanceIds: string[]
}

export interface SystemDefinition {
  id: SystemId
  title: string
  tier: SystemTier
  order: number
  anchor: string
  publicAnchor: string
  summary: string
  evidenceBoundary: string
  evidenceKeys: string[]
  topology: SystemTopology
  narrative: SystemNarrative
}

export interface HarnessRow {
  id: string
  category: string
  acceptanceJob: string
  explanation: string
  assertion?: "OBSERVED" | "BLOCKED"
  limitation: string
}

export interface Capability {
  id: string
  title: string
  outcome: string
  systemIds: SystemId[]
}

export interface PortfolioGraph {
  identity: {
    name: string
    role: string
    target: string
    positioning: string
    strongestDimension: string
  }
  opening: {
    proposition: string
    atlasLead: string
    systemsLead: string
    primaryAction: string
  }
  contact: {
    email: string
    github: string
    cv: string
  }
  publication: {
    title: string
    description: string
    canonicalUrl: string
    repository: string
    ref: string
  }
  claims: PublicClaim[]
  claimInstances: ClaimInstance[]
  systems: SystemDefinition[]
  aiLifecycle: string[]
  harness: HarnessRow[]
  evidenceBoundary: {
    claimClassifications: ClaimClassification[]
    releaseAssertions: ReleaseAssertion[]
    excludedCategories: string[]
  }
  capabilities: Capability[]
}

export interface ValidationIssue {
  code: string
  path: string
}
