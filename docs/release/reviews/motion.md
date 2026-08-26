---
lens: motion
sourceDigest: dfba12c64a5f1c9c71e1ec35014945898feb42724a4ed95949b5c577df8a2f78
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-26T18:26:42.340Z
---

# Motion review

## Scope

Reviewed every scene state, finite transition, interruption path, rapid selection, offscreen behavior, re-entry, Reduced Motion, sub-768 bypass, WebGL failure, and runtime frame ownership.

## Evidence

- The sole Canvas uses `frameloop="demand"`, DPR `[1, 1.5]`, one `useFrame`, ref mutation, and finite invalidation. No React state setter runs per frame and no ambient loop continues after settlement.
- Core motion policy distinguishes initial entry/visible selection from offscreen selection and re-entry. The latter settle immediately and issue one invalidation without replaying choreography.
- Rapid selector changes retarget from current state. A rejected scene chunk becomes a reload-only sticky fallback while all five readable topologies remain operable.
- Mobile and Reduced Motion do not request the Atlas scene chunk. The full browser matrix confirms Canvas absence for every sub-768 path and every Reduced Motion path.
- The eligible Canvas journey now asserts a zero-warning/zero-error console after the scene is ready. Three r182 avoids the upstream Clock deprecation emitted by r183+ while retaining the verified demand-loop behavior.

## Verdict

Pass after resolving the re-entry replay edge case. Motion remains causal, interruptible, finite, and meaning-preserving.
