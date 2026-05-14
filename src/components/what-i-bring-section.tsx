import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Layers, Database, Shield, Brain } from "lucide-react"
import { Reveal } from "@/lib/reveal"

const strengths = [
  { number: "01", title: "End-to-end thinking", description: "I break features into data model, API layer, UI workflow, and test cases so nothing slips through the cracks.", icon: Layers, color: "#60A5FA" },
  { number: "02", title: "Backend ownership", description: "Comfortable owning domain logic, migrations, queues, caching, and the evidence to show it works.", icon: Database, color: "#4ADE80" },
  { number: "03", title: "Verification habits", description: "Type checks, smoke tests, E2E flows, and clear documentation so regressions are hard to hide.", icon: Shield, color: "#FB923C" },
  { number: "04", title: "AI/CV interest", description: "Hands-on with local RAG pipelines, vector retrieval, OpenCV/ONNX pipelines, and async inference patterns.", icon: Brain, color: "#A78BFA" },
]

function StrengthCard({ strength, index }: { strength: (typeof strengths)[0]; index: number }) {
  return (
        <Reveal direction="up" delay={index * 0.1}>
      <motion.div
        className="relative p-5 md:p-6 rounded-2xl glass-card"
        style={{ borderColor: "hsl(var(--border))" }}
        whileHover={{ borderColor: `${strength.color}30` }}
      >
        {/* Large background number */}
        <span
          className="absolute top-2 right-4 md:top-4 md:right-6 text-5xl md:text-6xl font-black select-none pointer-events-none leading-none"
          style={{ color: `${strength.color}0C` }}
        >
          {strength.number}
        </span>

        {/* Icon */}
        <motion.div
          className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-4 md:mb-5"
          style={{ background: `${strength.color}10`, border: `1px solid ${strength.color}25` }}
          initial={{ scale: 0, rotate: -15 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: index * 0.08 }}
          whileHover={{ rotate: [0, -8, 8, 0] }}
        >
          <strength.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: strength.color }} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2" style={{ color: strength.color }}>
            {strength.title}
          </h3>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: "hsl(var(--muted-fg))" }}>
            {strength.description}
          </p>
        </div>
      </motion.div>
    </Reveal>
  )
}

export function WhatIBringSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section id="what-i-bring" ref={sectionRef} className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] md:text-[10vw] font-black select-none pointer-events-none leading-none section-num"
        style={{ y: bgY }}
      >
        VALUE
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        <Reveal direction="left" className="flex items-center gap-4 mb-8 md:mb-10">
          <span className="text-5xl md:text-6xl lg:text-7xl font-black select-none leading-none pb-2 section-num">
            05
          </span>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "hsl(var(--muted-fg))" }}>
              What I Bring
            </h2>
            <div className="accent-line mt-3" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {strengths.map((strength, index) => (
            <StrengthCard key={strength.number} strength={strength} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
