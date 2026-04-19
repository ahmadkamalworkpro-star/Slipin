import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants/theme";
import { NeonButton, DarkInput, TagBadge } from "../components/SlipInUI";

const GENDERS = ["Man", "Woman", "Non-binary", "Other"];
const HERE_FOR_TAGS = ["Flirt", "Drink", "Slip Away", "Hang Out"];

// setGlobalImage prop receive kar rahe hain
export default function ProfileSetupScreen({ navigation, route, setGlobalImage }) {
  
  const { 
    currentName, currentEmail, currentTags, currentAge, 
    currentGender, currentBio, fromSettings 
  } = route.params || {};

  const [name, setName] = useState(currentName || "");
  const [age, setAge] = useState(currentAge || "");
  const [bio, setBio] = useState(currentBio || "");
  const [gender, setGender] = useState(currentGender || "Other");
  const [email, setEmail] = useState(currentEmail || "");
  const [selectedTags, setSelectedTags] = useState(currentTags ? currentTags.split(" · ") : []);
  const [profileImage, setProfileImage] = useState(null);
  const [step, setStep] = useState(1); 

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Hume gallery access chahiye photo upload karne ke liye.");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Photo select karne mein masla hua.");
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleContinue = () => {
    if (step === 1) {
      if (!name || !age) {
        Alert.alert("Missing Info", "Please enter your name and age.");
        return;
      }
      setStep(2);
    } else {
      // 1. Image ko global state mein update karein
      if (setGlobalImage && profileImage) {
        setGlobalImage(profileImage);
      }

      const userData = {
        name,
        email: email || "user@slipin.app",
        age,
        gender,
        bio,
        tags: selectedTags.join(" · "),
        image: profileImage,
      };

      if (fromSettings) {
        navigation.navigate("Settings", { updatedProfile: userData });
      } else {
        // Naye user ke liye "replace" taake back karne par onboarding dubara na aaye
        navigation.replace("Main"); 
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.glow} />

        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => (step === 2 ? setStep(1) : navigation.goBack())}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          
          <Text style={styles.stepBadge}>Step {step} of 2</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: step === 1 ? "50%" : "100%" }]} />
          </View>
          <Text style={styles.title}>
            {step === 1 ? "Tell us about yourself" : "Add your vibe"}
          </Text>
        </View>

        {step === 1 ? (
          <View style={styles.fieldGroup}>
            <View>
              <Text style={styles.fieldLabel}>Your Name</Text>
              <DarkInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
            <View>
              <Text style={styles.fieldLabel}>Age</Text>
              <DarkInput
                placeholder="Your age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <View>
              <Text style={styles.fieldLabel}>Gender</Text>
              <div style={styles.genderRow}>
                {GENDERS.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderBtn, gender === g && styles.genderBtnSelected]}
                    onPress={() => setGender(g)}
                  >
                    <Text style={[styles.genderText, gender === g && styles.genderTextSelected]}>
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </div>
            </View>
            <View>
              <Text style={styles.fieldLabel}>Short Bio</Text>
              <DarkInput
                placeholder="Tell people something about you..."
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={3}
                style={{ minHeight: 80, textAlignVertical: "top" }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.fieldGroup}>
            <TouchableOpacity style={styles.photoUploadContainer} onPress={pickImage}>
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  key={profileImage}
                  style={styles.uploadedImage} 
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoIcon}>📸</Text>
                  <Text style={styles.photoText}>Click to Upload Photo</Text>
                  <Text style={styles.photoSubtext}>Show the world who you are</Text>
                </View>
              )}
            </TouchableOpacity>

            <View>
              <Text style={styles.fieldLabel}>What I'm Here For</Text>
              <Text style={styles.fieldHint}>Select all that apply</Text>
              <View style={styles.tagsWrap}>
                {HERE_FOR_TAGS.map((tag) => (
                  <TagBadge
                    key={tag}
                    label={tag}
                    selected={selectedTags.includes(tag)}
                    onPress={() => toggleTag(tag)}
                  />
                ))}
              </View>
            </View>
          </View>
        )}

        <NeonButton
          title={
            step === 1 
              ? "Continue →" 
              : (fromSettings ? "Save Changes" : "Get Started! 🚀")
          }
          onPress={handleContinue}
          disabled={step === 1 && (!name || !age)}
          style={styles.btn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ... Styles remains the same

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg || "#0A0A0F" },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  glow: { position: "absolute", width: 280, height: 280, borderRadius: 140, backgroundColor: COLORS.purple || "#8E54E9", opacity: 0.05, top: -60, right: -60 },
  header: { marginBottom: 32 },
  backBtn: { marginBottom: 20 },
  backText: { color: COLORS.muted || "#888", fontSize: 14 },
  stepBadge: { color: COLORS.neon || "#00FF9D", fontSize: 12, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 },
  progressTrack: { height: 3, backgroundColor: COLORS.border || "#333", borderRadius: 2, marginBottom: 20, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: COLORS.neon || "#00FF9D", borderRadius: 2 },
  title: { color: COLORS.text || "#FFF", fontSize: 26, fontWeight: "700", marginBottom: 6 },
  fieldGroup: { gap: 20, marginBottom: 32 },
  fieldLabel: { color: COLORS.text || "#FFF", fontSize: 14, fontWeight: "600", marginBottom: 8 },
  fieldHint: { color: COLORS.muted || "#888", fontSize: 12, marginBottom: 12 },
  genderRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  genderBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: COLORS.border || "#333", backgroundColor: COLORS.card || "#161622" },
  genderBtnSelected: { borderColor: COLORS.neon || "#00FF9D", backgroundColor: "rgba(0,245,212,0.1)" },
  genderText: { color: COLORS.muted || "#888", fontSize: 14, fontWeight: "500" },
  genderTextSelected: { color: COLORS.neon || "#00FF9D", fontWeight: "600" },
  photoUploadContainer: { width: "100%", height: 180, borderRadius: 16, overflow: 'hidden' },
  photoPlaceholder: { flex: 1, backgroundColor: COLORS.card || "#161622", borderRadius: 16, borderWidth: 2, borderColor: COLORS.border || "#333", borderStyle: "dashed", alignItems: "center", justifyContent: "center", gap: 8 },
  uploadedImage: { width: "100%", height: "100%", resizeMode: "cover" },
  photoIcon: { fontSize: 36 },
  photoText: { color: COLORS.text || "#FFF", fontSize: 15, fontWeight: "600" },
  photoSubtext: { color: COLORS.muted || "#888", fontSize: 12 },
  tagsWrap: { flexDirection: "row", flexWrap: "wrap" },
  btn: { marginBottom: 16 },
});