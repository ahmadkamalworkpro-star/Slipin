import React, { useState } from "react"; // useState add kiya
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "./constants/theme";

// -- Screen imports --
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
import EditProfileScreen from "./screens/EditProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// -- Tab Icon Component --
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

// -- Main Tab Navigator (Updated to receive props) --
function MainTabs({ navigation, route, globalImage }) {
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
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🗺️" label="Map" focused={focused} />,
        }}
      >
        {/* MapScreen ko globalImage pass kar di */}
        {(props) => <MapScreen {...props} globalImage={globalImage} />}
      </Tab.Screen>

      <Tab.Screen
        name="Nearby"
        component={NearbyScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="👥" label="Nearby" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="💬" label="Chat" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="EventBoard"
        component={EventBoardScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="🎉" label="Events" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" label="Settings" focused={focused} />,
        }}
      >
        {/* SettingsScreen ko bhi image pass kar di (optional, settings wese bhi params se handle kar raha tha) */}
        {(props) => <SettingsScreen {...props} globalImage={globalImage} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// -- Root Stack Navigator --
export default function App() {
  // 1. Global State for Profile Image
  const [globalImage, setGlobalImage] = useState(null);

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
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="OnboardingQuestions"
          component={OnboardingQuestionsScreen}
          options={{ animation: "slide_from_right" }}
        />
        
        {/* ProfileSetupScreen: setGlobalImage pass kiya taake onboarding pe photo save ho sake */}
        <Stack.Screen name="ProfileSetup" options={{ animation: "slide_from_right" }}>
          {(props) => <ProfileSetupScreen {...props} setGlobalImage={setGlobalImage} />}
        </Stack.Screen>

        {/* Main app: globalImage pass kiya taake Tabs (Map) ko mile */}
        <Stack.Screen name="Main" options={{ animation: "fade" }}>
          {(props) => <MainTabs {...props} globalImage={globalImage} />}
        </Stack.Screen>

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

        {/* EditProfile: Yahan se image update hogi to setGlobalImage call hoga */}
        <Stack.Screen name="EditProfile" options={{ animation: "slide_from_right" }}>
          {(props) => <EditProfileScreen {...props} setGlobalImage={setGlobalImage} />}
        </Stack.Screen>

        <Stack.Screen
          name="FilterModal"
          component={FilterModalScreen}
          options={{
            presentation: "transparentModal",
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}