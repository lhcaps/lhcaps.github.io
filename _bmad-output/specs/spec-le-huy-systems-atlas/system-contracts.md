# System and Public Claim Contracts

## Closed System catalog

| System ID | Public title | Tier | Public anchor | Evidence boundary |
| --- | --- | --- | --- | --- |
| `form-management` | Form Management | Flagship | DOCX Contract | Implemented source plus one qualified fresh local gate observation; no fresh runtime claim |
| `visionflow-studio` | VisionFlow Studio | Flagship | Queue Handoff | Implemented source; no fresh Redis, MinIO, ONNX, database, CI, or end-to-end runtime claim |
| `production-booking-operations` | Production Booking & Operations Platform | Flagship | Fourth Pricing Change | Git history and implemented source; generic title and no live-production claim or confidential detail |
| `parkly` | Parkly | Supporting | Manual Review Handoff | Implemented source; custom Redis ownership lock, with the outbox kept as a separate rail |
| `tft-local-copilot` | TFT Local Copilot | Supporting | Incomplete runtime boundary | Experimental source components; no working end-to-end RAG claim |

The System IDs and public titles are closed for this release. Copy, selector, topology, scene, anchor, evidence-marker, and validation data reference these IDs; display order is the table order.

## Public Claim Manifest vocabulary

Allowed evidence classifications are closed:

- `VERIFIED_IMPLEMENTED` — current source inspection supports the implementation Claim, but does not imply a fresh runtime.
- `VERIFIED_LOCAL` — a local command or artifact was freshly observed with its result and limitation.
- `VERIFIED_TESTED` — a deterministic test freshly accepted the stated behavior; the test scope is part of the Claim.
- `DOCUMENTED_ONLY` — the source or design describes the component or boundary, but implementation or runtime is not established.
- `PLANNED` — approved future intent, never current capability copy.
- `UNVERIFIED` — insufficient evidence for a positive public Claim.
- `PRIVATE_DO_NOT_PUBLISH` — evidence or detail is excluded from every public artifact.

Only entries whose `publicSafe` field is `true` may be referenced by public content. `PLANNED`, `UNVERIFIED`, and `PRIVATE_DO_NOT_PUBLISH` cannot support positive current-capability copy. Each manifest entry owns the exact public Claim text, classification, and required limitation. Rendered surfaces declare a unique `claimInstanceId` plus a reusable `evidenceKey`; they read the Claim and qualification from the manifest instead of copying or overriding them. Moving or reusing a Claim changes neither its `evidenceKey` nor its meaning.

Release assertion labels—`VERIFIED`, `OBSERVED`, `INFERRED`, and `BLOCKED`—classify release reporting, not System Claims. No aliasing is permitted.

## Initial public-safe manifest

Every row in this table binds `publicSafe: true`.

| Evidence key | System ID | Claim scope | Classification | Required limitation |
| --- | --- | --- | --- | --- |
| `form.contract-governance` | `form-management` | Typed DOCX contracts govern form output and validation boundaries. | `VERIFIED_IMPLEMENTED` | Current source inspection supports the described implementation; it does not establish a fresh runtime. |
| `form.identity-authorization` | `form-management` | External identity and database authorization are separate gates before workspace access. | `VERIFIED_IMPLEMENTED` | Current source inspection supports the boundary; it does not establish a fresh authenticated runtime. |
| `form.preview-persistence-audit` | `form-management` | Temporary Preview, Persisted Document, and Audit and Verification are distinct lifecycle outcomes. | `VERIFIED_IMPLEMENTED` | Current source inspection supports the lifecycle; it does not establish a fresh runtime. |
| `form.corpus-gate` | `form-management` | A fresh local observation reported 213 of 213 locked and reviewed records. | `VERIFIED_LOCAL` | The gate process exited nonzero because its summary was stale; the gate must not be described or styled as green. |
| `vision.ingestion-dataset` | `visionflow-studio` | SHA-256 ingestion and dedupe lead to locked dataset versions and controlled annotation or pipeline inputs. | `VERIFIED_IMPLEMENTED` | Current source inspection supports the described implementation; it does not establish fresh service or storage runtime operation. |
| `vision.queue-handoff` | `visionflow-studio` | A Queue Handoff separates request-side preparation from CV Worker execution. | `VERIFIED_IMPLEMENTED` | Current source inspection supports the cross-runtime route; it does not establish fresh Redis or worker runtime operation. |
| `vision.inference-evaluation` | `visionflow-studio` | Guarded ONNX inference and deterministic evaluation hashes bound prediction and evaluation work. | `VERIFIED_IMPLEMENTED` | Current source inspection supports the guards and hashes; it does not establish fresh model or end-to-end runtime operation. |
| `booking.revision-history` | `production-booking-operations` | Git history contains at least four reviewable pricing-model revisions represented by the Fourth Pricing Change. | `VERIFIED_IMPLEMENTED` | Git and implemented-source evidence support the adaptation story; this is not live-production proof and publishes no real price. |
| `booking.hold-snapshot-release` | `production-booking-operations` | Search, HOLD, immutable booking or pricing snapshot, and release-attestation boundaries exist in implemented source. | `VERIFIED_IMPLEMENTED` | Current source inspection supports these boundaries; it does not expose or establish live client, payment, room, or production state. |
| `parkly.manual-review` | `parkly` | Low-confidence capture can hand control to Session or Manual Review before Audit. | `VERIFIED_IMPLEMENTED` | Current source inspection supports the operational handoff; it does not establish a fresh runtime. |
| `parkly.ownership-lock` | `parkly` | Parkly implements a custom Redis ownership lock using ownership checks around NX/PX and Lua behavior. | `VERIFIED_IMPLEMENTED` | This is a custom ownership lock, never Redlock; current source inspection does not establish a fresh Redis runtime. |
| `parkly.outbox-rail` | `parkly` | The outbox is an implemented delivery rail shown separately from Manual Review. | `VERIFIED_IMPLEMENTED` | Do not draw or claim a direct Manual Review-to-outbox event link unless new evidence verifies it. |
| `parkly.operational-rails` | `parkly` | Operational state, audit, device-health, SSE, and HMAC-related boundaries are present in source. | `VERIFIED_IMPLEMENTED` | Current source inspection supports these components; it does not establish a fresh integrated runtime. |
| `tft.component-assembly` | `tft-local-copilot` | FastAPI, local-model, vector-store, retrieval, streaming, and container components are represented in experimental source. | `DOCUMENTED_ONLY` | Route-registration and migration gaps prevent a working end-to-end RAG claim. |

## Publication exclusions

The private Evidence Ledger and its source paths, confidence notes, raw snippets, screenshots, configuration, tokens, credentials, client or provider details, real prices, payment details, physical-room identity, and sensitive deployment topology remain absent from tracked source, generated output, screenshots, logs, PDF, metadata, structured data, source maps, and deployment artifacts.

A prebuild validator walks the manifest and every rendered Claim instance. It fails if:

1. a manifest `evidenceKey` is absent or duplicated, or a rendered `claimInstanceId` is absent or duplicated;
2. the System ID is unknown;
3. `publicSafe` is not exactly `true`;
4. the classification is not allowed for the copy's tense;
5. a required limitation is missing from the rendered Claim;
6. positive copy references `PLANNED`, `UNVERIFIED`, or `PRIVATE_DO_NOT_PUBLISH`;
7. a Claim instance supplies its own classification, limitation, or materially changed Claim text instead of reading the manifest entry;
8. a Claim instance references no manifest entry, while many unique instances may validly reuse one manifest `evidenceKey`;
9. the privacy policy below or unsupported-metric rules fail.

## Privacy validation policy

Public policy copy may name these category labels exactly: client identity, price, screenshot, credential, provider configuration, payment detail, sensitive deployment information, physical-room identity, private Evidence Ledger, secret, and token. Naming a category to explain the Evidence Boundary is not a leak.

Validation targets values and artifacts rather than blocking those labels:

- tracked and generated paths reject the private evidence and research directories, environment files, key/certificate files, source maps, and unknown binary or screenshot assets;
- public email and URL values are allowlisted to `huyle210525@gmail.com`, `https://github.com/lhcaps`, `https://lhcaps.github.io/`, same-origin anchors/assets, and standards links explicitly declared in metadata or documentation;
- generic secret patterns reject likely private keys, bearer tokens, credential assignments, high-entropy token fields, and credential-bearing URLs;
- the anonymous booking narrative rejects currency symbols, formatted price values, payment references outside the allowed category-label explanation, physical-room identifiers, and non-allowlisted proper identifiers in its data fixture;
- a local confidentiality review compares rendered public text to the private Evidence Ledger outside the repository and records only pass/fail plus scope in Release Evidence; no private identifier, hash list, or ledger path becomes a tracked validator input;
- CI repeats all public-source, allowlist, secret-pattern, manifest, generated-output, and artifact checks without requiring the private ledger.

Fixtures must prove both sides: required Evidence Boundary copy containing allowed category labels passes, while representative fake client names, currency values, credential strings, provider settings, payment identifiers, room identifiers, unsafe paths, source maps, and copied Claim overrides fail.
