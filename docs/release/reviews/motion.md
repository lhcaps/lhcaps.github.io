---
lens: motion
sourceDigest: 4fe3b693566849471450b0c76f97565160fe88707539c3f9e1245a990410187f
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-26T12:59:23.053Z
---

# Motion review

## Scope

Reviewed every scene state, finite transition, interruption path, rapid selection, offscreen behavior, re-entry, Reduced Motion, sub-768 bypass, WebGL failure, and runtime frame ownership.

## Evidence

- The sole Canvas uses `frameloop="demand"`, DPR `[1, 1.5]`, one `useFrame`, ref mutation, and finite invalidation. No React state setter runs per frame and no ambient loop continues after settlement.
- Core motion policy distinguishes initial entry/visible selection from offscreen selection and re-entry. The latter settle immediately and issue one invalidation without replaying choreography.
- Rapid selector changes retarget from current state. A rejected scene chunk becomes a reload-only sticky fallback while all five readable topologies remain operable.
- Mobile and Reduced Motion do not request the Atlas scene chunk. The full browser matrix confirms Canvas absence for every sub-768 path and every Reduced Motion path.

## Verdict

Pass after resolving the re-entry replay edge case. Motion remains causal, interruptible, finite, and meaning-preserving.
