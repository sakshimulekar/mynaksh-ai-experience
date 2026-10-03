/**
 * Gemstone Recommendation Card (💎)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecommendationCardProps, GemstoneRecommendation } from '../../../types/recommendation';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { borderRadius, spacing, shadows } from '../../../theme/spacing';

export const GemstoneCard: React.FC<RecommendationCardProps<GemstoneRecommendation>> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={[styles.container, shadows.subtle]}
      onPress={() => onPress?.(item)}
    >
      {/* Top Header */}
      <View style={styles.topRow}>
        <View style={styles.gemIconWrap}>
          <Text style={styles.gemEmoji}>💎</Text>
        </View>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{item.badge || 'Astrological Match'}</Text>
        </View>
      </View>

      {/* Main Info */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.subtitle || `Recommended for ${item.planet || 'Chart Balance'}`}
        </Text>
      </View>

      {/* Gemstone specs row */}
      {item.carat || item.planet ? (
        <View style={styles.specsRow}>
          {item.planet ? (
            <View style={styles.specPill}>
              <Text style={styles.specPillText}>🪐 {item.planet}</Text>
            </View>
          ) : null}
          {item.carat ? (
            <View style={[styles.specPill, styles.specPillCarat]}>
              <Text style={styles.specPillCaratText}>✨ {item.carat}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Action Footer */}
      <View style={styles.footer}>
        <Text style={styles.actionText}>{item.actionLabel || 'View Certified Gemstone →'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 230,
    backgroundColor: colors.gemstone.bgStart,
    borderRadius: borderRadius.lg,
    borderWidth: 1.2,
    borderColor: colors.gemstone.border,
    padding: spacing.md,
    marginRight: spacing.md,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  gemIconWrap: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  gemEmoji: {
    fontSize: 18,
  },
  badgeWrap: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  badgeText: {
    color: colors.gemstone.text,
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
  content: {
    marginVertical: spacing.xs,
  },
  title: {
    color: '#FFFFFF',
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.bold,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: colors.gemstone.text,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.regular,
    marginTop: 2,
  },
  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: spacing.xs,
  },
  specPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  specPillText: {
    color: '#93C5FD',
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
  },
  specPillCarat: {
    borderColor: 'rgba(245, 158, 11, 0.3)',
    backgroundColor: 'rgba(45, 27, 8, 0.6)',
  },
  specPillCaratText: {
    color: '#FDE68A',
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
  },
  footer: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.25)',
  },
  actionText: {
    color: '#60A5FA',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
});
