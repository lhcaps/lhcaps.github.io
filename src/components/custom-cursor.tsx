import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [hoverState, setHoverState] = useState<"default" | "hover" | "click">("default")
  const [isVisible, setIsVisible] = useState(false)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const springX = useSpring(dotX, { stiffness: 500, damping: 40, mass: 0.3 })
  const springY = useSpring(dotY, { stiffness: 500, damping: 40, mass: 0.3 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      setHoverState(isInteractive ? "hover" : "default")
    }

    const handleMouseDown = () => setHoverState("click")
    const handleMouseUp = () => setHoverState("default")
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })
    window.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("mouseup", handleMouseUp, { passive: true })
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    document.documentElement.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [dotX, dotY, isVisible])

  const size = hoverState === "click" ? 6 : hoverState === "hover" ? 10 : 8
  const opacity = isVisible ? 1 : 0

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, opacity }}
        transition={{ width: { type: "spring", stiffness: 400, damping: 30 }, height: { type: "spring", stiffness: 400, damping: 30 }, opacity: { duration: 0.15 } }}
        layout
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: hoverState === "hover" ? "hsl(var(--accent))" : "hsl(var(--primary))",
            boxShadow: `0 0 ${hoverState === "hover" ? 12 : 8}px ${hoverState === "hover" ? "hsl(var(--accent) / 0.8)" : "hsl(var(--primary) / 0.8)"}`,
          }}
        />
      </motion.div>
    </div>
  )
}
