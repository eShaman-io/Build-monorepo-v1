# Component & Flow Spec

## Hero Section
- Tokens: color.accent.base for primary CTA, neutrals for text, radius.lg on container, shadow.md.
- Layout: H1, subhead, primary CTA “Begin a ritual”, optional secondary CTA, subtle aura gradient.
- Performance: lazy-load media, no layout shift after first paint, INP ≤ 200ms.
- Analytics: view_content (section=hero), cta_click (label=begin_ritual).
- A11y: proper heading order, landmark roles, label text.

## Flows
- Onboarding: email auth with magic link; error states for invalid link.
- Oracle consult: prompt, response, save to consultations; error banner on rate limit.
- Ritual creation: pick template, fill inputs, track step timing; handle abandonment.
- Subscription upgrade: checkout start, success, cancel; proration.
- Failed payment recovery: portal link, retry, downgrade if unresolved.
