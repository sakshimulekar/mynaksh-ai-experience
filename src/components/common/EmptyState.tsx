/**
 * Empty State Component
 * 
 * Displayed when no messages exist in the conversation.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

const SAMPLE_QUESTIONS = [
  '🪐 How will Saturn transit affect my career this year?',
  '💎 What is my lucky birth gemstone and metal?',
  '🔮 Can you do a 3-card Tarot reading for my relationship?',
  '📅 What is today’s Shubh Muhurat and Panchang?',
];

interface EmptyStateProps {
  onSelectQuestion: (question: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectQuestion }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.card, shadows.medium]}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>✨</Text>
        </View>

        <Text style={styles.title}>Start Your Celestial Consultation</Text>
        <Text style={styles.subtitle}>
          Ask anything about your Vedic horoscope, career transitions, relationships,
          or request personalized gemstone & tarot recommendations.
        </Text>

        <View style={styles.promptsList}>
          <Text style={styles.promptsHeader}>Popular Inquiries:</Text>
          {SAMPLE_QUESTIONS.map((q, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              style={styles.promptBtn}
              onPress={() => onSelectQuestion(q.substring(2).trim())}
            >
              <Text style={styles.promptText}>{q}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xxl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.xl,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  iconText: {
    fontSize: 28,
  },
  title: {
    color: colors.text,
    fontSize: typography.size.lg,
    fontFamily: typography.fontFamily.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: typography.lineHeight.base,
    marginBottom: spacing.lg,
  },
  promptsList: {
    width: '100%',
    gap: 8,
  },
  promptsHeader: {
    color: colors.primaryLight,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.semibold,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  promptBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  promptText: {
    color: colors.text,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
  },
});
