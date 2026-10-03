/**
 * Unit & Integration Tests for Conversation State Store and Recommendation Registry
 */

import { useConversationStore } from '../state/useConversationStore';
import { RecommendationRegistry } from '../components/recommendations/RecommendationRegistry';
import { generateAstrologicalResponse } from '../services/aiSimulationService';
import { INITIAL_MOCK_CONVERSATION } from '../services/mockApi';

describe('MyNaksh AI Conversation Experience Test Suite', () => {
  beforeEach(() => {
    useConversationStore.getState().resetToMockData();
  });

  describe('Initial State & Mock Payload (Part A)', () => {
    it('loads the initial 4-message conversation matching the required specification', () => {
      const messages = useConversationStore.getState().messages;
      expect(messages.length).toBe(4);
      expect(messages[0].type).toBe('system');
      expect(messages[1].type).toBe('user');
      expect(messages[2].type).toBe('ai');
      expect(messages[3].type).toBe('human');
    });

    it('contains all 4 initial recommendations in the AI response', () => {
      const aiMessage = useConversationStore.getState().messages.find(m => m.type === 'ai');
      expect(aiMessage).toBeDefined();
      expect(aiMessage?.recommendations).toBeDefined();
      expect(aiMessage?.recommendations?.length).toBe(4);

      const types = aiMessage?.recommendations?.map(r => r.type);
      expect(types).toContain('gemstone');
      expect(types).toContain('tarot');
      expect(types).toContain('consultation');
      expect(types).toContain('article');
    });
  });

  describe('Recommendation Registry (Extensible Plugin Architecture)', () => {
    it('has all core recommendation types registered', () => {
      expect(RecommendationRegistry.has('gemstone')).toBe(true);
      expect(RecommendationRegistry.has('tarot')).toBe(true);
      expect(RecommendationRegistry.has('consultation')).toBe(true);
      expect(RecommendationRegistry.has('article')).toBe(true);
      expect(RecommendationRegistry.has('remedy')).toBe(true);
      expect(RecommendationRegistry.has('panchang')).toBe(true);
      expect(RecommendationRegistry.has('promotion')).toBe(true);
    });

    it('gracefully returns fallback descriptor for unknown dynamic backend types without crashing', () => {
      const unknownDescriptor = RecommendationRegistry.getDescriptor('future_ai_audio_reading');
      expect(unknownDescriptor).toBeDefined();
      expect(unknownDescriptor.displayName).toBeDefined();
      expect(unknownDescriptor.Component).toBeDefined();
    });

    it('allows dynamic registration of new custom recommendation experiences at runtime', () => {
      RecommendationRegistry.register({
        type: 'kundli_match',
        displayName: 'Kundli Matching Report',
        defaultIcon: '💍',
        themeColor: '#FF6B6B',
        accentColor: '#FFD93D',
        Component: () => null as any,
      });

      expect(RecommendationRegistry.has('kundli_match')).toBe(true);
      expect(RecommendationRegistry.getDescriptor('kundli_match').displayName).toBe('Kundli Matching Report');
    });
  });

  describe('AI Simulation & Dynamic Recommendation Synthesis', () => {
    it('synthesizes love/marriage recommendations when user asks about relationships', () => {
      const response = generateAstrologicalResponse('Can you tell me about my love life and marriage?');
      expect(response.text).toContain('Venus');
      const recTypes = response.recommendations.map(r => r.type);
      expect(recTypes).toContain('tarot');
      expect(recTypes).toContain('gemstone');
      expect(recTypes).toContain('remedy');
    });

    it('synthesizes wealth & panchang recommendations when user asks about business finance', () => {
      const response = generateAstrologicalResponse('What are the financial prospects for my new business?');
      expect(response.text).toContain('Mercury');
      const recTypes = response.recommendations.map(r => r.type);
      expect(recTypes).toContain('panchang');
      expect(recTypes).toContain('promotion');
    });
  });

  describe('AI Feedback & Expandable Chips (Part B)', () => {
    it('updates rating to like', () => {
      const aiMessage = useConversationStore.getState().messages[2];
      useConversationStore.getState().setFeedbackRating(aiMessage.id, 'like');

      const updated = useConversationStore.getState().messages.find(m => m.id === aiMessage.id);
      expect(updated?.feedback?.rating).toBe('like');
    });

    it('updates rating to dislike and toggles feedback chips', () => {
      const aiMessage = useConversationStore.getState().messages[2];
      useConversationStore.getState().setFeedbackRating(aiMessage.id, 'dislike');
      useConversationStore.getState().toggleFeedbackChip(aiMessage.id, 'Too Generic');
      useConversationStore.getState().toggleFeedbackChip(aiMessage.id, 'Inaccurate');

      let updated = useConversationStore.getState().messages.find(m => m.id === aiMessage.id);
      expect(updated?.feedback?.rating).toBe('dislike');
      expect(updated?.feedback?.selectedChips).toEqual(['Too Generic', 'Inaccurate']);

      // Untoggle chip
      useConversationStore.getState().toggleFeedbackChip(aiMessage.id, 'Too Generic');
      updated = useConversationStore.getState().messages.find(m => m.id === aiMessage.id);
      expect(updated?.feedback?.selectedChips).toEqual(['Inaccurate']);
    });
  });

  describe('Message Actions & State Lifecycle (Part B)', () => {
    it('deletes message from state while preserving remaining messages', () => {
      const initialCount = useConversationStore.getState().messages.length;
      useConversationStore.getState().deleteMessage('2');

      const messages = useConversationStore.getState().messages;
      expect(messages.length).toBe(initialCount - 1);
      expect(messages.find(m => m.id === '2')).toBeUndefined();
    });

    it('sets active reply context', () => {
      useConversationStore.getState().setReplyContext({
        id: '3',
        senderType: 'ai',
        senderName: 'AI Astrologer',
        snippet: 'Saturn influence in your chart',
      });

      expect(useConversationStore.getState().activeReply?.snippet).toBe('Saturn influence in your chart');
    });
  });
});
