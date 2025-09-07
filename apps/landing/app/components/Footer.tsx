'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4 text-center text-brand-neutral-dark">
        <p>&copy; {new Date().getFullYear()} eShaman. All rights reserved.</p>
      </div>
    </footer>
  );
}
