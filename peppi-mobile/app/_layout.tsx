import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="enroll" options={{ title: "Enroll" }} />
      <Tabs.Screen name="studyplan" options={{ title: "Plan" }} />
      <Tabs.Screen name="messages" options={{ title: "Messages" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />

      {/* hidden pages (open via buttons) */}
      <Tabs.Screen name="grades" options={{ href: null }} />
      <Tabs.Screen name="gamification" options={{ href: null }} />

      {/* prevent “index” tab */}
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
