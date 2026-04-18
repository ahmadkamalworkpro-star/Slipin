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
      Animated.timing(taglineOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2400);
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
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Maybe Meet Now
      </Animated.Text>

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
    marginBottom: 24,
  },
  logo: {
    width: 180,
    height: 180,
  },
  tagline: {
    color: COLORS.muted,
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: "500",
    textTransform: "uppercase",
    marginBottom: 48,
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
