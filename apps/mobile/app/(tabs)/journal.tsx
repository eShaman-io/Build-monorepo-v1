"use client";

import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { JournalEditor, JournalFeed } from "@eshamanio/ui";

export default function JournalScreen() {
  // A simple key to force re-rendering of the feed when a new entry is saved
  const [feedKey, setFeedKey] = useState(0);

  return (
    <ScrollView className="bg-background">
      <View className="p-4">
        <JournalEditor onEntrySaved={() => setFeedKey((prev) => prev + 1)} />
        <View className="mt-8">
          <JournalFeed key={feedKey} />
        </View>
      </View>
    </ScrollView>
  );
}
