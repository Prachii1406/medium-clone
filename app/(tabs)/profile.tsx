import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import {MotiPressable} from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { ProfileHeader } from '@/components/ProfileHeader';
import { TabBar } from '@/components/TabBar';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY, DUMMY_PROFILE } from '@/constants';
import { ScrollView } from 'react-native';

const PROFILE_TABS = ['Stories', 'Lists', 'About'];
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);
  const { colors, activeTheme } = useTheme();

  useEffect(() => {
    translateX.value = withTiming(-activeTab * SCREEN_WIDTH, { duration: 250 });
  }, [activeTab]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const renderDraftStory = () => (
    <MotiView
      entering={FadeInDown.duration(400).delay(100)}
      style={[
        styles.draftCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.draftHeader}>
        <View style={styles.draftInfo}>
          <View style={[styles.draftAvatar, { backgroundColor: colors.accent }]}>
            <Text style={[styles.draftAvatarText, { color: colors.background }]}>
              {DUMMY_PROFILE.name.charAt(0)}
            </Text>
          </View>
          <Text style={[styles.draftAuthor, { color: colors.text.primary }]}>
            {DUMMY_PROFILE.name}
          </Text>
        </View>
        <MotiPressable style={styles.draftMenu}>
          <Ionicons
            name="ellipsis-vertical"
            size={20}
            color={colors.text.secondary}
          />
        </MotiPressable>
      </View>
      <Text style={[styles.draftTitle, { color: colors.text.primary }]}>Untitled story</Text>
    </MotiView>
  );

  const renderStoriesContent = () => (
    <View style={styles.storiesContent}>
      <View style={styles.draftSection}>
        <MotiPressable style={styles.draftHeaderRow}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Draft</Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color={colors.text.primary}
          />
        </MotiPressable>
        {renderDraftStory()}
      </View>
    </View>
  );

  const renderListsContent = () => (
    <View style={styles.emptyContent}>
      <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
        No lists yet
      </Text>
    </View>
  );

  const renderAboutContent = () => (
    <View style={styles.aboutContent}>
      <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
        Tell readers about yourself
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar 
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'} 
        backgroundColor={colors.background} 
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <ProfileHeader
          profile={DUMMY_PROFILE}
          onEditPress={() => console.log('Edit profile')}
          onStatsPress={() => console.log('View stats')}
          onSettingsPress={handleSettingsPress}
        />

        <View style={[styles.tabBarWrapper, { backgroundColor: colors.background }]}>
          <TabBar
            tabs={PROFILE_TABS}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
        </View>

        <MotiView style={[styles.pagesContainer, animatedStyle]}>
          {/* Stories Page */}
          <View style={[styles.page, { width: SCREEN_WIDTH }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderStoriesContent()}
            </ScrollView>
          </View>

          {/* Lists Page */}
          <View style={[styles.page, { width: SCREEN_WIDTH }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderListsContent()}
            </ScrollView>
          </View>

          {/* About Page */}
          <View style={[styles.page, { width: SCREEN_WIDTH }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderAboutContent()}
            </ScrollView>
          </View>
        </MotiView>
      </ScrollView>

      <FloatingActionButton onPress={() => console.log('Create new story')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  tabBarWrapper: {},
  pagesContainer: {
    flexDirection: 'row',
    minHeight: 400,
  },
  page: {
    // Width is set inline
  },
  storiesContent: {
    flex: 1,
  },
  draftSection: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
  },
  draftCard: {
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
  },
  draftHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  draftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  draftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  draftAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  draftAvatarText: {
    fontSize: 16,
    fontWeight: '600',
  },
  draftAuthor: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  draftMenu: {
    padding: SPACING.xs,
  },
  draftTitle: {
    ...TYPOGRAPHY.h3,
  },
  emptyContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  aboutContent: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
    paddingHorizontal: SPACING.md,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
  },
});