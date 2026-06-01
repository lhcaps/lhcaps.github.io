import "./index.css"
import { HeroSection } from "./components/sections/HeroSection"
import { SystemsSection } from "./components/sections/SystemsSection"
import { StackSection } from "./components/sections/StackSection"
import { ContactSection, Footer } from "./components/sections/ContactSection"
import { Navigation } from "./components/Navigation"

function App() {
  return (
    <>
      <div className="min-h-[100dvh]">
        <Navigation />
        <main>
          <HeroSection />
          <SystemsSection />
          <StackSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
