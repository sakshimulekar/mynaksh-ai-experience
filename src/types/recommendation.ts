/**
 * Recommendation Types for MyNaksh AI Conversation Platform
 * 
 * Scalable plugin-style recommendation definitions.
 * New recommendation types can be added seamlessly by creating a new interface
 * and registering the component in the RecommendationRegistry.
 */

export type RecommendationType =
  | 'gemstone'
  | 'tarot'
  | 'consultation'
  | 'article'
  | 'remedy'
  | 'panchang'
  | 'promotion'
  | string; // open for custom dynamically registered types

export interface BaseRecommendation {
  id: string;
  type: RecommendationType;
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: string;
  actionLabel?: string;
  metadata?: Record<string, any>;
}

export interface GemstoneRecommendation extends BaseRecommendation {
  type: 'gemstone';
  planet?: string;
  gemstoneColor?: string;
  carat?: string;
  metal?: string;
  benefits?: string[];
  energized?: boolean;
}

export interface TarotRecommendation extends BaseRecommendation {
  type: 'tarot';
  spreadType?: string;
  cardName?: string;
  energyAlignment?: string;
  element?: 'Fire' | 'Water' | 'Air' | 'Earth';
  insightsSummary?: string;
}

export interface ConsultationRecommendation extends BaseRecommendation {
  type: 'consultation';
  astrologerName?: string;
  specialty?: string;
  rating?: number;
  experienceYears?: number;
  pricePerMin?: string;
  isOnline?: boolean;
  avatarUrl?: string;
}

export interface ArticleRecommendation extends BaseRecommendation {
  type: 'article';
  readTimeMinutes?: number;
  category?: string;
  author?: string;
  summary?: string;
}

export interface RemedyRecommendation extends BaseRecommendation {
  type: 'remedy';
  dayOfWeek?: string;
  timing?: string;
  mantra?: string;
  deity?: string;
  instructions?: string;
}

export interface PanchangRecommendation extends BaseRecommendation {
  type: 'panchang';
  tithi?: string;
  nakshatra?: string;
  rahuKaal?: string;
  shubhMuhurat?: string;
}

export interface PromotionRecommendation extends BaseRecommendation {
  type: 'promotion';
  discountCode?: string;
  discountPercentage?: string;
  expiryText?: string;
}

export type RecommendationItem =
  | GemstoneRecommendation
  | TarotRecommendation
  | ConsultationRecommendation
  | ArticleRecommendation
  | RemedyRecommendation
  | PanchangRecommendation
  | PromotionRecommendation
  | (BaseRecommendation & Record<string, any>);

/**
 * Props provided to any rendered Recommendation Card component
 */
export interface RecommendationCardProps<T extends BaseRecommendation = RecommendationItem> {
  item: T;
  onPress?: (item: T) => void;
  isCompact?: boolean;
}

/**
 * Descriptor for registering new recommendation types in the Registry
 */
export interface RecommendationDescriptor<T extends BaseRecommendation = any> {
  type: string;
  displayName: string;
  defaultIcon: string;
  themeColor: string;
  accentColor: string;
  Component: React.ComponentType<RecommendationCardProps<T>>;
}
