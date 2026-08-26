import type { ClaimInstance, PublicClaim } from "@/content/types"

export type ClaimIndex = ReadonlyMap<string, PublicClaim>

export type MaterializedClaim = PublicClaim & {
  claimInstanceId: string
}

export function createClaimIndex(claims: readonly PublicClaim[]): ClaimIndex {
  const index = new Map<string, PublicClaim>()

  for (const claim of claims) {
    if (index.has(claim.evidenceKey)) {
      throw new Error("CLAIM_KEY_DUPLICATE")
    }

    index.set(claim.evidenceKey, claim)
  }

  return index
}

export function claimForInstance(instance: ClaimInstance, index: ClaimIndex): MaterializedClaim {
  const claim = index.get(instance.evidenceKey)

  if (!claim) {
    throw new Error("CLAIM_REFERENCE_UNKNOWN")
  }

  return {
    claimInstanceId: instance.claimInstanceId,
    ...claim,
  }
}
