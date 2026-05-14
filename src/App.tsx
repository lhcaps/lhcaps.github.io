import "./index.css"
import { Navigation } from "./components/navigation"
import { HeroSection } from "./components/hero-section"
import { MarqueeSection } from "./components/marquee-section"
import { ProfileSection } from "./components/profile-section"
import { SkillsSection } from "./components/skills-section"
import { EducationSection } from "./components/education-section"
import { ProjectsSection } from "./components/projects-section"
import { WhatIBringSection } from "./components/what-i-bring-section"
import { ContactSection, Footer } from "./components/contact-section"
import { GlobalBackground } from "./components/global-background"

function App() {
  return (
    <GlobalBackground>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <MarqueeSection />
          <ProfileSection />
          <SkillsSection />
          <EducationSection />
          <ProjectsSection />
          <WhatIBringSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </GlobalBackground>
  )
}

export default App
