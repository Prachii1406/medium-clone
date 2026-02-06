import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { SPACING } from '@/constants';

interface CustomTabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const { colors } = useTheme();
  const tabRefs = useRef<Array<View | null>>([]);
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(60);

  useEffect(() => {
    // Measure the active tab and update indicator
    const activeTabRef = tabRefs.current[activeTab];
    if (activeTabRef) {
      activeTabRef.measure((x, y, width, height, pageX, pageY) => {
        indicatorX.value = withTiming(pageX + 16, { duration: 50});
        indicatorWidth.value = withTiming(width - 32, { duration: 50 });
      });
    }
  }, [activeTab]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  const TabButton = ({ tab, index }: { tab: string; index: number }) => {
    const isActive = activeTab === index;
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      backgroundColor: `rgba(128, 128, 128, ${opacity.value * 0.15})`,
    }));

    const handlePressIn = () => {
      scale.value = withTiming(0.95, { duration: 100 });
      opacity.value = withTiming(1, { duration: 100 });
    };

    const handlePressOut = () => {
      scale.value = withTiming(1, { duration: 100 });
      opacity.value = withTiming(0, { duration: 150 });
    };

    return (
      <AnimatedPressable
        ref={(ref) => {
          tabRefs.current[index] = ref as any;
        }}
        onPress={() => onTabPress(index)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.tab, animatedStyle]}
      >
        <Text
          style={[
            styles.tabText,
            { color: colors.text.secondary },
            isActive && [
              styles.tabTextActive,
              { color: colors.text.primary },
            ],
          ]}
        >
          {tab}
        </Text>
      </AnimatedPressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TabButton key={tab} tab={tab} index={index} />
        ))}
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