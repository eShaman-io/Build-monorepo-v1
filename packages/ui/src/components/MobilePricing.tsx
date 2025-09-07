'use client';

import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { GlassCard } from './GlassCard';
import { OrbButton } from './OrbButton';

export function MobilePricing() {
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current) {
          setOffering(offerings.current);
        }
      } catch {
        setError('Could not fetch subscription plans.');
      }
    };
    getOfferings();
  }, []);

  const handlePurchase = async () => {
    if (!offering?.availablePackages[0]) return;
    
    setIsLoading(true);
    setError(null);

    try {
      await Purchases.purchasePackage(offering.availablePackages[0]);
    } catch (e: any) {
      if (!e.userCancelled) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!offering) {
    return <ActivityIndicator />;
  }

  return (
    <GlassCard>
      <View className="p-4">
        <Text className="mb-4 text-center text-4xl font-bold text-white">Premium Subscription</Text>
        <Text className="mb-8 text-center text-brand-neutral-dark">Unlock the full eShaman experience.</Text>
        
        {offering.availablePackages.map((pkg) => (
          <OrbButton
            key={pkg.identifier}
            onPress={handlePurchase}
            title={`Subscribe for ${pkg.product.priceString}/month`}
            disabled={isLoading}
          />
        ))}
        {error && <Text className="mt-4 text-center text-red-500">{error}</Text>}
      </View>
    </GlassCard>
  );
}
