---
lens: motion
sourceDigest: 07a91f1c0ab71b3346f58ebaf838036e4e0b76288031a8a615b25f8f1fe8718c
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-27T12:42:27.796Z
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
- A navigation-only breakpoint test now uses Reduced Motion to avoid activating an unrelated queued scene probe; dedicated Atlas tests still exercise normal-motion eligibility, and CI coverage completes without React `act` or Atlas warnings.
- The production-smoke correction changes only how clipped scroll content is classified; it does not change scene, transition, invalidation, or Reduced Motion behavior.

## Verdict

Pass after resolving the re-entry replay edge case. Motion remains causal, interruptible, finite, and meaning-preserving.
