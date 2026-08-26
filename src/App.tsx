import { useEffect, useState } from "react"
import { AtlasSection } from "@/components/atlas/AtlasSection"
import { Navigation } from "@/components/navigation"
import { AdaptationSection } from "@/components/sections/AdaptationSection"
import { AiEngineeringSection } from "@/components/sections/AiEngineeringSection"
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { EvidenceBoundarySection } from "@/components/sections/EvidenceBoundarySection"
import { OpeningSection } from "@/components/sections/OpeningSection"
import { SystemNarratives } from "@/components/sections/SystemNarratives"
import { VerificationSection } from "@/components/sections/VerificationSection"
import { SYSTEM_IDS, type SystemId } from "@/content/types"
import { portfolio } from "@/content/portfolio"
import { assertValidPortfolio } from "@/content/validate"

assertValidPortfolio(portfolio)

export default function App() {
  const [selectedSystemId, setSelectedSystemId] = useState<SystemId>(SYSTEM_IDS[0])

  useEffect(() => {
    let cancelled = false
    const scrollToCurrentHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return
      requestAnimationFrame(() => {
        if (!cancelled) {
          document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior })
        }
      })
    }

    scrollToCurrentHash()
    if (document.fonts) void document.fonts.ready.then(scrollToCurrentHash)
    window.addEventListener("hashchange", scrollToCurrentHash)
    return () => {
      cancelled = true
      window.removeEventListener("hashchange", scrollToCurrentHash)
    }
  }, [])

  return (
    <>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <OpeningSection />
        <AtlasSection selectedSystemId={selectedSystemId} onSelect={setSelectedSystemId} />
        <SystemNarratives onCompare={setSelectedSystemId} />
        <AdaptationSection />
        <AiEngineeringSection />
        <VerificationSection />
        <EvidenceBoundarySection />
        <CapabilitiesSection />
        <ContactSection />
      </main>
    </>
  )
}
