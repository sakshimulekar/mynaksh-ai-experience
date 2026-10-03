/**
 * Message Composer Component
 * 
 * Includes text input, quick prompt pills, reply preview, and send triggers.
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { ReplyContext, QuickPrompt } from '../../types/conversation';
import { ReplyPreview } from './ReplyPreview';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing, shadows } from '../../theme/spacing';

const QUICK_PROMPTS: QuickPrompt[] = [
  { id: 'p1', label: '🔮 Career Tarot Reading', icon: '🔮', promptText: 'Can you do a career tarot reading for me?' },
  { id: 'p2', label: '💎 Gemstone for Saturn', icon: '💎', promptText: 'Which gemstone should I wear for Saturn Sade Sati?' },
  { id: 'p3', label: '🪔 Friday Love Remedy', icon: '🪔', promptText: 'What remedy can I do to improve my relationship harmony?' },
  { id: 'p4', label: '📅 Financial Muhurat', icon: '📅', promptText: 'What is the auspicious muhurat for wealth and business today?' },
  { id: 'p5', label: '👨‍🏫 Talk to Astrologer', icon: '👨‍🏫', promptText: 'I want to speak with a verified Vedic astrologer for Kundli matching.' },
];

interface MessageComposerProps {
  onSendMessage: (text: string) => void;
  activeReply: ReplyContext | null;
  onDismissReply: () => void;
  isAiTyping?: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
  activeReply,
  onDismissReply,
  isAiTyping,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputText('');
  };

  const handleQuickPrompt = (prompt: QuickPrompt) => {
    onSendMessage(prompt.promptText);
  };

  const isSendDisabled = !inputText.trim() || isAiTyping;

  return (
    <View style={styles.container}>
      {/* Quick Astrological Prompts Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickPromptsScroll}
        nestedScrollEnabled={true}
        directionalLockEnabled={true}
      >
        {QUICK_PROMPTS.map(p => (
          <TouchableOpacity
            key={p.id}
            activeOpacity={0.7}
            style={styles.quickChip}
            onPress={() => handleQuickPrompt(p)}
          >
            <Text style={styles.quickChipText}>{p.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Reply Preview Header if active */}
      <ReplyPreview reply={activeReply} onDismiss={onDismissReply} />

      {/* Input Bar */}
      <View style={[styles.inputBar, shadows.subtle]}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder={activeReply ? 'Type your reply...' : 'Ask AI Astrologer anything...'}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          multiline
          maxLength={1000}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          blurOnSubmit={false}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isSendDisabled}
          onPress={handleSend}
          style={[
            styles.sendButton,
            isSendDisabled ? styles.sendButtonDisabled : styles.sendButtonActive,
          ]}
        >
          <Text style={styles.sendIcon}>➔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceBorder,
    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
  },
  quickPromptsScroll: {
    paddingHorizontal: spacing.sm,
    paddingBottom: 6,
    gap: 8,
  },
  quickChip: {
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
  },
  quickChipText: {
    color: '#DDD6FE',
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.medium,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: typography.size.base,
    fontFamily: typography.fontFamily.regular,
    maxHeight: 110,
    minHeight: 38,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.xs,
    marginBottom: 2,
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  sendIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }],
  },
});
