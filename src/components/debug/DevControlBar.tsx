/**
 * Dev Control & Assessment Bar
 * 
 * Interactive toolbar for interviewers to test all scenarios:
 * - Optimistic update failures & retries
 * - Astrologer handovers
 * - Initial loading & network errors
 * - Resetting mock state
 */

import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';

interface DevControlBarProps {
  simulateFailure: boolean;
  onToggleSimulateFailure: (val: boolean) => void;
  simulateHandover: boolean;
  onToggleSimulateHandover: (val: boolean) => void;
  onForceLoadError: () => void;
  onResetMockData: () => void;
  onClearChat: () => void;
  onClose: () => void;
}

export const DevControlBar: React.FC<DevControlBarProps> = ({
  simulateFailure,
  onToggleSimulateFailure,
  simulateHandover,
  onToggleSimulateHandover,
  onForceLoadError,
  onResetMockData,
  onClearChat,
  onClose,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.badge}>DEV TOOLBOX</Text>
          <Text style={styles.title}>Scenario & State Evaluator</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.controlsRow}>
        {/* Toggle Network Failure for Sent Messages */}
        <View style={styles.toggleItem}>
          <Text style={styles.toggleLabel}>Fail Next Msg (Retry Demo)</Text>
          <Switch
            value={simulateFailure}
            onValueChange={onToggleSimulateFailure}
            trackColor={{ false: '#334155', true: colors.error }}
            thumbColor={simulateFailure ? '#FEE2E2' : '#94A3B8'}
          />
        </View>

        {/* Toggle Human Handover */}
        <View style={styles.toggleItem}>
          <Text style={styles.toggleLabel}>Human Astrologer Mode</Text>
          <Switch
            value={simulateHandover}
            onValueChange={onToggleSimulateHandover}
            trackColor={{ false: '#334155', true: '#F59E0B' }}
            thumbColor={simulateHandover ? '#FEF3C7' : '#94A3B8'}
          />
        </View>

        {/* Force Initial Load Network Error */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionBtn, { borderColor: colors.error }]}
          onPress={onForceLoadError}
        >
          <Text style={[styles.actionBtnText, { color: '#FCA5A5' }]}>⚡ Force Load Error</Text>
        </TouchableOpacity>

        {/* Reset Initial Mock State */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.actionBtn, { borderColor: colors.primary }]}
          onPress={onResetMockData}
        >
          <Text style={[styles.actionBtnText, { color: colors.primaryLight }]}>🔄 Reset Mock State</Text>
        </TouchableOpacity>

        {/* Clear Chat */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.actionBtn}
          onPress={onClearChat}
        >
          <Text style={styles.actionBtnText}>🧹 Clear (Empty State)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F0E1F',
    borderBottomWidth: 1,
    borderBottomColor: '#2D285A',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    color: '#FDE68A',
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  title: {
    color: colors.text,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.bold,
  },
  closeBtn: {
    padding: 4,
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    gap: 8,
  },
  toggleLabel: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: typography.fontFamily.medium,
  },
  actionBtn: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  actionBtnText: {
    color: colors.text,
    fontSize: 11,
    fontFamily: typography.fontFamily.medium,
    fontWeight: '600',
  },
});
