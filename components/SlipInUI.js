// SlipIn Demo - Shared UI Components
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/theme";

// ─── Neon Button ─────────────────────────────────────────────────────────────
export function NeonButton({ title, onPress, disabled, style, outline }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.neonBtn,
        outline && styles.neonBtnOutline,
        disabled && styles.neonBtnDisabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.neonBtnText,
          outline && styles.neonBtnTextOutline,
          disabled && styles.neonBtnTextDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Dark Input ───────────────────────────────────────────────────────────────
export function DarkInput({ style, ...props }) {
  return (
    <TextInput
      placeholderTextColor={COLORS.muted}
      style={[styles.darkInput, style]}
      {...props}
    />
  );
}

// ─── Tag Badge ────────────────────────────────────────────────────────────────
export function TagBadge({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.tag, selected && styles.tagSelected]}
    >
      <Text style={[styles.tagText, selected && styles.tagTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── User Avatar ─────────────────────────────────────────────────────────────
export function UserAvatar({ initials, color, size = 44, online }) {
  return (
    <View style={{ position: "relative" }}>
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color + "33",
            borderColor: color,
          },
        ]}
      >
        <Text
          style={[
            styles.avatarText,
            { fontSize: size * 0.38, color: color },
          ]}
        >
          {initials}
        </Text>
      </View>
      {online && (
        <View
          style={[
            styles.onlineDot,
            { width: size * 0.28, height: size * 0.28, borderRadius: size * 0.14 },
          ]}
        />
      )}
    </View>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  neonBtn: {
    backgroundColor: COLORS.neon,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: COLORS.neon,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  neonBtnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: COLORS.neon,
    shadowOpacity: 0,
    elevation: 0,
  },
  neonBtnDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  neonBtnText: {
    color: COLORS.bg,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  neonBtnTextOutline: {
    color: COLORS.neon,
  },
  neonBtnTextDisabled: {
    color: COLORS.muted,
  },
  darkInput: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.text,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    marginRight: 8,
    marginBottom: 8,
  },
  tagSelected: {
    borderColor: COLORS.neon,
    backgroundColor: "rgba(0,245,212,0.12)",
  },
  tagText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "500",
  },
  tagTextSelected: {
    color: COLORS.neon,
    fontWeight: "600",
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  avatarText: {
    fontWeight: "700",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.neon,
    borderWidth: 2,
    borderColor: COLORS.bg,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 4,
  },
  sectionHeaderText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
});
