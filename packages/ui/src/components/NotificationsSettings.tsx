"use client";

import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { getFirebaseFunctions, httpsCallable } from "@eshamanio/firebase-client";
import { useAuth } from "./AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function NotificationsSettings() {
  const { user } = useAuth();
  const [status, setStatus] = useState<Notifications.PermissionStatus | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    Notifications.getPermissionsAsync().then((result) => setStatus(result.status));
  }, []);

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setStatus(status);

    if (status === "granted") {
      await registerForPushNotificationsAsync();
    }
  };

  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      setMessage("Push notifications are only available on physical devices.");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      const functions = getFirebaseFunctions();
      const registerPushToken = httpsCallable(functions, "registerPushToken");
      await registerPushToken({ token });
      setMessage("Successfully registered for push notifications!");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <Text>Please log in to manage notifications.</Text>;
  }

  return (
    <View>
      <Text className="mb-4 text-2xl font-bold">Push Notifications</Text>
      {status !== "granted" && (
        <Pressable
          onPress={requestPermissions}
          disabled={isSubmitting}
          className="rounded-lg bg-brand-secondary p-4"
        >
          <Text className="text-center text-white">
            {isSubmitting ? "Enabling..." : "Enable Notifications"}
          </Text>
        </Pressable>
      )}
      {status === "granted" && <Text>Push notifications are enabled.</Text>}
      {message && <Text className="mt-4">{message}</Text>}
    </View>
  );
}
