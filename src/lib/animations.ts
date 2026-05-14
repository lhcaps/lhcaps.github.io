import type { Transition, Variants } from "framer-motion"

/* ===== Purposeful Easing ===== */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutExpo = [0.87, 0, 0.13, 1] as const
export const easeOutQuart = [0.25, 1, 0.5, 1] as const
export const easeSpring = [0.175, 0.885, 0.32, 1.275] as const

/* ===== Spring Transitions ===== */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1,
}

export const gentleSpring: Transition = {
  type: "spring",
  stiffness: 80,
  damping: 20,
  mass: 0.8,
}

export const fastSpring: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
  mass: 0.5,
}

/* ===== Core Entrance Variants ===== */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo as unknown as string },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo as unknown as string },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo as unknown as string },
  },
}

/* ===== Clip-Path Reveal — primary reveal technique ===== */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: easeOutExpo as unknown as string },
  },
}

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease: easeOutExpo as unknown as string },
  },
}

/* ===== Mask Blur Reveal — text reveal with focus ========= */
export const maskReveal: Variants = {
  hidden: { maskSize: "200% 100%", opacity: 0 },
  visible: {
    maskSize: "0% 100%",
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutExpo as unknown as string },
  },
}

/* ===== Stagger Container Variants ===== */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

/* ===== Line Draw Variants ===== */
export const lineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.0, ease: "easeInOut" as unknown as string },
  },
}

/* ===== Scale + Opacity ===== */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOutQuart as unknown as string },
  },
}

export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20,
      mass: 0.8,
    },
  },
}

/* ===== 3D Card Hover ===== */
export const card3dHover = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: { duration: 0.3, ease: easeOutExpo as unknown as string },
  },
  hover: {
    rotateX: -2,
    rotateY: 2,
    scale: 1.01,
    transition: { duration: 0.3, ease: easeOutExpo as unknown as string },
  },
}
