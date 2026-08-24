/**
 * VEYRA — Dropdown Menu
 * Source: design_system/Components/Dropdown.md
 *
 * Foundation: shadcn/ui DropdownMenu pattern
 *
 * Rules:
 * - Desktop item: 36-40px height
 * - Mobile item: 44px+ height
 * - Chevron: Lucide ChevronDown, 16px
 * - Menu icon: Lucide, 16px
 * - Focus: --primary, 2px ring
 * - Destructive: --error color
 * - Keyboard accessible
 * - Escape to close
 *
 * Implementation note: the open menu is rendered through a PORTAL to
 * document.body with fixed coordinates measured from the trigger.
 * This guarantees it is never clipped by overflow-hidden ancestors
 * (e.g. the rounded app-header card).
 */

import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

interface AnchorRect {
  top: number;
  left: number;
  width: number;
}

interface DropdownMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

function DropdownMenu({
  open,
  onOpenChange,
  trigger,
  children,
  align = "end",
  sideOffset = 4,
}: DropdownMenuProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<AnchorRect | null>(null);

  // Measure the trigger while open; keep the menu glued on scroll/resize.
  useLayoutEffect(() => {
    if (!open) {
      setRect(null);
      return;
    }
    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRect({ top: r.bottom, left: r.left, width: r.width });
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open]);

  // Escape closes from anywhere.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open || !rect) {
    return <div ref={anchorRef} className="relative inline-block">{trigger}</div>;
  }

  const panelStyle: React.CSSProperties =
    align === "end"
      ? { top: rect.top + sideOffset, left: "auto", right: Math.max(window.innerWidth - (rect.left + rect.width), 0) }
      : align === "center"
        ? { top: rect.top + sideOffset, left: rect.left + rect.width / 2, transform: "translateX(-50%)" }
        : { top: rect.top + sideOffset, left: rect.left };

  return (
    <>
      <div ref={anchorRef} className="relative inline-block">{trigger}</div>
      {createPortal(
        <>
          {/* Click-away veil */}
          <div
            className="fixed inset-0 z-[var(--z-modal)]"
            onClick={() => onOpenChange(false)}
            aria-hidden="true"
          />
          <DropdownMenuItems
            align={align}
            style={panelStyle}
            onClose={() => onOpenChange(false)}
          >
            {children}
          </DropdownMenuItems>
        </>,
        document.body
      )}
    </>
  );
}

interface DropdownMenuItemsProps {
  align: "start" | "center" | "end";
  style?: React.CSSProperties;
  onClose: () => void;
  children: React.ReactNode;
}

function DropdownMenuItems({ align, style, children }: DropdownMenuItemsProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // On open: remember the trigger, focus the first item.
  // On close (unmount): return focus to the trigger.
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const first = menuRef.current?.querySelector<HTMLElement>(
      '[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]'
    );
    first?.focus();
    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, []);

  const getItems = () =>
    Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"]'
      ) ?? []
    );

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = getItems();
    if (items.length === 0) return;
    const idx = items.indexOf(document.activeElement as HTMLElement);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        items[(idx + 1) % items.length].focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
        break;
      case "Home":
        e.preventDefault();
        items[0].focus();
        break;
      case "End":
        e.preventDefault();
        items[items.length - 1].focus();
        break;
    }
  };

  return (
    <div
      ref={menuRef}
      onKeyDown={handleMenuKeyDown}
      className={cn(
        "fixed z-[calc(var(--z-modal)+1)]",
        "min-w-[180px]",
        "bg-[var(--color-surface-1)]",
        "border border-[var(--color-border)]",
        "rounded-[var(--radius-md)]",
        "shadow-[var(--shadow-raised)]",
        "p-[var(--spacing-2xs)]",
        "transition-all duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        align === "start" && "left-0",
        align === "end" && "right-0"
      )}
      style={style}
      role="menu"
    >
      {children}
    </div>
  );
}

const DropdownMenuTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean;
  inset?: boolean;
}

const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, destructive = false, inset = false, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      className={cn(
        "relative flex items-center gap-[var(--spacing-sm)]",
        "w-full rounded-[var(--radius-sm)]",
        "px-[var(--spacing-sm)] py-[var(--spacing-xs)]",
        "min-h-[36px] md:min-h-[44px]",
        "text-[length:var(--typography-body-sm-size)] text-[var(--color-text-primary)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-none",
        "focus-visible:bg-[var(--color-surface-2)]",
        "hover:bg-[var(--color-surface-2)]",
        "disabled:pointer-events-none disabled:opacity-40",
        inset && "pl-[var(--spacing-2xl)]",
        destructive && "text-[var(--color-error)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

interface DropdownMenuCheckboxItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const DropdownMenuCheckboxItem = forwardRef<HTMLButtonElement, DropdownMenuCheckboxItemProps>(
  ({ className, checked = false, onCheckedChange, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative flex items-center gap-[var(--spacing-sm)]",
        "w-full rounded-[var(--radius-sm)]",
        "px-[var(--spacing-sm)] py-[var(--spacing-xs)]",
        "min-h-[36px] md:min-h-[44px]",
        "text-[length:var(--typography-body-sm-size)] text-[var(--color-text-primary)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-none",
        "focus-visible:bg-[var(--color-surface-2)]",
        "hover:bg-[var(--color-surface-2)]",
        "disabled:pointer-events-none disabled:opacity-40",
        "pl-[var(--spacing-2xl)]",
        className
      )}
      {...props}
    >
      {checked && (
        <Check size={16} strokeWidth={2} className="absolute left-[var(--spacing-sm)]" aria-hidden={true} />
      )}
      {children}
    </button>
  )
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

interface DropdownMenuRadioItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  value: string;
  selected?: boolean;
}

const DropdownMenuRadioItem = forwardRef<HTMLButtonElement, DropdownMenuRadioItemProps>(
  ({ className, selected = false, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      className={cn(
        "relative flex items-center gap-[var(--spacing-sm)]",
        "w-full rounded-[var(--radius-sm)]",
        "px-[var(--spacing-sm)] py-[var(--spacing-xs)]",
        "min-h-[36px] md:min-h-[44px]",
        "text-[length:var(--typography-body-sm-size)] text-[var(--color-text-primary)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-none",
        "focus-visible:bg-[var(--color-surface-2)]",
        "hover:bg-[var(--color-surface-2)]",
        "disabled:pointer-events-none disabled:opacity-40",
        "pl-[var(--spacing-2xl)]",
        className
      )}
      {...props}
    >
      {selected && (
        <span
          className="absolute left-[var(--spacing-sm)] h-2 w-2 rounded-full bg-[var(--color-primary)]"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-[var(--spacing-sm)] py-[var(--spacing-xs)]",
        "text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)]",
        "text-[var(--color-text-tertiary)]",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn(
        "my-[var(--spacing-2xs)] h-px bg-[var(--color-border)]",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuShortcut = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "ml-auto text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]",
        "tracking-widest",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
};
