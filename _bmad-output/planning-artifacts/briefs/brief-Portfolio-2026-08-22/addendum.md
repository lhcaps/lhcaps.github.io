---
title: 'Systems Atlas product brief addendum'
status: complete
created: '2026-08-22'
updated: '2026-08-22'
---

# Systems Atlas product brief addendum

## Evidence anchors and limits

| System | Anchor | Safe claim level | Hard limit |
| --- | --- | --- | --- |
| Form Management | DOCX contract and corpus gate | Implemented source; one fresh local gate observation | The gate exited nonzero because its summary was stale; do not claim that the gate is currently green |
| VisionFlow Studio | Job leaves HTTP for queue/worker | Implemented source | No fresh Redis, MinIO, ONNX, database, CI, or E2E runtime claim |
| Production Booking & Operations Platform | Fourth reviewable pricing change | Git and implemented source | Generic title only; no client, prices, screenshots, room identity, configuration, or live-production claim |
| Parkly | Low-confidence capture enters manual review | Implemented source | Custom Redis ownership lock; no Redlock claim; outbox remains a separate delivery rail without a verified direct event link |
| TFT Local Copilot | Locally assembled RAG answer | Experimental source components | Migration and route-registration gaps prevent an end-to-end working claim |

## Current release blockers

- Fresh build: failed on `App.tsx` import casing versus tracked `src/components/navigation.tsx`.
- Latest GitHub Pages workflow for the baseline SHA: failed; most recent success targets an older SHA.
- Dependency audit: six findings (one low, five high), including advisories for direct PostCSS and Vite dependencies; update and re-audit before release.
- CV link target is absent; release must supply a facts-only CV assembled from verified public evidence.

## Brownfield baseline

- Baseline `main`: `8ac839915f58ccb09a4c9f63d6a5c0e3ab8ac577`.
- Fresh typecheck: pass.
- Fresh lint: pass.
- Fresh unit tests: 11/11 pass.

## Engineering constraints forwarded to PRD and architecture

- One authoritative five-system content/topology model.
- One focal Canvas, lazy-loaded outside the initial path.
- Device pixel ratio (DPR) is capped at `[1, 1.5]`; no React state updates inside `useFrame`.
- DOM labels and public narrative remain outside WebGL.
- Offscreen rendering pauses or reduces activity.
- Mobile may use different geometry while preserving topology meaning.
- Reduced motion preserves state and sequence without continuous animation.
- WebGL failure produces a readable, selectable equivalent.
- Content and topology validators run before build.
- GitHub Actions composes verification before Pages upload.

## Memlog accounting

This addendum records evidence levels, release blockers, and engineering constraints; the private Deep Recon memlog retains research-process detail.
