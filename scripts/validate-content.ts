import { portfolio } from "../src/content/portfolio"
import { assertValidPortfolio } from "../src/content/validate"

assertValidPortfolio(portfolio)

const claimKeys = new Set(portfolio.claims.map((claim) => claim.evidenceKey))
const claimInstanceIds = new Set(portfolio.claimInstances.map((instance) => instance.claimInstanceId))

if (portfolio.systems.length !== 5) throw new Error("CONTENT_SYSTEM_COUNT_INVALID")
if (claimKeys.size !== portfolio.claims.length) throw new Error("CONTENT_CLAIM_KEY_DUPLICATE")
if (claimInstanceIds.size !== portfolio.claimInstances.length) throw new Error("CONTENT_CLAIM_INSTANCE_DUPLICATE")
if (portfolio.harness.length !== 9) throw new Error("CONTENT_HARNESS_COUNT_INVALID")
if (portfolio.opening.primaryAction !== "Work with me") throw new Error("CONTENT_PRIMARY_ACTION_INVALID")

console.log(`Content verified: ${portfolio.systems.length} systems, ${portfolio.claims.length} claims, ${portfolio.claimInstances.length} claim instances, ${portfolio.harness.length} harness categories.`)
