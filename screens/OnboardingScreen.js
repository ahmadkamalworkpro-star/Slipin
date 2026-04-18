import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    icon: "📍",
    title: "Discover People Nearby",
    subtitle:
      "See who's around you in real time. At concerts, bars, stadiums, and festivals — SlipIn puts real people on the map.",
    accent: COLORS.neon,
  },
  {
    id: "2",
    icon: "🔒",
    title: "Control Your Privacy",
    subtitle:
      "Set your visibility radius from building-level to city-wide. Create Dark Zones at home, work, or family locations.",
    accent: COLORS.purple,
  },
  {
    id: "3",
    icon: "⚡",
    title: "Meet Safely & Instantly",
    subtitle:
      "Browse profiles, send a message, and meet up — all in the moment. No swiping. No waiting. Just real connections.",
    accent: COLORS.pink,
  },
  {
    id: "4",
    icon: "💫",
    title: "Maybe Meet Now",
    subtitle:
      "Life is short. The best connections happen in the moment. SlipIn is where spontaneous becomes unforgettable.",
    accent: COLORS.neon,
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((i) => i + 1);
    } else {
      navigation.replace("Login");
    }
  };

  const handleSkip = () => {
    navigation.replace("Login");
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <View style={[styles.iconCircle, { borderColor: item.accent + "55", backgroundColor: item.accent + "15" }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <Text style={[styles.title, { color: item.accent }]}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Ambient glow */}
      <View style={[styles.glow, styles.glow1, { backgroundColor: SLIDES[currentIndex].accent }]} />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.flatList}
      />

      {/* Dot indicators */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex && {
                backgroundColor: SLIDES[currentIndex].accent,
                width: 24,
              },
            ]}
          />
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={[styles.nextBtn, { backgroundColor: SLIDES[currentIndex].accent }]}
        onPress={handleNext}
        activeOpacity={0.85}
      >
        <Text style={styles.nextBtnText}>
          {currentIndex === SLIDES.length - 1 ? "Get Started →" : "Next →"}
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
  },
  glow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    opacity: 0.08,
    top: -60,
    right: -60,
  },
  skipBtn: {
    alignSelf: "flex-end",
    marginTop: 56,
    marginRight: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "500",
  },
  flatList: {
    flex: 1,
    width: width,
  },
  slide: {
    width: width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
    paddingBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  nextBtn: {
    width: width - 48,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  nextBtnText: {
    color: COLORS.bg,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  bottomSpacer: { height: 24 },
});
