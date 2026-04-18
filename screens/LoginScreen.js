import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/theme";
import { NeonButton, DarkInput } from "../components/SlipInUI";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    // Demo: simulate login delay then navigate to main app
    setTimeout(() => {
      setLoading(false);
      navigation.replace("Main");
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Ambient glow */}
        <View style={styles.glowCircle} />

        {/* Logo — no background box */}
        <View style={styles.logoWrap}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to find who's nearby</Text>

        <View style={styles.fieldGroup}>
          <DarkInput
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <DarkInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <NeonButton
          title={loading ? "Signing In..." : "Sign In"}
          onPress={handleLogin}
          disabled={loading}
          style={styles.btn}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <NeonButton
          title="Create Account"
          onPress={() => navigation.navigate("Signup")}
          outline
          style={styles.signupBtn}
        />

        <Text style={styles.demoNote}>
          Demo mode — any email/password works
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "stretch",
  },
  glowCircle: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: COLORS.neon,
    opacity: 0.06,
    top: -80,
    right: -80,
  },
  logoWrap: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.muted,
    marginBottom: 36,
    textAlign: "center",
  },
  fieldGroup: { gap: 12, marginBottom: 12 },
  errorText: { color: COLORS.error, fontSize: 14, marginBottom: 8 },
  forgotBtn: { alignSelf: "flex-end", marginBottom: 24 },
  forgotText: { color: COLORS.neon, fontSize: 13 },
  btn: { marginBottom: 20 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { color: COLORS.muted, fontSize: 13 },
  signupBtn: { marginBottom: 24 },
  demoNote: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: "center",
    opacity: 0.6,
  },
});
