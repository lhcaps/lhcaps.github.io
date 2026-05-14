import "./index.css"
import { Navigation } from "./components/Navigation"
import { BackgroundCanvas } from "./components/BackgroundCanvas"
import { Hero3DSection } from "./components/sections/Hero3DSection"
import { ProjectsSection } from "./components/sections/ProjectsSection"
import { StackSection } from "./components/sections/StackSection"
import { AboutSection } from "./components/sections/AboutSection"
import { EducationSection } from "./components/sections/EducationSection"
import { ContactSection, Footer } from "./components/sections/ContactSection"

function App() {
  return (
    <>
      <BackgroundCanvas />
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero3DSection />
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