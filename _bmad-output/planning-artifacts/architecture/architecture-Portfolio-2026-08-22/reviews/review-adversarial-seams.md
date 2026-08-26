# Architecture Reviewer Gate — Adversarial-Seam Lens

**Verdict: PASS**

**Counts:** P0: 0 · P1: 0 · P2: 0

## Review basis

This final pass attacked the latest `ARCHITECTURE-SPINE.md`, `verification-contract.md`, and `epics.md`, including the Node 24 Action migration and all lifecycle, evidence, deployment, and history closures from the prior adversarial rounds. Live checks on 2026-08-23 confirmed Vite `8.0.16` exists, all six immutable GitHub Action commits equal their documented major tags, their official pinned `action.yml` interfaces still support the contracted inputs/outputs, and the architecture spine linter reports zero findings. Zero advisories remains a fail-closed acceptance rule; this architecture verdict does not assert that the brownfield source has already passed that implementation gate.

## Findings

No material adversarial finding remains.

## Attack matrix

| Attack | Result | Closure evidence |
| --- | --- | --- |
| Dependency gate cannot pass its own exact pins | **PASS** | Vite `8.0.16` exists and supports project Node `22.23.1`; the contract requires a zero-advisory audit and exposes no waiver surface. Source compliance remains an implementation gate rather than review evidence. |
| Reviewed workflow executes mutable upstream Action bytes | **PASS** | All six Node 24 Actions use verified full commit pins with adjacent major comments. The composite Pages uploader also pins its nested upload action by full SHA. |
| Migrated Action major drops a required interface | **PASS** | Checkout retains `fetch-depth`; setup-node retains `node-version`; upload-pages-artifact retains `name`, `path`, and `artifact_id`; deploy-pages retains `artifact_name`; upload-artifact retains `artifact-id` and `artifact-digest`. |
| Readiness review consumes an unbuilt producer | **PASS** | Story 4.1 pins PDF tooling before generation; 4.2 limits itself to local/build identity and leaves final-origin assertions to 4.11; 4.6 implements workflow/provenance plus the non-review verifier; 4.7 documents that implementation; 4.8 consumes Stories 4.1–4.7 and adds only review integration plus preupload closure. |
| Workflow permissions are missing, overbroad, or inherited | **PASS** | Top-level permissions are empty; build/provenance, deploy, and hosted-attestation maps are exact and statically reject extras or different scope. |
| Artifact digest is syntactic metadata only | **PASS** | The authenticated exact-ID download's raw outer archive SHA-256 must equal the REST `sha256:<64 lowercase hex>` before safe extraction. |
| Artifact name substitutes a different upload | **PASS** | Exact artifact ID/name, sole non-expired match, workflow run/head, archive digest, safe extraction, and PAGES-SITE-V1 equality are all required before the pinned deploy action consumes the exported name. |
| `dist` and deployed digest domains diverge | **PASS** | PAGES-SITE-V1 covers exact validated `artifacts/pages-site/`, including `release.json`; `dist/.vite/manifest.json` remains build-only. |
| Preupload evidence changes after its receipt | **PASS** | Preupload attestation contains the complete sorted path/byte/hash manifest; hosted-final subtracts only the closed hosted set and both attestation paths, then recomputes and equals every preupload record, count, and phase digest. |
| Hosted evidence adds an arbitrary or colliding file | **PASS** | Hosted additions are four exact release records plus manifest-listed production PNGs; collisions, missing/extra files, generic reporter mutation, links, and unsafe paths fail. |
| Phase attestations hide themselves or one another | **PASS** | Each phase excludes only its own exact self-attestation; hosted-final includes the validated preupload attestation and is the final generated-root mutation. |
| Production smoke root contradicts child results | **PASS** | Root passes iff all eleven required children exist in exact order, every child passes, and every limitation is empty; failure, duplication, reorder, extra, or narrowing forces root fail and release `PARTIAL`, with inconsistency fixtures. |
| Production smoke mutates generic Playwright evidence roots | **PASS** | Hosted Playwright persists only exact `production-smoke.v1.json` and production PNGs bound by the review manifest. |
| Production review replays or swaps screenshot evidence | **PASS** | Manifest records bind contained regular PNG paths, unique viewports, sizes, and raw bytes; attestation binds raw manifest bytes and deployed SHA; hosted-final binds the whole set. |
| ReviewSource/report self-reference permits report replay | **PASS** | Reports are excluded only from ReviewSourceV1, while the generated index binds exact candidate SHA/tree/source digest and every report's raw digest. |
| Confidential or internal output reaches Pages | **PASS** | Closed public source, verified staging projection, generated-output privacy scans, and no internal record in PAGES-SITE-V1 prevent the crossing. |
| History zero-target path pushes an ambient branch | **PASS** | Remote main is reread and the verified candidate uses an explicit refspec without force. |
| History positive-target rewrite changes more than the exact trailer | **PASS** | External verified bundle, exact-line callback, graph/tree/date/identity/message equivalence, recount, fresh verification, and exact force-with-lease are mandatory. |
| Probe context coexists with the real Canvas | **PASS** | The detached probe requires `WEBGL_lose_context`, caches true only after successful release and cleanup, and treats every absent/failing branch as unsupported. |
| Pending lazy chunk mounts after eligibility loss | **PASS** | `ScenePending → Bypassed` is explicit; delayed/aborted import tests require a later resolve to remain unmounted. |
| Late renderer failure retries or damages DOM state | **PASS** | Import, initialization, render, and `webglcontextlost` failures transition once to reload-only `failed-sticky`, unmount Canvas, clean listeners, and preserve DOM selection/focus. |
| Offscreen reselection performs invisible animation | **PASS** | It updates settled targets with no queued choreography or continuous invalidation and re-enters with at most one sync frame. |
| Branch advance is mislabeled complete | **PASS** | Remote-main divergence forces `branchAdvanced`, blocked deployment attestation, and `PARTIAL`; the newer SHA must attest independently. |

## Gate conclusion

The architecture, verification contract, and story sequence now close the reviewed release-provenance, digest/self-reference, generated-output privacy, dependency, history, Canvas, and current-tooling seams without a remaining material ambiguity. This adversarial gate passes.

## Node 24 pin record

| Action | Exact SHA | Major |
| --- | --- | --- |
| `actions/checkout` | `3d3c42e5aac5ba805825da76410c181273ba90b1` | `v7` |
| `actions/setup-node` | `820762786026740c76f36085b0efc47a31fe5020` | `v7` |
| `actions/configure-pages` | `45bfe0192ca1faeb007ade9deae92b16b8254a0d` | `v6` |
| `actions/upload-pages-artifact` | `fc324d3547104276b827a68afc52ff2a11cc49c9` | `v5` |
| `actions/deploy-pages` | `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128` | `v5` |
| `actions/upload-artifact` | `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a` | `v7` |

The Node 24 label describes the Actions runtime. The workflow still installs and asserts the separately pinned project toolchain, Node `22.23.1` and npm `11.12.1`.
