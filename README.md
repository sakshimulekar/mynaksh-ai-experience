# 🌌 MyNaksh — Next Generation AI Conversation Experience

A production-grade, highly composable React Native & TypeScript conversational platform built for **MyNaksh**. It transforms standard AI chat responses into dynamic, interactive Vedic astrology experiences (Tarot Divination, Gemstones, Panchang, Vedic Remedies, Astrologer Consultations, Educational Articles, and Promotions) with an extensible plugin architecture.

---

## 📱 Tech Stack

- **Framework**: React Native (with React Native Web & Expo SDK)
- **Language**: TypeScript (Strict Mode)
- **State Management**: Zustand (Unidirectional data flow, reactive selectors, optimistic state transitions)
- **Navigation**: React Navigation (`@react-navigation/stack`, `@react-navigation/native`)
- **Animation & Transitions**: React Native Animated API & Reanimated
- **Haptics & Clipboard**: `expo-haptics`, `expo-clipboard`
- **Testing & Verification**: Node & Babel Architectural Assertion Test Suite

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js `>= 18`
- npm or yarn

### 2. Installation
```bash
# Navigate to project root
cd mynaksh-ai-experience

# Install dependencies
npm install
```

### 3. Running the Application
```bash
# Run Web Preview (Instant in-browser preview)
npm run web

# Run on iOS Simulator (macOS required)
npm run ios

# Run on Android Emulator
npm run android
```

### 4. Running Architectural Test Suite
```bash
node scripts/verify-architecture.js
```

---

## 🏛️ Project Structure

```
mynaksh-ai-experience/
├── App.tsx                                  # App Root with Navigation & SafeAreaProvider
├── index.ts                                 # Expo Entry Point
├── package.json                             # Dependencies & Scripts
├── tsconfig.json                            # Strict TypeScript Configuration
├── scripts/
│   └── verify-architecture.js               # Automated 6-Suite Architecture Test
└── src/
    ├── types/
    │   ├── conversation.ts                  # Message types (User, AI, Human, System), Status, Feedback, Reply
    │   └── recommendation.ts               # Extensible BaseRecommendation & Typed Experiences
    ├── theme/
    │   ├── colors.ts                        # Luxurious dark celestial & gemstone palettes
    │   ├── typography.ts                    # Dynamic scale, weights, font tokens
    │   ├── spacing.ts                       # Borders, radii, cosmic shadows & elevation
    │   └── index.ts                         # Consolidated theme exports
    ├── state/
    │   └── useConversationStore.ts          # Zustand store for messages, sending states, feedback, and actions
    ├── services/
    │   ├── mockApi.ts                       # Baseline initial prompt payload & simulated API latency
    │   └── aiSimulationService.ts           # Dynamic Astrological AI engine synthesizing query-tailored experiences
    ├── components/
    │   ├── common/
    │   │   ├── Header.tsx                   # Astrologer session header, live pulse, dev toggle
    │   │   ├── EmptyState.tsx               # Celestial empty state with quick consultation starters
    │   │   ├── ErrorBanner.tsx              # Network error alert with one-tap Retry
    │   │   ├── SkeletonLoader.tsx           # Shimmering chat placeholder for initial loading
    │   │   └── TypingIndicator.tsx          # Real-time animated cosmic typing bubbles
    │   ├── timeline/
    │   │   ├── ConversationTimeline.tsx     # Virtualized FlatList with auto-scroll & memoization
    │   │   ├── MessageContainer.tsx         # Layout coordinator: grouping, smoothing, date separators
    │   │   ├── DateSeparator.tsx            # Formatted calendar timeline markers ("Today", "Yesterday")
    │   │   ├── UserMessage.tsx              # User bubble with status (sending/sent/failed), retry trigger & quote preview
    │   │   ├── AIMessage.tsx                # AI bubble with text, recommendation carousel, and feedback row
    │   │   ├── HumanMessage.tsx             # Verified Human Astrologer bubble (Acharya Raghav Sharma)
    │   │   └── SystemMessage.tsx            # Centered celestial event badge
    │   ├── recommendations/
    │   │   ├── RecommendationRegistry.tsx   # Extensible Plugin & Strategy Pattern Registry
    │   │   ├── RecommendationCarousel.tsx   # Horizontal scrollable card carousel
    │   │   ├── RecommendationModal.tsx      # Deep-dive interactive modal/sheet for card details & actions
    │   │   └── cards/
    │   │       ├── GemstoneCard.tsx         # 💎 Gemstone card (planet, carat, benefits, metal)
    │   │       ├── TarotCard.tsx            # 🔮 Tarot reading card (spread, energy resonance, element)
    │   │       ├── ConsultationCard.tsx     # 👨‍🏫 Astrologer card (rating, exp, online status, call action)
    │   │       ├── ArticleCard.tsx          # 📖 Educational guide card (read time, category)
    │   │       ├── RemedyCard.tsx           # 🪔 Vedic remedy card (day, timing, sacred mantra)
    │   │       ├── PanchangCard.tsx         # 📅 Daily Panchang card (tithi, nakshatra, muhurat)
    │   │       ├── PromotionCard.tsx        # 🎁 Festive coupon card (discount code, expiry timer)
    │   │       └── GenericCard.tsx          # ✨ Graceful fallback for new dynamic backend types
    │   ├── composer/
    │   │   ├── MessageComposer.tsx          # Text input, quick query pills, active reply banner
    │   │   └── ReplyPreview.tsx             # Dismissible quoted reply preview bar
    │   ├── feedback/
    │   │   ├── AIFeedbackRow.tsx            # 👍 / 👎 rating buttons with haptics
    │   │   └── FeedbackChips.tsx            # Expandable pills (Inaccurate, Too Generic, Didn't Help, etc.)
    │   ├── actions/
    │   │   └── MessageActionSheet.tsx       # Long-press action sheet (Reply, Copy, Delete)
    │   └── debug/
    │       └── DevControlBar.tsx            # Scenario Evaluator Toolbar (Network Error, Retry, Handover)
    └── screens/
        └── ConversationScreen.tsx           # Orchestration Screen
```

---

## 🧩 Architectural Deep Dive

### 1. Recommendation Rendering Strategy (The Core Requirement)
To ensure **zero architectural changes** when backend AI evolves and introduces new experience types, we implemented a **Registry & Strategy Pattern**:

- **Decoupled Architecture**: Message rendering components (`AIMessage.tsx`, `RecommendationCarousel.tsx`) have **zero hardcoded dependencies** on individual card types.
- **Dynamic Registry (`RecommendationRegistry.tsx`)**:
  - Maintains a typed registry map: `type -> RecommendationDescriptor`.
  - Exposes `register(descriptor)` allowing runtime or build-time plugin extensions.
  - Exposes `renderCard(item, onPress)` which instantiates the appropriate registered component.
  - **Graceful Fallback (`GenericCard.tsx`)**: If the backend returns a new type (e.g. `future_ai_audio_reading` or `kundli_match`) that the client has not explicitly registered yet, the registry automatically renders a polymorphic fallback card without crashing!

```typescript
// Adding a future recommendation experience takes just 1 line:
RecommendationRegistry.register({
  type: 'live_puja_stream',
  displayName: 'Live Temple Puja Stream',
  defaultIcon: '🪔',
  themeColor: '#7C3AED',
  accentColor: '#F59E0B',
  Component: LivePujaStreamCard,
});
```

### 2. State Management Approach (Zustand + Unidirectional Flow)
We chose **Zustand** for its minimal boilerplate, fast selector-based re-rendering, and predictable state transitions:

1. **Optimistic Updates**: When a user submits a message, it is instantly appended to the local state with status `'sending'`, an assigned UUID, and a timestamp.
2. **Lifecycle Transitions**:
   - `sending` ➔ `sent` (triggers AI simulated typing indicator)
   - `sending` ➔ `failed` (if network error simulated; activates the "⚠️ Failed • Tap to Retry" flow)
3. **AI Feedback Sub-state**: Feedback (rating: `'like' | 'dislike'` and `selectedChips: FeedbackReasonChip[]`) is updated immutably per message in local state.
4. **Context Actions**:
   - `Reply`: Captures sender info and text snippet into `activeReply`, which renders above the composer.
   - `Delete`: Removes the message by ID while preserving timeline scroll stability.

### 3. Message Grouping & Virtualization
- **Grouping Logic (`MessageContainer.tsx`)**: Messages from the same sender within 5 minutes are grouped: top/bottom corner radii are smoothed, and sender headers are deduplicated.
- **Date Separators**: Automatically injected between messages belonging to different calendar days ("Today", "Yesterday", or formatted dates).
- **Virtualization (`FlatList`)**: Configured with `initialNumToRender={12}`, `maxToRenderPerBatch={10}`, `windowSize={11}`, and memoized render items (`React.memo`) to ensure silky 60fps scrolling even with extensive recommendation carousels.

---

## 🛠️ Testing & Interviewer Evaluation Toolbox

A built-in **Dev Toolbox** (toggleable via the ⚙️ icon in the header) allows instant evaluation of edge cases:

1. **Fail Next Msg (Retry Demo)**: Simulates network drop on send. Tapping the red "⚠️ Failed • Retry" pill on the user bubble triggers an optimistic resend!
2. **Human Astrologer Mode**: Toggles live handover to verified astrologer *Acharya Raghav Sharma*.
3. **Force Load Error**: Simulates initial network timeout to showcase the error recovery banner with retry.
4. **Reset Mock State**: Resets the chat to the exact 4-message initial payload from the assignment.
5. **Clear Chat**: Clears timeline to evaluate the empty state and quick consultation inquiry chips.

---

## ⚖️ Trade-offs & Future Considerations

| Decision | Rationale | Production Recommendation |
| :--- | :--- | :--- |
| **Simulated In-Memory AI Engine** | Self-contained, zero-dependency testing for assessment. | Integrate with WebSocket / SSE streaming endpoint (e.g. OpenAI / Gemini SDK). |
| **Zustand In-Memory Store** | Fast, reactive, zero boilerplate. | Add `zustand/middleware/persist` with MMKV for persistent offline chat history. |
| **React Native Animated API** | Universal cross-platform compatibility across Web, iOS, and Android. | Use `react-native-reanimated` Worklets with gesture-handler for drag-to-dismiss sheet. |
| **Horizontal FlatList in Carousel** | Standard React Native native scrolling. | Add pagination dots indicator for carousel index tracking. |

---

## 📜 Deliverables Checklist

- [x] Part A — Virtualized Chat Timeline supporting User, AI, Human Astrologer, and System events
- [x] Part A — Date separators & message grouping with dynamic corner radius smoothing
- [x] Part A — Extensible Dynamic Recommendation Registry (Gemstone, Tarot, Consultation, Article, Remedy, Panchang, Promotion)
- [x] Part A — Exact initial mock dataset implementation
- [x] Part B — Message actions (Reply with quote preview, Copy to clipboard, Delete preserving scroll)
- [x] Part B — AI feedback system (Like / Dislike + Expandable chips: Inaccurate, Too Generic, Didn't Help, Too Long)
- [x] Part B — Optimistic message sending with states: `Sending...`, `Sent`, `Failed`, `Retry`
- [x] Part B — Initial loading skeleton, empty state, and network failure recovery
- [x] Automated Architecture Verification Test Suite (100% Pass)
- [x] Comprehensive README.md with architecture explanation, state management, and performance rationale
