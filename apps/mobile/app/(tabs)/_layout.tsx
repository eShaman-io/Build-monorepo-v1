import { Tabs } from "expo-router"
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#00D4FF", tabBarStyle: { backgroundColor: "#0A0F1F", borderTopColor: "rgba(255,255,255,0.12)" } }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="oracle" options={{ title: "Oracle" }} />
      <Tabs.Screen name="rituals" options={{ title: "Rituals" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  )
}
// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      {/* your normal tabs */}
      {__DEV__ && <Tabs.Screen name="mockups" options={{ title: "Mockups" }} />}
    </Tabs>
  );
}
