/**
 * Mock API Service for MyNaksh AI Conversation
 * 
 * Provides the required baseline initial dataset (Part A & B)
 * plus enriched astrological metadata and multiple scenario datasets.
 */

import { ConversationMessage } from '../types/conversation';

export const INITIAL_MOCK_CONVERSATION: ConversationMessage[] = [
  {
    id: '1',
    type: 'system',
    text: 'Your session with AI Astrologer has started.',
    createdAt: Date.now() - 1000 * 60 * 15, // 15 mins ago
  },
  {
    id: '2',
    type: 'user',
    text: 'Can you tell me about my career this year?',
    createdAt: Date.now() - 1000 * 60 * 12, // 12 mins ago
    status: 'sent',
  },
  {
    id: '3',
    type: 'ai',
    text: 'I can already see a strong Saturn influence in your chart. Based on this, here are a few recommendations that may help you.',
    createdAt: Date.now() - 1000 * 60 * 11, // 11 mins ago
    feedback: {
      rating: null,
      selectedChips: [],
    },
    recommendations: [
      {
        id: 'rec-1',
        type: 'gemstone',
        title: 'Blue Sapphire',
        subtitle: 'Recommended for Saturn',
        planet: 'Saturn (Shani)',
        gemstoneColor: '#2563EB',
        carat: '4.25 Ratti (Ceylon)',
        metal: 'Panchdhatu / Silver',
        badge: 'Top Astrological Match',
        benefits: [
          'Accelerates career breakthroughs & promotions',
          'Shields from adverse Saturn Sade Sati impacts',
          'Enhances mental clarity and decision making',
        ],
        energized: true,
        actionLabel: 'View Certified Gemstone',
      },
      {
        id: 'rec-2',
        type: 'tarot',
        title: 'Career Tarot Reading',
        subtitle: '3-Card Spread for 2026',
        cardName: 'The Wheel of Fortune & The Emperor',
        energyAlignment: '88% Aligned with Saturnian Transit',
        element: 'Earth',
        insightsSummary: 'A major transition is indicated in Q3. Patience during retrospective cycles will yield executive rewards.',
        badge: 'Instant Draw',
        actionLabel: 'Draw Cards Now',
      },
      {
        id: 'rec-3',
        type: 'consultation',
        title: 'Talk to an Astrologer',
        subtitle: 'Verified Vedic Master',
        astrologerName: 'Acharya Raghav Sharma',
        specialty: 'Career, Transit & Kundli Analysis',
        rating: 4.9,
        experienceYears: 16,
        pricePerMin: '₹25/min',
        isOnline: true,
        badge: 'Available Now',
        actionLabel: 'Start Call / Chat',
      },
      {
        id: 'rec-4',
        type: 'article',
        title: 'Understanding Saturn Mahadasha',
        subtitle: 'Vedic Wisdom Series',
        category: 'Planetary Transits',
        readTimeMinutes: 4,
        author: 'MyNaksh Editorial',
        summary: 'Learn how Shani Dev tests endurance to reward long-term discipline in modern professions.',
        badge: 'Editor’s Pick',
        actionLabel: 'Read Article',
      },
    ],
  },
  {
    id: '4',
    type: 'human',
    text: 'I also recommend focusing on your upcoming Jupiter transit. A Guru Brihaspati puja will balance Saturn’s heavy karma.',
    createdAt: Date.now() - 1000 * 60 * 8, // 8 mins ago
    astrologerProfile: {
      name: 'Acharya Raghav Sharma',
      title: 'Senior Vedic Astrologer (16 yrs exp)',
      verified: true,
    },
  },
];

/**
 * Fetch initial conversation with simulated network delay
 */
export async function fetchConversationData(shouldFail = false): Promise<ConversationMessage[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Celestial network timeout. Unable to synchronize chart readings.'));
      } else {
        resolve(JSON.parse(JSON.stringify(INITIAL_MOCK_CONVERSATION)));
      }
    }, 700);
  });
}
