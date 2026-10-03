/**
 * Dynamic AI Astrology Simulation Service
 * 
 * Generates context-aware astrological responses and dynamically attaches
 * relevant recommendation experiences based on the user prompt.
 */

import { ConversationMessage } from '../types/conversation';
import { RecommendationItem } from '../types/recommendation';

export interface AISimulationResponse {
  text: string;
  recommendations: RecommendationItem[];
}

export function generateAstrologicalResponse(userPrompt: string): AISimulationResponse {
  const lower = userPrompt.toLowerCase();

  // 1. Love / Marriage / Relationship
  if (lower.includes('love') || lower.includes('marriage') || lower.includes('partner') || lower.includes('relationship') || lower.includes('soulmate')) {
    return {
      text: 'Venus (Shukra) is currently in a harmonious 5th house alignment with your Natal Moon. While passion is rising, Mars creates occasional friction in communication. Here are curated remedies and readings for your relationship:',
      recommendations: [
        {
          id: `rec-tarot-${Date.now()}`,
          type: 'tarot',
          title: 'Soulmate & Compatibility Tarot',
          subtitle: 'Love Guidance Spread',
          cardName: 'The Lovers & Two of Cups',
          energyAlignment: '94% Harmonic Resonance',
          element: 'Water',
          badge: 'High Accuracy',
          actionLabel: 'Reveal Love Cards',
          insightsSummary: 'A deep emotional breakthrough is approaching. Sincerity and vulnerability will unlock marital harmony.',
        },
        {
          id: `rec-gem-${Date.now()}`,
          type: 'gemstone',
          title: 'Natural Opal / Rose Quartz',
          subtitle: 'Energized for Venus (Shukra)',
          planet: 'Venus (Shukra)',
          gemstoneColor: '#F472B6',
          carat: '5.5 Ratti',
          metal: 'Silver / White Gold',
          badge: 'Love Catalyst',
          benefits: [
            'Attracts affectionate harmony and reduces arguments',
            'Enhances charm, mutual understanding, and warmth',
          ],
          energized: true,
          actionLabel: 'Order Energized Gemstone',
        },
        {
          id: `rec-rem-${Date.now()}`,
          type: 'remedy',
          title: 'Friday Shukra Gauri Remedy',
          subtitle: 'Vedic Ritual for Venus Blessings',
          dayOfWeek: 'Friday Evening',
          timing: 'During Twilight (Godhuli Bela)',
          mantra: 'Om Shum Shukraya Namaha (108 times)',
          deity: 'Goddess Mahalakshmi',
          instructions: 'Light a pure cow ghee diya facing North-East and offer white flowers with pure devotion.',
          badge: 'Weekly Remedy',
          actionLabel: 'View Detailed Ritual',
        },
        {
          id: `rec-cons-${Date.now()}`,
          type: 'consultation',
          title: 'Consult Love Astrologer',
          subtitle: 'Kundli Milan & Relationship Specialist',
          astrologerName: 'Dr. Sunita Deshmukh',
          specialty: 'Synastry, Manglik Dosha & Marriage',
          rating: 4.95,
          experienceYears: 19,
          pricePerMin: '₹30/min',
          isOnline: true,
          badge: 'Top Rated',
          actionLabel: 'Call Now',
        },
      ],
    };
  }

  // 2. Wealth / Money / Business / Investment
  if (lower.includes('money') || lower.includes('wealth') || lower.includes('business') || lower.includes('finance') || lower.includes('invest')) {
    return {
      text: 'Mercury (Budh) governs your 2nd and 11th wealth houses. The present planetary transit indicates lucrative opportunities in trading and enterprise, provided you mitigate Rahu’s speculative illusions.',
      recommendations: [
        {
          id: `rec-gem-${Date.now()}`,
          type: 'gemstone',
          title: 'Zambian Emerald (Panna)',
          subtitle: 'Recommended for Mercury (Budh)',
          planet: 'Mercury (Budh)',
          gemstoneColor: '#10B981',
          carat: '4.85 Ratti',
          metal: 'Gold / Panchdhatu',
          badge: 'Wealth Enhancer',
          benefits: [
            'Sharpens financial acumen and analytical skills',
            'Attracts steady business expansion and profits',
          ],
          energized: true,
          actionLabel: 'View Emerald Specs',
        },
        {
          id: `rec-panch-${Date.now()}`,
          type: 'panchang',
          title: 'Daily Financial Panchang',
          subtitle: 'Auspicious Muhurat for Transactions',
          tithi: 'Shukla Paksha Dashami',
          nakshatra: 'Pushya Nakshatra (Amrit Siddhi Yoga)',
          rahuKaal: '10:30 AM - 12:00 PM (Avoid)',
          shubhMuhurat: '02:15 PM - 04:30 PM (Ideal for Deals)',
          badge: 'Today’s Muhurat',
          actionLabel: 'Open Full Panchang',
        },
        {
          id: `rec-promo-${Date.now()}`,
          type: 'promotion',
          title: 'Festive Kuber Wealth Yantra Offer',
          subtitle: 'Consecrated Gold-Plated Yantra',
          discountCode: 'LAKSHMI25',
          discountPercentage: '25% OFF',
          expiryText: 'Valid for next 48 hours',
          badge: 'Limited Offer',
          actionLabel: 'Claim 25% Discount',
        },
        {
          id: `rec-cons-${Date.now()}`,
          type: 'consultation',
          title: 'Talk to Wealth Astrologer',
          subtitle: 'Vedic Business Astrologer',
          astrologerName: 'Pt. Rameshwar Shastri',
          specialty: 'Stock Market & Business Muhurat',
          rating: 4.88,
          experienceYears: 22,
          pricePerMin: '₹35/min',
          isOnline: true,
          badge: 'Online',
          actionLabel: 'Consult Pt. Rameshwar',
        },
      ],
    };
  }

  // 3. Remedy / Health / Dosha / Negative Energy
  if (lower.includes('remedy') || lower.includes('health') || lower.includes('dosha') || lower.includes('mangal') || lower.includes('puja') || lower.includes('negative')) {
    return {
      text: 'A subtle planetary imbalance is temporarily affecting your aura and vitality. Practicing ancient Vedic remedial measures will restore harmony and ward off malefic planetary rays.',
      recommendations: [
        {
          id: `rec-rem-${Date.now()}`,
          type: 'remedy',
          title: 'Maha Mrityunjaya Healing Remedy',
          subtitle: 'Sacred Shiva Chanting Ritual',
          dayOfWeek: 'Monday Morning',
          timing: 'Brahma Muhurta (04:30 AM - 05:45 AM)',
          mantra: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam',
          deity: 'Lord Shiva',
          instructions: 'Perform milk and water abhishekam to a Shivling while chanting the sacred mantra 11 times.',
          badge: 'Protective Remedy',
          actionLabel: 'View Puja Steps',
        },
        {
          id: `rec-gem-${Date.now()}`,
          type: 'gemstone',
          title: 'Natural Red Coral (Moonga)',
          subtitle: 'For Mars & Vital Energy',
          planet: 'Mars (Mangal)',
          gemstoneColor: '#DC2626',
          carat: '6.15 Ratti',
          metal: 'Copper / Gold',
          badge: 'Vitality Shield',
          benefits: [
            'Boosts physical stamina and courage',
            'Alleviates Manglik Dosha tension',
          ],
          energized: true,
          actionLabel: 'Examine Moonga',
        },
        {
          id: `rec-art-${Date.now()}`,
          type: 'article',
          title: 'The Science of Planetary Gem Therapy',
          subtitle: 'Vedic Light & Crystal Physics',
          category: 'Holistic Astrology',
          readTimeMinutes: 5,
          author: 'Acharya Raghav',
          summary: 'How specific mineral crystal structures refract cosmic wavelengths to replenish deficient planetary frequencies in the human body.',
          badge: 'Trending Guide',
          actionLabel: 'Read Full Guide',
        },
      ],
    };
  }

  // Default / General Astrological Response
  return {
    text: `I have cast your celestial chart for this query. The cosmic alignments indicate pivotal transitions ahead. Here are recommended experiences tailored to guide your next step:`,
    recommendations: [
      {
        id: `rec-tarot-${Date.now()}`,
        type: 'tarot',
        title: 'Celestial Tarot Divination',
        subtitle: 'Uncover Hidden Cosmic Currents',
        cardName: 'The High Priestess & The Star',
        energyAlignment: '91% Intuitive Flow',
        element: 'Air',
        badge: 'Featured',
        actionLabel: 'Start Reading',
        insightsSummary: 'Trust your inner intuition. A guiding opportunity will present itself within the next lunar phase.',
      },
      {
        id: `rec-gem-${Date.now()}`,
        type: 'gemstone',
        title: 'Yellow Sapphire (Pukhraj)',
        subtitle: 'For Jupiter (Brihaspati) Blessings',
        planet: 'Jupiter (Guru)',
        gemstoneColor: '#FBBF24',
        carat: '4.50 Ratti',
        metal: 'Gold',
        badge: 'Master Gemstone',
        benefits: [
          'Bestows divine wisdom, prosperity, and spiritual growth',
          'Strengthens fortune and auspicious endeavors',
        ],
        energized: true,
        actionLabel: 'View Details',
      },
      {
        id: `rec-cons-${Date.now()}`,
        type: 'consultation',
        title: 'Deep Kundli Consultation',
        subtitle: '1-on-1 with Vedic Master',
        astrologerName: 'Acharya Raghav Sharma',
        specialty: 'Dasha Phala & Life Roadmap',
        rating: 4.9,
        experienceYears: 16,
        pricePerMin: '₹25/min',
        isOnline: true,
        badge: 'Top Astrologer',
        actionLabel: 'Connect Instantly',
      },
      {
        id: `rec-art-${Date.now()}`,
        type: 'article',
        title: 'Navigating Planetary Dashas in 2026',
        subtitle: 'Comprehensive Astrological Roadmap',
        category: 'Astrology Insights',
        readTimeMinutes: 6,
        author: 'MyNaksh Editorial Team',
        summary: 'A step-by-step masterclass on tracking your Mahadasha and Antardasha cycles to time major life decisions.',
        badge: 'Recommended',
        actionLabel: 'Read Now',
      },
    ],
  };
}
