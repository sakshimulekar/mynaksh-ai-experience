/**
 * Educational Article Recommendation Card (📖)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RecommendationCardProps, ArticleRecommendation } from '../../../types/recommendation';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import { borderRadius, spacing, shadows } from '../../../theme/spacing';

export const ArticleCard: React.FC<RecommendationCardProps<ArticleRecommendation>> = ({
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
          <Text style={styles.iconEmoji}>📖</Text>
        </View>
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{item.badge || 'Vedic Wisdom'}</Text>
        </View>
      </View>

      {/* Main Info */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.subtitle || item.summary || 'Astrological Insights & Guidance'}
        </Text>
      </View>

      {/* Category & Read Time Row */}
      <View style={styles.metaRow}>
        {item.category ? (
          <View style={styles.categoryPill}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        ) : null}
        <View style={styles.timePill}>
          <Text style={styles.timeText}>⏱️ {item.readTimeMinutes || 4} min read</Text>
        </View>
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <Text style={styles.actionText}>{item.actionLabel || 'Read Full Guide →'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 230,
    backgroundColor: colors.article.bgStart,
    borderRadius: borderRadius.lg,
    borderWidth: 1.2,
    borderColor: colors.article.border,
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
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  iconEmoji: {
    fontSize: 18,
  },
  badgeWrap: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  badgeText: {
    color: colors.article.text,
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
    color: colors.article.text,
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
  categoryPill: {
    backgroundColor: 'rgba(6, 32, 27, 0.8)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  categoryText: {
    color: '#6EE7B7',
    fontSize: 10,
    fontFamily: typography.fontFamily.medium,
  },
  timePill: {
    backgroundColor: 'rgba(6, 32, 27, 0.8)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  timeText: {
    color: '#A7F3D0',
    fontSize: 10,
  },
  footer: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(16, 185, 129, 0.25)',
  },
  actionText: {
    color: '#34D399',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
});
