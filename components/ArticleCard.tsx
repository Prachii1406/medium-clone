import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import {MotiPressable} from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { Article } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ArticleCardProps {
  article: Article;
  onPress?: () => void;
}

// Use MotiPressable for pressable animations


export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const { colors } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 });
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withTiming(1, { duration: 150 });
  };

  const getColorFromName = (name: string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const renderAvatar = () => {
    if (!avatarError && article.author.avatar) {
      return (
        <Image
          source={{ uri: article.author.avatar }}
          style={styles.avatar}
          onError={() => setAvatarError(true)}
        />
      );
    }

    return (
      <View style={[styles.avatar, styles.avatarFallback, { backgroundColor: getColorFromName(article.author.name) }]}>
        <Text style={[styles.avatarText, { color: '#FFFFFF' }]}>
          {article.author.name.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  };

  const renderThumbnail = () => {
    if (!article.thumbnail) return null;

    if (!thumbnailError) {
      return (
        <Image
          source={{ uri: article.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
          onError={() => setThumbnailError(true)}
        />
      );
    }

    return (
      <View style={[styles.thumbnail, styles.thumbnailFallback, { backgroundColor: colors.surface }]}>
        <Ionicons name="image-outline" size={32} color={colors.text.secondary} />
      </View>
    );
  };

  return (
    <MotiPressable
      style={[
        styles.container,
        animatedStyle,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <MotiView
        from={{ opacity: 0, translateY: 6 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 280 }}
        style={styles.header}
      >
        <MotiView style={styles.authorContainer}>
          {renderAvatar()}
          <MotiView style={styles.authorInfo}>
            <MotiView style={styles.authorNameRow}>
              <Text style={[styles.authorName, { color: colors.text.primary }]}>
                {article.author.name}
              </Text>
              {article.author.verified && (
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color={colors.accent}
                  style={styles.verifiedIcon}
                />
              )}
            </MotiView>
            {article.collection && (
              <MotiView style={styles.collectionBadge}>
                <Text style={[styles.collectionIcon, { color: colors.text.primary, backgroundColor: colors.accent }]}>
                  {article.collection.icon}
                </Text>
                <Text style={[styles.collectionText, { color: colors.text.secondary }]}>
                  In {article.collection.name}
                </Text>
                <Text style={[styles.collectionBy, { color: colors.text.secondary }]}> by </Text>
                <Text style={[styles.collectionAuthor, { color: colors.text.primary }]}>
                  {article.author.name}
                </Text>
              </MotiView>
            )}
          </MotiView>
        </MotiView>
        <Ionicons name="ellipsis-horizontal" size={20} color={colors.text.secondary} />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 6 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 320 }}
        style={styles.content}
      >
        <MotiView style={styles.textContent}>
          <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={3}>
            {article.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.text.secondary }]} numberOfLines={2}>
            {article.subtitle}
          </Text>
        </MotiView>
        {renderThumbnail()}
      </MotiView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 260 }}
        style={styles.footer}
      >
        <Pressable style={[styles.dislikeButton, { borderColor: colors.text.secondary }]}>
          <Ionicons name="thumbs-down-outline" size={18} color={colors.text.secondary} />
        </Pressable>
        
        <MotiView style={styles.metaContainer}>
          <Text style={[styles.metaText, { color: colors.text.secondary }]}>{article.date}</Text>
          <Ionicons name="hand-left" size={16} color={colors.text.secondary} style={styles.iconSpacing} />
          <Text style={[styles.metaText, { color: colors.text.secondary }]}>
            {formatNumber(article.claps)}
          </Text>
          <Ionicons name="chatbubble" size={16} color={colors.text.secondary} style={styles.iconSpacing} />
          <Text style={[styles.metaText, { color: colors.text.secondary }]}>{article.comments}</Text>
        </MotiView>
      </MotiView>
    </MotiPressable>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
  },
  authorInfo: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  collectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  collectionIcon: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 4,
  },
  collectionText: {
    fontSize: 13,
  },
  collectionBy: {
    fontSize: 13,
  },
  collectionAuthor: {
    fontSize: 13,
  },
  content: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  textContent: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    lineHeight: 22,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  thumbnailFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dislikeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
  },
  iconSpacing: {
    marginLeft: 8,
    marginRight: 4,
  },
});