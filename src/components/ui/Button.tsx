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
  const base = "relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 select-none"

  const variants = {
    primary: "btn-glass text-[hsl(var(--fg))] hover:border-[hsl(var(--primary)/0.35)]",
    secondary: "liquid-glass text-[hsl(var(--muted-fg))] hover:text-[hsl(var(--fg))]",
    ghost: "text-[hsl(var(--muted-fg))] hover:text-[hsl(var(--fg))]",
  }

  const sizes = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-4 text-base",
  }

  const classes = cn(base, variants[variant], sizes[size], className)

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
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
