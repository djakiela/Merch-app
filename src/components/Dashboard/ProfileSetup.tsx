import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileSetupProps {
  newName: string;
  setNewName: (text: string) => void;
  onSave: () => void;
  onSkip: () => void;
  updating: boolean;
  theme: any;
}

export const ProfileSetup = ({
  newName,
  setNewName,
  onSave,
  onSkip,
  updating,
}: ProfileSetupProps) => (
  <View style={styles.setupContainer}>
    <View style={styles.setupCard}>
      <Ionicons name="person-circle-outline" size={70} color="#007AFF" />
      <Text style={styles.setupTitle}>Dokończ konfigurację profilu</Text>
      <Text style={styles.setupSubtitle}>
        Podaj swoje imię, abyśmy wiedzieli jak się do Ciebie zwracać.
      </Text>

      <TextInput
        style={styles.setupInput}
        placeholder="Twoje imię"
        value={newName}
        onChangeText={setNewName}
        autoFocus
      />

      <TouchableOpacity
        style={[styles.saveButton, updating && { opacity: 0.7 }]}
        onPress={onSave}
        disabled={updating}
      >
        <Text style={styles.saveButtonText}>
          {updating ? "Zapisywanie..." : "Zatwierdź"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.skipButton}
        onPress={onSkip}
        disabled={updating}
      >
        <Text style={styles.skipButtonText}>Pomiń</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  setupContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    padding: 20,
  },
  setupCard: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 25,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  setupTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    color: "#1a1a1a",
    textAlign: "center",
  },
  setupSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
    lineHeight: 20,
  },
  setupInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 12,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: "#fafafa",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    width: "100%",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  skipButton: { marginTop: 15, padding: 10 },
  skipButtonText: {
    color: "#888",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
