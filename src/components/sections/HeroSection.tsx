import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Download, Github, Mail } from "lucide-react"
import { LazyRuntimeScene } from "@/components/scene"
import { systemScenes, type SystemId } from "@/data/runtimeConfig"
import { profile } from "@/data/profile"
import { useReducedMotion } from "@/hooks"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [activeSystem, setActiveSystem] = useState<SystemId>("core")
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 50)
    return () => window.clearTimeout(id)
  }, [])

  const handleSystemChange = useCallback((id: SystemId) => {
    setActiveSystem(id)
  }, [])

  const currentScene = systemScenes[activeSystem]

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left: Text */}
        <div className="flex flex-col justify-center px-6 pt-28 pb-12 lg:w-[46%] lg:px-10 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="status-dot mb-6 inline-flex items-center gap-2">
              <span className="status-marker" aria-hidden="true" />
              <span className="mono-label" style={{ color: "var(--muted)" }}>
                {profile.availability.text}
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl font-bold leading-[1.05] sm:text-4xl md:text-5xl lg:text-[2.7rem]"
            style={{ color: "var(--fg)", fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.hero.headline}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-lg text-sm leading-7 md:text-base"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {profile.hero.sub}
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <a href="#systems" className="action-link focus-ring inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
              View Systems
              <ArrowDown className="h-4 w-4" />
            </a>
            <a href="/Le_Huy_CV.pdf" className="action-link focus-ring inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
              <Download className="h-4 w-4" />
              Download CV
            </a>
            <a href={profile.contact.github} target="_blank" rel="noopener noreferrer" className="action-link focus-ring inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a href={`mailto:${profile.contact.email}`} className="action-link focus-ring inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold">
              <Mail className="h-4 w-4" />
              Email
            </a>
          </motion.div>
        </div>

        {/* Right: 3D Scene */}
        <div className="relative flex flex-1 items-center justify-center px-4 pb-8 lg:px-8 lg:pb-12">
          <div className="w-full max-w-[680px]">
            <div className="runtime-scene">
              <LazyRuntimeScene
                scene={currentScene}
                reducedMotion={reducedMotion}
              />
            </div>

            {/* Scene switcher */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {(["core", "parkly", "visionflow", "tft"] as SystemId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => handleSystemChange(id)}
                  className="scene-switch-btn focus-ring"
                  data-active={activeSystem === id}
                  type="button"
                >
                  {id === "core" ? "Runtime Core" : systemScenes[id].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div className="flex justify-center pb-6 lg:hidden">
        <a href="#systems" className="focus-ring flex items-center gap-3 rounded-full px-3 py-2" style={{ color: "var(--dim)" }}>
          <span className="mono-label" style={{ color: "var(--accent)" }}>01</span>
          <span className="h-px w-8 hairline" />
          <span className="mono-label">Systems</span>
        </a>
      </div>
    </section>
  )
}
