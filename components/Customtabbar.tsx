import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { useTheme } from '@/context/ThemeContext';
import { SPACING } from '@/constants';

interface CustomTabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

export const CustomTabBar = ({
  tabs,
  activeTab,
  onTabPress,
}: CustomTabBarProps) => {
  const { colors } = useTheme();

  const layouts = useRef<{ x: number; width: number }[]>([]);
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const prevTab = useRef<number>(activeTab);
  
  useEffect(() => {
    const layout = layouts.current[activeTab];
    if (!layout) return;

    const distance = Math.abs(activeTab - prevTab.current);

    indicatorX.value = withSpring(layout.x, {
      damping: distance > 1 ? 14 : 18,
      stiffness: 180,
    });

    indicatorWidth.value = withSpring(layout.width, {
      damping: 18,
    });

    prevTab.current = activeTab;
  }, [activeTab]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;

          return (
            <View
              key={tab}
              onLayout={(e) => {
                layouts.current[index] = {
                  x: e.nativeEvent.layout.x + 16,
                  width: e.nativeEvent.layout.width - 32,
                };
              }}
            >
              <MotiPressable onPress={() => onTabPress(index)}>
                {(interaction) => (
                  <MotiView
                    animate={{
                      scale: interaction.value.pressed
                        ? 0.94
                        : isActive
                        ? 1
                        : 0.98,
                      opacity: isActive ? 1 : 0.65,
                    }}
                    transition={{ type: 'timing', duration: 90 }}
                    style={styles.tab}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        { color: colors.text.primary },
                      ]}
                    >
                      {tab}
                    </Text>
                  </MotiView>
                )}
              </MotiPressable>
            </View>
          );
        })}
      </View>

      <Animated.View
        style={[
          styles.slidingIndicator,
          { backgroundColor: colors.text.primary },
          indicatorStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    gap: 0,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: SPACING.xs,
    position: 'relative',
    borderRadius: 20,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  tabTextActive: {
    fontWeight: '500',
  },
  slidingIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 1.5,
  },
});