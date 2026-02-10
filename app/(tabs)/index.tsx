import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { ArticleCard } from '@/components/ArticleCard';
import { CustomTabBar } from '@/components/Customtabbar';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, DUMMY_ARTICLES } from '@/constants';
import { Article } from '@/types';

const TABS = ['For you', 'Featured'];
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);
  const { colors, activeTheme } = useTheme();

  const forYouArticles = DUMMY_ARTICLES;
  const featuredArticles = DUMMY_ARTICLES.filter((a) => a.featured);
  const displayFeaturedArticles =
    featuredArticles.length > 0 ? featuredArticles : DUMMY_ARTICLES;

  useEffect(() => {
    translateX.value = withTiming(-activeTab * SCREEN_WIDTH, {
      duration: 280,
    });
  }, [activeTab]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderArticle = ({ item }: { item: Article }) => (
    <ArticleCard
      article={item}
      onPress={() => router.push(`/article?id=${item.id}`)}
    />
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <StatusBar
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={[styles.stickyHeader, { backgroundColor: colors.background }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.logo, { color: colors.text.primary }]}>
            Medium
          </Text>
          <MotiPressable style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={colors.text.secondary}
            />
          </MotiPressable>
        </View>

        <CustomTabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabPress={setActiveTab}
        />
      </View>

      {/* Pages */}
      <Animated.View style={[styles.pagesContainer, animatedStyle]}>
        <View style={[styles.page, { width: SCREEN_WIDTH }]}>
          <FlatList
            data={forYouArticles}
            renderItem={renderArticle}
            keyExtractor={(item) => `foryou-${item.id}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.page, { width: SCREEN_WIDTH }]}>
          <FlatList
            data={displayFeaturedArticles}
            renderItem={renderArticle}
            keyExtractor={(item) => `featured-${item.id}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Animated.View>

      <FloatingActionButton onPress={() => console.log('Create new story')} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    paddingTop: SPACING.md,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingLeft:SPACING.lg,
  },
  logo: {
    fontSize: 36,
    fontFamily: 'serif',
    fontWeight: '400',
    letterSpacing: -0.5,
  },
  notificationButton: {
    padding: SPACING.xs,
  },
  pagesContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  page: {},
  listContent: {
    paddingBottom: 100,
  },
});