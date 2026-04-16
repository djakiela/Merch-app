import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DashboardHeaderProps {
  firstName: string;
  theme: any;
  onLogout: () => void;
}

export const DashboardHeader = ({
  firstName,
  theme,
  onLogout,
}: DashboardHeaderProps) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.welcomeText, { color: theme.subtitle }]}>
          Witaj w pracy,
        </Text>
        <Text style={[styles.userName, { color: theme.text }]}>
          {firstName} 👋
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.logoutBtn,
          {
            backgroundColor:
              theme.background === "#121212" ? "#442222" : "#FFEBEB",
          },
        ]}
        onPress={onLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: { fontSize: 16 },
  userName: { fontSize: 24, fontWeight: "bold" },
  logoutBtn: { padding: 10, borderRadius: 12 },
});
