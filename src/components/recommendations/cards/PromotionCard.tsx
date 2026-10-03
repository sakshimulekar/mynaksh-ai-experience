/**
 * Special Promotion / Offer Recommendation Card (🎁)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecommendationCardProps, PromotionRecommendation } from '../../../types/recommendation';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { borderRadius, spacing, shadows } from '../../../theme/spacing';

export const PromotionCard: React.FC<RecommendationCardProps<PromotionRecommendation>> = ({
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
        <View style={styles.iconWrap}>
          <Text style={styles.iconEmoji}>🎁</Text>
        </View>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{item.discountPercentage || item.badge || 'Special Offer'}</Text>
        </View>
      </View>

      {/* Main Info */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.subtitle || 'Exclusive Astrological Benefit'}
        </Text>
      </View>

      {/* Coupon Code Row */}
      <View style={styles.metaRow}>
        {item.discountCode ? (
          <View style={styles.codePill}>
            <Text style={styles.codeText}>🏷️ {item.discountCode}</Text>
          </View>
        ) : null}
        {item.expiryText ? (
          <View style={styles.expiryPill}>
            <Text style={styles.expiryText}>⏳ {item.expiryText}</Text>
          </View>
        ) : null}
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <Text style={styles.actionText}>{item.actionLabel || 'Claim Offer Now →'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 230,
    backgroundColor: colors.promotion.bgStart,
    borderRadius: borderRadius.lg,
    borderWidth: 1.2,
    borderColor: colors.promotion.border,
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
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  iconEmoji: {
    fontSize: 18,
  },
  badgeWrap: {
    backgroundColor: 'rgba(245, 158, 11, 0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
  badgeText: {
    color: '#FDE68A',
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '700',
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
    color: colors.promotion.text,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.regular,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: spacing.xs,
  },
  codePill: {
    backgroundColor: 'rgba(59, 39, 12, 0.8)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  codeText: {
    color: '#FDE68A',
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '700',
  },
  expiryPill: {
    backgroundColor: 'rgba(59, 39, 12, 0.8)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  expiryText: {
    color: '#FCD34D',
    fontSize: 10,
  },
  footer: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(245, 158, 11, 0.25)',
  },
  actionText: {
    color: '#FBBF24',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
});
