"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@esh/schemas";
import { OrbButton } from "./OrbButton";
import { getFirebaseFunctions, httpsCallable } from "@esh/firebase-client";

export function Signup() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    setFormStatus("loading");
    setErrorMessage(null);

    try {
      const functions = getFirebaseFunctions();
      const onUserSignup = httpsCallable(functions, "onUserSignup");
      await onUserSignup(data);
      setFormStatus("success");
    } catch (error: any) {
      setFormStatus("error");
      setErrorMessage(error.message);
    }
  };

  if (formStatus === "success") {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome to eShaman!</h2>
        <p className="text-brand-neutral-dark">
          Your account is being created. You will be able to log in shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <input
        {...register("name")}
        placeholder="Name"
        className="rounded-lg bg-brand-primary-light p-4 text-white"
      />
      {errors.name && (
        <p className="text-red-500">{errors.name.message as string}</p>
      )}
      <input
        {...register("email")}
        placeholder="Email"
        className="rounded-lg bg-brand-primary-light p-4 text-white"
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message as string}</p>
      )}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="rounded-lg bg-brand-primary-light p-4 text-white"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message as string}</p>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <OrbButton
        type="submit"
        title={
          formStatus === "loading" ? "Creating Account..." : "Create Account"
        }
        disabled={formStatus === "loading"}
      />
    </form>
  );
}
