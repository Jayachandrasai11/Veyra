17 — AI Implementation Rules
07.5 — ACTIVE / PRESSED STATE

1. Active is temporary.

2. Active means the user is currently
   pressing/activating an element.

3. Active is different from Hover.

4. Active is different from Focus.

5. Active is different from Selected.

6. Active is different from Loading.

7. Use subtle visual feedback.

8. Recommended feedback:
   ├── surface change
   ├── reduced elevation
   └── optional 1px translation

9. Do not dramatically scale components.

10. Do not cause layout shifts.

11. Active feedback should be approximately
    100–150ms.

12. Mobile must provide pressed feedback
    without relying on hover.

13. After activation, transition into the
    appropriate Processing/Loading state.

14. Processing actions should prevent
    accidental duplicate submissions.

15. Navigation may use Active temporarily,
    then transition to Selected.

16. Sensitive actions should transition
    through Confirmation before Processing.

17. Use shared Fermor active tokens.

18. Do not invent unique pressed animations
    for individual components.
Design File Record
# 07.5 — Active / Pressed State

PURPOSE

Immediate feedback that the user's
press/tap has been received.


STATE FLOW

Default
   ↓
Pointer down / Space
   ↓
Active / Pressed
   ↓
Pointer up / Enter
   ↓
Action
   ↓
Processing / Loading
   ↓
Success / Error


VISUAL

Active
├── subtle surface change
├── reduced elevation
└── optional 1px translation

Duration:
100–150ms


DISTINCTIONS

Hover
→ pointer is over element

Focus
→ keyboard focus

Active
→ currently pressed

Selected
→ persistent choice

Loading
→ system is executing action


BUTTON

Default
→ Active
→ Processing
→ Success / Error


CONNECT ACCOUNTS

Connect accounts
↓
Pressed
↓
Connecting...
↓
Success / Error


RULES

No dramatic scale.
No layout shift.
No excessive animation.
No duplicate submissions.
No hover dependency on mobile.

CORE RULE

Pressed feedback should feel immediate,
subtle, and physical — then hand off to
the appropriate processing state.