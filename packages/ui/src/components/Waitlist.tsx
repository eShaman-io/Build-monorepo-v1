"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WaitlistSchema, WaitlistData } from "@esh/schemas";
import { OrbButton } from "./OrbButton";
import { getFirebaseFunctions, httpsCallable } from "@esh/firebase-client";

export function Waitlist() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistData>({
    resolver: zodResolver(WaitlistSchema),
  });

  const onSubmit = async (data: WaitlistData) => {
    setFormStatus("loading");
    setErrorMessage(null);

    try {
      const functions = getFirebaseFunctions();
      const addToWaitlist = httpsCallable(functions, "addToWaitlist");
      await addToWaitlist(data);
      setFormStatus("success");
    } catch (error: any) {
      setFormStatus("error");
      setErrorMessage(error.message);
    }
  };

  if (formStatus === "success") {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Thank you for joining the waitlist!
        </h2>
        <p className="text-brand-neutral-dark">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <input
        {...register("email")}
        placeholder="Enter your email"
        className="rounded-lg bg-brand-primary-light p-4 text-white"
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message as string}</p>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <OrbButton
        onPress={handleSubmit(onSubmit)}
        title={formStatus === "loading" ? "Joining..." : "Join the Waitlist"}
        disabled={formStatus === "loading"}
      />
    </form>
  );
}
