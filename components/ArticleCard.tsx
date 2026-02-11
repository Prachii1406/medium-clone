import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { Article } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

interface ArticleCardProps {
  article: Article;
  onPress?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onPress,
}) => {
  const { colors } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const getColorFromName = (name: string) => {
    const palette = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    return palette[name.length % palette.length];
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
      <View
        style={[
          styles.avatar,
          styles.avatarFallback,
          { backgroundColor: getColorFromName(article.author.name) },
        ]}
      >
        <Text style={styles.avatarText}>
          {article.author.name.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  };

  const renderThumbnail = () => {
    if (!article.thumbnail) return null;

    if (!thumbnailError) {
      return (
        <MotiView
          from={{ opacity: 0, translateY: 4 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 220 }}
        >
          <Image
            source={{ uri: article.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
            onError={() => setThumbnailError(true)}
          />
        </MotiView>
      );
    }

    return (
      <View
        style={[
          styles.thumbnail,
          styles.thumbnailFallback,
          { backgroundColor: colors.surface },
        ]}
      >
        <Ionicons
          name="image-outline"
          size={32}
          color={colors.text.secondary}
        />
      </View>
    );
  };

  return (
    <MotiPressable onPress={onPress}>
      {(interaction) => (
        <MotiView
          animate={{
            scale: interaction.value.pressed ? 0.985 : 1,
            opacity: interaction.value.pressed ? 0.92 : 1,
          }}
          transition={{ type: 'timing', duration: 120 }}
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.border,
            },
          ]}
        >
          {/* HEADER — identity */}
          <MotiView
            from={{ opacity: 0, translateY: 4 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 200 }}
            style={styles.header}
          >
            <View style={styles.authorContainer}>
              {/* Avatar = calm, grounded */}
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 180 }}
              >
                {renderAvatar()}
              </MotiView>

              <View style={styles.authorInfo}>
                <View style={styles.authorNameRow}>
                  <Text style={[styles.authorName, { color: colors.text.primary }]}>
                    {article.author.name}
                  </Text>

                  {/* Verified = micro-affirmation */}
                  {article.author.verified && (
                    <MotiView
                      from={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 120, duration: 160 }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color={colors.accent}
                        style={styles.verifiedIcon}
                      />
                    </MotiView>
                  )}
                </View>
              </View>
            </View>

            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color={colors.text.secondary}
            />
          </MotiView>

          {/* CONTENT — reading focus */}
          <MotiView
            from={{ opacity: 0, translateY: 6 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 60, duration: 240 }}
            style={styles.content}
          >
            <View style={styles.textContent}>
              <MotiView
                animate={{
                  opacity: interaction.value.pressed ? 0.85 : 1,
                }}
                transition={{ duration: 120 }}
              >
                <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={3}>
                  {article.title}
                </Text>
              </MotiView>

              <Text
                style={[styles.subtitle, { color: colors.text.secondary }]}
                numberOfLines={2}
              >
                {article.subtitle}
              </Text>
            </View>

            {renderThumbnail()}
          </MotiView>

          {/* FOOTER — secondary info */}
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 120, duration: 200 }}
            style={styles.footer}
          >
            <Pressable
              style={[
                styles.dislikeButton,
                { borderColor: colors.text.secondary },
              ]}
            >
              <Ionicons
                name="thumbs-down-outline"
                size={18}
                color={colors.text.secondary}
              />
            </Pressable>

            <View style={styles.metaContainer}>
              <Text style={[styles.metaText, { color: colors.text.secondary }]}>
                {article.date}
              </Text>
              <Ionicons name="hand-left" size={16} color={colors.text.secondary} style={styles.iconSpacing} />
              <Text style={[styles.metaText, { color: colors.text.secondary }]}>
                {formatNumber(article.claps)}
              </Text>
              <Ionicons name="chatbubble" size={16} color={colors.text.secondary} style={styles.iconSpacing} />
              <Text style={[styles.metaText, { color: colors.text.secondary }]}>
                {article.comments}
              </Text>
            </View>
          </MotiView>
        </MotiView>
      )}
    </MotiPressable>
  );
};

const formatNumber = (num: number): string =>
  num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

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