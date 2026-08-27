---
lens: evidence-privacy
sourceDigest: 83bc1cf7adc3a45639942b347d62cfaea659d522c93789d9262f6b809ca1de6b
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-27T12:19:31.602Z
---

# Evidence and privacy review

## Scope

Reviewed Claim classification, required limitations, public destinations, private-ledger exclusion, current/public build contents, generated-output rules, history safety, CV facts, and the distinction between Claim evidence and release assertions.

## Evidence

- `src/content/portfolio.ts` is the single public graph. Validators reject a non-public-safe Claim, an absent limitation, an unknown Claim reference, prohibited public value shapes, invalid topology references, and destinations outside the exact allowlist.
- `docs/portfolio-evidence/` and BMAD research are ignored and are not inputs to release scripts. The public source allowlist contains only favicon, OG image, robots, sitemap, and CV.
- The tracked confidentiality receipt binds canonical public-graph bytes plus every staged public byte except the independently closed `release.json`; it verifies at digest `1c1f1e65f15dadd7270be23884d57c1d8dd200b75176f8753e982dd2efb97742`.
- Fresh `core.autocrlf=false` and `core.autocrlf=true` checkouts produce byte-identical 20-file Pages sites and the same review-source digest. The safe scan reports no key, token, local-path, source-map, localhost, dotfile, or reparse-point exposure.
- Overflow diagnostics execute only in post-deploy tooling; their bounded element metadata is neither staged in the public site nor persisted in passing Release Evidence.
- The reachable-history/generated-root audit scans the full non-shallow history using generic, non-ledger rules and emits only aggregate rule IDs and counts.
- Metadata cleanup permits only the exact Cursor trailer, preserves the signed prefix and both audited human identity forms, retains the GitHub service committer, and aborts on any additional author or committer identity.
- Public copy explicitly separates Repository-backed, Derived, and Contextual Claims from VERIFIED, OBSERVED, INFERRED, and BLOCKED release assertions.

## Verdict

Pass after closing history-identity ambiguity. No private evidence, credential, client identity, unsupported metric, or scope-upgraded production claim is present in the candidate or validated Pages site.
