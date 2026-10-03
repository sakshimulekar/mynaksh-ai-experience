/**
 * Zustand Store for MyNaksh AI Conversation
 * 
 * Manages:
 * - Timeline messages list
 * - Optimistic message sending and lifecycle states ('sending' -> 'sent' | 'failed')
 * - Dynamic AI responses with recommendation synthesis
 * - Message actions (Reply, Copy, Delete, Retry)
 * - AI response feedback (Like/Dislike and expandable feedback chips)
 * - Initial loading, empty, and network error recovery states
 */

import { create } from 'zustand';
import {
  ConversationMessage,
  FeedbackReasonChip,
  ReplyContext,
} from '../types/conversation';
import { RecommendationItem } from '../types/recommendation';
import { INITIAL_MOCK_CONVERSATION, fetchConversationData } from '../services/mockApi';
import { generateAstrologicalResponse } from '../services/aiSimulationService';

interface ConversationState {
  // Timeline State
  messages: ConversationMessage[];
  isLoading: boolean;
  isAiTyping: boolean;
  error: string | null;

  // Active Contexts
  activeReply: ReplyContext | null;
  activeRecommendation: RecommendationItem | null;

  // Testing & Simulation Toggles
  simulateNetworkFailure: boolean;
  simulateHumanHandover: boolean;

  // Actions
  loadInitialConversation: (forceError?: boolean) => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  retryMessage: (messageId: string) => Promise<void>;
  deleteMessage: (messageId: string) => void;
  setFeedbackRating: (messageId: string, rating: 'like' | 'dislike') => void;
  toggleFeedbackChip: (messageId: string, chip: FeedbackReasonChip) => void;
  setReplyContext: (reply: ReplyContext | null) => void;
  openRecommendationDetail: (item: RecommendationItem) => void;
  closeRecommendationDetail: () => void;
  setSimulateNetworkFailure: (simulate: boolean) => void;
  setSimulateHumanHandover: (simulate: boolean) => void;
  clearChat: () => void;
  resetToMockData: () => void;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  messages: [],
  isLoading: true,
  isAiTyping: false,
  error: null,
  activeReply: null,
  activeRecommendation: null,
  simulateNetworkFailure: false,
  simulateHumanHandover: false,

  /**
   * Load initial conversation mock dataset with loading and error handling
   */
  loadInitialConversation: async (forceError = false) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchConversationData(forceError || get().simulateNetworkFailure);
      set({ messages: data, isLoading: false, error: null });
    } catch (err: any) {
      set({
        error: err?.message || 'Unable to connect with AI Astrologer. Please check your network.',
        isLoading: false,
      });
    }
  },

  /**
   * Optimistically send a message and simulate AI/Astrologer response
   */
  sendMessage: async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const reply = get().activeReply;
    const userMessageId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const optimisticMessage: ConversationMessage = {
      id: userMessageId,
      type: 'user',
      text: trimmed,
      createdAt: Date.now(),
      status: 'sending',
      replyTo: reply || undefined,
    };

    // Optimistically insert message & clear reply preview
    set(state => ({
      messages: [...state.messages, optimisticMessage],
      activeReply: null,
      error: null,
    }));

    // Simulate Network Latency
    await new Promise(res => setTimeout(res, 800));

    // Check if network failure is simulated
    if (get().simulateNetworkFailure) {
      set(state => ({
        messages: state.messages.map(m =>
          m.id === userMessageId ? { ...m, status: 'failed' } : m
        ),
      }));
      return;
    }

    // Mark user message as sent
    set(state => ({
      messages: state.messages.map(m =>
        m.id === userMessageId ? { ...m, status: 'sent' } : m
      ),
      isAiTyping: true,
    }));

    // Simulate AI thinking and typing delay
    await new Promise(res => setTimeout(res, 1200));

    const isHumanHandover = get().simulateHumanHandover;

    if (isHumanHandover) {
      // Human Astrologer Response
      const humanMessage: ConversationMessage = {
        id: `human-${Date.now()}`,
        type: 'human',
        text: `I reviewed your query about "${trimmed}". In Vedic astrology, aligning your planetary remedies with your birth Moon sign will yield rapid harmony.`,
        createdAt: Date.now(),
        astrologerProfile: {
          name: 'Acharya Raghav Sharma',
          title: 'Senior Vedic Astrologer',
          verified: true,
        },
      };

      set(state => ({
        messages: [...state.messages, humanMessage],
        isAiTyping: false,
      }));
    } else {
      // Dynamic AI Response with dynamic recommendations
      const aiResponse = generateAstrologicalResponse(trimmed);
      const aiMessage: ConversationMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        text: aiResponse.text,
        createdAt: Date.now(),
        recommendations: aiResponse.recommendations,
        feedback: {
          rating: null,
          selectedChips: [],
        },
      };

      set(state => ({
        messages: [...state.messages, aiMessage],
        isAiTyping: false,
      }));
    }
  },

  /**
   * Retry sending a failed message
   */
  retryMessage: async (messageId: string) => {
    const targetMsg = get().messages.find(m => m.id === messageId);
    if (!targetMsg) return;

    // Set back to sending state
    set(state => ({
      messages: state.messages.map(m =>
        m.id === messageId ? { ...m, status: 'sending' } : m
      ),
    }));

    await new Promise(res => setTimeout(res, 900));

    // If still simulating failure, keep failed
    if (get().simulateNetworkFailure) {
      set(state => ({
        messages: state.messages.map(m =>
          m.id === messageId ? { ...m, status: 'failed' } : m
        ),
      }));
      return;
    }

    // Success: mark sent and trigger AI response
    set(state => ({
      messages: state.messages.map(m =>
        m.id === messageId ? { ...m, status: 'sent' } : m
      ),
      isAiTyping: true,
    }));

    await new Promise(res => setTimeout(res, 1200));

    const aiResponse = generateAstrologicalResponse(targetMsg.text);
    const aiMessage: ConversationMessage = {
      id: `ai-${Date.now()}`,
      type: 'ai',
      text: aiResponse.text,
      createdAt: Date.now(),
      recommendations: aiResponse.recommendations,
      feedback: {
        rating: null,
        selectedChips: [],
      },
    };

    set(state => ({
      messages: [...state.messages, aiMessage],
      isAiTyping: false,
    }));
  },

  /**
   * Delete message and preserve conversation state
   */
  deleteMessage: (messageId: string) => {
    set(state => ({
      messages: state.messages.filter(m => m.id !== messageId),
    }));
  },

  /**
   * Set Like or Dislike rating for an AI message
   */
  setFeedbackRating: (messageId: string, rating: 'like' | 'dislike') => {
    set(state => ({
      messages: state.messages.map(m => {
        if (m.id !== messageId) return m;
        const currentRating = m.feedback?.rating;
        const newRating = currentRating === rating ? null : rating;
        return {
          ...m,
          feedback: {
            rating: newRating,
            selectedChips: newRating === 'dislike' ? (m.feedback?.selectedChips || []) : [],
            updatedAt: Date.now(),
          },
        };
      }),
    }));
  },

  /**
   * Toggle a feedback chip (e.g. Inaccurate, Too Generic)
   */
  toggleFeedbackChip: (messageId: string, chip: FeedbackReasonChip) => {
    set(state => ({
      messages: state.messages.map(m => {
        if (m.id !== messageId) return m;
        const currentChips = m.feedback?.selectedChips || [];
        const exists = currentChips.includes(chip);
        const updatedChips = exists
          ? currentChips.filter(c => c !== chip)
          : [...currentChips, chip];

        return {
          ...m,
          feedback: {
            rating: 'dislike',
            selectedChips: updatedChips,
            updatedAt: Date.now(),
          },
        };
      }),
    }));
  },

  /**
   * Set active reply context for the message composer
   */
  setReplyContext: (reply: ReplyContext | null) => {
    set({ activeReply: reply });
  },

  /**
   * Open full modal for a recommendation card
   */
  openRecommendationDetail: (item: RecommendationItem) => {
    set({ activeRecommendation: item });
  },

  /**
   * Close recommendation modal
   */
  closeRecommendationDetail: () => {
    set({ activeRecommendation: null });
  },

  setSimulateNetworkFailure: (simulate: boolean) => {
    set({ simulateNetworkFailure: simulate });
  },

  setSimulateHumanHandover: (simulate: boolean) => {
    set({ simulateHumanHandover: simulate });
  },

  /**
   * Clear chat to view Empty State
   */
  clearChat: () => {
    set({ messages: [], activeReply: null });
  },

  /**
   * Reset back to initial baseline prompt dataset
   */
  resetToMockData: () => {
    set({
      messages: JSON.parse(JSON.stringify(INITIAL_MOCK_CONVERSATION)),
      activeReply: null,
      error: null,
      isLoading: false,
    });
  },
}));
