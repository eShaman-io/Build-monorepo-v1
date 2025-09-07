import React from 'react';
import { View, Pressable, Text } from 'react-native';

// This is a simplified implementation. A real implementation would
// require more complex state management.
type CrystalTabsProps = {
  tabs: string[];
  selectedIndex: number;
  onTabPress: (index: number) => void;
};

export function CrystalTabs({ tabs, selectedIndex, onTabPress }: CrystalTabsProps) {
  return (
    <View className="flex-row">
      {tabs.map((tab, index) => (
        <Pressable
          key={tab}
          onPress={() => onTabPress(index)}
          className={`flex-1 p-4 ${
            selectedIndex === index ? 'border-b-2 border-brand-secondary' : ''
          }`}
        >
          <Text
            className={`text-center ${
              selectedIndex === index ? 'text-brand-secondary' : 'text-brand-neutral'
            }`}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
