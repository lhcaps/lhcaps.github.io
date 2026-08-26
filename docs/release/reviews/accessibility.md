---
lens: accessibility
sourceDigest: 1616b30a9953c83de4fff0db5907227d2a7ccf82d5dcafbbc4c1662b57998814
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-26T18:23:10.270Z
---

# Accessibility review

## Scope

Reviewed WCAG 2.2 AA automated findings and the manual floor for semantics, reading order, keyboard selection, mobile sheet focus, focus return, skip navigation, touch targets, contrast, Reduced Motion, and DOM equivalence.

## Evidence

- Axe reports zero violations on the DOM-primary 390×844 Reduced Motion path using WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA tags.
- All five selector controls expose button semantics and `aria-pressed`; Arrow keys, Home, End, Enter, Space, pointer, and touch preserve one selected state and a polite live announcement.
- Mobile navigation sets inert content, contains Tab/Shift+Tab, closes on Escape/backdrop/selection, clears scroll locking, and restores focus to the trigger.
- The Canvas is `aria-hidden`, has `tabindex="-1"`, and owns no Claim or relationship. The readable topology remains complete in every bypass/failure state.
- Contrast and scrollable-region findings discovered by axe were corrected through the final token values and keyboard-focusable lifecycle region.

## Verdict

Pass after resolved contrast and scroll-region findings. No material accessibility finding remains unresolved.
