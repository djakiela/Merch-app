import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Wymagana zgoda na aparat</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Udziel dostępu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Przycisk powrotu - "pływający" nad kamerą */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/")}
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.scanFrame} />
          <Text style={styles.hint}>Skieruj aparat na datę ważności</Text>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  camera: { flex: 1 },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 25,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 280,
    height: 180,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 15,
    backgroundColor: "transparent",
  },
  hint: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 30,
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 5,
  },
  text: { textAlign: "center", marginBottom: 20, fontSize: 16 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 12 },
  buttonText: { color: "white", fontWeight: "bold" },
});
