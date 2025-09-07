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
      className={`overflow-hidden rounded-2xl ${className}`}
    >
      <View className="p-4">{children}</View>
    </BlurView>
  );
}
