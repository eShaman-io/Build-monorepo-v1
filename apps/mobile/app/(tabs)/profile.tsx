"use client";

import React from "react";
import { ScrollView, View } from "react-native";
import { Profile } from "@esh/ui";

export default function ProfileScreen() {
  return (
    <ScrollView className="bg-background">
      <View className="p-4">
        <Profile />
      </View>
    </ScrollView>
  );
}
