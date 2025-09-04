import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Crystal/Water color palette from spec
        abyss: "#0A0F1F",
        indigo: "#1A1446", 
        crystalBlue: "#8FD3FF",
        auroraTeal: "#00D4FF",
        etherPurple: "#6A00F4",
        moonstone: "#DFE7FF",
        roseQuartz: "#FFC1E3",
        amberBloom: "#FFD58A",
        emeraldGlint: "#00FFA3"
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"]
      },
      backdropBlur: {
        '2xl': '36px'
      },
      animation: {
        'aurora-sweep': 'aurora-sweep 14s ease-in-out infinite',
        'crystal-bloom': 'crystal-bloom 0.6s ease-out',
        'water-ripple': 'water-ripple 2s ease-out'
      },
      keyframes: {
        'aurora-sweep': {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' }
        },
        'crystal-bloom': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'water-ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        }
      }
    }
  },
  plugins: []
} satisfies Config
