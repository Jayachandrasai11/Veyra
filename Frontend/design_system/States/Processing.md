25 — AI Implementation Rules
07.9 — PROCESSING STATE

1. Processing means the system has received
   the request and is actively doing work.

2. Processing is different from Loading.

3. Loading retrieves content.
   Processing performs work.

4. Use Processing for:
   ├── AI analysis
   ├── Account connection
   ├── Transaction synchronization
   ├── Financial calculations
   ├── Goal creation
   └── Other user-triggered operations.

5. Use skeletons for content retrieval.

6. Use spinners or processing indicators
   for short actions.

7. Use multi-step progress for complex
   operations when the steps are real.

8. Never fake backend progress.

9. Only show percentage progress when
   progress is genuinely measurable.

10. During processing, prevent duplicate
    submissions.

11. Use aria-busy for the processing region
    where appropriate.

12. Use role="status" for dynamic,
    non-critical processing updates.

13. Processing must eventually resolve to:
    ├── Success
    ├── Error
    └── Cancelled where supported.

14. Long-running operations may continue
    in the background when appropriate.

15. Keep processing animations subtle.

16. Don't block the entire dashboard for
    an operation that only affects one section.

17. Preserve existing valid data during
    background refreshes where possible.

18. Use shared Fermor Processing components.

19. Don't invent unique processing animations
    for individual screens.

20. Processing should feel active,
    transparent, and trustworthy.
Design File Record
# 07.9 — Processing State

PURPOSE

Communicate that Fermor has received a request
and is actively performing work.


CORE DIFFERENCE

Loading
→ retrieving content

Processing
→ performing work


CORE FLOW

User Action
   ↓
Pressed
   ↓
Processing
   ↓
Success / Error / Cancelled


PROCESSING COMPONENT

Processing
├── Status
├── Activity
├── Optional Progress
└── Optional Steps


AI

✦ Analyzing your spending...

✓ Finding patterns
● Comparing previous months
○ Preparing recommendation


ACCOUNT CONNECTION

Connecting account...

✓ Authenticating
● Fetching data
○ Syncing transactions


CALCULATION

Calculating...

✓ Reviewing income
● Evaluating expenses
○ Preparing estimate


BUTTON

[ Save goal ]
      ↓
[ ◌ Saving goal... ]
      ↓
[ ✓ Goal saved ]


PROGRESS

Determinate:
████████████░░░░
70%

Only when actual progress is known.

Indeterminate:
● Syncing...

Do not fake percentages.


LONG RUNNING

Processing
   ↓
Background processing

Example:
"Your accounts are syncing.
 You can continue using Fermor."


ACCESSIBILITY

Use:
aria-busy
role="status"
aria-live="polite"

Use role="alert" for important errors.


CORE RULE

Loading tells the user:
"Something is arriving."

Processing tells the user:
"Fermor is actively working on your request."