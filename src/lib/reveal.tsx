import { useEffect, useRef, useState, ReactNode } from "react"

/* ================================================================
   REVEAL — CSS-driven scroll animation system
   
   Philosophy (from emil-motion-design + pixelpoint.io):
   - Use transform/opacity exclusively for 60fps animations
   - CSS @keyframes for entrance animations (GPU-accelerated)
   - Intersection Observer for scroll triggers (no scroll listener overhead)
   - Hardware acceleration via will-change
   - prefers-reduced-motion support
   ================================================================ */

interface RevealProps {
  children: ReactNode
  /** CSS animation delay in seconds */
  delay?: number
  /** CSS animation duration in seconds */
  duration?: number
  /** 'up' | 'left' | 'right' | 'scale' | 'clip' | 'line' */
  direction?: "up" | "left" | "right" | "scale" | "clip" | "line"
  /** Animation class override */
  className?: string
  /** 'once' | 'repeat' */
  trigger?: "once" | "repeat"
  /** Viewport margin */
  margin?: string
  as?: string
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  className = "",
  trigger = "once",
  margin = "-80px",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (trigger === "once") observer.unobserve(el)
        } else if (trigger === "repeat") {
          setVisible(false)
        }
      },
      { rootMargin: margin, threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [trigger, margin])

  const style = {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    willChange: "transform, opacity",
  }

  const baseClass = "reveal-base"
  const visibleClass = visible ? "reveal-base-visible" : ""

  const directionClass = {
    up: "reveal-dir-up",
    left: "reveal-dir-left",
    right: "reveal-dir-right",
    scale: "reveal-dir-scale",
    clip: "reveal-dir-clip",
    line: "reveal-dir-line",
  }[direction]

  return (
    // @ts-expect-error - dynamic tag
    <Tag
      ref={ref}
      className={`${baseClass} ${directionClass} ${visibleClass} ${className}`.trim()}
      style={visible ? style : { opacity: 0, ...style }}
    >
      {children}
    </Tag>
  )
}

/* ================================================================
   STAGGER REVEAL — Orchestrated children animations
   ================================================================ */

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  viewportMargin?: string
}

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.08,
  viewportMargin = "-60px",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: viewportMargin, threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [viewportMargin])

  return (
    <div
      ref={ref}
      className={`reveal-stagger ${visible ? "reveal-stagger-visible" : ""} ${className}`.trim()}
      style={visible ? { "--stagger-delay": `${staggerDelay}s` } as React.CSSProperties : undefined}
    >
      {children}
    </div>
  )
}

/* ================================================================
   CLIP REVEAL — Full clip-path wipe animation
   ================================================================ */

interface ClipRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "left" | "right" | "up" | "down"
  className?: string
  margin?: string
}

export function ClipReveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = "left",
  className = "",
  margin = "-60px",
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { rootMargin: margin, threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [margin])

  const clipClass = {
    left: "reveal-clip-left",
    right: "reveal-clip-right",
    up: "reveal-clip-up",
    down: "reveal-clip-down",
  }[direction]

  return (
    <div
      ref={ref}
      className={`reveal-clip-wrap ${clipClass} ${visible ? "reveal-clip-wrap-visible" : ""} ${className}`.trim()}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  )
}
