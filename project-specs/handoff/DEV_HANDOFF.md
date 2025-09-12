# Developer Handoff
## Architecture
- Web: Framer + tokens
- Backend: Firebase (Auth, Firestore, Functions, Hosting)
- Payments: Stripe
- LLM: Oracle Chat + Rituals

## ERD (collections)
- users(uid, email, plan, createdAt, consent)
- rituals(ritualId, templateId, ownerId, steps, status, createdAt, updatedAt)
- consultations(cid, uid, promptId, contentHash, tokens, rating, createdAt)
- billing(uid, stripeCustomerId, subState, priceId, currentPeriodEnd, updatedAt)
- events(eid, uid, name, ts, props)

## Sequences
### Checkout
Client → createCheckoutSession → Stripe Checkout → webhook → update billing doc → portal enabled.
### Ritual
Client → select template → validate inputs → run → log events → completion.

## .env.example
FIREBASE_PROJECT_ID=eshamanio
STRIPE_SECRET=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
OPENAI_API_KEY=sk-...
APP_URL=https://eshaman.io

## Scripts (suggested)
setup, dev, test, lint, format, typecheck, build, release

## Runbooks
Local dev, deploy, rollback, hotfix, incident response

## API Reference
- POST /logEvent
- POST /stripeWebhook

## Prompt Library
See project-specs/GPT_TASKS.md and project-specs/ritual-templates
