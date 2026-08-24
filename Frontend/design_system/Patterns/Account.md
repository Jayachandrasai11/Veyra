# 34 — Account Connection CTA

The Account Connection CTA is the
primary entry point for bringing
financial data into Fermor.

It is a CTA pattern, not simply
a generic Card.


────────────────────────

REFERENCE PLATFORMS

Tailwind Plus
Application UI

https://tailwindcss.com/plus/ui-blocks/application-ui


shadcn/ui Blocks

https://ui.shadcn.com/blocks


shadcnblocks

https://www.shadcnblocks.com/


Use these as visual references.
Do not copy them directly.


────────────────────────

STRUCTURE

Account Connection
│
├── Eyebrow
├── Title
├── Description
├── Supported Account Types
├── CTA
└── Optional Trust Signal


────────────────────────

EYEBROW

✦ COMPLETE YOUR FINANCIAL PICTURE


────────────────────────

TITLE

Connect your financial accounts


────────────────────────

DESCRIPTION

Connect your accounts to keep
your financial picture up to date.


────────────────────────

SUPPORTED TYPES

Landmark
Bank

TrendingUp
Investments

CreditCard
Credit & loans


Use Lucide Icons.

Do not use emoji.


────────────────────────

PRIMARY CTA

Connect accounts →


Use Fermor Primary Button.


────────────────────────

TRUST SIGNAL

ShieldCheck

You control which accounts
you connect.


Keep secondary.


────────────────────────

VARIANTS

Full-width CTA
Compact CTA
Inline CTA
Empty-state CTA
Onboarding CTA


────────────────────────

STATES

Not Connected
Partially Connected
Connecting
Connected
Syncing
Error


────────────────────────

AFTER CONNECTION

Do not continue showing
the onboarding CTA.

Show connection status:

✓ Your financial picture
is up to date

3 accounts connected

Last synced 10 minutes ago

View connected accounts →


────────────────────────

PARTIAL CONNECTION

Show what is missing.

Example:

Bank accounts connected.

Investment and credit accounts
can be added.

[ Connect another account ]


────────────────────────

DESKTOP

Use full content-container width.

Prefer a horizontal layout
when space allows.


────────────────────────

MOBILE

Stack content vertically.

Primary CTA can become
full width.


────────────────────────

COLOR

Background:
--background

Title:
--text

Description:
--text-secondary

CTA:
--primary

AI / Fermor:
--accent


────────────────────────

VISUAL STYLE

Professional
Trustworthy
Minimal
Calm

Avoid promotional,
advertising-like treatment.


────────────────────────

MOTION

Subtle only.

Button hover
Connection state
Loading
State transition

Use Motion.dev.


────────────────────────

ACCESSIBILITY

Semantic heading
Keyboard focus
44px minimum touch target
Accessible icons
Screen reader labels


────────────────────────

REACT

<FermorAccountConnection
  state="not-connected"
/>


Possible states:

not-connected
partial
connecting
connected
syncing
error


────────────────────────

DESIGN PRINCIPLE

Explain the value of connecting
accounts before asking the user
to connect.

One clear primary action.

Once the user completes the
action, replace the CTA with
useful connection status.