import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Reveal } from "@/lib/reveal"

const profilePoints = [
  "Software Engineering student with a backend-leaning full-stack development background.",
  "I enjoy building practical systems that hold up under real use — structured data layers, well-typed API contracts, reproducible local environments, and scripts that verify things work.",
  "My sweet spot sits at the intersection of Node.js/FastAPI APIs, React dashboards, SQL pipelines, and AI/CV experiments.",
  "I care about code that reads well, boundaries that make sense, and features you can actually prove work.",
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const lineVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
const availVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export function ProfileSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const numOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
  const numY = useTransform(scrollYProgress, [0.05, 0.15], [20, 0])

  return (
    <section id="profile" ref={sectionRef} className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <Reveal direction="left" className="flex items-center gap-4 mb-12 md:mb-16">
          <motion.span
            className="text-5xl md:text-6xl lg:text-7xl font-black select-none leading-none pb-2 section-num"
            style={{ opacity: numOpacity, y: numY }}
          >
            01
          </motion.span>
          <div>
            <motion.h2
              className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: "hsl(var(--muted-fg))" }}
            >
              Profile
            </motion.h2>
            <div className="accent-line mt-3" />
          </div>
        </Reveal>

        {/* Content lines */}
        <motion.div
          key="profile-lines"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="space-y-6 md:space-y-8 max-w-3xl"
        >
          {profilePoints.map((point, i) => (
            <motion.div key={i} variants={lineVariants} className="relative">
              {/* Accent line */}
              <div
                className="absolute left-0 top-1.5 w-px rounded-full"
                style={{
                  background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)))",
                  height: "calc(100% - 0.5rem)",
                }}
              />
              <p
                className={i === 0
                  ? "text-lg md:text-xl lg:text-2xl font-medium leading-relaxed pl-5"
                  : "text-sm md:text-base lg:text-lg leading-relaxed pl-5"}
                style={{ color: i === 0 ? "hsl(var(--fg))" : "hsl(var(--muted-fg))" }}
              >
                {point}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Availability card */}
        <motion.div
          key="availability"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={availVariants}
          className="glass-card mt-12 md:mt-16 p-5 md:p-6 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
              style={{ background: "hsl(var(--primary))" }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <p className="text-sm md:text-base leading-relaxed" style={{ color: "hsl(var(--muted-fg))" }}>
              Currently open to internships and collaborative projects in full-stack development,
              backend systems, and AI/ML applications. Based in Ho Chi Minh City, Vietnam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
