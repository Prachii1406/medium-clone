import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
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
    <View style={styles.container}>
      {/* Settings */}
      <Pressable style={styles.settings} onPress={onSettingsPress}>
        <Ionicons
          name="settings-outline"
          size={22}
          color={colors.text.secondary}
        />
      </Pressable>

      {/* TOP ROW */}
      <View style={styles.topRow}>
        {/* Avatar */}
        <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
          <Text style={[styles.avatarText, { color: colors.background }]}>
            {profile.name.charAt(0)}
          </Text>
        </View>

        {/* Name + followers */}
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text.primary }]}>
            {profile.name}
          </Text>

          <Text style={[styles.followers, { color: colors.text.secondary }]}>
            {profile.followers ?? 0} followers · {profile.following ?? 1} following
          </Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <Pressable
          onPress={onStatsPress}
          style={[styles.primaryButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.primaryText, { color: colors.text.primary }]}>
            View stats
          </Text>
        </Pressable>

        <Pressable
          onPress={onEditPress}
          style={[styles.outlineButton, { borderColor: colors.border }]}
        >
          <Text style={[styles.outlineText, { color: colors.text.primary }]}>
            Edit your profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    flexDirection: 'column',  
     
  },

  settings: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
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

  headerContent: {
    alignItems: 'center',
    flexDirection: 'column',
    
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
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