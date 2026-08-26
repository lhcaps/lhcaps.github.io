---
lens: motion
sourceDigest: 558a9c19c901355d095f39b1512c9ad16ea3b9757755c0cfe142bb4dee7b38a6
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-26T18:53:37.755Z
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

## Verdict

Pass after resolving the re-entry replay edge case. Motion remains causal, interruptible, finite, and meaning-preserving.
