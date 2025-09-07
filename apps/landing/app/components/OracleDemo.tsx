'use client';

import React from 'react';

export function OracleDemo() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Oracle Demo</h2>
        <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-8">
          {/* This is a simplified representation. The actual demo would be interactive. */}
          <div className="flex flex-col space-y-4">
            <div className="self-start rounded-lg bg-brand-primary-light p-4">
              <p className="text-white">&quot;What is my path forward?&quot;</p>
            </div>
            <div className="self-end rounded-lg bg-brand-secondary p-4">
              <p className="text-white">&quot;The path forward requires courage and patience...&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
