05 — CONTAINER RULES

1. Container is a global Fermor primitive.

2. Never invent a max-width for an individual
   page.

3. Measure container dimensions from Figma.

4. Record exact measurements in the design file.

5. If a measurement has not been extracted,
   write:

   TBD — measure from Figma

   rather than inventing a value.

6. Container controls:

   width
   max-width
   horizontal padding
   alignment

7. Use margin-inline: auto for centered
   constrained containers.

8. Container sits inside Main, not outside
   the AppShell.

9. All major Home sections should use the
   same Container unless the design explicitly
   shows otherwise.

10. Store container measurements as design
    tokens.

11. Reuse the same tokens across pages.

12. If a page needs a different width, use a
    documented Container variant.

13. Do not create arbitrary page-specific
    max-width values.

14. Desktop, tablet and mobile values must
    be documented separately when they differ.

15. AI-generated code must reference the
    Container tokens instead of hard-coded
    values wherever possible.
# 05 — Container

Pattern:
Container

Purpose:
Controls the horizontal geometry of the application.

Architecture:
Container
├── Max Width
├── Horizontal Padding
└── Alignment


DIMENSIONS

Desktop
├── Max Width: TBD — measure from Figma
├── Padding Left: TBD
└── Padding Right: TBD

Tablet
├── Max Width: TBD
├── Padding Left: TBD
└── Padding Right: TBD

Mobile
├── Width: 100%
├── Padding Left: TBD
└── Padding Right: TBD


TOKENS

container.maxWidth
container.padding.desktop
container.padding.tablet
container.padding.mobile


RESPONSIVE

Desktop → constrained
Tablet → constrained
Mobile → full width with side padding


BEHAVIOR

Centered horizontally.
Shared across pages.
No arbitrary page-specific widths.


AI RULE

Reuse the existing Container primitive.
Do not invent a new max-width.


SOURCE

Tailwind CSS Container / Layout