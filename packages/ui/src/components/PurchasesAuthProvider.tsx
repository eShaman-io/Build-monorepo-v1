"use client";

import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./AuthProvider";

// Check if we're in a React Native environment
const isReactNative = typeof window === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";

const PurchasesInitializer = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (isReactNative) {
      // React Native version with dynamic imports
      const Purchases = require("react-native-purchases");
      const { Platform } = require("react-native");
      
      // NOTE: In a real app, use environment variables for these keys
      const REVENUECAT_API_KEY =
        Platform.OS === "ios"
          ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY!
          : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY!;

      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
      Purchases.configure({ apiKey: REVENUECAT_API_KEY });
    }
  }, []);

  useEffect(() => {
    if (isReactNative && user) {
      const Purchases = require("react-native-purchases");
      if (user) {
        Purchases.logIn(user.uid);
      } else {
        Purchases.logOut();
      }
    }
  }, [user]);

  return <>{children}</>;
};

export const PurchasesAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AuthProvider>
      <PurchasesInitializer>{children}</PurchasesInitializer>
    </AuthProvider>
  );
};
