"use client";

import React, { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getFirebaseDb } from "@esh/firebase-client";
import { useAuth } from "./AuthProvider";
import type { Ritual } from "@esh/schemas";
import { GlassCard } from "./GlassCard";

export function RitualList() {
  const { user } = useAuth();
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const db = getFirebaseDb();
    const ritualsRef = collection(db, "rituals");
    const q = query(ritualsRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userRituals = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Ritual,
      );
      setRituals(userRituals);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <p>Loading rituals...</p>;
  }

  if (!user) {
    return <p>Please log in to see your rituals.</p>;
  }

  if (rituals.length === 0) {
    return <p>You haven't created any rituals yet.</p>;
  }

  return (
    <div className="space-y-4">
      {rituals.map((ritual) => (
        <GlassCard key={ritual.id} className="p-4">
          <h3 className="text-xl font-bold">{ritual.name}</h3>
          <p className="text-brand-neutral-dark">{ritual.description}</p>
        </GlassCard>
      ))}
    </div>
  );
}
