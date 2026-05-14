import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Github, ArrowUpRight } from "lucide-react"
import { Reveal } from "@/lib/reveal"

const contactInfo = [
  { icon: Mail, label: "Email", value: "huyle210525@gmail.com", href: "mailto:huyle210525@gmail.com", color: "#60A5FA" },
  { icon: Phone, label: "Phone", value: "+84 902 845 303", href: "tel:+84902845303", color: "#4ADE80" },
  { icon: MapPin, label: "Location", value: "Ho Chi Minh City, Vietnam", href: null, color: "#FB923C" },
  { icon: Github, label: "GitHub", value: "github.com/lhcaps", href: "https://github.com/lhcaps", color: "#A78BFA" },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section id="contact" ref={sectionRef} className="relative py-12 md:py-16 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8vw] md:text-[6vw] font-black select-none pointer-events-none leading-none section-num"
        style={{ y: bgY }}
      >
        LE HUY
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <Reveal direction="left" className="flex items-center gap-3 mb-8 md:mb-10">
          <span className="text-4xl md:text-5xl lg:text-6xl font-black select-none leading-none pb-1 section-num">
            06
          </span>
          <div>
            <h2 className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase" style={{ color: "hsl(var(--muted-fg))" }}>
              Let's Connect
            </h2>
            <div className="accent-line mt-2" />
          </div>
        </Reveal>

        {/* CTA block */}
        <Reveal direction="up" className="mb-8 md:mb-10">
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <p className="text-sm md:text-base max-w-xl leading-relaxed mb-4 md:mb-5" style={{ color: "hsl(var(--muted-fg))" }}>
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
            <motion.a
              href="mailto:huyle210525@gmail.com"
              className="btn-glass inline-flex items-center gap-2.5 rounded-xl px-6 py-3 md:px-8 md:py-4 font-semibold text-sm md:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5" />
              Contact Me
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.span>
            </motion.a>
          </div>
        </Reveal>

        {/* Contact info row — email & phone as text links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6 sm:mb-8"
        >
          <motion.a
            variants={itemVariants}
            href="mailto:huyle210525@gmail.com"
            className="flex items-center gap-2.5 text-sm md:text-base font-medium"
            style={{ color: "hsl(var(--muted-fg))" }}
          >
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#60A5FA" }} />
            huyle210525@gmail.com
          </motion.a>
          <motion.a
            variants={itemVariants}
            href="tel:+84902845303"
            className="flex items-center gap-2.5 text-sm md:text-base font-medium"
            style={{ color: "hsl(var(--muted-fg))" }}
          >
            <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#4ADE80" }} />
            +84 902 845 303
          </motion.a>
        </motion.div>

        {/* Contact grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <motion.a
                key={info.label}
                href={info.href || undefined}
                variants={itemVariants}
                className="glass-card group p-4 md:p-5 rounded-xl text-center"
                whileHover={info.href ? { y: -4 } : {}}
              >
                <motion.div
                  className="w-9 h-9 md:w-10 md:h-10 rounded-lg mx-auto mb-2 md:mb-3 flex items-center justify-center"
                  style={{ background: `${info.color}10`, border: `1px solid ${info.color}25` }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: info.color }} />
                </motion.div>
                <p className="text-[10px] md:text-xs mb-0.5 md:mb-1" style={{ color: "hsl(var(--muted-fg))" }}>{info.label}</p>
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
    <footer className="relative py-6 md:py-8 border-t" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center">
          <motion.a
            href="#"
            className="flex items-center gap-2 text-xs md:text-sm transition-colors"
            style={{ color: "hsl(var(--muted-fg))" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
          >
            <motion.svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </motion.svg>
            Back to top
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
