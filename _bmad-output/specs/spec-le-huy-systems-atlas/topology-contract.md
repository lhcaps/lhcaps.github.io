# Topology Contract

## Shared schema

The authoritative topology module is typed and serializable. Each System supplies:

- one stable `id`, public title, tier, narrative anchor, evidence keys, and initial selection order;
- named layers whose meaning is authority, persistence, runtime, human review, adaptation, or result ownership;
- nodes with stable IDs, labels, one-sentence responsibilities, layer IDs, and a required semantic `sceneSlot` from `left-far`, `center-far`, `right-far`, `left-mid`, `center-mid`, `right-mid`, `left-near`, `center-near`, `right-near`, or `separate-bottom`;
- routes with stable IDs, resolved `from` and `to` node IDs, a literal verb, readable sentence, route kind (`dependency`, `transition`, `handoff`, or `loop`), and evidence key;
- exactly one `activeHandoff` object with a route ID and required `focusNodeId`; the focus node must equal that route's resolved `to` node;
- a scene layout whose architecture-owned coordinate map deterministically converts each `sceneSlot` to a position, never a second content model;
- an evidence limitation and narrative destination available outside WebGL.

Validation rejects duplicate System, Claim-instance, layer, node, or route IDs; empty labels or responsibilities; orphan nodes; unresolved endpoints; unknown scene slots or route kinds; unnamed layers; missing narrative anchors; missing or unsafe evidence keys; more or fewer than five Systems; no Active Handoff; missing focus, focus not equal to the Active Handoff destination; motion without a documented state; and scene-only text or relationships. The Form readable sentence is fixture-derived and must expose both literal branches: `DOCX Contract → Temporary Preview` with no Audit route, and `DOCX Contract → Persisted Document → Audit and Verification`.

## Stable fixture keys

| System ID | Narrative anchor | Layer IDs | Active route ID | Required focus node ID |
| --- | --- | --- | --- | --- |
| `form-management` | `#system-form-management` | `form-authority`, `form-governance`, `form-review` | `form-contract-to-persisted` | `form-persisted-document` |
| `visionflow-studio` | `#system-visionflow-studio` | `vision-request`, `vision-runtime`, `vision-result` | `vision-queue-to-worker` | `vision-cv-worker` |
| `production-booking-operations` | `#system-production-booking-operations` | `booking-requirement`, `booking-change`, `booking-delivery` | `booking-implementation-to-verification` | `booking-verification` |
| `parkly` | `#system-parkly` | `parkly-decision`, `parkly-review`, `parkly-delivery` | `parkly-decision-to-review` | `parkly-manual-review` |
| `tft-local-copilot` | `#system-tft-local-copilot` | `tft-source`, `tft-retrieval`, `tft-response` | `tft-retrieval-to-model` | `tft-local-model` |

| System ID | Node ID | Layer ID | Responsibility | Scene slot |
| --- | --- | --- | --- | --- |
| `form-management` | `form-identity` | `form-authority` | Establish the external identity boundary. | `left-far` |
| `form-management` | `form-authorization` | `form-authority` | Decide access before workspace resolution. | `center-far` |
| `form-management` | `form-workspace` | `form-governance` | Own the resolved workspace state. | `right-far` |
| `form-management` | `form-docx-contract` | `form-governance` | Govern allowed form fields and output. | `left-mid` |
| `form-management` | `form-temporary-preview` | `form-governance` | Produce a non-persisted preview outcome. | `center-near` |
| `form-management` | `form-persisted-document` | `form-governance` | Produce the persisted governed outcome. | `right-mid` |
| `form-management` | `form-audit-verification` | `form-review` | Record and verify persisted work. | `right-near` |
| `visionflow-studio` | `vision-media` | `vision-request` | Supply the ingested media identity. | `left-far` |
| `visionflow-studio` | `vision-dataset-version` | `vision-request` | Freeze the dataset input boundary. | `center-far` |
| `visionflow-studio` | `vision-annotation` | `vision-request` | Attach controlled training or evaluation labels. | `left-mid` |
| `visionflow-studio` | `vision-pipeline` | `vision-request` | Assemble the submitted processing definition. | `center-mid` |
| `visionflow-studio` | `vision-queue-handoff` | `vision-runtime` | End request-side ownership and enqueue work. | `right-mid` |
| `visionflow-studio` | `vision-cv-worker` | `vision-runtime` | Own asynchronous computer-vision execution. | `left-near` |
| `visionflow-studio` | `vision-prediction` | `vision-result` | Persist or expose the produced prediction. | `center-near` |
| `visionflow-studio` | `vision-evaluation` | `vision-result` | Compare outputs under deterministic evaluation identity. | `right-near` |
| `production-booking-operations` | `booking-feedback` | `booking-requirement` | Capture the observed requirement change. | `left-mid` |
| `production-booking-operations` | `booking-pricing-rule` | `booking-requirement` | Express the revised pricing policy boundary. | `center-far` |
| `production-booking-operations` | `booking-implementation` | `booking-change` | Apply the scoped rule change. | `right-far` |
| `production-booking-operations` | `booking-verification` | `booking-change` | Accept or reject the scoped change. | `right-near` |
| `production-booking-operations` | `booking-release` | `booking-delivery` | Move accepted work through the governed release path. | `center-near` |
| `production-booking-operations` | `booking-next-revision` | `booking-delivery` | Return released learning to the next review. | `left-near` |
| `parkly` | `parkly-capture` | `parkly-decision` | Supply the operational capture. | `left-far` |
| `parkly` | `parkly-decision` | `parkly-decision` | Evaluate confidence and choose the next owner. | `center-mid` |
| `parkly` | `parkly-manual-review` | `parkly-review` | Give a person control of the low-confidence decision. | `right-near` |
| `parkly` | `parkly-audit` | `parkly-review` | Record the reviewed operational outcome. | `center-near` |
| `parkly` | `parkly-outbox` | `parkly-delivery` | Represent the separate delivery rail without an inferred review link. | `separate-bottom` |
| `tft-local-copilot` | `tft-source` | `tft-source` | Supply experimental source material. | `left-far` |
| `tft-local-copilot` | `tft-ingestion` | `tft-source` | Prepare source material for embedding. | `center-far` |
| `tft-local-copilot` | `tft-embedding` | `tft-retrieval` | Represent the embedding step in source. | `left-mid` |
| `tft-local-copilot` | `tft-vector-store` | `tft-retrieval` | Represent persisted vector lookup. | `center-mid` |
| `tft-local-copilot` | `tft-retrieval` | `tft-retrieval` | Assemble candidate context for a local model. | `right-mid` |
| `tft-local-copilot` | `tft-local-model` | `tft-response` | Represent local-model generation without runtime proof. | `center-near` |
| `tft-local-copilot` | `tft-stream` | `tft-response` | Represent the streamed response boundary. | `right-near` |

## System topology definitions

### Form Management

| Layer | Nodes |
| --- | --- |
| Authority | Identity; Authorization |
| Governance and persistence | Workspace; DOCX Contract; Temporary Preview; Persisted Document |
| Review | Audit and Verification |

Ordered relationships:

1. `form-identity-to-authorization`: Identity → identifies for → Authorization (`dependency`, `form.identity-authorization`).
2. `form-authorization-to-workspace`: Authorization → permits → Workspace (`handoff`, `form.identity-authorization`).
3. `form-workspace-to-contract`: Workspace → resolves → DOCX Contract (`dependency`, `form.contract-governance`).
4. `form-contract-to-preview`: DOCX Contract → governs → Temporary Preview (`transition`, `form.preview-persistence-audit`).
5. `form-contract-to-persisted`: DOCX Contract → governs → Persisted Document (`handoff`, `form.contract-governance`).
6. `form-persisted-to-audit`: Persisted Document → records to → Audit and Verification (`transition`, `form.preview-persistence-audit`).

Active Handoff: **DOCX Contract → governs → Persisted Document**; required focus: **Persisted Document** (`form-persisted-document`). Temporary Preview is the separate non-persisted terminal branch and has no route to Audit and Verification.

### VisionFlow Studio

| Layer | Nodes |
| --- | --- |
| Request and data preparation | Media; Dataset Version; Annotation; Pipeline |
| Runtime boundary | Queue Handoff; CV Worker |
| Result | Prediction; Evaluation |

Ordered relationships:

1. `vision-media-to-dataset`: Media → versions into → Dataset Version (`transition`, `vision.ingestion-dataset`).
2. `vision-dataset-to-annotation`: Dataset Version → supplies → Annotation (`dependency`, `vision.ingestion-dataset`).
3. `vision-annotation-to-pipeline`: Annotation → configures → Pipeline (`dependency`, `vision.ingestion-dataset`).
4. `vision-pipeline-to-queue`: Pipeline → submits → Queue Handoff (`handoff`, `vision.queue-handoff`).
5. `vision-queue-to-worker`: Queue Handoff → dispatches to → CV Worker (`handoff`, `vision.queue-handoff`).
6. `vision-worker-to-prediction`: CV Worker → produces → Prediction (`transition`, `vision.inference-evaluation`).
7. `vision-prediction-to-evaluation`: Prediction → is checked by → Evaluation (`transition`, `vision.inference-evaluation`).

Active Handoff: **Queue Handoff → dispatches to → CV Worker**; required focus: **CV Worker** (`vision-cv-worker`).

### Production Booking & Operations Platform

| Layer | Nodes |
| --- | --- |
| Requirement | Feedback; Pricing Rule |
| Change | Implementation; Verification |
| Delivery | Release; Next Revision |

Ordered relationships:

1. `booking-feedback-to-rule`: Feedback → revises → Pricing Rule (`transition`, `booking.revision-history`).
2. `booking-rule-to-implementation`: Pricing Rule → governs → Implementation (`dependency`, `booking.revision-history`).
3. `booking-implementation-to-verification`: Implementation → enters → Verification (`handoff`, `booking.revision-history`).
4. `booking-verification-to-release`: Verification → accepts or rejects → Release (`transition`, `booking.revision-history`).
5. `booking-release-to-next`: Release → informs → Next Revision (`transition`, `booking.revision-history`).
6. `booking-next-to-feedback`: Next Revision → returns to → Feedback (`loop`, `booking.revision-history`).

Active Handoff: **Implementation → enters → Verification**, labeled **Fourth Pricing Change** for the representative revision; required focus: **Verification** (`booking-verification`).

### Parkly

| Layer | Nodes |
| --- | --- |
| Capture and decision | Capture; Decision |
| Human review | Session or Manual Review; Audit |
| Separate delivery rail | Outbox |

Ordered relationships:

1. `parkly-capture-to-decision`: Capture → supplies → Decision (`dependency`, `parkly.manual-review`).
2. `parkly-decision-to-review`: Decision → hands off to → Session or Manual Review (`handoff`, `parkly.manual-review`).
3. `parkly-review-to-audit`: Session or Manual Review → records to → Audit (`transition`, `parkly.manual-review`).

Active Handoff: **Decision → hands off to → Session or Manual Review**; required focus: **Session or Manual Review** (`parkly-manual-review`).

The Outbox is visible as a separate rail with no route from Manual Review or Audit. A direct event link is forbidden until new evidence verifies it.

### TFT Local Copilot

| Layer | Nodes |
| --- | --- |
| Source preparation | Source; Ingestion |
| Retrieval assembly | Embedding; Vector Store; Retrieval |
| Local response | Local Model; Stream |

Documented component relationships:

1. `tft-source-to-ingestion`: Source → enters → Ingestion (`transition`, `tft.component-assembly`).
2. `tft-ingestion-to-embedding`: Ingestion → prepares → Embedding (`transition`, `tft.component-assembly`).
3. `tft-embedding-to-store`: Embedding → writes to → Vector Store (`transition`, `tft.component-assembly`).
4. `tft-store-to-retrieval`: Vector Store → supports → Retrieval (`dependency`, `tft.component-assembly`).
5. `tft-retrieval-to-model`: Retrieval → supplies context to → Local Model (`handoff`, `tft.component-assembly`).
6. `tft-model-to-stream`: Local Model → emits through → Stream (`transition`, `tft.component-assembly`).

Active Handoff: **Retrieval → supplies context to → Local Model**; required focus: **Local Model** (`tft-local-model`). The incomplete runtime boundary is rendered beside the route: the relationships describe source assembly and do not claim a registered, migrated, working end-to-end path.

## Atlas state model

| State | DOM behavior | Scene behavior |
| --- | --- | --- |
| `dom-ready` | Default Form Management selection, full readable topology, limitation, and narrative link are operable. | No Canvas dependency. |
| `scene-pending` | DOM remains authoritative and unchanged. | Stable reserved frame shows a literal loading status; eligibility loss cancels/unmounts the pending boundary so a later chunk resolution cannot mount Canvas until a fresh eligible entry. |
| `survey` | Selected System and full relationship list are current. | Stable overview fits all mapped nodes and routes. |
| `reconfigure` | Selection and live announcement update immediately. | Interruptible geometry and camera transition starts from current state. |
| `handoff` | Active Handoff appears first in text and its required focus node is named. | One mapped route traces once; its required destination takes Rust focus. |
| `settled` | Full topology remains readable and selected. | All geometry is static; no idle frame work continues. |
| `bypassed` | Readable topology becomes the primary visual with selection preserved. | Canvas is absent below 768px, under Reduced Motion, after unsupported WebGL, or after import/initialization/render/context-loss failure. |

Selection is owned by React/DOM state. Scene code consumes the selected topology and may report a contained failure, but it never owns public content or navigation. Rapid reselection interrupts the current scene transition and retargets from its current values; it never queues stale animations.

## Rendering limits

- One Canvas only, `aria-hidden`, no focus, no pointer-only node controls, no OrbitControls, and no exclusive labels.
- DPR is exactly constrained to `[1, 1.5]` as the accepted renderer range.
- Frame-loop mutations use refs, Three objects, or renderer-local stores; no React state update occurs inside `useFrame`.
- Canvas mounts only when viewport width is at least `768px`, Reduced Motion is false, WebGL support is present, and the Atlas is eligible to render. The detached one-shot support probe requires `WEBGL_lose_context`, invokes it, removes its canvas, and returns true only after successful release; a missing extension or cleanup/release failure is unsupported, so no probe context can coexist with the real Canvas.
- Runtime `webglcontextlost` is contained, prevented, and mapped once to reload-only sticky failure; the Canvas unmounts while DOM selection and focus remain intact.
- When offscreen, the renderer issues no continuous invalidation. Reselection updates its settled target without choreography; re-entry performs at most one snap-to-settled sync frame. There is no perpetual `always` loop after `settled`.
- CSS or SVG owns every relationship where depth does not add information. No texture, GLB, post-processing pass, or shader enters the asset inventory without a documented topology job and budget approval.
