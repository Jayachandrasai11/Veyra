Light mode:
/* Base */

--background: #fafbfc;

--surface-1: #ffffff;
--surface-2: #f8fafc;
--surface-3: #f0f4f8;


/* Themed Surfaces */
/* Background surfaces only — not new brand colors. Use sparingly. */

--surface-navy: #0b1f3a;
--surface-navy-text: #eef3f9;
--surface-navy-text-muted: #a9c0d8;

--surface-blue: #eef5fd;
--surface-sky: #f2f7fc;

--surface-green: #eff8f4;
--surface-amber: #fcf7ed;
--surface-lavender: #f5f3fa;


/* Brand financial anchor */

--financial: #0b1f3a;


/* Text */

--text-primary: #172033;
--text-secondary: #526071;
--text-tertiary: #7a8798;
--text-disabled: #a7b1bd;


/* Brand */

--primary: #2153e6;
--primary-hover: #1a42c2;
--primary-soft: #e9efff;

--accent: #2094f3;
--accent-soft: #eaf5ff;


/* Border */

--border: #dce6f0;


/* Semantic */

--success: #16803c;
--success-soft: #e8f5ec;

--warning: #b7791f;
--warning-soft: #fff7e6;

--error: #c62828;
--error-soft: #fdecec;

--info: #2094f3;
--info-soft: #eaf5ff;

dark mode :
/* Base */

--background: #010509;

--surface-1: #07101a;
--surface-2: #0b1622;
--surface-3: #102030;


/* Text */

--text-primary: #f7faff;
--text-secondary: #b7c2d0;
--text-tertiary: #7f8c9c;
--text-disabled: #566474;


/* Brand */

--primary: #5f9af2;
--primary-hover: #78aaf5;
--primary-soft: #12325a;

--accent: #0c80df;
--accent-soft: #082d4d;


/* Border */

--border: #1c2b3a;


/* Semantic */

--success: #4ade80;
--success-soft: #103522;

--warning: #f2b84b;
--warning-soft: #3a2b12;

--error: #f87171;
--error-soft: #3a1717;

--info: #5f9af2;
--info-soft: #102d4d;


/* ============================================================
   SURFACE SYSTEM
   Light theme surface & card background direction.
   Source of truth for background surfaces. Extend, do not
   invent one-off colors.
   ============================================================ */

/* Core rule: do not use pure white for every large surface. */

Page background (primary canvas):
--background: #fafbfc;

Neutral surface scale:
--surface-1: #ffffff;   /* elevated / clean cards, e.g. Net Worth */
--surface-2: #f8fafc;   /* sidebar, subtle panels */
--surface-3: #f0f4f8;   /* recessed / grouped areas */

Themed background surfaces (use sparingly, semantic only):
--surface-navy:    #0b1f3a;  /* Financial Health anchor (dark) */
--surface-blue:    #eef5fd;  /* Investments context (very subtle) */
--surface-sky:     #f2f7fc;  /* soft financial gradient end / large areas */
--surface-green:   #eff8f4;  /* positive / savings metrics */
--surface-amber:   #fcf7ed;  /* warning / attention only */
--surface-lavender:#f5f3fa;  /* AI / Ask Fermor content */

On the navy surface, text inverts:
--surface-navy-text:        #eef3f9;
--surface-navy-text-muted:  #a9c0d8;

/* Color distribution target (light theme)
   70% neutral / light surfaces
   20% subtle tinted surfaces
   10% brand / semantic colors
   The interface must still read as a light financial dashboard. */

/* Sidebar
   Must differ from page background — a separate navigation layer. */
--sidebar-background: #f8fafc;          /* = --surface-2 */
--sidebar-border: #d9e1ea;
--nav-active-background: #e8f1fc;
--nav-active-text: var(--primary);

/* Header
   Keep subtle. Sticky uses a 1px border, not a heavy shadow. */
--header-background: #fafbfc;           /* = --background */
--header-border: #d9e1ea;

/* Large empty areas
   Use a barely-visible gradient or extremely low-opacity financial
   pattern (chart lines, portfolio curves, connected nodes).
   Never fill empty space with random decoration or stock imagery. */
--empty-area-gradient: linear-gradient(180deg, #fafbfc 0%, #f2f7fc 100%);

/* Accessibility
   Every tinted surface must keep WCAG-compliant contrast.
   Never communicate financial meaning through background color alone:
   always pair color with text + icon (e.g. "↑ 6.2% Increased",
   "Warning — Account needs attention"). */

/* Do NOT introduce: neon, strong gradients, glassmorphism, heavy
   shadows, glowing cards, decorative emoji, or crypto visual language. */