'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserProfileSchema, UserProfile } from '@esh/schemas';
import { OrbButton } from './OrbButton';
import { getFirebaseDb, getFirebaseFunctions, httpsCallable } from '@esh/firebase-client';
import { useAuth } from './AuthProvider';
import { doc, onSnapshot } from 'firebase/firestore';

export function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(UserProfileSchema),
  });

  useEffect(() => {
    if (user) {
      const db = getFirebaseDb();
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          reset(doc.data() as UserProfile);
        }
      });
      return () => unsubscribe();
    }
  }, [user, reset]);

  const onSubmit = async (data: UserProfile) => {
    setFormStatus('loading');
    setErrorMessage(null);

    try {
      const functions = getFirebaseFunctions();
      const updateUserProfile = httpsCallable(functions, 'updateUserProfile');
      await updateUserProfile(data);
      setFormStatus('success');
    } catch (error: any) {
      setFormStatus('error');
      setErrorMessage(error.message);
    }
  };

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="text-3xl font-bold">Your Profile</h2>
      <input
        {...register('name')}
        placeholder="Your Name"
        className="rounded-lg bg-brand-primary-light p-4 text-white"
      />
      {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
      
      <input
        {...register('avatarUrl')}
        placeholder="Avatar URL"
        className="rounded-lg bg-brand-primary-light p-4 text-white"
      />
      {errors.avatarUrl && <p className="text-red-500">{errors.avatarUrl.message as string}</p>}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {formStatus === 'success' && <p className="text-green-500">Profile updated successfully!</p>}
      
      <OrbButton
        type="submit"
        title={formStatus === 'loading' ? 'Saving...' : 'Save Profile'}
        disabled={formStatus === 'loading'}
      />
    </form>
  );
}
