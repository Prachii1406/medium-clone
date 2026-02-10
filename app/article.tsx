import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
} from 'react-native-reanimated';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, DUMMY_ARTICLES } from '@/constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Use MotiPressable for the pressable animated buttons


export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const scrollY = useSharedValue(0);
  const { colors, activeTheme } = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const likeScale = useSharedValue(1);
  const bookmarkScale = useSharedValue(1);

  // Find the article - in real app, this would fetch from API
  const article = DUMMY_ARTICLES.find((a) => a.id === id) || DUMMY_ARTICLES[0];

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const imageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0],
      [1.5, 1],
      Extrapolate.CLAMP
    );
    return { transform: [{ scale }] };
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    likeScale.value = withSpring(1.3, { damping: 10 }, () => {
      likeScale.value = withSpring(1);
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    bookmarkScale.value = withSpring(1.3, { damping: 10 }, () => {
      bookmarkScale.value = withSpring(1);
    });
  };

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const bookmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bookmarkScale.value }],
  }));

  const getColorFromName = (name: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Fixed Header - appears on scroll */}
      <Animated.View
        style={[
          styles.fixedHeader,
          { backgroundColor: colors.background, borderBottomColor: colors.border },
          headerStyle,
        ]}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <Pressable onPress={handleBack} style={styles.headerButton}>
              <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
            </Pressable>
            <View style={styles.headerActions}>
              <Pressable style={styles.headerButton}>
                <Ionicons name="share-outline" size={24} color={colors.text.primary} />
              </Pressable>
              <Pressable style={styles.headerButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color={colors.text.primary} />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        {article.thumbnail && (
          <View style={styles.heroImageContainer}>
            <Animated.Image
              source={{ uri: article.thumbnail }}
              style={[styles.heroImage, imageStyle]}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <SafeAreaView edges={['top']}>
                <View style={styles.topBar}>
                  <Pressable onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                  </Pressable>
                  <View style={styles.topActions}>
                    <Pressable style={styles.iconButton}>
                      <Ionicons name="play-circle" size={32} color="#FFFFFF" />
                    </Pressable>
                    <Pressable style={styles.iconButton}>
                      <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                    </Pressable>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </View>
        )}

        {/* Member Badge */}
        <View style={[styles.memberBadge, { backgroundColor: colors.background }]}>
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text style={[styles.memberText, { color: colors.text.secondary }]}>
            Member-only story
          </Text>
        </View>

        {/* Collection Badge */}
        {article.collection && (
          <View style={styles.collectionContainer}>
            <Text style={[styles.collectionTag, { color: colors.text.secondary }]}>
              {article.collection.name.toUpperCase()}
            </Text>
          </View>
        )}

        {/* Article Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.articleTitle, { color: colors.text.primary }]}>
            {article.title}
          </Text>
          <Text style={[styles.articleSubtitle, { color: colors.text.secondary }]}>
            {article.subtitle}
          </Text>
        </View>

        {/* Meta Information */}
        <View style={styles.metaContainer}>
          <Text style={[styles.metaText, { color: colors.text.secondary }]}>
            8 min read · {article.date}
          </Text>
        </View>

        {/* Author Section */}
        <View style={styles.authorSection}>
          <View style={styles.authorInfo}>
            <View
              style={[
                styles.authorAvatar,
                { backgroundColor: getColorFromName(article.author.name) },
              ]}
            >
              <Text style={styles.avatarText}>
                {article.author.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.authorDetails}>
              <View style={styles.authorNameRow}>
                <Text style={[styles.authorName, { color: colors.text.primary }]}>
                  {article.author.name}
                </Text>
                {article.author.verified && (
                  <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
                )}
              </View>
            </View>
          </View>
          <Pressable style={[styles.followButton, { borderColor: colors.text.primary }]}>
            <Text style={[styles.followButtonText, { color: colors.text.primary }]}>
              Follow
            </Text>
          </Pressable>
        </View>

        {/* Article Content */}
        <View style={styles.contentContainer}>
          <Text style={[styles.contentText, { color: colors.text.primary }]}>
            My Liquid Dilemma
          </Text>
          <Text style={[styles.contentParagraph, { color: colors.text.primary }]}>
            For years, I've been skeptical of design tools that promise to revolutionize
            everything. I've seen them come and go, each claiming to be the "next big thing"
            that would fundamentally change how we work.
          </Text>
          <Text style={[styles.contentParagraph, { color: colors.text.primary }]}>
            When Liquid Glass first launched, I was among the doubters. The concept seemed
            too ambitious, too different from everything we'd learned to trust in our
            design workflows. But I was wrong.
          </Text>
          <Text style={[styles.contentParagraph, { color: colors.text.primary }]}>
            After six months of using it in production, I've come to realize that Liquid
            Glass isn't just another tool — it's a fundamental shift in how we think about
            design systems, component libraries, and the relationship between design and
            development.
          </Text>
          <Text style={[styles.contentParagraph, { color: colors.text.primary }]}>
            Here's what changed my mind, and why I think you should give it a second look
            if you dismissed it like I did.
          </Text>

          {/* Continue reading indicator */}
          <View style={styles.continueReading}>
            <Text style={[styles.continueText, { color: colors.text.secondary }]}>
              Continue reading to discover more...
            </Text>
          </View>
        </View>

        {/* Bottom spacing for action bar */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.actionBar, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        <View style={styles.actionLeft}>
          <View style={styles.reactionGroup}>
              <MotiPressable onPress={handleLike} style={likeAnimatedStyle}>
                <View style={styles.reactionButton}>
                  <Ionicons
                    name={isLiked ? "hand-left" : "hand-left-outline"}
                    size={24}
                    color={isLiked ? colors.accent : colors.text.secondary}
                  />
                  <Text style={[styles.reactionCount, { color: colors.text.secondary }]}>
                    1.4K
                  </Text>
                </View>
              </MotiPressable>
            <Pressable style={styles.reactionButton}>
              <Ionicons name="chatbubble-outline" size={22} color={colors.text.secondary} />
              <Text style={[styles.reactionCount, { color: colors.text.secondary }]}>43</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.actionRight}>
          <MotiPressable onPress={handleBookmark} style={bookmarkAnimatedStyle}>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isBookmarked ? colors.accent : colors.text.secondary}
            />
          </MotiPressable>
          <Pressable style={styles.actionIconButton}>
            <Ionicons name="share-outline" size={24} color={colors.text.secondary} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  headerButton: {
    padding: SPACING.xs,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  heroImageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.4,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
  },
  backButton: {
    padding: SPACING.xs,
  },
  topActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'center',
  },
  iconButton: {
    padding: SPACING.xs,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  memberText: {
    fontSize: 14,
  },
  collectionContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  collectionTag: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  titleContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  articleTitle: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: SPACING.md,
  },
  articleSubtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '400',
  },
  metaContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  metaText: {
    fontSize: 14,
  },
  authorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  authorDetails: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  followButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 24,
    borderWidth: 1,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  contentText: {
    fontSize: 21,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: SPACING.lg,
  },
  contentParagraph: {
    fontSize: 18,
    lineHeight: 32,
    marginBottom: SPACING.lg,
  },
  continueReading: {
    paddingVertical: SPACING.xl,
    alignItems: 'center',
  },
  continueText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
  },
  actionLeft: {
    flex: 1,
  },
  reactionGroup: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reactionCount: {
    fontSize: 14,
  },
  actionRight: {
    flexDirection: 'row',
    gap: SPACING.lg,
    alignItems: 'center',
  },
  actionIconButton: {
    padding: SPACING.xs,
  },
});