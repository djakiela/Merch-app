import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { supabase } from "../../src/lib/supabase";

import { Colors } from "../../constants/Colors";
import { useCustomTheme } from "../../src/context/ThemeContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { themeMode } = useCustomTheme();
  const theme = Colors[themeMode];

  useEffect(() => {
    async function loadSavedEmail() {
      const savedEmail = await SecureStore.getItemAsync("user_email");
      if (savedEmail) setEmail(savedEmail);
    }
    loadSavedEmail();
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert("Błąd", "Niepoprawne dane.");
    } else if (data.session && rememberMe) {
      await SecureStore.setItemAsync("user_email", email);
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.headerArea}>
          <Text style={[styles.title, { color: theme.text }]}>
            Merchandiser Pro
          </Text>
          <Text style={[styles.subtitle, { color: theme.subtitle }]}>
            Łatwe zarządzanie towarem
          </Text>
        </View>

        <View style={styles.formArea}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.subtitle }]}>
              Adres e-mail
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.border,
                },
              ]}
              onChangeText={setEmail}
              value={email}
              placeholder="Podaj adres e-mail"
              placeholderTextColor={themeMode === "dark" ? "#555" : "#ccc"}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.subtitle }]}>Hasło</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.border,
                },
              ]}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              placeholder="Podaj hasło"
              placeholderTextColor={themeMode === "dark" ? "#555" : "#ccc"}
            />
          </View>

          <View style={styles.optionsRow}>
            <View style={styles.rememberContainer}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: theme.border, true: theme.tint }}
                thumbColor="#fff"
              />
              <Text style={[styles.rememberText, { color: theme.text }]}>
                Zapamiętaj mnie
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.tint }, // Colors.ts
              loading && { opacity: 0.7 },
            ]}
            onPress={signInWithEmail}
            disabled={loading}
          >
            <Text
              style={[
                styles.buttonText,
                { color: themeMode === "dark" ? "#121212" : "#fff" },
              ]}
            >
              {loading ? "Ładowanie..." : "Zaloguj się"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  headerArea: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
  formArea: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1.5,
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    // Stylizacja przypominająca kafelki z Dashboardu
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
  },
  rememberText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
