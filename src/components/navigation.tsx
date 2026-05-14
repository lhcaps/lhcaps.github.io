"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { easeOutExpo } from "@/lib/animations"

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "What I Bring", href: "#what-i-bring" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.replace("#", ""))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[100] origin-left"
        style={{
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(195, 100%, 65%), hsl(var(--accent)))",
          scaleX: progressWidth,
          boxShadow: "0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--primary) / 0.3)",
        }}
      />

      {/* Navigation */}
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-2.5 glass-medium border-b border-border/40"
            : "py-4 bg-transparent"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOutExpo as unknown as string, delay: 1.5 }}
      >
        <nav className="max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold tracking-tight relative"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text font-heading">Louwis</span>
            {/* Decorative dot */}
            <motion.span
              className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full"
              style={{ background: "hsl(var(--primary))" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "")
              const isActive = activeSection === sectionId

              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground/80"
                  )}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.8 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-lg"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))",
                        border: "1px solid hsl(var(--primary) / 0.2)",
                      }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* CTA button */}
          <motion.a
            href="#contact"
            className="hidden md:flex items-center gap-1.5 liquid-glass rounded-full px-4 py-2 text-sm font-semibold text-foreground nav-cta transition-shadow duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 2.0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "hsl(120, 80%, 60%)" }} />
            Let's Talk
          </motion.a>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-lg glass-subtle transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              className="absolute top-20 left-0 right-0 p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: easeOutExpo as unknown as string }}
            >
              <div className="glass-medium rounded-2xl p-2 space-y-0.5">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-xl transition-colors",
                      activeSection === item.href.replace("#", "")
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="pt-2 px-2">
                  <motion.a
                    href="#contact"
                    className="flex items-center justify-center gap-2 liquid-glass-strong rounded-xl py-3 text-sm font-semibold text-foreground nav-cta-mobile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: "hsl(120, 80%, 60%)" }} />
                    Let's Talk
                  </motion.a>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
