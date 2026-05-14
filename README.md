# Le Huy Portfolio

A cinematic 3D one-page portfolio built with React, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.

**Builder of operational systems.** Backend-leaning full-stack developer focused on typed APIs, queues, databases, AI/CV pipelines, and local-first infrastructure.

## Live Site

https://lhcaps.github.io

## Preview

![Portfolio Preview](https://raw.githubusercontent.com/lhcaps/lhcaps.github.io/main/public/preview.jpg)

## Stack

- **React 19** + **TypeScript**
- **Vite** build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for DOM animations
- **Three.js / React Three Fiber / Drei** for 3D system core
- **Lucide React** for icons

## Design Direction

System-core inspired portfolio. The 3D hero visualizes a living backend architecture — central core node with orbiting services (API, DB, Queue, Worker, AI, UI) representing the developer's mental model of how systems fit together.

Dark premium palette: deep navy backgrounds, cyan/blue primary accents, violet secondary accents.

## Sections

1. **Hero 3D** -- System core visualization with name, role, and CTAs
2. **Selected Systems** -- Case-study project cards with architecture mini-visuals
3. **System Stack** -- Layered tech stack by architectural tier
4. **About** -- Sharp, focused bio
5. **Education** -- Academic background and certifications
6. **Contact** -- Reach out

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

Push to `main` -- GitHub Actions automatically builds and deploys to GitHub Pages.
