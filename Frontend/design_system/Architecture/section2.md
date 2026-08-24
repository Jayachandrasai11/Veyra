SECTION 02 — ACCOUNT CONNECTION — IMPLEMENTATION RULES

1. Create a reusable AccountConnection component.

2. Pattern:
   Account Connection CTA

3. Structure:

   AccountConnection
   ├── Eyebrow
   ├── Title
   ├── Description
   ├── Account Types
   └── CTA

4. Use the global Card foundation.

5. Do not create a custom card implementation.

6. Use Lucide icons exclusively.

7. Eyebrow icon:
   Sparkles

8. Bank:
   Landmark

9. Investments:
   TrendingUp

10. Credit:
    CreditCard

11. Default icon size:
    18px

12. Default stroke:
    2px

13. Use the global Button component.

14. CTA variant:
    Primary

15. CTA size:
    Medium

16. Use ArrowRight rather than a text arrow.

17. Desktop:
    CTA aligned toward the right.

18. Mobile:
    CTA becomes full-width.

19. Account types are informational by default.

20. Do not make account types clickable
    unless the connection flow requires it.

21. Clicking Connect accounts starts the
    account connection flow.

22. The component must not contain the
    entire authentication/provider flow.

23. Connection state should be controlled
    by application state/API state.

24. Prevent duplicate connection attempts.

25. Support:
    default
    loading
    connecting
    success
    error

26. When accounts are fully connected,
    transition to an appropriate connected
    state instead of continuing to show
    the onboarding CTA.

27. Use global Fermor tokens for:
    color
    typography
    spacing
    radius
    border
    motion

28. Do not use emoji icons.

29. Do not use heavy shadows or glass effects.

30. Do not turn this into a hero section.

31. Preserve responsive behavior:
    desktop → horizontal
    mobile → vertical

32. Prevent horizontal overflow.

33. Use semantic accessible labels.

34. Show connection errors using the
    existing Error + Recovery pattern.

35. Do not create duplicate Button,
    Card, Icon or Error components.

SECTION 02 — COMPLETE YOUR FINANCIAL PICTURE

Pattern:
Account Connection CTA

Component:
AccountConnection

Purpose:
Prompt users to connect financial accounts.

Structure:

AccountConnection
│
├── Eyebrow
├── Title
├── Description
├── Account Types
│   ├── Bank
│   ├── Investments
│   └── Credit
└── CTA

Desktop:
Horizontal layout

Mobile:
Vertical layout

Card:
Global Card
LG radius
1px border
No heavy shadow

Account Types:

Bank → Landmark
Investments → TrendingUp
Credit → CreditCard

Icon:
18px
2px stroke

CTA:
Global Primary Button
Medium

Behavior:

Connect accounts
↓
Account Connection Flow
↓
Success / Error

States:

Default
Loading
Connecting
Success
Error

Conditional:

Not connected → CTA
Partially connected → Incomplete state
Fully connected → Connected state

Principle:

This is an activation CTA,
not a generic content card.