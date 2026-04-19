import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { COLORS } from "../constants/theme";

// Android par animations enable karne ke liye
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

const SLIDES = [
  { id: "1", icon: "📍", title: "Discover People Nearby", subtitle: "See who's around you in real time. SlipIn puts real people on the map.", accent: COLORS.neon },
  { id: "2", icon: "🔒", title: "Control Your Privacy", subtitle: "Set your visibility radius from building-level to city-wide. Create Dark Zones.", accent: COLORS.purple },
  { id: "3", icon: "⚡", title: "Meet Safely & Instantly", subtitle: "Browse profiles, send a message, and meet up. No swiping. No waiting.", accent: COLORS.pink },
  { id: "4", icon: "💫", title: "Maybe Meet Now", subtitle: "Life is short. The best connections happen in the moment. Spontaneous is unforgettable.", accent: COLORS.neon },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const nextIndex = currentIndex + 1;
      // Smooth transition animation
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    } else {
      navigation.replace("Login");
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const onScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / width);
    if (newIndex !== currentIndex) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCurrentIndex(newIndex);
    }
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
      <View style={[styles.glow, { backgroundColor: SLIDES[currentIndex].accent }]} />

      <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.replace("Login")}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        style={styles.flatList}
      />

      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === currentIndex 
                ? { backgroundColor: SLIDES[currentIndex].accent, width: 24 } 
                : { backgroundColor: COLORS.border, width: 8 }
            ]}
          />
        ))}
      </View>

      {/* ── ANIMATED FOOTER ── */}
      <View style={styles.footer}>
        {currentIndex > 0 && (
          <TouchableOpacity 
            style={[styles.backBtn, { borderColor: SLIDES[currentIndex].accent + "44" }]} 
            onPress={handleBack}
          >
            <Text style={[styles.backBtnText, { color: SLIDES[currentIndex].accent }]}>Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.nextBtn, 
            { backgroundColor: SLIDES[currentIndex].accent },
            currentIndex === 0 && { width: width - 48 } // Pehle slide par full width
          ]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextBtnText}>
            {currentIndex === SLIDES.length - 1 ? "Get Started" : "Next →"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, alignItems: "center" },
  glow: { position: "absolute", width: 280, height: 280, borderRadius: 140, opacity: 0.08, top: -60, right: -60 },
  skipBtn: { alignSelf: "flex-end", marginTop: 56, marginRight: 24, padding: 8 },
  skipText: { color: COLORS.muted, fontSize: 14, fontWeight: "500" },
  flatList: { flex: 1, width: width },
  slide: { width: width, flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 36 },
  iconCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 1.5, alignItems: "center", justifyContent: "center", marginBottom: 32 },
  icon: { fontSize: 44 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  subtitle: { color: COLORS.muted, fontSize: 15, textAlign: "center", lineHeight: 24 },
  dotsRow: { flexDirection: "row", gap: 8, marginBottom: 32 },
  dot: { height: 8, borderRadius: 4 },
  
  footer: {
    flexDirection: "row",
    width: width,
    paddingHorizontal: 24,
    height: 60,
    justifyContent: "center", // Center aligned by default
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: {
    width: 100,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backBtnText: {
    fontSize: 16,
    fontWeight: "600",
  },
  nextBtn: {
    flex: 1, // Baki bachi hui space le lega
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  nextBtnText: {
    color: COLORS.bg,
    fontSize: 16,
    fontWeight: "700",
  },
  bottomSpacer: { height: 24 },
});