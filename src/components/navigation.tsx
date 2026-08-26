import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react"
import { useViewportWidth } from "@/hooks/useViewportWidth"

const links = [
  { label: "Opening", href: "#opening" },
  { label: "Atlas", href: "#atlas" },
  { label: "Systems", href: "#systems" },
  { label: "Method", href: "#ai-engineering" },
  { label: "Evidence", href: "#evidence-boundary" },
  { label: "Contact", href: "#contact" },
] as const

export function Navigation() {
  const width = useViewportWidth()
  const mobile = width < 768
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) close(true)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [close, open])

  useEffect(() => {
    if (!open) return undefined

    const main = document.querySelector("main")
    const previousOverflow = document.body.style.overflow
    main?.setAttribute("inert", "")
    document.body.style.overflow = "hidden"
    sheetRef.current?.querySelector<HTMLAnchorElement>("a")?.focus()

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close(true)
    }
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
      main?.removeAttribute("inert")
      document.body.style.overflow = previousOverflow
    }
  }, [close, open])

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return
    const focusable = Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [])
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const dismissBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) close(true)
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <div className="page-shell site-header__inner">
          <a className="brand" href="#opening" aria-label="Le Huy Systems Atlas">
            <span>LH</span>
            <strong>SYSTEMS ATLAS</strong>
          </a>

          {mobile ? (
            <button
              aria-controls="mobile-navigation"
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
              className="menu-trigger"
              onClick={() => setOpen((current) => !current)}
              ref={triggerRef}
              type="button"
            >
              <span aria-hidden="true">{open ? "×" : "≡"}</span>
            </button>
          ) : (
            <nav aria-label="Primary" className="desktop-navigation">
              {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
            </nav>
          )}
        </div>

        {mobile && open && (
          <div className="mobile-navigation-backdrop" onMouseDown={dismissBackdrop}>
            <div className="mobile-navigation-sheet" id="mobile-navigation" onKeyDown={trapFocus} ref={sheetRef}>
              <div className="mobile-navigation-sheet__register"><span>PAGE INDEX</span><span>01–09</span></div>
              <nav aria-label="Mobile">
                {links.map((link, index) => (
                  <a href={link.href} key={link.href} onClick={() => close(false)}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
