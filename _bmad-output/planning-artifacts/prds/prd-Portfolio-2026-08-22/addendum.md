---
title: 'Le Huy Systems Atlas PRD addendum'
status: final
created: '2026-08-22'
updated: '2026-08-22'
---

# Le Huy Systems Atlas PRD addendum

## 1. Discovery-state evidence anchors

These limits guide architecture and copy. They are not a substitute for the private Evidence Ledger, and they must be rechecked before release.

| System | Public anchor | Discovery evidence level | Publication limit |
| --- | --- | --- | --- |
| Form Management | DOCX Contract and corpus gate | Implemented source plus one fresh local gate observation | The observed gate exited nonzero because its summary was stale; do not claim that the gate is currently green |
| VisionFlow Studio | Queue Handoff | Implemented source | Do not claim fresh Redis, MinIO, ONNX, database, CI, or end-to-end runtime operation |
| Production Booking & Operations Platform | Fourth Pricing Change | Git history and implemented source | Use the generic title; publish no client identity, price, screenshot, room identity, configuration, payment detail, sensitive architecture, or live-production claim |
| Parkly | Manual Review Handoff | Implemented source | Call the lock a custom Redis ownership lock, not Redlock; keep the outbox as a separate delivery rail unless a direct event link becomes verified |
| TFT Local Copilot | Locally assembled RAG components | Experimental source components | Migration and route-registration gaps prevent an end-to-end working claim |

## 2. Brownfield baseline at discovery

- Baseline branch and SHA: `main` at `8ac839915f58ccb09a4c9f63d6a5c0e3ab8ac577`.
- Fresh typecheck: passed.
- Fresh lint: passed.
- Fresh unit tests: 11 of 11 passed.
- Fresh build: failed because `App.tsx` imported `Navigation.tsx` while the tracked file was `src/components/navigation.tsx`.
- Latest GitHub Pages workflow for the baseline SHA: failed; the most recent successful workflow targeted an older SHA.
- Dependency audit: six findings, one low and five high, including advisories for direct PostCSS and Vite dependencies.
- No existing verified CV asset was found in the repository or its Git history. The release will create a facts-only CV from verified public evidence.

This is a starting observation, not release evidence. Fresh results replace it in implementation and release records.

## 3. Authoritative System Topology directions

Architecture may refine names and geometry, but it must preserve the evidence-supported relationships and the PRD Glossary.

- **Form Management:** Identity → Authorization → Workspace → DOCX Contract → Temporary Preview or Persisted Document → Audit and Verification.
- **VisionFlow Studio:** Media → Dataset Version → Annotation → Pipeline → Queue Handoff → CV Worker → Prediction → Evaluation.
- **Production Booking & Operations Platform:** Feedback → Pricing Rule → Implementation → Verification → Release → Next Revision.
- **Parkly:** Capture → Decision → Session or Manual Review → Audit, with a separate outbox delivery rail unless a direct link is verified.
- **TFT Local Copilot:** Source → Ingestion → Embedding → Vector Store → Retrieval → Local Model → Stream, with the incomplete runtime boundary stated publicly.

## 4. Engineering constraints forwarded to architecture

- Reuse one authoritative typed content and topology model for navigation references, the System Selector, scene geometry, the Readable Equivalent Representation, and Claim validation.
- Use one focal Canvas, lazy-loaded outside the initial critical path. Keep DOM labels and public narrative outside WebGL.
- Cap device pixel ratio at `[1, 1.5]` as the release acceptance limit.
- Use refs or renderer-local state for frame-loop work; do not trigger React state updates inside frame loops.
- Reserve scene layout space, contain scene errors, and make the fallback immediately usable.
- Pause or reduce offscreen rendering. Avoid large textures, geometry assets, post-processing, and continuous loops unless they convey a documented Atlas state.
- Mobile may use different geometry or omit the Canvas while preserving topology meaning.
- Reduced Motion preserves state and sequence without continuous movement.
- Use CSS or SVG when depth adds no information.
- Run content and topology validators before the production build.
- Compose GitHub Actions verification before Pages artifact upload and deployment.

Exact library choices belong to architecture. React, Vite, Three.js, React Three Fiber, Drei, Framer Motion, Tailwind, SVG, and Rive are implementation options, not product requirements.

## 5. Release verification matrix

### 5.1 Browser sizes

Verify at minimum:

- `375×667`
- `390×844`
- `768×1024`
- `1024×768`
- `1280×720`
- `1280×800`
- `1440×900`
- `1920×1080`
- intermediate widths around layout transitions
- constrained heights that can expose sticky-navigation or Atlas collisions

### 5.2 Paths and states

- Opening identity and Primary Action
- navigation and anchor integrity
- all five System Selector states
- each Flagship Narrative and Supporting Narrative
- Adaptation Loop
- AI-assisted engineering and Verification Harness
- capabilities and Closing links
- keyboard order, focus visibility, Enter and Space activation
- touch targets and mobile navigation
- Reduced Motion
- WebGL loading, failure, and fallback where feasible
- resize and orientation changes
- horizontal overflow, clipped content, and sticky-element collisions
- console errors and warnings
- internal, external, email, CV, metadata, sitemap, and asset links

### 5.3 Release record

The release record must include command, exit code, test count where available, result, exact SHA, production URL, deployment workflow run, initial JavaScript payload, lazy 3D chunk, major assets, and any limitation. It separates verified, observed, inferred, and blocked statements. A failing or unrun gate remains explicit.

## 6. Conditional repository-governance workstream

The approved master prompt authorizes removal of exact AI co-author trailers from Git history only when such trailers exist. This workstream is not a user-facing feature and must remain separate from product implementation.

- Set project-local identity to `Huy Le <huyle210525@gmail.com>` for new commits.
- Audit author and committer identities before rewriting.
- Create and verify an offline bundle outside the repository before mutation.
- Remove only exact authorized AI co-author trailer lines; preserve genuine human authorship, commit order, dates, messages other than the target trailer, and every file tree.
- Compare old and rewritten trees and commit sequence mechanically.
- Push with an explicit expected remote SHA and `--force-with-lease`, never an unguarded force.
- If identity ownership is ambiguous or a tree differs, stop the rewrite and report the blocker.

## 7. CV publication rule

If no verified prior CV exists, create a concise facts-only CV containing Le Huy's verified name, target role, public contact destinations, selected Systems, and source-backed engineering capabilities. Omit education, employment, dates, employers, awards, metrics, and personal details unless independently verified. Validate the PDF or document output, its accessible text, link target, filename, and deployed response before release.
