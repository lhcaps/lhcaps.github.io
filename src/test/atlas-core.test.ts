import { describe, expect, it } from "vitest"
import { portfolio } from "@/content/portfolio"
import { claimForInstance, createClaimIndex } from "@/atlas/core/claims"
import { computeCanvasEligibility } from "@/atlas/core/eligibility"
import { createMotionPlan, createSceneTransitionPlan, motionPhaseAt, shouldInvalidate } from "@/atlas/core/motion"
import { SCENE_SLOT_POSITIONS, positionForSceneSlot } from "@/atlas/core/sceneSlots"
import { groupNodesByLayer, readableRoutes, resolveActiveHandoff, validateTopology } from "@/atlas/core/topology"

describe("Claim lookup", () => {
  it("indexes unique manifest entries and materializes instances", () => {
    const index = createClaimIndex(portfolio.claims)
    const instance = portfolio.claimInstances[0]
    expect(claimForInstance(instance, index)).toEqual({
      claimInstanceId: instance.claimInstanceId,
      ...index.get(instance.evidenceKey),
    })
  })

  it("rejects duplicate keys and missing references", () => {
    expect(() => createClaimIndex([portfolio.claims[0], portfolio.claims[0]])).toThrow("CLAIM_KEY_DUPLICATE")
    expect(() => claimForInstance({ claimInstanceId: "missing", evidenceKey: "missing" }, new Map())).toThrow(
      "CLAIM_REFERENCE_UNKNOWN",
    )
  })
})

describe("Canvas eligibility", () => {
  const base = {
    width: 1024,
    reducedMotion: false,
    webglSupported: true,
    hasEnteredViewport: true,
    sceneStatus: "untried" as const,
  }

  it.each([
    [{ ...base, width: 767 }, "narrow"],
    [{ ...base, reducedMotion: true }, "reduced-motion"],
    [{ ...base, webglSupported: false }, "webgl-unavailable"],
    [{ ...base, hasEnteredViewport: false }, "not-entered"],
    [{ ...base, sceneStatus: "failed-sticky" as const }, "failed-sticky"],
  ])("bypasses for %s", (input, reason) => {
    expect(computeCanvasEligibility(input)).toEqual({ eligible: false, reason })
  })

  it("allows an entered eligible viewport, including a healthy remount", () => {
    expect(computeCanvasEligibility(base)).toEqual({ eligible: true, reason: "eligible" })
    expect(computeCanvasEligibility({ ...base, sceneStatus: "ready" })).toEqual({ eligible: true, reason: "eligible" })
  })
})

describe("finite motion policy", () => {
  it("uses exact reconfigure and handoff windows", () => {
    expect(motionPhaseAt(0)).toBe("reconfigure")
    expect(motionPhaseAt(519)).toBe("reconfigure")
    expect(motionPhaseAt(520)).toBe("handoff")
    expect(motionPhaseAt(879)).toBe("handoff")
    expect(motionPhaseAt(880)).toBe("settled")
  })

  it("creates finite onscreen plans and immediate offscreen/reduced plans", () => {
    expect(createMotionPlan({ changed: true, visible: true, reducedMotion: false })).toEqual({
      phase: "reconfigure",
      reconfigureMs: 520,
      handoffMs: 360,
      animate: true,
    })
    expect(createMotionPlan({ changed: false, visible: true, reducedMotion: false }).phase).toBe("settled")
    expect(createMotionPlan({ changed: true, visible: false, reducedMotion: false }).animate).toBe(false)
    expect(createMotionPlan({ changed: true, visible: true, reducedMotion: true }).animate).toBe(false)
    expect(shouldInvalidate("reconfigure", true)).toBe(true)
    expect(shouldInvalidate("handoff", true)).toBe(true)
    expect(shouldInvalidate("settled", true)).toBe(false)
    expect(shouldInvalidate("reconfigure", false)).toBe(false)
  })

  it("animates first entry and visible selection changes without replaying offscreen work on re-entry", () => {
    expect(createSceneTransitionPlan({ firstRender: true, systemChanged: false, visible: true, wasVisible: null }).animate).toBe(true)
    expect(createSceneTransitionPlan({ firstRender: false, systemChanged: true, visible: true, wasVisible: true }).animate).toBe(true)
    expect(createSceneTransitionPlan({ firstRender: false, systemChanged: true, visible: false, wasVisible: true }).phase).toBe("settled")
    expect(createSceneTransitionPlan({ firstRender: false, systemChanged: true, visible: true, wasVisible: false }).phase).toBe("settled")
  })
})

describe("semantic scene slots", () => {
  it("owns the fixed ten-slot map", () => {
    expect(Object.keys(SCENE_SLOT_POSITIONS)).toHaveLength(10)
    expect(positionForSceneSlot("left-far")).toEqual([-2.4, 1.1, -0.9])
    expect(positionForSceneSlot("separate-bottom")).toEqual([0, -2.1, 0])
  })

  it("fails closed for an unknown slot", () => {
    expect(() => positionForSceneSlot("unknown" as never)).toThrow("SCENE_SLOT_UNKNOWN")
  })
})

describe("topology helpers", () => {
  it("validates and resolves every canonical topology", () => {
    const claimKeys = new Set(portfolio.claims.map((claim) => claim.evidenceKey))
    for (const system of portfolio.systems) {
      expect(validateTopology(system, claimKeys, `systems[${system.order - 1}]`)).toEqual([])
      const active = resolveActiveHandoff(system)
      expect(active.route.to).toBe(active.focusNode.id)
      expect(readableRoutes(system)).toHaveLength(system.topology.routes.length)
      expect(groupNodesByLayer(system).flatMap((group) => group.nodes)).toHaveLength(system.topology.nodes.length)
    }
  })

  it("preserves the Form preview branch without an Audit route", () => {
    const form = portfolio.systems[0]
    expect(readableRoutes(form)).toContain("DOCX Contract → governs → Temporary Preview")
    expect(
      form.topology.routes.some(
        (route) => route.from === "form-temporary-preview" && route.to === "form-audit-verification",
      ),
    ).toBe(false)
  })

  it("fails readable route projection when an endpoint is unresolved", () => {
    const system = structuredClone(portfolio.systems[0])
    system.topology.routes[0].from = "missing"
    expect(() => readableRoutes(system)).toThrow("ROUTE_ENDPOINT_UNKNOWN")
  })

  it("reports invalid layers, slots, routes, evidence, and handoff focus", () => {
    const system = structuredClone(portfolio.systems[3])
    system.topology.layers[1].id = system.topology.layers[0].id
    system.topology.nodes[0].layerId = "missing-layer"
    system.topology.nodes[1].sceneSlot = system.topology.nodes[0].sceneSlot
    system.topology.nodes[2].sceneSlot = "separate-bottom"
    system.topology.routes[0].kind = "unknown" as never
    system.topology.routes[1].evidenceKey = "missing"
    system.topology.activeHandoff.routeId = "missing-route"
    system.topology.activeHandoff.focusNodeId = "parkly-audit"

    expect(validateTopology(system, new Set(portfolio.claims.map((claim) => claim.evidenceKey)), "system")).toEqual(
      expect.arrayContaining([
        { code: "LAYER_ID_DUPLICATE", path: "system.topology.layers[1].id" },
        { code: "NODE_LAYER_UNKNOWN", path: "system.topology.nodes[0].layerId" },
        { code: "SCENE_SLOT_DUPLICATE", path: "system.topology.nodes[1].sceneSlot" },
        { code: "SCENE_SLOT_SEPARATE_UNAUTHORIZED", path: "system.topology.nodes[2].sceneSlot" },
        { code: "ROUTE_KIND_UNKNOWN", path: "system.topology.routes[0].kind" },
        { code: "ROUTE_EVIDENCE_UNKNOWN", path: "system.topology.routes[1].evidenceKey" },
        { code: "ACTIVE_ROUTE_UNKNOWN", path: "system.topology.activeHandoff.routeId" },
      ]),
    )
  })

  it("fails resolution when active route or focus is inconsistent", () => {
    const missingRoute = structuredClone(portfolio.systems[0])
    missingRoute.topology.activeHandoff.routeId = "missing"
    expect(() => resolveActiveHandoff(missingRoute)).toThrow("ACTIVE_ROUTE_UNKNOWN")

    const badFocus = structuredClone(portfolio.systems[0])
    badFocus.topology.activeHandoff.focusNodeId = "missing"
    expect(() => resolveActiveHandoff(badFocus)).toThrow("ACTIVE_FOCUS_UNKNOWN")

    const mismatch = structuredClone(portfolio.systems[0])
    mismatch.topology.activeHandoff.focusNodeId = "form-temporary-preview"
    expect(() => resolveActiveHandoff(mismatch)).toThrow("ACTIVE_FOCUS_MISMATCH")
  })

  it("reports required fields, duplicate routes, unknown slots, and active-focus failures", () => {
    const claimKeys = new Set(portfolio.claims.map((claim) => claim.evidenceKey))
    const required = structuredClone(portfolio.systems[0])
    required.topology.layers[0].label = ""
    required.topology.nodes[0].responsibility = ""
    required.topology.nodes[1].sceneSlot = "unknown" as never
    required.topology.routes[0].verb = ""
    required.topology.routes[1].id = required.topology.routes[0].id
    required.topology.activeHandoff.focusNodeId = "missing"

    expect(validateTopology(required, claimKeys, "system")).toEqual(
      expect.arrayContaining([
        { code: "LAYER_REQUIRED", path: "system.topology.layers[0]" },
        { code: "NODE_REQUIRED", path: "system.topology.nodes[0]" },
        { code: "SCENE_SLOT_UNKNOWN", path: "system.topology.nodes[1].sceneSlot" },
        { code: "ROUTE_REQUIRED", path: "system.topology.routes[0]" },
        { code: "ROUTE_ID_DUPLICATE", path: "system.topology.routes[1].id" },
        { code: "ACTIVE_FOCUS_UNKNOWN", path: "system.topology.activeHandoff.focusNodeId" },
      ]),
    )

    const mismatch = structuredClone(portfolio.systems[0])
    mismatch.topology.activeHandoff.focusNodeId = "form-temporary-preview"
    expect(validateTopology(mismatch, claimKeys, "system")).toContainEqual({
      code: "ACTIVE_FOCUS_MISMATCH",
      path: "system.topology.activeHandoff.focusNodeId",
    })
  })
})
