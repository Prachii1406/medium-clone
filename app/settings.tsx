import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { MotiPressable } from 'moti/interactions';
import { SafeAreaView } from 'react-native-safe-area-context';
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

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <MotiPressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </MotiPressable>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          Settings
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Account
          </Text>

          <MotiPressable style={[styles.listItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Become a Medium Member
            </Text>
            <Text style={styles.memberIcon}>✨</Text>
          </MotiPressable>

          <MotiPressable style={[styles.listItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Story stats
            </Text>
          </MotiPressable>

          <MotiPressable style={[styles.listItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Account
            </Text>
          </MotiPressable>
        </View>

        {/* Configure Medium */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Configure Medium
          </Text>

          <MotiPressable style={[styles.listItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Refine recommendations
            </Text>
          </MotiPressable>

          {/* Theme */}
          <MotiPressable
            style={[styles.listItem, { borderBottomColor: colors.border }]}
            onPress={() => setShowThemeOptions(true)}
          >
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Theme
            </Text>
            <Text style={[styles.themeValue, { color: colors.text.primary }]}>
              {getThemeLabel()}
            </Text>
          </MotiPressable>

          <MotiPressable style={[styles.listItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Push notifications
            </Text>
          </MotiPressable>

          <MotiPressable style={[styles.listItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Email notifications
            </Text>
          </MotiPressable>

          <MotiPressable style={[styles.listItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Custom app icon
            </Text>
          </MotiPressable>

          <MotiPressable style={[styles.listItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.listItemText, { color: colors.text.secondary }]}>
              Downloaded content
            </Text>
          </MotiPressable>
        </View>

        {/* Social */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            Social
          </Text>
          <Text style={[styles.socialDescription, { color: colors.text.secondary }]}>
            We will never post to X or Facebook without your permission.
          </Text>
        </View>
      </ScrollView>

      {/* THEME MODAL */}
      <Modal
        visible={showThemeOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowThemeOptions(false)}
      >
        <MotiPressable
          style={styles.modalBackdrop}
          onPress={() => setShowThemeOptions(false)}
        />

        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.themeOptionsTitle, { color: colors.text.primary }]}>
              Theme
            </Text>

            {(['system', 'light', 'dark'] as Theme[]).map((item) => (
              <MotiPressable
                key={item}
                style={styles.themeOption}
                onPress={() => handleThemeChange(item)}
              >
                <View style={styles.radioButton}>
                  {theme === item && (
                    <View
                      style={[
                        styles.radioButtonInner,
                        { backgroundColor: colors.text.primary },
                      ]}
                    />
                  )}
                </View>
                <Text style={[styles.themeOptionText, { color: colors.text.primary }]}>
                  {item === 'system'
                    ? 'System Default'
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </MotiPressable>
            ))}

            <MotiPressable
              style={styles.cancelButton}
              onPress={() => setShowThemeOptions(false)}
            >
              <Text style={[styles.cancelButtonText, { color: colors.text.secondary }]}>
                Cancel
              </Text>
            </MotiPressable>
          </View>
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

  scrollView: { flex: 1 },
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

  /* MODAL */
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
