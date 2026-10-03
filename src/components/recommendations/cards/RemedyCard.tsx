/**
 * Vedic Remedy Recommendation Card (🪔)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecommendationCardProps, RemedyRecommendation } from '../../../types/recommendation';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { borderRadius, spacing, shadows } from '../../../theme/spacing';

export const RemedyCard: React.FC<RecommendationCardProps<RemedyRecommendation>> = ({
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
          <Text style={styles.iconEmoji}>🪔</Text>
        </View>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{item.badge || 'Vedic Remedy'}</Text>
        </View>
      </View>

      {/* Main Info */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.subtitle || 'Vedic Ritual for Planetary Balance'}
        </Text>
      </View>

      {/* Timing & Day Row */}
      <View style={styles.metaRow}>
        {item.dayOfWeek ? (
          <View style={styles.dayPill}>
            <Text style={styles.dayText}>🗓️ {item.dayOfWeek}</Text>
          </View>
        ) : null}
        {item.timing ? (
          <View style={styles.timingPill}>
            <Text style={styles.timingText}>⏳ {item.timing}</Text>
          </View>
        ) : null}
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <Text style={styles.actionText}>{item.actionLabel || 'View Puja Ritual →'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 230,
    backgroundColor: colors.remedy.bgStart,
    borderRadius: borderRadius.lg,
    borderWidth: 1.2,
    borderColor: colors.remedy.border,
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
    backgroundColor: 'rgba(236, 72, 153, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.4)',
  },
  iconEmoji: {
    fontSize: 18,
  },
  badgeWrap: {
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.4)',
  },
  badgeText: {
    color: colors.remedy.text,
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
    color: colors.remedy.text,
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
  dayPill: {
    backgroundColor: 'rgba(38, 11, 26, 0.8)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  dayText: {
    color: '#F472B6',
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
  },
  timingPill: {
    backgroundColor: 'rgba(38, 11, 26, 0.8)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.25)',
  },
  timingText: {
    color: '#FBCFE8',
    fontSize: 10,
  },
  footer: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(236, 72, 153, 0.25)',
  },
  actionText: {
    color: '#F472B6',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
});
