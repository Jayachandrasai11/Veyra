# 08 — Grid

FERMOR uses a 12-column responsive grid for desktop,
8 columns for tablet, and 4 columns for mobile.

────────────────────────

CONTAINER

Desktop:
Max width → 1440px
Page padding → 32px

Tablet:
Page padding → 24px

Mobile:
Page padding → 16px


COLUMNS

Desktop → 12
Tablet → 8
Mobile → 4


GUTTER

Desktop → 24px
Tablet → 20px
Mobile → 16px


ROW GAP

Default → 24px
Major sections → 40px


HOME GRID

Financial Health → 12 / 12

Financial Snapshot:
Net Worth → 4 / 12
Investments → 4 / 12
Saved → 4 / 12

Fermor Noticed:
Spending → 6 / 12
Emergency Fund → 6 / 12

Goals → 12 / 12

Thought from Fermor → 12 / 12


RESPONSIVE

≥ 1200px
→ 12 columns

768px–1199px
→ 8 columns

< 768px
→ 4 columns


ALIGNMENT

All major dashboard sections must share the same
container boundaries and horizontal alignment.


IMPLEMENTATION

Use CSS Grid.

Do not use absolute positioning for primary
dashboard layout.

Do not create arbitrary column widths outside
the defined grid unless explicitly required.