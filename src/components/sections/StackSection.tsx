import { useRef } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/Container"
import { SectionHeader } from "@/components/layout/SectionHeader"
import { skillLayers, type SkillLayer } from "@/data/skills"
import { TechPill } from "@/components/ui/TechPill"

function LayerCard({ layer, index }: { layer: SkillLayer; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div
        className="relative rounded-2xl p-6 md:p-7"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
          border: `1px solid ${layer.color}18`,
          boxShadow: `inset 0 1px 0 ${layer.color}10`,
        }}
      >
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-b-full"
          style={{ background: `linear-gradient(90deg, transparent, ${layer.color}60, transparent)` }}
        />
        <div className="flex items-start gap-5">
          <div
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-lg md:text-xl font-bold font-mono"
            style={{ background: `${layer.color}10`, border: `1px solid ${layer.color}25`, color: layer.color }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold mb-1" style={{ color: layer.color }}>
              {layer.label}
            </h3>
            <p className="text-xs mb-4" style={{ color: "hsl(var(--muted-fg))", opacity: 0.6 }}>
              {layer.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {layer.skills.map((skill) => (
                <TechPill key={skill} label={skill} color={layer.color} />
              ))}
            </div>
          </div>
        </div>
        <div
          className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(180deg, transparent, ${layer.color}80, transparent)` }}
        />
      </div>
    </motion.div>
  )
}

export function StackSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section id="stack" ref={sectionRef} className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black select-none pointer-events-none leading-none section-num"
        style={{ opacity: 0.03 }}
      >
        STACK
      </div>
      <Container>
        <SectionHeader number="02" label="System Stack" />
        <div className="space-y-4 max-w-3xl">
          {skillLayers.map((layer: SkillLayer, index: number) => (
            <LayerCard key={layer.id} layer={layer} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}