export type User = { uid:string; email:string; plan:'free'|'pro_monthly'|'pro_annual'; createdAt:number; consent:{analytics:boolean}; };
export type Ritual = { ritualId:string; templateId:string; ownerId:string; steps:any[]; status:'draft'|'active'|'completed'; createdAt:number; updatedAt:number; };
export type Consultation = { cid:string; uid:string; promptId:string; contentHash:string; tokens:{in:number; out:number}; rating?:number; createdAt:number; };
export type Billing = { stripeCustomerId:string; subState:'none'|'trial'|'active'|'past_due'|'canceled'; priceId?:string; currentPeriodEnd?:number; updatedAt:number; };
export type AppEvent = { eid:string; uid:string; name:'view_content'|'oracle_consult'|'start_ritual'|'checkout_start'|'checkout_complete'; ts:number; props:Record<string,unknown>; };
export type KPI = 'signup_conversion'|'ritual_completion'|'d7_retention'|'upgrade_rate'|'refund_rate';
