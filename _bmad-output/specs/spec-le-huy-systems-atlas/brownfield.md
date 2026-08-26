# Brownfield and Repository Governance

## Discovery baseline

The starting point is `main` at `8ac839915f58ccb09a4c9f63d6a5c0e3ab8ac577`.

| Observation | Discovery result | Meaning |
| --- | --- | --- |
| Typecheck | Passed | Starting evidence only |
| Lint | Passed | Starting evidence only |
| Unit tests | 11 of 11 passed | Starting evidence only |
| Production build | Failed | `App.tsx` imported `Navigation.tsx` while the tracked file is `src/components/navigation.tsx` |
| GitHub Pages | Latest baseline workflow failed | The most recent success targeted an older SHA |
| Dependency audit | Six findings: one low, five high | Direct PostCSS and Vite advisories are included; current remediation must be verified |
| CV | No verified asset found | Create and validate a facts-only CV |

Fresh implementation and release evidence replaces this table. No discovery pass may be reported as final release proof.

## Preserve where it already fits

- React, Vite, TypeScript, Tailwind, Three.js, React Three Fiber, Drei, Framer Motion, Vitest, Testing Library, and Playwright-compatible foundations remain candidates only when the architecture confirms current versions and an actual role.
- Reuse the static runtime fallback pattern, Reduced Motion detection idea, controlled DPR support, and topology-oriented primitives only after aligning them to the final typed model and accessibility contract.
- Preserve public contact facts already present in repository data: `huyle210525@gmail.com` and `https://github.com/lhcaps`.

## Remove or replace before acceptance

- Resolve the tracked filename/import casing defect and keep imports exact-case portable.
- Consolidate two legacy runtime-scene mounts into one focal Atlas Canvas.
- Remove infinite packet, link, marker, pulse, orbit, and idle scene motion.
- Replace the legacy `<480px` scene gate with the contract's `<768px`, Reduced Motion, support, error, and visibility eligibility.
- Remove remote Google Fonts and `fonts.gstatic.com` scene font loading; use the local Fontsource contract.
- Remove `public/credentials/ielts/index.html` and its entire legacy `public/credentials/` tree; it is unrelated to the facts-only portfolio and Vite would otherwise deploy it. The final public-source allowlist contains only the approved favicon, Open Graph image, robots policy, sitemap, and facts-only CV; `release.json` is build-emitted.
- Replace the legacy dark glassy green/blue dashboard surface with the final warm-paper field-atlas design.
- Replace duplicate content/project/runtime data with one authoritative typed System and Claim model.
- Repair missing Opening anchor, mobile-navigation semantics, focus/Escape behavior, click-only articles, pointer-only/no-op scene affordances, stale metadata, missing social asset, and missing CV.
- Remove unused components and data after call-site and test proof; do not preserve dead abstractions for compatibility with a page being deliberately replaced.

## Commit and workspace safety

- Set repository-local identity to `Huy Le <huyle210525@gmail.com>` before new commits.
- Stage only explicit reviewed paths. Never use broad staging that can capture private ledgers or unrelated files.
- Do not reset, clean, stash, create worktrees, disclose secrets, or mutate unrelated user changes.
- The private Evidence Ledger and Deep Recon research remain ignored, untracked, absent from patches, and excluded from all build and release artifacts.

## Conditional history rewrite

History maintenance runs only after implementation and release candidates are verified locally.

Before any rewrite, a non-shallow `npm run verify:history` audit scans commit messages and every unique blob reachable from candidate `HEAD`, plus generated release, Playwright, review, and screenshot evidence, using only safe generic rules and no private-ledger values. It emits only the closed non-sensitive receipt defined by the Verification Contract; logs never reveal a matched string or sensitive path. The same audit must pass again on the rewritten candidate before push.

1. Fetch and record the exact remote `main` SHA used as the lease.
2. Audit every author and committer identity. Stop on ambiguous ownership.
3. Count exact target lines matching `Co-authored-by: Cursor <cursoragent@cursor.com>`; do not match the word `cursor` elsewhere.
4. Create a verified Git bundle outside the repository and prove it can list the protected refs.
5. Rewrite only the exact authorized trailer line with `uvx git-filter-repo` or an equivalently deterministic message callback.
6. Compare old and new commit counts, sequence, parent shape, author/committer identities, authored and committed dates, file trees, and every message after removing only the exact target line.
7. Stop if any tree differs or any non-target identity, date, order, or message content changes.
8. Push the explicit branch with `--force-with-lease=refs/heads/main:<recorded-remote-sha>`; never use unguarded force.
9. Re-run hosted CI and exact-SHA production attestation on the rewritten final SHA.

The external bundle is recovery material and is never added to the repository. Report its absolute path and verification result without exposing unrelated repository data.
