/**
 * VEYRA — Sidebar
 * Source: design_system/Layout/sidebar.md
 *
 * Look & feel: flat light-blue canvas, soft blue icons, generous
 * vertical rhythm. Active destination = soft light-blue pill with
 * navy label (no shadow, no ring — calm by design).
 *
 * Rules:
 * - Desktop 248px / Collapsed (tablet) 72px / Mobile → Drawer
 * - Nav item: 48px height, pill radius, 20px icon
 * - Active state: fill + weight + aria-current, never color alone
 * - Icon-only mode must have tooltip/aria-label
 */

import { Link, NavLink, useLocation } from "react-router";
import {
  House,
  Landmark,
  ChartLine,
  Target,
  Compass,
  Sparkles,
  Settings,
  ChevronsUpDown,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { VeyraMark } from "@/components/brand/VeyraBrand";

/* ─── Nav Item Definition ─────────────────────────────── */

interface NavItem {
  to: string;
  icon: React.ComponentType<{
    size: number;
    strokeWidth: number;
    "aria-hidden": boolean;
    className?: string;
  }>;
  label: string;
  /** Optional counter pill */
  badge?: number;
  /** Intelligence entries get the AI badge */
  chip?: string;
}

const primaryNav: NavItem[] = [
  { to: "/dashboard", icon: House,  label: "Home" },
  { to: "/money",     icon: Landmark,   label: "Money" },
  { to: "/insights",  icon: ChartLine,  label: "Insights" },
  { to: "/goals",     icon: Target,     label: "Goals" },
  { to: "/explore",   icon: Compass,    label: "Explore" },
  { to: "/assistant", icon: Sparkles,   label: "Ask Veyra", chip: "AI" },
  { to: "/settings",  icon: Settings,   label: "Settings" },
];

/* ─── Sidebar Props ───────────────────────────────────── */

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

/* ─── SidebarItem ─────────────────────────────────────── */

function SidebarItem({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const location = useLocation();
  const isActive =
    item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);

  return (
    <NavLink
      to={item.to}
      aria-label={collapsed ? item.label : undefined}
      aria-current={isActive ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "relative flex items-center gap-3 rounded-full",
        "h-12 px-4 w-full",
        "text-[15px] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]",
        collapsed && "justify-center px-0",
        isActive
          ? "bg-white/15 font-semibold text-white"
          : "font-medium text-white/60 hover:bg-white/10 hover:text-white/90"
      )}
    >
      <item.icon
        size={20}
        strokeWidth={2}
        aria-hidden={true}
        className={cn("shrink-0", isActive ? "text-white" : "text-white/50")}
      />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && item.chip && (
        <span className="ml-auto shrink-0 rounded-full bg-[#2153E6] px-1.5 py-[2px] text-[9px] font-bold leading-none text-white">
          {item.chip}
        </span>
      )}
      {!collapsed && item.badge !== undefined && (
        <span
          className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-error)] px-[6px] text-[11px] font-semibold leading-none text-white tabular-nums"
        >
          {item.badge}
        </span>
      )}
      {item.badge !== undefined && collapsed && (
        <span
          className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[var(--color-error)]"
          aria-hidden="true"
        />
      )}
      {isActive && !collapsed && <span className="sr-only">(current page)</span>}
    </NavLink>
  );
}

/* ─── Sidebar Component ───────────────────────────────── */

export function Sidebar({ collapsed = false, onToggleCollapse, className }: SidebarProps) {
  return (
    <aside
      aria-label="Primary navigation"
      className={cn(
        // Dark navy sidebar — matching the reference design
        "fixed flex flex-col z-[var(--z-sticky)]",
        "top-[var(--spacing-sm)] left-[var(--spacing-sm)]",
        "h-[calc(100vh-(2*var(--spacing-sm)))]",
        "rounded-[24px]",
        "shadow-[0_18px_44px_-26px_rgba(0,0,0,0.45)]",
        "transition-[width] duration-[var(--duration-normal)] ease-[var(--ease-normal)]",
        collapsed ? "w-[var(--sidebar-width-collapsed)]" : "w-[var(--sidebar-width)]",
        "overflow-hidden",
        className
      )}
      style={{
        background: "#0F1E3C",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Brand + collapse control ──────────────────── */}
      <div
        className={cn(
          "flex items-center shrink-0",
          "h-[var(--header-height-desktop)]",
          "px-4",
          "border-b border-white/8",
          collapsed ? "justify-center" : "gap-3"
        )}
      >
        <Link
          to="/landing"
          aria-label="Veyra — back to landing page"
          title="Back to landing page"
          className={cn(
            "flex items-center rounded-2xl",
            collapsed ? "justify-center" : "min-w-0",
            "hover:bg-white/10",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
            "focus-visible:outline-offset-[var(--focus-ring-offset)]"
          )}
        >
          {collapsed ? (
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <VeyraMark size={30} />
            </span>
          ) : (
            <span className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                <VeyraMark size={28} />
              </span>
              <span className="block text-[length:var(--typography-h3-size)] font-extrabold tracking-tight leading-none text-white">
                Veyra
              </span>
            </span>
          )}
        </Link>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              "text-white/50 hover:bg-white/10 hover:text-white",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]",
              collapsed ? "mt-2" : "ml-auto"
            )}
          >
            <ChevronsUpDown size={15} strokeWidth={2} aria-hidden={true} className={collapsed ? "rotate-90" : ""} />
          </button>
        )}
      </div>

      {/* ── Navigation ────────────────────────────────── */}
      <nav
        aria-label="Sidebar"
        className="flex flex-col flex-1 px-3 py-5 overflow-y-auto"
      >
        <ul role="list" className="flex flex-col gap-2">
          {primaryNav.map((item) => (
            <li key={item.to}>
              <SidebarItem item={item} collapsed={collapsed} />
            </li>
          ))}
        </ul>

        {/* Divider — separates the account group */}
        <div className="my-4 h-px bg-white/10" role="presentation" />

        <ul role="list" className="flex flex-col gap-2">
          <li>
            {/* Log out — soft red, flat like the rest */}
            <NavLink
              to="/landing"
              title={collapsed ? "Log out" : undefined}
              aria-label={collapsed ? "Log out" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-full",
                "h-12 px-4 w-full",
                "text-[15px] font-medium text-red-400",
                "hover:bg-white/10 hover:text-red-300",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]",
                collapsed && "justify-center px-0"
              )}
            >
              <LogOut size={20} strokeWidth={2} aria-hidden={true} />
              {!collapsed && <span>Log out</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* ── Veyra Pro — quiet upsell strip ────────────── */}
      <div className="shrink-0 px-3 pb-4">
        {collapsed ? (
          <NavLink
            to="/plans"
            aria-label="Upgrade to Veyra Pro"
            title="Upgrade to Veyra Pro"
            className={cn(
              "flex h-11 w-full items-center justify-center rounded-full",
              "bg-[#2153E6]/80 text-white hover:bg-[#2153E6]",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]"
            )}
          >
            <Sparkles size={16} strokeWidth={2} aria-hidden={true} />
          </NavLink>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/6 p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-[length:var(--typography-caption-size)] font-bold text-blue-300">
                <Sparkles size={11} strokeWidth={2.5} aria-hidden={true} />
                Veyra Pro
              </p>
              <p className="truncate text-[11px] leading-snug text-white/45">
                Smart reminders, advanced insights &amp; more.
              </p>
            </div>
            <NavLink
              to="/plans"
              className={cn(
                "shrink-0 inline-flex items-center gap-1 rounded-full bg-[#2153E6] px-2.5 py-1",
                "text-[11px] font-bold text-white hover:bg-[#1A44D4]",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]"
              )}
            >
              Upgrade
              <ArrowRight size={11} strokeWidth={2.5} aria-hidden={true} />
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
}
