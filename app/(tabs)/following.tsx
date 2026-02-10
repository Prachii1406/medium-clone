import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState } from '@/components/EmptyState';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

const FILTER_TABS = ['Writers and publications', 'Topics'];

export default function FollowingScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const { colors, activeTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Following</Text>
      </View>

      <View style={[styles.filterContainer, { borderBottomColor: colors.border }]}>
        {FILTER_TABS.map((tab, index) => {
          const isActive = activeFilter === index;

          return (
            <MotiPressable
              key={tab}
              onPress={() => setActiveFilter(index)}
              animate={{
                scale: isActive ? 1 : 0.96,
                backgroundColor: isActive ? colors.text.primary : 'transparent',
              }}
              transition={{ type: 'timing', duration: 150 }}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              style={[
                styles.filterTab,
                { borderColor: isActive ? colors.text.primary : colors.text.secondary },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: isActive ? colors.background : colors.text.secondary },
                ]}
              >
                {tab}
              </Text>
            </MotiPressable>
          );
        })}

        <MotiPressable
          style={[styles.addButton, { borderColor: colors.text.secondary }]}
          animate={{ scale: 0.96 }}
        >
          <Ionicons name="add" size={24} color={colors.text.primary} />
        </MotiPressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          entering={FadeInDown.duration(400).delay(200)}
          exiting={FadeOutUp.duration(300)}
        >
          <EmptyState
            title="No stories yet"
            message="Once a writer or publication you follow publishes a recent story, you'll see it here."
            actionText="See suggestions"
            onActionPress={() => console.log('See suggestions pressed')}
          />
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    paddingTop: SPACING.lg,
     paddingLeft:SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  filterTab: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    marginRight: SPACING.sm,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  filterText: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  addButton: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});