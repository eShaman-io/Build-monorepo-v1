import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { handleStripeWebhook } from '../../project-specs/STRIPE/webhook-handler';

export const stripeWebhook = onRequest(async (req, res) => {
  const signature = req.headers['stripe-signature'] as string || '';
  const ok = await handleStripeWebhook(Buffer.from(req.rawBody), signature);
  res.status(ok.ok ? 200 : 400).send(ok);
});

export const logEvent = onRequest(async (req, res) => {
  // Validate minimal AppEvent shape (stub)
  const body = req.body || {};
  if (!body || !body.uid || !body.name) {
    res.status(400).send({ ok: false, error: 'invalid_event' });
    return;
  }
  logger.info('Event', body);
  res.send({ ok: true });
});
