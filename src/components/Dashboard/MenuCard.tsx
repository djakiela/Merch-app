import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuCardProps {
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  onPress: () => void;
  theme: any; // <--- DODAJ TO
}

export const MenuCard = ({
  title,
  icon,
  color,
  onPress,
  subtitle,
  theme,
}: MenuCardProps) => (
  <TouchableOpacity
    style={[styles.card, { backgroundColor: theme.card }]} // <--- UŻYJ KOLORU Z MOTYWU
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={icon} size={30} color="#fff" />
    </View>
    <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
    <Text style={[styles.cardSubtitle, { color: theme.subtitle }]}>
      {subtitle}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardSubtitle: { fontSize: 12, color: "#888", marginTop: 4 },
});
