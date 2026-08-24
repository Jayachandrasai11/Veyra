21 — AI Implementation Rules
07.6 — SELECTED STATE

1. Selected means the user has made a
   persistent choice.

2. Selected is different from Active.

3. Selected is different from Hover.

4. Selected is different from Focus.

5. Selected must remain visible after
   the pointer leaves.

6. Never communicate selection using
   color alone.

7. Use shared Fermor selection tokens.

8. Single-selection controls must allow
   only one selected option.

9. Multi-selection controls may contain
   multiple selected options.

10. Navigation should use a persistent
    selected/active-route state.

11. Use aria-current for current page
    navigation where appropriate.

12. Tabs should expose aria-selected.

13. Selected + Focus must show both states.

14. Selected + Hover should enhance,
    not replace, the selected state.

15. Selected + Disabled must remain
    understandable.

16. Do not make every clickable card
    visually selected.

17. Selection should communicate a
    meaningful user choice.

18. The AI must not invent different
    selected styles for each screen.

19. Selection indicators should come
    from shared Fermor design tokens.
Design File Record
# 07.6 — Selected State

PURPOSE

Communicate that an option is currently chosen.


CORE DIFFERENCE

Active
→ temporary press

Selected
→ persistent choice


STATE

Default
   ↓
Hover
   ↓
Pressed
   ↓
Selected


SELECTED SIGNALS

├── Surface
├── Border
├── Typography
├── Check / indicator
└── Underline where appropriate


NAVIGATION

Home
Insights
Goals
Explore

Current route:
Home = Selected


FILTER

[ ✓ All ] [ Spending ] [ Investments ]


TAB

Overview
────────
Activity
Performance


ACCOUNT TYPE

┌──────────────┐
│ ✓ Bank       │
└──────────────┘
Investments
Credit


SELECTION TYPES

Single:
one option

Multiple:
multiple options


IMPORTANT

Clickable ≠ Selected

A clickable card only becomes
Selected when the user is actually
choosing it.


ACCESSIBILITY

Selected state must not rely only
on color.

Use semantic state where appropriate:

aria-current
aria-selected
checked


CORE RULE

Selected tells the user:

"This is the choice currently in effect."