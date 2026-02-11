import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
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
  const [indicatorX, setIndicatorX] = useState(0);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  useEffect(() => {
    const layout = layouts.current[activeTab];
    if (layout) {
      setIndicatorX(layout.x);
      setIndicatorWidth(layout.width);
    }
  }, [activeTab]);

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 200 }}
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
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                {(interaction) => (
                  <MotiView
                    animate={{
                      scale: interaction.value.pressed
                        ? 0.94
                        : isActive
                        ? 1
                        : 0.96,
                      opacity: isActive ? 1 : 0.65,
                    }}
                    transition={{ type: 'timing', duration: 100 }}
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

      {/* Indicator */}
      <MotiView
        animate={{
          translateX: indicatorX,
          width: indicatorWidth,
        }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 180,
        }}
        style={[
          styles.indicator,
          { backgroundColor: colors.text.primary },
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
    borderRadius: 999,
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
    height: 3,
    borderRadius: 999,
  },
});
