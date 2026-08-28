---
lens: simplicity
sourceDigest: 07a91f1c0ab71b3346f58ebaf838036e4e0b76288031a8a615b25f8f1fe8718c
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-27T12:42:27.796Z
---

# Simplicity review

## Scope

Reviewed model ownership, component boundaries, legacy paths, scene dependencies, direct dependencies, generated schema reuse, and whether abstractions solve contracted failure modes rather than speculative ones.

## Evidence

- One typed graph replaces duplicated project, navigation, skills, stack, and scene models. `runtimeConfig.ts` is a compatibility projection, not a second authority.
- The legacy two-Canvas scene, missing-GLB path, generic card/UI layer, unused data modules, stale credentials page, and obsolete image assets are removed.
- Exactly one Canvas import exists. Scene code is isolated behind one lazy root; framework-free core policies remain directly testable.
- Review found unused `framer-motion` and `@react-three/drei` direct dependencies. Both were removed, eliminating 38 installed packages while preserving build, tests, and the Atlas chunk contract.
- Release helpers share canonical JSON, FileRecordV1, identity, archive, and generic safety primitives instead of duplicating acceptance logic.
- One repository-wide Git text rule closes both Pages and review-digest checkout variance; one release fixture guards that rule and the public passthrough text bytes.
- One browser-side snapshot function now exempts only the exact lifecycle scroller and keeps positioned escapees fail-closed. Three focused fixtures and one real-Chromium case cover intentional clipping, root/unclipped overflow, and containing-block escape.
- Local viewport and hosted production checks call that same function, removing the earlier duplicate overflow classifier.

## Verdict

Pass after dependency cleanup. The remaining abstractions correspond to explicit content, browser, archive, history, review, or release invariants.
