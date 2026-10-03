/**
 * Main AI Conversation Screen
 * 
 * Orchestrates:
 * - Conversation timeline with virtualized message rendering
 * - Extensible dynamic recommendations
 * - Context actions (Reply, Copy, Delete)
 * - AI response feedback & rating
 * - Message composer with optimistic updates & simulated responses
 * - Loading, empty, and network error recovery flows
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useConversationStore } from '../state/useConversationStore';
import { ConversationMessage, FeedbackReasonChip } from '../types/conversation';
import { RecommendationItem } from '../types/recommendation';
import { Header } from '../components/common/Header';
import { DevControlBar } from '../components/debug/DevControlBar';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { ErrorBanner } from '../components/common/ErrorBanner';
import { EmptyState } from '../components/common/EmptyState';
import { ConversationTimeline } from '../components/timeline/ConversationTimeline';
import { MessageComposer } from '../components/composer/MessageComposer';
import { MessageActionSheet } from '../components/actions/MessageActionSheet';
import { RecommendationModal } from '../components/recommendations/RecommendationModal';
import { colors } from '../theme/colors';

export const ConversationScreen: React.FC = () => {
  const {
    messages,
    isLoading,
    isAiTyping,
    error,
    activeReply,
    activeRecommendation,
    simulateNetworkFailure,
    simulateHumanHandover,
    loadInitialConversation,
    sendMessage,
    retryMessage,
    deleteMessage,
    setFeedbackRating,
    toggleFeedbackChip,
    setReplyContext,
    openRecommendationDetail,
    closeRecommendationDetail,
    setSimulateNetworkFailure,
    setSimulateHumanHandover,
    clearChat,
    resetToMockData,
  } = useConversationStore();

  const [showDevControls, setShowDevControls] = useState(false);
  const [selectedActionMessage, setSelectedActionMessage] = useState<ConversationMessage | null>(null);

  // Load initial conversation on mount
  useEffect(() => {
    loadInitialConversation();
  }, []);

  const handleLongPress = useCallback((message: ConversationMessage) => {
    setSelectedActionMessage(message);
  }, []);

  const handleCloseActionSheet = useCallback(() => {
    setSelectedActionMessage(null);
  }, []);

  const handleReplyFromSheet = useCallback(
    (message: ConversationMessage) => {
      setReplyContext({
        id: message.id,
        senderType: message.type,
        senderName:
          message.type === 'ai'
            ? 'AI Astrologer'
            : message.type === 'human'
            ? message.astrologerProfile?.name || 'Astrologer'
            : 'You',
        snippet: message.text,
      });
    },
    [setReplyContext]
  );

  const handleDeleteFromSheet = useCallback(
    (messageId: string) => {
      deleteMessage(messageId);
    },
    [deleteMessage]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header Bar */}
      <Header
        onReset={resetToMockData}
        onClear={clearChat}
        showDevControls={showDevControls}
        onToggleDevControls={() => setShowDevControls(!showDevControls)}
        isHumanHandover={simulateHumanHandover}
      />

      {/* Dev & Assessment Toolbox */}
      {showDevControls ? (
        <DevControlBar
          simulateFailure={simulateNetworkFailure}
          onToggleSimulateFailure={setSimulateNetworkFailure}
          simulateHandover={simulateHumanHandover}
          onToggleSimulateHandover={setSimulateHumanHandover}
          onForceLoadError={() => loadInitialConversation(true)}
          onResetMockData={resetToMockData}
          onClearChat={clearChat}
          onClose={() => setShowDevControls(false)}
        />
      ) : null}

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Main Content Area */}
        <View style={styles.contentArea}>
          {isLoading ? (
            <SkeletonLoader />
          ) : error ? (
            <View style={styles.errorContainer}>
              <ErrorBanner error={error} onRetry={() => loadInitialConversation(false)} />
            </View>
          ) : messages.length === 0 ? (
            <EmptyState onSelectQuestion={sendMessage} />
          ) : (
            <ConversationTimeline
              messages={messages}
              isAiTyping={isAiTyping}
              onLongPressMessage={handleLongPress}
              onRetryMessage={retryMessage}
              onRecommendationPress={openRecommendationDetail}
              onRateFeedback={setFeedbackRating}
              onToggleFeedbackChip={toggleFeedbackChip}
            />
          )}
        </View>

        {/* Message Composer */}
        <MessageComposer
          onSendMessage={sendMessage}
          activeReply={activeReply}
          onDismissReply={() => setReplyContext(null)}
          isAiTyping={isAiTyping}
        />
      </KeyboardAvoidingView>

      {/* Long-Press Action Modal */}
      <MessageActionSheet
        message={selectedActionMessage}
        visible={!!selectedActionMessage}
        onClose={handleCloseActionSheet}
        onReply={handleReplyFromSheet}
        onDelete={handleDeleteFromSheet}
      />

      {/* Recommendation Deep-Dive Modal */}
      <RecommendationModal
        item={activeRecommendation}
        visible={!!activeRecommendation}
        onClose={closeRecommendationDetail}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentArea: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
