# Le Huy Runtime Lab

A portfolio for Le Huy — backend-heavy full-stack developer with system design thinking.
Typed APIs, SQL data layers, queues, workers, AI/CV workflows, and React interfaces that
reflect real operational state.

## Live Site

https://lhcaps.github.io

## Stack

- **React 19** + **TypeScript** (strict mode)
- **Vite** — fast dev and build
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — page section animations
- **React Three Fiber** + **Drei** — 3D runtime diagram
- **Lucide React** — icons

## Architecture

The site is a React SPA with four sections:

| Section | Description |
|---|---|
| Hero | Name, positioning, 3D runtime diagram with project switcher |
| Systems | Project cards with topology diagrams and proof points |
| Stack | Five runtime-layer groups with tech items |
| Contact | Email, GitHub, location, and CV download |

The 3D scene renders project topologies as inspectable node-link graphs:
- `src/data/runtimeConfig.ts` — all topology data (nodes, links, metadata)
- `src/components/scene/` — R3F scene components
- `src/hooks/` — `useReducedMotion`, `useActiveSystem`, `useIsMobile`

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Quality Gates

All must pass before commit:

```bash
npm run typecheck   # TypeScript strict
npm run lint        # ESLint
npm run test        # Vitest unit tests
npm run build       # Production bundle
```

## Testing

```bash
# Unit tests (Vitest)
npm run test
npm run test:watch  # watch mode

# E2E tests (Playwright) — requires browser install
npx playwright install
npm run e2e
```

Unit tests cover:
- `runtimeConfig.ts` — all four topologies have nodes/links, links reference valid node IDs
- `projects.ts` — required fields, non-empty content, valid URLs

E2E tests cover:
- Page loads with correct title
- Hero headline visible
- Project switcher visible
- Systems and contact sections visible
- No critical console errors

## 3D Scene and GLB Assets

The scene uses a procedural fallback (`RuntimeCoreFallback`) by default. To add a Blender asset:

1. Model a low-poly server core: dark metal body, subtle emissive strips, floating platform, hologram ring.
2. Export as `.glb` to `public/models/runtime-core.glb`.
3. The model loads via `useGLTF("/models/runtime-core.glb")` in `RuntimeCoreModel.tsx`.
4. Keep the procedural fallback as a loading state.
5. Max GLB size: **3 MB total**.

## Performance Constraints

See `docs/performance-budget.md` for full details.

Key rules:
- Canvas DPR capped at `[1, 1.5]`.
- No `setState` inside `useFrame` — use refs.
- Mobile and reduced-motion users get a static fallback card.
- Scene chunk is lazy-loaded; not in the critical path.

## Deploy

Push to `main`. GitHub Actions builds `dist` and deploys to GitHub Pages.
