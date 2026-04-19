import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native"; 
import { COLORS } from "../constants/theme";
import { MOCK_USERS, RADIUS_OPTIONS } from "../constants/mockData";
import { UserAvatar, TagBadge } from "../components/SlipInUI";

const { width, height } = Dimensions.get("window");
const MAP_HEIGHT = height * 0.72;

// globalImage prop yahan receive ho rahi hai
export default function MapScreen({ navigation, route, globalImage }) {
  const isFocused = useIsFocused();
  const [radius, setRadius] = useState("Neighborhood");
  const [isDark, setIsDark] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRadiusPicker, setShowRadiusPicker] = useState(false);
  
  // Pehle yahan local state aur useEffect tha sync ke liye, 
  // ab uski zaroorat nahi kyunki humein seedha prop mil raha hai.

  const visibleUsers = isDark ? [] : MOCK_USERS;

  return (
    <View style={styles.container}>
      {/* ── Simulated Map Background ── */}
      <View style={styles.mapBg}>
        {/* Grid lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={`h${i}`} style={[styles.gridLine, styles.gridH, { top: (i / 12) * MAP_HEIGHT }]} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <View key={`v${i}`} style={[styles.gridLine, styles.gridV, { left: (i / 8) * width }]} />
        ))}

        {/* Radius circle */}
        <View style={styles.radiusCircle} />

        {/* User pins */}
        {visibleUsers.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={[
              styles.pin,
              {
                left: user.x * width - 28,
                top: user.y * MAP_HEIGHT - 28,
              },
            ]}
            onPress={() => setSelectedUser(user)}
            activeOpacity={0.85}
          >
            <View style={[styles.pinOuter, { borderColor: user.color, shadowColor: user.color }]}>
              <View style={[styles.pinInner, { backgroundColor: user.color + "33" }]}>
                <Text style={[styles.pinInitials, { color: user.color }]}>
                  {user.initials}
                </Text>
              </View>
            </View>
            <View style={[styles.pinTail, { borderTopColor: user.color }]} />
          </TouchableOpacity>
        ))}

        {/* Location label */}
        <View style={styles.locationLabel}>
          <View style={styles.locationDot} />
          <Text style={styles.locationText}>Madison Square Garden Area</Text>
        </View>
      </View>

      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        {/* LOGO */}
        <View style={styles.logoMark}>
          <Image 
            source={require("../assets/images/Slipin-heart.png")} 
            style={styles.logoImage} 
          />
        </View>

        <TouchableOpacity
          style={[styles.darkToggle, isDark && styles.darkToggleActive]}
          onPress={() => setIsDark((d) => !d)}
        >
          <Text style={[styles.darkToggleText, isDark && styles.darkToggleTextActive]}>
            {isDark ? "🌑 Dark" : "👁 Visible"}
          </Text>
        </TouchableOpacity>

        {/* PROFILE: Ab yeh globalImage prop use karega */}
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate("Settings")}
        >
          {globalImage ? (
            <Image source={{ uri: globalImage }} style={styles.topProfileImage} />
          ) : (
            <Image 
              source={require("../assets/images/ProfileLogo.png")} 
              style={[styles.topProfileImage, { width: '95%', height: '95%', resizeMode: 'contain' }]} 
            />
          )}
        </TouchableOpacity>
      </View>

      {/* ... Baki ka Modal aur Bottom Controls code wahi rahega ... */}
      
      {/* ── Nearby badge ── */}
      {!isDark && (
        <View style={styles.nearbyBadge}>
          <View style={styles.nearbyDot} />
          <Text style={styles.nearbyText}>{visibleUsers.length} people nearby</Text>
        </View>
      )}

      {/* ── Dark mode overlay ── */}
      {isDark && (
        <View style={styles.darkOverlay}>
          <Text style={styles.darkOverlayIcon}>🌑</Text>
          <Text style={styles.darkOverlayTitle}>You're invisible</Text>
          <Text style={styles.darkOverlaySubtitle}>Others can't see you on the map</Text>
        </View>
      )}

      {/* ── Bottom Controls ── */}
      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setShowRadiusPicker(true)}
        >
          <Text style={styles.controlIcon}>📍</Text>
          <Text style={styles.controlLabel}>{radius}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => navigation.navigate("Nearby")}
        >
          <Text style={styles.controlIcon}>👥</Text>
          <Text style={styles.controlLabel}>{visibleUsers.length} Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => navigation.navigate("EventBoard")}
        >
          <Text style={styles.controlIcon}>🎉</Text>
          <Text style={styles.controlLabel}>Event Board</Text>
        </TouchableOpacity>
      </View>

      {/* User Preview Modal */}
      <Modal visible={!!selectedUser} transparent animationType="slide">
         <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setSelectedUser(null)}>
           <View style={styles.previewCard}>
             {selectedUser && (
               <>
                 <View style={styles.previewHeader}>
                   <UserAvatar initials={selectedUser.initials} color={selectedUser.color} size={64} online={selectedUser.online} />
                   <View style={styles.previewInfo}>
                     <Text style={styles.previewName}>{selectedUser.name}, {selectedUser.age}</Text>
                     <Text style={styles.previewGender}>{selectedUser.gender}</Text>
                     <Text style={styles.previewDistance}>📍 {selectedUser.distance} away</Text>
                   </View>
                 </View>
                 <Text style={styles.previewBio}>{selectedUser.bio}</Text>
                 <View style={styles.previewTags}>
                   {selectedUser.tags.map(tag => <TagBadge key={tag} label={tag} selected />)}
                 </View>
                 <TouchableOpacity style={styles.messageBtn} onPress={() => { setSelectedUser(null); navigation.navigate("Chat", { userId: selectedUser.id, userName: selectedUser.name }); }}>
                   <Text style={styles.messageBtnText}>💬 Send Message</Text>
                 </TouchableOpacity>
               </>
             )}
           </View>
         </TouchableOpacity>
      </Modal>

      {/* Radius Picker Modal */}
      <Modal visible={showRadiusPicker} transparent animationType="slide">
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowRadiusPicker(false)}>
          <View style={styles.radiusCard}>
            <Text style={styles.radiusTitle}>Visibility Radius</Text>
            {RADIUS_OPTIONS.map((opt) => (
              <TouchableOpacity key={opt.label} style={[styles.radiusOption, radius === opt.label && styles.radiusOptionSelected]} onPress={() => { setRadius(opt.label); setShowRadiusPicker(false); }}>
                <Text style={styles.radiusIcon}>{opt.icon}</Text>
                <View style={styles.radiusTextWrap}>
                  <Text style={[styles.radiusLabel, radius === opt.label && { color: COLORS.neon }]}>{opt.label}</Text>
                  <Text style={styles.radiusSublabel}>{opt.sublabel}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// ... Styles remains the same

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  mapBg: { width: width, height: MAP_HEIGHT, backgroundColor: "#0D1117", overflow: "hidden", position: "relative" },
  gridLine: { position: "absolute", backgroundColor: "rgba(0,245,212,0.04)" },
  gridH: { width: "100%", height: 1 },
  gridV: { height: MAP_HEIGHT, width: 1 },
  radiusCircle: { position: "absolute", width: 260, height: 260, borderRadius: 130, borderWidth: 1, borderColor: "rgba(0,245,212,0.2)", borderStyle: "dashed", left: width / 2 - 130, top: MAP_HEIGHT / 2 - 130 },
  pin: { position: "absolute", alignItems: "center", width: 56, height: 64 },
  pinOuter: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, alignItems: "center", justifyContent: "center", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 8, elevation: 4 },
  pinInner: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  pinInitials: { fontSize: 16, fontWeight: "700" },
  pinTail: { width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6, borderTopWidth: 8, borderLeftColor: "transparent", borderRightColor: "transparent", marginTop: -2 },
  locationLabel: { position: "absolute", bottom: 12, left: 16, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 6 },
  locationDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.pink },
  locationText: { color: COLORS.text, fontSize: 12, fontWeight: "500" },
  topBar: { position: "absolute", top: 48, left: 0, right: 0, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12 },
  logoMark: { width: 42, height: 42, borderRadius: 12, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.neon + "44", alignItems: "center", justifyContent: "center", overflow: 'hidden' },
  logoImage: { width: '80%', height: '80%', resizeMode: 'contain' },
  darkToggle: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, borderWidth: 1, borderColor: COLORS.border, alignItems: "center" },
  darkToggleActive: { borderColor: COLORS.purple, backgroundColor: "rgba(180,79,255,0.15)" },
  darkToggleText: { color: COLORS.text, fontSize: 13, fontWeight: "600" },
  darkToggleTextActive: { color: COLORS.purple },
  profileBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.neon, alignItems: "center", justifyContent: "center", overflow: 'hidden' },
  topProfileImage: { width: 42, height: 42, borderRadius: 21 },
  nearbyBadge: { position: "absolute", top: 100, left: 16, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(0,0,0,0.75)", borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, gap: 6, borderWidth: 1, borderColor: COLORS.border },
  nearbyDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: COLORS.neon },
  nearbyText: { color: COLORS.text, fontSize: 12, fontWeight: "600" },
  darkOverlay: { position: "absolute", top: MAP_HEIGHT / 2 - 60, left: 0, right: 0, alignItems: "center" },
  darkOverlayIcon: { fontSize: 36, marginBottom: 8 },
  darkOverlayTitle: { color: COLORS.purple, fontSize: 18, fontWeight: "700", marginBottom: 4 },
  darkOverlaySubtitle: { color: COLORS.muted, fontSize: 13 },
  bottomControls: { flexDirection: "row", backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border, paddingVertical: 12, paddingHorizontal: 8 },
  controlBtn: { flex: 1, alignItems: "center", paddingVertical: 8, borderRadius: 12, gap: 4 },
  controlIcon: { fontSize: 20 },
  controlLabel: { color: COLORS.muted, fontSize: 11, fontWeight: "600" },
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  previewCard: { backgroundColor: COLORS.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1, borderColor: COLORS.border, padding: 24, paddingBottom: 40 },
  previewHeader: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 16 },
  previewInfo: { flex: 1 },
  previewName: { color: COLORS.text, fontSize: 20, fontWeight: "700" },
  previewGender: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
  previewDistance: { color: COLORS.neon, fontSize: 12, marginTop: 4 },
  previewBio: { color: COLORS.muted, fontSize: 14, lineHeight: 20, marginBottom: 16 },
  previewTags: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  messageBtn: { backgroundColor: COLORS.neon, borderRadius: 14, paddingVertical: 14, alignItems: "center" },
  messageBtnText: { color: COLORS.bg, fontSize: 15, fontWeight: "700" },
  radiusCard: { backgroundColor: COLORS.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1, borderColor: COLORS.border, padding: 24, paddingBottom: 40 },
  radiusTitle: { color: COLORS.text, fontSize: 18, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  radiusOption: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, padding: 14, marginBottom: 10, gap: 14 },
  radiusOptionSelected: { borderColor: COLORS.neon, backgroundColor: "rgba(0,245,212,0.08)" },
  radiusIcon: { fontSize: 24 },
  radiusTextWrap: { flex: 1 },
  radiusLabel: { color: COLORS.text, fontSize: 15, fontWeight: "600" },
  radiusSublabel: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  radiusCheck: { width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.neon },
});