import "./index.css"
import { Navigation } from "./components/Navigation"
import { BackgroundCanvas } from "./components/BackgroundCanvas"
import {
  Hero3DSection,
  ProjectsSection,
  StackSection,
  AboutSection,
  EducationSection,
  ContactSection,
  Footer,
} from "./components/sections"

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
