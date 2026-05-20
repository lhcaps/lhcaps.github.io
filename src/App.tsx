import "./index.css"
import { Navigation } from "./components/navigation"
import { BackgroundCanvas } from "./components/BackgroundCanvas"
import { CoreHeroSection } from "./components/sections/CoreHeroSection"
import { ProjectsSection } from "./components/sections/ProjectsSection"
import { StackSection } from "./components/sections/StackSection"
import { AboutSection } from "./components/sections/AboutSection"
import { EducationSection } from "./components/sections/EducationSection"
import { ContactSection, Footer } from "./components/sections/ContactSection"

function App() {
  return (
    <>
      <BackgroundCanvas />
      <div className="min-h-[100dvh]">
        <Navigation />
        <main>
          <CoreHeroSection />
          <ProjectsSection />
          <StackSection />
          <AboutSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
