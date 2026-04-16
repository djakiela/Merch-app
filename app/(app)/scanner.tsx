import { CameraView, useCameraPermissions } from "expo-camera"; // Tego brakowało
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />; // Ładowanie uprawnień

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Musimy mieć dostęp do aparatu, aby skanować kody kresowe.
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Udziel dostępu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          <Text style={styles.hint}>Umieść kod kresowy w ramce</Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  scanArea: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
  },
  hint: { color: "#fff", marginTop: 20, fontSize: 16, fontWeight: "bold" },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
