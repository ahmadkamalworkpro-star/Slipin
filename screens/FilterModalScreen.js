import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");
const AGE_OPTIONS = [18, 21, 25, 30, 35, 40, 45, 50, 55, 65];
const INTERESTS = [
  { label: "Flirt", color: "#FF3EFF" },
  { label: "Drink", color: "#803EFF" },
  { label: "Slip Away", color: "#3EFFD2" },
  { label: "Hang Out", color: "#FFB800" },
];
const GENDERS = ["Man", "Woman", "Non-binary", "Other"];

export default function FilterModalScreen({ navigation }) {
  const [minAge, setMinAge] = useState(21);
  const [maxAge, setMaxAge] = useState(45);
  const [selectedInterests, setSelectedInterests] = useState(["Slip Away"]); 
  const [selectedGender, setSelectedGender] = useState("Woman");

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleApply = () => {
    navigation.navigate("Nearby", {
      appliedFilters: { minAge, maxAge, selectedInterests, selectedGender, isReset: false }
    });
  };

  // --- YE HAI RESET LOGIC ---
  const handleReset = () => {
    navigation.navigate("Nearby", {
      appliedFilters: { isReset: true } // Sirf reset ka signal bhejo
    });
  };

  const renderAgeCircle = (val, current, setter) => (
    <TouchableOpacity 
      key={val}
      style={[styles.ageCircle, current === val && styles.ageCircleActive]}
      onPress={() => setter(val)}
    >
      <Text style={[styles.ageText, current === val && styles.ageTextActive]}>{val}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => navigation.goBack()} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Filters</Text>

          <Text style={styles.sectionTitle}>AGE RANGE</Text>
          <View style={styles.rowWrap}>{AGE_OPTIONS.slice(0, 6).map(v => renderAgeCircle(v, minAge, setMinAge))}</View>
          <Text style={styles.rangeLabel}>Min: {minAge} - Max: {maxAge}</Text>
          <View style={styles.rowWrap}>{AGE_OPTIONS.slice(2, 8).map(v => renderAgeCircle(v, maxAge, setMaxAge))}</View>

          <Text style={styles.sectionTitle}>HERE FOR</Text>
          <View style={styles.rowWrap}>
            {INTERESTS.map((item) => {
              const isSelected = selectedInterests.includes(item.label);
              return (
                <TouchableOpacity 
                  key={item.label}
                  onPress={() => toggleInterest(item.label)}
                  style={[styles.interestPill, { borderColor: isSelected ? item.color : "#2A2A3C" }, isSelected && { backgroundColor: item.color + "22" }]}
                >
                  <Text style={[styles.interestText, { color: isSelected ? item.color : "#8A90AF" }]}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionTitle}>GENDER</Text>
          <View style={styles.rowWrap}>
            {GENDERS.map(g => (
              <TouchableOpacity 
                key={g}
                onPress={() => setSelectedGender(g)}
                style={[styles.genderPill, selectedGender === g && styles.genderActive]}
              >
                <Text style={[styles.genderText, selectedGender === g && styles.genderTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={styles.applyBtnText}>Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.resetText}>Reset All</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.7)" },
  backdrop: { ...StyleSheet.absoluteFillObject },
  sheet: { backgroundColor: "#161622", borderTopLeftRadius: 35, borderTopRightRadius: 35, paddingHorizontal: 25, maxHeight: height * 0.85 },
  handle: { width: 45, height: 5, backgroundColor: "#2A2A3C", borderRadius: 3, alignSelf: "center", marginVertical: 15 },
  scrollContent: { paddingBottom: 40 },
  title: { color: "#FFFFFF", fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  sectionTitle: { color: "#8A90AF", fontSize: 13, fontWeight: "bold", marginTop: 25, marginBottom: 15 },
  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  ageCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#1D1D2B", justifyContent: "center", alignItems: "center", borderWidth: 1.5, borderColor: "#2A2A3C" },
  ageCircleActive: { borderColor: "#3EFFD2", backgroundColor: "rgba(62, 255, 210, 0.1)" },
  ageText: { color: "#8A90AF", fontSize: 15 },
  ageTextActive: { color: "#3EFFD2", fontWeight: "bold" },
  rangeLabel: { color: "#8A90AF", fontSize: 14, marginVertical: 15 },
  interestPill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25, borderWidth: 2, backgroundColor: "#1D1D2B" },
  interestText: { fontWeight: "bold", fontSize: 14 },
  genderPill: { paddingHorizontal: 22, paddingVertical: 12, borderRadius: 25, backgroundColor: "#1D1D2B", borderWidth: 1.5, borderColor: "#2A2A3C" },
  genderActive: { borderColor: "#3EFFD2", backgroundColor: "rgba(62, 255, 210, 0.1)" },
  genderText: { color: "#8A90AF", fontSize: 15 },
  genderTextActive: { color: "#3EFFD2", fontWeight: "bold" },
  applyBtn: { backgroundColor: "#3EFFD2", borderRadius: 25, paddingVertical: 18, alignItems: "center", marginTop: 40 },
  applyBtnText: { color: "#04051B", fontSize: 18, fontWeight: "bold" },
  resetBtn: { paddingVertical: 20, alignItems: "center" },
  resetText: { color: "#FF4D4D", fontSize: 15, fontWeight: "bold" }, // Reset text red kar diya taake clear dikhe
});