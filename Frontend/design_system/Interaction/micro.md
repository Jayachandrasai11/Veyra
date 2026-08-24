🤖 AI Implementation Rules
20 — MICRO-INTERACTIONS

1. Motion must communicate state,
   feedback, progress, or change.

2. Never add animation simply because
   an element looks empty without it.

3. Keep Fermor motion subtle.

4. Use a shared motion system.

5. Don't let AI invent animations
   component by component.

6. Buttons:

   Hover → subtle response
   Press → subtle pressed state
   Focus → visible focus
   Loading → loading state
   Success → confirmation

7. Interactive cards may have hover
   feedback.

8. Static cards should not behave
   like interactive cards.

9. Progress can animate when data
   first appears.

10. Metric values may transition when
    meaningful financial data changes.

11. Never animate financial numbers so
    aggressively that the actual value
    becomes difficult to read.

12. AI should support:

    Thinking
    Streaming
    Complete
    Error

13. AI streaming should reveal new
    content progressively rather than
    repeatedly animating the entire
    response.

14. Notifications should use restrained
    unread indicators.

15. Errors should never use aggressive
    shaking or distracting animation.

16. Success feedback should be brief.

17. Skeleton loading should use one
    consistent loading treatment.

18. Dialogs and drawers may use subtle
    entrance/exit transitions.

19. Navigation transitions should be
    fast and unobtrusive.

20. Never delay a critical action just
    to finish an animation.

21. Animation must never communicate
    information that isn't also
    available statically.

22. Support prefers-reduced-motion.

23. Reduced motion should remove or
    substantially reduce non-essential
    movement.

24. Avoid excessive simultaneous
    animations.

25. Motion should establish a Fermor
    personality:

    Calm
    Precise
    Responsive
    Purposeful
📝 Design File Note

Pattern: Micro-interaction System

Motion
│
├── Feedback
│   ├── Hover
│   ├── Press
│   └── Focus
│
├── State
│   ├── Loading
│   ├── Success
│   └── Error
│
├── Data
│   ├── Metric transition
│   └── Progress
│
├── AI
│   ├── Thinking
│   ├── Streaming
│   └── Complete
│
└── Navigation
    ├── Dialog
    ├── Drawer
    └── Page transition
Core rule

Motion should explain what changed, not compete with what changed.

Recommended implementation source

Motion — use it as the motion implementation/reference layer, but define Fermor's own motion rules before letting implementation introduce animations.

shadcn/ui Skeleton — reference for loading-state primitives.

Fermor-specific rule

For the design file, don't just write “use Motion.” Save the behavior contract:

Button → subtle hover
Progress → smooth fill
Metric → restrained value transition
AI → streaming
Notification → unread indicator
Dialog → subtle entrance
Drawer → directional transition
Error → no aggressive animation
Reduced motion → minimal/no motion