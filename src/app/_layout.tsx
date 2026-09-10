import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { LanguageProvider } from "@/context/LanguageContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <LanguageProvider>
      <View style={{ flex: 1 }}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="levels" />
          <Stack.Screen name="game" />
        </Stack>
      </View>
    </LanguageProvider>
  );
}
