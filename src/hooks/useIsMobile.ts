import { useEffect, useState } from "react"

const TABLET_BREAKPOINT = 768
const MOBILE_BREAKPOINT = 480

export type DeviceClass = "mobile" | "tablet" | "desktop"

export function useIsMobile(): DeviceClass {
  const [device, setDevice] = useState<DeviceClass>(() => {
    if (typeof window === "undefined") return "desktop"
    return getDeviceClass(window.innerWidth)
  })

  useEffect(() => {
    let raf = 0
    const update = () => {
      setDevice(getDeviceClass(window.innerWidth))
    }
    const handleResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    window.addEventListener("resize", handleResize, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return device
}

function getDeviceClass(width: number): DeviceClass {
  if (width < MOBILE_BREAKPOINT) return "mobile"
  if (width < TABLET_BREAKPOINT) return "tablet"
  return "desktop"
}
