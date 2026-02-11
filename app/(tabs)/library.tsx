import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

const LIBRARY_TABS = ['Your lists', 'Saved lists', 'Digest', 'Highlights'];

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const { colors, activeTheme } = useTheme();

  /* ---------------- Reading List Card ---------------- */
  const renderReadingList = () => (
    <MotiView
      from={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400, delay: 100 }}
      style={[
        styles.listCard,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.listHeader}>
        <View style={styles.listAuthorInfo}>
          <View style={[styles.listAvatar, { backgroundColor: '#FF6B35' }]}>
            <Text style={styles.listAvatarText}>N</Text>
          </View>
          <Text style={[styles.listAuthor, { color: colors.text.primary }]}>
            Neha Jadhav
          </Text>
        </View>
      </View>

      <Text style={[styles.listTitle, { color: colors.text.primary }]}>
        Reading List
      </Text>

      <View style={styles.listMeta}>
        <View style={styles.listMetaLeft}>
          <Text style={[styles.listMetaText, { color: colors.text.secondary }]}>
            No stories
          </Text>
          <Ionicons
            name="lock-closed"
            size={16}
            color={colors.text.secondary}
            style={{ marginLeft: 6 }}
          />
        </View>

        <View style={styles.listActions}>
          {[ 'arrow-down-circle-outline', 'ellipsis-horizontal' ].map(
            (icon, index) => (
              <MotiPressable
                key={icon}
                accessibilityRole="button"
                style={styles.listAction}
                animate={({ pressed }) => ({
                  scale: pressed ? 0.9 : 1,
                  opacity: pressed ? 0.7 : 1,
                })}
                transition={{ duration: 120 }}
              >
                <Ionicons
                  name={icon as any}
                  size={24}
                  color={colors.text.primary}
                />
              </MotiPressable>
            )
          )}
        </View>
      </View>

      <View style={styles.thumbnailGrid}>
        {[0, 1, 2].map((_, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 80, duration: 300 }}
            style={[styles.thumbnail, { backgroundColor: colors.surface }]}
          />
        ))}
      </View>
    </MotiView>
  );

  /* ---------------- Content Switch ---------------- */
  const renderContent = () => {
    if (activeTab === 0) {
      return <View style={styles.content}>{renderReadingList()}</View>;
    }

    const emptyMessages = [
      'No saved lists yet',
      'No digest stories yet',
      'No highlights yet',
    ];

    return (
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 250 }}
        style={styles.emptyState}
      >
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          {emptyMessages[activeTab - 1]}
        </Text>
      </MotiView>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <StatusBar
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      {/* ---------------- Header ---------------- */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          Your library
        </Text>

        <MotiPressable
          accessibilityRole="button"
          style={[styles.newListButton, { backgroundColor: '#0F9D58' }]}
          animate={({ pressed }) => ({
            scale: pressed ? 0.94 : 1,
          })}
          transition={{ duration: 120 }}
        >
          <Text style={styles.newListText}>New list</Text>
        </MotiPressable>
      </View>

      {/* ---------------- Tabs ---------------- */}
      <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {LIBRARY_TABS.map((tab, index) => {
            const isActive = activeTab === index;

            return (
              <MotiPressable
                key={tab}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                onPress={() => setActiveTab(index)}
                animate={({ pressed }) => ({
                  scale: pressed ? 0.92 : 1,
                })}
                transition={{ duration: 120 }}
                style={styles.tab}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isActive
                        ? colors.text.primary
                        : colors.text.secondary,
                    },
                  ]}
                >
                  {tab}
                </Text>

                {isActive && (
                  <MotiView
                    from={{ scaleX: 0.6, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 180 }}
                    style={[
                      styles.tabIndicator,
                      { backgroundColor: colors.text.primary },
                    ]}
                  />
                )}
              </MotiPressable>
            );
          })}
        </ScrollView>
      </View>

      {/* ---------------- Content ---------------- */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    paddingTop: SPACING.lg,
    paddingLeft: SPACING.lg,
  },
  title: { ...TYPOGRAPHY.h1 },
  newListButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: 24,
  },
  newListText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tabsContainer: { borderBottomWidth: 1 },
  tabsScroll: { paddingHorizontal: SPACING.md },
  tab: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    marginRight: SPACING.md,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: SPACING.xl },
  content: { paddingTop: SPACING.lg },
  listCard: {
    marginHorizontal: SPACING.md,
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  listAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xs,
  },
  listAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  listAuthor: {
    fontSize: 14,
    fontWeight: '500',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  listMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  listMetaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listMetaText: {
    fontSize: 14,
  },
  listActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  listAction: {
    padding: SPACING.xs,
  },
  thumbnailGrid: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  thumbnail: {
    flex: 1,
    height: 80,
    borderRadius: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 3,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
  },
});
