import * as SecureStore from "expo-secure-store"; // Ważny import
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); // Stan dla przełącznika

  // 1. Sprawdź czy mamy zapamiętany email przy starcie
  useEffect(() => {
    async function loadSavedEmail() {
      const savedEmail = await SecureStore.getItemAsync("user_email");
      if (savedEmail) {
        setEmail(savedEmail);
      }
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
    } else if (data.session) {
      // 2. Jeśli logowanie się uda i zaznaczono "Zapamiętaj", zapisujemy email
      if (rememberMe) {
        await SecureStore.setItemAsync("user_email", email);
      } else {
        await SecureStore.deleteItemAsync("user_email");
      }
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>System Magisterski</Text>
        <Text style={styles.subtitle}>Zarządzanie rotacją towaru</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Adres e-mail</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Wprowadź e-mail"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hasło</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="Wprowadź hasło"
            placeholderTextColor="#999"
          />
        </View>

        {/* 3. Dodatkowy wiersz z przełącznikiem Zapamiętaj mnie */}
        <View style={styles.rememberContainer}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={rememberMe ? "#007AFF" : "#f4f3f4"}
          />
          <Text style={styles.rememberText}>Zapamiętaj mój e-mail</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={signInWithEmail}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Ładowanie..." : "Zaloguj się"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    color: "#000",
  },
  // --- TUTAJ BYŁ BRAK ---
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    paddingLeft: 4,
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
  },
  // ----------------------
  button: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
