import { portfolio } from "@/content/portfolio"
import { SYSTEM_IDS } from "@/content/types"

/**
 * Scene-facing compatibility adapter required by the repository contract.
 * It holds references to the authoritative public graph and duplicates no
 * topology, copy, route, or coordinate data.
 */
export const runtimeConfig = {
  defaultSystemId: SYSTEM_IDS[0],
  systems: portfolio.systems,
} as const

export type RuntimeSystem = (typeof runtimeConfig.systems)[number]
