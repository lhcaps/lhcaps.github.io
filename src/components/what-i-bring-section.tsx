import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Layers, Database, Shield, Brain } from "lucide-react"
import { easeOutExpo } from "@/lib/animations"

const strengths = [
  {
    number: "01",
    title: "End-to-end thinking",
    description:
      "I break features into data model, API layer, UI workflow, and test cases so nothing slips through the cracks.",
    icon: Layers,
    color: "#3178C6",
    gradient: "from-blue-500/5 to-cyan-500/5",
  },
  {
    number: "02",
    title: "Backend ownership",
    description:
      "Comfortable owning domain logic, migrations, queues, caching, and the evidence to show it works.",
    icon: Database,
    color: "#10B981",
    gradient: "from-emerald-500/5 to-teal-500/5",
  },
  {
    number: "03",
    title: "Verification habits",
    description:
      "Type checks, smoke tests, E2E flows, and clear documentation so regressions are hard to hide.",
    icon: Shield,
    color: "#F59E0B",
    gradient: "from-amber-500/5 to-orange-500/5",
  },
  {
    number: "04",
    title: "AI/CV interest",
    description:
      "Hands-on with local RAG pipelines, vector retrieval, OpenCV/ONNX pipelines, and async inference patterns.",
    icon: Brain,
    color: "#8B5CF6",
    gradient: "from-violet-500/5 to-purple-500/5",
  },
]

function StrengthCard({
  strength,
  index,
}: {
  strength: (typeof strengths)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.85", "start 0.2"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.2], [index % 2 === 0 ? -40 : 40, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [30, 0])

  const Icon = strength.icon

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      style={{ opacity, x, y }}
    >
      <motion.div
        className={`relative p-6 md:p-8 rounded-2xl border border-border bg-gradient-to-br ${strength.gradient} backdrop-blur-sm overflow-hidden`}
        whileHover={{ y: -6, borderColor: `${strength.color}40`, boxShadow: `0 20px 40px ${strength.color}10` }}
        transition={{ duration: 0.3 }}
      >
        {/* Background number */}
        <motion.span
          className="absolute top-2 right-4 md:top-4 md:right-6 text-5xl md:text-6xl font-black select-none"
          style={{ color: `${strength.color}12` }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {strength.number}
        </motion.span>

        {/* Icon */}
        <motion.div
          className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6"
          style={{
            backgroundColor: `${strength.color}15`,
            border: `1px solid ${strength.color}25`,
          }}
          initial={{ scale: 0, rotate: -15 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: index * 0.1,
          }}
          whileHover={{ rotate: [0, -8, 8, 0] }}
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: strength.color }} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            className="text-lg md:text-xl font-bold mb-2 md:mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
          >
            {strength.title}
          </motion.h3>
          <motion.p
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          >
            {strength.description}
          </motion.p>
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 100%, ${strength.color}08, transparent 60%)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export function WhatIBringSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const numberOpacity = useTransform(scrollYProgress, [0.05, 0.12], [0, 1])
  const numberScale = useTransform(scrollYProgress, [0.05, 0.12], [0.8, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section
      id="what-i-bring"
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] md:text-[10vw] font-black text-primary/[0.03] select-none pointer-events-none leading-none"
        style={{ y: bgY }}
      >
        VALUE
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-3 md:gap-4 mb-10 md:mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo as unknown as string }}
        >
          <motion.span
            className="text-5xl md:text-6xl lg:text-7xl font-black text-primary/10 select-none"
            style={{ opacity: numberOpacity, scale: numberScale }}
          >
            05
          </motion.span>
          <div>
            <motion.h2
              className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              What I Bring
            </motion.h2>
            <motion.div
              className="h-px bg-primary/30 mt-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo as unknown as string }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>

        {/* Strengths grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {strengths.map((strength, index) => (
            <StrengthCard key={strength.number} strength={strength} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
