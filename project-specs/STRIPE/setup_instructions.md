# Stripe Setup Instructions v1.0

## 1. CLI Commands
First, ensure you have the Stripe CLI installed and configured.

```bash
# Set your API key (replace with your test key)
stripe config --api-key sk_test_...

# Create Products & Prices
# Product: Monthly Subscription
stripe products create --name="eShaman Monthly" --description="Monthly access to all eShaman features." --metadata plan_group="standard"
# Price for Monthly (e.g., $19.00 USD)
stripe prices create --product <PRODUCT_ID_MONTHLY> --unit-amount 1900 --currency usd --recurring[interval]=month

# Product: Annual Subscription
stripe products create --name="eShaman Annual" --description="Annual access to all eShaman features." --metadata plan_group="standard"
# Price for Annual (e.g., $199.00 USD, includes a discount)
stripe prices create --product <PRODUCT_ID_ANNUAL> --unit-amount 19900 --currency usd --recurring[interval]=year

# Create a 7-day free trial
# Add `trial_period_days=7` to your Checkout Session creation on the server.
```

## 2. Dashboard Configuration
1.  **Webhooks**:
    *   Go to Developers > Webhooks in your Stripe Dashboard.
    *   Add an endpoint for your production environment (e.g., `https://api.eshaman.io/stripeWebhook`).
    *   Listen for the following events:
        *   `checkout.session.completed`
        *   `invoice.paid`
        *   `invoice.payment_failed`
        *   `customer.subscription.updated`
        *   `customer.subscription.deleted`
    *   Record the webhook signing secret. Store it securely in your backend environment variables as `STRIPE_WEBHOOK_SECRET`.

2.  **Customer Portal**:
    *   Go to Settings > Customer Portal.
    *   Configure the portal to allow customers to:
        *   Update their payment methods.
        *   View their invoice history.
        *   Cancel their subscription.
        *   Upgrade/downgrade between Monthly and Annual plans.
    *   Set your branding and link to your terms of service and privacy policy.

3.  **Taxes**:
    *   Go to Settings > Tax.
    *   Configure Stripe Tax to automatically calculate and collect sales tax based on customer location.

4.  **Receipts**:
    *   Go to Settings > Branding to customize the look of your receipts.
    *   Ensure email receipts are enabled for successful payments.

## 3. Test Matrix

| Scenario                  | Steps                                                               | Expected Outcome                                     |
| ------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| **Success**               | Use a test card (e.g., 4242...) to complete checkout.               | Subscription becomes active. Webhook fires.          |
| **Authentication Req.**   | Use an SCA test card.                                               | 3D Secure modal appears. Authentication succeeds.    |
| **Failure (Insufficient)**| Use a card with insufficient funds.                                 | Payment is declined. `invoice.payment_failed`.       |
| **Upgrade (Month→Year)**  | Customer uses portal to switch from Monthly to Annual.              | Prorated charge is applied. Subscription updates.    |
| **Downgrade (Year→Month)**| Customer uses portal to switch from Annual to Monthly.              | Change is scheduled for the end of the billing cycle.|
| **Cancel**                | Customer uses portal to cancel.                                     | Subscription is scheduled to cancel at period end.   |

