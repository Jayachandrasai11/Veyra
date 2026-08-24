# 33 — Dashboard Welcome Pattern

The Welcome Pattern establishes
the user's context when entering
the Fermor dashboard.

It is not a hero section.

It should remain minimal so the
user's financial information gets
the primary visual attention.


────────────────────────

STRUCTURE

Welcome
│
├── Greeting
├── Contextual description
└── Optional action


────────────────────────

GREETING

Good morning
Good afternoon
Good evening


Use the user's local time.


────────────────────────

DEFAULT

Good evening

Here's your financial picture.


────────────────────────

FIRST-TIME USER

Welcome to Fermor

Let's bring your financial
picture together.


The primary Connect Accounts
CTA belongs to the Connect
Accounts CTA Card.


────────────────────────

RETURNING USER

Good evening

Here's your financial picture.


Keep the default experience
simple and consistent.


────────────────────────

OPTIONAL ACTION

Only use when necessary.

Example:

[ Ask Fermor ✦ ]


Normally omit this because
Ask Fermor already exists
in the global header.


────────────────────────

TYPOGRAPHY

Greeting:

24–28px Desktop
22–24px Mobile


Description:

16px Desktop
15–16px Mobile


Do not use oversized
dashboard hero typography.


────────────────────────

HIERARCHY

Greeting
↓
Description
↓
Financial content


Financial information should
have stronger visual hierarchy
than the Welcome Header.


────────────────────────

SPACING

Greeting
↓
4–8px
↓
Description
↓
24–32px
↓
First dashboard section


Avoid excessive vertical space.


────────────────────────

COLOR

Greeting:

--text


Description:

--text-secondary


Do not use --accent for
the greeting.


────────────────────────

ALIGNMENT

Desktop:
Left aligned

Tablet:
Left aligned

Mobile:
Left aligned


────────────────────────

RESPONSIVE

Keep the same structure
across Desktop, Tablet
and Mobile.

Only adjust typography
and spacing when necessary.


────────────────────────

AVOID

Large illustrations
Background images
Gradient heroes
Huge typography
Decorative graphics
Multiple CTAs
Excessive animation


────────────────────────

ACCESSIBILITY

Use semantic heading hierarchy.

Example:

<h1>Good evening</h1>

<p>Here's your financial picture.</p>


The dashboard should have
one clear primary H1.


────────────────────────

REACT COMPONENT

FermorWelcome


Example:

<FermorWelcome
  greeting="Good evening"
  description="Here's your financial picture."
/>


Possible future variants:

default
first-time
personalized


Do not over-engineer initially.


────────────────────────

DESIGN PRINCIPLE

The Welcome Header provides
context.

It should not become the
visual hero of the dashboard.

The user's financial data
is the hero.