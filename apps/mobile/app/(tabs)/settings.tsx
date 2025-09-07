import React from "react";
import { View } from "react-native";
import { NotificationsSettings } from "@esh/ui";

export default function SettingsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background p-4">
      <NotificationsSettings />
    </View>
  );
}
