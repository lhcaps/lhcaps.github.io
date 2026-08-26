import type {
  PublicClaim,
  RouteKind,
  SceneSlot,
  SystemDefinition,
  TopologyLayer,
  TopologyNode,
  TopologyRoute,
  ValidationIssue,
} from "@/content/types"
import { SCENE_SLOT_POSITIONS } from "./sceneSlots"

const ROUTE_KINDS = new Set<RouteKind>(["dependency", "transition", "handoff", "loop"])
const SCENE_SLOTS = new Set<SceneSlot>(Object.keys(SCENE_SLOT_POSITIONS) as SceneSlot[])

export interface LayerGroup {
  layer: TopologyLayer
  nodes: TopologyNode[]
}

export interface ResolvedHandoff {
  route: TopologyRoute
  focusNode: TopologyNode
}

function duplicateIssues<T>(
  values: readonly T[],
  valueFor: (value: T) => string,
  code: string,
  pathFor: (index: number) => string,
): ValidationIssue[] {
  const seen = new Set<string>()
  const issues: ValidationIssue[] = []

  values.forEach((value, index) => {
    const key = valueFor(value)
    if (seen.has(key)) {
      issues.push({ code, path: pathFor(index) })
    }
    seen.add(key)
  })

  return issues
}

export function groupNodesByLayer(system: SystemDefinition): LayerGroup[] {
  return system.topology.layers.map((layer) => ({
    layer,
    nodes: system.topology.nodes.filter((node) => node.layerId === layer.id),
  }))
}

export function readableRoutes(system: SystemDefinition): string[] {
  const nodes = new Map(system.topology.nodes.map((node) => [node.id, node]))

  return system.topology.routes.map((route) => {
    const from = nodes.get(route.from)
    const to = nodes.get(route.to)
    if (!from || !to) {
      throw new Error("ROUTE_ENDPOINT_UNKNOWN")
    }
    return `${from.label} → ${route.verb} → ${to.label}`
  })
}

export function resolveActiveHandoff(system: SystemDefinition): ResolvedHandoff {
  const route = system.topology.routes.find((candidate) => candidate.id === system.topology.activeHandoff.routeId)
  if (!route) {
    throw new Error("ACTIVE_ROUTE_UNKNOWN")
  }

  const focusNode = system.topology.nodes.find(
    (candidate) => candidate.id === system.topology.activeHandoff.focusNodeId,
  )
  if (!focusNode) {
    throw new Error("ACTIVE_FOCUS_UNKNOWN")
  }

  if (route.to !== focusNode.id) {
    throw new Error("ACTIVE_FOCUS_MISMATCH")
  }

  return { route, focusNode }
}

export function validateTopology(
  system: SystemDefinition,
  claimKeys: ReadonlySet<PublicClaim["evidenceKey"]>,
  basePath: string,
): ValidationIssue[] {
  const { topology } = system
  const issues: ValidationIssue[] = []
  const layerIds = new Set(topology.layers.map((layer) => layer.id))
  const nodeIds = new Set(topology.nodes.map((node) => node.id))
  const routeIds = new Set(topology.routes.map((route) => route.id))

  issues.push(
    ...duplicateIssues(topology.layers, (layer) => layer.id, "LAYER_ID_DUPLICATE", (index) => `${basePath}.topology.layers[${index}].id`),
    ...duplicateIssues(topology.nodes, (node) => node.id, "NODE_ID_DUPLICATE", (index) => `${basePath}.topology.nodes[${index}].id`),
    ...duplicateIssues(topology.nodes, (node) => node.sceneSlot, "SCENE_SLOT_DUPLICATE", (index) => `${basePath}.topology.nodes[${index}].sceneSlot`),
    ...duplicateIssues(topology.routes, (route) => route.id, "ROUTE_ID_DUPLICATE", (index) => `${basePath}.topology.routes[${index}].id`),
  )

  topology.layers.forEach((layer, index) => {
    if (!layer.id || !layer.label || !layer.meaning) {
      issues.push({ code: "LAYER_REQUIRED", path: `${basePath}.topology.layers[${index}]` })
    }
  })

  topology.nodes.forEach((node, index) => {
    const nodePath = `${basePath}.topology.nodes[${index}]`
    if (!node.id || !node.label || !node.responsibility) {
      issues.push({ code: "NODE_REQUIRED", path: nodePath })
    }
    if (!layerIds.has(node.layerId)) {
      issues.push({ code: "NODE_LAYER_UNKNOWN", path: `${nodePath}.layerId` })
    }
    if (!SCENE_SLOTS.has(node.sceneSlot)) {
      issues.push({ code: "SCENE_SLOT_UNKNOWN", path: `${nodePath}.sceneSlot` })
    }
    if (node.sceneSlot === "separate-bottom" && !(system.id === "parkly" && node.id === "parkly-outbox")) {
      issues.push({ code: "SCENE_SLOT_SEPARATE_UNAUTHORIZED", path: `${nodePath}.sceneSlot` })
    }
  })

  topology.routes.forEach((route, index) => {
    const routePath = `${basePath}.topology.routes[${index}]`
    if (!route.id || !route.verb) {
      issues.push({ code: "ROUTE_REQUIRED", path: routePath })
    }
    if (!nodeIds.has(route.from)) {
      issues.push({ code: "ROUTE_FROM_UNKNOWN", path: `${routePath}.from` })
    }
    if (!nodeIds.has(route.to)) {
      issues.push({ code: "ROUTE_TO_UNKNOWN", path: `${routePath}.to` })
    }
    if (!ROUTE_KINDS.has(route.kind)) {
      issues.push({ code: "ROUTE_KIND_UNKNOWN", path: `${routePath}.kind` })
    }
    if (!claimKeys.has(route.evidenceKey)) {
      issues.push({ code: "ROUTE_EVIDENCE_UNKNOWN", path: `${routePath}.evidenceKey` })
    }
  })

  if (!routeIds.has(topology.activeHandoff.routeId)) {
    issues.push({ code: "ACTIVE_ROUTE_UNKNOWN", path: `${basePath}.topology.activeHandoff.routeId` })
  } else {
    const route = topology.routes.find((candidate) => candidate.id === topology.activeHandoff.routeId)
    if (!nodeIds.has(topology.activeHandoff.focusNodeId)) {
      issues.push({ code: "ACTIVE_FOCUS_UNKNOWN", path: `${basePath}.topology.activeHandoff.focusNodeId` })
    } else if (route?.to !== topology.activeHandoff.focusNodeId) {
      issues.push({ code: "ACTIVE_FOCUS_MISMATCH", path: `${basePath}.topology.activeHandoff.focusNodeId` })
    }
  }

  return issues
}
