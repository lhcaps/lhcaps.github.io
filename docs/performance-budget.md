# Systems Atlas performance budget

The budget is an accepting release contract, not a target inferred from a development server. `npm run verify:budget` measures the byte-exact validated Pages staging tree at `artifacts/pages-site/` after `npm run build`, `npm run validate:build`, and `npm run stage:pages`.

## Numeric limits

| Metric | Maximum | Reference local measurement |
| --- | ---: | ---: |
| Eager JavaScript | 174,080 B gzip | 75,153 B |
| Lazy Atlas JavaScript | 435,200 B gzip | 232,248 B |
| All CSS | 25,600 B gzip | 11,500 B |
| First-view fonts | 225,280 B raw | 50,168 B |
| Initial transfer | 460,800 B | 138,085 B |
| Largest static non-font asset | 262,144 B raw | 194,569 B |
| CV | 524,288 B raw | 5,400 B |

The reference column is an observed pre-release build and is not production proof. The final SHA's generated `asset-inventory.v1.json` is authoritative.

## Measurement rules

- HTML, JavaScript, CSS, JSON, XML, and text use deterministic gzip level 9; already-compressed fonts, images, and PDF use raw bytes.
- Eager and Atlas JavaScript ownership is derived from the Vite manifest's single entry and single `src/atlas/scene/AtlasScene.tsx` dynamic root, including nested imports.
- The build-emitted closed chunk/module inventory must match every manifest JavaScript chunk. Three.js and React Three Fiber modules are rejected from the eager role.
- First-view fonts are derived by following the eager CSS `@font-face` URLs for the Latin ranges; filenames are not trusted as an oracle.
- Initial transfer includes HTML, favicon, eager JavaScript, eager CSS, and the two first-view font files.
- `pagesSiteDigest` uses domain `PAGES-SITE-V1\0` plus every staged FileRecordV1 in normalized UTF-8 path-byte order.
- Git checkout attributes pin public passthrough text to LF, so Windows and Linux builds stage identical bytes.
- Missing/extra files, ambiguous chunk ownership, an unclassified asset, stale SHA/tree, changed bytes, or malformed totals fail closed.

## Runtime scene limits

- At most one Canvas exists, and it mounts only for an eligible viewport after the Atlas enters view.
- Canvas DPR is capped at `[1, 1.5]`.
- Rendering uses `frameloop="demand"`; transitions invalidate only while finite choreography is active.
- Per-frame work mutates refs and must not call React state setters.
- There is no bloom, post-processing, particle field, shader noise, continuous rotation, free orbit, zoom, or pan.
- Offscreen selection and re-entry settle without replay. Scene error/context loss becomes a sticky DOM-only fallback.
- Below 768 px and under Reduced Motion the scene module is not requested, so topology meaning stays outside the critical path.

## Reproduction

From a clean non-shallow candidate with Node `22.23.1` and npm `11.12.1`:

```bash
npm ci
npm run build
npm run validate:build
npm run stage:pages
npm run verify:budget
```

The canonical `npm run verify` performs these in the required order and binds the resulting inventory into terminal generated evidence.
