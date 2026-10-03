/**
 * User Chat Message Component
 * 
 * Renders user text, replied-to context preview, status indicators (sending/sent/failed),
 * and retry trigger.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ConversationMessage } from '../../types/conversation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

interface UserMessageProps {
  message: ConversationMessage;
  isGroupedWithPrevious?: boolean;
  isGroupedWithNext?: boolean;
  onLongPress: (message: ConversationMessage) => void;
  onRetry: (messageId: string) => void;
}

export const UserMessage: React.FC<UserMessageProps> = ({
  message,
  isGroupedWithPrevious,
  isGroupedWithNext,
  onLongPress,
  onRetry,
}) => {
  const isFailed = message.status === 'failed';
  const isSending = message.status === 'sending';

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onLongPress={() => onLongPress(message)}
        style={[
          styles.bubble,
          isGroupedWithPrevious && styles.bubbleGroupedTop,
          isGroupedWithNext && styles.bubbleGroupedBottom,
          isFailed && styles.bubbleFailed,
          shadows.subtle,
        ]}
      >
        {/* Reply To Context Preview */}
        {message.replyTo ? (
          <View style={styles.replyBox}>
            <View style={styles.replyBar} />
            <View style={styles.replyTextWrap}>
              <Text style={styles.replySender}>
                {message.replyTo.senderName || (message.replyTo.senderType === 'ai' ? 'AI Astrologer' : 'Astrologer')}
              </Text>
              <Text style={styles.replySnippet} numberOfLines={1}>
                {message.replyTo.snippet}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Message Text */}
        <Text style={styles.text}>{message.text}</Text>

        {/* Metadata Footer */}
        <View style={styles.metaRow}>
          <Text style={styles.timeText}>{formatTime(message.createdAt)}</Text>

          {/* Status icon / badge */}
          {isSending ? (
            <View style={styles.statusWrap}>
              <ActivityIndicator size={10} color="#E0E7FF" style={styles.spinner} />
              <Text style={styles.statusText}>Sending...</Text>
            </View>
          ) : isFailed ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onRetry(message.id)}
              style={styles.failedBtn}
            >
              <Text style={styles.failedBtnText}>⚠️ Failed • Retry</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.sentCheck}>✓</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginVertical: 3,
    paddingHorizontal: spacing.md,
  },
  bubble: {
    maxWidth: '82%',
    backgroundColor: colors.userBubbleBg,
    borderRadius: borderRadius.lg,
    borderBottomRightRadius: borderRadius.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.userBubbleBorder,
  },
  bubbleGroupedTop: {
    borderTopRightRadius: borderRadius.xs,
  },
  bubbleGroupedBottom: {
    borderBottomRightRadius: borderRadius.xs,
  },
  bubbleFailed: {
    backgroundColor: '#3F1A1A',
    borderColor: colors.error,
  },
  replyBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: borderRadius.sm,
    padding: 6,
    marginBottom: 6,
  },
  replyBar: {
    width: 3,
    backgroundColor: '#FDE68A',
    borderRadius: 2,
    marginRight: 6,
  },
  replyTextWrap: {
    flex: 1,
  },
  replySender: {
    color: '#FDE68A',
    fontSize: 10,
    fontFamily: typography.fontFamily.bold,
  },
  replySnippet: {
    color: '#E0E7FF',
    fontSize: 11,
    fontFamily: typography.fontFamily.regular,
  },
  text: {
    color: colors.userText,
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.base,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
    gap: 6,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 10,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  spinner: {
    marginRight: 2,
  },
  statusText: {
    color: '#E0E7FF',
    fontSize: 10,
    fontStyle: 'italic',
  },
  sentCheck: {
    color: '#A5B4FC',
    fontSize: 11,
    fontWeight: 'bold',
  },
  failedBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.error,
  },
  failedBtnText: {
    color: '#FECACA',
    fontSize: 10,
    fontWeight: '700',
  },
});
