import { useEffect, useRef, useState, ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "left" | "right" | "scale" | "clip" | "line"
  className?: string
  trigger?: "once" | "repeat"
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
      className={`reveal-base ${directionClass} ${visible ? "reveal-base-visible" : ""} ${className}`.trim()}
      style={visible ? style : { opacity: 0, ...style }}
    >
      {children}
    </Tag>
  )
}

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
      style={visible ? ({ "--stagger-delay": `${staggerDelay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
