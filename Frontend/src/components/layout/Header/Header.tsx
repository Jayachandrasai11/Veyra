/**
 * VEYRA — Header
 * Source: design_system/Layout/Header.md
 *         design_system/Layout/Appshell.md
 *
 * Format: page identity on the left (title + description),
 * search and circular quick-actions on the right, avatar menu last.
 *
 * Rules:
 * - Height: 64px desktop/tablet, 56px mobile
 * - Position: sticky, top 0, z-index overlay (40)
 * - 1px border-bottom (no shadow)
 * - Branding lives in the sidebar — the header carries page context
 * - Icons: 20px (header controls per appshell spec)
 */

import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Bell, ChevronDown, Menu, Search, Settings, LogOut, Wallet, ListChecks, TrendingUp, UserRound, Coins, CreditCard, Landmark, PiggyBank, ReceiptText, ChartLine, ShieldCheck, Banknote, Briefcase, House } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { FinancialBackground } from "@/components/visuals";
import { cn } from "@/lib/cn";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/Dropdown/Dropdown";

interface HeaderProps {
  /** Overrides the route-derived page title */
  pageTitle?: string;
  /** Sidebar offset classes (kept in sync with the shell's collapse toggle) */
  offsetClassName?: string;
  /** Called when mobile menu button is tapped */
  onMenuToggle?: () => void;
  className?: string;
}

/* Route → page identity (longest matching prefix wins) */
const PAGE_CONTEXT: Array<{ prefix: string; title: string; description: string }> = [
  { prefix: "/money",    title: "Money",    description: "Sources, expenses and savings" },
  { prefix: "/insights", title: "Insights", description: "What Veyra noticed this week" },
  { prefix: "/goals",    title: "Goals",    description: "Plan and track what you save for" },
  { prefix: "/explore",  title: "Explore",  description: "Tools and categories" },
  { prefix: "/activity", title: "Activity", description: "Every recent money movement" },
  { prefix: "/health",   title: "Health breakdown", description: "What shapes your financial score" },
  { prefix: "/connect",  title: "Connect accounts", description: "Bring your accounts together" },
  { prefix: "/plans",    title: "Plans",    description: "Choose the plan that fits your journey" },
  { prefix: "/settings", title: "Settings", description: "Account and preferences" },
  { prefix: "/dashboard", title: "Home", description: "Your money at a glance" },
];

function pageContext(pathname: string) {
  return PAGE_CONTEXT.find((p) => pathname === p.prefix ||
    (p.prefix !== "/" && pathname.startsWith(`${p.prefix}/`))) ?? PAGE_CONTEXT[PAGE_CONTEXT.length - 1];
}

/* Circular frosted quick-action — royal header variant */
const quickActionClass = cn(
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
  "border border-[#687EFF]/25 bg-[#EEF3FF]",
  "text-[#3D4FD8] hover:text-[#12379B]",
  "hover:bg-[#DCE6FF]",
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
  "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
  "focus-visible:outline-offset-[var(--focus-ring-offset)]"
);

export function Header({ pageTitle, offsetClassName, onMenuToggle, className }: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const context = pageContext(pathname);
  const title = pageTitle ?? context.title;

  return (
    <header
      className={cn(
        // Static bar in the app frame — always visible, never scrolls away
        "relative flex items-center shrink-0 overflow-hidden bg-[var(--color-surface-1)]",
        "mt-[var(--spacing-sm)] mr-[var(--spacing-sm)]",
        "rounded-[var(--radius-card)]",
        "border border-[var(--color-border)]",
        "shadow-[0_24px_54px_-32px_rgba(43,58,178,0.28)]",
        "h-[var(--header-height-mobile)] md:h-[var(--header-height-desktop)]",
        "pl-[var(--header-padding-mobile)] pr-[var(--spacing-md)] md:pr-[var(--header-padding-desktop)]",
        "gap-[var(--spacing-md)]",
        // Clears the floating sidebar; follows its live width
        "ml-0",
        offsetClassName,
        className
      )}
    >
      {/* Royal texture — glow pool + white fintech symbols + faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-12 -top-20 w-72 h-72 rounded-full bg-[#98E4FF]/40 blur-3xl" />
        <div className="absolute -left-10 bottom-[-70px] w-56 h-56 rounded-full bg-[#C7D6FF]/55 blur-3xl" />
        <FinancialBackground
          variant="grid"
          tone="soft"
          intensity="low"
          position="center"
          className="opacity-[0.16] [mask-image:linear-gradient(to_right,black,transparent_75%)]"
        />
        {/* White coin symbols — floating illustration on the royal wash */}
        <FinancialBackground
          variant="coins"
          tone="blue"
          intensity="medium"
          position="right"
          className="[mask-image:linear-gradient(to_left,black_35%,transparent_92%)]"
        />
        {/* White trendline — the white illustration flowing left to right
            across the entire bar, under the title/search/content */}
        <FinancialBackground
          variant="trend"
          tone="blue"
          intensity="high"
          position="behind"
          className="opacity-80 [mask-image:linear-gradient(to_right,transparent_2%,black_16%,black_84%,transparent_98%)]"
        />
        {/* Money · Plan · Market · Human — subtle financial symbols woven along the bar */}
        <div className="absolute left-[19%] top-[24%] text-[#687EFF]/30">
          <Wallet size={16} strokeWidth={2} />
        </div>
        <div className="absolute left-[31%] bottom-[18%] text-[#687EFF]/25">
          <ListChecks size={15} strokeWidth={2} />
        </div>
        <div className="absolute left-[47%] top-[22%] text-[#687EFF]/30">
          <TrendingUp size={17} strokeWidth={2.2} />
        </div>
        <div className="absolute left-[51%] top-[68%] text-[#687EFF]/30">
          <UserRound size={14} strokeWidth={2} />
        </div>
        <div className="absolute left-[76%] top-[28%] text-[#687EFF]/25">
          <Wallet size={13} strokeWidth={2} />
        </div>
        {/* Extended finance set — banking, saving, spending, protecting */}
        <div className="absolute left-[10%] bottom-[24%] text-[#687EFF]/25">
          <Coins size={13} strokeWidth={2} />
        </div>
        <div className="absolute left-[15%] top-[64%] text-[#687EFF]/25">
          <CreditCard size={14} strokeWidth={2} />
        </div>
        <div className="absolute left-[27%] top-[66%] text-[#687EFF]/20">
          <Landmark size={13} strokeWidth={2} />
        </div>
        <div className="absolute left-[36%] top-[62%] text-[#687EFF]/30">
          <PiggyBank size={13} strokeWidth={2} />
        </div>
        <div className="absolute left-[42%] bottom-[14%] text-[#687EFF]/25">
          <ReceiptText size={12} strokeWidth={2} />
        </div>
        <div className="absolute left-[55%] top-[62%] text-[#687EFF]/25">
          <ChartLine size={13} strokeWidth={2} />
        </div>
        <div className="absolute left-[59%] top-[18%] text-[#687EFF]/25">
          <ShieldCheck size={13} strokeWidth={2} />
        </div>
        <div className="absolute left-[71%] top-[62%] text-[#687EFF]/25">
          <Banknote size={13} strokeWidth={2} />
        </div>
        <div className="absolute left-[83%] top-[20%] text-[#687EFF]/25">
          <Briefcase size={13} strokeWidth={2} />
        </div>
        <div className="absolute left-[89%] bottom-[26%] text-[#687EFF]/20">
          <House size={12} strokeWidth={2} />
        </div>
        <span aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#687EFF]/30 to-transparent" />
      </div>

      {/* ── Left — mobile menu + page identity ────────── */}
      <div className="relative z-10 flex items-center gap-[var(--spacing-sm)] flex-1 min-w-0">
        {/* Mobile menu button — hidden on desktop */}
        <Button
          variant="icon"
          size="icon"
          aria-label="Open navigation menu"
          onClick={onMenuToggle}
          className="md:hidden shrink-0 !bg-white !text-[#0B1F3A] hover:!bg-[#E9F0FF]"
        >
          <Menu size={20} strokeWidth={2} aria-hidden={true} />
        </Button>

        <div className="min-w-0">
          <h1 className="truncate text-[length:var(--typography-h3-size)] font-semibold leading-tight text-[#0B1F3A]">
            {title}
          </h1>
          <p className="hidden sm:block truncate text-[length:var(--typography-caption-size)] leading-tight text-[#0B1F3A]/75">
            {context.description}
          </p>
        </div>
      </div>

      {/* ── Right — search | quick actions | profile ──── */}
      <div className="relative z-10 flex items-center gap-[var(--spacing-sm)] shrink-0">
        {/* Search — expands from lg */}
        <form
          role="search"
          onSubmit={(e) => e.preventDefault()}
          className="relative hidden lg:block"
        >
          <Search
            size={16}
            strokeWidth={2}
            aria-hidden={true}
            className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-[#0B1F3A]/50"
          />
          <input
            type="search"
            placeholder="Search anything..."
            aria-label="Search anything"
            className={cn(
              "h-10 w-[200px] xl:w-[260px] rounded-full",
              "border border-[var(--color-border)] bg-white",
              "pl-[38px] pr-[54px]",
              "text-[length:var(--typography-body-sm-size)] text-[#0B1F3A]",
              "placeholder:text-[#687EFF]/70",
              "outline-none focus-visible:border-[var(--color-primary)] focus-visible:bg-white",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
            )}
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[var(--color-border)] bg-[var(--color-surface-slate)] px-1.5 py-0.5 text-[10px] font-semibold text-[#0B1F3A]/60">
            ⌘K
          </kbd>
        </form>

        {/* Notifications */}
        <button type="button" aria-label="Notifications" className={quickActionClass}>
          <Bell size={18} strokeWidth={2} aria-hidden={true} />
        </button>

        {/* Profile — avatar with chevron, opens account menu */}
        <DropdownMenu
          open={profileOpen}
          onOpenChange={setProfileOpen}
          trigger={
            <DropdownMenuTrigger
              aria-label="Profile menu"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((o) => !o)}
              className={cn(
                "flex items-center gap-[var(--spacing-2xs)] rounded-full p-[3px] pr-[var(--spacing-xs)]",
                "hover:bg-[#E9F0FF]",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]"
              )}
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full text-[length:var(--typography-label-size)] font-semibold text-white ring-2 ring-white/30"
                style={{ backgroundColor: "#0B1F3A" }}
              >
                S
              </span>
              <ChevronDown
                size={14}
                strokeWidth={2}
                aria-hidden={true}
                className={cn(
                  "text-[#0B1F3A]/50 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                  profileOpen && "rotate-180"
                )}
              />
            </DropdownMenuTrigger>
          }
        >
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setProfileOpen(false);
              navigate("/settings");
            }}
          >
            <Settings size={16} strokeWidth={2} aria-hidden={true} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setProfileOpen(false);
              navigate("/landing");
            }}
          >
            <LogOut size={16} strokeWidth={2} aria-hidden={true} />
            Sign out
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </header>
  );
}
