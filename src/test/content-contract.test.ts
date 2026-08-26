import { describe, expect, it } from "vitest"
import { portfolio } from "@/content/portfolio"
import { assertValidPortfolio, validatePortfolio } from "@/content/validate"
import type { PortfolioGraph } from "@/content/types"

const clone = (): PortfolioGraph => structuredClone(portfolio)

describe("authoritative portfolio content", () => {
  it("accepts the canonical five-system graph", () => {
    expect(validatePortfolio(portfolio)).toEqual([])
    expect(() => assertValidPortfolio(portfolio)).not.toThrow()
    expect(portfolio.systems.map((system) => system.title)).toEqual([
      "Form Management",
      "VisionFlow Studio",
      "Production Booking & Operations Platform",
      "Parkly",
      "TFT Local Copilot",
    ])
  })

  it("rejects missing identity, destinations, and the wrong system catalog without echoing values", () => {
    const graph = clone()
    graph.identity.name = ""
    graph.contact.email = "private@example.invalid"
    graph.systems.pop()

    const issues = validatePortfolio(graph)
    expect(issues).toEqual(
      expect.arrayContaining([
        { code: "IDENTITY_REQUIRED", path: "identity.name" },
        { code: "DESTINATION_NOT_ALLOWED", path: "contact.email" },
        { code: "SYSTEM_COUNT", path: "systems" },
      ]),
    )
    expect(JSON.stringify(issues)).not.toContain("private@example.invalid")
  })

  it("rejects duplicate IDs and malformed topology references with stable paths", () => {
    const graph = clone()
    graph.systems[1].id = graph.systems[0].id
    graph.systems[0].topology.nodes[1].id = graph.systems[0].topology.nodes[0].id
    graph.systems[0].topology.routes[0].to = "missing-node"

    expect(validatePortfolio(graph)).toEqual(
      expect.arrayContaining([
        { code: "SYSTEM_ID_DUPLICATE", path: "systems[1].id" },
        { code: "NODE_ID_DUPLICATE", path: "systems[0].topology.nodes[1].id" },
        { code: "ROUTE_TO_UNKNOWN", path: "systems[0].topology.routes[0].to" },
      ]),
    )
  })

  it("rejects unsafe, missing, or overridden Claims", () => {
    const graph = clone()
    graph.claims[0].publicSafe = false
    graph.claims[1].limitation = ""
    graph.claims[2].evidenceKey = graph.claims[1].evidenceKey
    graph.claimInstances[1].claimInstanceId = graph.claimInstances[0].claimInstanceId
    graph.claimInstances[2].evidenceKey = "missing.claim"
    Object.assign(graph.claimInstances[3], { limitation: "override" })

    expect(validatePortfolio(graph)).toEqual(
      expect.arrayContaining([
        { code: "CLAIM_NOT_PUBLIC_SAFE", path: "claims[0].publicSafe" },
        { code: "CLAIM_LIMITATION_REQUIRED", path: "claims[1].limitation" },
        { code: "CLAIM_KEY_DUPLICATE", path: "claims[2].evidenceKey" },
        { code: "CLAIM_INSTANCE_ID_DUPLICATE", path: "claimInstances[1].claimInstanceId" },
        { code: "CLAIM_REFERENCE_UNKNOWN", path: "claimInstances[2].evidenceKey" },
        { code: "CLAIM_INSTANCE_OVERRIDE", path: "claimInstances[3]" },
      ]),
    )
  })

  it("rejects prohibited publication values but permits policy category labels", () => {
    const graph = clone()
    graph.systems[2].narrative.lead = "A client price was $199 for room A-101"
    const issues = validatePortfolio(graph)
    expect(issues).toContainEqual({ code: "PUBLIC_VALUE_PROHIBITED", path: "systems[2].narrative.lead" })
    expect(portfolio.evidenceBoundary.excludedCategories).toContain("price")
    expect(JSON.stringify(issues)).not.toContain("199")
    expect(JSON.stringify(issues)).not.toContain("A-101")
  })

  it("throws a safe aggregate error for invalid content", () => {
    const graph = clone()
    graph.identity.role = ""
    expect(() => assertValidPortfolio(graph)).toThrow("Portfolio content validation failed: IDENTITY_REQUIRED@identity.role")
  })
})
