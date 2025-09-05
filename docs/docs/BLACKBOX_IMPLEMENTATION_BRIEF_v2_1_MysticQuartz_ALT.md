# BLACKBOX IMPLEMENTATION BRIEF v2.1 — eShaman.io (MysticQuartz ALT Default)

**Palette:** E_MysticQuartz_ALT (Aqua → Magenta gradient)
- primary: #5CE1E6
- primary_700: #0EA5A6
- secondary: #C084FC
- accent: #F472B6
- highlight: #F59E0B
- bg: #FFF7F9 | fg: #0B1020
- gradient (default): #0EA5A6 → #DB2777  (base: #0EA5A6 → #C084FC)

## Deliverables
1) Web hero uses CSS variables + ALT gradient by default; reduced-motion fallback.
2) Mobile Welcome screen wired to RN theme.
3) Perf/a11y budgets met; zero console warnings.

## Install (baseline)
Web: framer-motion, lottie-react, tailwindcss, postcss, autoprefixer
Mobile (Expo): react-native-reanimated, react-native-gesture-handler, lottie-react-native, lottie-ios, expo-haptics, react-native-safe-area-context
