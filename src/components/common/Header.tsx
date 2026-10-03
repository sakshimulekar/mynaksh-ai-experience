/**
 * App Header Component
 * 
 * Displays Astrologer session header, celestial branding, status indicator,
 * and dev controls toggle.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

interface HeaderProps {
  onReset: () => void;
  onClear: () => void;
  showDevControls: boolean;
  onToggleDevControls: () => void;
  isHumanHandover?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  onClear,
  showDevControls,
  onToggleDevControls,
  isHumanHandover,
}) => {
  return (
    <View style={[styles.container, shadows.subtle]}>
      {/* Astrologer Info */}
      <View style={styles.leftSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{isHumanHandover ? '👨‍🏫' : '✨'}</Text>
          <View style={styles.onlineDot} />
        </View>

        <View style={styles.titleColumn}>
          <View style={styles.titleRow}>
            <Text style={styles.brandTitle}>MyNaksh</Text>
            <View style={styles.aiTag}>
              <Text style={styles.aiTagText}>{isHumanHandover ? 'Human Live' : 'AI Astrologer'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>
            {isHumanHandover ? 'Acharya Raghav Sharma (Connected)' : 'Vedic Kundli & Tarot Intelligence'}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={[styles.iconButton, showDevControls && styles.iconButtonActive]}
          activeOpacity={0.7}
          onPress={onToggleDevControls}
        >
          <Text style={styles.btnIcon}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={onReset}
        >
          <Text style={styles.btnIcon}>🔄</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingTop: Platform.OS === 'ios' ? 10 : spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceBorder,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.primary,
    position: 'relative',
  },
  avatarText: {
    fontSize: 20,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: colors.backgroundSecondary,
  },
  titleColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    color: colors.text,
    fontSize: typography.size.md,
    fontFamily: typography.fontFamily.bold,
    fontWeight: '700',
  },
  aiTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  aiTagText: {
    color: colors.primaryLight,
    fontSize: 9,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.regular,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconButtonActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderColor: colors.primary,
  },
  btnIcon: {
    fontSize: 14,
  },
});
