/**
 * Conversation and Message Types for MyNaksh AI Assistant
 */

import { RecommendationItem } from './recommendation';

export type MessageType = 'user' | 'ai' | 'human' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'failed';

export type FeedbackReasonChip =
  | 'Inaccurate'
  | 'Too Generic'
  | "Didn't Help"
  | 'Too Long'
  | 'Unclear Guidance'
  | 'Other';

export interface AIFeedback {
  rating: 'like' | 'dislike' | null;
  selectedChips: FeedbackReasonChip[];
  customComment?: string;
  updatedAt?: number;
}

export interface ReplyContext {
  id: string;
  senderType: MessageType;
  senderName?: string;
  snippet: string;
}

export interface AstrologerProfile {
  name: string;
  title: string;
  experienceYears?: number;
  avatarUrl?: string;
  verified?: boolean;
}

export interface ConversationMessage {
  id: string;
  type: MessageType;
  text: string;
  createdAt: number; // Unix timestamp in ms
  status?: MessageStatus;
  recommendations?: RecommendationItem[];
  feedback?: AIFeedback;
  replyTo?: ReplyContext;
  astrologerProfile?: AstrologerProfile;
  metadata?: Record<string, any>;
}

export interface ConversationGroup {
  dateLabel: string;
  messages: ConversationMessage[];
}

export interface QuickPrompt {
  id: string;
  label: string;
  icon: string;
  promptText: string;
}
