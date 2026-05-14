/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        heading: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "text-reveal": {
          from: { clipPath: "inset(0 100% 0 0)" },
          to: { clipPath: "inset(0 0 0 0)" },
        },
        "draw-line": {
          from: { strokeDashoffset: "1000" },
          to: { strokeDashoffset: "0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "spin-slower": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "orbit": {
          from: { transform: "rotate(0deg) translateX(72px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(72px) rotate(-360deg)" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "0.3", scale: "1" },
          "50%": { opacity: "1", scale: "1.5" },
        },
        "nebula-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
        },
        "scan-line": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(100vh)" },
        },
        "perspective-in": {
          from: {
            opacity: "0",
            transform: "perspective(1200px) rotateX(-15deg) translateY(40px) scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "perspective(1200px) rotateX(0deg) translateY(0) scale(1)",
          },
        },
        "tilt-in": {
          from: {
            opacity: "0",
            transform: "perspective(800px) rotateX(8deg) translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "perspective(800px) rotateX(0deg) translateY(0)",
          },
        },
        "hologram-flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.7" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.85" },
          "97%": { opacity: "1" },
        },
        "cursor-pulse": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "1" },
          "50%": { transform: "translate(-50%, -50%) scale(1.15)", opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-slower": "float-slower 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "text-reveal": "text-reveal 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "draw-line": "draw-line 2s ease-out forwards",
        "marquee": "marquee 30s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-slower": "spin-slower 25s linear infinite reverse",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "orbit": "orbit 12s linear infinite",
        "star-twinkle": "star-twinkle 3s ease-in-out infinite",
        "nebula-drift": "nebula-drift 20s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        "perspective-in": "perspective-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "tilt-in": "tilt-in 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "hologram-flicker": "hologram-flicker 5s ease-in-out infinite",
        "cursor-pulse": "cursor-pulse 2s ease-in-out infinite",
      },
      perspective: {
        "none": "none",
        "500": "500px",
        "800": "800px",
        "1000": "1000px",
        "1200": "1200px",
        "2000": "2000px",
      },
      transformStyle: {
        "preserve": "preserve-3d",
        "flat": "flat",
      },
      backdropBlur: {
        "xs": "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
