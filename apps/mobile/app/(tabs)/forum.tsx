"use client";

import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { ForumThreadCreator, ForumThreadList } from "@eshamanio/ui";

export default function ForumScreen() {
  // A simple key to force re-rendering of the list when a new thread is created
  const [listKey, setListKey] = useState(0);

  return (
    <ScrollView className="bg-background">
      <View className="p-4">
        <ForumThreadCreator
          onThreadCreated={() => setListKey((prev) => prev + 1)}
        />
        <View className="mt-8">
          <ForumThreadList key={listKey} />
        </View>
      </View>
    </ScrollView>
  );
}
