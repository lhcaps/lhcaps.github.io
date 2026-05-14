import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CoreHaloCanvas } from '@/components/hero/CoreHaloCanvas'
import { SatelliteSystem } from '@/components/hero/SatelliteSystem'
import { Button } from '@/components/ui'
import { Github, Mail, ArrowDown } from 'lucide-react'
import { profile } from '@/data/profile'

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function CoreHeroSection() {
  const [mounted, setMounted] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => {
      clearTimeout(t)
      mq.removeEventListener('change', handler)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* CoreHalo — local to the core composition, not full-screen */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <CoreHaloCanvas className="w-full h-full" />
      </div>

      {/* Ambient center glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 55% at 50% 48%, rgba(103,232,249,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={mounted ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-4 sm:mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              color: 'hsl(var(--muted-fg))',
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#4ADE80' }}
              animate={prefersReduced ? {} : { scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {profile.availability.text}
          </span>
        </motion.div>

        {/*
          CORE COMPOSITION WRAPPER
          One unified coordinate system: h1 absolute center, halo behind,
          satellites inset-0, all sharing the same origin.
        */}
        <div className="flex flex-col items-center">
          <div
            className="relative mx-auto w-full max-w-[900px] sm:max-w-[700px]"
            style={{ height: 340 }}
          >
            {/* CoreHaloCanvas — anchored to center of this wrapper */}
            <div
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                width: 420,
                height: 280,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CoreHaloCanvas className="w-full h-full" />
            </div>

            {/* SatelliteSystem — absolute inset-0, orbits around center */}
            <div className="absolute inset-0">
              <SatelliteSystem reduced={prefersReduced} />
            </div>

            {/* h1 — the actual core, absolute centered */}
            <motion.h1
              className="absolute left-1/2 top-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-none text-center"
              style={{
                fontFamily: 'var(--font-heading)',
                transform: 'translate(-50%, -50%)',
                textShadow: '0 0 40px rgba(103,232,249,0.12), 0 0 80px rgba(103,232,249,0.06)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.3, ease: easeOutExpo }}
            >
              {profile.name}
            </motion.h1>
          </div>

          {/* Role — below core composition */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: prefersReduced ? 0.1 : 0.9 }}
            className="mb-2 sm:mb-4"
          >
            <span
              className="text-sm sm:text-base md:text-lg font-light tracking-[0.2em] uppercase"
              style={{ color: 'hsl(var(--primary))', opacity: 0.85 }}
            >
              {profile.role}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-sm sm:text-base md:text-lg max-w-md mx-auto text-center mb-6 sm:mb-10 px-4 leading-relaxed"
            style={{ color: 'hsl(var(--muted-fg))' }}
            initial={{ opacity: 0, y: 12 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: prefersReduced ? 0.1 : 1.0 }}
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 justify-center items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: prefersReduced ? 0.1 : 1.1 }}
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
            style={{ color: 'hsl(var(--muted-fg))', opacity: 0.25 }}
          >
            Scroll
          </span>
          <div
            className="relative w-[22px] h-[34px] rounded-full flex justify-center pt-2"
            style={{ border: '1px solid rgba(139, 149, 167, 0.12)' }}
          >
            <motion.div
              className="w-1.5 h-2.5 rounded-full"
              style={{ background: 'hsl(var(--primary))' }}
              animate={prefersReduced ? {} : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
