# Le Huy Portfolio

A one-page portfolio for Le Huy, focused on backend-heavy full-stack systems:
typed APIs, databases, queues, workers, AI/CV workflows, and interfaces that
reflect real operational state.

## Live Site

https://lhcaps.github.io

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Design Direction

The page is intentionally closer to an editorial case-study surface than a
generic developer landing page. It uses restrained dark neutrals, precise
hairline structure, system diagrams, and proof-oriented copy instead of neon
glows, generic card grids, fake metrics, or decorative motion.

## Sections

1. Hero - positioning and operational systems overview
2. Selected Systems - project case studies with problem, role, proof, and diagrams
3. Stack - layered runtime model
4. Principles - engineering stance and working habits
5. Proof - education and IELTS credential summary
6. Contact - direct contact paths

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Push to `main`. GitHub Actions builds `dist` and deploys it to GitHub Pages.
