/**
 * Feedback Chips Component
 * 
 * Expandable pills shown when an AI response is disliked.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FeedbackReasonChip } from '../../types/conversation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';

const AVAILABLE_CHIPS: FeedbackReasonChip[] = [
  'Inaccurate',
  'Too Generic',
  "Didn't Help",
  'Too Long',
  'Unclear Guidance',
];

interface FeedbackChipsProps {
  selectedChips: FeedbackReasonChip[];
  onToggleChip: (chip: FeedbackReasonChip) => void;
}

export const FeedbackChips: React.FC<FeedbackChipsProps> = ({
  selectedChips,
  onToggleChip,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>What could be improved with this celestial response?</Text>
      <View style={styles.chipsRow}>
        {AVAILABLE_CHIPS.map(chip => {
          const isSelected = selectedChips.includes(chip);
          return (
            <TouchableOpacity
              key={chip}
              activeOpacity={0.7}
              onPress={() => onToggleChip(chip)}
              style={[
                styles.chip,
                isSelected ? styles.chipSelected : styles.chipUnselected,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected ? styles.chipTextSelected : styles.chipTextUnselected,
                ]}
              >
                {isSelected ? '✓ ' : ''}{chip}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    paddingHorizontal: 2,
  },
  headerTitle: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing.xs,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  chipUnselected: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  chipSelected: {
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    borderColor: colors.primaryLight,
  },
  chipText: {
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
  },
  chipTextUnselected: {
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: '#EDE9FE',
    fontWeight: '600',
  },
});
