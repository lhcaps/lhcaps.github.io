import { useEffect, useState } from "react"

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return undefined
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (event: MediaQueryListEvent) => setPrefersReduced(event.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return prefersReduced
}
