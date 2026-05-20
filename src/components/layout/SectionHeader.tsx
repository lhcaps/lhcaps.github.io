import { Reveal } from "@/lib/reveal"

interface SectionHeaderProps {
  number: string
  label: string
  title?: string
  intro?: string
}

export function SectionHeader({ number, label, title, intro }: SectionHeaderProps) {
  return (
    <Reveal direction="left" className="mb-10 md:mb-14">
      <div className="flex items-center gap-4">
        <span className="mono-label" style={{ color: "var(--accent)" }}>
          {number}
        </span>
        <div className="h-px w-12 hairline" />
        <p className="mono-label" style={{ color: "var(--dim)" }}>
          {label}
        </p>
      </div>
      {title && (
        <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-[1.02] text-balance md:text-5xl" style={{ color: "var(--fg)" }}>
          {title}
        </h2>
      )}
      {intro && (
        <p className="mt-4 max-w-2xl text-sm leading-7 md:text-base" style={{ color: "var(--muted)" }}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
