"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getFirebaseDb } from "@eshamanio/firebase-client";
import { useAuth } from "./AuthProvider";
import type { JournalEntry } from "@eshamanio/schemas";
import { GlassCard } from "./GlassCard";

export function JournalFeed() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const db = getFirebaseDb();
    const entriesRef = collection(db, "journalEntries");
    const q = query(
      entriesRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userEntries = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as JournalEntry),
      );
      setEntries(userEntries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <p>Loading journal...</p>;
  }

  if (!user) {
    return <p>Please log in to see your journal.</p>;
  }

  if (entries.length === 0) {
    return <p>You haven't written any journal entries yet.</p>;
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <GlassCard key={entry.id} className="p-4">
          <h3 className="text-xl font-bold">{entry.title}</h3>
          <p className="text-brand-neutral-dark">{entry.content}</p>
        </GlassCard>
      ))}
    </div>
  );
}
