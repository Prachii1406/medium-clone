import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {MotiView } from 'moti';
import {MotiPressable} from 'moti/interactions';
import { useTheme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionText,
  onActionPress,
}) => {
  const { colors } = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}
    >
      <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.text.secondary }]}>{message}</Text>
      {actionText && onActionPress && (
        <MotiPressable
          style={[styles.button, { borderColor: colors.text.primary }]}
          onPress={onActionPress}
        >
          <Text style={[styles.buttonText, { color: colors.text.primary }]}>{actionText}</Text>
        </MotiPressable>
      )}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl * 2,
  },
  title: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  message: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  button: {
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.lg,
    borderRadius: 24,
    borderWidth: 1,
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
});