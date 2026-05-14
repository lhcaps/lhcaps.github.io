import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { easeOutExpo } from "@/lib/animations"

const profilePoints = [
  "Software Engineering student with a backend-leaning full-stack development background.",
  "I enjoy building practical systems that hold up under real use — structured data layers, well-typed API contracts, reproducible local environments, and scripts that verify things work.",
  "My sweet spot sits at the intersection of Node.js/FastAPI APIs, React dashboards, SQL pipelines, and AI/CV experiments.",
  "I care about code that reads well, boundaries that make sense, and features you can actually prove work.",
]

export function ProfileSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0])
  const lineY = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [60, 0, 0, -60])
  const numberOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
  const numberScale = useTransform(scrollYProgress, [0.05, 0.15], [0.8, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section
      id="profile"
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-50" />

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: bgY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(280, 80%, 60% / 0.15), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Decorative line */}
      <motion.div
        className="absolute left-4 md:left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"
        style={{ opacity: lineOpacity, y: lineY }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        {/* Section number + label */}
        <motion.div
          className="flex items-center gap-4 mb-10 md:mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: easeOutExpo as unknown as string }}
        >
          <motion.span
            className="text-5xl md:text-6xl lg:text-7xl font-black text-primary/10 select-none"
            style={{ opacity: numberOpacity, scale: numberScale }}
          >
            01
          </motion.span>
          <div>
            <motion.h2
              className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Profile
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

        {/* Main content */}
        <div className="space-y-5 md:space-y-6">
          {profilePoints.map((point, index) => (
            <motion.div
              key={index}
              className={
                index === 0
                  ? "text-lg md:text-xl lg:text-2xl font-medium text-foreground"
                  : "text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground"
              }
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: easeOutExpo as unknown as string,
              }}
            >
              <span className="relative inline-block">
                {index === 0 && (
                  <motion.span
                    className="absolute -left-4 md:-left-6 top-0 bottom-0 w-1 bg-primary rounded-full"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4, ease: easeOutExpo as unknown as string }}
                    style={{ transformOrigin: "top" }}
                  />
                )}
                {point}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Animated highlight box */}
        <motion.div
          className="mt-10 md:mt-12 p-5 md:p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOutExpo as unknown as string }}
          whileHover={{ borderColor: "hsl(var(--primary) / 0.4)", y: -2 }}
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
              style={{ background: "hsl(var(--primary))" }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Currently open to internships and collaborative projects in full-stack development,
              backend systems, and AI/ML applications. Based in Ho Chi Minh City, Vietnam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
