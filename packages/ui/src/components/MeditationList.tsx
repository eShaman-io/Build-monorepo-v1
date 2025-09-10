"use client";

import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { getFirebaseDb } from "@eshamanio/firebase-client";
import { useAuth } from "./AuthProvider";
import type { Meditation } from "@eshamanio/schemas";
import { GlassCard } from "./GlassCard";
import { OrbButton } from "./OrbButton";

export function MeditationList() {
  const { user } = useAuth();
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirebaseDb();
    const meditationsRef = collection(db, "meditations");
    const q = query(meditationsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const allMeditations = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Meditation),
        );
        setMeditations(allMeditations);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching meditations:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading meditations...</p>;
  }

  if (!user) {
    return <p>Please log in to listen to meditations.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-center text-4xl font-bold">
        Guided Meditations
      </h2>
      {meditations.map((meditation) => (
        <GlassCard key={meditation.id} className="p-6">
          <h3 className="text-2xl font-bold">{meditation.title}</h3>
          <p className="mb-4 text-brand-neutral-dark">
            {meditation.description}
          </p>
          <OrbButton
            onPress={() => alert(`Playing: ${meditation.title}`)} // Replace with actual audio player logic
            title={`Play (${Math.floor(meditation.duration / 60)} min)`}
          />
        </GlassCard>
      ))}
    </div>
  );
}
