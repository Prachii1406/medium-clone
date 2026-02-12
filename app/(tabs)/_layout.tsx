import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const renderIcon = (name: string, focused: boolean, color: string) => {
    return (
      <View style={styles.iconWrapper}>
        {/* ---- Glow Ring ---- */}
        <MotiView
          pointerEvents="none"
          from={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: focused ? 1 : 0,
            scale: focused ? 1 : 0.85,
          }}
          transition={{ type: "timing", duration: 220 }}
          style={[
            styles.glowRing,
            {
              backgroundColor:
                colors.background === "#000000"
                  ? "rgba(255,255,255,0.12)"
                  : "transparent",

              shadowColor: colors.text.primary,
            },
          ]}
        />

        {/* ---- Icon Container ---- */}
        <MotiView
          animate={{
            scale: focused ? 1.12 : 1,
            backgroundColor: focused ? colors.surface : "transparent",
          }}
          transition={{
            type: "spring",
            damping: 14,
            stiffness: 180,
          }}
          style={styles.iconContainer}
        >
          <Ionicons name={name as any} size={24} color={color} />
        </MotiView>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.text.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarShowLabel: false,
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? "home" : "home-outline", focused, color),
        }}
      />
      <Tabs.Screen
        name="following"
        options={{
          title: "Following",
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? "people" : "people-outline", focused, color),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? "search" : "search-outline", focused, color),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, focused }) =>
            renderIcon(
              focused ? "bookmark" : "bookmark-outline",
              focused,
              color,
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) =>
            renderIcon(focused ? "person" : "person-outline", focused, color),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },

  glowRing: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,

    // iOS glow
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },

    // Android glow
    elevation: 8,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
