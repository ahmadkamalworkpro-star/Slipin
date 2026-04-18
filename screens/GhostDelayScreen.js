import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { COLORS } from "../constants/theme";

export default function GhostDelayScreen({ navigation }) {
  const [isActive, setIsActive] = useState(false);

  // Function to handle activation and then go back
  const handleActivate = () => {
    setIsActive(true);
    // 1 second ka delay taake user "Activated" status dekh sakay, phir auto-back
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Manual Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>‹ Settings</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.ghostIcon}>👻</Text>
        </View>

        <Text style={styles.title}>Ghost Delay</Text>
        <Text style={styles.subtitle}>
          Your location will be updated with a 15-minute delay to keep your movements private.
        </Text>

        {/* Action Button */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            isActive ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={handleActivate}
          activeOpacity={0.8}
          disabled={isActive} // Aik baar active ho jaye toh disable ho jaye
        >
          <View style={styles.buttonContent}>
            {isActive && <Text style={styles.btnIcon}>✅</Text>}
            <Text style={[styles.buttonText, isActive && { color: "#0A0A0F" }]}>
              {isActive ? "Activated" : "Activate Ghost Delay"}
            </Text>
          </View>
        </TouchableOpacity>

        {isActive && (
          <Text style={styles.statusMsg}>
            Returning to settings...
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0F",
  },
  backButton: {
    padding: 20,
  },
  backText: {
    color: "#00FF9D",
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: -60,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: "#1A1A24",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#333333",
  },
  ghostIcon: {
    fontSize: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#888888",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  actionButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveButton: {
    backgroundColor: "#1A1A24",
    borderWidth: 1,
    borderColor: "#333333",
  },
  activeButton: {
    backgroundColor: "#00FF9D",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  btnIcon: {
    fontSize: 18,
  },
  statusMsg: {
    marginTop: 20,
    color: "#00FF9D",
    fontSize: 13,
    fontWeight: "500",
  },
});