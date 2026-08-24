/**
 * VEYRA — Tabs
 * Source: design_system/Components/Tabs.md
 *
 * Foundation: shadcn/ui Tabs pattern
 * Variants: underline (primary) | segmented | pill | contained
 *
 * Rules:
 * - Height: 40-44px
 * - Active indicator: 2px, --primary color
 * - Inactive text: --text-secondary
 * - No icons by default
 * - Mobile: horizontal scroll, never wrap
 * - Keyboard accessible
 */

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const tabsVariants = cva(
  [
    "inline-flex items-center gap-[var(--spacing-xs)]",
    "w-full overflow-x-auto scrollbar-none",
  ],
  {
    variants: {
      variant: {
        underline: ["border-b border-[var(--color-border)]"],
        segmented: [
          "bg-[var(--color-surface-2)] rounded-[var(--radius-md)] p-[var(--spacing-2xs)]",
        ],
        pill: ["gap-[var(--spacing-xs)]"],
        contained: [
          "bg-[var(--color-surface-2)] rounded-[var(--radius-md)] p-[var(--spacing-2xs)]",
        ],
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
);

const triggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
    "rounded-[var(--radius-sm)]",
    "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
    "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
    "focus-visible:outline-offset-[var(--focus-ring-offset)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "px-[var(--spacing-sm)]",
    "min-h-[var(--nav-item-height)]",
  ],
  {
    variants: {
      variant: {
        underline: [
          "relative",
          "text-[var(--color-text-secondary)]",
          "hover:text-[var(--color-text-primary)]",
          "data-[state=active]:text-[var(--color-text-primary)]",
          "data-[state=active]:after:absolute",
          "data-[state=active]:after:bottom-0",
          "data-[state=active]:after:left-0",
          "data-[state=active]:after:right-0",
          "data-[state=active]:after:h-[2px]",
          "data-[state=active]:after:bg-[var(--color-primary)]",
          "data-[state=active]:after:rounded-t-[var(--radius-xs)]",
        ],
        segmented: [
          "text-[var(--color-text-secondary)]",
          "hover:text-[var(--color-text-primary)]",
          "data-[state=active]:bg-[var(--color-surface-1)]",
          "data-[state=active]:text-[var(--color-text-primary)]",
          "data-[state=active]:shadow-[var(--shadow-card)]",
        ],
        pill: [
          "text-[var(--color-text-secondary)]",
          "hover:bg-[var(--color-surface-2)]",
          "hover:text-[var(--color-text-primary)]",
          "data-[state=active]:bg-[var(--color-primary-soft)]",
          "data-[state=active]:text-[var(--color-primary)]",
          "data-[state=active]:font-semibold",
        ],
        contained: [
          "text-[var(--color-text-secondary)]",
          "hover:text-[var(--color-text-primary)]",
          "data-[state=active]:bg-[var(--color-primary)]",
          "data-[state=active]:text-white",
          "data-[state=active]:font-semibold",
        ],
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, variant, value, onValueChange, children, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const navKeys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
      if (!navKeys.includes(e.key)) return;

      const tabs = Array.from(
        e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      );
      if (tabs.length === 0) return;

      const currentIndex = tabs.findIndex((t) => t === document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = tabs.length - 1;
      }

      e.preventDefault();
      const next = tabs[nextIndex];
      next.focus();
      onValueChange?.(next.dataset.value as string);
    };

    return (
      <div
        ref={ref}
        className={cn(tabsVariants({ variant }), className)}
        role="tablist"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Tabs.displayName = "Tabs";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof triggerVariants> {
  value: string;
  active?: boolean;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, variant, value, active, children, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        id={`tab-${value}`}
        data-value={value}
        role="tab"
        aria-selected={active}
        aria-controls={`tabpanel-${value}`}
        tabIndex={active ? 0 : -1}
        data-state={active ? "active" : "inactive"}
        className={cn(triggerVariants({ variant }), className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  active?: boolean;
}

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ className, value, active, hidden, ...props }, ref) => {
    if (hidden === undefined ? !active : hidden) {
      return null;
    }
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className={cn("outline-none", className)}
        {...props}
      />
    );
  }
);
TabsPanel.displayName = "TabsPanel";

export { Tabs, TabsTrigger, TabsPanel, tabsVariants, triggerVariants };
