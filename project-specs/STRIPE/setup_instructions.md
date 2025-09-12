# Stripe Setup Instructions
- Products/Prices: Free Trial, Monthly, Annual (Annual ≈ 10 × Monthly).
- Taxes on, receipts on, Link + wallets enabled.
- Webhooks: checkout.session.completed, invoice.payment_succeeded, invoice.payment_failed, customer.subscription.updated, customer.subscription.deleted, charge.dispute.created.
- Customer Portal: plan change, cancel-at-period-end, invoices.

## CLI (local)
stripe listen --forward-to localhost:5001/PROJECT/us-central1/stripeWebhook
stripe trigger checkout.session.completed

Use environment variables (no secrets in code): STRIPE_SECRET, STRIPE_WEBHOOK_SECRET.
