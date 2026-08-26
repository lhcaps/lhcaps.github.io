---
lens: code-integration
sourceDigest: 558a9c19c901355d095f39b1512c9ad16ea3b9757755c0cfe142bb4dee7b38a6
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-26T18:53:37.755Z
---

# Code and integration review

## Scope

Reviewed state ownership, import direction, failure containment, metadata/base paths, toolchain pins, deterministic build/CV, tests, manifests, release evidence, archive safety, workflow permissions, and exact-SHA Pages handoff.

## Evidence

- Unit/component suite passes 41 tests. Coverage is 94.85% statements, 89.31% branches, 96.5% functions, and 97.15% lines; every critical contract file meets its exact 100% threshold.
- Release fixtures pass 34 tests covering canonical/file digests, archive traversal/link rejection, manifest ownership, GeneratedEvidence phases, history rules/rewrite, review binding, checkout portability, smoke order, and ReleaseEvidence schema.
- Production build emits 21 validated files and one eager entry/one Atlas dynamic root; the staged site contains 20 deployable files and no source map or internal record.
- Deterministic CV verification passes one page, 5,400 bytes, 11 required text markers, and two link annotations. Dependency audit reports zero advisories.
- Workflow actions are full-SHA Node 24 pins; checkouts use full history; project runtime is Node 22.23.1/npm 11.12.1; the build runs canonical verification before the sole Pages upload.
- Review caught a standalone TSX path-resolution defect in the content gate. The import now resolves directly and the gate passes independently.
- Canonical verification initially exposed a Windows `npm.cmd` spawn failure. Child gates now reuse the active `npm-cli.js` through the current Node runtime, with a dedicated cross-platform fixture.
- Pre-push rewrite review exposed a contradictory expectation that equated the unpublished local head with the remote baseline. The audit now binds those identities independently, verifies the remote live, and exercises the real two-repository flow in a regression fixture.
- Rewrite apply fixtures now preserve the signed unchanged prefix, reject any signed commit that would need new bytes, require exact bundle `main`/remote refs, bind operator identity and origin, and stop on unaudited historical identities.
- Hosted-smoke rehearsal exposed React Three Fiber's `THREE.Clock` warning against Three r184. Three and its types are pinned to r182, before that deprecation, and the eligible Canvas E2E now fails on every warning or error.
- The first hosted canonical run exposed Windows/Linux line-ending variance in passthrough output and ReviewSource bytes. A repository-wide LF checkout contract now yields the same review digest and byte-identical 20-file Pages site under both autocrlf modes.
- The hosted coverage log exposed an unrelated scene microtask in a navigation test. Reduced Motion now scopes that test to navigation while dedicated Atlas coverage remains intact; the exact-head coverage run emits no React `act` or Atlas warning.

## Verdict

Pass after the standalone gate fix. Local integration is complete; hosted/production attestation remains a runtime gate and is not claimed by this local review.
