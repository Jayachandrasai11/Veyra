20 — 🤖 AI IMPLEMENTATION RULES

Save this directly:

CARD GRID — IMPLEMENTATION RULES


1. CardGrid is a layout component, not a Card component.


2. Card controls content presentation.
   CardGrid controls multi-card arrangement.


3. Do not use one universal grid configuration
   for every Fermor card.


4. Metric Grid:
   Desktop → 3 columns
   Tablet → 2 columns
   Mobile → 1 column


5. Insight Grid:
   Desktop → 2 columns
   Tablet → 1 column
   Mobile → 1 column


6. Goal content normally uses a single-column
   list rather than a multi-column card grid.


7. Quick Actions may use:
   Desktop → 4 columns
   Tablet → 2 columns
   Mobile → 1 or 2 columns depending on
   available space and accessibility.


8. Use the global Fermor responsive breakpoints.


9. Do not create component-specific breakpoint
   systems.


10. Use the global Fermor spacing tokens
    for grid gaps.


11. Do not hard-code random pixel gaps.


12. Grid cards should naturally stretch to
    their available grid width.


13. Avoid fixed card widths.


14. Metric cards in the same row should normally
    maintain consistent visual height.


15. Do not force every card in the entire
    application to have identical height.


16. Grid gap and section gap are different
    spacing concepts.


17. Section spacing should generally be greater
    than card-to-card grid spacing.


18. Do not horizontally scroll metric cards
    on mobile by default.


19. Prefer stacked cards on mobile.


20. CardGrid should support semantic variants
    rather than arbitrary column counts everywhere.


21. Initial variants:
    metric
    insight
    action


22. Do not create unnecessary variants.


23. Use CSS Grid/Tailwind Grid for layout.


24. Do not manually position cards.


25. Maintain consistent horizontal alignment.


26. Cards must remain responsive when viewport
    width changes.


27. Preserve accessibility and readable content
    widths at every breakpoint.


28. CardGrid must not determine the visual
    styling of the Card itself.


29. Keep layout responsibility separate:
    Card → appearance/content
    CardGrid → arrangement/responsiveness.


30. Maintain Fermor's clean, structured,
    calm financial dashboard layout.
21 — 📝 DESIGN NOTES

Save this in your design-system document:

CARD GRID — DESIGN NOTES


• Card Grid is a layout pattern.


• It is separate from the Card component.


• Different Fermor content types need different
  grid configurations.


METRIC GRID
Desktop → 3
Tablet → 2
Mobile → 1


INSIGHT GRID
Desktop → 2
Tablet → 1
Mobile → 1


GOAL GRID
Normally → single-column list


QUICK ACTION GRID
Desktop → 4
Tablet → 2
Mobile → 1 or 2 depending on content


• Use CSS Grid / Tailwind Grid.


• Use global responsive breakpoints.


• Use global spacing tokens for grid gaps.


• Do not use random custom gaps.


• Do not use fixed card widths.


• Cards should fill their grid cells.


• Metric cards should normally align to
  consistent heights within their row.


• Do not force all card types to have
  identical heights.


• Grid gap and section gap are different.


• Section gaps should create stronger
  separation than card gaps.


• Prefer stacked cards on mobile.


• Do not make the Home dashboard horizontally
  scrollable just to preserve desktop columns.


• Card = visual/content component.
  CardGrid = layout component.


• Keep the number of grid variants small.


Initial variants:
Metric
Insight
Action