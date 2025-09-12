# eShaman.io — Master Project Instructions v1.0
**Objective:** Ship an unmistakably premium product. “Good enough” is rejected at the gate.

## 0) Non‑Negotiable Quality Bar
- **Aesthetic:** Minimal, cinematic, spiritual-modern. Zero generic UI.
- **Experience:** Fast, smooth, obvious. Every interaction feels intentional.
- **Reliability:** No flaky states, no console errors, no surprise 500s.
- **Accessibility:** WCAG 2.2 AA minimum. Keyboard, screen reader, color contrast validated.
- **Performance budgets:** LCP ≤ 2.0s, INP ≤ 200ms, CLS ≤ 0.05 on 4G mid‑tier devices.
- **Security:** Principle of least privilege, no plaintext secrets, defense in depth.
- **Documentation:** Everything reproducible from a clean machine in ≤ 15 minutes.

## 1) Brand & Narrative Guardrails
- **Brand idea:** “Practical mysticism for modern life.” Technology as ritual.
- **Tone:** Calm, precise, trustworthy, slightly otherworldly.
- **No clichés:** Ban stock spirituality motifs unless reinterpreted with sophistication.
- **Microcopy:** Short, directive, graceful. Avoid filler. Examples: “Begin a ritual”, “Consult the Oracle”, “Set intention”, “Ground and proceed”.

## 2) Design System (tokens-first)
- **Tokens:** color, type, radius, spacing, depth, motion. Ship as `tokens.json` and alias in Framer, Figma, and code.
  - Color: 1 core accent, deep neutrals, supportive aura palette. States: hover/active/focus/disabled.
  - Type: two families max. Headings: high-contrast; body: readable; mono for code.
  - Radius: 2 scales only (subtle vs. container).
  - Motion: 120–200ms ease-in-out. Zero novelty animations.
- **Components:** Button, Input, Select, Tabs, Card, Modal/Sheet, Toast, Stepper, Badge, Empty State, Loading, Skeleton, Tooltip.
- **States & variants:** Each component documented with states, invalid, async, and density.
**Definition of Done (Design):**
1. Tokens exported and versioned.
2. Components cover 95% of UI with variants.
3. Figma and Framer use the same tokens.
4. Accessibility annotations present (roles, labels, focus order).

## 3) Framer Landing Page (production-grade)
**Purpose:** Convert curious visitors into signups and paid users.
**Sections:** above the fold, social proof, how it works, feature grid, pricing, FAQ, legal.
**Technical:** component props for copy/images, lazy-load, full metadata, responsive, analytics events.
**Acceptance:** A11y pass, CWV budgets, no layout shifts after hero paint.

## 4) Figma Prototype (source of truth)
Structure: Cover → Foundations → Components → Patterns → Flows.
Flows: onboarding, oracle consult, ritual creation, subscription upgrade, failed payment recovery.
Prototyping: realistic delays, micro-interactions, error states.
Handoff: redlines, spacing, tokens, behaviors, one page per flow with “Dev notes”.

## 5) Stripe Configuration
Plans: Free trial, Monthly, Annual. Proration, taxes, webhooks, Customer Portal, Radar rules.
Acceptance: test mode flows success/failure/SCA/downgrade; signed webhooks; retries idempotent.

## 6) GPT Integration (Oracle + Rituals)
Base system prompt: “You are the eShaman Oracle. Give grounded, practical guidance using ritual framing. Be clear, brief, and kind...”
Ritual engine: templates with schema and safety.
Safety: refuse disallowed content; scrub PII; temperature bands.
Observability: prompt_id, model, latency, token counts, outcome.
Acceptance: 20 seeded scenarios produce stable, high-quality answers.

## 7) Firebase Backend
Services: Auth, Firestore, Storage, Functions, Hosting.
Collections: users, rituals, consultations, billing, events.
Rules: locked by default; owner-only access.
Functions: stripeWebhook, createCheckoutSession, createPortalSession, logEvent.
Backups: daily exports; restore runbook.

## 8) Analytics, SEO, Experiments
Analytics: privacy-respecting + server relay.
SEO: titles, meta, OG/Twitter, JSON-LD.
Experiments: feature flags. KPIs: signup conversion, ritual completion, day-7 retention, upgrade rate, refund rate.

## 9) Security, Privacy, Compliance
PII minimization, retention, legal pages, incident response.

## 10) QA
Automated and manual tests, visual regression, release checklist.

## 11) Developer Handoff
Architecture diagram, ERD, .env.example, scripts, runbooks, API reference, prompt library. Success: clean-machine setup ≤ 15 minutes.

## 12) Notion Board
Columns, card fields, templates. Initial backlog of 12 cards provided in repo under `project-specs/notion`.

## 13) “GPT, Do The Work” Prompts
A–F prompts included in `project-specs/GPT_TASKS.md`.

## 14) Release Gate Checklist
A11y, CWV, Stripe webhooks, Auth+RBAC, Analytics dashboards, Docs, Oracle+rituals, zero criticals.

## 15) Visual & Content Starters
- Hero: “Practical mysticism, on demand.”
- Sub: “Ground, focus, and move forward with ritual‑guided clarity.”
- CTA: “Begin a ritual”
- Feature blurbs: Oracle Chat, Rituals, Privacy first.
