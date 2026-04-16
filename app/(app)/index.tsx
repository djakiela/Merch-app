import { Ionicons } from "@expo/vector-icons"; // Ikony w standardzie Expo
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../src/lib/supabase";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Błąd", "Nie udało się wylogować.");
  };

  // Funkcja do renderowania pojedynczego kafelka
  const MenuCard = ({ title, icon, color, onPress, subtitle }: any) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={30} color="#fff" />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Powitalny */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Witaj w pracy,</Text>
          <Text style={styles.userName}>Merchandiser 👋</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>

      {/* Siatka Kafelków */}
      <View style={styles.grid}>
        <MenuCard
          title="Nowy Skan"
          subtitle="OCR Daty Ważności"
          icon="camera"
          color="#007AFF"
          onPress={() => router.push("/scanner")}
        />
        <MenuCard
          title="Moje Sklepy"
          subtitle="Lista placówek"
          icon="business"
          color="#34C759"
          onPress={() => Alert.alert("Moduł w budowie")}
        />
        <MenuCard
          title="Terminy"
          subtitle="Zasada FIFO"
          icon="time"
          color="#FF9500"
          onPress={() => Alert.alert("Przejdź do listy produktów")}
        />
        <MenuCard
          title="Raporty"
          subtitle="Statystyki rotacji"
          icon="bar-chart"
          color="#5856D6"
          onPress={() => Alert.alert("Generowanie PDF")}
        />
      </View>

      {/* Sekcja szybkiego info */}
      <View style={styles.infoBox}>
        <Ionicons name="alert-circle" size={20} color="#FF3B30" />
        <Text style={styles.infoText}>
          Masz 12 produktów, których termin upływa w ciągu 48h!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  content: { padding: 20, paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeText: { fontSize: 16, color: "#666" },
  userName: { fontSize: 24, fontWeight: "bold", color: "#1a1a1a" },
  logoutBtn: { padding: 10, backgroundColor: "#FFEBEB", borderRadius: 12 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    width: "48%", // Idealne dwa kafelki obok siebie
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
  infoBox: {
    marginTop: 20,
    backgroundColor: "#FFF5F5",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE0E0",
  },
  infoText: {
    marginLeft: 10,
    color: "#D32F2F",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
});
