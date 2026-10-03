/**
 * Reply Preview Bar
 * 
 * Floating preview displayed above the composer when replying to a message.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { ReplyContext } from '../../types/conversation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';

interface ReplyPreviewProps {
  reply: ReplyContext | null;
  onDismiss: () => void;
}

export const ReplyPreview: React.FC<ReplyPreviewProps> = ({ reply, onDismiss }) => {
  if (!reply) return null;

  const senderLabel = reply.senderName || (reply.senderType === 'ai' ? 'AI Astrologer' : 'Astrologer');

  return (
    <Animated.View
      entering={FadeInDown.duration(200)}
      exiting={FadeOutDown.duration(150)}
      style={styles.container}
    >
      <View style={styles.leftBar} />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.icon}>↩️</Text>
          <Text style={styles.title}>Replying to {senderLabel}</Text>
        </View>
        <Text style={styles.snippet} numberOfLines={1}>
          {reply.snippet}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.closeBtn}
        activeOpacity={0.7}
        onPress={onDismiss}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 23, 52, 0.95)',
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.surfaceBorder,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.sm,
  },
  leftBar: {
    width: 3,
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: spacing.sm,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  icon: {
    fontSize: 10,
    marginRight: 4,
  },
  title: {
    color: colors.primaryLight,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
    fontWeight: '700',
  },
  snippet: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.regular,
  },
  closeBtn: {
    padding: 6,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginLeft: spacing.sm,
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
