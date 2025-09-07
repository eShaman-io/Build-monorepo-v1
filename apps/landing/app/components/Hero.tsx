'use client';

import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import heroAnimation from '../../public/hero.json';
import { OrbButton } from '@esh/ui';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="z-10 text-center"
      >
        <h1 className="mb-4 text-5xl font-bold text-white md:text-7xl">
          Discover Your Inner Oracle
        </h1>
        <p className="mb-8 text-lg text-brand-neutral-dark md:text-xl">
          eShaman provides the tools to unlock your spiritual potential.
        </p>
        <OrbButton onPress={() => console.log('Join Waitlist')} title="Join the Waitlist" />
      </motion.div>

      <div className="absolute inset-0 z-0">
        <Lottie animationData={heroAnimation} loop={true} className="h-full w-full" />
      </div>
    </section>
  );
}
