/**
 * Virtualized Conversation Timeline
 * 
 * High-performance chat list supporting message virtualization, auto-scrolling,
 * typing indicators, and smooth state updates.
 */

import React, { useRef, useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItemInfo,
  Platform,
} from 'react-native';
import { ConversationMessage, FeedbackReasonChip } from '../../types/conversation';
import { RecommendationItem } from '../../types/recommendation';
import { MessageContainer } from './MessageContainer';
import { TypingIndicator } from './TypingIndicator';
import { spacing } from '../../theme/spacing';

interface ConversationTimelineProps {
  messages: ConversationMessage[];
  isAiTyping: boolean;
  onLongPressMessage: (message: ConversationMessage) => void;
  onRetryMessage: (messageId: string) => void;
  onRecommendationPress: (item: RecommendationItem) => void;
  onRateFeedback: (messageId: string, rating: 'like' | 'dislike') => void;
  onToggleFeedbackChip: (messageId: string, chip: FeedbackReasonChip) => void;
}

export const ConversationTimeline: React.FC<ConversationTimelineProps> = ({
  messages,
  isAiTyping,
  onLongPressMessage,
  onRetryMessage,
  onRecommendationPress,
  onRateFeedback,
  onToggleFeedbackChip,
}) => {
  const flatListRef = useRef<FlatList<ConversationMessage>>(null);

  // Auto-scroll to latest message when new messages arrive or AI starts typing
  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 120);
    return () => clearTimeout(timer);
  }, [messages.length, isAiTyping]);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ConversationMessage>) => {
      const prevMsg = index > 0 ? messages[index - 1] : undefined;
      const nextMsg = index < messages.length - 1 ? messages[index + 1] : undefined;

      return (
        <MessageContainer
          message={item}
          previousMessage={prevMsg}
          nextMessage={nextMsg}
          onLongPress={onLongPressMessage}
          onRetry={onRetryMessage}
          onRecommendationPress={onRecommendationPress}
          onRateFeedback={onRateFeedback}
          onToggleFeedbackChip={onToggleFeedbackChip}
        />
      );
    },
    [
      messages,
      onLongPressMessage,
      onRetryMessage,
      onRecommendationPress,
      onRateFeedback,
      onToggleFeedbackChip,
    ]
  );

  const keyExtractor = useCallback((item: ConversationMessage) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        initialNumToRender={12}
        maxToRenderPerBatch={10}
        windowSize={11}
        removeClippedSubviews={Platform.OS !== 'web'}
        ListFooterComponent={isAiTyping ? <TypingIndicator /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl,
  },
});
