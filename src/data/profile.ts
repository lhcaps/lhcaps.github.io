export const profile = {
  name: "Le Huy",
  alias: "aka Louwis",
  role: "Backend-heavy Full-stack Developer",
  tagline:
    "Software Engineering student in Ho Chi Minh City building React apps, Node.js/FastAPI APIs, SQL databases, Redis queues, Docker setups, and AI/CV pipelines with verifiable local runtimes.",
  hero: {
    headline: "I build full-stack systems that actually work and can be verified.",
    summary:
      "React dashboards backed by typed APIs, SQL data layers, background queues, and verification scripts. The goal is always a system where the UI reflects real backend state, not optimistic theater.",
    signals: ["React / TypeScript", "Node.js / FastAPI", "SQL / Prisma / Redis", "Docker / Playwright"],
    proof: ["Typed contracts", "Migrations", "Smoke tests", "Playwright / Vitest"],
  },
  bio: [
    "I am a Software Engineering student at HUFLIT with a backend-leaning full-stack background. I build systems that hold up under real use: structured data layers, typed API contracts, reproducible runtimes, and scripts that prove the thing works.",
    "My projects push one level beyond tutorial territory. Parkly forced me to own gate sessions, payment queues, and migrations. VisionFlow pushed me into async CV workers and job state tracking. TFT Local Copilot taught me how retrieval systems break when ingestion and streaming are treated as separate demos.",
  ],
  principles: [
    {
      title: "Backend ownership",
      text: "I am comfortable owning domain logic, migrations, queues, caching, and the evidence that the runtime works.",
    },
    {
      title: "Verification habits",
      text: "Type checks, smoke tests, E2E flows, and clear failure messages make regressions harder to hide.",
    },
    {
      title: "End-to-end thinking",
      text: "I break features into data model, API layer, UI workflow, and verification so fewer details slip through.",
    },
  ],
  availability: {
    status: true,
    text: "Available for internships and product engineering work",
  },
  contact: {
    email: "huyle210525@gmail.com",
    github: "https://github.com/lhcaps",
    location: "Ho Chi Minh City, Vietnam",
  },
}

export const education = {
  degree: {
    title: "B.Sc. Information Technology",
    institution: "HUFLIT - Ho Chi Minh City University of Foreign Languages and IT",
    period: "2023 - 2027",
    track: "Software Engineering",
    highlights: [
      "Software engineering track with emphasis on systems, data structures, and product delivery",
      "Portfolio work focuses on operational tooling, AI/CV workflows, and local runtime automation",
    ],
  },
  ielts: {
    score: 6.5,
    level: "B2",
    year: 2023,
    bands: [
      { label: "Listening", score: 7.0 },
      { label: "Reading", score: 6.5 },
      { label: "Writing", score: 5.5 },
      { label: "Speaking", score: 6.0 },
    ],
  },
}
