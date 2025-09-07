'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JournalEntrySchema, JournalEntry } from '@esh/schemas';
import { OrbButton } from './OrbButton';
import { GlassCard } from './GlassCard';
import { getFirebaseDb } from '@esh/firebase-client';
import { useAuth } from './AuthProvider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

type JournalEditorProps = {
  onEntrySaved: () => void;
};

export function JournalEditor({ onEntrySaved }: JournalEditorProps) {
  const { user } = useAuth();
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<JournalEntry, 'userId' | 'createdAt' | 'updatedAt'>>({
    resolver: zodResolver(JournalEntrySchema.omit({ userId: true, createdAt: true, updatedAt: true })),
  });

  const onSubmit = async (data: Omit<JournalEntry, 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) {
      setErrorMessage('You must be logged in to save an entry.');
      return;
    }

    setFormStatus('loading');
    setErrorMessage(null);

    try {
      const db = getFirebaseDb();
      await addDoc(collection(db, 'journalEntries'), {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      reset();
      onEntrySaved();
    } catch (error: any) {
      setFormStatus('error');
      setErrorMessage(error.message);
    } finally {
      setFormStatus('idle');
    }
  };

  return (
    <GlassCard className="p-8">
      <h2 className="mb-4 text-2xl font-bold">New Journal Entry</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <input
          {...register('title')}
          placeholder="Entry Title"
          className="rounded-lg bg-brand-primary-light p-4 text-white"
        />
        {errors.title && <p className="text-red-500">{errors.title.message as string}</p>}
        
        <textarea
          {...register('content')}
          placeholder="Write your thoughts..."
          rows={5}
          className="rounded-lg bg-brand-primary-light p-4 text-white"
        />
        {errors.content && <p className="text-red-500">{errors.content.message as string}</p>}

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        
        <OrbButton
          type="submit"
          title={formStatus === 'loading' ? 'Saving...' : 'Save Entry'}
          disabled={formStatus === 'loading'}
        />
      </form>
    </GlassCard>
  );
}
