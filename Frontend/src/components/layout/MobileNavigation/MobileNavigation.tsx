/**
 * VEYRA — Mobile Navigation (Drawer)
 * Source: design_system/Layout/Appshell.md §MOBILE LAYOUT
 *         design_system/Layout/sidebar.md §Mobile
 *
 * Rules:
 * - Mobile only (< 768px) — hidden on tablet/desktop
 * - Slides in from left — normal motion token (200ms)
 * - Overlay: z-overlay (40)
 * - Drawer itself: z-modal (50)
 * - Backdrop tap closes drawer
 * - Keyboard: Escape closes
 * - Focus trap when open
 */

import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router";
import {
  House,
  Landmark,
  ChartLine,
  Target,
  Compass,
  Sparkles,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { VeyraLockup } from "@/components/brand/VeyraBrand";

interface NavItem {
  to: string;
  icon: React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean }>;
  label: string;
}

const primaryNav: NavItem[] = [
  { to: "/",          icon: House,      label: "Home" },
  { to: "/money",     icon: Landmark,   label: "Money" },
  { to: "/insights",  icon: ChartLine,  label: "Insights" },
  { to: "/goals",     icon: Target,     label: "Goals" },
  { to: "/explore",   icon: Compass,    label: "Explore" },
];

const secondaryNav: NavItem[] = [
  { to: "/assistant", icon: Sparkles,  label: "Ask Veyra" },
  { to: "/settings",  icon: Settings,  label: "Settings" },
];

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on route change
  const currentPath = useRef(location.pathname);
  useEffect(() => {
    if (currentPath.current !== location.pathname) {
      currentPath.current = location.pathname;
      onClose();
    }
  }, [location.pathname, onClose]);

  // Escape key closes
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Focus management: move focus inside when open, trap Tab, restore on close.
  useFocusTrap(open, dialogRef, { initialFocusRef: closeButtonRef });

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[var(--z-overlay)] bg-black/40",
          "transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-normal)]",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 left-0 h-[100vh] z-[var(--z-modal)]",
          "w-[var(--sidebar-width)]",
          "flex flex-col",
          "bg-[var(--color-surface-1)] border-r border-[var(--color-border)]",
          "transition-transform duration-[var(--duration-normal)] ease-[var(--ease-normal)]",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header row */}
        <div
          className="flex items-center justify-between shrink-0 h-[var(--header-height-mobile)] px-[var(--spacing-md)] border-b border-[var(--color-border)]"
        >
          {/* Logo */}
          <div className="flex items-center">
            <VeyraLockup stacked />
          </div>

          {/* Close */}
          <Button
            ref={closeButtonRef}
            variant="icon"
            size="icon"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <X size={20} strokeWidth={2} aria-hidden={true} />
          </Button>
        </div>

        {/* Nav */}
        <nav
          aria-label="Mobile"
          className="flex flex-col flex-1 px-[var(--spacing-xs)] py-[var(--spacing-sm)] overflow-y-auto"
        >
          <ul role="list" className="flex flex-col gap-[var(--nav-item-gap)]">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <DrawerNavItem item={item} />
              </li>
            ))}
          </ul>

          <div className="flex-1" />

          <ul role="list" className="flex flex-col gap-[var(--nav-item-gap)] mt-[var(--nav-group-gap)]">
            {secondaryNav.map((item) => (
              <li key={item.to}>
                <DrawerNavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

function DrawerNavItem({ item }: { item: NavItem }) {
  const location = useLocation();
  const isActive =
    item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);

  return (
    <NavLink
      to={item.to}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-[10px] rounded-[var(--radius-md)]",
        "px-[var(--nav-item-padding-x)] min-h-[var(--nav-item-height)]",
        "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
        "transition-[background-color,color] duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]",
        isActive
          ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]"
      )}
    >
      {isActive && <span className="sr-only">(current page)</span>}
      <item.icon size={18} strokeWidth={2} aria-hidden={true} />
      <span>{item.label}</span>
    </NavLink>
  );
}
