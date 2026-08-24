# 10 — Motion

Fermor uses Motion for React as its primary animation
system.

────────────────────────

LIBRARY

Motion for React

NPM Package:
motion

Installation:
npm install motion

React Import:
motion/react


────────────────────────

DURATION

Fast       → 120ms
Normal     → 200ms
Slow       → 360ms
Emphasis   → 500ms


────────────────────────

EASING

Fast       → easeOut
Normal     → easeInOut
Slow       → Spring
Emphasis   → Gentle Spring


────────────────────────

SIGNATURE MOTION

Fermor uses subtle spring motion for meaningful
layout changes and smooth transitions.

Motion should feel:

Calm
Responsive
Intelligent
Precise


────────────────────────

COMPONENTS

Sidebar              → 200–300ms / spring
Card hover           → 120ms / easeOut
Progress             → 500ms / easeOut
Number changes       → 360ms / smooth
AI response          → 360ms / easeOut
Modal                → 200ms / easeOut
Dropdown             → 120ms / easeOut
Section expansion    → 200ms / spring


────────────────────────

MOVEMENT

Micro     → 1–2px
Small     → 4–8px
Medium    → 8–16px

Avoid large movement.


────────────────────────

REDUCED MOTION

Respect prefers-reduced-motion.

Remove or minimize non-essential movement,
stagger, parallax and large transforms.


────────────────────────

DESIGN PRINCIPLE

Motion should communicate change, hierarchy and
feedback.

It should never distract from financial information.


MOTION IMPLEMENTATION RULES

1. Use Motion for React for component-level
   and meaningful UI animations.

2. Install:
   npm install motion

3. Import from:
   motion/react

4. Use CSS transitions for simple color,
   background, border and opacity changes when
   Motion is unnecessary.

5. Use Motion for:
   layout changes
   enter/exit animations
   gestures
   meaningful movement
   AI interactions

6. Do not introduce arbitrary animation durations.

7. Use the Fermor motion tokens.

8. Keep financial information stable and readable.

9. Respect prefers-reduced-motion.

10. Do not animate decorative elements unless
    explicitly specified by the design system.