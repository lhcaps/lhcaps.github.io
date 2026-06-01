import { describe, it, expect } from "vitest"
import { projects } from "@/data/systems"

describe("projects", () => {
  it("has three projects", () => {
    expect(projects).toHaveLength(3)
  })

  it("every project has required fields", () => {
    for (const project of projects) {
      expect(project).toHaveProperty("id")
      expect(project).toHaveProperty("title")
      expect(project).toHaveProperty("subtitle")
      expect(project).toHaveProperty("description")
      expect(project).toHaveProperty("built")
      expect(project).toHaveProperty("proof")
      expect(project).toHaveProperty("tags")
      expect(project).toHaveProperty("github")
      expect(project).toHaveProperty("color")
    }
  })

  it("every project has non-empty title, description, and github", () => {
    for (const project of projects) {
      expect(project.title.length).toBeGreaterThan(0)
      expect(project.description.length).toBeGreaterThan(0)
      expect(project.github.length).toBeGreaterThan(0)
      expect(project.github).toMatch(/^https?:\/\//)
    }
  })

  it("every project has at least one built item and proof item", () => {
    for (const project of projects) {
      expect(project.built.length).toBeGreaterThan(0)
      expect(project.proof.length).toBeGreaterThan(0)
    }
  })

  it("tags array is non-empty for every project", () => {
    for (const project of projects) {
      expect(project.tags.length).toBeGreaterThan(0)
    }
  })
})
