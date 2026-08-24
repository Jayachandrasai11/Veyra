20 — AI Implementation Rules
07.7 — DISABLED STATE

1. Disabled means the control exists but
   cannot currently be used.

2. Disabled is different from Loading.

3. Disabled is different from Error.

4. Disabled is different from Permission Denied.

5. Do not make disabled controls look clickable.

6. Do not rely only on opacity.

7. Use consistent muted surface,
   foreground, border, and icon tokens.

8. Disabled controls should not respond
   to hover or pressed interaction.

9. Disabled controls should not trigger actions.

10. Native disabled controls should generally
    not receive keyboard focus.

11. If the reason for being disabled matters,
    explain it near the control.

12. Do not hide important explanations
    behind hover-only tooltips.

13. Use validation errors for invalid input,
    not Disabled.

14. Use Loading/Processing when an action
    has already started.

15. Avoid disabling primary navigation.

16. Prefer Empty / Setup Required / Permission
    Denied states for inaccessible destinations.

17. Disabled state must work consistently
    across desktop, tablet, and mobile.

18. Reuse global Fermor disabled tokens.

19. Never invent a different disabled visual
    treatment for individual components.
Design File Record
# 07.7 — Disabled State

PURPOSE

Communicate that a control exists but
cannot currently be used.


CORE FLOW

Prerequisite missing
        ↓
Disabled
        ↓
Prerequisite satisfied
        ↓
Available


VISUAL

Disabled
├── muted surface
├── muted foreground
├── muted border
├── muted icon
└── no interaction feedback


DISABLED

Hover
→ No

Pressed
→ No

Click
→ No

Loading
→ No


IMPORTANT

Do not rely only on opacity.

Do not make disabled elements
look clickable.


EXPLANATION

If the reason matters:

[ Calculate ]

Enter your income and expenses
to enable this calculation.


DISTINCTIONS

Disabled
→ unavailable

Loading
→ action is processing

Error
→ action/data failed

Permission Denied
→ user isn't authorized

Validation Error
→ input needs correction


NAVIGATION

Avoid disabling primary navigation.

Prefer:
Empty
Setup Required
Permission Denied


ACCESSIBILITY

Native disabled controls should
generally not receive keyboard focus.

Important explanations must remain
available without hover.


CORE RULE

Disabled means unavailable —
not broken, not processing,
and not merely invalid.