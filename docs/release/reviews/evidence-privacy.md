---
lens: evidence-privacy
sourceDigest: 1616b30a9953c83de4fff0db5907227d2a7ccf82d5dcafbbc4c1662b57998814
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-26T18:23:10.270Z
---

# Evidence and privacy review

## Scope

Reviewed Claim classification, required limitations, public destinations, private-ledger exclusion, current/public build contents, generated-output rules, history safety, CV facts, and the distinction between Claim evidence and release assertions.

## Evidence

- `src/content/portfolio.ts` is the single public graph. Validators reject a non-public-safe Claim, an absent limitation, an unknown Claim reference, prohibited public value shapes, invalid topology references, and destinations outside the exact allowlist.
- `docs/portfolio-evidence/` and BMAD research are ignored and are not inputs to release scripts. The public source allowlist contains only favicon, OG image, robots, sitemap, and CV.
- The tracked confidentiality receipt binds canonical public-graph bytes plus every staged public byte except the independently closed `release.json`; the current receipt verifies at digest `d127842fb1532ba46793aa09de60596a1364009241efb471e75a59ffef7216e0`.
- The reachable-history/generated-root audit scans the full non-shallow history using generic, non-ledger rules and emits only aggregate rule IDs and counts.
- Metadata cleanup permits only the exact Cursor trailer, preserves the signed prefix and both audited human identity forms, retains the GitHub service committer, and aborts on any additional author or committer identity.
- Public copy explicitly separates Repository-backed, Derived, and Contextual Claims from VERIFIED, OBSERVED, INFERRED, and BLOCKED release assertions.

## Verdict

Pass after closing history-identity ambiguity. No private evidence, credential, client identity, unsupported metric, or scope-upgraded production claim is present in the candidate or validated Pages site.
