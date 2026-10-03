/**
 * Recommendation Registry (Plugin & Strategy Pattern)
 * 
 * Core Architectural Centerpiece of the Composable AI Conversation Platform.
 * 
 * Allows new recommendation experiences (e.g. Tarot, Gemstone, Remedies, Panchang,
 * or future experiences like Vedic AI Audio, Kundli Matching) to be plugged in
 * with ZERO modifications to existing conversation or timeline code.
 */

import React from 'react';
import {
  BaseRecommendation,
  RecommendationCardProps,
  RecommendationDescriptor,
  RecommendationItem,
} from '../../types/recommendation';
import { colors } from '../../theme/colors';
import { GemstoneCard } from './cards/GemstoneCard';
import { TarotCard } from './cards/TarotCard';
import { ConsultationCard } from './cards/ConsultationCard';
import { ArticleCard } from './cards/ArticleCard';
import { RemedyCard } from './cards/RemedyCard';
import { PanchangCard } from './cards/PanchangCard';
import { PromotionCard } from './cards/PromotionCard';
import { GenericCard } from './cards/GenericCard';

class RecommendationRegistryClass {
  private registry = new Map<string, RecommendationDescriptor<any>>();

  constructor() {
    this.registerBuiltInTypes();
  }

  /**
   * Register standard out-of-the-box recommendation experiences
   */
  private registerBuiltInTypes() {
    this.register({
      type: 'gemstone',
      displayName: 'Gemstone Recommendation',
      defaultIcon: '💎',
      themeColor: colors.gemstone.bgStart,
      accentColor: colors.gemstone.badge,
      Component: GemstoneCard,
    });

    this.register({
      type: 'tarot',
      displayName: 'Tarot Reading',
      defaultIcon: '🔮',
      themeColor: colors.tarot.bgStart,
      accentColor: colors.tarot.badge,
      Component: TarotCard,
    });

    this.register({
      type: 'consultation',
      displayName: 'Astrologer Consultation',
      defaultIcon: '👨‍🏫',
      themeColor: colors.consultation.bgStart,
      accentColor: colors.consultation.badge,
      Component: ConsultationCard,
    });

    this.register({
      type: 'article',
      displayName: 'Vedic Article',
      defaultIcon: '📖',
      themeColor: colors.article.bgStart,
      accentColor: colors.article.badge,
      Component: ArticleCard,
    });

    this.register({
      type: 'remedy',
      displayName: 'Vedic Remedy',
      defaultIcon: '🪔',
      themeColor: colors.remedy.bgStart,
      accentColor: colors.remedy.badge,
      Component: RemedyCard,
    });

    this.register({
      type: 'panchang',
      displayName: 'Daily Panchang',
      defaultIcon: '📅',
      themeColor: colors.panchang.bgStart,
      accentColor: colors.panchang.badge,
      Component: PanchangCard,
    });

    this.register({
      type: 'promotion',
      displayName: 'Promotional Offer',
      defaultIcon: '🎁',
      themeColor: colors.promotion.bgStart,
      accentColor: colors.promotion.badge,
      Component: PromotionCard,
    });
  }

  /**
   * Register a new custom recommendation experience dynamically
   */
  public register<T extends BaseRecommendation>(descriptor: RecommendationDescriptor<T>): void {
    this.registry.set(descriptor.type.toLowerCase(), descriptor);
  }

  /**
   * Check if a recommendation type is registered
   */
  public has(type: string): boolean {
    return this.registry.has(type.toLowerCase());
  }

  /**
   * Retrieve descriptor for a given recommendation type
   */
  public getDescriptor(type: string): RecommendationDescriptor {
    const found = this.registry.get(type.toLowerCase());
    if (found) return found;

    // Graceful fallback descriptor for unknown dynamic backend types
    return {
      type: type || 'generic',
      displayName: 'Astrological Recommendation',
      defaultIcon: '✨',
      themeColor: colors.surface,
      accentColor: colors.primary,
      Component: GenericCard,
    };
  }

  /**
   * Render the corresponding React Component for any recommendation item
   */
  public renderCard(
    item: RecommendationItem,
    onPress?: (item: RecommendationItem) => void,
    key?: string | number
  ): React.ReactElement {
    const descriptor = this.getDescriptor(item.type);
    const ComponentToRender = descriptor.Component;

    return (
      <ComponentToRender
        key={key ?? item.id}
        item={item}
        onPress={onPress}
      />
    );
  }

  /**
   * Get all registered types (useful for dev inspectors or dynamic schema builders)
   */
  public getRegisteredTypes(): string[] {
    return Array.from(this.registry.keys());
  }
}

export const RecommendationRegistry = new RecommendationRegistryClass();
