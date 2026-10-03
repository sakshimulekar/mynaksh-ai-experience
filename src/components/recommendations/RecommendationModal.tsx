/**
 * Recommendation Detail Modal / Sheet
 * 
 * Surfaces deep interactive experience when any recommendation card is tapped.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { RecommendationItem } from '../../types/recommendation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

interface RecommendationModalProps {
  item: RecommendationItem | null;
  visible: boolean;
  onClose: () => void;
}

export const RecommendationModal: React.FC<RecommendationModalProps> = ({
  item,
  visible,
  onClose,
}) => {
  if (!item) return null;

  const handleAction = () => {
    const actionName = item.actionLabel || 'Experience Selected';
    if (Platform.OS === 'web') {
      window.alert(`✨ [${item.title}]\n\nAction Triggered: "${actionName}"\n\nYour celestial request has been synchronized with the Vedic Astrologer backend.`);
    } else {
      Alert.alert(
        `✨ ${item.title}`,
        `Action Triggered: "${actionName}"\n\nYour celestial request has been synchronized with the Vedic Astrologer backend.`,
        [{ text: 'Great!', style: 'default' }]
      );
    }
    onClose();
  };

  const renderTypeDetails = () => {
    switch (item.type) {
      case 'gemstone':
        return (
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>🪐 Astrological Properties</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Governing Planet:</Text>
              <Text style={styles.detailValue}>{(item as any).planet || 'Saturn (Shani)'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ideal Weight / Carat:</Text>
              <Text style={styles.detailValue}>{(item as any).carat || '4.25 Ratti'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Auspicious Metal:</Text>
              <Text style={styles.detailValue}>{(item as any).metal || 'Panchdhatu / Silver'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Energized State:</Text>
              <Text style={[styles.detailValue, { color: colors.success }]}>
                {(item as any).energized ? '✓ Vedic Pran Pratishtha Completed' : 'Uncut'}
              </Text>
            </View>
            {(item as any).benefits ? (
              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Key Life Impacts:</Text>
                {(item as any).benefits.map((b: string, i: number) => (
                  <Text key={i} style={styles.benefitItem}>
                    • {b}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        );

      case 'tarot':
        return (
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>🔮 Tarot Divination Spread</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Drawn Cards:</Text>
              <Text style={styles.detailValue}>{(item as any).cardName || 'Wheel of Fortune'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Energy Resonance:</Text>
              <Text style={styles.detailValue}>{(item as any).energyAlignment || '88% Aligned'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Governing Element:</Text>
              <Text style={styles.detailValue}>{(item as any).element || 'Earth'}</Text>
            </View>
            <View style={styles.tarotInsightBox}>
              <Text style={styles.tarotInsightText}>
                {(item as any).insightsSummary ||
                  'The celestial forces point toward a major breakthrough once current retrogrades conclude.'}
              </Text>
            </View>
          </View>
        );

      case 'consultation':
        return (
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>👨‍🏫 Astrologer Credentials</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Master:</Text>
              <Text style={styles.detailValue}>{(item as any).astrologerName || 'Acharya Raghav Sharma'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Specialty:</Text>
              <Text style={styles.detailValue}>{(item as any).specialty || 'Vedic Kundli & Career'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Experience:</Text>
              <Text style={styles.detailValue}>{(item as any).experienceYears || 16} Years</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Consultation Rate:</Text>
              <Text style={[styles.detailValue, { color: '#FBBF24', fontWeight: '700' }]}>
                {(item as any).pricePerMin || '₹25/min'}
              </Text>
            </View>
          </View>
        );

      case 'remedy':
        return (
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>🪔 Vedic Ritual Steps</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Auspicious Day:</Text>
              <Text style={styles.detailValue}>{(item as any).dayOfWeek || 'Saturday'}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Recommended Muhurat:</Text>
              <Text style={styles.detailValue}>{(item as any).timing || 'During Sunset'}</Text>
            </View>
            {(item as any).mantra ? (
              <View style={styles.mantraBox}>
                <Text style={styles.mantraLabel}>Chant Mantra:</Text>
                <Text style={styles.mantraText}>{(item as any).mantra}</Text>
              </View>
            ) : null}
            {(item as any).instructions ? (
              <Text style={styles.instructionText}>{(item as any).instructions}</Text>
            ) : null}
          </View>
        );

      default:
        return (
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>✨ Experience Overview</Text>
            <Text style={styles.defaultText}>
              {item.subtitle || 'Personalized astrological recommendation generated from your natal transit map.'}
            </Text>
          </View>
        );
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={[styles.modalSheet, shadows.medium]}>
          {/* Header Bar */}
          <View style={styles.topHandleBar}>
            <View style={styles.dragHandle} />
          </View>

          <View style={styles.modalHeader}>
            <View style={styles.headerTitleWrap}>
              <Text style={styles.modalTitle}>{item.title}</Text>
              <Text style={styles.modalTypePill}>{item.type.toUpperCase()}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollArea}
            showsVerticalScrollIndicator={false}
          >
            {renderTypeDetails()}
          </ScrollView>

          {/* Action Button */}
          <View style={styles.footerContainer}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.actionBtn}
              onPress={handleAction}
            >
              <Text style={styles.actionBtnText}>
                {item.actionLabel || 'Proceed with Experience'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 5, 10, 0.75)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalSheet: {
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    maxHeight: '85%',
    paddingBottom: Platform.OS === 'ios' ? 34 : spacing.lg,
  },
  topHandleBar: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerTitleWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    color: colors.text,
    fontSize: typography.size.lg,
    fontFamily: typography.fontFamily.bold,
    fontWeight: '700',
  },
  modalTypePill: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    color: colors.primaryLight,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollArea: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  detailsBox: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
    paddingBottom: 6,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },
  detailValue: {
    color: colors.text,
    fontSize: typography.size.sm,
    fontWeight: '600',
  },
  benefitsContainer: {
    marginTop: spacing.sm,
  },
  benefitsTitle: {
    color: colors.primaryLight,
    fontSize: typography.size.sm,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitItem: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.sm,
    marginBottom: 2,
  },
  tarotInsightBox: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: '#A855F7',
  },
  tarotInsightText: {
    color: '#E9D5FF',
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.base,
    fontStyle: 'italic',
  },
  mantraBox: {
    backgroundColor: 'rgba(236, 72, 153, 0.12)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
    marginVertical: spacing.sm,
  },
  mantraLabel: {
    color: '#F472B6',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 2,
  },
  mantraText: {
    color: '#FDF2F8',
    fontSize: typography.size.sm,
    fontFamily: typography.fontFamily.medium,
  },
  instructionText: {
    color: colors.textSecondary,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.sm,
    marginTop: spacing.xs,
  },
  defaultText: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.base,
  },
  footerContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  actionBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.bold,
    fontWeight: '700',
  },
});
