import React from 'react';
import { View, Text } from 'react-native';

type MysticPillProps = {
  text: string;
};

export function MysticPill({ text }: MysticPillProps) {
  return (
    <View className="rounded-full border border-brand-secondary px-4 py-2">
      <Text className="text-brand-secondary">{text}</Text>
    </View>
  );
}
