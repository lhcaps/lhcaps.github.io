---
name: 'Le Huy Systems Atlas'
status: final
sources:
  - _bmad-output/planning-artifacts/prds/prd-Portfolio-2026-08-22/prd.md
  - _bmad-output/planning-artifacts/prds/prd-Portfolio-2026-08-22/addendum.md
  - PRODUCT.md
design: DESIGN.md
updated: '2026-08-22'
canonical: '_bmad-output/planning-artifacts/ux-designs/ux-Portfolio-2026-08-22/EXPERIENCE.md'
---

# Le Huy Systems Atlas: Experience Spine

## Foundation

Systems Atlas is one responsive public web page with a brand register. Desktop and laptop are the primary reading surfaces; tablet and mobile preserve the complete narrative and topology meaning. There is no application shell, account state, CMS, theme switcher, or localization layer.

The page uses a custom visual layer over the existing React and Tailwind foundation. `DESIGN.md` owns appearance. This document owns order, behavior, states, input, accessibility, and reader journeys. The PRD addendum is authoritative for discovery evidence limits, topology directions, scene constraints, and the release review matrix. Repository truth, the final PRD, Public-Safe Evidence, correctness, accessibility, privacy, and verification outrank either spine when implementation facts conflict.

`DESIGN.md` and `EXPERIENCE.md` win on conflict with mockups, wireframes, and imports. The spines inherit the PRD Glossary verbatim. This UX contract introduces no alias for Claim, Evidence Boundary, Failed Gate, Flagship Narrative, Supporting Narrative, Public Claim Manifest, Readable Equivalent Representation, Selected System, System Selector, System Topology, Systems Atlas, or Verification Harness.

The focal Systems Atlas scene is progressive enhancement. Semantic DOM content, the System Selector, every Claim, and the Readable Equivalent Representation load first. The Canvas is `aria-hidden`, contains no exclusive information, receives no keyboard focus, and is omitted below `768px`, under Reduced Motion, or after a WebGL failure.

## Information Architecture

| Surface | Anchor | Reader outcome |
| --- | --- | --- |
| Opening | `#opening` | Identify Le Huy, full-time Junior Software Engineer target, backend-leaning full-stack orientation, concrete proposition, and Primary Action. |
| Systems Atlas | `#atlas` | Select and compare five System Topologies through one focal scene and the Readable Equivalent Representation. |
| Selected Systems | `#systems` | Inspect three distinct Flagship Narratives and two concise Supporting Narratives. |
| Adaptation Loop | `#adaptation` | Follow the anonymous Fourth Pricing Change through Feedback, Pricing Rule, Implementation, Verification, Release, and Next Revision. |
| AI-assisted engineering | `#ai-engineering` | Understand how contracts, scoped implementation, deterministic gates, browser QA, and Release Evidence control generated work. |
| Verification Harness | `#verification` | Inspect real gate categories, qualified results, and a Failed Gate that remains visibly failed. |
| Evidence Boundary | `#evidence-boundary` | Inspect the two evidence vocabularies, allowed public Claim levels, required limitations, and complete private-ledger exclusion rule. |
| Capabilities | `#capabilities` | Connect engineering outcomes to concrete System anchors without a technology inventory. |
| Closing | `#contact` | Activate Work with me, GitHub, email, or the verified facts-only CV. |
| Publication identity | Document head and public static endpoints | Receive verified title, canonical identity, previews, structured profile facts, sitemap, robots policy, and favicon assets at base-path-safe URLs. |

Global navigation links only to the reader-facing unique anchors; the Publication identity surface is validated separately. The brand mark returns to `#opening`. `evidence-marker` and the Verification Harness link directly to `#evidence-boundary`. Desktop navigation stays visible without covering an anchor target. Mobile navigation opens from the header, follows the same order, closes after selection or Escape, and returns focus to its trigger.

Selected Systems is a reading sequence, not a second project selector. The System Selector controls the Systems Atlas and its Readable Equivalent Representation. Narrative anchors remain independently scannable, and each System index entry can link from the Atlas to its corresponding narrative without changing the navigation contract.

## Systems Atlas Meaning

### Shared visual grammar

| Atlas element | Meaning | Readable equivalent |
| --- | --- | --- |
| Depth plane | Authority, persistence, runtime, or human-review boundary named by the Selected System data | Named layer heading with its nodes listed in DOM order |
| Node | Evidence-supported subsystem, contract, state owner, worker, review station, or release station | Labeled item with one-sentence responsibility |
| Route | Evidence-supported dependency, transition, handoff, or ordered adaptation step | Ordered relationship sentence using `from → verb → to` |
| Rust node and route | The canonical **Active Handoff** state: one route plus its optional destination-node focus | `ACTIVE HANDOFF` text plus route wording; never color alone |
| Selected System | The one topology currently in focus | `aria-pressed="true"` on its `system-selector` control and a polite live-region announcement |
| Focus context | Other nodes remain visible but quieter so the Active Handoff keeps its dependencies | Full relationship list stays visible; the Active Handoff appears first |

### Topology contracts

- **Form Management:** Identity → Authorization → Workspace → DOCX Contract, then two literal branches: DOCX Contract → Temporary Preview (non-persisted; no Audit route), and DOCX Contract → Persisted Document → Audit and Verification.
- **VisionFlow Studio:** Media → Dataset Version → Annotation → Pipeline → Queue Handoff → CV Worker → Prediction → Evaluation.
- **Production Booking & Operations Platform:** Feedback → Pricing Rule → Implementation → Verification → Release → Next Revision.
- **Parkly:** Capture → Decision → Session or Manual Review → Audit. The outbox stays a separate delivery rail unless a direct event link becomes verified.
- **TFT Local Copilot:** Source → Ingestion → Embedding → Vector Store → Retrieval → Local Model → Stream. The incomplete runtime boundary stays visible.

### Camera and scene states

The scene has no free orbit, zoom, pan, drag, or node-level control. The System Selector is the exploration surface.

1. **Survey:** stable overview that fits every labeled node and route for the Selected System.
2. **Reconfigure:** interruptible transition from current geometry to the newly Selected System; camera framing retargets from its current position rather than restarting.
3. **Handoff:** one route traces once after reconfiguration and its destination node takes Rust focus.
4. **Settled:** all labels and relationships are static; no idle motion continues.
5. **Bypassed:** the scene is not mounted or has failed; `readable-topology` becomes the primary visual without losing selection or order.

Depth, focus, and movement are derived from the same authoritative topology data used by `readable-topology`. A validator rejects duplicate System IDs, missing nodes, unresolved routes, unnamed planes, motion without a mapped job, or a Claim without a Public Claim Manifest key.

## Evidence and Release Vocabulary

Claim evidence and release assertions are separate contracts. A UI label must identify which contract it displays.

### Public Claim Manifest classifications

| Classification | Literal meaning | Public rule |
| --- | --- | --- |
| `VERIFIED_IMPLEMENTED` | Current source inspection supports the described implementation | May support an implementation Claim with its required limitation; never implies a fresh runtime |
| `VERIFIED_LOCAL` | A fresh local observation supports the stated behavior in the named environment | May support only the observed local scope and time |
| `VERIFIED_TESTED` | A fresh test execution supports the stated test result | Must include applicable count, command, time, and limitation; never implies production |
| `DOCUMENTED_ONLY` | Documentation describes the item, but implementation or runtime is not established | May appear only with literal documented-only wording; cannot support an implemented Claim |
| `PLANNED` | The item is a future direction | Cannot appear as present capability or result |
| `UNVERIFIED` | Available evidence does not support publication | Must not produce a public technical Claim |
| `PRIVATE_DO_NOT_PUBLISH` | Evidence or detail is confidential or unsafe for publication | Must never enter public source, markup, bundle, output, log, screenshot, or deployed artifact |

Every public manifest entry has a stable evidence key, System ID, Claim scope, one classification, `publicSafe: true`, and a required limitation. `evidence-marker` renders that classification and limitation. It never shortens `VERIFIED_IMPLEMENTED` to a generic `VERIFIED` label.

### Release assertion labels

| Label | Literal meaning | Display owner |
| --- | --- | --- |
| `VERIFIED` | A named current gate or attestation completed successfully with retained evidence | Internal Release Evidence and final handoff only; never a public completion badge |
| `OBSERVED` | A state was directly inspected but does not satisfy a complete gate or broader claim | Public `harness-row` only for an approved, static, qualified historical observation; otherwise internal evidence |
| `INFERRED` | A conclusion was derived from evidence but was not directly executed or observed | Internal Release Evidence only, never passing style |
| `BLOCKED` | A gate failed, was not run, or lacks required authority or environment | Public `harness-row` only for an approved literal Failed Gate; otherwise internal evidence |

The Evidence Ledger remains private and unpublished. It is absent from tracked public source, repository history after cleanup, generated site, client bundles, build output, logs, screenshots, review artifacts intended for publication, and deployed assets. The Public Claim Manifest contains only approved fields and is the validator input. Avoiding private detail in visible markup alone is insufficient.

## Verification and Publication Contract

### Discoverable Evidence Boundary

`#evidence-boundary` explains what source, local, tested, runtime, and production evidence can support; shows both controlled vocabularies above; and names the private-ledger exclusion. Every narrative `evidence-marker` offers a “How this claim is classified” link to this anchor. The complete Release Evidence, reviewer attestations, history receipt, and production review remain internal and are never linked or copied into the public page.

The Flagship Narrative for a direct `#systems` arrival offers a “Compare this topology” link to `#atlas`. The selected Atlas state then offers “Read this case” back to the corresponding narrative anchor. Both links are native anchors, keyboard reachable, and preserve the Selected System.

### Verification Harness matrix

| Group | Public static category coverage |
| --- | --- |
| Content contract | Five System IDs, topology nodes/routes/layers, Public Claim Manifest, private-ledger exclusion, public copy and confidentiality checks |
| Static engineering gates | Typecheck, lint, unit tests, production build, dependency audit, and canonical verification entry point |
| Reader paths | Opening, navigation, all five selector states, all five narratives, Adaptation Loop, AI control loop, Verification Harness, Evidence Boundary, Capabilities, Closing |
| Accessibility and responsive | Automated accessibility plus manual keyboard/focus/order/contrast; required viewport matrix, intermediate widths, constrained heights, zoom, resize, orientation, and overflow |
| Scene states | Lazy loading, scene ready, rapid system switching, Reduced Motion, WebGL failure, Bypassed, offscreen pause or demand rendering, and DPR `[1, 1.5]` |
| Destinations and identity | Internal anchors, GitHub, email, CV, canonical, Open Graph, Twitter, JSON-LD, sitemap, robots, favicon, asset paths, console, and referrer-safe external links |
| Review gates | Product, visual, motion, simplicity, code, content, live screenshot, desktop production smoke, and mobile production smoke |
| Deployment attestation | Names exact-SHA Pages deployment and desktop/mobile production smoke as required acceptance categories only; SHA, origin, workflow, artifact, console, payload, result, and limitation details remain internal |

The public summary is a static, qualified explanation of every gate category plus the approved historical Failed Gate; it cannot select only successful categories or assert current release completion. A `harness-row` never exposes or links the internal record and contains no raw command, exit code, test count, timestamp, SHA, workflow, URL, payload, asset inventory, review scope, or evidence reference. `release.json` is a machine-only identity endpoint and is never fetched by the public UI. The complete current record remains a retained internal artifact and the final operator handoff reports it separately.

`VERIFIED_COMPLETE` is allowed only when every required row and final exact-SHA attestation is `VERIFIED` with no unresolved material review finding. Any failed, unrun, missing, stale, or unattested requirement makes the release status `PARTIAL`. Historical successes and current Failed Gates remain visibly qualified and cannot fill a current gap.

### Publication and destination acceptance

- Title, description, canonical URL, Open Graph and Twitter metadata, favicon, sitemap, robots policy, and Person/ProfilePage JSON-LD contain verified facts only and resolve at the final GitHub Pages origin.
- Every metadata and static-asset reference is base-path-safe and returns the expected deployed content type. Structured data parses as JSON-LD.
- The facts-only CV is accepted only when document generation, accessible text extraction, filename, public link, deployed response, and content review all pass. If any fails, the release remains `PARTIAL`; no broken or placeholder CV link is shown as complete.
- New-tab external links disclose that behavior accessibly and use opener isolation such as `rel="noopener noreferrer"` where applicable. URLs contain no credentials, tokens, private identifiers, or referrer-sensitive query data.

## Voice and Tone

Public copy is English, energetic, concrete, direct, technically literate, and human. One sentence does one job. Synecdoche carries personality: the contract, queue, pricing revision, review handoff, and Failed Gate reveal the larger engineering habit. Technical qualifications remain literal.

| Surface | Do | Do not |
| --- | --- | --- |
| Opening | “I build full-stack products from the backend outward: contracts, queues, allocations, review handoffs, and the gates that decide when they ship.” | “Crafting seamless digital experiences with cutting-edge technology.” |
| Systems Atlas | “Five systems. Five different failure surfaces.” | “Explore my innovative project ecosystem.” |
| Form Management | “The DOCX contract decides what every form is allowed to become.” | “A robust legal-tech solution.” |
| VisionFlow Studio | “The request ends here. The job keeps moving.” | “An AI-powered computer vision platform.” |
| Production Booking & Operations Platform | “Pricing changed again. The release loop already knew the route.” | “A scalable production system for a leading client.” |
| Parkly | “Low confidence is a handoff, not a shrug.” | “Smart parking made seamless.” |
| TFT Local Copilot | “A local RAG experiment assembled far enough to expose its missing seams.” | “A fully functional intelligent gaming assistant.” |
| Verification Harness | “A stale summary kept the gate red. Good.” | “All tests passed successfully.” when the observed gate failed |
| Closing | “Bring the problem that refuses to stay still.” | “Let us create something amazing together.” |

The Primary Action label is always **Work with me**. Precise observational humor is allowed when a real condition earns it. Irony, sarcasm, litotes, em dashes, corporate filler, portfolio clichés, fake metrics, and AI superlatives are prohibited.

## Component Patterns

Visual specifications resolve to `DESIGN.md.Components` using the matching component key.

| Component | Use | Behavioral contract |
| --- | --- | --- |
| `primary-action` | Opening and Closing | Native link to verified email/contact destination. Activates by pointer, touch, Enter, or assistive technology. Press feedback starts immediately and never delays navigation. |
| `navigation-link` | Header, skip-to-content variant, Atlas/narrative/Evidence Boundary links, GitHub/email/CV links | Native anchors with descriptive destination. Current section is supplementary information, not the only navigation cue. Skip variant becomes visible on focus. External destinations disclose new-tab behavior, isolate opener access where applicable, and contain no referrer-sensitive query data. |
| `mobile-navigation` | Header below `768px` | Trigger exposes `aria-expanded` and `aria-controls`. Sheet traps focus only while open, closes on Escape, outside click, or selection, restores trigger focus, and makes background controls inert. |
| `system-selector` | Systems Atlas | Five native buttons in source order. Each exposes `aria-pressed`; Enter and Space select. Optional Left/Right and Up/Down keys move to the adjacent System, while Home and End reach the first and last. Selection updates scene, `readable-topology`, Active Handoff, and live announcement atomically. |
| `atlas-frame` | Systems Atlas | Reserves stable space before the scene chunk loads. Contains scene status, focal Canvas, layer legend, and fallback in one boundary. Canvas is never the only representation and never receives focus. |
| `readable-topology` | Systems Atlas, always present; visually primary when Canvas is bypassed | Lists named layers, nodes, and ordered relationships for the Selected System. Selection controls are shared with the scene. No disclosure or accordion hides core topology. |
| `topology-node` | Canvas plates and DOM topology items | Descriptive by default, not interactive. Active Handoff state is data-driven and announced in DOM. A node receives button semantics only if a future approved action and equivalent keyboard behavior exist. |
| `route-annotation` | Atlas relationships, VisionFlow Queue Handoff, Adaptation Loop, AI control loop | Names source, transition verb, destination, and evidence limitation when relevant. The Active Handoff route traces once after selection; repeated selection does not create a loop. |
| `evidence-marker` | Flagship Narratives, Supporting Narratives, Systems Atlas, Adaptation Loop, Evidence Boundary | Shows one exact Public Claim Manifest classification, Claim scope, observed evidence level, and required limitation in literal text. It links to `#evidence-boundary`. Public display reads only from the manifest; the complete private exclusion rule applies. |
| `system-index` | Opening proof index, Selected Systems, Capabilities | One System per ruled row with number, locked evidence-reviewed System title, concrete anchor, and relationship. The anonymous title stays **Production Booking & Operations Platform** unless stricter confidentiality review approves a more generic label; no client-derived alias is allowed. Rows may link to narratives; the whole row is not clickable unless it is one native link. |
| `harness-row` | Public Verification Harness | Presents one gate category, its acceptance job, a public-safe qualification, and only an approved static historical `OBSERVED` or `BLOCKED` example. It never presents current completion or internal commands, counts, timestamps, SHAs, workflows, payloads, assets, review scopes, URLs, or evidence references. The Failed Gate stays in reading order and cannot inherit passing language or styling. |

## State Patterns

| State | Surface | Treatment and announcement |
| --- | --- | --- |
| DOM ready, scene pending | Opening and Systems Atlas | Identity, Primary Action, selector, and `readable-topology` render immediately. `atlas-frame` reserves size and says “Atlas scene loading. The system map is available below.” Eligibility loss cancels the pending mount; a later chunk resolution cannot mount Canvas while bypassed. |
| Scene ready | Systems Atlas | Canvas replaces only the loading field. No focus moves. Status becomes “Interactive scene ready” in a polite live region; the Canvas remains `aria-hidden`. |
| System changing | Systems Atlas | Selector state, heading, and DOM relationships update immediately. Scene retargets from its current geometry. Rapid selection interrupts and retargets cleanly. |
| Reduced Motion | Entire page | Canvas is bypassed. Section content and the complete readable topology appear without spatial movement. Press and focus feedback remain immediate. |
| WebGL unavailable, scene error, or context loss | Systems Atlas | Error is contained inside `atlas-frame`; `readable-topology` becomes primary. Context loss is prevented and mapped once to reload-only sticky failure. Copy says “3D view unavailable. The complete system map is shown here.” No retry loop. |
| Atlas offscreen | Systems Atlas | Demand rendering issues no continuous invalidation. Selection and DOM content continue to work; an offscreen selection queues no choreography. Returning to view uses at most one sync frame and resumes at Settled state, not at the start of an animation. |
| Mobile navigation closed | Header | Only trigger is exposed. Background remains normal. |
| Mobile navigation open | Header | `mobile-navigation` receives initial focus on its first link; page controls behind it are inert. Escape or selection closes and restores trigger focus. |
| Direct anchor load | Any section | Header offset keeps the target heading visible. Focus remains on the browser target unless explicit skip navigation initiated the move. |
| Invalid content, topology, Claim, or destination | Build and deployment | Validation fails before build or deploy. The public page has no runtime empty state for missing required content because invalid release data cannot ship. |
| Failed Gate evidence | Verification Harness | `harness-row` shows the literal failure, exit code or condition, and limitation. It never uses passing copy, a green-only cue, or a euphemism. |
| Release attestation complete | Internal Release Evidence and final operator handoff | `VERIFIED_COMPLETE`, final exact SHA, production origin, workflow run, payload report, and smoke results exist only after every matrix row is verified; the public Harness remains static and never renders this status. |
| Release attestation incomplete | Internal Release Evidence and final operator handoff | Status is `PARTIAL`; every failed, stale, blocked, or unrun record retains its next requirement. A historical success cannot replace current attestation, and the public Harness remains static. |
| CV unavailable or invalid | Closing and deployment | Build or release validation fails. The public Closing does not present a broken, placeholder, inaccessible, or unreviewed CV link as complete. |

## Interaction Primitives

### Navigation

- A skip link reaches the main content before the fixed header navigation.
- Anchor navigation respects Reduced Motion and fixed-header offset.
- The header may condense after the Opening but must never hide the Primary Action or create an availability pill.
- No scroll hijacking, horizontal page pan, custom cursor, or hidden route exists.

### Selection and focus

- The five `system-selector` controls remain native buttons. `aria-pressed` is the single selected-state contract.
- Selecting a System updates the scene and `readable-topology` in the same event, then announces “{System name} selected. {node count} nodes, {route count} routes.”
- The Canvas has `pointer-events: none` unless a later approved node action exists. Decorative hover reactions are absent.
- Focus rings use `{colors.rust}` at two pixels with at least three pixels of offset on `{colors.paper}` or `{colors.paper-raised}`.
- Touch controls use a minimum `44×44` CSS-pixel target even where the WCAG minimum permits less.

### Motion vocabulary

| Job | Primitive | Default timing | Reduced Motion |
| --- | --- | --- | --- |
| Confirm press | `transform: translateY(1px) scale(0.98)` | `90ms` down, `140ms` settle | Keep, with no travel beyond one pixel |
| Reveal section hierarchy | Opacity plus at most `12px` vertical transform | `320ms`, ease-out quint, once | Immediate or opacity-only at `100ms` |
| Reconfigure topology | Position, rotation, scale, and camera transform from current state | `420–560ms`, interruptible ease-out expo | Immediate Settled state |
| Trace handoff | Route draw or opacity reveal, then destination focus | `360ms` once after reconfigure | Route and focus appear together |
| Change current navigation rule | Scale X from the text origin | `180ms`, ease-out quart | Immediate |
| Open mobile navigation | Opacity and `translateY(-8px)` from trigger geometry | `220ms` open, `160ms` close | Opacity-only at `100ms` |

Only `transform`, `opacity`, and renderer-local geometry state animate. No bounce, elastic easing, layout-property tween, infinite loop, shimmer, pulse, floating ornament, or stagger longer than the reader's first glance. Every motion is interruptible and finishes in a stable state.

## Accessibility Floor

- Target WCAG 2.2 Level AA across the complete page and every interaction path.
- Text uses at least `4.5:1` contrast, large text at least `3:1`, and meaningful non-text interface boundaries at least `3:1`, subject to the standard's exceptions. The token pairs and measured ratios live in `DESIGN.md.Colors`.
- The heading outline contains one H1 and ordered H2/H3 descendants. Each anchor target has a visible heading.
- Semantic landmarks are header, navigation, main, named sections, and footer. Lists remain lists; controls remain native buttons or links.
- Reading order matches visual order at every breakpoint. CSS placement never moves content into a contradictory sequence.
- All five Systems, their layers, nodes, routes, Claims, evidence qualifications, and selection state exist in DOM text outside Canvas.
- The Canvas is `aria-hidden`, unfocusable, and optional. A live region announces scene status and Selected System changes without repeating every node.
- Keyboard review covers skip link, header, mobile navigation, all five selectors, system-to-narrative links, Primary Action, GitHub, email, and CV. Focus is never obscured by sticky UI.
- Pointer and touch review covers target size, cancellation, accidental activation, and orientation change. No interaction requires drag.
- Reduced Motion removes continuous and spatially large movement. The same state and sequence remain readable.
- Automated accessibility checks are paired with manual keyboard, focus, zoom, contrast, screen-size, and content-order review.

## Responsive & Platform

| Range | Composition | Atlas behavior |
| --- | --- | --- |
| `320–767px` | One column, `{spacing.gutter-mobile}`, compact fixed header, two-column System Selector with the final item spanning the row, full-width Primary Action where needed | `readable-topology` is primary. Canvas is always omitted, regardless of device capability. |
| `768–1023px` | One main column with selected two-column moments, `{spacing.gutter-tablet}`, navigation links visible when height allows | Selector and readable map precede a `420–500px` Canvas. No sticky split. |
| `1024–1439px` | 12-column grid, 7/5 Opening, 5/7 Systems Atlas, `{spacing.gutter-desktop}` | Single Canvas at `520–620px`. The readable map stays visible beside it. Any sticky behavior is bounded to `#atlas`. |
| `≥1440px` | Same grid inside a `1440px` maximum canvas; empty columns increase rather than body line length | Scene does not grow past `620px` height or increase device pixel ratio beyond `[1, 1.5]`. |

Required review sizes are `375×667`, `390×844`, `768×1024`, `1024×768`, `1280×720`, `1280×800`, `1440×900`, and `1920×1080`, plus intermediate widths and constrained heights around breakpoint transitions. Review covers zoom, resize, orientation change, no horizontal overflow, visible focus, anchor offsets, fixed-header collisions, and all contact destinations.

The page may use `min-height: 100dvh` for the Opening but never fixed `100vh`. Content expansion wins over viewport fitting. Fonts are self-hosted or packaged for stable performance; remote font failure falls back to system sans and monospace without hiding content.

## Brownfield Migration Gates

These checks must pass before visual tuning is accepted:

1. **Finite motion:** remove or replace the elapsed-time pulse in `src/components/scene/DataLink.tsx`, the repeating packet loop in `src/components/scene/DataPacket.tsx`, the infinite `marker-pulse` rule in `src/index.css`, and any Tailwind infinite animation. A motion audit fails when a scene or status animation repeats without a current selection, handoff, navigation, or input transition.
2. **One mobile rule:** replace the `<480px` scene classifier with the approved width-based `<768px` Canvas bypass, with no capable-device exception. Verify `375×667`, `390×844`, and representative widths from `480px` through `767px`, with Reduced Motion on and off.
3. **Local font delivery:** install and import `@fontsource-variable/geologica/wght.css` and `@fontsource/fragment-mono` once at the application entry. Remove the CSS `@import`, duplicate document font link, and every `fonts.gstatic.com` scene URL. Confirm font-face fallback and production requests in the browser network log.
4. **Readable tertiary ink:** `{colors.ink-faint}` is `#656A62` and measures `4.82:1` against Paper. No implementation may substitute the former `#71766E` value or use a lower-contrast value for annotation, evidence, route, status, or control text.
5. **Single Canvas:** consolidate the Hero and Systems scene mounts into one `atlas-frame`. The Opening remains DOM-first and no second WebGL context exists.

## Inspiration & Anti-patterns

The reference lane is an annotated field atlas plus an engineering drawing, not an editorial magazine and not a software dashboard. The useful qualities are physical coordinates, named layers, precise route notation, irregular but governed whitespace, and a red pencil that marks the current decision.

Keep:

- a single committed sans family with technical annotation as a secondary voice;
- warm daylight surfaces instead of category-default dark mode;
- asymmetry that follows a visible grid;
- one scene whose depth explains ownership or runtime;
- chapter-specific narrative forms derived from each System anchor;
- one finite choreography idea per surface.

Reject:

- black-neon, cyberpunk, fake terminal, fake dashboard, glass, bento wall, logo cloud, skill pill, metric theater, and gradient text;
- repeated icon-title-copy cards or compressed copies of one case-study template;
- portraits, generated people, stock photography, decorative GLB assets, particles, starfields, bloom, toy orbit controls, custom cursors, and ambient motion;
- a second Canvas, WebGL-only labels, hover-only details, sticky scroll traps, and brittle full-page screenshot acceptance.

## Key-screen References

- [Opening and canonical Atlas](_bmad-output/planning-artifacts/ux-designs/ux-Portfolio-2026-08-22/mockups/key-opening-atlas.html) covers the initial decision surface, System Selector, Readable Equivalent Representation, and the one focal scene boundary used by UJ-1, UJ-2, and UJ-4.
- [Flagship narrative rhythm](_bmad-output/planning-artifacts/ux-designs/ux-Portfolio-2026-08-22/mockups/key-flagship-rhythm.html) covers the five distinct narrative forms, confidential adaptation loop, and evidence-marker rhythm used by UJ-2 and UJ-3.

The mocks passed real Chromium rendering at `1440×900` and `390×844` without horizontal overflow. They are implementation references, not acceptance screenshots: the responsive matrix, accessibility floor, source hierarchy, and browser QA contract remain authoritative.

## Key Flows

### Flow 1: UJ-1. Maya decides whether Le Huy fits the role

1. Maya opens the public URL on a laptop with no prior context.
2. The Opening renders Le Huy, Software Engineer, the full-time Junior target, the backend-leaning proposition, and Work with me before the scene chunk loads.
3. She scans the `system-index`: Form Management, VisionFlow Studio, and Production Booking & Operations Platform appear as Flagship Systems; Parkly and TFT Local Copilot remain visible as supporting proof.
4. She either activates Work with me or follows a system-to-narrative link.
5. She reaches the Closing and verifies GitHub, email, and CV without entering a form.
6. **Climax:** Maya can state what Le Huy builds and why the work is credible from concrete anchors rather than technology keywords.
7. She opens a verified destination or continues into a Flagship Narrative.

**Failure path:** The 3D chunk or remote network resource is slow. Identity, proposition, Primary Action, proof index, and readable system relationships remain present; no blank hero delays the decision.

### Flow 2: UJ-2. Aaron tests the architecture story

1. Aaron enters through the Opening or a direct `#systems` link.
2. From the Opening he follows navigation to `#atlas`. From a direct narrative arrival he activates “Compare this topology,” which links back to `#atlas` and selects that System.
3. Form Management is selected by default only when no System was specified; scene and `readable-topology` describe the same layers and routes.
4. He uses keyboard or pointer to select VisionFlow Studio.
5. The DOM selection changes immediately. The scene reconfigures once, traces the Queue Handoff as the Active Handoff, then settles.
6. He activates “Read this case” and sees constraint, decision, mechanism, failure boundary, verification, and exact evidence limitation.
7. He continues through the Adaptation Loop, Verification Harness, and linked `#evidence-boundary` contract.
8. **Climax:** Aaron can connect one visible handoff to its implementation boundary, Public Claim Manifest classification, and limitation without treating source inspection as runtime proof.
9. He leaves with specific interview questions.

**Failure path:** WebGL initialization fails during selection. The error stays inside `atlas-frame`; `readable-topology` remains selected, complete, and operable, and the narrative link still resolves.

### Flow 3: UJ-3. Priya checks the confidential boundary

1. Priya opens the Production Booking & Operations Platform narrative.
2. The title stays generic and the `evidence-marker` states Git and implemented-source evidence rather than live-production proof.
3. She follows Feedback → Pricing Rule → Implementation → Verification → Release → Next Revision.
4. The Fourth Pricing Change receives focus as the representative revision; no real price appears.
5. A publication-boundary note lists the categories intentionally withheld without hinting at their values.
6. **Climax:** The Adaptation Loop remains technically useful while exposing no client identity, screenshot, credential, provider configuration, payment detail, sensitive architecture, or physical-room identity.
7. Priya continues knowing the Evidence Ledger remains private.

**Failure path:** A required Claim lacks a safe manifest entry or limitation. Content validation fails before build, so the incomplete narrative never reaches the public URL.

### Flow 4: UJ-4. Sam explores without the focal scene

1. Sam opens the site at `390×844` with Reduced Motion enabled.
2. Mobile navigation and Opening appear without entrance movement.
3. At `#atlas`, `readable-topology` is primary and the Canvas is omitted.
4. Sam selects Parkly by touch, then uses a keyboard to select TFT Local Copilot.
5. Each selection updates the named layers, ordered routes, active handoff, limitation, and narrative destination.
6. Sam reads both Supporting Narratives and reaches the same Closing destinations.
7. **Climax:** Every required relationship and state is available without WebGL, hover, continuous movement, or horizontal scrolling.
8. Orientation change preserves the Selected System and focus context.

**Failure path:** A resize occurs while mobile navigation is open. The sheet closes, focus returns to the trigger, the selected System stays unchanged, and no fixed element obscures the current section.
