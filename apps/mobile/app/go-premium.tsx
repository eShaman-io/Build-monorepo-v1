import React from "react";
import { View } from "react-native";
import { MobilePricing } from "@eshamanio/ui";

export default function GoPremiumScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <MobilePricing />
    </View>
  );
}
