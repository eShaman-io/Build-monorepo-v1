"use client";

import { useState } from "react";
import { RitualCreator, RitualList } from "@esh/ui";

export default function RitualsPage() {
  // A simple key to force re-rendering of the list when a new ritual is created
  const [listKey, setListKey] = useState(0);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-xl space-y-8">
        <RitualCreator onRitualCreated={() => setListKey((prev) => prev + 1)} />
        <RitualList key={listKey} />
      </div>
    </main>
  );
}
