import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';
import { z } from 'zod';

// NOTE: In a real app, use Firebase secrets for the Stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });

const checkoutSchema = z.object({
  priceId: z.string(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export const createCheckoutSession = onCall({ enforceAppCheck: true }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to start a subscription.');
  }

  const validationResult = checkoutSchema.safeParse(request.data);
  if (!validationResult.success) {
    throw new HttpsError('invalid-argument', validationResult.error.message);
  }

  const { priceId, successUrl, cancelUrl } = validationResult.data;
  const { uid, email } = request.auth.token;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { userId: uid },
    });

    return { sessionId: session.id };
  } catch (error: any) {
    console.error('Error creating Stripe Checkout session:', error);
    throw new HttpsError('internal', `An unexpected error occurred: ${error.message}`);
  }
});
