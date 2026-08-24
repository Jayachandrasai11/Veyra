# Veyra — UX Design Guidelines & System Architecture

## 1. UX Design Philosophy

Veyra (Fermor) is built on the core principle of **Calm Financial Intelligence**. Personal finance applications frequently induce anxiety through alarmist red colors, dense numerical tables, and noisy notifications. Veyra reverses this dynamic:

* **Calm Tone & Soft Glassmorphic Visuals**: Clean neutral-slate backgrounds (`#F8FAFC`), rounded card containers (`rounded-2xl` / `rounded-3xl`), and soft blue ambient glow pools.
* **Warm Color Psychology**: Routine expenses are rendered in warm terracotta slate (`#F97316`) rather than alarmist red (`#EF4444`). Red is reserved strictly for budget overruns or critical system alerts.
* **Proactive Plain-English Context**: Every metric is accompanied by plain-language explanations answering *why* a figure moved and *what to do next*.

---

## 2. Design Token System

Design tokens are maintained in `Frontend/src/styles/tokens.css` and documented in `design_system/`:

* **Typography Scale**: Built on Inter & Plus Jakarta Sans variable fonts.
  * H1: `28px–32px` / Bold (700)
  * H2: `22px–24px` / SemiBold (600)
  * H3: `18px–20px` / SemiBold (600)
  * Body: `14px–15px` / Regular (400)
  * Caption & Eyebrow: `11px–12px` / Bold (700) with `0.08em` tracking.
* **Color Hierarchy**:
  * Surface 1: `#F8FAFC` (Slate 50)
  * Card Surface: `#FFFFFF` (White)
  * Elevated Dark Navy: `#0F172A` (Navy Health Anchor)
  * Primary Brand Accent: `#2153E6` (Royal Blue)
  * Success: `#10B981` (Emerald)
  * Warning / Routine Expense: `#F97316` (Amber / Terracotta)
* **Elevation & Motion**:
  * Fast transition: `150ms` ease-out.
  * Card hover: Elevational lift `hover:-translate-y-0.5 hover:shadow-md`.
  * Reduced motion safe: Respects `prefers-reduced-motion`.

---

## 3. Responsive Breakpoints & Accessibility (WCAG 2.1 AA)

| Device Breakpoint | Layout Strategy |
| :--- | :--- |
| **Mobile (<768px)** | Collapses sidebar into header hamburger menu (`≡`) opening slide-out drawer (`MobileNavigation.tsx`). Cards stack into single column. |
| **Tablet (768px–1023px)** | Sidebar condenses into compact icon rail (72px width) with accessible tooltips. Main content offsets dynamically. |
| **Desktop (≥1024px)** | Full 248px persistent sidebar, 12-column Bento Grid (`8-col hero chart` + `4-col health anchor`), and expanded search input (`⌘K`). |

### Accessibility Standards
* Minimum **4.5:1 AA text contrast ratio** on all surfaces.
* Interactive element focus rings (`focus-visible:ring-2 focus-visible:ring-primary`).
* Keyboard navigation support (`⌘K` search hotkey, `Esc` drawer close).
* Screen-reader friendly semantic tags (`h1`–`h3`, `nav`, `main`, `header`, `aside`, `aria-label`, `aria-current`).
