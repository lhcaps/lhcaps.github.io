# Performance Budget

## Build Targets

| Metric | Target | Current |
|---|---|---|
| TypeScript errors | 0 | 0 |
| ESLint errors | 0 | 0 |
| Unit test pass rate | 100% | 100% |
| Production build | Pass | Pass |
| GLB total size | < 3 MB | N/A (not yet added) |

## 3D Scene Budget

| Constraint | Value |
|---|---|
| Canvas DPR | `[1, 1.5]` |
| `performance.min` | `0.5` |
| Max simultaneous point lights | 3 |
| Shadows | Disabled by default |
| Post-processing | None by default |
| GLB assets | Load via `useGLTF`, preload at app start |
| Fallback | Procedural meshes when GLB unavailable |

## Rendering Rules

- **No `setState` inside `useFrame`** — use refs and `lerp`.
- **DPR capped** at `[1, 1.5]` to limit GPU fill rate on high-DPI screens.
- **Lazy loading** — `RuntimeSceneImpl` loaded via `React.lazy`, shown only after hydration.
- **Mobile/reduced-motion fallback** — static HTML card shown when `isMobile === "mobile"` or `prefers-reduced-motion: reduce`.
- **Scene switch** — topology data from `runtimeConfig.ts`, not re-mounting scene objects.

## Bundle Budget

| Chunk | Target | Current |
|---|---|---|
| Main JS | < 2 MB gzip | ~423 KB gzip |
| CSS | < 20 KB gzip | ~5 KB gzip |
| Scene chunk | Lazy, < 500 KB | ~1 KB (wrapper only) |
| GLB assets | < 3 MB total | 0 (none yet) |

The main bundle is larger than ideal due to three.js + react-three-fiber being included. Code splitting ensures the scene chunk is deferred.

## Accessibility Budget

| Rule | Target |
|---|---|
| Color contrast (body text) | ≥ 4.5:1 where practical |
| Interactive elements | `:focus-visible` ring on all |
| Motion | `prefers-reduced-motion` respected |
| Mobile | Static fallback for WebGL-heavy sections |

## Adding GLB Assets

1. Place `.glb` files in `public/models/`.
2. Max file size: 3 MB per model.
3. Load with `useGLTF("/models/filename.glb")`.
4. Preload with `useGLTF.preload()`.
5. Always keep a procedural fallback visible while loading.
6. Do NOT import a missing GLB path directly — handle gracefully.

## CI Gates

```bash
npm run typecheck && npm run lint && npm run test && npm run build
```

All four commands must pass before merging.
