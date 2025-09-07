"use client";

import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./AuthProvider";

const PurchasesInitializer = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // For web, this is a no-op component since React Native Purchases is not available
  // In a real mobile implementation, this would initialize RevenueCat
  useEffect(() => {
    // No-op for web - would configure RevenueCat in mobile environment
  }, []);

  useEffect(() => {
    // No-op for web - would handle user login/logout in mobile environment
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
