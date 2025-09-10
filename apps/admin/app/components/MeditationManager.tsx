"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeditationSchema, Meditation } from "@eshamanio/schemas";
import { OrbButton, GlassCard } from "@eshamanio/ui";
import { getFirebaseDb } from "@eshamanio/firebase-client";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

export function MeditationManager() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const { handleSubmit, reset } = useForm<Meditation>({
    resolver: zodResolver(MeditationSchema),
  });

  useEffect(() => {
    const db = getFirebaseDb();
    const q = query(collection(db, "meditations"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMeditations(
        snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id }) as Meditation,
        ),
      );
    });
    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: Meditation) => {
    try {
      const db = getFirebaseDb();
      await addDoc(collection(db, "meditations"), data);
      reset();
    } catch (error) {
      console.error("Error adding meditation:", error);
    }
  };

  const deleteMeditation = async (id: string) => {
    try {
      const db = getFirebaseDb();
      await deleteDoc(doc(db, "meditations", id));
    } catch (error) {
      console.error("Error deleting meditation:", error);
    }
  };

  return (
    <GlassCard className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Manage Meditations</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        {/* Form fields for a new meditation */}
        <OrbButton type="submit" title="Add Meditation" />
      </form>
      <div className="space-y-4">
        {meditations.map((meditation) => (
          <div
            key={meditation.id}
            className="flex items-center justify-between rounded-lg bg-brand-primary-light p-4"
          >
            <p>{meditation.title}</p>
            <OrbButton
              onPress={() => deleteMeditation(meditation.id)}
              title="Delete"
            />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
