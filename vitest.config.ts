/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary"],
      thresholds: {
        lines: 85,
        functions: 85,
        statements: 85,
        branches: 80,
        "src/content/validate.ts": { 100: true },
        "src/atlas/core/claims.ts": { 100: true },
        "src/atlas/core/eligibility.ts": { 100: true },
        "src/atlas/core/motion.ts": { 100: true },
        "src/atlas/core/sceneSlots.ts": { 100: true },
        "src/atlas/core/topology.ts": { 100: true },
      },
    },
  },
})
