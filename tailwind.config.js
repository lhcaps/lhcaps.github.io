/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geologica Variable", "system-ui", "sans-serif"],
        mono: ["Fragment Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}
