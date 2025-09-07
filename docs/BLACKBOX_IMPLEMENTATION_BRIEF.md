# BLACKBOX IMPLEMENTATION BRIEF — Premium Motion & Visuals (Web + Mobile)

**Goal:** Implement modern, high-quality graphics and animations for the landing page (web) and the mobile app using proven libraries. Everything below is a self-contained brief Blackbox can follow without additional context.

---

## 0) Deliverables (Definition of Done)

1. **Web (Next.js)** hero section with premium motion:
   - Framer Motion entrance + stagger.
   - Lottie animated background (auto-pauses offscreen; static fallback for reduced motion).
   - Responsive, accessible CTA.
   - CLS < 0.1; keyboard/focus a11y; `prefers-reduced-motion` respected.

2. **Mobile (Expo/React Native)** welcome screen:
   - Reanimated micro-interactions (press scale) + parallax pattern ready.
   - Lottie confetti trigger on button tap.
   - Haptic feedback.
   - Screen-reader labels + large-text support.
   - 60 FPS on mid-tier Android.

3. **Repo updates:**
   - Dependencies installed.
   - Config files updated (Tailwind on web, Babel plugin for Reanimated on mobile).
   - Usage examples wired and runnable with provided commands.

---

## 1) Tech Choices

### Web (Next.js 14 + App Router)

- **UI/Motion:** `framer-motion`, `lottie-react`
- **Styling:** `tailwindcss`, `postcss`, `autoprefixer`
- **Optional Enhancements:** `@studio-freight/lenis` (smooth scroll), `gsap`, `@rive-app/react-canvas`, `three`, `@react-three/fiber`, `@react-three/drei`, `maath`

### Mobile (Expo / React Native)

- **Motion/Core:** `react-native-reanimated`, `react-native-gesture-handler`
- **Animation:** `lottie-react-native`, `lottie-ios` (iOS native dep handled by Expo)
- **UX:** `expo-haptics`
- **A11y & Layout:** `react-native-safe-area-context`
- **Optional:** `rive-react-native`

---

## 2) Install Commands

> Use **one** package manager. Provide both `npm` and `pnpm` for convenience.

### Web (Next.js)

**npm**

```bash
npm i framer-motion lottie-react
npm i -D tailwindcss postcss autoprefixer
# optional extras:
npm i @studio-freight/lenis gsap @rive-app/react-canvas three @react-three/fiber @react-three/drei maath
```

**pnpm**

```bash
pnpm add framer-motion lottie-react
pnpm add -D tailwindcss postcss autoprefixer
# optional extras:
pnpm add @studio-freight/lenis gsap @rive-app/react-canvas three @react-three/fiber @react-three/drei maath
```

### Mobile (Expo)

```bash
expo install react-native-reanimated react-native-gesture-handler lottie-react-native lottie-ios expo-haptics react-native-safe-area-context
# optional:
expo install rive-react-native
```

---

## 3) Web: Project Setup & Files

### 3.1 Tailwind Init (if not present)

```bash
npx tailwindcss init -p
```

**tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

**app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3.2 Lottie Asset Placeholders

Place assets at:

```
/public/hero.json           // looping background animation
/public/no-motion.png       // static fallback image for reduced motion
```

> Blackbox: If no real asset yet, add a minimal placeholder JSON and a neutral PNG.

### 3.3 Hero Component (Framer Motion + Lottie)

`app/components/Hero.tsx`

```tsx
"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";
import { useRef } from "react";
import heroAnim from "@/public/hero.json";

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      {!shouldReduce && inView ? (
        <Lottie
          animationData={heroAnim}
          loop
          autoplay
          className="absolute inset-0 -z-10"
        />
      ) : (
        <img
          src="/no-motion.png"
          alt=""
          className="absolute inset-0 -z-10 w-full h-full object-cover"
        />
      )}

      <div className="mx-auto max-w-7xl px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-5xl font-semibold tracking-tight"
        >
          Elevate your launch.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06, duration: 0.6 }}
          className="mt-4 text-lg text-neutral-600"
        >
          Modern motion, clean code, fast loads.
        </motion.p>

        <motion.a
          href="#get-started"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="mt-8 inline-flex items-center rounded-2xl border px-5 py-3 focus:outline-none focus-visible:ring"
          aria-label="Get started"
        >
          Get started
        </motion.a>
      </div>
    </section>
  );
}
```

### 3.4 Use the Component

`app/page.tsx`

```tsx
import Hero from "./components/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      {/* Additional sections here */}
    </main>
  );
}
```

> **Optional (Smooth Scroll):**
> If using `@studio-freight/lenis`, initialize it in a client layout; pause it for reduced motion.

---

## 4) Mobile: Project Setup & Files (Expo)

### 4.1 Babel Config for Reanimated

`babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"], // must be last
  };
};
```

### 4.2 Welcome Screen (Reanimated + Lottie + Haptics)

`app/Welcome.tsx` (or `screens/Welcome.tsx`)

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";

export default function Welcome() {
  const scale = useSharedValue(1);
  const confetti = useRef<LottieView>(null);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      accessible
      accessibilityLabel="Welcome screen"
    >
      <Animated.View style={[{ padding: 24, borderRadius: 20 }, style]}>
        <Pressable
          accessibilityRole="button"
          onPressIn={() => (scale.value = withSpring(0.96))}
          onPressOut={() => (scale.value = withSpring(1))}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            confetti.current?.play();
          }}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 16,
            borderWidth: 1,
          }}
        >
          <Text style={{ fontSize: 18 }}>Let’s go</Text>
        </Pressable>
      </Animated.View>

      <LottieView
        ref={confetti}
        source={require("../assets/confetti.json")}
        autoPlay={false}
        loop={false}
        style={{ width: 220, height: 220 }}
      />
    </View>
  );
}
```

### 4.3 Assets

Place a confetti file at: `./assets/confetti.json`

> Blackbox: If missing, add a small placeholder Lottie file.

---

## 5) Prompts for Blackbox (verbatim)

### Web (Next.js + Framer Motion + Lottie)

```
You are a senior UI engineer. Build a Next.js 14 landing hero with Tailwind + Framer Motion + Lottie.
Requirements:
- Full-bleed hero, headline + subcopy + CTA.
- Subtle entrance: parent fade/slide 24px, child stagger 0.06s, ease: [0.2,0.8,0.2,1].
- Lottie background loops at 0.75x, paused when not in viewport, disabled if prefers-reduced-motion.
- Assets: /public/hero.json (Lottie), /public/no-motion.png fallback.
- Accessibility: keyboard-focus visible, aria-labels, alt text, 44px min tap targets.
- Perf: lazy-load Lottie, IntersectionObserver, CLS < 0.1.
Output: Hero.tsx, usage notes, and exact npm/pnpm install commands.
```

### Mobile (Expo + Reanimated 3 + Lottie)

```
You are a senior RN engineer. Create a React Native welcome screen using Reanimated 3 + Lottie.
Requirements:
- Header cards with springy parallax on scroll.
- CTA button press scale 0.96 and haptic trigger (Expo Haptics).
- Lottie confetti on successful tap; pause when app in background.
- Accessibility: screen reader labels, large text support.
- Perf: runOnJS minimal; 60 FPS on mid-tier Android.
Provide component code + install commands (Expo).
```

---

## 6) Acceptance Criteria & Quality Bars

- **Performance (Web):**
  - CLS < 0.1, Smooth 60 FPS animations, defer heavy work until idle/visible.
  - Lazy-load Lottie; pause when offscreen; provide static fallback for reduced motion.
  - Use responsive images and predictable layout to avoid layout shifts.
- **Performance (Mobile):**
  - 60 FPS interactions, avoid large JS work on UI thread.
  - Limit `runOnJS`; use Reanimated worklets for animations.
- **Accessibility:**
  - Keyboard and screen-reader support; visible focus states.
  - Tap targets ≥ 44px; sufficient contrast.
  - Honor `prefers-reduced-motion` (web) and Large Text (mobile).
- **Code Quality:**
  - TypeScript ready; componentized; minimal side effects.
  - Clear comments where assets should be replaced.
  - No console errors/warnings in dev logs.
- **Testing/Verification:**
  - Manual check on iOS/Android emulators and two modern browsers.
  - Verify reduced-motion behavior and Lottie pause offscreen.

---

## 7) Optional Enhancements (if time allows)

- **Scroll-driven storytelling:** Use `@studio-freight/lenis` + Framer Motion scroll progress.
- **Rive:** Replace/augment Lottie with `@rive-app/react-canvas` (web) or `rive-react-native` (mobile) for state-based vector animations.
- **3D Hero:** Basic `three` + `@react-three/fiber` + `@react-three/drei` scene with subtle camera parallax and low GPU budget.
- **GSAP:** Complex timeline choreography or scroll-triggered reveals.

---

## 8) Commands Cheat Sheet

### Web

```bash
# with npm
npm i framer-motion lottie-react && npm i -D tailwindcss postcss autoprefixer
# with pnpm
pnpm add framer-motion lottie-react && pnpm add -D tailwindcss postcss autoprefixer
```

### Mobile (Expo)

```bash
expo install react-native-reanimated react-native-gesture-handler lottie-react-native lottie-ios expo-haptics react-native-safe-area-context
```

---

## 9) Notes for Blackbox

- Replace placeholder Lottie/PNG with final brand assets when available.
- Keep hero copy and styles simple; focus on motion polish.
- Ensure any optional libraries are only added if requested to control bundle size.
- Commit in small, reviewable PRs:
  - `feat(web): hero with framer-motion + lottie`
  - `feat(mobile): welcome with reanimated + lottie + haptics`
  - `chore: tailwind & babel config updates`

---

**End of brief.**
