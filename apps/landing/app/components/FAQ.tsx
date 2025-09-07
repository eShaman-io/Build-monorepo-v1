'use client';

import React from 'react';
import { GlassCard } from '@esh/ui';

const faqData = [
  {
    question: 'What is eShaman?',
    answer: 'eShaman is a platform for spiritual discovery and growth, offering tools and guidance to help you unlock your inner potential.',
  },
  {
    question: 'How does the Oracle work?',
    answer: 'The Oracle uses a sophisticated AI model to provide insightful readings based on ancient wisdom and modern technology.',
  },
  {
    question: 'Is my data private?',
    answer: 'Yes, we take data privacy very seriously. All your personal information and readings are encrypted and stored securely.',
  },
];

export function FAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Frequently Asked Questions</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {faqData.map((item, index) => (
            <GlassCard key={index} className="p-6">
              <h3 className="mb-4 text-2xl font-bold">{item.question}</h3>
              <p className="text-brand-neutral-dark">{item.answer}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
