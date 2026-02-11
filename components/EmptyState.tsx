import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
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
    <MotiView style={styles.container}>
      {/* Title */}
      <MotiView
        from={{ opacity: 0, translateY: 6 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 220 }}
      >
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {title}
        </Text>
      </MotiView>

      {/* Message */}
      <MotiView
        from={{ opacity: 0, translateY: 6 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 60, type: 'timing', duration: 220 }}
      >
        <Text style={[styles.message, { color: colors.text.secondary }]}>
          {message}
        </Text>
      </MotiView>

      {/* Action */}
      {actionText && onActionPress && (
        <MotiPressable onPress={onActionPress}>
          {(interaction) => (
            <MotiView
              from={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: 1,
                scale: interaction.value.pressed ? 0.96 : 1,
              }}
              transition={{
                delay: 120,
                type: 'spring',
                damping: 16,
              }}
              style={[
                styles.button,
                { borderColor: colors.text.primary },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  { color: colors.text.primary },
                ]}
              >
                {actionText}
              </Text>
            </MotiView>
          )}
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