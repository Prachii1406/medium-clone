import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { EmptyState } from '@/components/EmptyState';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

const FILTER_TABS = ['Writers and publications', 'Topics'];

export default function FollowingScreen() {
  const [activeFilter, setActiveFilter] = useState(0);
  const { colors, activeTheme } = useTheme();

  const renderFilterTabs = () => (
    <View style={[styles.filterContainer, { borderBottomColor: colors.border }]}>
      {FILTER_TABS.map((tab, index) => {
        const isActive = activeFilter === index;
        return (
          <Pressable
            key={tab}
            style={[
              styles.filterTab,
              { borderColor: colors.text.secondary },
              isActive && { backgroundColor: colors.text.primary, borderColor: colors.text.primary }
            ]}
            onPress={() => setActiveFilter(index)}
          >
            <Text style={[
              styles.filterText,
              { color: colors.text.secondary },
              isActive && { color: colors.background }
            ]}>
              {tab}
            </Text>
          </Pressable>
        );
      })}
      <Pressable style={[styles.addButton, { borderColor: colors.text.secondary }]}>
        <Ionicons name="add" size={24} color={colors.text.primary} />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Following</Text>
      </View>

      {renderFilterTabs()}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.duration(400).delay(200)}
          exiting={FadeOutUp.duration(300)}
        >
          <EmptyState
            title="No stories yet"
            message="Once a writer or publication you follow publishes a recent story, you'll see it here."
            actionText="See suggestions"
            onActionPress={() => console.log('See suggestions pressed')}
          />
        </Animated.View>
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