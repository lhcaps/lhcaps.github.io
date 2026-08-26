---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-Portfolio-2026-08-22/prd.md
  - _bmad-output/planning-artifacts/architecture/architecture-Portfolio-2026-08-22/ARCHITECTURE-SPINE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-Portfolio-2026-08-22/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-Portfolio-2026-08-22/EXPERIENCE.md
  - _bmad-output/specs/spec-le-huy-systems-atlas/SPEC.md
  - _bmad-output/specs/spec-le-huy-systems-atlas/content-contract.md
  - _bmad-output/specs/spec-le-huy-systems-atlas/system-contracts.md
  - _bmad-output/specs/spec-le-huy-systems-atlas/topology-contract.md
  - _bmad-output/specs/spec-le-huy-systems-atlas/verification-contract.md
  - _bmad-output/specs/spec-le-huy-systems-atlas/brownfield.md
---

# Portfolio - Delivery Breakdown

## Overview

This document provides the complete epic and story breakdown for Portfolio, decomposing the requirements from the PRD, approved UX contract, canonical SPEC package, and final Architecture Spine into independently implementable stories.

## Requirements Inventory

### Functional Requirements

- **FR-1:** Present Le Huy, the Software Engineer and full-time Junior Software Engineer target, the backend-leaning full-stack proposition—roughly 60% full-stack product-engineering breadth and 40% backend-depth emphasis, with backend depth as the strongest technical dimension—a concrete system-led promise, and the Primary Action in a meaningful Opening that does not depend on the Atlas scene.
- **FR-2:** Provide keyboard- and touch-operable navigation to every major chapter plus an exact **Work with me** Primary Action whose verified destination remains accessible on desktop and mobile.
- **FR-3:** Let readers select exactly five Systems—Form Management, VisionFlow Studio, Production Booking & Operations Platform, Parkly, and TFT Local Copilot—from one authoritative model shared by every representation.
- **FR-4:** Give every topology node, route, layer, depth, focus treatment, selected state, and finite motion class documented system meaning available outside WebGL.
- **FR-5:** Preserve the Selected System, topology relationships, controls, and narrative access through an always-readable DOM representation when WebGL is unavailable, failed, loading, inappropriate, or intentionally bypassed.
- **FR-6:** Keep the single focal Canvas lazy and outside the Opening critical path while reserving stable layout space for loading, bypass, failure, and ready states.
- **FR-7:** Publish three structurally distinct, evidence-bounded Flagship Narratives for Form Management, VisionFlow Studio, and Production Booking & Operations Platform.
- **FR-8:** Publish shorter, honest Supporting Narratives for Parkly and TFT Local Copilot without overstating their verified state or copying flagship anatomy.
- **FR-9:** Require every material public Claim to reference an allowed Public Claim Manifest entry and keep the private Evidence Ledger out of source, history, build output, logs, screenshots, and deployment.
- **FR-10:** Present the anonymous Feedback → Pricing Rule → Implementation → Verification → Release → Next Revision adaptation loop without client identity, real prices, private architecture, payment detail, or physical-room identity.
- **FR-11:** Present AI-assisted engineering as Intent → Research → Product Brief → PRD → UX Contracts → Spec → Architecture → Story → Scoped Implementation → Harness → Review → Browser QA → Release Evidence under **THE AGENT WRITES. THE HARNESS DECIDES.**
- **FR-12:** Explain the real Verification Harness categories and render any Failed Gate with its exact condition and limitation; stale or nonzero evidence must never appear as passing.
- **FR-13:** Organize capabilities by verified engineering outcomes and linked System anchors, not by logo cloud, skill percentage, generic pill inventory, or unsupported expertise level.
- **FR-14:** Provide verified, keyboard-reachable Work with me, GitHub, email, and one-page facts-only CV destinations without invented personal or professional facts.
- **FR-15:** Publish complete base-path-safe title, description, canonical, Open Graph, Twitter, favicon, sitemap, robots, Person, and ProfilePage identity using verified facts only.
- **FR-16:** Expose one canonical verification entry point and deploy GitHub Pages only after its complete gate passes; report **PARTIAL** whenever a required gate or exact-SHA attestation is incomplete.

### NonFunctional Requirements

- **NFR-1:** The complete page and interaction paths target WCAG 2.2 Level AA.
- **NFR-2:** Text contrast is at least `4.5:1`, large text at least `3:1`, and meaningful non-text UI contrast at least `3:1`, subject only to WCAG exceptions.
- **NFR-3:** Semantic landmarks, headings, lists, buttons, links, and readable topology expose the complete content order outside WebGL.
- **NFR-4:** Every interaction supports keyboard and touch, visible focus, accessible names, and touch targets of at least `44 × 44` CSS pixels.
- **NFR-5:** No information depends on hover, no animation creates a scroll trap, and no focusable control exists inside the Canvas.
- **NFR-6:** Reduced Motion removes the Canvas and nonessential spatial motion while preserving selection, relationships, sequence, and navigation.
- **NFR-7:** Automated accessibility checks are paired with manual keyboard, focus, contrast, content-order, and screen-size review.
- **NFR-8:** Mobile is a deliberate single-column composition below `768px`, not a scaled desktop composition.
- **NFR-9:** At `768–1023px` the Atlas and readable topology stack; at desktop the page uses the approved 12-column grid with a `1440px` maximum shell.
- **NFR-10:** The release has no unintended horizontal overflow, clipped focus, obscured anchors, unreadable text, or sticky collisions across the required viewport matrix, intermediate widths, and constrained heights.
- **NFR-11:** Selected System meaning, content order, navigation, and the Primary Action remain stable through resize and orientation changes.
- **NFR-12:** Essential Opening content and the Primary Action render independently of the lazy 3D closure.
- **NFR-13:** Eager JavaScript is at most `170 KiB` gzip; the lazy Atlas closure is at most `425 KiB` gzip; CSS is at most `25 KiB` gzip.
- **NFR-14:** First-view Latin font transfer is at most `220 KiB`; initial transfer excluding lazy Atlas and CV is at most `450 KiB`; each static non-font asset is at most `256 KiB`; CV is at most `524288` bytes.
- **NFR-15:** The sole Canvas uses DPR `[1, 1.5]`, demand rendering, finite invalidation, no frame-loop React state, and no perpetual animation.
- **NFR-16:** Loading, bypass, failure, resize, and offscreen policies are deterministic and do not cause material layout shift.
- **NFR-17:** Public text is English, energetic, concrete, direct, technically literate, human, and grounded by concrete artifacts, handoffs, failures, revisions, or transitions.
- **NFR-18:** Synecdoche carries personality while technical requirements and evidence qualifications remain literal; public copy avoids litotes, irony, sarcasm, clichés, corporate filler, generic portfolio language, and AI clichés.
- **NFR-19:** Every Claim passes content, confidentiality, evidence-level, limitation, and public-safe review before build.
- **NFR-20:** Public copy does not invent employer relationships, user counts, scale, performance, uptime, awards, testimonials, business outcomes, or production status.
- **NFR-21:** No secret, credential, token, private ledger, confidential client artifact, private identifier, or sensitive configuration enters source, history, build output, logs, screenshots, or deployment.
- **NFR-22:** External links use appropriate security attributes and do not expose hidden referrer-sensitive data.
- **NFR-23:** Any history maintenance changes only the exact authorized Cursor co-author trailer after backup and mechanical preservation of trees, order, dates, genuine identities, and all non-target message content.
- **NFR-24:** The portfolio remains readable and navigable when JavaScript loads slowly, the scene chunk rejects, WebGL is unavailable, or Reduced Motion is enabled.
- **NFR-25:** Tests use deterministic fixtures and topology data; visual review complements rather than replaces behavioral checks.
- **NFR-26:** GitHub Pages base paths, direct loads, internal anchors, static assets, and metadata destinations work on the deployed origin.
- **NFR-27:** The one-page CV is deterministic, unencrypted, parseable in reading order, carries exact email/GitHub links, and is served as a nonempty `application/pdf` response.
- **NFR-28:** Release evidence preserves exit codes and counts where available, uses exact schema-v1 identities, and labels statements as verified, observed, inferred, or blocked.

### Additional Requirements

- **AR-1 (AD-1):** Replace duplicate legacy datasets with one typed, serializable `src/content/portfolio.ts` graph; pure content and atlas-core modules cannot import React, DOM, Three, R3F, Drei, or I/O adapters.
- **AR-2 (AD-2):** Derive selectors, readable topology, scene input, narrative anchors, evidence markers, capability links, metadata, and CV projection from the authoritative graph with stable IDs and validated references.
- **AR-3 (AD-3):** Keep `selectedSystemId` as the only product selection state in the DOM owner; scene state remains adapter-local and cannot become another product authority; a one-shot detached WebGL probe releases its context/canvas and exposes only a cached boolean.
- **AR-4 (AD-4):** Implement the scene lifecycle as `untried | loading | ready | failed-sticky`; import, initialization, render, or `webglcontextlost` failure stays bypassed until a full document reload, and late eligibility exits unmount a settled Canvas.
- **AR-5 (AD-5):** Mount the lazy Canvas only after first Atlas viewport entry when width is at least `768px`, Reduced Motion is false, WebGL is supported, and no sticky failure exists; use exact finite `520ms + 360ms` choreography and require the Active Handoff destination to take Rust focus, while offscreen reselection queues no choreography and re-enters with at most one settled sync frame.
- **AR-6 (AD-6):** Give each manifest `evidenceKey` one exact Claim, System, classification, public-safe status, and limitation; give every rendered use a unique `claimInstanceId` that cannot override manifest fields.
- **AR-7 (AD-7):** Close public source assets to `favicon.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`, and `le-huy-software-engineer-cv.pdf`; Vite alone emits `release.json`; fail on all unexpected paths, source maps, binaries, identifiers, secrets, or private output.
- **AR-8 (AD-8):** Package exact local Geologica Variable and Fragment Mono fonts, define approved warm-paper tokens in CSS, and eliminate remote font requests and legacy dark/glass/neon styling.
- **AR-9 (AD-9):** Keep complete semantics in DOM components; make Canvas `aria-hidden` and unfocusable; contain its errors in a SceneBoundary that preserves the readable equivalent.
- **AR-10 (AD-10):** Emit a Vite manifest and module inventory, compute deterministic eager/lazy closure gzip totals, enforce all budgets and major-asset inventory rules, and fail closed on malformed fixtures.
- **AR-11 (AD-11):** Make `npm run verify` the sole acceptance orchestrator; always write schema-v1 Release Evidence and asset inventory; require the digest-bound eight-lens predeploy review index and hosted production-review attestation; keep every record internal while the public Harness remains static and non-reporting.
- **AR-12 (AD-12):** Emit the exact closed machine-only public release schema, pin Node `22.23.1`, npm `11.12.1`, and current Pages action majors, verify before the sole artifact upload, retain internal evidence with `if: always()`, and attest immutable artifact ID, deterministic `pagesSiteDigest` using `PAGES-SITE-V1` over `artifacts/pages-site/` after validated staging, workflow SHA, public identity, production smoke, and branch-advance behavior.
- **AR-13 (AD-13):** Enforce 100% lines/branches/functions/statements on the six named critical core files, overall floors of 85% lines/functions/statements and 80% branches, component interaction tests, and the full Playwright journey/matrix suite.
- **AR-14 (AD-14):** Generate the committed CV deterministically with pinned `pdf-lib`; regenerate and byte-compare it, then verify digest/version, extracted text/order, encryption, page count, exact URI annotations, filename, size, and production response.
- **AR-15 (AD-15):** Treat unknown content, malformed evidence, missing receipts, failed scene imports, gate errors, missing SHAs, and deployment mismatches as explicit nonzero or bypass states; never silently degrade a release gate.
- **AR-16 (AD-16):** Ignore generated release/Playwright output and private evidence, use exact-path staging and the required local identity, run a safe non-shallow audit of every commit message/blob reachable from candidate HEAD plus generated evidence, and perform the conditional exact-trailer rewrite only after an external verified bundle and identity audit.
- **AR-17 (AD-17):** Keep `three`, `@react-three/fiber`, and `@react-three/drei` reachable only from the lazy Atlas scene closure; no eager module may import or re-export them.
- **AR-18 (AD-18):** Validate canonical semantic `sceneSlot` values, uniqueness, capacity, Parkly-only `separate-bottom`, required Active Handoff `focusNodeId === route.to`, and route geometry resolved exclusively from node IDs and the fixed adapter slot map.
- **AR-19 (AD-19):** Validate a closed, non-sensitive `docs/release/confidentiality-review.v1.json` receipt using the exact SHA-256 graph-plus-sorted-artifact byte stream, excluding only the receipt and independently closed `release.json`, with explicit stale predicates and fixtures.
- **AR-20 (brownfield):** Remove the legacy two-scene implementation, duplicate project/system data, remote fonts, infinite motion, click-only articles, case-mismatched import, `public/credentials/**`, raster hero, stale social SVG, and stale performance document before acceptance.
- **AR-21 (stack):** Pin exact package versions for local fonts, coverage, axe, TypeScript execution, PDF generation/parsing, React/Vite/Three, and testing dependencies defined by the Architecture Spine.
- **AR-22 (release model):** Keep the private Evidence Ledger ignored and off-repository; accept only a non-sensitive receipt and public-safe fixtures as verification inputs.

### UX Design Requirements

- **UX-DR1:** Implement the complete anchor order: `#opening`, `#atlas`, `#systems`, `#adaptation`, `#ai-engineering`, `#verification`, `#evidence-boundary`, `#capabilities`, and `#contact`, with fixed-header clearance and stable direct-link behavior.
- **UX-DR2:** Implement the warm-paper palette (`#F3EFE4` paper, `#20231E` charcoal, `#B4432C` rust), packaged Geologica/Fragment Mono typography, low radii, restrained rules, and one broad Atlas shadow; remove glass, neon, bloom, and dashboard framing.
- **UX-DR3:** Use the approved asymmetrical 12-column composition: 7/5 Opening, 5/7 Atlas, deliberate negative space, distinct chapter rhythms, and mobile/tablet recomposition rather than uniform scaling.
- **UX-DR4:** Build a visible skip link, semantic desktop header, direct navigation, and exact **Work with me** primary action with clear hover/focus/active states.
- **UX-DR5:** Build an accessible mobile navigation with `aria-expanded`, `aria-controls`, Escape/outside/selection closure, focus restoration, scroll containment, and background inertness only while open.
- **UX-DR6:** Render a five-button System Selector using native buttons, `aria-pressed`, Enter/Space, optional arrow/Home/End movement, atomic selection updates, and the exact polite selection announcement.
- **UX-DR7:** Keep the Readable Equivalent Representation always present and never behind an accordion; expose selected System, layers, nodes, routes, responsibilities, Active Handoff, limitations, and narrative destination.
- **UX-DR8:** Reserve the Atlas frame across loading/bypass/ready/failure states, keep Canvas decorative and noninteractive, and show literal bypass/failure status without shifting focus.
- **UX-DR9:** Implement the named finite motion primitives and timings only; omit pulse, shimmer, floating, bounce, scroll hijack, custom cursors, ambient particles, and perpetual loops.
- **UX-DR10:** Preserve selected System and DOM focus through resize, orientation, eligibility changes, offscreen return, and scene readiness; never move focus when the scene becomes ready.
- **UX-DR11:** Give the three Flagship Narratives distinct visual forms: Form contract spread, VisionFlow cross-runtime route, and Booking six-station adaptation loop.
- **UX-DR12:** Give Parkly a compact branch strip and TFT Local Copilot a lab-note treatment; both remain shorter and visibly more qualified than flagships.
- **UX-DR13:** Use Evidence Markers with literal classification and limitation, and keep Claim classifications visually and semantically distinct from release assertion labels.
- **UX-DR14:** Make the Evidence Boundary discoverable from evidence markers and the Verification Harness even when it is not in the compact global navigation.
- **UX-DR15:** Render the AI lifecycle and Verification Harness as readable system routes, preserve the exact harness statement, and show Failed Gate/PARTIAL states without success styling.
- **UX-DR16:** Connect each outcome-based capability to at least one System anchor and keep the Closing human, direct, compact, and free of availability-dashboard or lead-form patterns.
- **UX-DR17:** Ensure every link/control meets the 44px touch target, visible-focus, accessible-name, keyboard/touch parity, and no-hover-only requirements.
- **UX-DR18:** Verify all approved visual, motion, state, responsive, and content contracts with real Chromium screenshots at the complete release matrix plus intermediate widths and constrained heights.

### FR Coverage Map

- **FR-1 → Epic 1:** Complete candidate identity, positioning, proposition, proof index, and first-view action.
- **FR-2 → Epic 1:** Reliable desktop/mobile navigation and exact Primary Action.
- **FR-3 → Epic 2:** Five-System selection from one authoritative graph.
- **FR-4 → Epic 2:** Semantic nodes, routes, depth, focus, handoff, and finite motion.
- **FR-5 → Epic 2:** Always-readable DOM equivalence and deterministic bypass/failure behavior.
- **FR-6 → Epic 2:** One lazy, non-critical-path Canvas with stable reserved space.
- **FR-7 → Epic 2:** Three distinct Flagship Narratives.
- **FR-8 → Epic 2:** Two honest Supporting Narratives.
- **FR-9 → Epic 2:** Manifest-bound public Claims and private-ledger exclusion.
- **FR-10 → Epic 3:** Anonymous six-stage Fourth Pricing Change adaptation story.
- **FR-11 → Epic 3:** Controlled AI-assisted engineering lifecycle and exact harness statement.
- **FR-12 → Epic 3:** Literal verification categories, Failed Gate, and evidence qualification.
- **FR-13 → Epic 3:** Outcome-led capabilities connected to System anchors.
- **FR-14 → Epic 4:** Verified contact, GitHub, email, and deterministic facts-only CV.
- **FR-15 → Epic 4:** Complete base-path-safe metadata and machine-readable identity.
- **FR-16 → Epic 4:** Canonical verification, exact-SHA Pages deployment, and attested status.

## Delivery Sequence

### Epic 1: Make the First Minute Decisive

Recruiters and collaborators can identify Le Huy, understand the backend-strong full-stack proposition, scan the five-System proof index, navigate the complete portfolio, and use the exact **Work with me** action from an accessible, responsive first reading surface.

**FRs covered:** FR-1, FR-2

**Implementation notes:** This epic establishes the local design tokens/fonts, semantic page shell, Opening, proof index, header, skip link, responsive navigation, section anchors, and direct contact route. It remains complete without Atlas JavaScript or a future epic.

### Epic 2: Inspect Five Systems Through One Atlas

Technical readers can select and compare all five evidence-bounded Systems, read their real architectural relationships and limitations in the DOM, follow three distinct Flagship and two Supporting Narratives, and optionally receive the same selected topology through one meaningful, resilient 3D Atlas.

**FRs covered:** FR-3, FR-4, FR-5, FR-6, FR-7, FR-8, FR-9

**Implementation notes:** This epic owns the authoritative graph, Claim Manifest, topology/scene policies, readable equivalent, narrative surfaces, one lazy Canvas, and removal of duplicate legacy scene/data paths. Each ordered story leaves a usable DOM-first slice; the optional scene never becomes a prerequisite for meaning.

### Epic 3: Show How Engineering Decisions Survive Change

Readers can follow the anonymous Fourth Pricing Change adaptation loop, see how AI-assisted work is constrained and accepted, inspect literal verification and Failed Gate treatment, and connect outcome-based capabilities back to concrete System anchors.

**FRs covered:** FR-10, FR-11, FR-12, FR-13

**Implementation notes:** This epic adds the six-stage adaptation chapter, process route, Verification Harness, Evidence Boundary links, and capability synthesis using the graph and public Claims already delivered by Epic 2. It does not require release automation to tell the current evidence truth.

### Epic 4: Trust, Share, and Verify the Public Release

Readers can contact Le Huy, open GitHub, download a deterministic facts-only CV, share a correctly identified page, and trust that the public GitHub Pages artifact was accepted by the complete harness and attested to the exact deployed SHA.

**FRs covered:** FR-14, FR-15, FR-16

**Implementation notes:** This epic closes the contact/CV, metadata, privacy receipt, asset budget, full test matrix, canonical evidence artifact, README, current Pages workflow, production smoke, and exact-SHA release path. It turns the already useful prior epics into a shareable verified release.

## Epic 1: Make the First Minute Decisive

Recruiters and collaborators can identify Le Huy, understand the backend-strong full-stack proposition, scan the five-System proof index, navigate the complete portfolio, and use the exact **Work with me** action from an accessible, responsive first reading surface.

### Story 1.1: Read a Verified Candidate Proposition Immediately

As a recruiter,
I want the first viewport to identify Le Huy and the concrete engineering proposition,
So that I can decide whether the portfolio is relevant before any optional scene loads.

**Requirements:** FR-1; NFR-2, NFR-8, NFR-12, NFR-17, NFR-18, NFR-20; AR-1, AR-2, AR-8, AR-20; UX-DR2, UX-DR3.

**Acceptance Criteria:**

**Given** a fresh page load with the Atlas chunk delayed or rejected
**When** the Opening renders
**Then** it exposes Le Huy, Software Engineer, the full-time Junior Software Engineer target, the roughly 60/40 product-engineering/backend-depth positioning, backend depth as the strongest technical dimension, one concrete system-led proposition, the five-System proof index, and **Work with me**
**And** no portrait, availability pill, technology inventory, fake metric, fake terminal, unsupported scale claim, or raster hero appears.

**Given** the authoritative public content foundation
**When** its schema and initial fixture tests run before implementation
**Then** missing identity, any System ID/title, verified destination, or prohibited unsupported fact fails red first and passes only after one typed serializable graph supplies the rendered Opening and proof index
**And** no duplicate legacy profile/project/system model remains on the eager path.

**Given** the approved visual contract
**When** the first view is rendered at the required mobile, tablet, laptop, and desktop widths
**Then** packaged Geologica and Fragment Mono, warm-paper tokens, the exact desktop 12-column 7/5 Opening, deliberate negative space, low radii, and the one rust accent match the approved spine; tablet/mobile recompose to the prescribed stacked reading order rather than scaling the grid
**And** section hierarchy reveals at most once with opacity plus no more than 12px travel over `320ms` ease-out quint, Reduced Motion is immediate or opacity-only at `100ms`, and no remote font request, dark glass surface, neon, gradient, glow, generic project-card grid, or horizontal overflow occurs.

### Story 1.2: Navigate the Reading Sequence by Keyboard or Pointer

As a portfolio reader,
I want direct semantic routes through every chapter,
So that I can move from the proposition to the evidence I care about without guessing or losing my place.

**Requirements:** FR-2; NFR-1, NFR-3, NFR-5, NFR-10, NFR-11, NFR-26; AR-9, AR-15; UX-DR1, UX-DR4, UX-DR10.

**Acceptance Criteria:**

**Given** the complete page shell
**When** a reader inspects document order
**Then** unique semantic sections exist in the exact order `#opening`, `#atlas`, `#systems`, `#adaptation`, `#ai-engineering`, `#verification`, `#evidence-boundary`, `#capabilities`, and `#contact`
**And** landmarks, heading levels, lists, buttons, links, and a visible-on-focus skip link expose the same order without Canvas or JavaScript enhancement.

**Given** any desktop global-navigation link, brand link, or direct URL fragment available in the page shell
**When** it is activated by pointer or keyboard
**Then** it resolves to one existing target with fixed-header clearance, visible focus where the interaction moves focus, and no obscured heading or scroll trap
**And** the brand returns to `#opening`, the proof index reaches the existing `#systems` chapter, and every shell-owned global anchor resolves without depending on a later System narrative.

**Given** JavaScript is slow or the optional scene fails
**When** navigation and **Work with me** are used
**Then** both remain operable native links
**And** tests reject missing IDs, duplicated IDs, dead anchors, click-only containers, hover-only meaning, and unsafe external-link attributes.

### Story 1.3: Use a Predictable Mobile Navigation and Contact Path

As a mobile reader,
I want a compact navigation disclosure and reachable primary action,
So that constrained width or height never blocks the next useful step.

**Requirements:** FR-2; NFR-4, NFR-8, NFR-10, NFR-11; AR-9; UX-DR5, UX-DR17.

**Acceptance Criteria:**

**Given** a viewport where compact navigation is active
**When** the trigger opens the menu
**Then** it exposes `aria-expanded` and `aria-controls`, moves focus to the first menu link, makes background controls inert only while open, contains scrolling, and keeps every control at least `44 × 44` CSS pixels
**And** no control or Primary Action is clipped at `375×667`, `390×844`, breakpoint-adjacent widths, or constrained heights.

**Given** the mobile menu is open
**When** the reader presses Escape, activates a destination, or clicks outside
**Then** it closes predictably, restores focus to the trigger when appropriate, releases inert/scroll state, and leaves the selected destination visible below the header
**And** repeated open/close cycles do not trap focus or document scrolling.

**Given** DOM interaction motion is enabled
**When** a reader presses an action, changes the current navigation link, or opens/closes mobile navigation
**Then** press feedback is one-pixel `translateY` plus `scale(0.98)` for `90ms` down/`140ms` settle, the navigation rule uses `180ms` ease-out quart, and the menu uses `220ms` open/`160ms` close from no more than `-8px`
**And** Reduced Motion keeps only the contracted opacity/one-pixel feedback at `100ms` where applicable; bounce, elastic easing, layout tween, pulse, shimmer, float, ambient loop, and long stagger are absent.

**Given** the exact **Work with me** action
**When** it is activated from the Opening or Closing path
**Then** it resolves to the allowlisted `mailto:huyle210525@gmail.com` destination through a native link
**And** keyboard, touch, pointer, accessible-name, focus-visible, and no-hover-only tests pass.

## Epic 2: Inspect Five Systems Through One Atlas

Technical readers can select and compare all five evidence-bounded Systems, read their real architectural relationships and limitations in the DOM, follow three distinct Flagship and two Supporting Narratives, and optionally receive the same selected topology through one meaningful, resilient 3D Atlas.

### Story 2.1: Select and Read Five Validated System Topologies

As a technical interviewer,
I want to select any System and read its exact topology in the DOM,
So that I can inspect architectural ownership and handoffs without depending on WebGL.

**Requirements:** FR-3, FR-4, FR-5; NFR-3, NFR-4, NFR-24, NFR-25; AR-1, AR-2, AR-13, AR-18; UX-DR3, UX-DR6, UX-DR7, UX-DR10.

**Acceptance Criteria:**

**Given** tests for the canonical topology model are written first
**When** invalid fixtures contain a sixth/missing System, duplicate or missing ID, unresolved route, orphan node, unknown layer/slot/kind, missing narrative anchor/evidence key, invalid Active Handoff, focus not equal to `route.to`, unauthorized `separate-bottom`, or scene-only text
**Then** the pure validator fails with stable codes and paths
**And** the five canonical fixtures in authoritative `src/content/portfolio.ts` pass with their exact nodes, responsibilities, routes, scene slots, narrative anchors, Active Handoffs, and focus nodes; static dependency tests reject React, DOM, Three/R3F/Drei, or I/O imports from `src/content/**` and `src/atlas/core/**`.

**Given** Form Management is selected
**When** its readable topology renders
**Then** it exposes two fixture-derived branches: DOCX Contract → Temporary Preview with no Audit route, and DOCX Contract → Persisted Document → Audit and Verification
**And** its Active Handoff destination is Persisted Document.

**Given** the five native selector buttons
**When** a reader uses pointer, touch, Enter, Space, or supported Arrow/Home/End keys
**Then** exactly one button exposes `aria-pressed="true"`, the DOM topology and narrative destination update atomically, focus remains predictable, and a polite live region announces exactly “{System name} selected. {node count} nodes, {route count} routes.”
**And** `readable-topology` is always rendered in loading, ready, bypass, and failure states, never hidden by a disclosure or accordion; at desktop Atlas uses the exact 5/7 12-column split, while tablet/mobile stack scene/fallback and topology without changing meaning; repeated selection creates no duplicate state, links, or animation queues.

### Story 2.2: Inspect Three Distinct Flagship Narratives

As a technical reader,
I want deep but differently shaped proof for the three flagship Systems,
So that I can ask system-specific questions instead of reading repeated project cards.

**Requirements:** FR-7, FR-9; NFR-17, NFR-18, NFR-19, NFR-20, NFR-21; AR-6, AR-7; UX-DR11, UX-DR13.

**Acceptance Criteria:**

**Given** the Public Claim Manifest and Claim-instance tests are written first
**When** a manifest key is duplicated/missing, a rendered instance is duplicated/missing, a positive Claim uses a forbidden classification, a limitation is absent, or a surface overrides Claim text/classification/limitation
**Then** content validation fails
**And** valid reuse gives every render a unique `claimInstanceId` while one manifest `evidenceKey` retains exact text, System, classification, public-safe state, and limitation.

**Given** the three flagship narratives render
**When** they are read in page order
**Then** Form Management uses a governed contract spread, VisionFlow Studio uses a cross-runtime Queue Handoff route, and Production Booking & Operations Platform uses a six-station Fourth Pricing Change loop
**And** Form distinguishes identity from authorization, Temporary Preview from Persisted Document, persisted Audit, and the stale-summary Failed Gate; VisionFlow names deterministic ingestion, locked dataset versions, controlled pipeline/queue ownership, guarded inference, deterministic evaluation, and no fresh service-runtime proof; each flagship includes the useful evidence-supported subset of trigger, constraint, decision, mechanism, failure boundary, verification, result, and lesson without forcing one template.

**Given** a material Flagship Claim
**When** it is displayed in the Atlas, narrative, or evidence marker
**Then** its literal classification and limitation come from the manifest, its link reaches `#evidence-boundary`, and wording distinguishes source/local/test/runtime/production evidence
**And** no employer, scale, live-production, client, price, outcome, or fresh-runtime fact exceeds its evidence boundary.

**Given** any of the three Flagship Systems is selected or its narrative is open
**When** the reader activates **Read this case** from the readable topology or **Compare this topology** from the narrative
**Then** the first link reaches that System's existing narrative anchor, while the reverse link atomically selects the same System before reaching `#atlas`
**And** selection survives the round trip, the target heading/control receives visible programmatic focus without moving focus for scene readiness, and browser Back preserves a coherent selected System and reading position.

### Story 2.3: Inspect Supporting Systems and the Evidence Boundary

As a privacy-conscious reader,
I want concise supporting proof and an explicit evidence policy,
So that I can understand both the breadth of the work and the limits of each public Claim.

**Requirements:** FR-8, FR-9; NFR-19, NFR-20, NFR-21; AR-6, AR-7, AR-15; UX-DR12, UX-DR13, UX-DR14.

**Acceptance Criteria:**

**Given** the Supporting Narratives
**When** Parkly is read
**Then** a compact branch strip shows Capture → Decision → Session or Manual Review → Audit, calls the lock a custom Redis ownership lock, and keeps the outbox as a visibly separate rail
**And** it never says Redlock or invents a Manual Review-to-outbox event.

**Given** TFT Local Copilot is read
**When** its lab-note sequence renders
**Then** Source, Ingestion, Embedding, Vector Store, Retrieval, Local Model, and Stream remain visible with the incomplete runtime boundary
**And** it never claims a registered, migrated, working end-to-end RAG runtime; both Supporting Narratives are visibly shorter and carry more prominent limitations than every Flagship Narrative.

**Given** `#evidence-boundary`
**When** a reader arrives from any narrative marker or a direct anchor
**Then** it distinguishes Public Claim Manifest classifications from release assertion labels, states allowed category labels and private-ledger exclusion, and gives each Claim limitation literal text
**And** no private ledger path, raw evidence, screenshot, identifier, price, provider setting, credential, payment detail, room identity, or internal release record is present or linked.

**Given** either Supporting System or any of the five completed System narratives
**When** the reader uses **Read this case** or **Compare this topology** by keyboard, touch, or pointer
**Then** every topology-to-narrative and narrative-to-Atlas route resolves to the same stable System ID, reverse navigation selects that System before focusing the Atlas control, and no parallel selection state is introduced
**And** all five round trips preserve selection through direct anchors, browser Back, resize, and orientation without a dead target or focus inside Canvas.

### Story 2.4: Receive a Meaningful Optional Atlas Scene

As a reader on an eligible device,
I want a restrained spatial view of the selected topology,
So that depth and the Active Handoff reinforce the same relationships I can already read.

**Requirements:** FR-4, FR-5, FR-6; NFR-6, NFR-12, NFR-15, NFR-16, NFR-24; AR-3, AR-4, AR-5, AR-9, AR-17, AR-18; UX-DR8, UX-DR9, UX-DR10.

**Acceptance Criteria:**

**Given** Atlas eligibility is computed by pure tested policy
**When** width is below `768px`, Reduced Motion is true, WebGL is unsupported, first viewport entry has not occurred, or `failed-sticky` is set
**Then** no Canvas or 3D module mounts and the complete DOM topology remains primary
**And** the one-shot detached WebGL probe caches only a boolean, requires and invokes `WEBGL_lose_context`, removes its probe canvas, returns true only after successful release, treats missing extension/release/cleanup error as unsupported, and never coexists as a second context; eligibility changes preserve selected System/focus without retrying a sticky failure.

**Given** all eligibility axes pass after first Atlas viewport entry
**When** the lazy adapter resolves
**Then** exactly one pointer-inert, `aria-hidden`, unfocusable Canvas mounts inside reserved space with DPR `[1, 1.5]` and `frameloop="demand"`
**And** `selectedSystemId` remains the sole DOM-owned product state; scene code consumes it read-only and cannot write selection, content, focus, or navigation, while only the lazy scene closure imports Three, R3F, or Drei and eager graph/core/DOM/section modules cannot import or re-export them.

**Given** a new System selection
**When** the scene reconfigures
**Then** it retargets from current values for `520ms`, traces the Active Handoff once for `360ms`, applies Rust focus to required `focusNodeId`, then settles with no idle animation
**And** `useFrame` changes only renderer-local refs/objects, never React state; `invalidate` runs only during the finite onscreen transition, stops when settled/offscreen, rapid onscreen reselection interrupts rather than queues stale motion, and offscreen reselection runs zero choreography/continuous invalidations then uses at most one snap-to-settled frame on re-entry.

### Story 2.5: Keep the Atlas Useful Through Failure, Resize, and Return

As a reader whose device or preferences change,
I want Atlas meaning and control to survive every renderer state,
So that the focal visualization never becomes a reliability or accessibility cost.

**Requirements:** FR-5, FR-6; NFR-6, NFR-10, NFR-11, NFR-16, NFR-24; AR-4, AR-9, AR-13, AR-15; UX-DR7, UX-DR8, UX-DR10.

**Acceptance Criteria:**

**Given** the scene chunk rejects, WebGL initialization/context/rendering fails, or a boundary throws
**When** SceneBoundary handles the error
**Then** only the scene enters literal `failed-sticky` bypass, reserved layout remains stable, the readable topology/selector/navigation stay operable, and no retry occurs before full reload
**And** the scene adapter catches `webglcontextlost` outside the React boundary, calls `preventDefault`, transitions once, unmounts Canvas, cleans its listener, and preserves DOM selection/focus with no page-level error or critical console leak.

**Given** a healthy scene crosses `768px`, Reduced Motion, visibility, or orientation boundaries
**When** eligibility is lost and later restored
**Then** Canvas unmounts/remounts only when allowed, selection and DOM focus persist, offscreen work stops, return resumes settled rather than replaying entrance motion, and no extra Canvas survives
**And** component/browser tests cover aborted and delayed import—including eligibility loss while `scene-pending` so a resolved chunk cannot mount after bypass—probe cleanup/release, resize, late settled-state preference/support loss, runtime context loss, rapid selection, offscreen reselection frame/invalidation counts, offscreen return, and full-reload reset.

**Given** any supported viewport or fallback state
**When** DOM and scene inputs are compared
**Then** selected System, node/route set, Active Handoff, focus destination, limitation, and narrative link are equivalent
**And** the scene contains no exclusive Claim, label, navigation, orbit, zoom, pan, drag, decorative particle, bloom, shader noise, or unmapped glow.

## Epic 3: Show How Engineering Decisions Survive Change

Readers can follow the anonymous Fourth Pricing Change adaptation loop, see how AI-assisted work is constrained and accepted, inspect literal verification and Failed Gate treatment, and connect outcome-based capabilities back to concrete System anchors.

### Story 3.1: Follow the Anonymous Fourth Pricing Change

As a collaborator,
I want to see how a changing requirement moved through engineering and release,
So that I can evaluate adaptation without receiving confidential client detail.

**Requirements:** FR-10; NFR-17, NFR-18, NFR-19, NFR-21; AR-6, AR-7; UX-DR11.

**Acceptance Criteria:**

**Given** the Adaptation Loop
**When** the dedicated `#adaptation` chapter reuses the six-station fixture and visual primitive already delivered with the Production Booking & Operations Platform flagship
**Then** Feedback → Pricing Rule → Implementation → Verification → Release → Next Revision is ordered, readable, keyboard reachable, and linked bidirectionally to the Production Booking & Operations Platform narrative
**And** the Fourth Pricing Change focuses the representative revision without exposing a price or client-derived alias.

**Given** privacy and Claim validation
**When** representative fake currency values, client/provider identifiers, payment data, room IDs, private paths, or unsupported production wording enter the adaptation fixture
**Then** validation fails with stable safe diagnostics that do not echo the private value
**And** the approved public version distinguishes Git/source evidence from live-production proof.

**Given** mobile, tablet, desktop, and Reduced Motion
**When** the six-station form reflows
**Then** order and Active Handoff meaning remain intact without clipped text, arrows that imply a false route, or animation-dependent sequence
**And** the chapter remains visually distinct from contract, cross-runtime, branch-strip, and lab-note narratives.

### Story 3.2: Inspect the Controlled AI and Verification Loop

As an engineering interviewer,
I want to see where generated work becomes accepted work,
So that I can judge process control rather than tool enthusiasm.

**Requirements:** FR-11, FR-12; NFR-17, NFR-18, NFR-19, NFR-28; AR-6, AR-11, AR-15; UX-DR14, UX-DR15.

**Acceptance Criteria:**

**Given** the AI-assisted engineering chapter
**When** it is read in order
**Then** it presents Intent → Research → Product Brief → PRD → UX Contracts → Spec → Architecture → Story → Scoped Implementation → Harness → Review → Browser QA → Release Evidence under **THE AGENT WRITES. THE HARNESS DECIDES.**
**And** contracts, context engineering, deterministic gates, review, browser QA, and release evidence—not model or tool branding—own acceptance.

**Given** the public Verification Harness
**When** its rows render
**Then** every required gate category appears with a stable acceptance job and public-safe qualification, including the exactly qualified stale-summary Failed Gate
**And** every row links to `#evidence-boundary`, while none renders or links commands, exit codes, counts, timestamps, SHA, workflow, production URL, payloads, assets, review scopes, evidence references, internal receipts, current `PARTIAL`, or `VERIFIED_COMPLETE`.

**Given** a future content edit attempts to mark a failed/stale/unrun category as current passing or add a forbidden internal field
**When** content validation runs
**Then** the build fails
**And** public Claim classifications remain separate from `VERIFIED`, `OBSERVED`, `INFERRED`, and `BLOCKED` release vocabulary.

### Story 3.3: Connect Capabilities to Concrete System Outcomes

As a hiring reader,
I want a concise synthesis of demonstrated engineering outcomes,
So that I can translate five case narratives into useful interview themes.

**Requirements:** FR-13; NFR-17, NFR-18, NFR-20; AR-2; UX-DR16.

**Acceptance Criteria:**

**Given** the capabilities chapter
**When** it renders from the authoritative graph
**Then** it groups governed domain contracts, asynchronous boundaries, deterministic data flows, operational handoffs, requirement adaptation, and release verification by outcome
**And** every outcome links to at least one existing System anchor without inventing a strength level.

**Given** content and live screenshot review
**When** the chapter is evaluated
**Then** it contains no logo cloud, skill percentage, technology inventory, generic pill collection, unsupported expertise claim, or repeated promotional card anatomy
**And** each statement uses active verbs, concrete nouns, one job per sentence, and an evidence-grounded artifact or handoff.

**Given** any viewport in the release matrix
**When** capability links are used by keyboard, touch, or pointer
**Then** the target narrative heading remains visible and focus treatment is perceivable
**And** layout retains intentional rhythm without horizontal overflow or equal-card monotony.

## Epic 4: Trust, Share, and Verify the Public Release

Readers can contact Le Huy, open GitHub, download a deterministic facts-only CV, share a correctly identified page, and trust that the public GitHub Pages artifact was accepted by the complete harness and attested to the exact deployed SHA.

### Story 4.1: Contact Le Huy and Download a Facts-Only CV

As a recruiter or collaborator,
I want verified contact destinations and a readable one-page CV,
So that I can take the next step without encountering invented facts or a broken document.

**Requirements:** FR-14; NFR-4, NFR-21, NFR-27; AR-14; UX-DR4, UX-DR16, UX-DR17.

**Acceptance Criteria:**

**Given** the canonical public graph
**When** `npm run generate:cv` runs repeatedly with pinned `pdf-lib`
**Then** it produces byte-identical `public/le-huy-software-engineer-cv.pdf`, one page and at most `524288` bytes, from a sorted facts-only projection with fixed metadata, generator version, and projection SHA-256
**And** this story installs exact `pdf-lib@1.17.1` and `pdf-parse@2.4.5` pins into the lockfile before generation; no clock, random value, education, employment, employer, client, award, location, phone, photo, metric, testimonial, or private detail enters the PDF.

**Given** `npm run verify:cv`
**When** it regenerates and parses the candidate
**Then** byte equality, filename, size, unencrypted structure, one-page count, required text/order, metadata digest/version, and exact `/URI` annotations for `mailto:huyle210525@gmail.com` and `https://github.com/lhcaps` pass
**And** a fixture for each missing, reordered, encrypted, image-only, wrong-link, extra-page, or oversized condition fails.

**Given** the Closing
**When** Work with me, email, GitHub, and CV are used by keyboard, touch, or pointer
**Then** all destinations are visible, allowlisted, securely attributed, and valid; the CV is a same-origin download with the exact filename
**And** the copy is direct and human without a lead form or availability dashboard.

### Story 4.2: Share a Correctly Identified Portfolio

As a reader sharing or indexing the page,
I want complete verified metadata and static identity,
So that the portfolio resolves accurately in search, previews, assistive technology, and direct loads.

**Requirements:** FR-15; NFR-21, NFR-22, NFR-26; AR-7, AR-12; UX-DR18.

**Acceptance Criteria:**

**Given** a production build
**When** metadata validation inspects `index.html` and the authoritative graph
**Then** title, description, canonical `https://lhcaps.github.io/`, Open Graph, Twitter, favicon, robots, sitemap, and parseable Person/ProfilePage JSON-LD exist with base-path-safe URLs and verified facts only
**And** every referenced asset resolves with the expected type and no stale anchor or extension.

**Given** the closed public-source allowlist
**When** prebuild scans `public/**`
**Then** only `favicon.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`, and `le-huy-software-engineer-cv.pdf` pass, while Vite alone emits closed five-field `release.json`
**And** legacy credentials, OG SVG, raster hero, source maps, screenshots, unknown binaries, internal receipts, remote fonts, and unexpected public files fail.

**Given** local preview and base-path fixtures
**When** desktop and mobile checks request direct loads and link-preview assets through the built candidate
**Then** response status, media type, canonical URL, JSON-LD parse, image dimensions, sitemap/robots content, and release-identity schema pass without requiring a deployed origin
**And** the public UI neither fetches nor links machine-only `release.json`; final-origin response assertions are owned only by Story 4.11.

### Story 4.3: Build and Stage a Deterministic Release Candidate

As a maintainer,
I want deterministic source, test, build, budget, and staging gates,
So that an invalid or excessive candidate cannot become a Pages artifact.

**Requirements:** FR-16; NFR-13, NFR-14, NFR-15, NFR-19, NFR-21, NFR-25; AR-7, AR-10, AR-13, AR-15, AR-17, AR-21.

**Acceptance Criteria:**

**Given** Vitest coverage and dependency validation
**When** `npm run test:coverage` runs
**Then** `src/content/validate.ts`, `src/atlas/core/claims.ts`, `src/atlas/core/eligibility.ts`, `src/atlas/core/motion.ts`, `src/atlas/core/sceneSlots.ts`, and `src/atlas/core/topology.ts` each meet 100% lines, branches, functions, and statements; the project meets at least 85% lines/functions/statements and 80% branches with no exclusion of a named file
**And** exact pins match Node `22.23.1`, npm `11.12.1`, React/DOM `19.2.6`, Vite `8.0.16`, TypeScript `6.0.3`, Tailwind `3.4.19`, Framer Motion `11.18.2`, Three `0.184.0`, R3F `9.6.1`, Drei `10.7.7`, both Fontsource packages `5.3.0`, Vitest/coverage `4.1.8`, Testing Library React `16.3.2`, Playwright `1.60.0`, axe Playwright `4.13.0`, tsx `4.23.12`, pdf-parse `2.4.5`, and pdf-lib `1.17.1`.

**Given** the exact lockfile and registry audit response
**When** `npm run verify:dependencies` parses `npm audit --json` deterministically
**Then** the result contains zero advisories after resolution, removal, or upgrade; this release has no waiver path, and any future waiver requires a separately reviewed architecture amendment before implementation
**And** malformed output, command failure, unknown severity, or any remaining advisory fails while Release Evidence retains only the command exit and aggregate counts by severity.

**Given** Vite build output
**When** output, module, and budget validators run
**Then** `dist/.vite/manifest.json`, internal chunk inventory, eager/lazy closure ownership, no eager Three/R3F/Drei, no extra dynamic root, no source map/remote font/GLB/texture/raster hero, and every numeric gzip/transfer/asset/CV budget pass
**And** entry-only, lazy-only, shared, nested-dynamic, cycle, missing-file, malformed-inventory, and budget-excess fixtures behave exactly as contracted.

**Given** deterministic encoder tests
**When** CanonicalJsonV1, FileRecordV1, ReviewSourceV1, or PAGES-SITE-V1 inputs are reordered, changed, malformed, unsafe, linked, or byte-identical
**Then** exact vectors prove cross-platform-stable hashes and every prohibited value/path/file form fails
**And** `scripts/stage-pages.mjs` copies validated public regular files byte-for-byte into fresh `artifacts/pages-site/`, intentionally excludes only `dist/.vite/**`, includes `release.json`, rejects every other dotfile/map/link/internal/unknown output, emits the exact PAGES-SITE-V1 digest, and writes the closed source-SHA/tree/digest-bound Asset Inventory v1 with sorted file records, byte/gzip units, roles, flags, and recomputable totals.

### Story 4.4: Audit Reachable History and Confidential Output

As a privacy-conscious maintainer,
I want safe history and confidentiality receipts,
So that sensitive material cannot hide in an older blob or a staged public artifact.

**Requirements:** FR-9, FR-16; NFR-21, NFR-23, NFR-28; AR-7, AR-16, AR-19, AR-22.

**Acceptance Criteria:**

**Given** tracked `docs/release/history-safe-patterns.v1.json` and a non-shallow candidate
**When** `npm run verify:history` scans every reachable commit message/unique blob plus each declared generated-evidence root
**Then** it validates rules digest/version, generic text/path/binary policy, the exact allowed Cursor trailer, current SHA/tree/counts, and emits only aggregate rule IDs/counts into the closed ignored receipt
**And** shallow, missing-object, unsafe commit/blob/output, unknown current binary, stale receipt, or any logged matched value fails.

**Given** the off-repository confidentiality review and the staged candidate from Story 4.3
**When** approved public graph/artifacts are compared with private evidence
**Then** only `docs/release/confidentiality-review.v1.json` is tracked, with exact five fields, ordered scopes, non-future time, `pass`, and the deterministic digest over CanonicalJsonV1 plus staged FileRecordV1 assets except closed `release.json`
**And** no reviewer identity, private path, source value, note, identifier, or private Evidence Ledger content enters the receipt, history, artifacts, logs, screenshots, or deployment.

**Given** changed graph, asset, scope, ordering, result, time, path, link, file type, or identical rebuild fixtures
**When** confidentiality verification runs
**Then** every mismatch or unsafe shape fails and the identical rebuild passes
**And** the receipt remains outside `artifacts/pages-site/`.

### Story 4.5: Prove Every Reader Journey in Real Chromium

As a portfolio reader,
I want the page to behave consistently across devices, input methods, motion preferences, and renderer failures,
So that visual ambition never removes access or trust.

**Requirements:** FR-1 through FR-16; NFR-1 through NFR-16, NFR-24 through NFR-26; AR-9, AR-13, AR-15; UX-DR1 through UX-DR18.

**Acceptance Criteria:**

**Given** Playwright and axe
**When** they run at `375×667`, `390×844`, `768×1024`, `1024×768`, `1280×720`, `1280×800`, `1440×900`, and `1920×1080`, plus both sides of every breakpoint and constrained-height cases
**Then** all four reader journeys, all five selections/narratives, direct anchors, mobile disclosure, Work with me, email, GitHub, CV, metadata, console, and overflow assertions pass
**And** sub-768 is one column, `768–1023px` stacks Atlas/topology, desktop uses the exact 7/5 Opening and 5/7 Atlas inside a maximum `1440px` shell, every sub-768/Reduced Motion path proves Canvas absent, and eligible desktop covers ready/contained failure.

**Given** automated and manual accessibility review
**When** keyboard, focus, content order, names, landmarks, `aria-pressed`, exact live announcement, 44px targets, contrast, zoom, touch emulation, resize, and orientation are inspected
**Then** WCAG 2.2 AA targets and DOM equivalence pass with no clipped focus, obscured anchor, scroll trap, sticky collision, hover-only information, or focus inside Canvas
**And** screenshots complement rather than replace behavioral and computed-layout assertions.

### Story 4.6: Encode the Governed Pages Pipeline

As a release owner,
I want the complete Pages workflow and artifact-provenance verifier fixed before the candidate is reviewed,
So that reviewers bind the exact automation source that will later deploy.

**Requirements:** FR-16; NFR-21, NFR-25, NFR-26, NFR-28; AR-11, AR-12, AR-15, AR-16.

**Acceptance Criteria:**

**Given** the tracked workflow and lockfile
**When** their static contract tests run without publishing anything
**Then** CI pins Node 24 actions checkout `3d3c42e5aac5ba805825da76410c181273ba90b1 # v7` with `fetch-depth: 0`, setup-node `820762786026740c76f36085b0efc47a31fe5020 # v7`, configure-pages `45bfe0192ca1faeb007ade9deae92b16b8254a0d # v6`, upload-pages-artifact `fc324d3547104276b827a68afc52ff2a11cc49c9 # v5`, deploy-pages `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128 # v5`, and upload-artifact `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7`; asserts Node `22.23.1` and npm `11.12.1`; runs `npm ci`, installs Chromium, and calls the unchanged canonical `npm run verify` before upload
**And** top-level permissions are empty; build/provenance has exactly `contents: read` plus `actions: read`, deploy exactly `actions: read` plus `pages: write` plus `id-token: write`, and hosted attestation exactly `contents: read` plus `actions: read`; any extra/differently scoped permission fails, while internal Release Evidence uploads with `if: always()` and no receipt enters Pages.

**Given** the sole planned `github-pages` upload from `artifacts/pages-site/`
**When** provenance-verifier fixtures exercise the GitHub artifact response and downloaded archive
**Then** exact artifact ID/name, workflow run/head, non-expiry, REST `sha256:<64 lowercase hex>` digest, uniqueness, SHA-256 equality with the downloaded raw outer archive bytes, safe outer/inner extraction, and recomputed PAGES-SITE-V1 equality are required; the dependent deploy job consumes the exported exact artifact name
**And** missing, duplicate, expired, wrong-run/head, missing/malformed/wrong-algorithm digest, raw-byte mismatch, unsafe archive, extracted digest mismatch, path escape, link, non-file, or a second upload fails closed before deploy.

**Given** the workflow is inspected before any push
**When** its job graph and output wiring are validated
**Then** verification and provenance are prerequisites of deployment, the `github-pages` environment is the sole publish target, the returned canonical page URL is recorded internally, and no deployment-SHA field is invented
**And** this story changes workflow/verifier source and tests only; it does not push, upload, or deploy.

**Given** every non-review local child gate owned by Stories 1.1–4.6
**When** `scripts/verify.mjs` is completed before operator documentation
**Then** it is the canonical ordered composer for source/privacy/history/content/topology, typecheck, lint, coverage, dependency audit, build, output/budget/staging/CV, Playwright/axe/matrix, and destination checks, and it always writes schema-v1 Release Evidence plus Asset Inventory v1
**And** Story 4.8 extends this existing composer only with the finalized independent-review child and preupload evidence closure; it does not create a second verifier or replace its command contract.

### Story 4.7: Document the Real Operator Contract

As a contributor,
I want concise documentation of the architecture and release path actually in use,
So that I can run, verify, and maintain the portfolio without reverse-engineering stale instructions.

**Requirements:** FR-16; NFR-25, NFR-26, NFR-28; AR-11, AR-12, AR-16; UX-DR18.

**Acceptance Criteria:**

**Given** the implemented repository, including the governed workflow from Story 4.6
**When** README is reviewed against package scripts and source ownership
**Then** it documents prerequisites, exact local commands, authoritative graph, one-Canvas semantics, DOM fallback, accessibility, tests/browser QA, numeric budgets/measurement, canonical verification, internal/public evidence boundary, Pages staging/workflow, exact-SHA attestation, and conditional history safety
**And** it contains no stale GLB, two-scene, remote-font, build-only CI, or public-release-record instruction.

**Given** `docs/performance-budget.md`
**When** it is compared with AD-10 and measured inventory
**Then** it states exact budgets, gzip/transfer units, eager/lazy closure method, font/static/CV limits, internal Vite manifest role, and PAGES-SITE-V1 staging boundary
**And** it never reports a baseline or gate as passing without current Release Evidence.

**Given** documentation links
**When** local and CI checks run
**Then** every referenced script, contract, artifact path, command, public endpoint, and source owner exists with exact case
**And** private evidence paths or internal artifact values are not exposed in public output.

### Story 4.8: Bind Independent Reviews and Compose Canonical Verification

As a release owner,
I want one exact-candidate verifier that consumes every completed gate and independent review,
So that only the fully authored and reviewed tree can be accepted locally or in CI.

**Requirements:** FR-16; NFR-7, NFR-21, NFR-25, NFR-28; AR-11, AR-13, AR-15, AR-19; UX-DR18.

**Acceptance Criteria:**

**Given** completed product, evidence/privacy, visual/responsive, motion, accessibility, simplicity, code/integration, and local-screenshot reviews of the candidate from Stories 4.1–4.7, including final workflow source and documentation
**When** `scripts/verify-reviews.mjs` runs
**Then** each exact tracked report carries the same ReviewSourceV1 digest, `pass`, no unresolved material finding, a non-future time, and an allowed path; the ignored index repeats clean full SHA/tree/source digest per record and binds each report's raw SHA-256
**And** missing, untracked, modified, symlinked, escaping, wrong-digest, wrong-SHA/tree, failed, blocked, or unresolved evidence fails without entering staging.

**Given** the existing `npm run verify` composer from Story 4.6 on a clean non-shallow candidate
**When** Story 4.8 adds the finalized reviewer gate and runs the canonical command against the documented candidate
**Then** it records each child category/command/result/exit/count/nonnegative integer `durationMs`/limitation before deciding status, always writes schema-v1 Release Evidence and the closed Asset Inventory v1, and exits nonzero for any required failure
**And** after every local child artifact is final, phased GENERATED-EVIDENCE-V1 validates every declared root and writes its closed `preupload` phase/SHA/tree/digest/count/full sorted path-byte-hash manifest/result/time attestation; hosted-final must subtract only the exact hosted-only set, recompute and equal that preupload projection before its own digest, and any changed/removed/colliding, unsafe, stale, malformed, linked, generic reporter, or unauthorized inter-phase output fails.

**Given** every required local gate passes
**When** the local candidate is declared ready for history governance and deployment
**Then** Release Evidence is internally `VERIFIED` for the exact SHA/tree and every retained count/limitation is current
**And** no public page copy, `release.json`, or Pages staging file claims `VERIFIED_COMPLETE`.

### Story 4.9: Apply Conditional History Governance Safely

As the repository owner,
I want the authorized trailer rule applied only when the exact target exists,
So that genuine authorship and repository history are preserved whether the candidate is rewritten or unchanged.

**Requirements:** FR-16; NFR-21, NFR-23; AR-16.

**Acceptance Criteria:**

**Given** every local gate and review passes
**When** the exact target-line audit runs
**Then** it records remote `main` lease SHA, all author/committer identities, asserts the configured local identity is exactly `Huy Le <huyle210525@gmail.com>`, and counts only complete lines equal to `Co-authored-by: Cursor <cursoragent@cursor.com>`
**And** if the count is zero, no rewrite occurs and the unchanged candidate proceeds; if the count is positive, an external Git bundle is created, `git bundle verify` succeeds against the recorded candidate ref before rewrite, and identity ambiguity, missing advertised ref, bundle failure, or remote drift blocks work.

**Given** a positive exact target count
**When** the approved deterministic message callback runs
**Then** it removes only that complete line and never matches another `cursor` occurrence, prose, code, trailer, identity, whitespace, or message content
**And** no reset, clean, stash, worktree, broad staging, secret access, or unrelated-file mutation occurs.

**Given** old and candidate refs after either the no-op or rewrite branch
**When** equivalence, target recount, `npm run verify:history`, and `npm run verify` rerun
**Then** commit count, parent topology/order, author/committer identities, authored/committed dates, every tree, and all non-target message bytes match; target count is zero when rewritten; the exact candidate receives fresh SHA-bound evidence
**And** any mismatch aborts before push while the external bundle remains recoverable; the zero-target branch also records `<verified-candidate-ref>` for an explicit refspec and never relies on the current branch/upstream.

### Story 4.10: Deploy the Sole Verified Pages Artifact

As a public reader,
I want GitHub Pages to deploy only the candidate and artifact that passed verification,
So that a different tree or upload cannot slip between CI and production.

**Requirements:** FR-16; NFR-21, NFR-26, NFR-28; AR-11, AR-12, AR-15, AR-16.

**Acceptance Criteria:**

**Given** the exact candidate approved by Story 4.9, rewritten only when its conditional branch required it
**When** remote `main` is re-read and the zero-target branch runs `git push origin <verified-candidate-ref>:refs/heads/main`, or the positive rewrite branch uses exact `--force-with-lease=refs/heads/main:<recorded-remote-sha>` with its explicit candidate refspec
**Then** remote drift aborts safely, and the already-reviewed workflow from Story 4.6 executes with its pinned runtime/actions and passes `npm run verify` before upload
**And** internal Release Evidence uploads with `if: always()` while no internal receipt enters the public artifact.

**Given** the sole `github-pages` upload from `artifacts/pages-site/`
**When** provenance verification runs with `actions: read`
**Then** the exact REST record proves immutable artifact ID/name, workflow run/head, non-expiry, archive digest, a sole matching artifact, and safely extracted PAGES-SITE-V1 equality; the dependent deploy job consumes the exported exact name
**And** missing, duplicate, expired, wrong-run/head, unsafe archive, digest mismatch, or a second upload blocks deployment.

**Given** pre-upload verification and provenance pass
**When** the Pages deployment job runs
**Then** it deploys that sole artifact into the `github-pages` environment and records the returned canonical page URL internally
**And** no deployment-SHA field is invented or treated as provenance.

### Story 4.11: Attest Production to the Exact Final SHA

As a public reader,
I want the live site to be the exact final candidate with current production evidence,
So that local success and public truth cannot diverge.

**Requirements:** FR-16; NFR-21, NFR-26, NFR-28; AR-11, AR-12, AR-15; UX-DR18.

**Acceptance Criteria:**

**Given** Pages reports deployment success
**When** post-deploy verification fetches cache-busted public endpoints
**Then** closed `release.json`, workflow/build/artifact/expected SHA, canonical URL, desktop/mobile reader paths, no-Canvas mobile, all five Systems, contact/metadata/PDF endpoints, console, overflow, payloads, and major assets pass against the same full SHA
**And** final-origin response status, media types, canonical origin, JSON-LD parse, OG image dimensions, sitemap/robots content, release-identity schema, and the invariant that public UI neither fetches nor links `release.json` all pass here; deployment attestation records pages artifact ID/name/archive digest, pagesSiteDigest, branch state, exact identities, result, and time without entering deployment; exact `artifacts/release/production-smoke.v1.json` records the eleven fixed ordered smoke categories with closed viewport/result/count/limitation fields and root `pass` if and only if every child passes with an empty limitation—otherwise root fails and release is PARTIAL—while production Playwright writes no generic test-results/report output between evidence phases.

**Given** independent live production screenshot review
**When** desktop and mobile screenshots are compared with the final UX/product/motion/accessibility/evidence contracts
**Then** a closed production-review evidence manifest contains sorted, byte-counted, SHA-256-bound regular PNG records under `artifacts/screenshots/production/`, including at least one unique desktop and mobile viewport; the non-deployed production review attestation targets workflow SHA and fetched identity, is `pass`, has no unresolved finding, references that exact manifest, and binds its raw bytes with `evidenceDigest`
**And** no private or internal record appears in screenshots or public responses; after every hosted record is final, hosted-final GENERATED-EVIDENCE-V1 admits only deployment attestation, exact smoke record, production review evidence/attestation, and manifest-listed production PNGs, re-proves all preupload bytes unchanged, writes the last workflow mutation, and permits no later generated-root change.

**Given** remote `main` advances before final attestation or any hosted gate is missing/failing
**When** release status is computed
**Then** the run is `PARTIAL` and never `VERIFIED_COMPLETE`; a newer head must complete its own attested workflow
**And** `VERIFIED_COMPLETE` is reported only when remote main, deployed identity, artifact provenance, production smoke, byte-bound production review, passing hosted-final evidence attestation, all local/hosted gates, and every limitation match the final full SHA.

## Implementation Ownership and Churn Map

| Story | Primary owned paths | Planned later extension |
| --- | --- | --- |
| 1.1 | `src/content/portfolio.ts`, `src/styles/**`, Opening section, root app shell | System graph is extended by 2.1–2.3 without adding another authority. |
| 1.2–1.3 | layout/header/navigation components and their tests | 3.x adds destinations only through existing anchors. |
| 2.1 | content/topology schemas, `src/atlas/core/**`, selector/readable-topology components | 2.4 consumes core read-only; 2.5 adds integration tests. |
| 2.2–2.3 | Claim Manifest, narrative/evidence content, authored narrative sections | 3.1 reuses the Booking loop; 3.2 adds one Harness link to the existing Evidence Boundary. |
| 2.4–2.5 | `src/atlas/scene/**`, eligibility bridge, scene/fallback tests | No later epic modifies scene ownership. |
| 3.1–3.3 | Adaptation, AI engineering, public Harness, capability sections | Epic 4 validates these surfaces without changing their content authority. |
| 4.1 | CV generator/verifier, committed PDF, Closing destinations, and only the exact `pdf-lib`/`pdf-parse` package-lock pins needed by this story | 4.3 validates these pins with the complete package matrix; later verification only composes the existing CV gate. |
| 4.2 | document metadata and approved public static identity assets | Later staging copies validated bytes only. |
| 4.3 | remaining package/config pins, coverage, build/output/budget/digest/staging child scripts | 4.6 composes these commands without reimplementing them. |
| 4.4 | history rules/scanner and confidentiality receipt/verifier | 4.8 consumes their receipts; 4.9 reruns history after any rewrite. |
| 4.5 | `e2e/**`, Playwright/axe config, local screenshot evidence | 4.8 hashes finalized reports; 4.11 owns live production-only evidence. |
| 4.6 | `.github/workflows/**`, artifact-provenance verifier and fixtures, and the non-review canonical `scripts/verify.mjs` composer | 4.7 documents the exact workflow/composer; 4.8 adds only the final review child and evidence closure; 4.10 only triggers it. |
| 4.7 | `README.md`, `docs/performance-budget.md` | Documentation describes the already-existing canonical verifier; final documentation is part of the ReviewSourceV1 input before review. |
| 4.8 | reviewer reports/index generator, final reviewer child integration into the existing `scripts/verify.mjs`, and preupload evidence closure | CI in 4.10 invokes the same reviewed command unchanged. |
| 4.9 | external bundle and Git message/ref operations only | No product-tree file changes are permitted; unchanged trees preserve ReviewSourceV1. |
| 4.10 | push lease, hosted workflow run, sole artifact and Pages deployment | 4.11 consumes immutable outputs without changing upload semantics. |
| 4.11 | ignored production evidence/attestations and final report | No source mutation or redeploy is permitted during attestation. |

The overlap is intentional and ordered: an earlier story establishes one owner, while a later story either extends data through that owner or composes an existing command. No epic introduces a parallel content, scene, verification, or release authority.
