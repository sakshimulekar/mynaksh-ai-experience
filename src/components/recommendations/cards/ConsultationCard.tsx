/**
 * Astrologer Consultation Recommendation Card (👨‍🏫)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecommendationCardProps, ConsultationRecommendation } from '../../../types/recommendation';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { borderRadius, spacing, shadows } from '../../../theme/spacing';

export const ConsultationCard: React.FC<RecommendationCardProps<ConsultationRecommendation>> = ({
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
          <Text style={styles.iconEmoji}>👨‍🏫</Text>
        </View>
        <View style={styles.badgeWrap}>
          <View style={styles.onlineDot} />
          <Text style={styles.badgeText}>{item.badge || 'Available'}</Text>
        </View>
      </View>

      {/* Main Info */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.astrologerName ? `${item.astrologerName}` : (item.subtitle || 'Verified Vedic Expert')}
        </Text>
      </View>

      {/* Rating & Pricing Row */}
      <View style={styles.metaRow}>
        <View style={styles.ratingPill}>
          <Text style={styles.ratingText}>⭐ {item.rating || '4.9'}</Text>
        </View>
        {item.experienceYears ? (
          <View style={styles.expPill}>
            <Text style={styles.expText}>{item.experienceYears}y exp</Text>
          </View>
        ) : null}
        {item.pricePerMin ? (
          <View style={styles.pricePill}>
            <Text style={styles.priceText}>{item.pricePerMin}</Text>
          </View>
        ) : null}
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <Text style={styles.actionText}>{item.actionLabel || 'Connect with Astrologer →'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 230,
    backgroundColor: colors.consultation.bgStart,
    borderRadius: borderRadius.lg,
    borderWidth: 1.2,
    borderColor: colors.consultation.border,
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
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  iconEmoji: {
    fontSize: 18,
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  badgeText: {
    color: colors.consultation.text,
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
    color: colors.consultation.text,
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
  ratingPill: {
    backgroundColor: 'rgba(45, 27, 8, 0.8)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  ratingText: {
    color: '#FDE68A',
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
  expPill: {
    backgroundColor: 'rgba(45, 27, 8, 0.8)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
  },
  expText: {
    color: '#D4D4D8',
    fontSize: 10,
  },
  pricePill: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  priceText: {
    color: '#6EE7B7',
    fontSize: 10,
    fontWeight: '600',
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
