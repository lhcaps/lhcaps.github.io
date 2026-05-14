import { Reveal } from "@/lib/reveal"

interface SectionHeaderProps {
  number: string
  label: string
}

export function SectionHeader({ number, label }: SectionHeaderProps) {
  return (
    <Reveal direction="left" className="flex items-center gap-4 mb-12 md:mb-16">
      <span className="text-5xl md:text-6xl lg:text-7xl font-black select-none leading-none pb-2 section-num">
        {number}
      </span>
      <div>
        <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-[--muted-fg]">
          {label}
        </p>
        <div className="accent-line mt-3" />
      </div>
    </Reveal>
  )
}
