# BLACKBOX IMPLEMENTATION BRIEF v2 — eShaman.io Motion, Visuals & Tokens

**What’s new in v2:** Brand **tokens** (colors, typography, motion) + updated components wired to CSS variables and RN theme.

## Brand Token Options (pick one)

- **A_MysticTide** — teals & violets (aqua + amethyst, dark midnight base).
- **B_ObsidianAurora** — charcoal + neon mint/violet, high-contrast highlights.
- **C_RoseQuartz** — pink/violet/gold, soft light UI with warm accents.
- **D_LabradoritePrism** — sky blue + emerald + violet accents on deep navy.

Tokens live in: `design/tokens/brand_palettes.json` and `design/tokens/motion.json`.

> If no choice is provided, default to **A_MysticTide**.

## Deliverables

1. Web hero upgraded to use CSS custom properties (`--brand-*`) and gradient accent.
2. Mobile Welcome screen uses shared RN theme (colors, spacing, motion scale).
3. Reduced-motion honored; 60 FPS target; a11y guards; zero console warnings.

## Install (baseline)

Web: `framer-motion lottie-react tailwindcss postcss autoprefixer`  
Mobile (Expo): `react-native-reanimated react-native-gesture-handler lottie-react-native lottie-ios expo-haptics react-native-safe-area-context`

## Implementation Notes

- Web theme variables in `app/theme.css` and consumed by Tailwind via `:root`.
- RN theme in `app/theme.ts` (Expo). Use `theme.colors.primary` etc.
- Gradients sourced from palette `gradient` pair.
- Motion constants aligned to `design/tokens/motion.json`.
