export function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: "var(--bg)" }} />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--accent-3) 20%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--accent-3) 20%, transparent) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[62vh]"
        style={{
          background:
            "linear-gradient(128deg, color-mix(in oklch, var(--accent) 13%, transparent) 0%, transparent 34%), linear-gradient(238deg, color-mix(in oklch, var(--accent-2) 10%, transparent) 0%, transparent 36%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 0 48%, color-mix(in oklch, var(--fg) 16%, transparent) 49%, transparent 50% 100%)",
          backgroundSize: "18px 18px",
        }}
      />
    </div>
  )
}
