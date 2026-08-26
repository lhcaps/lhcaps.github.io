---
lens: evidence-privacy
sourceDigest: 01b3bcb1c7476c526b7ddf2fd3599a838ad7665b2853dbe30c8149ff5c617dde
verdict: pass
findingDisposition: none
reviewedAt: 2026-08-26T12:53:29.425Z
---

# Evidence and privacy review

## Scope

Reviewed Claim classification, required limitations, public destinations, private-ledger exclusion, current/public build contents, generated-output rules, history safety, CV facts, and the distinction between Claim evidence and release assertions.

## Evidence

- `src/content/portfolio.ts` is the single public graph. Validators reject a non-public-safe Claim, an absent limitation, an unknown Claim reference, prohibited public value shapes, invalid topology references, and destinations outside the exact allowlist.
- `docs/portfolio-evidence/` and BMAD research are ignored and are not inputs to release scripts. The public source allowlist contains only favicon, OG image, robots, sitemap, and CV.
- The tracked confidentiality receipt binds canonical public-graph bytes plus every staged public byte except the independently closed `release.json`; the current receipt verifies at digest `d127842fb1532ba46793aa09de60596a1364009241efb471e75a59ffef7216e0`.
- The reachable-history/generated-root audit passes over 34 commits and 651 unique blobs using generic, non-ledger rules. It emits only aggregate rule IDs and counts.
- Public copy explicitly separates Repository-backed, Derived, and Contextual Claims from VERIFIED, OBSERVED, INFERRED, and BLOCKED release assertions.

## Verdict

Pass. No private evidence, credential, client identity, unsupported metric, or scope-upgraded production claim is present in the candidate or validated Pages site.
