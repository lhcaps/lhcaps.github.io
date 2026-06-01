import { useState, useCallback } from "react"
import { type SystemId, defaultScene } from "@/data/runtimeConfig"

export function useActiveSystem(): {
  activeSystem: SystemId
  setActiveSystem: (id: SystemId) => void
} {
  const [activeSystem, setActiveSystemState] = useState<SystemId>(defaultScene)

  const setActiveSystem = useCallback((id: SystemId) => {
    setActiveSystemState(id)
  }, [])

  return { activeSystem, setActiveSystem }
}
