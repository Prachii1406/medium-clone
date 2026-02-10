import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

interface TabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

export const TabBar = ({ tabs, activeTab, onTabPress }: TabBarProps) => {
  const { colors } = useTheme();

  const layouts = useRef<{ x: number; width: number }[]>([]);
  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  useEffect(() => {
    const layout = layouts.current[activeTab];
    if (layout) {
      translateX.value = withTiming(layout.x, { duration: 180 });
      indicatorWidth.value = withTiming(layout.width, { duration: 180 });
    }
  }, [activeTab]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: indicatorWidth.value,
  }));

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 260 }}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;

          return (
            <View
              key={tab}
              onLayout={(e) => {
                layouts.current[index] = {
                  x: e.nativeEvent.layout.x + SPACING.lg,
                  width: e.nativeEvent.layout.width - SPACING.lg * 2,
                };
              }}
            >
              <MotiPressable
                onPress={() => onTabPress(index)}
                animate={{ scale: isActive ? 1 : 0.96 }}
                transition={{ type: 'timing', duration: 120 }}
                style={styles.tab}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? colors.text.primary : colors.text.secondary },
                  ]}
                >
                  {tab}
                </Text>
              </MotiPressable>
            </View>
          );
        })}
      </View>

      <Animated.View
        style={[
          styles.indicator,
          { backgroundColor: colors.text.primary },
          indicatorStyle,
        ]}
      />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    position: 'relative',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
  },
  tab: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginRight: SPACING.xs,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 1.5,
  },
});
