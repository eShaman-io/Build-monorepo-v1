import { Tabs } from "expo-router";
import { Feather } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00D4FF",
        tabBarStyle: {
          backgroundColor: "#0A0F1F",
          borderTopColor: "rgba(255,255,255,0.12)",
        },
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: "Home",
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="oracle" 
        options={{ 
          title: "Oracle",
          tabBarIcon: ({ color }) => <Feather name="message-circle" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="rituals" 
        options={{ 
          title: "Rituals",
          tabBarIcon: ({ color }) => <Feather name="moon" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="journal" 
        options={{ 
          title: "Journal",
          tabBarIcon: ({ color }) => <Feather name="book-open" size={24} color={color} />,
        }} 
      />
       <Tabs.Screen 
        name="forum" 
        options={{ 
          title: "Forum",
          tabBarIcon: ({ color }) => <Feather name="message-square" size={24} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Profile",
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }} 
      />

      {/* dev-only mockups tab */}
      {__DEV__ && <Tabs.Screen name="mockups" options={{ title: "Mockups" }} />}
    </Tabs>
  );
}
