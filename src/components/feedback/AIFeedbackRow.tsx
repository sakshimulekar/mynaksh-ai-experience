/**
 * AI Message Feedback Row
 * 
 * Displays Like / Dislike buttons and conditionally unfolds feedback chips.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { AIFeedback, FeedbackReasonChip } from '../../types/conversation';
import { FeedbackChips } from './FeedbackChips';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';

interface AIFeedbackRowProps {
  feedback?: AIFeedback;
  onRate: (rating: 'like' | 'dislike') => void;
  onToggleChip: (chip: FeedbackReasonChip) => void;
}

export const AIFeedbackRow: React.FC<AIFeedbackRowProps> = ({
  feedback,
  onRate,
  onToggleChip,
}) => {
  const rating = feedback?.rating;
  const selectedChips = feedback?.selectedChips || [];

  return (
    <View style={styles.container}>
      <View style={styles.actionsRow}>
        <Text style={styles.label}>Was this reading helpful?</Text>

        <View style={styles.buttonGroup}>
          {/* Like Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.feedbackBtn,
              rating === 'like' && styles.feedbackBtnLiked,
            ]}
            onPress={() => onRate('like')}
          >
            <Text style={styles.btnEmoji}>👍</Text>
            {rating === 'like' ? <Text style={styles.btnActiveText}>Helpful</Text> : null}
          </TouchableOpacity>

          {/* Dislike Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.feedbackBtn,
              rating === 'dislike' && styles.feedbackBtnDisliked,
            ]}
            onPress={() => onRate('dislike')}
          >
            <Text style={styles.btnEmoji}>👎</Text>
            {rating === 'dislike' ? <Text style={styles.btnActiveText}>Needs Work</Text> : null}
          </TouchableOpacity>
        </View>
      </View>

      {/* Expanded Feedback Chips if disliked */}
      {rating === 'dislike' ? (
        <FeedbackChips
          selectedChips={selectedChips}
          onToggleChip={onToggleChip}
        />
      ) : null}

      {/* Liked Acknowledgement */}
      {rating === 'like' ? (
        <View style={styles.thankYouBanner}>
          <Text style={styles.thankYouText}>✨ Thank you for aligning with our Vedic AI!</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.regular,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 6,
  },
  feedbackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  feedbackBtnLiked: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  feedbackBtnDisliked: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  btnEmoji: {
    fontSize: 13,
  },
  btnActiveText: {
    color: '#F8FAFC',
    fontSize: 11,
    marginLeft: 4,
    fontWeight: '600',
  },
  thankYouBanner: {
    marginTop: 6,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  thankYouText: {
    color: '#6EE7B7',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
  },
});
