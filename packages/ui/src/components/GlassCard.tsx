import React from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <BlurView
      intensity={20}
      tint="dark"
      style={{
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <View className={`p-4 ${className}`}>{children}</View>
    </BlurView>
  );
}
