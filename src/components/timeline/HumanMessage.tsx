/**
 * Human Astrologer Message Component
 * 
 * Distinctly styles human expert replies with astrologer credentials and verified badges.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ConversationMessage } from '../../types/conversation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

interface HumanMessageProps {
  message: ConversationMessage;
  isGroupedWithPrevious?: boolean;
  isGroupedWithNext?: boolean;
  onLongPress: (message: ConversationMessage) => void;
}

export const HumanMessage: React.FC<HumanMessageProps> = ({
  message,
  isGroupedWithPrevious,
  isGroupedWithNext,
  onLongPress,
}) => {
  const profile = message.astrologerProfile;
  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {/* Sender Header if not grouped */}
      {!isGroupedWithPrevious ? (
        <View style={styles.senderHeader}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarEmoji}>👨‍🏫</Text>
          </View>
          <Text style={styles.senderName}>{profile?.name || 'Vedic Astrologer'}</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified Expert</Text>
          </View>
        </View>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.92}
        onLongPress={() => onLongPress(message)}
        style={[
          styles.bubble,
          isGroupedWithPrevious && styles.bubbleGroupedTop,
          isGroupedWithNext && styles.bubbleGroupedBottom,
          shadows.subtle,
        ]}
      >
        <Text style={styles.text}>{message.text}</Text>

        <View style={styles.footer}>
          <Text style={styles.credentialsText}>{profile?.title || 'Master Astrologer'}</Text>
          <Text style={styles.timeText}>{formatTime(message.createdAt)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginVertical: 4,
    paddingHorizontal: spacing.md,
  },
  senderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginLeft: 4,
  },
  avatarWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(245, 158, 11, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  avatarEmoji: {
    fontSize: 12,
  },
  senderName: {
    color: '#FDE68A',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.semibold,
    marginRight: 6,
  },
  verifiedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.35)',
  },
  verifiedText: {
    color: '#6EE7B7',
    fontSize: 9,
    fontWeight: '700',
  },
  bubble: {
    maxWidth: '85%',
    backgroundColor: colors.humanBubbleBg,
    borderRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.humanBubbleBorder,
  },
  bubbleGroupedTop: {
    borderTopLeftRadius: borderRadius.xs,
  },
  bubbleGroupedBottom: {
    borderBottomLeftRadius: borderRadius.xs,
  },
  text: {
    color: '#FEF3C7',
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.base,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(245, 158, 11, 0.15)',
    paddingTop: 4,
  },
  credentialsText: {
    color: '#F59E0B',
    fontSize: 10,
    fontStyle: 'italic',
  },
  timeText: {
    color: 'rgba(254, 243, 199, 0.5)',
    fontSize: 10,
  },
});
