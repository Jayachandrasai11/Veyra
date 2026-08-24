13 — Default State Rules
07.2 — DEFAULT STATE

1. Every reusable component must define
   a default appearance.

2. Default is the baseline from which
   other states are derived.

3. Default dimensions must come from shared
   design tokens.

4. Don't invent component-specific spacing
   unless the component genuinely requires it.

5. Default typography must follow the Fermor
   type hierarchy.

6. Default card padding must be consistent.

7. Default radius must come from the shared
   radius system.

8. Interactive components must still have
   a defined default state.

9. Default must not depend on hover,
   focus, or active styling.

10. Financial Health gets its own default
    pattern rather than inheriting a generic
    metric-card layout.

11. AI Insight gets its own default pattern
    rather than becoming a generic chat card.

12. Default state must be usable with
    keyboard, mouse, and touch.

13. All future states must be designed as
    transitions from this baseline.

14. AI-generated code must consume the
    existing design tokens rather than
    inventing new values.
Design File Record
# 07.2 — Default State

Purpose:
Baseline appearance of every Fermor component.

DEFAULT
├── Size
├── Spacing
├── Typography
├── Surface
├── Border
├── Radius
├── Icon
├── Alignment
└── Content hierarchy


CORE COMPONENT BASELINES

Metric Card
├── min-height: 128px
├── padding: 20px
├── radius: 12px
└── grid-controlled width

Financial Health
├── width: 100%
├── min-height: ~180px
├── padding: 24px
└── signature pattern

Button
├── height: 40px
├── horizontal padding: 16px
├── radius: 8px
└── text: 14px / medium

Section
├── header → content: 16px
└── section → section: 32px

Goal
├── identity
├── percentage
├── progress
└── amount

AI Insight
├── AI identifier
├── insight
├── explanation
└── actions


RULE

Default is the baseline.

Do not invent visual values per component.

Use shared Fermor tokens.

Default ≠ Static.