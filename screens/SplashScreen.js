import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
      // Paragraph thora delay ke baad smoothly show hoga
      Animated.timing(taglineOpacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
    ]).start();

    // Paragraph lamba hai isliye timer thora barha diya hai taake user parh sakay
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 3500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Ambient glows */}
      <View style={[styles.glow, styles.glow1]} />
      <View style={[styles.glow, styles.glow2]} />

      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Image
          source={require("../assets/images/Slipin-Toggle.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* UPDATED: Romantic Paragraph */}
      <Animated.View style={{ opacity: taglineOpacity, paddingHorizontal: 40 }}>
        <Text style={styles.tagline}>
          Forget the endless swipes. Real connections happen in real moments.{"\n"}
          Look around, find the spark, and let the magic of 'now' take over.{"\n"}
          Some stories are meant to be found.
        </Text>
      </Animated.View>

      <View style={styles.dotsRow}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.15,
  },
  glow1: {
    width: 300,
    height: 300,
    backgroundColor: COLORS.neon,
    top: -80,
    right: -80,
  },
  glow2: {
    width: 240,
    height: 240,
    backgroundColor: COLORS.purple,
    bottom: 60,
    left: -80,
  },
  logoWrap: {
    marginBottom: 4, // Space barha di taake text ke liye jagah banay
  },
  logo: {
    width: 160,
    height: 160,
  },
  tagline: {
    color: COLORS.text, // White/Light color for readability
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    textAlign: "center",
    fontStyle: 'italic', // Romantic vibe ke liye
    letterSpacing: 0.3,
    opacity: 0.8,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 8,
    position: "absolute",
    bottom: 60,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    backgroundColor: COLORS.neon,
    width: 20,
    borderRadius: 3,
  },
});