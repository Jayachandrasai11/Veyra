SECTION 02 — BUTTON BEHAVIOR — IMPLEMENTATION RULES

1. All Fermor buttons use one shared
   Button component.

2. Never create page-specific button
   interaction behavior.

3. Supported states:

   default
   hover
   active
   focus
   disabled
   loading

4. Every variant follows the same
   interaction state model.

5. Variants only change visual tokens.

6. Variants:

   primary
   secondary
   outline
   ghost
   link
   destructive
   icon
   ai

7. Hover must be subtle.

8. Do not use scale animations
   as the default button interaction.

9. Do not use glow as the default.

10. Do not use bounce as the default.

11. Do not use different hover
    animations on different pages.

12. Active state should clearly
    communicate press.

13. Focus-visible must have one
    global Fermor focus treatment.

14. Disabled state must prevent
    interaction.

15. Disabled must not trigger hover
    or active animation.

16. Loading disables the button.

17. Loading must prevent duplicate
    submissions.

18. Loading uses a consistent
    spinner/progress indicator.

19. Loading should preserve button
    dimensions where possible.

20. Prefer meaningful loading labels:

    Connecting...
    Saving...
    Calculating...
    Loading...

21. Do not use an unexplained
    spinner-only button for
    important actions.

22. Icons remain stable unless the
    icon itself communicates progress.

23. Button motion:
    120–180ms.

24. Use one shared easing function.

25. Respect prefers-reduced-motion.

26. AI / Brand buttons use the same
    behavior system as normal buttons.

27. AI styling changes the visual
    token, not the interaction model.

28. Destructive buttons use the
    same behavior system.

29. Links use the same global
    interaction principles.

30. Icon-only buttons require
    accessible labels.

31. Minimum touch target:
    44px.

32. Page code should specify:

    variant
    size
    loading
    disabled
    icon
    label

33. Page code should NOT specify:

    hover animation
    focus animation
    loading animation
    transition duration
    custom radius
    custom shadow

34. The shared Button component
    owns those rules.

35. URL/navigation behavior belongs
    to the consuming component.

36. Async operation state belongs
    to application logic.

37. Visual button state belongs
    to the Button component.

38. Never allow AI-generated code
    to create one-off button styles
    when a Fermor Button variant
    already exists.

02 — BUTTON BEHAVIOR

Pattern:
Global Button Interaction System

States:

Default
Hover
Active
Focus
Disabled
Loading

Variants:

Primary
Secondary
Outline
Ghost
Link
Destructive
Icon
AI / Brand

Core principle:

ONE BUTTON SYSTEM
MANY BUTTON VARIANTS

Hover:
Subtle visual change

Active:
Clear pressed feedback

Focus:
Global Fermor focus ring

Disabled:
Non-interactive + reduced emphasis

Loading:
Spinner + meaningful loading label
+ interaction disabled

Motion:

Fast
120ms

Normal
180ms

Button motion:
120–180ms

Do not use:

Default scale
Default bounce
Default glow
Random transitions

AI implementation:

Page components specify
WHAT the button is.

Button component specifies
HOW the button behaves.

Page:

<Button
  variant="primary"
  size="md"
  loading={isConnecting}
>
  Connect accounts
</Button>

Button component owns:

hover
active
focus
disabled
loading
motion
radius
shadow
transition