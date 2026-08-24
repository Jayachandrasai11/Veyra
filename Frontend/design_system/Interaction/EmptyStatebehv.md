🤖 AI Implementation Rules
15 — EMPTY STATE BEHAVIOR

1. Empty state means:
   request succeeded but there is
   no relevant data.

2. Never use an empty state to hide
   loading or API errors.

3. Every empty state should answer:

   What is missing?
   Why does it matter?
   What can I do?

4. Preferred structure:

   Empty
     ↓
   Explanation
     ↓
   CTA
     ↓
   Setup
     ↓
   Populated

5. Use a reusable EmptyState component.

6. Recommended anatomy:

   EmptyState
   ├── Optional visual
   ├── Title
   ├── Description
   ├── Primary CTA
   └── Optional secondary action

7. Prefer one primary CTA.

8. The CTA must solve the actual
   reason for the empty state.

9. Examples:

   No accounts
      → Connect accounts

   No goals
      → Create goal

   No search results
      → Change search / Clear filters

   No insights yet
      → Wait / Connect more data

10. Don't use fake financial values
    to make an empty dashboard look
    populated.

11. Don't generate generic AI advice
    simply because an AI card is empty.

12. AI insight requires sufficient
    relevant financial data.

13. Empty state content should be
    contextual.

14. Distinguish:

    No data
    No results
    Not enough data
    Loading
    Error
    Permission issue

15. Partial emptiness should be
    handled at the component level.

16. One empty component should not
    automatically blank the whole page.

17. Don't add unnecessary illustrations.

18. Keep empty states concise.

19. The empty state should always
    provide a next step when one exists.

20. AI can personalize the explanation,
    but the underlying empty condition
    must come from application state.

21. AI must not invent:

    account state
    transaction state
    goal state
    connection state

22. Recommended state model:

    DataState
    ├── loading
    ├── success
    │   ├── populated
    │   └── empty
    └── error
📝 Design File Note

Pattern: Empty State

Purpose: Explain missing data and provide the most useful next action.

EmptyState
│
├── Optional Visual
├── Title
├── Description
├── Primary CTA
└── Optional Secondary Action
Core flow
Empty
 ↓
Explanation
 ↓
CTA
 ↓
Setup
 ↓
Data available
 ↓
Normal component
Fermor examples
No accounts
→ Connect accounts

No goals
→ Create goal

No search results
→ Change search / Clear filters

No insights yet
→ Connect more data / Wait for analysis
Critical distinction
EMPTY
→ Nothing exists

LOADING
→ Data is arriving

ERROR
→ Data couldn't be retrieved

NOT ENOUGH DATA
→ Data exists but isn't sufficient
Source / reference

For the underlying component patterns, use shadcn/ui Directory and shadcn/ui Button.

Fermor rule: don't copy a generic empty-state illustration. The important reusable design is the reason → explanation → action structure.