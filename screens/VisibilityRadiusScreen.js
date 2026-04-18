import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

const RADIUS_OPTIONS = [
  { id: "building", icon: "🏢", label: "Building", subtitle: "Same building only" },
  { id: "neighborhood", icon: "🏡", label: "Neighborhood", subtitle: "2 mile radius" },
  { id: "city", icon: "🌇", label: "City", subtitle: "Entire city" },
  { id: "state", icon: "🗺️", label: "State", subtitle: "Statewide visibility" },
];

export default function VisibilityRadiusScreen({ navigation, route }) {
  // Jo value Settings se aayi hai usay select rakho
  const [selectedRadius, setSelectedRadius] = useState(route.params?.currentRadius || "Neighborhood");

  const handleSelect = (radiusLabel) => {
    setSelectedRadius(radiusLabel);
    
    // Yahan hum wapis Settings screen par ja rahe hain aur naya data bhej rahe hain
    navigation.navigate("Settings", { 
      selectedRadius: radiusLabel 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹ Settings</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Visibility Radius</Text>
        </View>

        <View style={styles.optionsList}>
          {RADIUS_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedRadius === option.label && styles.optionCardSelected,
              ]}
              onPress={() => handleSelect(option.label)}
              activeOpacity={0.8}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <View style={styles.textContainer}>
                  <Text style={[styles.optionLabel, selectedRadius === option.label && { color: "#00FF9D" }]}>
                    {option.label}
                  </Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>
              </View>
              {selectedRadius === option.label && <View style={styles.selectedDot} />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0F" },
  backButton: { padding: 20 },
  backText: { color: "#00FF9D", fontSize: 18, fontWeight: "600" },
  scroll: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingBottom: 24, alignItems: "center" },
  headerTitle: { fontSize: 28, fontWeight: "700", color: "#FFFFFF" },
  optionsList: { paddingHorizontal: 16 },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 20,
    backgroundColor: "#1A1A24",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333333",
    justifyContent: "space-between",
  },
  optionCardSelected: { borderColor: "#00FF9D" },
  optionContent: { flexDirection: "row", alignItems: "center", flex: 1 },
  optionIcon: { fontSize: 30, marginRight: 16 },
  textContainer: { flex: 1 },
  optionLabel: { fontSize: 18, fontWeight: "700", color: "#FFFFFF" },
  optionSubtitle: { fontSize: 13, color: "#888888", marginTop: 2 },
  selectedDot: { width: 14, height: 14, backgroundColor: "#00FF9D", borderRadius: 7 },
});