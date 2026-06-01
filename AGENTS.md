# Agent Guidelines — Le Huy Runtime Lab

This is a backend-heavy full-stack developer portfolio built with React/Vite/TypeScript.

## Core Principles

- **No generic AI portfolio clichés.** Direct, technical, confident copy.
- **3D scene = system map, not a toy.** Topology explains project architecture.
- **Performance is non-negotiable.** DPR capped at [1, 1.5]. No setState in useFrame.
- **Build must always pass.** Fix TypeScript errors and lint errors before committing.

## Quality Gates

Run before any PR:
```
npm run typecheck && npm run lint && npm run test && npm run build
```

## Scene Architecture

Topology lives in `src/data/runtimeConfig.ts`. Scene components live in `src/components/scene/`.
- Do NOT import missing GLB files directly — use procedural fallback.
- Keep scene components small. Use refs for per-frame animation.

## Copywriting Tone

Backend-heavy. System design mindset. Typed contracts, API boundaries, database schema, reproducible setup, verification/proof. Avoid: "passion", "cutting-edge", "seamless experiences".

## Rules Files

See `.cursor/rules/` for detailed per-area guidelines.
