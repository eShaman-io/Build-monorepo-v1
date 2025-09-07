"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { getFirebaseFunctions, httpsCallable } from "@esh/firebase-client";
import { OrbButton } from "./OrbButton";
import { GlassCard } from "./GlassCard";
import { useAuth } from "./AuthProvider";
import { useTranslation } from "react-i18next";

// NOTE: In a real app, the Stripe public key and price ID would be in environment variables.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
const PREMIUM_PRICE_ID = "price_1PQRgRDEa5giQ3_example_premium"; // Example Price ID

export function Pricing() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    if (!user) {
      setError("You must be logged in to subscribe.");
      setIsLoading(false);
      return;
    }

    try {
      const functions = getFirebaseFunctions();
      const createCheckoutSession = httpsCallable(
        functions,
        "createCheckoutSession",
      );

      const { data } = await createCheckoutSession({
        priceId: PREMIUM_PRICE_ID,
        successUrl: `${window.location.origin}/profile?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.href,
      });

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: (data as any).sessionId,
        });
        if (error) {
          setError(error.message || "Payment error occurred");
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="p-8">
      <h2 className="mb-4 text-center text-4xl font-bold">
        {t("premium_subscription")}
      </h2>
      <p className="mb-8 text-center text-brand-neutral-dark">
        Unlock the full eShaman experience.
      </p>

      <ul className="mb-8 space-y-2">
        <li>✓ {t("unlimited_oracle")}</li>
        <li>✓ Access to all rituals and meditations</li>
        <li>✓ Personalized astrological insights</li>
        <li>✓ Lunar cycle notifications</li>
        <li>✓ Exclusive content from spiritual teachers</li>
      </ul>

      <OrbButton
        onPress={handleCheckout}
        title={isLoading ? "Redirecting..." : t("subscribe_now")}
        disabled={isLoading}
      />
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </GlassCard>
  );
}
