  23 — AI Implementation Rules
07.8 — LOADING STATE

1. Loading means data/action is currently
   being processed or retrieved.

2. Use skeletons for content loading.

3. Use spinners/processing indicators
   for explicit user actions.

4. Do not display "Loading..." everywhere.

5. Use progressive loading.

6. Sections should be able to load independently.

7. Do not block the entire dashboard unless
   the entire dashboard genuinely depends
   on the same request.

8. Skeleton dimensions should approximate
   the final content dimensions.

9. Avoid layout shifts when content arrives.

10. Use one shared Skeleton component/system.

11. Do not invent unique loading animations
    for individual cards.

12. Keep loading animation subtle.

13. Financial data loading:
    → Skeleton

14. AI generation:
    → Thinking / Streaming

15. Button processing:
    → Spinner / Processing

16. Existing valid data refreshing:
    → Prefer keeping existing data with a
      subtle updating indicator.

17. Loading must transition into:
    Success
    Error
    Empty
    or another appropriate state.

18. Navigation should remain available while
    individual dashboard sections load.

19. Loading state must work responsively
    across desktop, tablet, and mobile.

20. Reuse global Fermor loading tokens.
Design File Record
# 07.8 — Loading State

PURPOSE

Communicate that content or an action
is currently being processed.


CORE FLOW

Request
   ↓
Loading
   ↓
Success
   │
   └── Error


CONTENT LOADING

Use:
Skeleton

Do not:
"Loading..." everywhere


ACTION LOADING

Use:
Spinner / Processing

Example:

[ Connect accounts ]
        ↓
[ ◌ Connecting... ]


AI LOADING

Use:
Thinking / Streaming

Example:

✦ Fermor is thinking...


DASHBOARD

Home
│
├── Welcome              → Loaded
├── Account CTA          → Loaded
├── Financial Health     → Skeleton
├── Metrics              → Skeleton
├── Insights             → Skeleton
├── Goals                → Loaded
├── AI Thought           → Skeleton
└── Explore              → Loaded


SKELETONS

DashboardSkeleton
├── HeaderSkeleton
├── AccountCTASkeleton
├── FinancialHealthSkeleton
├── MetricSkeleton
├── InsightSkeleton
├── GoalSkeleton
└── AIInsightSkeleton


PROGRESSIVE LOADING

Each section can resolve independently.

Do not block the entire dashboard
because one API request is still loading.


LAYOUT

Skeleton dimensions should closely
match final content dimensions.

Avoid:
layout shift


REFRESH

No previous data:
→ Skeleton

Previous valid data:
→ Keep data
→ Show subtle updating state


CORE RULE

Loading should make Fermor feel like
content is arriving — not like the
application has stopped.