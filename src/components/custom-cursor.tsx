import { useEffect, useRef } from "react"
import { motion, useMotionValue } from "framer-motion"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  useEffect(() => {
    let isHovering = false

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        isHovering = true
        if (cursorRef.current) {
          cursorRef.current.style.width = "40px"
          cursorRef.current.style.height = "40px"
          cursorRef.current.style.borderColor = "hsl(var(--primary))"
        }
      } else if (isHovering) {
        isHovering = false
        if (cursorRef.current) {
          cursorRef.current.style.width = "16px"
          cursorRef.current.style.height = "16px"
          cursorRef.current.style.borderColor = "hsl(var(--primary) / 0.5)"
        }
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0"
      if (dotRef.current) dotRef.current.style.opacity = "0"
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1"
      if (dotRef.current) dotRef.current.style.opacity = "1"
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    document.documentElement.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
        <motion.div
          ref={cursorRef}
          className="absolute w-4 h-4 rounded-full border border-primary/50 bg-primary/10"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            transition: "width 0.2s, height 0.2s, border-color 0.2s",
            opacity: 0,
          }}
        />
        <motion.div
          ref={dotRef}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: 0,
          }}
        />
      </div>
    </>
  )
}
