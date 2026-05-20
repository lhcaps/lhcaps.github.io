import { motion } from "framer-motion"

interface TechPillProps {
  label: string
  color: string
  index?: number
}

export function TechPill({ label, color, index = 0 }: TechPillProps) {
  return (
    <motion.span
      className="inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold md:text-xs"
      style={{
        background: `color-mix(in oklch, ${color} 9%, transparent)`,
        borderColor: `color-mix(in oklch, ${color} 24%, transparent)`,
        color,
      }}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.28,
        delay: index * 0.025,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -2,
        borderColor: `color-mix(in oklch, ${color} 48%, transparent)`,
      }}
    >
      {label}
    </motion.span>
  )
}
