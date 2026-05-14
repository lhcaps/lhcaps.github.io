import { motion } from "framer-motion"

interface TechPillProps {
  label: string
  color: string
  index?: number
}

export function TechPill({ label, color, index = 0 }: TechPillProps) {
  return (
    <motion.span
      key={label}
      className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] md:text-xs font-medium font-mono select-none"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}22`,
        color: color,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.07,
        borderColor: `${color}60`,
        background: `${color}1A`,
      }}
    >
      {label}
    </motion.span>
  )
}
