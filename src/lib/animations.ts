import type { Transition, Variants } from "framer-motion"

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutExpo = [0.87, 0, 0.13, 1] as const
export const easeOutQuart = [0.25, 1, 0.5, 1] as const

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

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOutExpo as unknown as string,
    },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeOutExpo as unknown as string,
    },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeOutExpo as unknown as string,
    },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOutQuart as unknown as string,
    },
  },
}

export const textReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: 0.8,
      ease: easeOutExpo as unknown as string,
    },
  },
}

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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}
