---
lens: accessibility
sourceDigest: 558a9c19c901355d095f39b1512c9ad16ea3b9757755c0cfe142bb4dee7b38a6
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-26T18:53:37.755Z
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
- Exact-head unit and browser suites retain the complete normal/Reduced Motion matrix after the navigation-test isolation change; production behavior and keyboard contracts are unchanged.

## Verdict

Pass after resolved contrast and scroll-region findings. No material accessibility finding remains unresolved.
