/**
 * Message Container Component
 * 
 * Determines message grouping, date separators, and delegates rendering
 * to the appropriate specialized message component.
 */

import React from 'react';
import { View } from 'react-native';
import { ConversationMessage, FeedbackReasonChip } from '../../types/conversation';
import { RecommendationItem } from '../../types/recommendation';
import { DateSeparator } from './DateSeparator';
import { UserMessage } from './UserMessage';
import { AIMessage } from './AIMessage';
import { HumanMessage } from './HumanMessage';
import { SystemMessage } from './SystemMessage';

interface MessageContainerProps {
  message: ConversationMessage;
  previousMessage?: ConversationMessage;
  nextMessage?: ConversationMessage;
  onLongPress: (message: ConversationMessage) => void;
  onRetry: (messageId: string) => void;
  onRecommendationPress: (item: RecommendationItem) => void;
  onRateFeedback: (messageId: string, rating: 'like' | 'dislike') => void;
  onToggleFeedbackChip: (messageId: string, chip: FeedbackReasonChip) => void;
}

export const MessageContainer: React.FC<MessageContainerProps> = React.memo(({
  message,
  previousMessage,
  nextMessage,
  onLongPress,
  onRetry,
  onRecommendationPress,
  onRateFeedback,
  onToggleFeedbackChip,
}) => {
  // Check if date changed between previous and current message
  const showDateSeparator = React.useMemo(() => {
    if (!previousMessage) return true;
    const prevDate = new Date(previousMessage.createdAt).toDateString();
    const currDate = new Date(message.createdAt).toDateString();
    return prevDate !== currDate;
  }, [previousMessage?.createdAt, message.createdAt]);

  // Grouping criteria: same sender type and sent within 5 minutes
  const isGroupedWithPrevious = React.useMemo(() => {
    if (!previousMessage) return false;
    if (showDateSeparator) return false;
    const sameSender = previousMessage.type === message.type;
    const within5Mins = Math.abs(message.createdAt - previousMessage.createdAt) < 5 * 60 * 1000;
    return sameSender && within5Mins && message.type !== 'system';
  }, [previousMessage, message, showDateSeparator]);

  const isGroupedWithNext = React.useMemo(() => {
    if (!nextMessage) return false;
    const sameSender = nextMessage.type === message.type;
    const within5Mins = Math.abs(nextMessage.createdAt - message.createdAt) < 5 * 60 * 1000;
    return sameSender && within5Mins && message.type !== 'system';
  }, [nextMessage, message]);

  const renderMessageContent = () => {
    switch (message.type) {
      case 'user':
        return (
          <UserMessage
            message={message}
            isGroupedWithPrevious={isGroupedWithPrevious}
            isGroupedWithNext={isGroupedWithNext}
            onLongPress={onLongPress}
            onRetry={onRetry}
          />
        );

      case 'ai':
        return (
          <AIMessage
            message={message}
            isGroupedWithPrevious={isGroupedWithPrevious}
            isGroupedWithNext={isGroupedWithNext}
            onLongPress={onLongPress}
            onRecommendationPress={onRecommendationPress}
            onRateFeedback={onRateFeedback}
            onToggleFeedbackChip={onToggleFeedbackChip}
          />
        );

      case 'human':
        return (
          <HumanMessage
            message={message}
            isGroupedWithPrevious={isGroupedWithPrevious}
            isGroupedWithNext={isGroupedWithNext}
            onLongPress={onLongPress}
          />
        );

      case 'system':
      default:
        return <SystemMessage message={message} />;
    }
  };

  return (
    <View>
      {showDateSeparator ? <DateSeparator timestamp={message.createdAt} /> : null}
      {renderMessageContent()}
    </View>
  );
});
