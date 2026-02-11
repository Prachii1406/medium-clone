import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { ArticleCard } from '@/components/ArticleCard';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY, DUMMY_ARTICLES } from '@/constants';
import { router } from 'expo-router';

const TOPIC_TAGS = [
  'Self Improvement',
  'Cryptocurrency',
  'Writing',
  'Technology',
  'Design',
  'Business',
  'Productivity',
  'AI',
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { colors, activeTheme } = useTheme();

  const trendingArticles = DUMMY_ARTICLES.slice(0, 2);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <StatusBar
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>Explore</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text.primary }]}
            placeholder="Search Medium"
            placeholderTextColor={colors.text.secondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Topic Tags */}
        <View style={styles.topicsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topicsScroll}
          >
            {TOPIC_TAGS.map((tag, index) => (
              <MotiView
                key={tag}
                from={{ opacity: 0, translateY: 12 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'timing',
                  duration: 400,
                  delay: index * 50,
                }}
              >
                <MotiPressable
                  style={[
                    styles.topicTag,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.topicText, { color: colors.text.secondary }]}>
                    {tag}
                  </Text>
                </MotiPressable>
              </MotiView>
            ))}
          </ScrollView>
        </View>

        {/* Trending Section */}
        <View style={styles.trendingSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Trending on Medium
          </Text>

          {trendingArticles.map((article, index) => (
            <MotiView
              key={article.id}
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 400,
                delay: 200 + index * 100,
              }}
            >
              <View style={styles.trendingItem}>
                <View style={styles.trendingNumber}>
                  <Text
                    style={[
                      styles.trendingNumberText,
                      { color: colors.text.secondary },
                    ]}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>

                <View style={styles.trendingContent}>
                  <View style={styles.trendingHeader}>
                    <View
                      style={[
                        styles.trendingAvatar,
                        { backgroundColor: colors.accent },
                      ]}
                    >
                      <Text style={styles.trendingAvatarText}>
                        {article.collection?.icon || '📝'}
                      </Text>
                    </View>

                    <View style={styles.trendingMeta}>
                      <Text
                        style={[
                          styles.trendingAuthor,
                          { color: colors.text.secondary },
                        ]}
                      >
                        In {article.collection?.name || 'General'} by
                      </Text>
                      <Text
                        style={[
                          styles.trendingAuthorName,
                          { color: colors.text.primary },
                        ]}
                      >
                        {article.author.name}
                      </Text>
                    </View>
                  </View>

                  <MotiPressable
                    onPress={() => router.push(`/article?id=${article.id}`)}
                  >
                    <Text
                      style={[
                        styles.trendingTitle,
                        { color: colors.text.primary },
                      ]}
                    >
                      {article.title}
                    </Text>
                  </MotiPressable>

                  {article.thumbnail && (
                    <View style={styles.trendingImageContainer}>
                      <View
                        style={[
                          styles.trendingImage,
                          { backgroundColor: colors.surface },
                        ]}
                      />
                    </View>
                  )}

                  <Text
                    style={[
                      styles.trendingDate,
                      { color: colors.text.secondary },
                    ]}
                  >
                    {article.date}
                  </Text>
                </View>
              </View>
            </MotiView>
          ))}
        </View>

        {/* Recommended */}
        <View style={styles.recommendedSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Recommended for you
          </Text>
          {DUMMY_ARTICLES.slice(2, 5).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onPress={() => router.push(`/article?id=${article.id}`)}
            />
          ))}
        </View>
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
  searchContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    borderRadius: 24,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  topicsSection: {
    paddingVertical: SPACING.md,
  },
  topicsScroll: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  topicTag: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
  },
  topicText: {
    fontSize: 14,
    fontWeight: '500',
  },
  trendingSection: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: 20,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  trendingItem: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  trendingNumber: {
    width: 32,
  },
  trendingNumberText: {
    fontSize: 28,
    fontWeight: '300',
  },
  trendingContent: {
    flex: 1,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  trendingAvatar: {
    width: 24,
    height: 24,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xs,
  },
  trendingAvatarText: {
    fontSize: 12,
  },
  trendingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendingAuthor: {
    fontSize: 13,
  },
  trendingAuthorName: {
    fontSize: 13,
    fontWeight: '600',
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: SPACING.sm,
  },
  trendingImageContainer: {
    marginBottom: SPACING.sm,
  },
  trendingImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
  },
  trendingDate: {
    fontSize: 13,
  },
  recommendedSection: {
    paddingTop: SPACING.lg,
  },
});