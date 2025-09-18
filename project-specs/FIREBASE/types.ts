// TypeScript types for Firestore collections

// /users/{userId}
export interface User {
  id: string;
  email: string;
  createdAt: string; // ISO 8601
  stripeCustomerId: string;
  subscriptionStatus: 'active' | 'trialing' | 'canceled' | 'past_due';
  subscriptionTier: 'monthly' | 'annual' | null;
}

// /rituals/{ritualId}
export interface Ritual {
  id: string;
  userId: string;
  templateId: string;
  createdAt: string; // ISO 8601
  status: 'started' | 'in_progress' | 'completed';
  inputs: Record<string, any>;
  outputs?: Record<string, any>;
}

// /consultations/{consultationId}
export interface Consultation {
  id: string;
  userId: string;
  createdAt: string; // ISO 8601
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

// /billing/{billingId}
export interface Billing {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  status: 'active' | 'trialing' | 'canceled' | 'past_due';
  periodEnds: string; // ISO 8601
}

// /events/{eventId}
export interface AppEvent {
  id: string;
  userId: string;
  eventName: string;
  timestamp: string; // ISO 8601
  payload: Record<string, any>;
}
