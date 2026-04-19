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
import { DarkInput, TagBadge } from "../components/SlipInUI";

const HERE_FOR_TAGS = ["Flirt", "Drink", "Slip Away", "Hang Out"];

// setGlobalImage prop ab App.js se aa rahi hai
export default function EditProfileScreen({ navigation, route, setGlobalImage }) {
  
  const { 
    currentName, currentEmail, currentTags, currentBio, currentImage 
  } = route.params || {};

  const [name, setName] = useState(currentName || "");
  const [bio, setBio] = useState(currentBio || "");
  const [email, setEmail] = useState(currentEmail || "");
  const [selectedTags, setSelectedTags] = useState(currentTags ? currentTags.split(" · ") : []);
  const [profileImage, setProfileImage] = useState(currentImage || null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Hume gallery access chahiye.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // --- Save Logic (Updated) ---
  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Required", "Name cannot be empty.");
      return;
    }

    // 1. Sab se eham: Global State update karein
    // Is se MapScreen par image foran change ho jayegi
    if (setGlobalImage) {
      setGlobalImage(profileImage);
    }

    const updatedData = {
      name,
      email,
      bio,
      tags: selectedTags.join(" · "),
      image: profileImage,
    };

    // 2. SettingsScreen ko data wapas bhejna
    navigation.navigate("Settings", { updatedProfile: updatedData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerBtnText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.headerBtnText, { color: COLORS.neon || "#00FF9D" }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImg} key={profileImage} />
            ) : (
              <View style={styles.placeholderImg}>
                <Text style={{fontSize: 40}}>👤</Text>
              </View>
            )}
            <View style={styles.editIconBadge}>
              <Text style={{fontSize: 12}}>📸</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.photoHint}>Tap to change photo</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Display Name</Text>
            <DarkInput
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <DarkInput
              placeholder="Tell us about yourself..."
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: 'top', paddingTop: 12 }}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email (Private)</Text>
            <DarkInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vibe / I'm Here For</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (Styles same as before)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0F" },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A24',
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  headerBtnText: { color: '#888', fontSize: 16, fontWeight: '600' },
  scroll: { paddingBottom: 40 },
  photoSection: { alignItems: 'center', marginVertical: 30 },
  imageWrapper: { width: 120, height: 120, borderRadius: 60, position: 'relative' },
  profileImg: { width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: COLORS.neon || "#00FF9D" },
  placeholderImg: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#1A1A24', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#333' },
  editIconBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#333', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#0A0A0F' },
  photoHint: { color: '#888', fontSize: 12, marginTop: 12 },
  form: { paddingHorizontal: 20 },
  inputGroup: { marginBottom: 25 },
  label: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 10, marginLeft: 4 },
  tagsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});