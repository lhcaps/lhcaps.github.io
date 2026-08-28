# Current-Technology Reality Check — Architecture Update Reviewer Gate

**Verdict: PASS. P0 0, P1 0, P2 0.** The amended architecture, verification contract, and epics now use one consistent immutable Node 24 action matrix. The package, Vite, browser, PDF, artifact, and runtime assumptions remain current and implementation-ready.

**Review date:** 2026-08-23.  
**Scope:** `ARCHITECTURE-SPINE.md`, `verification-contract.md`, `epics.md`, the checked-in brownfield package/config/workflow state, live npm metadata, live action tags and pinned `action.yml` files, and current official Vite, Node, GitHub, React, and MDN documentation.

## Revalidated Action Matrix

Live `git ls-remote` resolution matched every declared major tag to the exact SHA below. The Architecture Spine's AD-12 and Stack table, Verification Contract, and Epic 4.6 all carry the same values; a scan of those three source contracts found no superseded pin.

| Action | Immutable pin | Runtime and interface conclusion |
| --- | --- | --- |
| checkout | `3d3c42e5aac5ba805825da76410c181273ba90b1 # v7` | `node24`; retains `fetch-depth`, so the non-shallow full-history contract is implementable. |
| setup-node | `820762786026740c76f36085b0efc47a31fe5020 # v7` | `node24`; retains exact `node-version` and npm-cache inputs. |
| configure-pages | `45bfe0192ca1faeb007ade9deae92b16b8254a0d # v6` | `node24`; retains the Pages metadata outputs used by the workflow. |
| upload-pages-artifact | `fc324d3547104276b827a68afc52ff2a11cc49c9 # v5` | Immutable composite; exposes `artifact_id`, creates `artifact.tar`, and nests Node 24 upload-artifact `bbbca2ddaa5d8feaa63e36b76fdaad77386f024f # v7.0.0`. The outer artifact archive plus inner Pages tar model therefore remains valid. |
| deploy-pages | `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128 # v5` | `node24`; retains `artifact_name` input and `page_url` output. |
| upload-artifact | `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7` | `node24`; retains `artifact-id`, `artifact-url`, and `artifact-digest` outputs for internal evidence. |

The action update closes the Node 20 runner-deprecation risk without changing the architecture's artifact-name, artifact-ID, archive-digest, Pages-environment, or least-privilege permission contracts.

## Revalidated Technology Decisions

| Area | Result | Evidence-backed conclusion |
| --- | --- | --- |
| Node/npm policy | PASS | Node `22.23.1` is an official LTS release. npm `11.12.1` accepts `^20.17.0 || >=22.9.0`; Vite `8.0.16` accepts `^20.19.0 || >=22.12.0`; pdf-parse `2.4.5` accepts Node `>=22.3.0`. The exact runtime pair is compatible. Action runtime Node 24 is independent of the project runtime installed by setup-node. |
| Exact package set | PASS | Every architecture-listed exact version is published and compatible. Registry peer ranges align across React/DOM `19.2.6`, R3F `9.6.1`, Three `0.182.0`, Vite `8.0.16`, Vitest/coverage `4.1.8`, and the remaining test/font/PDF tools. The final r182 pin predates the `THREE.Clock` deprecation warning emitted by r183+ through the verified R3F path; unused Drei and Framer Motion direct dependencies were removed from the final contract. |
| Vite 8 assumptions | PASS | Vite 8 is stable and Node `22.23.1` satisfies its floor. Current docs define `build.manifest: true` as `.vite/manifest.json` under `outDir` and retain `isEntry`, `imports`, `isDynamicEntry`, and `dynamicImports`, matching AD-10's deterministic closure model. Rolldown build/manifest fixtures remain mandatory. |
| Browser capability adapters | PASS | `matchMedia`, `IntersectionObserver`, `WEBGL_lose_context`, and `webglcontextlost` are established APIs. The architecture fails safe on probe/release/import/render/context failure, keeps the semantic DOM authoritative, unmounts on invalid eligibility, and caps Canvas DPR at `[1, 1.5]`. |
| Artifact REST/provenance | PASS | GitHub's artifact record exposes `id`, `name`, `expired`, `digest`, and `workflow_run.id/head_sha`; the download endpoint is ID-addressed. The Pages uploader exposes the ID, and the deployer accepts the exported name. AD-12's REST binding, raw outer-archive digest check, safe two-layer extraction, and PAGES-SITE-V1 rehash use real interfaces. |
| Pages staging boundary | PASS | Vite's hidden manifest remains build-only. Validated staging rejects dotfiles and internal records before upload, so the uploader's default hidden-file exclusion cannot silently change the PAGES-SITE-V1 public projection. |
| PDF toolchain | PASS | `pdf-lib` `1.17.1` and `pdf-parse` `2.4.5` are published, undeprecated exact releases compatible with Node `22.23.1`; deterministic regeneration, metadata, extraction/order, URI, encryption, page, and size checks close their relevant boundaries. |
| Latest Epic 4 ownership/order | PASS | Story 4.1 owns the exact PDF pins before generation; Story 4.2 owns local metadata and preview verification; Story 4.3 owns the remaining package/build matrix; Story 4.6 establishes the workflow, provenance fixtures, and canonical non-review `scripts/verify.mjs`; Story 4.7 documents that existing command; Story 4.8 adds only the finalized review child and preupload evidence closure. This delta changes implementation order and ownership without changing any reviewed version, runtime, action interface, or release boundary. |

## Brownfield Delivery Gates — Not Architecture Findings

| Current repository observation | Required implementation state |
| --- | --- |
| `package.json` still uses ranges and the pre-migration dependency/config surface. | Story 4.1 installs exact `pdf-lib`/`pdf-parse` pins before CV generation; Story 4.3 installs and validates the remaining matrix, regenerates the lockfile with npm `11.12.1`, and proves peer/runtime assertions plus zero advisories. |
| `.github/workflows/deploy.yml` is still the legacy build-only workflow. | Story 4.6 implements the reviewed AD-12 Node 24 immutable action matrix, exact job permissions, provenance fixtures, and the canonical non-review verifier composer; Story 4.8 later adds only review integration and preupload closure. |
| `vite.config.ts` lacks manifest, source-map, release-identity, and module-inventory behavior. | Implement and execute the Vite 8 build/manifest fixtures before accepting budget and provenance gates. |
| Release, staging, CV, review, history, and hosted-attestation scripts are not yet present. | Implement AD-10 through AD-16 and AD-19; these are planned delivery work, not architecture defects. |

## Official Sources

- [GitHub Node 20 deprecation and Node 24 migration](https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/)
- Exact action metadata: [checkout](https://github.com/actions/checkout/blob/3d3c42e5aac5ba805825da76410c181273ba90b1/action.yml), [setup-node](https://github.com/actions/setup-node/blob/820762786026740c76f36085b0efc47a31fe5020/action.yml), [configure-pages](https://github.com/actions/configure-pages/blob/45bfe0192ca1faeb007ade9deae92b16b8254a0d/action.yml), [upload-pages-artifact](https://github.com/actions/upload-pages-artifact/blob/fc324d3547104276b827a68afc52ff2a11cc49c9/action.yml), [deploy-pages](https://github.com/actions/deploy-pages/blob/cd2ce8fcbc39b97be8ca5fce6e763baed58fa128/action.yml), and [upload-artifact](https://github.com/actions/upload-artifact/blob/043fb46d1a93c77aae656e7c1c64a875d1fc6a0a/action.yml)
- [Vite 8 stable announcement and Node support](https://vite.dev/blog/announcing-vite8), [Vite build manifest option](https://vite.dev/config/build-options.html), and [Vite manifest schema](https://vite.dev/guide/backend-integration.html)
- [Node.js 22.23.1 LTS release](https://nodejs.org/en/blog/release/v22.23.1/), [React 19.2 version line](https://react.dev/versions), and [GitHub artifact REST API](https://docs.github.com/en/rest/actions/artifacts)
- [MDN `matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver), [`WEBGL_lose_context`](https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_lose_context), and [`webglcontextlost`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextlost_event)

## Gate Decision

**PASS for the current-technology architecture gate.** P0/P1/P2 findings are all zero. Remaining items are explicitly owned implementation and live-verification gates, not unresolved technology-contract defects.
