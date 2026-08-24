20 — AI Implementation Rules
07.4 — FOCUS STATE

1. Every keyboard-accessible interactive
   element must have a visible focus state.

2. Focus communicates keyboard position.

3. Focus must be visually distinguishable
   from Hover.

4. Focus must be visually distinguishable
   from Active.

5. Focus must be visually distinguishable
   from Selected.

6. Prefer focus-visible for keyboard-focused
   controls.

7. Do not rely only on color.

8. Use a consistent Fermor focus-ring token.

9. Focus must not change component dimensions.

10. Focus must not cause layout shifts.

11. Interactive cards must use semantic
    links/buttons where possible.

12. Do not make static cards keyboard-focusable.

13. Preserve logical DOM/tab order.

14. Avoid arbitrary tabindex values.

15. Dialogs must manage focus correctly.

16. Dialog focus moves inside when opened.

17. Dialog focus returns to the trigger
    when closed.

18. Menus support keyboard navigation.

19. ESC closes dialogs/drawers/menus where
    appropriate.

20. Disabled controls must not behave like
    normal interactive controls.

21. Focus behavior must work on desktop,
    tablet, and mobile.

22. AI-generated components must reuse the
    global Fermor focus treatment.
Design File Record
# 07.4 — Focus State

PURPOSE

Communicate keyboard position clearly.


FOCUS

Default
   ↓
TAB / keyboard
   ↓
Focus
   ↓
ENTER / SPACE
   ↓
Action


VISUAL

Use:
focus-visible ring

Do not:
change dimensions
cause layout shift
rely only on color


CORE TOKEN

focus-visible:
ring-2
ring-offset-2

Exact visual token:
Fermor focus token


DISTINCTIONS

Hover:
pointer position

Focus:
keyboard position

Active:
currently pressed

Selected:
persistent choice


KEYBOARD

TAB:
next interactive element

ENTER / SPACE:
activate

ESC:
close dialog/drawer/menu

ARROW KEYS:
navigate menus


DIALOG

Open
↓
Focus enters dialog
↓
Focus remains within dialog
↓
ESC / Close
↓
Focus returns to trigger


SEMANTICS

Prefer:
button
a
input
select

Avoid:
div + tabindex for normal controls


CORE RULE

Every interactive element must have
a visible, consistent, non-layout-shifting
keyboard focus state.