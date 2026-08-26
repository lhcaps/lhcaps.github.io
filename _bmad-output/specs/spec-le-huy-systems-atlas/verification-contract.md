# Verification and Release Contract

## Canonical acceptance entry point

The repository exposes `npm run verify` as the canonical verification command. It composes, rather than reimplements, all current applicable checks. The command exits nonzero when any required check fails and records each child command, exit code, count where available, nonnegative integer `durationMs`, result, and limitation in `artifacts/release/release-evidence.v1.json`, which conforms to schema version `1`. The pre-upload generated-output integrity guard is represented by its separate closed attestation and runs after local Release Evidence is finalized. Hosted finalization is the only permitted later evidence phase; after deployment, smoke, and production review records are final it runs a second closed hosted-final guard, after which no generated-root mutation is possible. Local release artifacts are ignored unless a later explicit publication decision says otherwise; CI uploads them as `release-evidence-<full-sha>` without adding them to the deployed site.

Required local acceptance categories, in dependency order:

1. secret and private-path exclusion, tracked-file audit, full reachable-history audit, and generated-artifact inspection;
2. Public Claim Manifest, copy prohibition, topology, unique-anchor, and internal-reference validation;
3. TypeScript typecheck;
4. lint with no unresolved warning treated as success by configuration accident;
5. deterministic unit and component tests, including topology schema, Claim lookup, selector semantics, navigation behavior, scene eligibility, and failure containment;
6. production build;
7. output inspection for private paths, remote fonts, missing assets, stale metadata, source-map leakage, and one-Canvas chunk ownership;
8. E2E behavior across navigation, all five selections, direct anchors, Primary Action, email, GitHub, CV, and contained scene failure;
9. automated accessibility plus manual keyboard, focus, content-order, contrast, touch-target, and Canvas-bypass review;
10. responsive overflow, clipped content, anchor clearance, sticky collision, resize, and orientation review across the full matrix;
11. Reduced Motion and WebGL loading, unavailable, error, bypass, rapid-selection, and offscreen behavior;
12. internal, external, email, CV, canonical, social, structured-data, favicon, sitemap, robots, and asset link validation;
13. dependency audit with zero remaining advisories; this release defines no waiver surface, and any future waiver requires a separately reviewed architecture amendment before implementation;
14. production asset inventory and numeric initial-JavaScript and lazy-3D budget checks from the architecture spine;
15. schema-validated, source-digest-bound independent product, evidence/privacy, visual/responsive, motion, accessibility, simplicity, code/integration, and local-screenshot reviews with no unresolved material finding.

The tracked `README.md` is part of local acceptance. It must describe the implemented architecture and authoritative data flow, Systems Atlas meaning and one-Canvas constraints, prerequisites and local development, the canonical verification command, test and browser-QA surfaces, accessibility and fallback behavior, numeric performance budgets and measurement, GitHub Pages workflow, exact-SHA attestation, and the Evidence Boundary. The public page remains the narrative; README carries operator and contributor detail.

Required hosted acceptance categories:

1. the GitHub Pages workflow runs the canonical verification command before artifact upload;
2. the successful workflow, immutable uploaded Pages artifact, fetched public identity, and production checks target the final exact commit SHA;
3. the public URL serves the exact release identity and all static assets;
4. desktop and mobile production smoke cover navigation, all five Systems, the no-Canvas mobile path, contact destinations, metadata endpoints, PDF response, console, and horizontal overflow;
5. release evidence records the production URL, workflow run, exact SHA, uploaded artifact ID, deterministic `pagesSiteDigest` computed as PAGES-SITE-V1 after validated staging and before upload, payloads, major assets, observed browser state, byte-bound production screenshot review, any limitation, and a passing hosted-final GeneratedEvidenceV1 attestation written as the last workflow mutation.

Every job that runs `npm run verify`, history validation, review-source validation, or post-rewrite attestation uses `actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7` with `fetch-depth: 0`, then rejects a shallow repository before any acceptance command. All workflow actions are immutable Node 24 full-SHA pins with their required major retained in an adjacent comment and static allowlist: setup-node `820762786026740c76f36085b0efc47a31fe5020 # v7`, configure-pages `45bfe0192ca1faeb007ade9deae92b16b8254a0d # v6`, upload-pages-artifact `fc324d3547104276b827a68afc52ff2a11cc49c9 # v5`, deploy-pages `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128 # v5`, and upload-artifact `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7`. The Pages build receives `VITE_COMMIT_SHA` from the full workflow SHA and writes the closed same-origin `PublicReleaseIdentityV1` to `release.json`. The full Release Evidence artifact stays outside the public deployment, and the public UI neither fetches nor links it or `release.json`. Exact-SHA attestation uses the successful workflow head SHA, the immutable `artifact_id` from the sole `github-pages` upload in that workflow run, PAGES-SITE-V1 `pagesSiteDigest` computed over `artifacts/pages-site/` after validated staging and before upload, the fetched cache-busted `release.json`, the expected starting Git ref, and the remote branch after smoke. Internal `dist/.vite/manifest.json` remains a build-verification input only. GitHub Pages exposes no trusted deployment-SHA field, so the contract invents none. If `main` advances before final attestation, the current run records the advance and is `PARTIAL`; the newer head requires its own complete run.

## Browser matrix

Minimum exact viewports:

- `375×667`
- `390×844`
- `768×1024`
- `1024×768`
- `1280×720`
- `1280×800`
- `1440×900`
- `1920×1080`

Add intermediate widths on both sides of every CSS and scene-eligibility breakpoint, plus constrained heights capable of exposing header, selector, Atlas, or anchor collisions. Each relevant width covers normal motion and Reduced Motion; at least one eligible desktop path covers successful WebGL and contained WebGL failure; every sub-768 path verifies the Canvas is absent.

For each size or state, inspect:

- Opening identity, proposition, proof index, and Primary Action;
- navigation, mobile sheet state, Escape, focus return, anchor integrity, and no scroll trap;
- all five selector states by pointer, touch where emulated, Enter, and Space;
- selected DOM topology, Active Handoff, limitation, narrative destination, and scene equivalence when mounted;
- all three Flagship and two Supporting Narratives;
- Adaptation Loop, AI-assisted engineering, Verification Harness, Evidence Boundary, capabilities, and Closing;
- resize and orientation selection preservation;
- horizontal overflow, clipped focus, unreadable text, obscured anchors, and sticky collisions;
- critical console errors and unexpected warnings.

Full-page screenshots are review evidence, not the primary acceptance oracle. Behavior, semantics, targeted regions, computed layout, and content assertions decide pass or fail.

## Release Evidence schema

Each record contains:

| Field | Meaning |
| --- | --- |
| `category` | Stable gate or review category |
| `command` | Exact command or manual procedure |
| `exitCode` | Process exit code when applicable |
| `count` | Test, page, Claim, link, or asset count when available |
| `durationMs` | Nonnegative integer elapsed milliseconds for the exact command or manual procedure |
| `result` | Literal pass, fail, or blocked observation |
| `assertion` | `VERIFIED`, `OBSERVED`, `INFERRED`, or `BLOCKED` |
| `sha` | Commit SHA tested or deployed |
| `environment` | Local, hosted CI, or production |
| `evidence` | Artifact path, workflow URL, deployed URL, or concise observation |
| `limitation` | Nonempty qualification when the result does not prove a broader state |
| `recordedAt` | ISO 8601 timestamp |

The JSON root is `{ "schemaVersion": 1, "sha": "<40 hex>", "records": [...] }`. Records use stable category IDs; `durationMs` is always present, uses integer milliseconds, and is `0` only for an effectively instantaneous recorded observation. A child process result is appended before the orchestrator decides its final exit code, so Failed Gates remain inspectable.

## Asset Inventory schema

`artifacts/release/asset-inventory.v1.json` is ignored, non-deployed, deterministic JSON with exactly the root fields `schemaVersion`, `sourceSha`, `sourceTree`, `pagesSiteDigest`, `files`, and `totals`. `schemaVersion` is `1`; `sourceSha` and `sourceTree` are the current clean full 40-character lowercase Git identities; `pagesSiteDigest` is the lowercase PAGES-SITE-V1 digest of the exact validated staging root. `files` contains one record for every regular file in `artifacts/pages-site/`, sorted by NFC-normalized UTF-8 path byte order, with no missing or extra record.

Each file record contains exactly `path`, `kind`, `role`, `bytes`, `gzipBytes`, `sha256`, `initialTransfer`, and `firstViewFont`. `path` obeys FileRecordV1; `kind` is one of `html|javascript|css|font|image|pdf|json|xml|text`; `role` is `eager-js|atlas-js|static`; `bytes` is the nonnegative raw-byte count; `gzipBytes` is the deterministic gzip level-9 byte count for HTML, JavaScript, CSS, JSON, XML, and text and is `null` for font, image, and PDF; `sha256` is lowercase SHA-256 of raw bytes; the two flags are booleans derived from the manifest graph and CSS URL traversal rather than filenames. Every JavaScript file belongs to exactly one of `eager-js` or `atlas-js`; non-JavaScript files are `static`.

`totals` contains exactly nonnegative integer `fileCount`, `eagerJsGzipBytes`, `atlasJsGzipBytes`, `cssGzipBytes`, `firstViewFontBytes`, `initialTransferBytes`, `largestStaticNonFontBytes`, and `cvBytes`. Totals are recomputed from file records, use bytes throughout, bind the exact numeric budget decisions, and fail on overflow, missing gzip data, role ambiguity, malformed path/hash, source identity mismatch, or PAGES-SITE-V1 mismatch. Fixtures cover sorted/unsorted records, eager/lazy/shared ownership, nested dynamics, text/binary measurement, changed bytes, missing/extra files, malformed totals, wrong SHA/tree, and wrong staging digest.

## Phased terminal generated-evidence integrity

GeneratedEvidenceV1 has exactly two ordered phases, `preupload` and `hosted-final`. Both scan the ordered roots `artifacts/release`, `test-results`, `playwright-report`, `.playwright-cli`, and `artifacts/screenshots`; require regular non-linked files, root-contained normalized paths, allowed extension/magic pairs, closed schemas for known JSON receipts, and the same generic secret/private-path rules used by history safety; and log only aggregate rule IDs and counts. Before scanning, a phase deletes only its own stale attestation. Preupload also rejects or removes a stale hosted-final attestation from an earlier run. Hosted-final requires the current passing preupload attestation and includes it in the hosted digest.

The phase digest is lowercase SHA-256 over domain `GENERATED-EVIDENCE-V1\0`, the literal phase, `\0`, then FileRecordV1 for every scanned regular file using its root-qualified repository-relative path in NFC UTF-8 path-byte order. The sole digest exclusion is that phase's exact self-attestation: `artifacts/release/generated-evidence-preupload-attestation.v1.json` or `artifacts/release/generated-evidence-hosted-attestation.v1.json`. Each attestation contains exactly `schemaVersion`, `phase`, `sourceSha`, `sourceTree`, `generatedEvidenceDigest`, `fileCount`, `files`, `result`, and `recordedAt`; `files` is the complete sorted phase projection with records containing exactly `path`, `bytes`, and raw-byte lowercase `sha256`. Schema is `1`, phase matches its path/domain, identities match the clean checkout, manifest count/bytes/hashes and digest are exact, result is `pass|fail`, and time is valid/non-future. The scanner validates its attestation's own closed shape and generic safety before exit.

The only hosted-only additions are exact regular files `artifacts/release/deployment-attestation.v1.json`, `artifacts/release/production-smoke.v1.json`, `artifacts/release/production-review-evidence.v1.json`, `artifacts/release/production-review-attestation.v1.json`, and every manifest-listed regular PNG under `artifacts/screenshots/production/`; the hosted-final self-attestation is its sole digest exclusion. No generic `test-results`, `playwright-report`, or `.playwright-cli` file may change between phases. Before computing hosted-final, the scanner subtracts exactly that closed hosted-only set plus both attestation paths from the current roots, recomputes every preupload manifest record and the `preupload` phase digest/count, and requires byte-for-byte equality with the retained preupload attestation. Hosted additions may not collide with a preupload path; every production screenshot must appear in the production-review manifest and no extra file may exist under its root.

`artifacts/release/production-smoke.v1.json` contains exactly `schemaVersion`, full `sha`, exact canonical `url`, `checks`, `result`, and `recordedAt`. `checks` has the fixed order `release-identity`, `navigation`, `systems`, `mobile-no-canvas`, `contact`, `metadata`, `pdf`, `console`, `overflow`, `payloads`, `major-assets`; each record contains exactly `id`, `viewport`, `result`, `count`, and `limitation`, uses viewport `1440x900|390x844|not-applicable`, nonnegative integer count, `pass|fail`, and a nonempty limitation only when scope is narrower than the ID. Root `result` is `pass` if and only if all eleven required records are present in that order, every child is `pass`, and every limitation is empty; any failed, missing, duplicated, reordered, extra, or scope-narrowed child forces root `fail` and release `PARTIAL`. Fixtures cover inconsistent root/child results and a narrowed child incorrectly marked as root pass. Production Playwright uses no generic reporter/artifact root mutation after preupload; its only persisted outputs are this exact smoke record and the production PNGs bound by the review manifest.

`npm run verify` performs preupload only after every local child gate, screenshot, report index, Release Evidence record, and asset inventory is final. No local command mutates a declared root afterward. Hosted finalization may then add only the closed hosted-only set; it performs hosted-final as the last workflow mutation, and nothing may mutate any declared root afterward. Local `VERIFIED` requires a passing preupload attestation; `VERIFIED_COMPLETE` requires a passing hosted-final attestation for the same SHA/tree plus every hosted gate. Missing/stale/malformed phase evidence, changed/removed preupload bytes, a hosted path collision, missing/extra smoke or screenshot output, unsafe generated files, unauthorized inter-phase output, post-hosted mutation, or a failing scan makes the applicable status nonzero/PARTIAL. Fixtures cover both phases, phase ordering, every root, changed/added/removed preupload files, one allowed hosted addition, path collision, extra hosted path, links and escapes, extension/magic mismatch, unsafe text, malformed known records, stale/wrong-phase self-attestation, identical rerun, and proof that each sole self-exclusion cannot hide another file.

## Review Attestation Index

Eight tracked safe reports live exactly at `docs/release/reviews/{product,evidence-privacy,visual-responsive,motion,accessibility,simplicity,code-integration,local-screenshot}.md`. Their closed YAML frontmatter contains `lens`, `sourceDigest`, `verdict`, `findingDisposition`, and `reviewedAt`. Reports are excluded from the source digest to avoid self-reference, but each report must carry the computed digest, be tracked, be a regular non-symlink file whose real path remains inside `docs/release/reviews/`, and have no staged, unstaged, or untracked candidate change.

`npm run verify` validates those reports and generates ignored, non-deployed `artifacts/release/review-attestations.v1.json` after the clean candidate commit exists. Its root contains exactly `schemaVersion`, `sourceSha`, `sourceTree`, `sourceDigest`, and `reviews`. `schemaVersion` is `1`; the SHA/tree are the full clean checkout identities; `reviews` contains exactly one record for each ordered required lens.

Each review record contains exactly:

| Field | Contract |
| --- | --- |
| `lens` | One required lens ID, unique and in the required order |
| `sourceSha` | Full 40-character lowercase candidate commit SHA, identical to the root and clean checkout |
| `sourceTree` | Full 40-character lowercase candidate tree SHA, identical to the root and clean checkout |
| `sourceDigest` | Same lowercase SHA-256 value as the root |
| `verdict` | `pass`, `fail`, or `blocked` |
| `findingDisposition` | `none`, `resolved`, or `unresolved` |
| `reviewedAt` | Valid non-future ISO 8601 UTC time |
| `evidenceRef` | The exact tracked report path for that lens under `docs/release/reviews/` |
| `evidenceDigest` | Lowercase SHA-256 of the referenced report's raw bytes |

ReviewSourceV1 is lowercase SHA-256 over domain `REVIEW-SOURCE-V1\0` and the Architecture Spine's FileRecordV1 encoding for every tracked regular file in these exact inputs: directory roots `.github/workflows/`, `public/`, `scripts/`, `src/`, and `e2e/`; fixed files `.gitignore`, `DESIGN.md`, `EXPERIENCE.md`, `PRODUCT.md`, `README.md`, `eslint.config.js`, `index.html`, `package.json`, `package-lock.json`, `playwright.config.ts`, `postcss.config.js`, `tailwind.config.js`, `tsconfig.app.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `vitest.config.ts`, `docs/performance-budget.md`, `docs/release/confidentiality-review.v1.json`, and `docs/release/history-safe-patterns.v1.json`. Missing fixed inputs, unexpected untracked files below an input root, unsafe paths, links, or non-files fail. Review reports and generated attestations are excluded only to avoid self-reference; raw report bytes are bound by `evidenceDigest` and the exact candidate SHA/tree.

Verification requires clean non-shallow identity, exact root/per-record SHA/tree/digest equality, complete lens set, `pass`, `none|resolved`, valid time, exact allowed evidence path, `git ls-files --error-unmatch` success, clean report bytes, and matching evidence digest. Fixtures cover tracked, missing, modified, untracked, symlinked, escaping, wrong-SHA/tree, wrong-source-digest, and wrong-evidence-digest reports.

Hosted finalization separately writes `artifacts/release/production-review-evidence.v1.json` with exactly `schemaVersion`, full `sha`, and `files`. `files` contains at least one desktop and one mobile screenshot record, sorted by path, each with exactly `path`, `viewport`, `bytes`, and raw-byte lowercase `sha256`; paths are regular PNG files contained in `artifacts/screenshots/production/`, viewports are unique nonempty literal dimensions, and byte counts/hashes are recomputed. `artifacts/release/production-review-attestation.v1.json` contains exactly `schemaVersion`, full `sha`, `releaseIdentitySha`, `verdict`, `findingDisposition`, `reviewedAt`, `evidenceRef`, and `evidenceDigest`. `evidenceRef` is exactly the evidence JSON path and `evidenceDigest` is lowercase SHA-256 of its raw bytes. The attestation must be `pass`, target the deployed identity, contain no unresolved finding, validate every referenced screenshot, and enter the hosted-final GeneratedEvidenceV1 scan. Missing, reordered, replaced, linked, escaping, wrong-viewport, wrong-byte/hash, wrong-evidence-digest, or unsafe evidence fails.

## History Audit Receipt

Tracked `docs/release/history-safe-patterns.v1.json` contains exactly `schemaVersion`, `rulesVersion`, `commitMessageRules`, `pathRules`, `textRules`, `binaryPolicy`, `allowedExactCommitLines`, and `generatedEvidenceRoots`. Each generic text/path/message rule has stable `id`, `pattern`, and `flags`; regexes may encode only generic secret/private shapes, never a private-ledger value. `binaryPolicy` owns allowed and forbidden extension/magic categories plus unknown-current-output rejection. `allowedExactCommitLines` contains only `Co-authored-by: Cursor <cursoragent@cursor.com>` so the confidentiality audit does not impersonate the separate authorized rewrite audit. Ordered generated roots are `artifacts/release`, `test-results`, `playwright-report`, `.playwright-cli`, and `artifacts/screenshots`. CanonicalJsonV1 bytes of the complete rules object own `rulesDigest`.

`npm run verify:history` requires a non-shallow checkout and scans commit messages plus every unique blob reachable from candidate `HEAD`, then scans each declared generated root that exists. It never loads the private Evidence Ledger; text scanning emits only rule IDs and aggregate counts, binary scanning emits only policy IDs and counts, and no match value or sensitive path enters logs or receipts. It writes ignored `artifacts/release/history-audit-receipt.v1.json` with exactly `schemaVersion`, `headSha`, `headTree`, `rulesVersion`, `rulesDigest`, `commitCount`, `blobCount`, `scannedScopes`, `result`, and `recordedAt`.

The verifier requires schema `1`, current full SHA/tree, `history-safe-patterns.v1`, the computed lowercase SHA-256 rules digest, exact reachable counts, ordered scopes `reachable-history` then `generated-evidence`, `pass`, and a non-future time from the current run. It fails closed on a shallow checkout, missing object, unsafe match, binary-policy rejection, count mismatch, stale SHA/tree/rules, malformed receipt, or unsafe evidence output. Fixtures cover commit message, reachable text blob, known/unknown binary, each generated root, shallow clone, authorized Cursor trailer, and all receipt mismatches. After the authorized trailer rewrite, it reruns against the rewritten head before release.

## Confidentiality Review Digest

`docs/release/confidentiality-review.v1.json` is the non-sensitive tracked receipt defined by architecture AD-19. Its lowercase `reviewedContentDigest` is SHA-256 over `CONFIDENTIALITY-V1\0`, exact CanonicalJsonV1 public-graph bytes, `\0`, then FileRecordV1 for every regular file under exact validated Pages staging root `artifacts/pages-site/` except `release.json`. The receipt is outside staging; `release.json` is independently checked against its closed five-field schema and carries no content-bearing field. Source maps, internal evidence, links, path escapes, dotfiles, and unexpected outputs fail rather than being excluded.

CanonicalJsonV1 permits only null, booleans, Unicode strings without lone surrogates, safe integers without negative zero, arrays in source order, and objects whose unique keys sort by UTF-16 code units; strings use exact JSON escaping and integers minimal base-10. Float, non-finite, unsafe integer, negative-zero, lone-surrogate, duplicate-key source, and unsupported values fail. FileRecordV1 permits only NFC UTF-8 normalized `/`-separated relative paths and regular files; NUL, backslash, empty/dot segments, path escape, link, junction, device, and non-file fail. The receipt is stale exactly when schema, ordered scopes, result, time, or recomputed digest fails; `reviewedAt` must be valid and not in the future, but has no arbitrary age expiry. Fixtures cover canonical nested key/string/unicode/integer cases and every rejection, changed graph, changed artifact, reordered discovery, invalid path/file, malformed receipt, and byte-identical rebuild.

## Deployment Attestation

The hosted finalizer writes non-deployed `artifacts/release/deployment-attestation.v1.json` with exactly `schemaVersion`, full `sha`, `startingMainSha`, `workflowRunId`, `pagesArtifactId`, `pagesArtifactName`, `pagesArchiveDigest`, `pagesSiteDigest`, `publicIdentity`, `remoteMainShaAfterSmoke`, `branchAdvanced`, `result`, and `recordedAt`. After build/output/budget validation, `scripts/stage-pages.mjs` copies all validated public regular files byte-for-byte from `dist/` into fresh ignored `artifacts/pages-site/`, intentionally excluding only internal `dist/.vite/**`; every other dotfile, source map, internal record, unexpected output, non-file, or link fails. `pagesSiteDigest` is SHA-256 over `PAGES-SITE-V1\0` plus FileRecordV1 for every regular staged file, including `release.json`. The upload step uses exact path `artifacts/pages-site`, exposes immutable `artifact_id`, and the build job exports that ID plus exact name `github-pages` to its dependent deploy job.

The workflow grants `actions: read` and calls `GET /repos/lhcaps/lhcaps.github.io/actions/artifacts/<pages-artifact-id>` with `pagesArtifactId`. It requires exact name `github-pages`, `workflow_run.id === workflowRunId`, `workflow_run.head_sha === sha`, `expired === false`, and REST `digest` exactly `sha256:<64 lowercase hex>`, captured as `pagesArchiveDigest`; it also requires exactly one non-expired `github-pages` artifact for the current run. Before extraction it downloads that exact ID through the authenticated artifact API, hashes the raw outer archive bytes with SHA-256, and requires `sha256:<computed lowercase hex> === pagesArchiveDigest`. It then safely extracts the outer archive and inner Pages tar, rejects links/non-files/escapes, and requires the recomputed PAGES-SITE-V1 digest to equal the pre-upload value. The immutable deploy-pages full-SHA pin receives the exported exact artifact name from the dependent build job. Fixtures cover missing/malformed/wrong-algorithm REST digest and raw archive byte mismatch in addition to extracted-site mismatch.

Attestation requires `sha`, `startingMainSha`, workflow head, build source, artifact REST head, fetched `publicIdentity.sha`, production-smoke expected SHA, and—when no advance occurred—`remoteMainShaAfterSmoke` all equal. `publicIdentity` must match the exact five-field schema and canonical constants. If remote `main` changed after the run began, `branchAdvanced` is true, `result` is `blocked`, and release status is `PARTIAL` even when the fetched deployment matches this older candidate. Fixtures cover a full match, wrong public SHA, missing/expired/duplicate/wrong-run artifact, archive digest mismatch, extracted Pages-site digest mismatch, unsafe archive entry, and branch advance.

## CV artifact contract

- Public path and filename: `/le-huy-software-engineer-cv.pdf`, sourced from `public/le-huy-software-engineer-cv.pdf`.
- Maximum file size: `524288` bytes.
- Required extracted text: Le Huy; Software Engineer; Junior Software Engineer; backend-leaning full-stack; `huyle210525@gmail.com`; `github.com/lhcaps`; and all five public System titles.
- Required PDF destinations: `mailto:huyle210525@gmail.com` and `https://github.com/lhcaps`.
- Validation command: `npm run verify:cv`, implemented with pinned `pdf-parse` for text extraction plus byte-level link-annotation checks; it rejects encrypted, image-only, oversized, missing-text, missing-link, wrong-filename, or extra-page output.
- Reading-order acceptance: one page, name and role first, capability summary next, Systems after that, contact destinations last; extracted text follows the same sequence and no visual-only fact exists.
- Browser and production checks require status `200`, `application/pdf`, nonzero content length, the exact filename link from Closing, and a successful same-origin download.

`VERIFIED` requires a deterministic accepting gate against the stated SHA and scope. `OBSERVED` records direct browser or runtime inspection. `INFERRED` is a transparent conclusion from verified or observed inputs. `BLOCKED` preserves an unrun, inaccessible, or failing gate. These labels never substitute for Public Claim Manifest classifications.

## Release status rule

- `VERIFIED_COMPLETE` requires every required local gate, hosted gate, reviewer gate, payload budget, exact-SHA attestation, and production desktop/mobile smoke to pass with no material unresolved finding.
- `PARTIAL` is mandatory when any required gate fails, remains unrun, targets another SHA, lacks evidence, exceeds an unresolved budget, or cannot be verified in production.
- A historical Failed Gate remains visibly qualified and does not turn green because a later unrelated gate passes.

## Review lenses

- **Product:** reader journeys, exact copy requirements, five-System scope, contact closure, and no feature dilution.
- **Evidence and privacy:** every Claim key, classification, limitation, confidentiality exclusion, and release-label distinction.
- **Visual and responsive:** field-atlas identity, asymmetric rhythm, mobile composition, one focal object, no banned pattern, and no layout defect.
- **Motion:** finite state-mapped choreography, interruption, Reduced Motion, sub-768 bypass, offscreen stop, and no ambient loop.
- **Accessibility:** WCAG 2.2 AA automated and manual floor, DOM equivalence, focus, keyboard, touch, and contrast.
- **Simplicity:** no speculative abstraction, duplicate model, redundant library, decorative dependency, or unused legacy path.
- **Code and integration:** state ownership, error containment, base paths, tests, build, workflow, and metadata integrity.
- **Production screenshot:** live exact-SHA desktop and mobile pages, not only local screenshots.
