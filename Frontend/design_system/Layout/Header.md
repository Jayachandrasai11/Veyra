02 — HEADER — IMPLEMENTATION RULES

1. Create one reusable Header component.

2. Never recreate the Header separately
   for individual pages.

3. Structure:

   Header
   ├── Brand
   └── Actions
       ├── Notifications
       ├── Ask Fermor
       └── User

4. Desktop height:
   64px

5. Mobile height:
   56px

6. Desktop horizontal padding:
   24px

7. Mobile horizontal padding:
   16px

8. Header is sticky on desktop.

9. Header must remain above page content
   using the global z-index token.

10. Use Lucide Icons exclusively.

11. Do not use emoji icons.

12. Icon buttons:
   40 × 40px visual size.

13. Maintain minimum 44px touch target
   where required.

14. Ask Fermor uses the global AI Button.

15. User menu uses the global Dropdown.

16. Avatar uses the global Avatar component.

17. Notification uses the global Icon Button.

18. Do not create duplicate versions
   of these components.

19. Use Fermor color tokens.

20. Use Fermor spacing tokens.

21. Use Fermor typography tokens.

22. Support light and dark themes.

23. Support:

   Default
   Hover
   Active
   Focus
   Disabled
   Unread

24. Mobile must not simply shrink the
   desktop Header.

25. Hide or relocate secondary actions
   when mobile space becomes constrained.

26. Never rely on color alone for unread,
   active or status indicators.

27. Preserve keyboard accessibility.

28. Respect reduced-motion preferences.

29. Header must work inside AppShell
   without knowing page-specific business logic.

30. Ask Fermor opened from Header starts
   as a global/context-neutral conversation.

31. Ask Fermor opened from a specific
   page/component should receive that
   page context.
02 — HEADER

Pattern:
Application Header

Purpose:
Provide persistent access to global
application utilities.

Structure:

Header
│
├── Brand
│
└── Actions
    ├── Notifications
    ├── Ask Fermor
    └── User

Dimensions:

Desktop → 64px
Mobile → 56px

Desktop padding → 24px
Mobile padding → 16px

Icon button → 40 × 40px
Avatar → 32px
Default icon → 20px

Actions gap → 12px
Icon/text gap → 8px

Responsive:

Desktop → Full actions
Tablet → Adaptive
Mobile → Menu + Brand + essential actions

Visual:

Quiet
Minimal
background: var(--header-background) -> #fafbfc
border-bottom: 1px solid var(--header-border) -> #d9e1ea
No heavy shadow

If sticky, use this subtle border treatment only.
Avoid glassmorphism and excessive blur.

Components:

Logo
Icon Button
AI Button
Avatar
Dropdown