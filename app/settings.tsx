import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme, Theme } from '@/context/ThemeContext';
import { SPACING, TYPOGRAPHY } from '@/constants';

export default function SettingsScreen() {
  const { colors, theme, activeTheme, setTheme } = useTheme();
  const [showThemeOptions, setShowThemeOptions] = useState(false);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setShowThemeOptions(false);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/profile');
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System Default';
      default:
        return 'Dark';
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <StatusBar
        barStyle={activeTheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colors.background}
      />

      {/* HEADER */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <MotiPressable onPress={handleBack}>
          {(interaction) => (
            <MotiView
              animate={{
                scale: interaction.value.pressed ? 0.9 : 1,
                opacity: interaction.value.pressed ? 0.7 : 1,
              }}
              transition={{ duration: 120 }}
              style={styles.backButton}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.text.primary}
              />
            </MotiView>
          )}
        </MotiPressable>

        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          Settings
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ACCOUNT */}
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 240 }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Account
          </Text>

          {[
            { label: 'Become a Medium Member', extra: '✨' },
            { label: 'Story stats' },
            { label: 'Account' },
          ].map((item) => (
            <MotiPressable key={item.label}>
              {(interaction) => (
                <MotiView
                  animate={{
                    scale: interaction.value.pressed ? 0.98 : 1,
                    opacity: interaction.value.pressed ? 0.85 : 1,
                  }}
                  transition={{ duration: 100 }}
                  style={[
                    styles.listItem,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.listItemText,
                      { color: colors.text.secondary },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.extra && (
                    <Text style={styles.memberIcon}>{item.extra}</Text>
                  )}
                </MotiView>
              )}
            </MotiPressable>
          ))}
        </MotiView>

        {/* CONFIGURE */}
        <MotiView
          from={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 80, duration: 240 }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Configure Medium
          </Text>

          {[
            'Refine recommendations',
            'Push notifications',
            'Email notifications',
            'Custom app icon',
            'Downloaded content',
          ].map((label) => (
            <MotiPressable key={label}>
              {(interaction) => (
                <MotiView
                  animate={{
                    scale: interaction.value.pressed ? 0.98 : 1,
                    opacity: interaction.value.pressed ? 0.85 : 1,
                  }}
                  transition={{ duration: 100 }}
                  style={[
                    styles.listItem,
                    { borderBottomColor: colors.border },
                  ]}
                >
                  <Text
                    style={[
                      styles.listItemText,
                      { color: colors.text.secondary },
                    ]}
                  >
                    {label}
                  </Text>
                </MotiView>
              )}
            </MotiPressable>
          ))}

          {/* THEME */}
          <MotiPressable onPress={() => setShowThemeOptions(true)}>
            {(interaction) => (
              <MotiView
                animate={{
                  scale: interaction.value.pressed ? 0.98 : 1,
                  opacity: interaction.value.pressed ? 0.85 : 1,
                }}
                transition={{ duration: 100 }}
                style={[
                  styles.listItem,
                  { borderBottomColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.listItemText,
                    { color: colors.text.secondary },
                  ]}
                >
                  Theme
                </Text>
                <Text
                  style={[
                    styles.themeValue,
                    { color: colors.text.primary },
                  ]}
                >
                  {getThemeLabel()}
                </Text>
              </MotiView>
            )}
          </MotiPressable>
        </MotiView>

        {/* SOCIAL */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 160, duration: 220 }}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Social
          </Text>
          <Text
            style={[
              styles.socialDescription,
              { color: colors.text.secondary },
            ]}
          >
            We will never post to X or Facebook without your permission.
          </Text>
        </MotiView>
      </ScrollView>

      {/* THEME MODAL */}
      <Modal
        visible={showThemeOptions}
        transparent
        animationType="none"
        onRequestClose={() => setShowThemeOptions(false)}
      >
        <MotiPressable onPress={() => setShowThemeOptions(false)}>
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 180 }}
            style={styles.modalBackdrop}
          />
        </MotiPressable>

        <View style={styles.modalContainer}>
          <MotiView
  from={{
    opacity: 0,
    translateY: 40,
  }}
  animate={{
    opacity: 1,
    translateY: 0,
  }}
  exit={{
    opacity: 0,
    translateY: 40,
  }}
  transition={{
    type: 'timing',
    duration: 260,
  }}
  style={[
    styles.modalContent,
    { backgroundColor: colors.background },
  ]}
>

            <Text
              style={[
                styles.themeOptionsTitle,
                { color: colors.text.primary },
              ]}
            >
              Theme
            </Text>

            {(['system', 'light', 'dark'] as Theme[]).map((item) => (
              <MotiPressable
                key={item}
                onPress={() => handleThemeChange(item)}
                style={styles.themeOption}
              >
                <View style={styles.radioButton}>
                  {theme === item && (
                    <MotiView
                      from={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 16 }}
                      style={[
                        styles.radioButtonInner,
                        { backgroundColor: colors.text.primary },
                      ]}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: colors.text.primary },
                  ]}
                >
                  {item === 'system'
                    ? 'System Default'
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </MotiPressable>
            ))}

            <MotiPressable
              onPress={() => setShowThemeOptions(false)}
              style={styles.cancelButton}
            >
              {(interaction) => (
                <MotiView
                  animate={{
                    opacity: interaction.value.pressed ? 0.6 : 1,
                  }}
                >
                  <Text
                    style={[
                      styles.cancelButtonText,
                      { color: colors.text.secondary },
                    ]}
                  >
                    Cancel
                  </Text>
                </MotiView>
              )}
            </MotiPressable>
          </MotiView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },

  backButton: { padding: SPACING.xs },
  headerTitle: { ...TYPOGRAPHY.h3, fontSize: 18 },
  headerSpacer: { width: 40 },

  scrollContent: { paddingBottom: SPACING.xl },

  section: { paddingTop: SPACING.lg },

  sectionTitle: {
    ...TYPOGRAPHY.h3,
    fontSize: 18,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.sm,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md + 4,
    borderBottomWidth: 1,
  },

  listItemText: { ...TYPOGRAPHY.body, fontSize: 16 },
  memberIcon: { fontSize: 24 },
  themeValue: { fontSize: 16, fontWeight: '500' },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    borderRadius: 16,
    padding: SPACING.lg,
    elevation: 10,
  },

  themeOptionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: SPACING.lg,
  },

  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },

  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  themeOptionText: { fontSize: 16 },

  cancelButton: {
    alignItems: 'flex-end',
    paddingTop: SPACING.md,
  },

  cancelButtonText: { fontSize: 16 },

  socialDescription: {
    ...TYPOGRAPHY.body,
    paddingHorizontal: SPACING.md,
    lineHeight: 24,
  },
});
