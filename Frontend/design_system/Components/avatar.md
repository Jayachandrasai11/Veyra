AI IMPLEMENTATION RULE
AVATAR IMPLEMENTATION


Use shadcn/ui Avatar.


Use Lucide React for fallback icons.


Image:
Use user profile image when available.


Initials:
Use first and last name initials.


Fallback:
Use CircleUserRound.


Shape:
Full / circular.


Default size:
40 × 40px.


Touch target:
44 × 44px minimum when interactive.


Do not use emoji avatars.


Do not create custom SVG avatars.


Do not add an online indicator unless
the product has a meaningful presence state.
Final Version to Save
# 14 — Avatar / User


ONLINE INDICATOR


Optional.


Size:
8px


Position:
Bottom-right


Border:
2px solid background


Use only when a meaningful user
presence/status feature exists.




────────────────────────


BORDER


Default:
None


Optional:
1px subtle border when required
for image/background contrast.




────────────────────────


STATES


Default
Hover
Focus
Loading




────────────────────────


HEADER


Size:
40 × 40px


Touch target:
44 × 44px minimum


Interactive:
Profile / account menu




────────────────────────


ACCESSIBILITY


Interactive avatar must have an
accessible label.


Example:
"Open profile menu"




────────────────────────


IMPLEMENTATION


Use shadcn/ui Avatar.


Use lucide-react for fallback icons.


Do not use emoji.


Do not create random SVG avatars.


Follow Fermor color, typography,
border and radius tokens.