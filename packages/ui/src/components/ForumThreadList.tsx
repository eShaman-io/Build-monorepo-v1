"use client";

import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { getFirebaseDb } from "@esh/firebase-client";
import { useAuth } from "./AuthProvider";
import type { ForumThread } from "@esh/schemas";
import { GlassCard } from "./GlassCard";

export function ForumThreadList() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirebaseDb();
    const threadsRef = collection(db, "forumThreads");
    const q = query(threadsRef, orderBy("lastReplyAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allThreads = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as ForumThread,
      );
      setThreads(allThreads);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading discussions...</p>;
  }

  if (!user) {
    return <p>Please log in to view the forum.</p>;
  }

  if (threads.length === 0) {
    return <p>No discussions have been started yet.</p>;
  }

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <GlassCard key={thread.id} className="p-4">
          <h3 className="text-xl font-bold">{thread.title}</h3>
          <p className="text-sm text-brand-neutral-dark">
            Posted by {thread.userName} in {thread.category}
          </p>
        </GlassCard>
      ))}
    </div>
  );
}
