import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { navItems } from "@/data/navigation"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      const sectionIds = navItems.map((item) => item.href.replace("#", ""))
      const pageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const maxScroll = pageHeight - window.innerHeight
      const scrollTop = window.scrollY

      setIsScrolled(window.scrollY > 32)
      setScrollProgress(maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0)

      if (maxScroll > 0 && scrollTop >= maxScroll - 6) {
        const lastSection = sectionIds[sectionIds.length - 1]
        if (lastSection) setActiveSection(lastSection)
        return
      }

      const anchor = Math.min(window.innerHeight * 0.42, 360)
      const candidates = sectionIds.flatMap((section) => {
        const element = document.getElementById(section)
        if (!element) return []
        const rect = element.getBoundingClientRect()
        const visible = rect.bottom >= 96 && rect.top <= window.innerHeight * 0.76
        if (!visible) return []
        return [{ id: section, distance: Math.abs(rect.top - anchor) }]
      })
      const current = candidates.sort((a, b) => a.distance - b.distance)[0]

      if (current) setActiveSection(current.id)
    }

    const handleScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <>
      <div className="fixed left-0 top-0 z-[70] h-[2px] w-full" aria-hidden="true">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: scrollProgress,
            background: "var(--accent)",
          }}
        />
      </div>

      <motion.header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled ? "py-3" : "py-5"
        )}
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={cn(
            "mx-auto flex w-[min(1180px,calc(100%_-_24px))] items-center justify-between rounded-full border px-3 py-2 transition-colors md:px-4",
            isScrolled
              ? "border-[var(--line)] bg-[color-mix(in_oklch,var(--bg-soft)_88%,transparent)] shadow-[0_18px_60px_oklch(6%_0.02_250/0.28)] backdrop-blur-md"
              : "border-transparent bg-transparent"
          )}
        >
          <a
            href="#"
            className="focus-ring flex items-center gap-3 rounded-full px-2 py-1"
            onClick={(event) => {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-full border font-mono text-xs font-bold"
              style={{
                borderColor: "var(--line-strong)",
                background: "color-mix(in oklch, var(--surface) 74%, transparent)",
                color: "var(--accent)",
              }}
            >
              LH
            </span>
            <span className="hidden text-sm font-semibold tracking-normal sm:block">Le Huy</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "")
              const isActive = activeSection === sectionId

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "focus-ring relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      className="absolute inset-x-3 bottom-1 h-px"
                      layoutId="activeNavLine"
                      style={{ background: "var(--accent)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          <a
            href="#contact"
            className="action-link focus-ring hidden px-4 py-2 text-sm font-semibold md:inline-flex"
          >
            Get in touch
          </a>

          <button
            className="focus-ring grid h-10 w-10 place-items-center rounded-full border md:hidden"
            style={{ borderColor: "var(--line)", background: "color-mix(in oklch, var(--surface) 72%, transparent)" }}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            type="button"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute inset-0 cursor-default bg-[color-mix(in_oklch,var(--bg)_92%,transparent)] backdrop-blur-md"
              aria-label="Close navigation backdrop"
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="absolute left-4 right-4 top-24 rounded-3xl border p-3"
              style={{
                borderColor: "var(--line)",
                background: "color-mix(in oklch, var(--bg-soft) 94%, transparent)",
              }}
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="focus-ring block rounded-2xl px-4 py-3 text-base font-semibold text-[var(--fg)]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="action-link focus-ring mt-2 flex w-full justify-center px-4 py-3 text-sm font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get in touch
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
