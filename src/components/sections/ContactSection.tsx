import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, MapPin, Github, ArrowUpRight } from "lucide-react"
import { Container, SectionHeader } from "@/components/layout"
import { profile } from "@/data/profile"

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
    color: "#60A5FA",
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.contact.location,
    href: null,
    color: "#FB923C",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/lhcaps",
    href: profile.contact.github,
    color: "#A78BFA",
  },
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
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-44 overflow-hidden"
    >
      {/* Background watermark */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black select-none pointer-events-none leading-none"
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          WebkitTextStroke: "1px rgba(103, 232, 249, 0.03)",
          color: "transparent",
          y: bgY,
        }}
      >
        CONTACT
      </motion.div>

      <Container>
        <SectionHeader number="05" label="Get In Touch" />

        {/* CTA block */}
        <motion.div
          className="p-8 md:p-10 rounded-2xl mb-10"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3 font-heading" style={{ color: "hsl(var(--fg))" }}>
            Have a real system to build?
          </h3>
          <p className="text-sm md:text-base max-w-lg leading-relaxed mb-6" style={{ color: "hsl(var(--muted-fg))" }}>
            I'm always open to discussing new opportunities, interesting projects, or just a chat about backend architecture and AI systems.
          </p>
          <motion.a
            href={`mailto:${profile.contact.email}`}
            className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3 font-semibold text-sm bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] text-white shadow-[0_0_30px_rgba(14,165,233,0.15)]"
            whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(14,165,233,0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail className="w-4 h-4" />
            Let's Talk
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8"
        >
          <motion.a
            variants={itemVariants}
            href={`mailto:${profile.contact.email}`}
            className="flex items-center gap-2.5 text-sm md:text-base font-medium"
            style={{ color: "hsl(var(--muted-fg))" }}
            whileHover={{ y: -2, color: "hsl(var(--fg))" }}
            transition={{ duration: 0.2 }}
          >
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#60A5FA" }} />
            {profile.contact.email}
          </motion.a>
          <motion.a
            variants={itemVariants}
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm md:text-base font-medium"
            style={{ color: "hsl(var(--muted-fg))" }}
            whileHover={{ y: -2, color: "hsl(var(--fg))" }}
            transition={{ duration: 0.2 }}
          >
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#FB923C" }} />
            {profile.contact.location}
          </motion.a>
        </motion.div>

        {/* Contact grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {contactItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.label}
                href={item.href || undefined}
                variants={itemVariants}
                className="p-5 rounded-xl text-center transition-all duration-200"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center"
                  style={{
                    background: `${item.color}10`,
                    border: `1px solid ${item.color}25`,
                  }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </motion.div>
                <p className="text-[10px] md:text-xs mb-1" style={{ color: "hsl(var(--muted-fg))" }}>
                  {item.label}
                </p>
                <p className="text-xs md:text-sm font-medium truncate">{item.value}</p>
              </motion.a>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="relative py-6 md:py-8 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
      <div className="max-w-[1120px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "hsl(var(--muted-fg))" }}>
            Le Huy / Louwis
          </span>
          <motion.a
            href="#"
            className="flex items-center gap-2 text-xs"
            style={{ color: "hsl(var(--muted-fg))" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -2, color: "hsl(var(--fg))" }}
            transition={{ duration: 0.2 }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
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
