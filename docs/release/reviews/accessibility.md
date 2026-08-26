---
lens: accessibility
sourceDigest: 4fe3b693566849471450b0c76f97565160fe88707539c3f9e1245a990410187f
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-26T12:59:23.053Z
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
