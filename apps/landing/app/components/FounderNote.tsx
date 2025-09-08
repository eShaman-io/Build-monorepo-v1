'use client';

import React from 'react';
import { GlassCard } from '@esh/ui';

export function FounderNote() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <GlassCard className="p-8">
          <h2 className="mb-4 text-4xl font-bold">A Note from Our Founder</h2>
          <p className="text-lg text-brand-neutral-dark">
            &quot;We created eShaman to bridge the gap between ancient wisdom and modern technology, providing a space for authentic spiritual exploration. Our mission is to empower you on your journey of self-discovery.&quot;
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
