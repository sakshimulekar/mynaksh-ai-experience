/**
 * AI Astrologer Message Component
 * 
 * Renders AI response text, attached recommendation carousel,
 * user feedback controls (Like/Dislike/Chips), and actions.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ConversationMessage, FeedbackReasonChip } from '../../types/conversation';
import { RecommendationItem } from '../../types/recommendation';
import { RecommendationCarousel } from '../recommendations/RecommendationCarousel';
import { AIFeedbackRow } from '../feedback/AIFeedbackRow';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

interface AIMessageProps {
  message: ConversationMessage;
  isGroupedWithPrevious?: boolean;
  isGroupedWithNext?: boolean;
  onLongPress: (message: ConversationMessage) => void;
  onRecommendationPress: (item: RecommendationItem) => void;
  onRateFeedback: (messageId: string, rating: 'like' | 'dislike') => void;
  onToggleFeedbackChip: (messageId: string, chip: FeedbackReasonChip) => void;
}

export const AIMessage: React.FC<AIMessageProps> = ({
  message,
  isGroupedWithPrevious,
  isGroupedWithNext,
  onLongPress,
  onRecommendationPress,
  onRateFeedback,
  onToggleFeedbackChip,
}) => {
  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {/* Sender Header if not grouped */}
      {!isGroupedWithPrevious ? (
        <View style={styles.senderHeader}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarEmoji}>✨</Text>
          </View>
          <Text style={styles.senderName}>MyNaksh AI Astrologer</Text>
          <View style={styles.aiPill}>
            <Text style={styles.aiPillText}>Vedic AI</Text>
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
        {/* Reply context if present */}
        {message.replyTo ? (
          <View style={styles.replyBox}>
            <View style={styles.replyBar} />
            <View style={styles.replyTextWrap}>
              <Text style={styles.replySender}>Replying to {message.replyTo.senderName || 'Your Query'}</Text>
              <Text style={styles.replySnippet} numberOfLines={1}>
                {message.replyTo.snippet}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Text Content */}
        <Text style={styles.text}>{message.text}</Text>

        {/* Dynamic Recommendations Carousel (Core Requirement) */}
        {message.recommendations && message.recommendations.length > 0 ? (
          <RecommendationCarousel
            recommendations={message.recommendations}
            onRecommendationPress={onRecommendationPress}
          />
        ) : null}

        {/* AI Feedback Row */}
        <AIFeedbackRow
          feedback={message.feedback}
          onRate={(rating) => onRateFeedback(message.id, rating)}
          onToggleChip={(chip) => onToggleFeedbackChip(message.id, chip)}
        />

        {/* Timestamp Footer */}
        <View style={styles.footer}>
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
    maxWidth: '100%',
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
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  avatarEmoji: {
    fontSize: 12,
  },
  senderName: {
    color: colors.primaryLight,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.semibold,
    marginRight: 6,
  },
  aiPill: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  aiPillText: {
    color: colors.primaryLight,
    fontSize: 9,
    fontWeight: '700',
  },
  bubble: {
    maxWidth: '94%',
    backgroundColor: colors.aiBubbleBg,
    borderRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.aiBubbleBorder,
  },
  bubbleGroupedTop: {
    borderTopLeftRadius: borderRadius.xs,
  },
  bubbleGroupedBottom: {
    borderBottomLeftRadius: borderRadius.xs,
  },
  replyBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.sm,
    padding: 6,
    marginBottom: spacing.xs,
  },
  replyBar: {
    width: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: 6,
  },
  replyTextWrap: {
    flex: 1,
  },
  replySender: {
    color: colors.primaryLight,
    fontSize: 10,
    fontFamily: typography.fontFamily.bold,
  },
  replySnippet: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  text: {
    color: colors.aiText,
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.regular,
    lineHeight: typography.lineHeight.base,
    marginBottom: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  timeText: {
    color: colors.textMuted,
    fontSize: 10,
  },
});
