🤖 AI Implementation Rules
14 — LOADING BEHAVIOR

1. Use skeletons for content loading.

2. Don't write "Loading..." everywhere.

3. Skeleton geometry should approximate
   the final component geometry.

4. Preserve layout dimensions while
   content loads.

5. Avoid layout shifts.

6. Load dashboard sections independently
   where possible.

7. Don't block the entire Home page
   because one API is slow.

8. Every data component should support:

   loading
   success
   error
   empty

9. Skeletons should be reusable.

10. Recommended primitives:

    Skeleton
    SkeletonText
    SkeletonValue
    SkeletonRow
    SkeletonCard

11. AI has different loading states:

    Thinking
    Streaming
    Complete
    Error

12. Use "Thinking..." only when the
    system is genuinely in an AI
    processing state.

13. During streaming, show the response
    progressively instead of replacing
    it with a spinner.

14. Action buttons use an explicit
    operation state:

    Idle
    Loading
    Success
    Error

15. Prevent repeated submission while
    an action is loading.

16. Loading is not the same as disabled.

17. Never leave an infinite skeleton
    when the request has failed.

18. On failure:

    Skeleton
       ↓
    Error
       ↓
    Try again

19. Skeleton should not invent fake
    financial values.

20. Never show:

    ₹18.4L

    as if it were real data while
    the actual value is still loading.

21. Prefer:

    ███████

22. Don't animate every skeleton
    differently.

23. Use one consistent skeleton
    motion language across Fermor.

24. Avoid aggressive shimmer effects.
    Keep loading calm and subtle.

25. AI must not invent financial
    content during the loading state.

26. AI-generated content should only
    appear once the relevant data
    and model response are available.
📝 Design File Note

Pattern: Loading System

LoadingSystem
│
├── DashboardSkeleton
├── WelcomeSkeleton
├── AccountConnectionSkeleton
├── FinancialHealthSkeleton
├── MetricSkeleton
├── InsightSkeleton
├── GoalSkeleton
│
├── AIThinking
└── AIStreaming
State model
Data Component

Loading
   ↓
Success
   │
   ├── Content
   │
   └── Empty
   ↓
Error
AI model
AI Request
   ↓
Thinking
   ↓
Streaming
   ↓
Complete
Core rule

Skeletons represent missing content. AI thinking represents an active AI operation.

Don't use one loading pattern for everything.

Source

shadcn/ui Skeleton — use this as the implementation primitive/reference, then build Fermor's own MetricSkeleton, InsightSkeleton, GoalSkeleton, etc. around it.