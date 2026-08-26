import { useEffect, useState } from "react"

export function useViewportWidth(): number {
  const [width, setWidth] = useState(() => (typeof window === "undefined" ? 0 : window.innerWidth))

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return width
}
