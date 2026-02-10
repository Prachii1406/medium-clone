import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { SPACING } from '@/constants';
import { Platform } from 'react-native';

interface FloatingActionButtonProps {
  onPress?: () => void;
}

// Use MotiPressable for pressable animations


export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    rotation.value = withSequence(
      withSpring(-15, { damping: 10 }),
      withSpring(15, { damping: 10 }),
      withSpring(0, { damping: 10 })
    );
  };

  return (
    <MotiPressable
      style={[styles.fab, animatedStyle, { backgroundColor: colors.accent }]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Ionicons name="create-outline" size={28} color={colors.background} />
    </MotiPressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: SPACING.lg,
    right: SPACING.lg,
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

