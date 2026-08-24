AI IMPLEMENTATION RULE
INPUT / FORM IMPLEMENTATION


Foundation:


shadcn/ui Input
shadcn/ui Form


Form handling:


React Hook Form


Validation:


Zod




Create reusable components:


FermorInput
CurrencyInput
NumberInput
SearchInput
DateInput
PasswordInput
FermorTextarea




All inputs must support:


Default
Hover
Focus
Disabled
Loading
Error
Success




Input height:


Default:
44px


Important mobile controls:
48px




Border:
1px


Radius:
Fermor MD




Use Fermor design tokens.


Use lucide-react exclusively.


Use Indian number formatting for INR.


Forms should use exact financial
values rather than compact values.


Example:


₹20,00,000


not:


₹20L




Every input must have an accessible label.


Do not rely on placeholders as labels.


Use React Hook Form for form state.


Use Zod for validation.


Use Motion.dev only for meaningful
form state transitions.
Final Version to Save
# 20 — Inputs / Forms
44px


Preferred mobile:
48px




────────────────────────


ACCESSIBILITY


Accessible label
Focus state
Keyboard support
Error association
Helper association


Never rely on:


Color
Placeholder
Icon


alone.




────────────────────────


VALIDATION


Typing:
Minimal interference


Blur:
Validate field


Submit:
Validate complete form




────────────────────────


MOTION


Use Motion.dev only for:


Error appearance
Validation feedback
Step transitions
Section expansion


Avoid excessive animation.




────────────────────────


IMPLEMENTATION


Create:


FermorInput
CurrencyInput
NumberInput
SearchInput
DateInput
PasswordInput
FermorTextarea


Use shadcn/ui as the foundation.


Use React Hook Form.


Use Zod.


Use lucide-react.


Use Fermor design tokens.


Use Indian financial number formatting.