"use client";

import { useState } from "react";
import { JournalEditor, JournalFeed } from "@eshamanio/ui";

export default function JournalPage() {
  // A simple key to force re-rendering of the feed when a new entry is saved
  const [feedKey, setFeedKey] = useState(0);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-xl space-y-8">
        <JournalEditor onEntrySaved={() => setFeedKey((prev) => prev + 1)} />
        <JournalFeed key={feedKey} />
      </div>
    </main>
  );
}
