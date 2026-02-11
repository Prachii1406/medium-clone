import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { SPACING } from '@/constants';

interface FloatingActionButtonProps {
  onPress?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  const { colors } = useTheme();

  return (
    <MotiPressable onPress={onPress} style={styles.wrapper}>
      {(interaction) => (
        <MotiView
          from={{ scale: 0.85, opacity: 0 }}
          animate={{
            scale: interaction.value.pressed ? 0.9 : 1,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            damping: 14,
            stiffness: 180,
          }}
          style={[
            styles.fab,
            { backgroundColor: colors.accent },
          ]}
        >
          {/* Icon micro-motion */}
          <MotiView
            animate={{
              translateY: interaction.value.pressed ? 1 : 0,
            }}
            transition={{ type: 'timing', duration: 80 }}
          >
            <Ionicons
              name="create-outline"
              size={28}
              color={colors.background}
            />
          </MotiView>
        </MotiView>
      )}
    </MotiPressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',

    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }),
  },
});
