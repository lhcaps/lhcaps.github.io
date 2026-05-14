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
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "orb-float-1": "orb-float-1 30s ease-in-out infinite",
        "orb-float-2": "orb-float-2 25s ease-in-out infinite",
        "orb-float-3": "orb-float-3 20s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
