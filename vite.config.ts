import { execFileSync } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

const rootDirectory = path.dirname(fileURLToPath(import.meta.url))

function resolveReleaseSha(): string {
  const sha = process.env.VITE_COMMIT_SHA?.trim()
    ?? execFileSync("git", ["rev-parse", "HEAD"], { cwd: rootDirectory, encoding: "utf8" }).trim()

  if (!/^[a-f0-9]{40}$/.test(sha)) {
    throw new Error("VITE_COMMIT_SHA must be a full lowercase 40-character Git SHA")
  }

  return sha
}

function releaseIdentity(): Plugin {
  return {
    name: "closed-public-release-identity",
    apply: "build",
    generateBundle() {
      const identity = {
        schemaVersion: 1,
        sha: resolveReleaseSha(),
        repository: "lhcaps/lhcaps.github.io",
        ref: "refs/heads/main",
        canonicalUrl: "https://lhcaps.github.io/",
      }
      this.emitFile({
        type: "asset",
        fileName: "release.json",
        source: `${JSON.stringify(identity)}\n`,
      })
    },
  }
}

function chunkModuleInventory(): Plugin {
  return {
    name: "internal-chunk-module-inventory",
    apply: "build",
    generateBundle(_options, bundle) {
      const normalizeModuleId = (moduleId: string) => {
        if (moduleId.startsWith("\0")) return `virtual:${moduleId.slice(1)}`
        const relative = path.isAbsolute(moduleId) ? path.relative(rootDirectory, moduleId) : moduleId
        return relative.split(path.sep).join("/")
      }
      const chunks = Object.values(bundle)
        .filter((output) => output.type === "chunk")
        .map((chunk) => ({
          fileName: chunk.fileName,
          isEntry: chunk.isEntry,
          isDynamicEntry: chunk.isDynamicEntry,
          imports: [...chunk.imports].sort(),
          dynamicImports: [...chunk.dynamicImports].sort(),
          modules: Object.keys(chunk.modules).map(normalizeModuleId).sort(),
        }))
        .sort((left, right) => left.fileName.localeCompare(right.fileName, "en"))
      const outputDirectory = path.join(rootDirectory, "artifacts", "release")
      mkdirSync(outputDirectory, { recursive: true })
      writeFileSync(
        path.join(outputDirectory, "chunk-modules.v1.json"),
        `${JSON.stringify({ schemaVersion: 1, chunks }, null, 2)}\n`,
        "utf8",
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), releaseIdentity(), chunkModuleInventory()],
  resolve: {
    alias: {
      "@": path.resolve(rootDirectory, "src"),
    },
  },
  build: {
    manifest: true,
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
})
