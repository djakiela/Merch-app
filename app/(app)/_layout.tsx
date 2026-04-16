import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import { useCustomTheme } from "../../src/context/ThemeContext"; // Importujemy nasz context

export default function AppLayout() {
  const { themeMode, toggleTheme } = useCustomTheme();
  const theme = Colors[themeMode];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          height: 60,
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        headerStyle: {
          backgroundColor: theme.card,
        },
        headerTintColor: theme.text,
        // --- KLUCZOWA ZMIANA: Dodajemy przycisk do paska na górze ---
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleTheme}
            style={{ marginRight: 20, padding: 5 }}
          >
            <Ionicons
              name={themeMode === "dark" ? "sunny" : "moon"}
              size={24}
              color={themeMode === "dark" ? "#FFD700" : "#444"}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Panel",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Skaner OCR",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "camera" : "camera-outline"}
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
