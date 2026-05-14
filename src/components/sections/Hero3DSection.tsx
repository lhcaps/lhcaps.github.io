import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { SceneCanvas } from "@/components/three"
import { Button } from "@/components/ui"
import { Github, Mail, ArrowDown } from "lucide-react"
import { profile } from "@/data/profile"

const easeOutExpo = [0.16, 1, 0.3, 1]

export function Hero3DSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Soft center glow — no duplicate grid, BackgroundCanvas handles the global grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 50%, rgba(103, 232, 249, 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-16 md:py-24 lg:py-0">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  color: "hsl(var(--muted-fg))",
                }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#4ADE80" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {profile.availability.text}
              </span>
            </motion.div>

            {/* Name */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter leading-none"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ opacity: 0, y: 40 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.5, ease: easeOutExpo as unknown as number[] }}
              >
                <span className="text-foreground">{profile.name}</span>
              </motion.h1>
            </div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mb-5"
            >
              <span
                className="text-sm sm:text-base md:text-lg font-light tracking-[0.2em] uppercase"
                style={{ color: "hsl(var(--primary))", opacity: 0.85 }}
              >
                {profile.role}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed px-2"
              style={{ color: "hsl(var(--muted-fg))" }}
              initial={{ opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.25 }}
            >
              <Button href="#projects" variant="primary" size="md">
                View Systems
                <ArrowDown className="w-4 h-4" />
              </Button>

              <Button href={profile.contact.github} variant="secondary" size="md" external>
                <Github className="w-4 h-4" />
                GitHub
              </Button>

              <Button href={`mailto:${profile.contact.email}`} variant="secondary" size="md">
                <Mail className="w-4 h-4" />
                Contact
              </Button>
            </motion.div>
          </div>

          {/* Right: 3D Canvas — enlarged desktop, mobile-safe */}
          <div className="flex-1 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.4, ease: easeOutExpo as unknown as number[] }}
              className="w-full aspect-square max-w-[340px] sm:max-w-[420px] lg:max-w-[560px] xl:max-w-[620px] mx-auto"
            >
              <SceneCanvas className="w-full h-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2.0 }}
      >
        <div className="flex flex-col items-center gap-3">
          <span
            className="text-[9px] font-medium tracking-[0.25em] uppercase"
            style={{ color: "hsl(var(--muted-fg))", opacity: 0.25 }}
          >
            Scroll
          </span>
          <div
            className="relative w-[22px] h-[34px] rounded-full flex justify-center pt-2"
            style={{ border: "1px solid rgba(139, 149, 167, 0.12)" }}
          >
            <motion.div
              className="w-1.5 h-2.5 rounded-full"
              style={{ background: "hsl(var(--primary))" }}
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
