AI IMPLEMENTATION RULE
NAVIGATION IMPLEMENTATION


Use shadcn/ui Sidebar as the foundation.


Use:


SidebarProvider
Sidebar
SidebarHeader
SidebarContent
SidebarGroup
SidebarMenu
SidebarMenuItem
SidebarMenuButton
SidebarFooter
SidebarTrigger


Use lucide-react exclusively for navigation icons.


Desktop:
240px expanded
64px collapsed


Mobile:
280px off-canvas


Navigation item:
40px desktop
48px mobile


Icon:
20px


Icon + label gap:
12px


Use isActive for the current route.


Do not create separate sidebar systems
for different pages.


Use one global Fermor Sidebar.


Customize shadcn styling using Fermor
design tokens.


Do not use emoji icons.
Final Version to Save





────────────────────────


BADGE


Use only for meaningful information.


Examples:


Insights → 3
Ask Fermor → 1




────────────────────────


ASK FERMOR


Icon:
Sparkles


Color:
--accent


Use as a special Fermor capability,
not as a large promotional CTA.




────────────────────────


MOBILE


Use off-canvas drawer.


Do not use the 64px desktop
icon-only sidebar on mobile.


Mobile width:
280px




────────────────────────


MOTION


Desktop expand/collapse:
200ms


Mobile drawer:
250ms


Easing:
easeOut


Use Motion.dev.




────────────────────────


ACCESSIBILITY


Keyboard accessible.


Visible focus state.


Accessible labels.


Active route clearly indicated.


Collapsed icons must have labels/tooltips.




────────────────────────


IMPLEMENTATION


Use shadcn/ui Sidebar as the
single sidebar foundation.


Use lucide-react exclusively.


Use one global Fermor Sidebar.


Customize shadcn using Fermor
design tokens.


Do not use emoji icons.