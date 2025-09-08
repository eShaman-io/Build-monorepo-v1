'use client';

import React from 'react';
import { GlassCard, MysticPill } from '@esh/ui';

export function WhatYoullFeel() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">What You&apos;ll Feel</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <GlassCard className="p-6">
            <MysticPill text="Clarity" />
            <p className="mt-4 text-brand-neutral-dark">Gain a deeper understanding of your life&apos;s path and purpose.</p>
          </GlassCard>
          <GlassCard className="p-6">
            <MysticPill text="Connection" />
            <p className="mt-4 text-brand-neutral-dark">Connect with your inner wisdom and the world around you.</p>
          </GlassCard>
          <GlassCard className="p-6">
            <MysticPill text="Peace" />
            <p className="mt-4 text-brand-neutral-dark">Find a sense of calm and tranquility in your daily life.</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
