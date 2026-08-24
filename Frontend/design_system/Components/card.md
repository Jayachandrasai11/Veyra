CARD AI IMPLEMENTATION RULE
CARD IMPLEMENTATION


Use shadcn/ui Card as the base component.


Create reusable Fermor card variants:


FinancialHealthCard
MetricCard
InsightCard
GoalCard
AIInsightCard
CTACard


Do not create independent styling
for every individual card.


All variants must inherit:


Fermor colors
Fermor typography
Fermor spacing
Fermor radius
Fermor border
Fermor motion


Use Lucide React for icons.


Use Motion.dev only where interaction
requires motion.


Do not use emoji icons.
Final Version to Save
# 16 — Cards ⭐
--border




────────────────────────


ELEVATION


Default:
Flat + border


Shadow:
None


Use subtle elevation only for
interactive/floating elements.




────────────────────────


INTERACTION


Non-interactive cards:
No hover treatment


Interactive cards:
Subtle hover state


Do not make every card clickable.




────────────────────────


RESPONSIVE


Desktop:
Use defined grid system.


Tablet:
3 → 2 columns


Mobile:
1 column when content requires it.


Do not compress financial information
to preserve a desktop layout.




────────────────────────


IMPLEMENTATION


Use shadcn/ui Card as the foundation.


Create reusable:


FinancialHealthCard
MetricCard
InsightCard
GoalCard
AIInsightCard
CTACard


Use Fermor design tokens.


Use lucide-react.


Use Motion.dev where required.


Do not use emoji.


────────────────────────

CARD BACKGROUND STRATEGY
(light theme surface direction)

Do not make every card identical. Use semantic card backgrounds
built from the Surface System in Foundations/colour.md.

Target distribution:
70% neutral / light surfaces
20% subtle tinted surfaces
10% brand / semantic colors

Cards must remain calm, financial, and easy to scan — not colorful
boxes. Composition rule:

Neutral card
+ Subtle semantic surface
+ Strong typography
+ Small accent

NOT: bright background + gradient + glow + large illustration
+ multiple colors.


FINANCIAL HEALTH
Background: var(--surface-navy)  -> #0b1f3a
Text: var(--surface-navy-text) / var(--surface-navy-text-muted)
This is the primary visual anchor. Use light text for contrast.


NET WORTH  (and other high-readability financial numbers)
Background: var(--surface-1) -> #ffffff
Keep clean and neutral. Financial numbers need high readability.


INVESTMENTS
Background: var(--surface-blue) -> #eef5fd
Very subtle blue tint. Do NOT use a saturated blue.
The card should still feel almost neutral.


SAVINGS / POSITIVE METRICS
Background: var(--surface-green) -> #eff8f4
Use green only for semantic financial-positive information.
Do NOT turn the entire card green.


WARNING / ATTENTION
Background: var(--surface-amber) -> #fcf7ed
Use ONLY when the card represents a warning / attention state.
Never use warm/amber simply for decoration.


AI / ASK FERMOR
Background: var(--surface-lavender) -> #f5f3fa
Gives AI content its own visual identity without a loud purple theme.


ACCESSIBILITY
Never rely on background color alone to communicate meaning.
Pair every semantic surface with text + icon:
Positive  -> "Up 6.2% Increased"
Warning   -> "Account needs attention"

Large empty white areas inside or around cards:
use the barely-visible gradient (--empty-area-gradient) or an
extremely low-opacity financial pattern (chart lines, portfolio
curves, connected nodes). No stock photography, no coins/dollar
graphics, no crypto visual language.


RESPONSIVE
Themed surfaces stay identical across Desktop / Tablet / Mobile.
Do not introduce a different color system per breakpoint.


IMPLEMENTATION MAPPING
FinancialHealthCard -> var(--surface-navy)
MetricCard (Net Worth) -> var(--surface-1)
InvestmentCard      -> var(--surface-blue)
SavingsCard         -> var(--surface-green)
WarningCard         -> var(--surface-amber)
AIInsightCard       -> var(--surface-lavender)

All variants inherit Fermor colors, typography, spacing, radius,
border, and motion. Reuse variants — do not create one-off cards.