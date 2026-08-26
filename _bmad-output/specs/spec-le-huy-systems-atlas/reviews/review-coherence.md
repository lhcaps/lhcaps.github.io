# SPEC Coherence Review — Le Huy Systems Atlas

**Review date:** 2026-08-23  
**Verdict:** **PASS**  
**Findings:** P0 0 · P1 0 · P2 0

## Scope and authority

This review rechecked the current `SPEC.md`, its six local companions, the bound canonical `DESIGN.md`, `EXPERIENCE.md`, and `ARCHITECTURE-SPINE.md`, the three declared traceability sources, and the latest `epics.md`. The SPEC and its declared companions remain implementation authority; PRD, addendum, and `PRODUCT.md` remain traceability sources, while the epics are a downstream execution plan.

All nine companion paths and all three source paths declared by `SPEC.md` resolve. `CAP-1` through `CAP-7` each occur once as capability records and remain bound by the architecture spine and the epic coverage model.

## Spec-law checks

| Law | Current evidence | Result |
| --- | --- | --- |
| Intent and observable success | Every CAP record has a distinct `intent` and `success`; the final signal is closed to `VERIFIED_COMPLETE` or `PARTIAL`. | Pass |
| WHAT versus HOW | The kernel owns product outcomes and hard constraints. Content schemas, topology fixtures, scene mechanics, verification encodings, deployment, and migration mechanics live in typed companions and architecture decisions. | Pass |
| Real constraints | One lazy Canvas, DPR `[1, 1.5]`, no frame-loop React state, sub-`768px` omission, Reduced Motion, DOM equivalence, finite motion, privacy, WCAG, and exact-SHA rules exclude incompatible designs. | Pass |
| Non-goals | Decorative 3D, generic portfolio motifs, speculative features, confidential disclosure, and vanity optimization remain explicitly excluded. | Pass |
| Concrete success | Browser states, evidence schemas, numeric budgets, review attestations, deployment provenance, and production acceptance are mechanically decidable. | Pass |
| Stable CAP IDs | The kernel contains one record each for `CAP-1` through `CAP-7`; architecture and epics preserve those identities. | Pass |
| Lean kernel | Catalog, fixture, state-machine, digest, workflow, and migration detail remain outside the capability kernel without losing authority. | Pass |

## Cross-artifact seam review

| Seam | Evidence checked | Result |
| --- | --- | --- |
| Product, content, and UX | The full-time Junior target, approximate 60/40 backend-leaning positioning, exact **Work with me** CTA, five-System hierarchy, warm-paper visual system, Opening `7/5`, Atlas `5/7`, and English single-page scope agree across SPEC, PRD, PRODUCT, content contract, DESIGN, and EXPERIENCE. | Pass |
| Topology ownership | System and topology contracts close the five IDs, nodes, routes, semantic slots, Claims, narrative anchors, and one Active Handoff per System. Content owns semantic slots; the scene adapter owns only fixed coordinates. | Pass |
| Scene lifecycle | Topology, EXPERIENCE, AD-3–AD-5, and Stories 2.4–2.5 agree that DOM owns `selectedSystemId`, the adapter owns ephemeral `sceneStatus`, and the detached probe requires `WEBGL_lose_context`, calls `loseContext()`, removes its canvas, and caches true only after successful release. `ScenePending -> Bypassed`, sticky failure, context loss, delayed-import cancellation, re-entry, and offscreen zero-choreography/zero-invalidation behavior are aligned. | Pass |
| Evidence and privacy | Public Claim classifications remain separate from release assertion labels. Public claims bind stable evidence keys and limitations; private ledgers, client values, internal records, and sensitive production details remain outside source, staging, and deployment. | Pass |
| Local evidence | The verification contract, AD-11, and Story 4.8 agree on child records with nonnegative integer `durationMs`, closed Asset Inventory v1, exact tracked review attestations, and a passing `preupload` GeneratedEvidenceV1 manifest over sorted path/bytes/SHA-256 records. | Pass |
| Hosted evidence | Hosted finalization admits only the closed deployment, production-smoke, production-review manifest/attestation, and manifest-listed PNG set. It subtracts that set, re-proves the retained preupload projection byte-for-byte, rejects collisions or generic reporter mutation, and writes `hosted-final` as the last generated-root mutation. | Pass |
| Production acceptance | `artifacts/release/production-smoke.v1.json` has one closed root and eleven fixed ordered checks; any missing, reordered, narrowed, limited, or failing child makes the root fail and the release `PARTIAL`. Production screenshots are byte-bound by `production-review-evidence.v1.json` and its raw-manifest digest. | Pass |
| Build and Pages supply chain | The active stack pins Vite `8.0.16`; workflow actions use immutable Node 24 full SHAs with adjacent major comments, while the project toolchain remains Node `22.23.1` and npm `11.12.1`. Exact job permissions, sole `github-pages` upload, `artifacts/pages-site/`, PAGES-SITE-V1, REST artifact identity, raw outer-archive SHA-256 equality, safe extraction, and inner-site digest equality form one chain. | Pass |
| Conditional history governance | The addendum, brownfield contract, AD-16, and Stories 4.9–4.10 agree on two branches. A positive exact-trailer count requires bundle verification, mechanical equivalence, explicit candidate refspec, and exact `--force-with-lease=refs/heads/main:<recorded-remote-sha>`; a zero count performs no rewrite and uses ordinary `git push origin <verified-candidate-ref>:refs/heads/main` after re-reading remote SHA. The kernel's force rule is therefore scoped to actual history maintenance, not the zero-target publication branch. | Pass |
| Epic dependency order | Epic 4 now pins PDF tooling before CV generation (4.1), proves metadata/static identity locally while reserving hosted response assertions for 4.11 (4.2), builds/stages (4.3), audits history/confidentiality (4.4), proves browser journeys (4.5), implements workflow/provenance and the non-review verifier (4.6), documents that implementation (4.7), then adds independent-review integration and preupload closure (4.8) before conditional history (4.9), push/deploy (4.10), and production/hosted-final attestation (4.11). No story consumes an artifact or interface before its producing story. | Pass |

## Exact action-pin cross-check

The verification contract, architecture spine, and Story 4.6 agree on all six immutable pins:

- checkout `3d3c42e5aac5ba805825da76410c181273ba90b1` (`v7`)
- setup-node `820762786026740c76f36085b0efc47a31fe5020` (`v7`)
- configure-pages `45bfe0192ca1faeb007ade9deae92b16b8254a0d` (`v6`)
- upload-pages-artifact `fc324d3547104276b827a68afc52ff2a11cc49c9` (`v5`)
- deploy-pages `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128` (`v5`)
- upload-artifact `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a` (`v7`)

## Conclusion

No unresolved contradiction, orphaned authority, premature consumer, or ambiguous release branch was found in the current artifact set. The SPEC package is coherent enough to remain the implementation contract.
