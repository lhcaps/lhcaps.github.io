---
name: 'Le Huy Systems Atlas'
description: 'An annotated field atlas for inspecting the decisions, handoffs, and evidence inside five engineered systems.'
status: final
sources:
  - ../../prds/prd-Portfolio-2026-08-22/prd.md
  - ../../prds/prd-Portfolio-2026-08-22/addendum.md
  - ../../../../PRODUCT.md
updated: '2026-08-22'
colors:
  paper: '#F3EFE4'
  paper-raised: '#FCF9F0'
  paper-quiet: '#E9E4D8'
  plane-near: '#E0DACD'
  plane-mid: '#D0C9BB'
  plane-far: '#BBB4A7'
  ink: '#20231E'
  ink-soft: '#585C54'
  ink-faint: '#656A62'
  line-soft: '#C5C0B4'
  line-strong: '#85887F'
  rust: '#B4432C'
  rust-deep: '#7B2B1D'
  rust-wash: '#EFD4CA'
  on-rust: '#FCF9F0'
typography:
  display-xl:
    fontFamily: 'Geologica Variable, Geologica, system-ui, sans-serif'
    fontSize: 'clamp(3.25rem, 6.5vw, 5.75rem)'
    fontWeight: '620'
    lineHeight: '0.96'
    letterSpacing: '-0.055em'
  display-lg:
    fontFamily: 'Geologica Variable, Geologica, system-ui, sans-serif'
    fontSize: 'clamp(2.5rem, 4.4vw, 4rem)'
    fontWeight: '590'
    lineHeight: '1.02'
    letterSpacing: '-0.045em'
  heading-lg:
    fontFamily: 'Geologica Variable, Geologica, system-ui, sans-serif'
    fontSize: 'clamp(2rem, 3vw, 2.75rem)'
    fontWeight: '570'
    lineHeight: '1.08'
    letterSpacing: '-0.035em'
  heading-md:
    fontFamily: 'Geologica Variable, Geologica, system-ui, sans-serif'
    fontSize: 'clamp(1.5rem, 2vw, 2rem)'
    fontWeight: '560'
    lineHeight: '1.16'
    letterSpacing: '-0.025em'
  body-lg:
    fontFamily: 'Geologica Variable, Geologica, system-ui, sans-serif'
    fontSize: '1.1875rem'
    fontWeight: '390'
    lineHeight: '1.62'
    letterSpacing: '-0.008em'
  body-md:
    fontFamily: 'Geologica Variable, Geologica, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: '390'
    lineHeight: '1.62'
    letterSpacing: '-0.004em'
  body-sm:
    fontFamily: 'Geologica Variable, Geologica, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: '410'
    lineHeight: '1.52'
  annotation:
    fontFamily: 'Fragment Mono, ui-monospace, monospace'
    fontSize: '0.6875rem'
    fontWeight: '400'
    lineHeight: '1.45'
    letterSpacing: '0.055em'
  action:
    fontFamily: 'Geologica Variable, Geologica, system-ui, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: '560'
    lineHeight: '1'
    letterSpacing: '-0.01em'
rounded:
  sm: '2px'
  md: '6px'
  lg: '12px'
  full: '9999px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '20px'
  '5': '32px'
  '6': '52px'
  '7': '84px'
  '8': '136px'
  gutter-mobile: '20px'
  gutter-tablet: '32px'
  gutter-desktop: 'clamp(40px, 5vw, 72px)'
  section: 'clamp(72px, 10vw, 136px)'
components:
  primary-action:
    background: '{colors.rust}'
    foreground: '{colors.on-rust}'
    borderColor: '{colors.rust}'
    radius: '{rounded.md}'
    minHeight: '48px'
    paddingInline: '{spacing.4}'
    typography: '{typography.action}'
  navigation-link:
    foreground: '{colors.ink-soft}'
    activeForeground: '{colors.rust-deep}'
    ruleColor: '{colors.rust}'
    typography: '{typography.body-sm}'
  mobile-navigation:
    background: '{colors.paper-raised}'
    foreground: '{colors.ink}'
    borderColor: '{colors.line-strong}'
    radius: '{rounded.lg}'
  system-selector:
    background: '{colors.paper}'
    foreground: '{colors.ink-soft}'
    selectedBackground: '{colors.rust-wash}'
    selectedForeground: '{colors.rust-deep}'
    borderColor: '{colors.line-strong}'
    radius: '{rounded.sm}'
    minHeight: '44px'
    typography: '{typography.annotation}'
  atlas-frame:
    background: '{colors.paper-raised}'
    foreground: '{colors.ink}'
    borderColor: '{colors.line-strong}'
    radius: '{rounded.lg}'
    shadow: '0 24px 80px rgba(32, 35, 30, 0.10)'
  readable-topology:
    background: '{colors.paper-quiet}'
    foreground: '{colors.ink}'
    secondaryForeground: '{colors.ink-soft}'
    borderColor: '{colors.line-strong}'
    radius: '{rounded.md}'
  topology-node:
    background: '{colors.paper-raised}'
    foreground: '{colors.ink}'
    selectedBackground: '{colors.rust}'
    selectedForeground: '{colors.on-rust}'
    borderColor: '{colors.line-strong}'
    radius: '{rounded.sm}'
    typography: '{typography.annotation}'
  route-annotation:
    foreground: '{colors.ink-soft}'
    activeForeground: '{colors.rust-deep}'
    ruleColor: '{colors.line-strong}'
    activeRuleColor: '{colors.rust}'
    typography: '{typography.annotation}'
  evidence-marker:
    foreground: '{colors.ink}'
    mutedForeground: '{colors.ink-soft}'
    ruleColor: '{colors.line-strong}'
    warningForeground: '{colors.rust-deep}'
    typography: '{typography.annotation}'
  system-index:
    foreground: '{colors.ink}'
    secondaryForeground: '{colors.ink-soft}'
    ruleColor: '{colors.line-soft}'
    indexForeground: '{colors.rust-deep}'
  harness-row:
    foreground: '{colors.ink}'
    secondaryForeground: '{colors.ink-soft}'
    ruleColor: '{colors.line-strong}'
    failureForeground: '{colors.rust-deep}'
    typography: '{typography.annotation}'
---

## Brand & Style

Systems Atlas should feel like a field guide drafted by someone who also built the terrain. The physical reference is a folded survey sheet spread across a bright desk: warm paper, charcoal notation, precise red pencil, layered planes, and routes that reveal how a system moves. It is cinematic through framing and sequence, playful through the confidence of its annotations, and minimal because every mark has a job.

The page is a brand surface, not a dashboard. It uses asymmetric editorial pacing without borrowing magazine decoration. A concrete artifact leads each chapter. A DOCX Contract can occupy a full typographic spread. A Queue Handoff can cross the column boundary. A Fourth Pricing Change can bend a route back through the same six stations. The visual system never invents product screenshots or metrics to fill space.

The system uses restrained color, strong scale contrast, and low radii. Depth belongs primarily to the Systems Atlas, where it separates authority or runtime layers. DOM content stays materially flat and readable. The final effect should be approachable engineering precision, not sterile infrastructure theater.

### Key-screen references

- [Opening and canonical Atlas](mockups/key-opening-atlas.html) demonstrates the 7/5 Opening, five-system proof index, 5/7 Atlas, readable topology, one raised scene object, and exact evidence limitation.
- [Flagship narrative rhythm](mockups/key-flagship-rhythm.html) demonstrates chapter-specific forms for the contract, cross-runtime handoff, adaptation loop, operational branch, and incomplete lab boundary.

Both offline HTML references were rendered at `1440×900` and `390×844`. They illustrate this spine; when a mock conflicts with a token, component contract, accessibility floor, or behavior in `EXPERIENCE.md`, the two spines win.

## Colors

The palette is restrained: warm neutrals plus one rust accent. Rust means selected, moving, or requiring attention. It never becomes a decorative wash across unrelated surfaces.

- **Paper** `{colors.paper}` is the page canvas. It feels physical in daylight and avoids both pure white and the default dark developer theme.
- **Raised paper** `{colors.paper-raised}` holds the Atlas and the few elements that need object-level separation.
- **Quiet paper and planes** `{colors.paper-quiet}`, `{colors.plane-near}`, `{colors.plane-mid}`, and `{colors.plane-far}` encode physical depth without introducing new hues.
- **Ink** `{colors.ink}` carries headings and primary text. Its contrast against Paper is `13.84:1`.
- **Soft ink** `{colors.ink-soft}` carries supporting copy. Its contrast against Paper is `5.95:1`.
- **Faint ink** `{colors.ink-faint}` carries tertiary text only. Its contrast against Paper is `4.82:1`, so it never appears below the text floor or as a low-contrast route, status, or control label.
- **Strong line** `{colors.line-strong}` is reserved for functional control boundaries and meaningful route edges. Its contrast against Paper is `3.14:1`.
- **Rust** `{colors.rust}` marks the Selected System, Active Handoff route and required destination node, Primary Action, and focus ring. Rust against Paper is `4.84:1`; Raised Paper on Rust is `5.28:1`.
- **Rust wash** `{colors.rust-wash}` is a selected-row field only. Text on it uses `{colors.rust-deep}`, never Rust.

Status never depends on color. `VERIFIED`, `OBSERVED`, `INFERRED`, `BLOCKED`, and failed-gate language remain visible next to any state treatment. Gradients, glows, glass, and neon are absent.

## Typography

**Geologica** is the page voice. Its variable construction can feel like technical lettering without becoming a monospace costume. Weight and width create hierarchy within one committed family. **Fragment Mono** appears only in route labels, evidence classifications, build output, node IDs, and small annotations.

Font delivery is local and explicit. The application imports `@fontsource-variable/geologica/wght.css` once for weights `100–900` and imports `@fontsource/fragment-mono` once for weight `400`. Font faces use `font-display: swap`; the CSS stack keeps Geologica, system sans, and system monospace fallbacks. Remove every Google Fonts stylesheet import, duplicated font link, and `fonts.gstatic.com` Canvas font URL. Canvas geometry carries no exclusive text and therefore requires no separate remote font. Preload only the Geologica Latin variable asset if a production measurement proves that it improves the Opening; Fragment Mono remains below-the-fold and is not preloaded by default.

`{typography.display-xl}` is reserved for Le Huy's name and one decisive statement. It never appears on every section. `{typography.display-lg}` opens flagship narratives; `{typography.heading-lg}` and `{typography.heading-md}` create the remaining hierarchy. Body copy uses `{typography.body-lg}` only for opening propositions and chapter leads, then `{typography.body-md}` or `{typography.body-sm}`. Paragraphs stop at `70ch`.

Annotations use sentence case or compact codes. All-caps is allowed only for short evidence classifications and the exact statement **THE AGENT WRITES. THE HARNESS DECIDES.** Long explanatory text never uses Fragment Mono.

## Layout & Spacing

The desktop canvas uses a 12-column grid inside a `1440px` maximum page width. The Opening uses an asymmetric 7/5 split. The Systems Atlas uses a 5/7 split: controls and readable relationships on the left, the focal scene on the right. Empty columns are intentional and must align to the grid rather than float arbitrarily.

Section gaps use `{spacing.section}`. Related mechanism and evidence content compress to `{spacing.3}` or `{spacing.4}`; chapter changes open to `{spacing.7}` or `{spacing.8}`. The rhythm should alternate between a broad field, a dense mechanism, and another broad field. Uniform vertical padding is a failure.

Flagship Narratives use three different compositions:

1. Form Management reads like a contract spread with a governed central clause.
2. VisionFlow Studio reads as a cross-runtime route that visibly leaves the request column.
3. Production Booking & Operations Platform reads as a six-station loop with the Fourth Pricing Change in focus.

Parkly becomes an operational branch strip. TFT Local Copilot becomes a compact lab-note sequence. Neither becomes a smaller copy of a flagship panel.

Below `768px`, every asymmetric composition collapses to one column with `{spacing.gutter-mobile}`. No element escapes the viewport. At `768px` through `1023px`, the Atlas and its readable representation stack. Desktop sticky behavior, if used, is bounded to its section and must survive constrained heights.

## Elevation & Depth

Depth has two meanings. In the Systems Atlas, Z separation maps to an authority, persistence, runtime, or review boundary. In the DOM, raised paper distinguishes the one focal Atlas object from the page. Nothing else needs a card shadow.

The `{components.atlas-frame.shadow}` is the only broad shadow. It is tinted toward Ink and stays subtle. Flagship sections use rules, whitespace, and tonal planes instead of elevation. No nested raised surfaces, glass blur, or floating ornament appears.

Atlas depth planes use `{colors.plane-near}`, `{colors.plane-mid}`, and `{colors.plane-far}`. Perspective never hides a label or implies an unverified relationship. The Readable Equivalent Representation names the same layers in DOM order.

## Shapes

The shape language is drafted, not pillowy. `{rounded.sm}` belongs to nodes, selector cells, labels, and evidence fields. `{rounded.md}` belongs to the Primary Action and compact controls. `{rounded.lg}` belongs only to the Atlas frame and mobile navigation sheet.

`{rounded.full}` is permitted for a literal point or focus marker inside a topology. It is not a default button, tag, skill pill, or container shape. Hairlines remain one pixel; colored side stripes are absent.

## Components

| Component | Visual contract |
| --- | --- |
| `primary-action` | Rust field, Raised Paper text, `{rounded.md}`, clear inset edge, minimum 48px height. Pressed state moves down one pixel and scales to `0.98`; no magnetic pull. |
| `navigation-link` | Soft Ink by default, Rust Deep when current. A one-pixel Rust rule grows beneath the text; no pill background. |
| `mobile-navigation` | Raised Paper sheet with one Strong Line boundary and `{rounded.lg}`. It is an object because it overlays content, not because every region needs elevation. |
| `system-selector` | Five drafted cells. Selected state uses Rust Wash plus Rust Deep text and a visible check rule. Cells never become equal promotional cards. |
| `atlas-frame` | The single raised scene object. It includes a coordinate caption, layer legend, scene status, and stable fallback area within the same boundary. |
| `readable-topology` | DOM-first topology with named layers, ordered relationships, and the same Selected System as the scene. Quiet Paper distinguishes it without making it a second focal object. |
| `topology-node` | Low-radius labeled plate on one depth plane. Rust fill marks the required Active Handoff destination node named by `focusNodeId`; every other noninteractive node receives no hover affordance. |
| `route-annotation` | One-pixel route plus Fragment Mono label. Rust marks the Active Handoff route; line pattern and wording preserve meaning without color. |
| `evidence-marker` | Inline classification, source level, and limitation separated by rules. A failed or blocked state uses Rust Deep text plus literal status, never a green/red dot alone. |
| `system-index` | Number, System name, anchor, and one relationship line separated by whitespace and a rule. It replaces repeated project cards. |
| `harness-row` | Public-safe gate category, acceptance job, qualification, and only an approved static historical observation. Internal commands, counts, timestamps, SHAs, workflow data, payloads, assets, review scope, and evidence references never render. Failure is a first-class row, not a warning badge. |

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| Let one verified artifact dominate each chapter | Fill every chapter with screenshots or equal cards |
| Use Rust to show selection, route progress, focus, or attention | Spread Rust decoratively or introduce blue-purple gradients |
| Keep the Canvas paired with a readable DOM topology | Put labels, claims, or navigation only inside WebGL |
| Use finite handoff motion and fast tactile press feedback | Pulse, float, shimmer, type forever, or hijack scrolling |
| Create asymmetry with the grid and real empty space | Center every heading or position ornaments arbitrarily |
| Use Geologica for voice and Fragment Mono for evidence | Use monospace as a blanket synonym for engineering |
| Use one focal shadow and otherwise rely on rules and tone | Build a glass-card stack or rounded bento wall |
| Show exact limitations beside Claims | Turn evidence status into vague confidence decoration |
