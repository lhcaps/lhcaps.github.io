import assert from "node:assert/strict"
import test from "node:test"
import { classifyManifestGraph, manifestClosure } from "../verify-budget.mjs"

test("manifest closure handles an entry-only graph", () => {
  const manifest = { entry: { file: "assets/entry.js", imports: [] } }
  assert.deepEqual([...manifestClosure(manifest, "entry", null, false)], ["entry"])
})

test("manifest graph assigns shared code to eager and includes nested Atlas dynamics", () => {
  const atlasKey = "src/atlas/scene/AtlasScene.tsx"
  const manifest = {
    "index.html": { file: "assets/entry.js", isEntry: true, imports: ["shared"], dynamicImports: [atlasKey] },
    shared: { file: "assets/shared.js", imports: [] },
    [atlasKey]: { file: "assets/atlas.js", isDynamicEntry: true, imports: ["shared"], dynamicImports: ["nested"] },
    nested: { file: "assets/nested.js", isDynamicEntry: true, imports: [] },
  }
  const graph = classifyManifestGraph(manifest)
  assert.deepEqual([...graph.eagerKeys].sort(), ["index.html", "shared"])
  assert.deepEqual([...graph.atlasKeys].sort(), [atlasKey, "nested"].sort())
  assert.deepEqual(Object.fromEntries([...graph.roleByFile].sort()), {
    "assets/atlas.js": "atlas-js",
    "assets/entry.js": "eager-js",
    "assets/nested.js": "atlas-js",
    "assets/shared.js": "eager-js",
  })
})

test("manifest graph fails closed on cycles, missing nodes, extra roots, and orphan JavaScript", () => {
  const atlasKey = "src/atlas/scene/AtlasScene.tsx"
  assert.throws(() => manifestClosure({ a: { file: "a.js", imports: ["b"] }, b: { file: "b.js", imports: ["a"] } }, "a", null, false), /CYCLE/)
  assert.throws(() => manifestClosure({ a: { file: "a.js", imports: ["missing"] } }, "a", null, false), /REFERENCE_MISSING/)
  assert.throws(() => classifyManifestGraph({
    "index.html": { file: "entry.js", isEntry: true, dynamicImports: [atlasKey, "other"] },
    [atlasKey]: { file: "atlas.js", isDynamicEntry: true },
    other: { file: "other.js", isDynamicEntry: true },
  }), /DYNAMIC_ROOT_INVALID/)
  assert.throws(() => classifyManifestGraph({
    "index.html": { file: "entry.js", isEntry: true, dynamicImports: [atlasKey] },
    [atlasKey]: { file: "atlas.js", isDynamicEntry: true },
    orphan: { file: "orphan.js" },
  }), /JS_UNCLASSIFIED/)
})
