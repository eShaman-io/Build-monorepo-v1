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
        <div className="absolute inset-0 -z-10 hero-gradient opacity-85" />
      )}

      <div className="mx-auto max-w-7xl px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="heading text-5xl md:text-6xl font-semibold tracking-tight"
        >
          MysticQuartz — ALT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.06, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="copy mt-4 text-lg md:text-xl/8 text-neutral-700"
        >
          Aqua → Magenta, engineered for impact.
        </motion.p>

        <motion.a
          href="#get-started"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl border px-6 py-3 copy"
        >
          Get started
        </motion.a>
      </div>
    </section>
  );
}
