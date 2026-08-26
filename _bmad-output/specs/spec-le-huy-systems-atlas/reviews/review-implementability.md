# SPEC Implementability and Seam Review — Le Huy Systems Atlas

**Review date:** 2026-08-23  
**Verdict:** **PASS — implementation-ready contract**  
**Findings:** P0 0 · P1 0 · P2 0

## Decision

The current SPEC package, canonical UX contracts, architecture spine, and epic plan permit one compatible implementation of the typed content graph, DOM-first Atlas, optional scene, evidence/privacy pipeline, deterministic build, conditional history operation, and exact-SHA Pages release. Inputs, owners, outputs, failure behavior, and dependency order are closed at every load-bearing seam checked below.

## Implementation closure matrix

| Area | Implementable contract | Result |
| --- | --- | --- |
| Content graph | Five stable System IDs, closed Claim instances, reusable evidence keys, nodes, routes, semantic slots, narrative anchors, and required `focusNodeId` destinations have serializable fixtures and fail-closed validation. | Ready |
| DOM/scene ownership | React product state owns only `selectedSystemId`; the adapter owns `sceneStatus` with states `untried`, `loading`, `ready`, and `failed-sticky`; the scene receives immutable topology and cannot write product, focus, Claim, or navigation state. | Ready |
| WebGL eligibility | The one-shot detached probe requests one context, requires `WEBGL_lose_context`, invokes `loseContext()`, removes the probe canvas, and caches true only after successful release. Missing extension, release error, cleanup error, unsupported context, or context loss bypasses/fails sticky. | Ready |
| Lazy lifecycle and offscreen behavior | `ScenePending -> Bypassed` closes the delayed-import race when width, preference, support, or eligibility changes. Unmount/context-loss cleanup, one-context enforcement, settled-demand rendering, zero offscreen choreography/invalidation, and at most one re-entry snap frame are testable. | Ready |
| Motion/accessibility | Finite state transitions, Reduced Motion, keyboard/touch parity, semantic DOM equivalence, Canvas non-focusability, focus ownership, resize behavior, and the complete viewport matrix have named tests and browser gates. | Ready |
| Claims and confidentiality | Claim and release vocabularies are distinct; manifest keys and limitations are closed; public, private, generated, staged, and deployed boundaries have value-aware scans plus a non-sensitive confidentiality receipt. | Ready |
| Build and budgets | The exact stack includes Vite `8.0.16`. Vite manifest/module inventory, eager/lazy closure classification, gzip level and byte units, CSS/font/initial/static/CV limits, fixtures, and zero-advisory audit with no waiver surface are explicit. | Ready |
| Pages staging and Asset Inventory v1 | `scripts/stage-pages.mjs` copies validated public regular files byte-for-byte to fresh `artifacts/pages-site/`, excludes only internal `dist/.vite/**`, rejects every other unsafe/unexpected output, computes PAGES-SITE-V1, and writes a source-SHA/tree/digest-bound sorted file inventory with recomputable totals. | Ready |
| Local Release Evidence | The canonical orchestrator records every child before deciding exit, including command/category/result/exit/count/nonnegative integer `durationMs`/limitation, and always emits closed schema-v1 Release Evidence and Asset Inventory v1. | Ready |
| Independent reviews | Eight exact tracked review paths bind the clean candidate's SHA, tree, ReviewSourceV1 digest, raw report bytes, verdict, and finding disposition. Symlinks, escaping paths, dirty/untracked reports, stale source, or unresolved findings fail. | Ready |
| Generated evidence phases | `preupload` is written only after every local child output is final and contains the full sorted path/bytes/SHA-256 manifest. `hosted-final` admits only the exact hosted set, subtracts it plus attestation paths, recomputes and exactly matches the retained preupload projection, rejects collisions/removals/mutations, and is the final generated-root write. | Ready |
| Production smoke and screenshots | `artifacts/release/production-smoke.v1.json` has eleven fixed ordered checks with closed viewport/result/count/limitation fields and root-pass iff every child passes without limitation. Production PNGs bind path, viewport, bytes, and raw SHA-256 in `production-review-evidence.v1.json`; the attestation binds that manifest's raw digest. | Ready |
| Pages provenance | One `github-pages` upload uses exact `artifacts/pages-site/`, exports immutable artifact ID/name, verifies current run/head/non-expiry/uniqueness and REST `sha256:<64 lowercase hex>`, hashes the downloaded raw outer archive before safe outer/inner extraction, and re-proves PAGES-SITE-V1 before deployment. | Ready |
| Public identity and final attestation | The deployed five-field `release.json` is cache-busted and matched to workflow SHA, build source, starting ref, artifact provenance, production smoke, and remote branch. Branch advance produces `PARTIAL`; no invented Pages deployment-SHA is required. | Ready |
| Conditional history operation | Positive target count requires external verified bundle, identity audit, mechanically equivalent rewrite, explicit candidate refspec, and exact force-with-lease. Zero target count performs no rewrite and uses a normal explicit-refspec push after re-reading remote SHA. Neither path depends on upstream configuration. | Ready |
| Story dependencies | Epic 4 physically orders PDF pins before CV generation (4.1); local/build metadata and identity with hosted assertions deferred (4.2); build/stage (4.3); history/confidentiality rules (4.4); browser proof (4.5); workflow/provenance plus the non-review verifier (4.6); documentation of that implementation (4.7); review integration and preupload closure (4.8); conditional history (4.9); push/deploy (4.10); and final-origin production plus hosted-final proof (4.11). | Ready |

## Immutable workflow pins and permissions

The verification contract, AD-12, and Story 4.6 agree on:

| Action | Full pin | Major |
| --- | --- | --- |
| `actions/checkout` | `3d3c42e5aac5ba805825da76410c181273ba90b1` | `v7` |
| `actions/setup-node` | `820762786026740c76f36085b0efc47a31fe5020` | `v7` |
| `actions/configure-pages` | `45bfe0192ca1faeb007ade9deae92b16b8254a0d` | `v6` |
| `actions/upload-pages-artifact` | `fc324d3547104276b827a68afc52ff2a11cc49c9` | `v5` |
| `actions/deploy-pages` | `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128` | `v5` |
| `actions/upload-artifact` | `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a` | `v7` |

These six majors use the Node 24 Actions runtime. The workflow separately installs and asserts the project toolchain at Node `22.23.1` and npm `11.12.1`. Top-level permissions are empty. Build/provenance receives only `contents: read` and `actions: read`; deploy receives only `actions: read`, `pages: write`, and `id-token: write`; hosted attestation receives only `contents: read` and `actions: read`. Static validation rejects any broader or differently scoped map.

## Failure closure

Malformed schemas, path/link escapes, changed bytes, wrong SHA/tree, unsafe generated content, stale reviews, budget excess, advisory presence, incomplete smoke scope, a changed preupload projection, artifact/archive/site digest mismatch, branch advance, history tree drift, or an unrun required gate all have an explicit nonzero or `PARTIAL` outcome. No acceptance step relies on human inference to decide whether the release passed.

## Boundary

This is a contract implementability verdict, not evidence that the brownfield source already conforms. Implementation must still satisfy the ordered stories and produce fresh local plus hosted evidence for the final candidate SHA before `VERIFIED_COMPLETE` can be reported.
