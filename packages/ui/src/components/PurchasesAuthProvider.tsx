'use client';

import React, { useEffect } from 'react';
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';
import { AuthProvider, useAuth } from './AuthProvider';

// NOTE: In a real app, use environment variables for these keys
const REVENUECAT_API_KEY = Platform.OS === 'ios' 
  ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY!
  : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY!;

const PurchasesInitializer = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  useEffect(() => {
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    Purchases.configure({ apiKey: REVENUECAT_API_KEY });
  }, []);

  useEffect(() => {
    if (user) {
      Purchases.logIn(user.uid);
    } else {
      Purchases.logOut();
    }
  }, [user]);

  return <>{children}</>;
};

export const PurchasesAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <PurchasesInitializer>
        {children}
      </PurchasesInitializer>
    </AuthProvider>
  );
};
