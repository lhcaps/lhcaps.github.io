# UX Source-Contract Reconciliation

**Review date:** 2026-08-22  
**Sources read:** `PRODUCT.md`; final `prd.md`; final `addendum.md`; final-draft `DESIGN.md`; final-draft `EXPERIENCE.md`; both promoted `mockups/key-*.html`; `reconcile-master-prompt.md`.

## Verdict

**ZERO material drift found.** All previously reported High, Medium, and Low source-contract gaps are resolved in the current UX spines. The two promoted mocks preserve their illustrative role and do not supersede the spines.

## Severity findings

### High — none

### Medium — none

### Low — none

## Preservation evidence

| Prior gap / governing concern | Current evidence | Result |
| --- | --- | --- |
| Addendum authority and source chain | Both spines list `addendum.md`; `EXPERIENCE.md:18-20` names its authority for evidence limits, topology directions, scene constraints, and release review matrix. | Resolved |
| Separate evidence vocabularies | `EXPERIENCE.md:76-103` explicitly separates Public Claim Manifest classifications from release assertion labels, requires literal labels and limitations, and prohibits shortening `VERIFIED_IMPLEMENTED` to generic `VERIFIED`. | Resolved |
| Complete private exclusion | `EXPERIENCE.md:90, 103, 109` excludes unsafe evidence from public source, markup, bundles, outputs, logs, screenshots, tracked/repository history, generated site, and deployed assets; visible-markup-only exclusion is explicitly insufficient. | Resolved |
| Discoverable Evidence Boundary and direct-entry return path | `EXPERIENCE.md:34, 107-111, 303-309` defines `#evidence-boundary`, its content, marker links, `Compare this topology`, and `Read this case` navigation. | Resolved |
| Exact QA and release matrix | `EXPERIENCE.md:113-128, 177-190, 245` requires content, engineering, reader, responsive, scene, destination, review, and attestation rows; command/check, exit code, applicable count, SHA, URL, workflow, assets, and limitations stay in the release record. `VERIFIED_COMPLETE` and mandatory `PARTIAL` behavior are explicit. | Resolved |
| CV, metadata, and destination acceptance | `EXPERIENCE.md:130-135, 190` requires verified-only metadata, base-path-safe deployed assets, JSON-LD parsing, complete facts-only CV validation, no placeholder CV, accessible new-tab disclosure, opener isolation, and referrer-safe URLs. | Resolved |
| Canonical Active Handoff | `EXPERIENCE.md:45-54, 164, 167-169` names one canonical state, its optional Rust destination-node focus, DOM text, selector update, and one-time route treatment. `DESIGN.md:197, 252-253` matches that contract. | Resolved |
| Locked anonymous title and all five topology contracts | `EXPERIENCE.md:58-62, 170` retains all routes, Parkly's separate outbox rail, TFT's incomplete boundary, and the exact anonymous public title rule. | Resolved |
| Mock/spine hierarchy | `DESIGN.md:179-184` and `EXPERIENCE.md:279-284` identify the two promoted references, state that the spines win, and distinguish implementation references from acceptance screenshots. Both mock styles begin with a governing-spines comment (`key-opening-atlas.html:9-15`; `key-flagship-rhythm.html:9-15`). | Resolved |
| Offline/mock integrity | Static scans found no network URL, script, asset, CSS import, or CSS `url()` reference in either mock. Both contain inline style, the required Geologica fallback stack, and governing-spine comment. | Pass |
| Master-prompt preservation | The available master-prompt reconciliation record identifies `pasted-text-1.txt` as its input and reports no material gap against final `prd.md` and `addendum.md` (`reconcile-master-prompt.md:1-24`). The raw attachment is not present as an independently addressable workspace file, so this review relies on that retained reconciliation plus the final authoritative PRD chain. | Preserved; provenance noted |

## Mock alignment

- `mockups/key-opening-atlas.html` uses the approved Opening proposition, exact Primary Action, five-system index, Form Management default topology, `ACTIVE HANDOFF`, literal `VERIFIED_IMPLEMENTED`, required limitation, and DOM-readable representation (`lines 90-133`).
- `mockups/key-flagship-rhythm.html` keeps the five narrative forms distinct: DOCX contract spread, Queue Handoff route, six-station anonymous adaptation loop, Parkly branch with separate outbox, and TFT lab note with an incomplete boundary (`lines 39-47`). It does not create an equal-card project grid.

## Finalization gate

No source-contract remediation is required before UX finalization. Finalization still requires the independent implementation, accessibility, responsive/browser, content-manifest, and release-attestation gates already specified by the UX and PRD contracts.
