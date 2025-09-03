import type { Config } from "tailwindcss"
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#0A0F1F",
        indigo: "#1A1446",
        crystalBlue: "#8FD3FF",
        auroraTeal: "#00D4FF",
        etherPurple: "#6A00F4",
        moonstone: "#DFE7FF"
      }
    }
  },
  plugins: []
} satisfies Config
