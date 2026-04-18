import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "./constants/theme";

// ── Screen imports ────────────────────────────────────────────────────────────
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import OnboardingQuestionsScreen from "./screens/OnboardingQuestionsScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfileSetupScreen from "./screens/ProfileSetupScreen";
import MapScreen from "./screens/MapScreen";
import NearbyScreen from "./screens/NearbyScreen";
import { ConversationsScreen } from "./screens/ChatScreen";
import ChatScreen from "./screens/ChatScreen";
import EventBoardScreen from "./screens/EventBoardScreen";
import SettingsScreen from "./screens/SettingsScreen";
import DarkZonesScreen from "./screens/DarkZonesScreen";
import GhostDelayScreen from "./screens/GhostDelayScreen";
import VisibilityRadiusScreen from "./screens/VisibilityRadiusScreen";
import FilterModalScreen from "./screens/FilterModalScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ── Tab Icon ──────────────────────────────────────────────────────────────────
function TabIcon({ emoji, label, focused }) {
  return (
    <View style={tabStyles.iconWrap}>
      <Text style={[tabStyles.emoji, focused && tabStyles.emojiFocused]}>{emoji}</Text>
      <Text style={[tabStyles.label, focused && tabStyles.labelFocused]}>{label}</Text>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: { alignItems: "center", paddingTop: 4 },
  emoji: { fontSize: 20, opacity: 0.5 },
  emojiFocused: { opacity: 1 },
  label: { fontSize: 10, color: COLORS.muted, marginTop: 2, fontWeight: "500" },
  labelFocused: { color: COLORS.neon, fontWeight: "700" },
});

// ── Main Tab Navigator ────────────────────────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 72,
          paddingBottom: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🗺️" label="Map" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={NearbyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👥" label="Nearby" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💬" label="Chat" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="EventBoard"
        component={EventBoardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🎉" label="Events" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="⚙️" label="Settings" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ── Root Stack Navigator ──────────────────────────────────────────────────────
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={COLORS.bg} />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.bg },
          animation: "fade",
        }}
      >
        {/* Auth / Onboarding flow */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="OnboardingQuestions"
          component={OnboardingQuestionsScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="ProfileSetup"
          component={ProfileSetupScreen}
          options={{ animation: "slide_from_right" }}
        />

        {/* Main app */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ animation: "fade" }}
        />

        {/* Secondary screens accessible from tabs */}
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="DarkZones"
          component={DarkZonesScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
        name="GhostDelay"
        component={GhostDelayScreen}
        options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
        name="VisibilityRadius"
        component={VisibilityRadiusScreen}
        options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen 
        name="FilterModal" 
        component={FilterModalScreen} 
        options={{ 
        presentation: 'transparentModal', 
        headerShown: false,
        animation: 'slide_from_bottom'
        }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
