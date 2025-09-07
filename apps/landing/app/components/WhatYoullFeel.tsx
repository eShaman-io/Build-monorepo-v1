'use client';

import React from 'react';

export function WhatYoullFeel() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">What You&apos;ll Feel</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-6">
            <div className="inline-block rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-semibold text-white">
              Clarity
            </div>
            <p className="mt-4 text-brand-neutral-dark">Gain a deeper understanding of your life&apos;s path and purpose.</p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-6">
            <div className="inline-block rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-semibold text-white">
              Connection
            </div>
            <p className="mt-4 text-brand-neutral-dark">Connect with your inner wisdom and the world around you.</p>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-6">
            <div className="inline-block rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-semibold text-white">
              Peace
            </div>
            <p className="mt-4 text-brand-neutral-dark">Find a sense of calm and tranquility in your daily life.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
