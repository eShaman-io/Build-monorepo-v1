import React from 'react';
import { Pressable, Text } from 'react-native';

type OrbButtonProps = {
  onPress: () => void;
  title: string;
};

export function OrbButton({ onPress, title }: OrbButtonProps) {
  return (
    <Pressable onPress={onPress} className="rounded-full bg-brand-secondary p-4">
      <Text className="text-center text-lg font-bold text-white">{title}</Text>
    </Pressable>
  );
}
