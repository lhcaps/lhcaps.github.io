# Le Huy Systems Atlas

An evidence-bound portfolio for Le Huy, a Software Engineer targeting full-time Junior roles. The public story is intentionally backend-leaning full-stack: typed contracts, state ownership, database and queue boundaries, browser-visible product work, and reproducible verification.

Production: <https://lhcaps.github.io/>

## What the Atlas means

The page is one English narrative with nine semantic chapters and five Systems:

1. Form Management
2. VisionFlow Studio
3. Production Booking & Operations Platform
4. Parkly
5. TFT Local Copilot

`src/content/portfolio.ts` is the authoritative public graph. It owns identity, destinations, Claim classifications and limitations, navigation, topology nodes and routes, narratives, the verification story, capabilities, and contact copy. Pure validators in `src/content/validate.ts` and `src/atlas/core/` reject missing references, duplicate anchors, unsafe routes, and invalid scene state before presentation code can hide the defect.

The semantic DOM is the product. The Atlas Canvas is a progressive system map derived from that same graph, not an independent data source or decorative toy. It has no orbit controls, ambient loop, exclusive information, or interactive focus. Exactly one lazy scene root may mount when the viewport is at least 768 px, motion is allowed, WebGL probes successfully, and the Atlas has entered view. Mobile, Reduced Motion, probe failure, context loss, and render failure keep the complete readable topology in DOM. A scene failure is sticky for the session.

## Architecture

- React 19, TypeScript 6 strict mode, and Vite 8 provide the application and deterministic production build.
- `src/components/sections/` renders the nine chapters; `src/components/atlas/` owns the selector and readable topology.
- `src/atlas/core/` contains framework-free eligibility, motion, topology, Claim, and scene-slot policies.
- `src/atlas/scene/` owns the sole demand-rendered React Three Fiber Canvas. DPR is capped at `[1, 1.5]`; per-frame work uses refs and never calls React state setters.
- Local Geologica Variable and Fragment Mono font packages keep the build independent of remote font services.
- `vite.config.ts` emits a closed five-field `release.json`, the internal Vite manifest, and a deterministic chunk/module inventory. The public UI neither fetches nor links internal release evidence.

## Prerequisites and development

The accepted toolchain is exact:

- Node.js `22.23.1`
- npm `11.12.1`

```bash
npm ci
npx playwright install chromium
npm run dev
```

Useful focused commands:

```bash
npm run typecheck
npm run lint
npm run test
npm run test:coverage
npm run test:release
npm run build
npm run e2e
```

## Canonical verification

Run the complete acceptance harness from a clean, non-shallow candidate commit:

```bash
npm run verify
```

The orchestrator composes the current gates in dependency order: reachable-history and generated-output safety, public content contracts, typecheck, zero-warning lint, release fixtures, unit/component tests, exact coverage thresholds, production build, output inspection, deterministic CV verification, the Chromium/axe browser matrix, zero-advisory dependency audit, byte-exact Pages staging, confidentiality receipt, numeric asset budgets, and eight source-bound reviews. It writes ignored ReleaseEvidenceV1, asset/review/history records, then creates the terminal `preupload` GeneratedEvidenceV1 attestation. Nothing in a declared generated root may change after that attestation.

The six critical contract files are held to 100% statements, branches, functions, and lines. Global coverage floors are 85% for statements, functions, and lines and 80% for branches. Playwright covers the exact viewport matrix plus widths on both sides of the 768/1024 breakpoints, normal and Reduced Motion, keyboard/touch selection, focus containment, direct anchors, successful and failed scene loading, console safety, link/metadata/CV endpoints, horizontal overflow, screenshots, and axe.

## Accessibility and fallback behavior

The release floor is WCAG 2.2 AA. Landmarks and chapter order are semantic; all five selection states are keyboard accessible and announced; mobile navigation traps and restores focus; touch targets are at least 44 px; anchor offsets account for the header; and Canvas is `aria-hidden`. Meaning never depends on hover, color, animation, or WebGL. Reduced Motion removes the scene chunk rather than merely slowing it.

## Performance contract

The enforced limits are measured from the validated `artifacts/pages-site/` graph with deterministic gzip level 9:

| Metric | Maximum |
| --- | ---: |
| Eager JavaScript | 170 KiB gzip |
| Lazy Atlas JavaScript | 425 KiB gzip |
| CSS | 25 KiB gzip |
| First-view fonts | 220 KiB raw |
| Initial transfer | 450 KiB |
| Largest static non-font asset | 256 KiB raw |
| CV | 512 KiB raw |

`npm run verify:budget` derives eager and Atlas ownership from `.vite/manifest.json`, checks the closed module inventory so Three.js cannot leak into the eager graph, traverses eager CSS to identify first-view fonts, and writes a SHA/tree/pages-site-bound inventory. See `docs/performance-budget.md` for the measurement definition and current reference values.

## Evidence Boundary

Public Claims use only the tracked public-safe graph and carry their classification and limitation. Raw project evidence, client identifiers, credentials, private paths, and unsupported production facts are never copied into the public build or release logs. `docs/portfolio-evidence/` is deliberately ignored; release scripts must not read it. The tracked confidentiality receipt binds public graph bytes plus every staged public byte except the separately validated closed `release.json`.

Claim evidence and release assertions are different vocabularies: a public Claim may be `Repository-backed`, `Derived`, or `Contextual`; a release observation may be `VERIFIED`, `OBSERVED`, `INFERRED`, or `BLOCKED`. Neither label upgrades the other.

## GitHub Pages release

Pushes to `main` run the same canonical verifier in a full-history checkout with immutable action pins, exact Node/npm versions, and least privilege. The workflow stages only validated public files, uploads the sole `github-pages` artifact, and deploys that immutable artifact. Hosted finalization binds workflow head, artifact ID and archive digest, extracted Pages-site digest, cache-busted public identity, remote `main`, eleven ordered desktop/mobile production smoke categories, and byte-bound production screenshots to one exact SHA. The final generated-evidence attestation is the workflow's last mutation.

`VERIFIED_COMPLETE` is valid only when the clean local candidate, hosted workflow, immutable Pages artifact, public `release.json`, remote branch, production desktop/mobile smoke, and production screenshot review all agree on that SHA. Any missing, stale, narrowed, advanced, or failing gate remains `PARTIAL`.
