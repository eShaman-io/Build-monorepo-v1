'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { OrbButton, GlassCard } from '@esh/ui';
import { getFirebaseFunctions, httpsCallable } from '@esh/firebase-client';

const AdminSchema = z.object({
  email: z.string().email(),
});

export function SetAdminForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { register, handleSubmit, reset } = useForm({ resolver: zodResolver(AdminSchema) });

  const onSubmit = async (data: { email: string }) => {
    setStatus('loading');
    try {
      const functions = getFirebaseFunctions();
      const setAdminClaim = httpsCallable(functions, 'setAdminClaim');
      const result = await setAdminClaim(data);
      setStatus('success');
      setMessage((result.data as any).message);
      reset();
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <GlassCard className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Set Admin Claim</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('email')} placeholder="User Email" className="w-full rounded-lg bg-brand-primary-light p-4 text-white" />
        <OrbButton type="submit" title="Make Admin" disabled={status === 'loading'} />
        {message && <p className={status === 'error' ? 'text-red-500' : 'text-green-500'}>{message}</p>}
      </form>
    </GlassCard>
  );
}
