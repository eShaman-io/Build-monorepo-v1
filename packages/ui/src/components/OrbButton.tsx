import React from "react";
import { Pressable, Text } from "react-native";

type OrbButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

export function OrbButton({ onPress, title, disabled = false }: OrbButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      className={`rounded-full p-4 ${
        disabled 
          ? "bg-gray-400" 
          : "bg-brand-secondary"
      }`}
    >
      <Text className="text-center text-lg font-bold text-white">{title}</Text>
    </Pressable>
  );
}
