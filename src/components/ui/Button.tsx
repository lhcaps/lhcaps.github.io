import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  external?: boolean
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors select-none"

  const variants = {
    primary:
      "bg-[var(--accent)] text-[oklch(16%_0.02_250)] hover:bg-[color-mix(in_oklch,var(--accent)_86%,var(--fg))]",
    secondary:
      "border hairline bg-[color-mix(in_oklch,var(--surface)_76%,transparent)] text-[var(--fg)] hover:border-[color-mix(in_oklch,var(--accent)_46%,var(--line))]",
    ghost: "text-[var(--muted)] hover:text-[var(--fg)]",
  }

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.985 },
    transition: { duration: 0.2 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  )
}
