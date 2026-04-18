import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native"; 
import { COLORS } from "../constants/theme"; 
import { UserAvatar } from "../components/SlipInUI";

export default function SettingsScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  
  // --- States ---
  const [userName, setUserName] = useState("Ahmad Kamal");
  const [userEmail, setUserEmail] = useState("ahmad@slipin.app");
  const [userTags, setUserTags] = useState("Developer · Creative · Tech");
  const [userImage, setUserImage] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [currentRadius, setCurrentRadius] = useState("Neighborhood");
  
  // Filters ki state (Default values)
  const [activeFilters, setActiveFilters] = useState("Age, Interest, Here For");

  useEffect(() => {
    // 1. Radius update
    if (route.params?.selectedRadius) {
      setCurrentRadius(route.params.selectedRadius);
    }

    // 2. Profile update
    if (route.params?.updatedProfile) {
      const { name, email, tags, image } = route.params.updatedProfile;
      if (name) setUserName(name);
      if (email) setUserEmail(email);
      if (tags) setUserTags(tags);
      if (image) setUserImage(image);
    }

    // 3. Filters update (Jab Filter page se wapis aayein)
    if (route.params?.appliedFilters) {
      setActiveFilters(route.params.appliedFilters);
    }
  }, [route.params, isFocused]);

  const CustomDivider = () => <View style={styles.divider} />;

  const CustomSectionHeader = ({ title }) => (
    <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
  );

  const SettingRow = ({ icon, label, value, onPress, rightElement, danger = false }) => (
    <TouchableOpacity 
      style={styles.settingRow} 
      onPress={onPress} 
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !rightElement}
    >
      <Text style={styles.settingIcon}>{icon}</Text>
      <Text style={[styles.settingLabel, danger && { color: "#FF4444" }]}>{label}</Text>
      <View style={styles.settingRight}>
        {value ? <Text style={styles.settingValue} numberOfLines={1}>{value}</Text> : null}
        {rightElement}
        {onPress && !rightElement && <Text style={styles.settingArrow}>›</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Card */}
        <TouchableOpacity 
          style={styles.profileCard} 
          onPress={() => navigation.navigate("ProfileSetup", {
            currentName: userName,
            currentEmail: userEmail,
            currentTags: userTags,
            currentImage: userImage
          })}
        >
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.profileImg} />
              ) : (
                <UserAvatar initials={userName.charAt(0)} color={COLORS.neon} size={60} online={false} />
              )}
            </View>
            {/* Online Indicator: Hides when Go Dark is ON */}
            {!isDark && <View style={styles.onlineDot} />}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
            <Text style={styles.profileTags}>{userTags}</Text>
          </View>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        {/* Visibility Section */}
        <View style={styles.section}>
          <CustomSectionHeader title="Visibility" />
          <View style={styles.sectionCard}>
            <SettingRow
              icon="👁"
              label="Go Dark"
              rightElement={
                <Switch
                  value={isDark}
                  onValueChange={setIsDark}
                  trackColor={{ false: "#333", true: "#00FF9D66" }}
                  thumbColor={isDark ? "#00FF9D" : "#888"}
                />
              }
            />
            <CustomDivider />
            <SettingRow
              icon="🌑"
              label="Dark Zones"
              value="Manage"
              onPress={() => navigation.navigate("DarkZones")}
            />
            <CustomDivider />
            <SettingRow
              icon="👻"
              label="Ghost Delay"
              value="15 min"
              onPress={() => navigation.navigate("GhostDelay")}
            />
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.section}>
          <CustomSectionHeader title="Location" />
          <View style={styles.sectionCard}>
            <SettingRow
              icon="📍"
              label="Radius Level"
              value={currentRadius}
              onPress={() => navigation.navigate("VisibilityRadius", { currentRadius })}
            />
          </View>
        </View>

        {/* Discovery Section */}
        <View style={styles.section}>
          <CustomSectionHeader title="Discovery" />
          <View style={styles.sectionCard}>
            <SettingRow
              icon="🎯"
              label="Filters"
              value={activeFilters}
              onPress={() => navigation.navigate("FilterModal", { activeFilters })}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <CustomSectionHeader title="Account" />
          <View style={styles.sectionCard}>
            <SettingRow icon="📧" label="Email" value={userEmail} />
            <CustomDivider />
            <SettingRow icon="🔒" label="Change Password" onPress={() => {}} />
            <CustomDivider />
            <SettingRow icon="🗑️" label="Delete Account" onPress={() => {}} danger />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>SlipIn · Maybe Meet Now</Text>
          <Text style={styles.footerSub}>Made with Love by OSA</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0A0F" },
  scroll: { paddingBottom: 40 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: "700", color: "#FFFFFF" },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#1A1A24",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333333",
  },
  avatarWrapper: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  profileImg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00FF9D',
    borderWidth: 2,
    borderColor: '#1A1A24',
  },
  profileInfo: { flex: 1, marginLeft: 14 },
  profileName: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  profileEmail: { color: "#888888", fontSize: 13, marginTop: 2 },
  profileTags: { fontSize: 11, color: "#00FF9D", marginTop: 4 },
  editText: { fontSize: 14, color: "#00FF9D", fontWeight: "600" },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionTitle: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  settingIcon: { fontSize: 20, width: 30, marginRight: 10, textAlign: "center" },
  settingLabel: { flex: 1, fontSize: 15, color: "#FFFFFF", fontWeight: "500" },
  settingRight: { flexDirection: "row", alignItems: "center", gap: 8, maxWidth: '60%' },
  settingValue: { color: "#888888", fontSize: 14 },
  settingArrow: { color: "#888888", fontSize: 20 },
  divider: { height: 1, backgroundColor: "#333333", marginVertical: 2 },
  logoutBtn: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF4444",
    alignItems: "center",
  },
  logoutText: { color: "#FF4444", fontSize: 16, fontWeight: "600" },
  footer: { alignItems: "center", paddingVertical: 24 },
  footerText: { fontSize: 13, color: "#888888" },
  footerSub: { fontSize: 11, color: "#333333", marginTop: 4 },
});