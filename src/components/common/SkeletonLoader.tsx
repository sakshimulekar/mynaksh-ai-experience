/**
 * Skeleton Loader Component
 * 
 * Displayed during initial conversation fetch.
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';

export const SkeletonLoader: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>✨ Connecting with AI Astrologer...</Text>
      </View>

      {/* System message skeleton */}
      <View style={styles.systemSkeleton}>
        <Animated.View style={[styles.systemPill, { opacity: pulseAnim }]} />
      </View>

      {/* User message skeleton */}
      <View style={styles.userSkeletonRow}>
        <Animated.View style={[styles.userBubbleSkeleton, { opacity: pulseAnim }]} />
      </View>

      {/* AI message skeleton */}
      <View style={styles.aiSkeletonRow}>
        <View style={styles.avatarSkeleton} />
        <View style={styles.aiContentSkeleton}>
          <Animated.View style={[styles.aiTextLine1, { opacity: pulseAnim }]} />
          <Animated.View style={[styles.aiTextLine2, { opacity: pulseAnim }]} />
          <Animated.View style={[styles.aiTextLine3, { opacity: pulseAnim }]} />

          {/* Recommendation card skeletons */}
          <View style={styles.cardsRow}>
            <Animated.View style={[styles.cardSkeleton, { opacity: pulseAnim }]} />
            <Animated.View style={[styles.cardSkeleton, { opacity: pulseAnim }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'flex-start',
  },
  statusRow: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statusText: {
    color: colors.primaryLight,
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.medium,
    fontStyle: 'italic',
  },
  systemSkeleton: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  systemPill: {
    width: 240,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  userSkeletonRow: {
    alignItems: 'flex-end',
    marginVertical: spacing.sm,
  },
  userBubbleSkeleton: {
    width: '65%',
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
  },
  aiSkeletonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: spacing.sm,
  },
  avatarSkeleton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    marginRight: spacing.sm,
  },
  aiContentSkeleton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  aiTextLine1: {
    width: '90%',
    height: 14,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 8,
  },
  aiTextLine2: {
    width: '75%',
    height: 14,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 8,
  },
  aiTextLine3: {
    width: '50%',
    height: 14,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: spacing.md,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardSkeleton: {
    width: 140,
    height: 110,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
});
