/**
 * Tarot Reading Recommendation Card (🔮)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecommendationCardProps, TarotRecommendation } from '../../../types/recommendation';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { borderRadius, spacing, shadows } from '../../../theme/spacing';

export const TarotCard: React.FC<RecommendationCardProps<TarotRecommendation>> = ({
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
          <Text style={styles.iconEmoji}>🔮</Text>
        </View>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{item.badge || 'Tarot Divination'}</Text>
        </View>
      </View>

      {/* Main Info */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.subtitle || '3-Card Astrological Spread'}
        </Text>
      </View>

      {/* Energy & Spread Meta */}
      <View style={styles.metaRow}>
        {item.energyAlignment ? (
          <View style={styles.metaPill}>
            <Text style={styles.metaPillText}>⚡ {item.energyAlignment}</Text>
          </View>
        ) : (
          <View style={styles.metaPill}>
            <Text style={styles.metaPillText}>✨ High Accuracy</Text>
          </View>
        )}
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <Text style={styles.actionText}>{item.actionLabel || 'Draw Cards Now →'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 230,
    backgroundColor: colors.tarot.bgStart,
    borderRadius: borderRadius.lg,
    borderWidth: 1.2,
    borderColor: colors.tarot.border,
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
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
  },
  iconEmoji: {
    fontSize: 18,
  },
  badgeWrap: {
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
  },
  badgeText: {
    color: colors.tarot.text,
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
    color: colors.tarot.text,
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
  metaPill: {
    backgroundColor: 'rgba(30, 14, 56, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
  metaPillText: {
    color: '#C084FC',
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
  },
  footer: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(168, 85, 247, 0.25)',
  },
  actionText: {
    color: '#C084FC',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
});
