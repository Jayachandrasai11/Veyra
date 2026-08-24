16 — AI Implementation Rules
07.3 — HOVER STATE

1. Hover is primarily a desktop pointer state.

2. Hover must never be required to understand
   or use the interface.

3. Hover must not change component dimensions.

4. Hover must not cause layout shifts.

5. Use subtle surface, border, shadow,
   elevation, or icon changes.

6. Keep hover transitions around 150ms.

7. Avoid excessive scaling, bouncing,
   glowing, or dramatic animation.

8. Interactive cards may use subtle elevation.

9. Static cards must not receive interactive
   hover treatment.

10. Buttons should use restrained hover feedback.

11. Navigation hover must remain visually
    distinct from Active.

12. AI action arrows may move approximately
    2–4px to reinforce direction.

13. Progress indicators should not animate
    merely because they are hovered.

14. Mobile must not depend on hover.

15. Respect prefers-reduced-motion.

16. Use shared Fermor hover tokens.

17. Do not invent a different hover animation
    for each component.

18. Hover communicates interactivity,
    not decoration.
Design File Record
# 07.3 — Hover State

PURPOSE

Communicate that an element is interactive.


HOVER

Default
   ↓
Pointer enters
   ↓
Subtle visual feedback
   ↓
Pointer leaves
   ↓
Default


ALLOWED CHANGES

├── Background
├── Border
├── Shadow
├── Elevation
├── Icon
└── Cursor


DO NOT

├── Change dimensions
├── Cause layout shift
├── Scale dramatically
├── Bounce
├── Glow excessively
└── Depend on hover for essential actions


TIMING

Target:
150ms

Maximum:
200ms


INTERACTIVE CARD

Default
→ Hover
   ├── subtle surface
   ├── subtle border
   ├── small elevation
   └── optional arrow movement


AI ACTION

"See what changed →"

Hover:
arrow moves 2–4px


NAVIGATION

Hover:
temporary

Active:
persistent

Hover must remain visually distinct
from Active.


MOBILE

Do not depend on hover.


CORE RULE

Hover should make interaction
discoverable without becoming
the visual focus of the component.