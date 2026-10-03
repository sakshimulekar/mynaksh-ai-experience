/**
 * Long-Press Context Action Sheet
 * 
 * Provides: Reply, Copy, Delete, and Consult Astrologer actions for any message.
 */

import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ConversationMessage, MessageType } from '../../types/conversation';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

interface MessageActionSheetProps {
  message: ConversationMessage | null;
  visible: boolean;
  onClose: () => void;
  onReply: (message: ConversationMessage) => void;
  onDelete: (messageId: string) => void;
}

export const MessageActionSheet: React.FC<MessageActionSheetProps> = ({
  message,
  visible,
  onClose,
  onReply,
  onDelete,
}) => {
  if (!message) return null;

  const handleCopy = async () => {
    await Clipboard.setStringAsync(message.text);
    onClose();
    if (Platform.OS === 'web') {
      window.alert('📋 Message text copied to clipboard!');
    } else {
      Alert.alert('Copied', 'Message text copied to clipboard.');
    }
  };

  const handleReply = () => {
    onReply(message);
    onClose();
  };

  const handleDelete = () => {
    onDelete(message.id);
    onClose();
  };

  const getSenderTitle = (type: MessageType) => {
    switch (type) {
      case 'user':
        return 'Your Message';
      case 'ai':
        return 'AI Astrologer Message';
      case 'human':
        return 'Human Astrologer Message';
      default:
        return 'System Message';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.sheetContent, shadows.medium]}>
          {/* Header Preview */}
          <View style={styles.header}>
            <Text style={styles.senderTitle}>{getSenderTitle(message.type)}</Text>
            <Text style={styles.snippetText} numberOfLines={2}>
              "{message.text}"
            </Text>
          </View>

          {/* Action List */}
          <View style={styles.actionList}>
            {/* Reply Action */}
            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.7}
              onPress={handleReply}
            >
              <Text style={styles.actionIcon}>💬</Text>
              <View style={styles.actionTextWrap}>
                <Text style={styles.actionTitle}>Reply</Text>
                <Text style={styles.actionDesc}>Quote this message in your next query</Text>
              </View>
            </TouchableOpacity>

            {/* Copy Action */}
            <TouchableOpacity
              style={styles.actionItem}
              activeOpacity={0.7}
              onPress={handleCopy}
            >
              <Text style={styles.actionIcon}>📋</Text>
              <View style={styles.actionTextWrap}>
                <Text style={styles.actionTitle}>Copy Text</Text>
                <Text style={styles.actionDesc}>Copy reading to clipboard</Text>
              </View>
            </TouchableOpacity>

            {/* Delete Action */}
            <TouchableOpacity
              style={[styles.actionItem, styles.actionItemDelete]}
              activeOpacity={0.7}
              onPress={handleDelete}
            >
              <Text style={styles.actionIcon}>🗑️</Text>
              <View style={styles.actionTextWrap}>
                <Text style={[styles.actionTitle, styles.actionTitleDelete]}>Delete Message</Text>
                <Text style={styles.actionDesc}>Remove from conversation history</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Cancel Button */}
          <TouchableOpacity
            style={styles.cancelBtn}
            activeOpacity={0.8}
            onPress={onClose}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 5, 12, 0.7)',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  sheetContent: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    padding: spacing.base,
    marginBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: spacing.sm,
    marginBottom: spacing.sm,
  },
  senderTitle: {
    color: colors.primaryLight,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  snippetText: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    fontStyle: 'italic',
  },
  actionList: {
    gap: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  actionItemDelete: {
    backgroundColor: 'rgba(239, 68, 68, 0.06)',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  actionTextWrap: {
    flex: 1,
  },
  actionTitle: {
    color: colors.text,
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.semibold,
  },
  actionTitleDelete: {
    color: '#F87171',
  },
  actionDesc: {
    color: colors.textMuted,
    fontSize: typography.size.xs,
  },
  cancelBtn: {
    marginTop: spacing.md,
    paddingVertical: 12,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: colors.text,
    fontSize: typography.size.base,
    fontWeight: '600',
  },
});
