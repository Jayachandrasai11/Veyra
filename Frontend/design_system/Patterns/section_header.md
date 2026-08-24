18 — 🤖 AI IMPLEMENTATION RULES

Save this directly in your design-system file:

SECTION HEADER — IMPLEMENTATION RULES


1. Name the component SectionHeader.


2. SectionHeader is a reusable layout component.


3. Structure:
   Title
   Optional Description
   Optional Action


4. Use SectionHeader consistently across
   dashboard sections.


5. Do not create separate components for:
   GoalsHeader
   InsightsHeader
   ExploreHeader
   MoneyHeader.


6. Use one reusable SectionHeader component.


7. The title is the primary visual element.


8. Do not automatically treat the section title
   as an eyebrow.


9. Use "section title" as the semantic concept.


10. Description is optional.


11. Action is optional.


12. Default section action should be a
    lightweight navigation/arrow link.


13. Do not use primary buttons for simple
    "View all" or "See all" navigation.


14. Use buttons only for actions that
    perform an operation.


15. Keep title and action aligned horizontally
    on desktop.


16. On mobile, allow the action to move
    below the heading when necessary.


17. Do not allow text overlap or truncation.


18. Use existing Fermor typography tokens.


19. Use existing Fermor spacing tokens.


20. Do not create arbitrary spacing values
    inside SectionHeader.


21. Optional icons may be supported.


22. Use Lucide Icons exclusively.


23. AI-related section headers may use
    Sparkles as the optional icon.


24. Do not automatically apply AI styling
    to normal sections.


25. Maintain consistent alignment across
    all dashboard sections.


26. SectionHeader must remain visually
    lightweight and should not look like a card.


27. Do not add borders or shadows to the
    SectionHeader itself by default.


28. The content below the header should
    provide the visual container when required.


29. Support keyboard-accessible navigation
    for header actions.


30. Maintain Fermor's calm, minimal,
    trustworthy financial visual language.
19 — 📝 DESIGN NOTES

Save this:

SECTION HEADER — DESIGN NOTES


• SectionHeader is a reusable foundation component.


• It appears throughout Fermor.


• Structure:
  Title
  Description (optional)
  Action (optional)


• Use "section title" rather than automatically
  calling it an eyebrow.


• Examples:
  YOUR MONEY AT A GLANCE
  FERMOR NOTICED
  YOUR GOALS
  EXPLORE


• "View all →" and "See all →" should normally
  be lightweight links rather than buttons.


• Keep the header visually lightweight.


• Do not make SectionHeader itself a card.


• Do not add unnecessary borders or shadows.


• Desktop uses horizontal title/action alignment.


• Mobile can stack the action when necessary.


• Use the global typography system.


• Use the global spacing system.


• Optional Lucide icon support is allowed.


• Sparkles may be used for AI-related sections.


• Don't create specialized header components
  for individual sections.


• One SectionHeader component should support
  all dashboard sections.