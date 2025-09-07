"use client";

import { useState } from "react";
import { ForumThreadCreator, ForumThreadList } from "@esh/ui";

export default function ForumPage() {
  // A simple key to force re-rendering of the list when a new thread is created
  const [listKey, setListKey] = useState(0);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-xl space-y-8">
        <ForumThreadCreator
          onThreadCreated={() => setListKey((prev) => prev + 1)}
        />
        <ForumThreadList key={listKey} />
      </div>
    </main>
  );
}
