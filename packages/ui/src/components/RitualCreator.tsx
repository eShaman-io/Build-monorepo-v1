"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RitualSchema } from "@esh/schemas";
import { OrbButton } from "./OrbButton";
import { GlassCard } from "./GlassCard";
import { getFirebaseFunctions, httpsCallable } from "@esh/firebase-client";

type RitualCreatorProps = {
  onRitualCreated: () => void;
};

export function RitualCreator({ onRitualCreated }: RitualCreatorProps) {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Ritual, "userId" | "createdAt">>({
    resolver: zodResolver(RitualSchema.omit({ userId: true, createdAt: true })),
  });

  const onSubmit = async (data: Omit<Ritual, "userId" | "createdAt">) => {
    setFormStatus("loading");
    setErrorMessage(null);

    try {
      const functions = getFirebaseFunctions();
      const createRitual = httpsCallable(functions, "createRitual");
      await createRitual(data);
      setFormStatus("success");
      reset();
      onRitualCreated();
    } catch (error: any) {
      setFormStatus("error");
      setErrorMessage(error.message);
    } finally {
      setFormStatus("idle");
    }
  };

  return (
    <GlassCard className="p-8">
      <h2 className="mb-4 text-2xl font-bold">Create a New Ritual</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <input
          {...register("name")}
          placeholder="Ritual Name (e.g., Morning Meditation)"
          className="rounded-lg bg-brand-primary-light p-4 text-white"
        />
        {errors.name && (
          <p className="text-red-500">{errors.name.message as string}</p>
        )}

        <textarea
          {...register("description")}
          placeholder="Description (optional)"
          className="rounded-lg bg-brand-primary-light p-4 text-white"
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <OrbButton
          type="submit"
          title={formStatus === "loading" ? "Creating..." : "Create Ritual"}
          disabled={formStatus === "loading"}
        />
      </form>
    </GlassCard>
  );
}
