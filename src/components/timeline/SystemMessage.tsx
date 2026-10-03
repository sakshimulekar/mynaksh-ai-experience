/**
 * System Event Message Component
 * 
 * Centered timeline markers for system events (session start, handovers, alerts).
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConversationMessage } from '../../types/conversation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';

interface SystemMessageProps {
  message: ConversationMessage;
}

export const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.icon}>🌌</Text>
        <Text style={styles.text}>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.systemBg,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.systemBorder,
    maxWidth: '90%',
  },
  icon: {
    fontSize: 12,
    marginRight: 6,
  },
  text: {
    color: colors.systemText,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
  },
});
