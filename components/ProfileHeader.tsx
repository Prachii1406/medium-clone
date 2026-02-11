import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

type Props = {
  profile: {
    name: string;
    followers?: number;
    following?: number;
  };
  onEditPress: () => void;
  onStatsPress: () => void;
  onSettingsPress: () => void;
};

export function ProfileHeader({
  profile,
  onEditPress,
  onStatsPress,
  onSettingsPress,
}: Props) {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 220 }}
      style={styles.container}
    >
      {/* SETTINGS */}
      <MotiPressable
        onPress={onSettingsPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.settings}
      >
        {(interaction) => (
          <MotiView
            animate={{
              scale: interaction.value.pressed ? 0.9 : 1,
              opacity: interaction.value.pressed ? 0.6 : 1,
            }}
            transition={{ type: 'timing', duration: 100 }}
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color={colors.text.secondary}
            />
          </MotiView>
        )}
      </MotiPressable>

      {/* TOP ROW */}
      <View style={styles.topRow}>
        {/* Avatar */}
        <MotiView
          from={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          style={[styles.avatar, { backgroundColor: colors.accent }]}
        >
          <Text style={[styles.avatarText, { color: colors.background }]}>
            {profile.name.charAt(0)}
          </Text>
        </MotiView>

        {/* Name + followers */}
        <MotiView
          from={{ opacity: 0, translateY: 4 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 60, type: 'timing', duration: 180 }}
          style={styles.info}
        >
          <Text style={[styles.name, { color: colors.text.primary }]}>
            {profile.name}
          </Text>

          <Text
            style={[
              styles.followers,
              { color: colors.text.secondary, opacity: 0.8 },
            ]}
          >
            {profile.followers ?? 0} followers ·{' '}
            {profile.following ?? 0} following
          </Text>
        </MotiView>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <MotiPressable onPress={onStatsPress}>
          {(interaction) => (
            <MotiView
              animate={{
                scale: interaction.value.pressed ? 0.96 : 1,
              }}
              transition={{ type: 'timing', duration: 100 }}
              style={[
                styles.primaryButton,
                { backgroundColor: colors.surface },
              ]}
            >
              <Text
                style={[styles.primaryText, { color: colors.text.primary }]}
              >
                View stats
              </Text>
            </MotiView>
          )}
        </MotiPressable>

        <MotiPressable onPress={onEditPress}>
          {(interaction) => (
            <MotiView
              animate={{
                scale: interaction.value.pressed ? 0.96 : 1,
              }}
              transition={{ type: 'timing', duration: 100 }}
              style={[
                styles.outlineButton,
                { borderColor: colors.border },
              ]}
            >
              <Text
                style={[styles.outlineText, { color: colors.text.primary }]}
              >
                Edit your profile
              </Text>
            </MotiView>
          )}
        </MotiPressable>
      </View>
    </MotiView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },

  settings: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 20,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },

  info: {
    marginLeft: SPACING.md,
    flexShrink: 1,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    fontSize: 32,
    fontWeight: '700',
  },

  name: {
    ...TYPOGRAPHY.h2,
    marginBottom: SPACING.xs,
  },

  followers: {
    ...TYPOGRAPHY.body,
    marginBottom: SPACING.lg,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
  },

  primaryButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 999,
  },

  primaryText: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },

  outlineButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 999,
    borderWidth: 1,
  },

  outlineText: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
});
