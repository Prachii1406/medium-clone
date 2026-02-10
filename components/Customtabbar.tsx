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
import { SPACING } from '@/constants';
interface CustomTabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {

  const { colors } = useTheme();

  const layouts = useRef<{ x: number; width: number }[]>([]);
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  useEffect(() => {
    const layout = layouts.current[activeTab];
    if (layout) {
      indicatorX.value = withTiming(layout.x, { duration: 150 });
      indicatorWidth.value = withTiming(layout.width, { duration: 150 });
    }
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
              <MotiPressable
                onPress={() => onTabPress(index)}
                animate={{
                  scale: isActive ? 1 : 0.98,
                }}
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