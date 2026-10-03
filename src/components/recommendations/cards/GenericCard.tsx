/**
 * Generic Fallback Recommendation Card
 * 
 * Rendered when a new or unrecognized recommendation type is received from the backend,
 * ensuring zero crashes and graceful degradation.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecommendationCardProps, BaseRecommendation } from '../../../types/recommendation';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { borderRadius, spacing, shadows } from '../../../theme/spacing';

export const GenericCard: React.FC<RecommendationCardProps<BaseRecommendation>> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.container, shadows.subtle]}
      onPress={() => onPress?.(item)}
    >
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>{item.icon || '✨'}</Text>
        </View>
        {item.badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>

      {item.subtitle ? (
        <Text style={styles.subtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.actionText}>{item.actionLabel || 'Explore Experience →'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.md,
    marginRight: spacing.md,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  badge: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  badgeText: {
    color: colors.primaryLight,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
  },
  title: {
    color: colors.text,
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.bold,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.xs,
  },
  footer: {
    marginTop: spacing.md,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  actionText: {
    color: colors.primaryLight,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
  },
});
