import Stripe from 'stripe';

type WebhookResult = { ok: boolean };

export async function handleStripeWebhook(rawBody: Buffer, signature: string): Promise<WebhookResult> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const stripe = new Stripe(process.env.STRIPE_SECRET || '', { apiVersion: '2024-06-20' });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error('Stripe signature verification failed', err);
    return { ok: false };
  }

  // Idempotency stub: check Firestore /billing/webhook_events/{event.id}
  // Write a record before processing to avoid duplicates.

  switch (event.type) {
    case 'checkout.session.completed':
    case 'invoice.payment_succeeded':
    case 'invoice.payment_failed':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'charge.dispute.created':
      // TODO: map to business actions (update subscription state, record invoice, alert on dispute)
      break;
    default:
      console.log('Unhandled event type', event.type);
  }

  return { ok: true };
}
