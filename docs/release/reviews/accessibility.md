---
lens: accessibility
sourceDigest: 07a91f1c0ab71b3346f58ebaf838036e4e0b76288031a8a615b25f8f1fe8718c
verdict: pass
findingDisposition: resolved
reviewedAt: 2026-08-27T12:42:27.796Z
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
- The smoke-only overflow fix alters no DOM, focus, keyboard, touch, or Reduced Motion behavior. The intentional lifecycle scroller remains keyboard-focusable and separately covered by the browser matrix.
- Overflow is rechecked while the mobile focus trap is open and after the keyboard-focusable lifecycle is horizontally scrolled; both states remain viewport-contained.

## Verdict

Pass after resolved contrast and scroll-region findings. No material accessibility finding remains unresolved.
