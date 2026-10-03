/**
 * Network Error Banner Component
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

interface ErrorBannerProps {
  error: string;
  onRetry: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ error, onRetry }) => {
  return (
    <View style={[styles.container, shadows.medium]}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>⚠️</Text>
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Unable to load conversation</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{error}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.retryBtn}
        onPress={onRetry}
      >
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A1111',
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    margin: spacing.md,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  iconText: {
    fontSize: 16,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#FECACA',
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.bold,
  },
  subtitle: {
    color: '#FCA5A5',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.regular,
  },
  retryBtn: {
    backgroundColor: colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
  },
});
