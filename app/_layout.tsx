import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

function RootLayoutContent() {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          presentation: 'card',
          fullScreenGestureEnabled: true,
          contentStyle: { 
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{
            animation: 'none',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="article" 
          options={{
            animation: 'slide_from_right',
            gestureEnabled: true,
            presentation: 'card',
            fullScreenGestureEnabled: true,
            contentStyle: { 
              backgroundColor: 'transparent',
            },
          }}
        />
        <Stack.Screen 
          name="settings" 
          options={{
            animation: 'slide_from_right',
            gestureEnabled: true,
            presentation: 'card',
            fullScreenGestureEnabled: true,
            contentStyle: { 
              backgroundColor: 'transparent',
            },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});