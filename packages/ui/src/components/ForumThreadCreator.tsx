"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForumThreadSchema, ForumThread } from "@esh/schemas";
import { OrbButton } from "./OrbButton";
import { GlassCard } from "./GlassCard";
import { getFirebaseDb } from "@esh/firebase-client";
import { useAuth } from "./AuthProvider";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type ForumThreadCreatorProps = {
  onThreadCreated: () => void;
};

export function ForumThreadCreator({
  onThreadCreated,
}: ForumThreadCreatorProps) {
  const { user } = useAuth();
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<
    Omit<ForumThread, "userId" | "userName" | "createdAt" | "lastReplyAt">
  >({
    resolver: zodResolver(
      ForumThreadSchema.omit({
        userId: true,
        userName: true,
        createdAt: true,
        lastReplyAt: true,
      }),
    ),
  });

  const onSubmit = async (
    data: Omit<
      ForumThread,
      "userId" | "userName" | "createdAt" | "lastReplyAt"
    >,
  ) => {
    if (!user || !user.displayName) {
      setErrorMessage(
        "You must be logged in and have a display name to create a thread.",
      );
      return;
    }

    setFormStatus("loading");
    setErrorMessage(null);

    try {
      const db = getFirebaseDb();
      await addDoc(collection(db, "forumThreads"), {
        ...data,
        userId: user.uid,
        userName: user.displayName,
        createdAt: serverTimestamp(),
        lastReplyAt: serverTimestamp(),
      });
      reset();
      onThreadCreated();
    } catch (error: any) {
      setFormStatus("error");
      setErrorMessage(error.message);
    } finally {
      setFormStatus("idle");
    }
  };

  return (
    <GlassCard className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Start a New Discussion</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <input
          {...register("title")}
          placeholder="Thread Title"
          className="rounded-lg bg-brand-primary-light p-4 text-white"
        />
        {errors.title && (
          <p className="text-red-500">{errors.title.message as string}</p>
        )}

        <select
          {...register("category")}
          className="rounded-lg bg-brand-primary-light p-4 text-white"
        >
          <option>General</option>
          <option>Rituals</option>
          <option>Astrology</option>
          <option>Meditations</option>
        </select>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <OrbButton
          onPress={handleSubmit(onSubmit)}
          title={formStatus === "loading" ? "Posting..." : "Post Thread"}
          disabled={formStatus === "loading"}
        />
      </form>
    </GlassCard>
  );
}
