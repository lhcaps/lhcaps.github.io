import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Github } from "lucide-react"
import { easeOutExpo } from "@/lib/animations"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "huyle210525@gmail.com",
    href: "mailto:huyle210525@gmail.com",
    color: "#3178C6",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+84 902 845 303",
    href: "tel:+84902845303",
    color: "#10B981",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ho Chi Minh City, Vietnam",
    href: null,
    color: "#F59E0B",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/lhcaps",
    href: "https://github.com/lhcaps",
    color: "#8B5CF6",
  },
]

export function ContactSection() {
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
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 md:opacity-50" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8vw] md:text-[6vw] font-black text-primary/[0.03] select-none pointer-events-none leading-none"
        style={{ y: bgY }}
      >
        LÊ HUY
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
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
            06
          </motion.span>
          <div>
            <motion.h2
              className="text-xs md:text-sm font-semibold tracking-widest uppercase text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let's Connect
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

        {/* CTA */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOutExpo as unknown as string }}
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4">
            Have a project in mind?
          </h3>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-6 md:mb-8">
            I'm always open to discussing new opportunities, interesting projects,
            or just having a chat about technology.
          </p>
          <motion.a
            href="mailto:huyle210525@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-4 rounded-2xl font-bold text-base md:text-lg"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 50px hsl(var(--primary) / 0.45)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="w-5 h-5 md:w-6 md:h-6" />
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Contact info grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo as unknown as string }}
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.a
                key={info.label}
                href={info.href || undefined}
                className={info.href ? "group p-4 md:p-5 rounded-xl border border-border bg-card/60 backdrop-blur-sm text-center cursor-pointer" : "p-4 md:p-5 rounded-xl border border-border bg-card/60 backdrop-blur-sm text-center cursor-default"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                whileHover={info.href ? { y: -4, borderColor: `${info.color}40`, boxShadow: `0 10px 30px ${info.color}10` } : {}}
              >
                <motion.div
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg mx-auto mb-2 md:mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${info.color}15` }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: info.color }} />
                </motion.div>
                <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">{info.label}</p>
                <p className="text-xs md:text-sm font-medium truncate">{info.value}</p>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative py-8 md:py-12 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center">
          <motion.a
            href="#"
            className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <motion.svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </motion.svg>
            Back to top
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
