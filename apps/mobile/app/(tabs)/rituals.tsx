"use client";

import React, { useState } from "react";
import { ScrollView } from "react-native";
import { RitualCreator, RitualList } from "@esh/ui";

export default function RitualsScreen() {
  // A simple key to force re-rendering of the list when a new ritual is created
  const [listKey, setListKey] = useState(0);

  return (
    <ScrollView className="bg-background p-4">
      <RitualCreator onRitualCreated={() => setListKey((prev) => prev + 1)} />
      <RitualList key={listKey} />
    </ScrollView>
  );
}
