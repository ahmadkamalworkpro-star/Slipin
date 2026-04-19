import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../constants/theme";

const PRESET_ZONES = [
  { id: "home", icon: "🏠", label: "Home", sublabel: "Your home address", enabled: true },
  { id: "work", icon: "💼", label: "Work", sublabel: "Your workplace", enabled: false },
  { id: "family", icon: "👨‍👩‍👧", label: "Family House", sublabel: "Family member's address", enabled: false },
];

export default function DarkZonesScreen({ navigation }) {
  const [zones, setZones] = useState(PRESET_ZONES);
  const [goDark, setGoDark] = useState(false);

  const toggleZone = (id) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, enabled: !z.enabled } : z))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Dark Zones</Text>
          <Text style={styles.subtitle}>
            Hide your location in selected areas. You won't appear on the map when inside these zones.
          </Text>
        </View>

        {/* Go Dark toggle */}
        <View style={[styles.goDarkCard, goDark && styles.goDarkCardActive]}>
          <View style={styles.goDarkLeft}>
            <Text style={styles.goDarkIcon}>🌑</Text>
            <View>
              <Text style={[styles.goDarkLabel, goDark && { color: COLORS.purple }]}>
                Go Dark Now
              </Text>
              <Text style={styles.goDarkSublabel}>
                {goDark ? "You're invisible everywhere" : "Instantly hide from all users"}
              </Text>
            </View>
          </View>
          <Switch
            value={goDark}
            onValueChange={setGoDark}
            trackColor={{ false: COLORS.border, true: COLORS.purple + "88" }}
            thumbColor={goDark ? COLORS.purple : COLORS.muted}
          />
        </View>

        {/* Preset zones */}
        <Text style={styles.sectionTitle}>PRESET ZONES</Text>
        <View style={styles.zonesCard}>
          {zones.map((zone, index) => (
            <View key={zone.id}>
              <View style={styles.zoneRow}>
                <Text style={styles.zoneIcon}>{zone.icon}</Text>
                <View style={styles.zoneInfo}>
                  <Text style={styles.zoneLabel}>{zone.label}</Text>
                  <Text style={styles.zoneSublabel}>{zone.sublabel}</Text>
                </View>
                <Switch
                  value={zone.enabled}
                  onValueChange={() => toggleZone(zone.id)}
                  trackColor={{ false: COLORS.border, true: COLORS.neon + "88" }}
                  thumbColor={zone.enabled ? COLORS.neon : COLORS.muted}
                />
              </View>
              {index < zones.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Add custom zone */}
        <TouchableOpacity style={styles.addZoneBtn} activeOpacity={0.8}>
          <Text style={styles.addZoneIcon}>+</Text>
          <Text style={styles.addZoneText}>Add Custom Zone</Text>
        </TouchableOpacity>

        {/* Info box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Dark Zones use a 200-meter radius around each address. Your location is never shared while inside a zone, even if location sharing is enabled.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  backBtn: { marginBottom: 16 },
  backText: { color: COLORS.muted, fontSize: 15 },
  title: { color: COLORS.text, fontSize: 26, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: COLORS.muted, fontSize: 14, lineHeight: 20 },
  goDarkCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 28,
    gap: 14,
  },
  goDarkCardActive: {
    borderColor: COLORS.purple,
    backgroundColor: "rgba(180,79,255,0.08)",
  },
  goDarkLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 14 },
  goDarkIcon: { fontSize: 28 },
  goDarkLabel: { color: COLORS.text, fontSize: 16, fontWeight: "700" },
  goDarkSublabel: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  sectionTitle: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  zonesCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginBottom: 16,
  },
  zoneRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  zoneIcon: { fontSize: 22, width: 28, textAlign: "center" },
  zoneInfo: { flex: 1 },
  zoneLabel: { color: COLORS.text, fontSize: 15, fontWeight: "600" },
  zoneSublabel: { color: COLORS.muted, fontSize: 12, marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: 58 },
  addZoneBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,245,212,0.08)",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.neon + "44",
    paddingVertical: 14,
    gap: 8,
    marginBottom: 20,
  },
  addZoneIcon: { color: COLORS.neon, fontSize: 20, fontWeight: "700" },
  addZoneText: { color: COLORS.neon, fontSize: 15, fontWeight: "600" },
  infoBox: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    gap: 10,
  },
  infoIcon: { fontSize: 16 },
  infoText: { flex: 1, color: COLORS.muted, fontSize: 13, lineHeight: 18 },
});
