/**
 * Horizontally Scrolling Recommendation Carousel
 * 
 * Embedded beneath AI messages to guide user toward next actions.
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { RecommendationItem } from '../../types/recommendation';
import { RecommendationRegistry } from './RecommendationRegistry';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

interface RecommendationCarouselProps {
  recommendations: RecommendationItem[];
  onRecommendationPress: (item: RecommendationItem) => void;
}

export const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({
  recommendations,
  onRecommendationPress,
}) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Carousel Section Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>✨</Text>
        <Text style={styles.headerText}>Personalized Celestial Recommendations</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{recommendations.length}</Text>
        </View>
      </View>

      {/* Horizontal Scrollable Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={242} // card width + margin
        snapToAlignment="start"
        nestedScrollEnabled={true}
        directionalLockEnabled={true}
        scrollEventThrottle={16}
      >
        {recommendations.map((item, index) =>
          RecommendationRegistry.renderCard(
            item,
            onRecommendationPress,
            item.id || `rec-${index}`
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    paddingHorizontal: 2,
  },
  headerIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  headerText: {
    color: colors.primaryLight,
    fontSize: typography.size.xs,
    fontFamily: typography.fontFamily.semibold,
    letterSpacing: 0.3,
  },
  countBadge: {
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  countText: {
    color: '#DDD6FE',
    fontSize: 10,
    fontWeight: '700',
  },
  scrollContent: {
    paddingVertical: 4,
    paddingRight: spacing.md,
  },
});
