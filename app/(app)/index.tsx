import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../src/lib/supabase";

// Importy narzędziowe i komponenty
import { Colors } from "../../constants/Colors";
import { DashboardHeader } from "../../src/components/Dashboard/DashboardHeader";
import { MenuCard } from "../../src/components/Dashboard/MenuCard";
import { ProfileSetup } from "../../src/components/Dashboard/ProfileSetup";
import { useCustomTheme } from "../../src/context/ThemeContext"; // Nasz nowy zarządca motywów

export default function Dashboard() {
  const router = useRouter();
  const { themeMode } = useCustomTheme(); // Pobieramy tryb (light/dark) z contextu
  const theme = Colors[themeMode];

  const [firstName, setFirstName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();
        if (data?.first_name) setFirstName(data.first_name);
      }
    } catch (e) {
      console.log("Błąd profilu:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (name: string) => {
    const finalName = name.trim().length < 2 ? "Merchandiser" : name.trim();
    setUpdating(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: user.id, first_name: finalName });
      if (!error) setFirstName(finalName);
    }
    setUpdating(false);
  };

  // 1. Ekran ładowania (Themed)
  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
        <Text style={{ marginTop: 10, color: theme.subtitle }}>
          Ładowanie...
        </Text>
      </View>
    );
  }

  // 2. Ekran konfiguracji profilu (Themed)
  if (!firstName) {
    return (
      <ProfileSetup
        newName={newName}
        setNewName={setNewName}
        onSave={() => handleUpdateProfile(newName)}
        onSkip={() => handleUpdateProfile("Merchandiser")}
        updating={updating}
        theme={theme}
      />
    );
  }

  // 3. Główny Dashboard
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <DashboardHeader
        firstName={firstName}
        theme={theme}
        onLogout={() => supabase.auth.signOut()}
      />

      <View style={styles.grid}>
        <MenuCard
          title="Nowy Skan"
          subtitle="OCR Daty"
          icon="camera"
          color="#007AFF"
          onPress={() => router.push("/scanner")}
          theme={theme}
        />
        <MenuCard
          title="Moje Sklepy"
          subtitle="Placówki"
          icon="business"
          color="#34C759"
          onPress={() => {}}
          theme={theme}
        />
        <MenuCard
          title="Terminy"
          subtitle="Zasada FIFO"
          icon="time"
          color="#FF9500"
          onPress={() => {}}
          theme={theme}
        />
        <MenuCard
          title="Raporty"
          subtitle="Statystyki"
          icon="bar-chart"
          color="#5856D6"
          onPress={() => {}}
          theme={theme}
        />
      </View>

      <View
        style={[
          styles.infoBox,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.infoText, { color: theme.text }]}>
          System monitoruje 12 terminów przydatności w Twoim rejonie.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  infoText: { fontSize: 13, fontWeight: "500", textAlign: "center" },
});
