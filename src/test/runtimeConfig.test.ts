import { describe, it, expect } from "vitest"
import { systemScenes, defaultScene } from "@/data/runtimeConfig"
import type { SystemId, RuntimeNode } from "@/data/runtimeConfig"

describe("runtimeConfig", () => {
  it("has all required project keys", () => {
    const requiredIds: SystemId[] = ["core", "parkly", "visionflow", "tft"]
    for (const id of requiredIds) {
      expect(systemScenes).toHaveProperty(id)
    }
  })

  it("defaultScene is a valid SystemId", () => {
    const ids: SystemId[] = ["core", "parkly", "visionflow", "tft"]
    expect(ids).toContain(defaultScene)
  })

  it("every topology has nodes and links", () => {
    const ids: SystemId[] = ["core", "parkly", "visionflow", "tft"]
    for (const id of ids) {
      const scene = systemScenes[id]
      expect(scene.nodes.length).toBeGreaterThan(0)
      expect(scene.links.length).toBeGreaterThan(0)
    }
  })

  it("every link references valid node IDs", () => {
    const ids: SystemId[] = ["core", "parkly", "visionflow", "tft"]
    for (const id of ids) {
      const scene = systemScenes[id]
      const nodeIds = new Set(scene.nodes.map((n) => n.id))
      for (const link of scene.links) {
        expect(nodeIds.has(link.from)).toBe(true)
        expect(nodeIds.has(link.to)).toBe(true)
      }
    }
  })

  it("every node has required fields", () => {
    const ids: SystemId[] = ["core", "parkly", "visionflow", "tft"]
    const requiredFields: (keyof RuntimeNode)[] = ["id", "label", "sublabel", "position", "color", "emissive"]
    for (const id of ids) {
      for (const node of systemScenes[id].nodes) {
        for (const field of requiredFields) {
          expect(node).toHaveProperty(field)
        }
        expect(node.position).toHaveLength(3)
      }
    }
  })

  it("every topology has label and tagline", () => {
    const ids: SystemId[] = ["core", "parkly", "visionflow", "tft"]
    for (const id of ids) {
      const scene = systemScenes[id]
      expect(typeof scene.label).toBe("string")
      expect(scene.label.length).toBeGreaterThan(0)
      expect(typeof scene.tagline).toBe("string")
      expect(scene.tagline.length).toBeGreaterThan(0)
    }
  })
})
