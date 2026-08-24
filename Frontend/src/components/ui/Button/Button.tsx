/**
 * VEYRA — Button
 * Source: design_system/Components/buttons.md
 *
 * Foundation: shadcn/ui Button pattern (CVA-based).
 * Extended with Veyra variants and Veyra design tokens.
 *
 * Variants: primary | secondary | outline | ghost | link | destructive | icon | ai
 * Sizes:    sm | md | lg
 */

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  // Base styles — all tokens from design system
  [
    "inline-flex items-center justify-center gap-[var(--icon-gap)]",
    "font-medium rounded-[var(--radius-button)]",
    "text-[length:var(--typography-label-size)] leading-[var(--typography-label-line)]",
    "transition-[background-color,color,border-color,box-shadow]",
    "duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
    "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
    "focus-visible:outline-offset-[var(--focus-ring-offset)]",
    "disabled:opacity-40 disabled:pointer-events-none",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        // Highest emphasis — primary brand action
        primary: [
          "bg-[var(--color-primary)] text-white",
          "hover:bg-[var(--color-primary-hover)]",
          "active:opacity-90",
        ],
        // Medium emphasis
        secondary: [
          "bg-[var(--color-surface-2)] text-[var(--color-text-primary)]",
          "border border-[var(--color-border)]",
          "hover:bg-[var(--color-surface-3)]",
        ],
        // Secondary visible action
        outline: [
          "bg-transparent text-[var(--color-primary)]",
          "border border-[var(--color-primary)]",
          "hover:bg-[var(--color-primary-soft)]",
        ],
        // Low emphasis
        ghost: [
          "bg-transparent text-[var(--color-text-secondary)]",
          "hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]",
        ],
        // Inline navigation
        link: [
          "bg-transparent text-[var(--color-primary)] underline-offset-4",
          "hover:underline",
          "p-0 h-auto",
        ],
        // Dangerous/destructive actions
        destructive: [
          "bg-[var(--color-error)] text-white",
          "hover:opacity-90",
        ],
        // Icon-only — square button
        icon: [
          "bg-transparent text-[var(--color-text-secondary)]",
          "hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]",
          "rounded-[var(--radius-md)]",
        ],
        // Veyra AI action (Ask Veyra) — soft sky-blue surface, primary-blue text
        ai: [
          "bg-[var(--color-surface-blue)] text-[var(--color-primary)]",
          "border border-[var(--color-primary-soft)]",
          "hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]",
        ],
      },
      size: {
        // 32px height — buttons.md
        sm: "h-8 px-[var(--spacing-sm)] text-[length:var(--typography-body-sm-size)]",
        // 40px height — default
        md: "h-10 px-[var(--spacing-md)]",
        // 48px height
        lg: "h-12 px-[var(--spacing-lg)] text-[length:var(--typography-body-size)]",
        // Icon-only square — 40×40 / touch target 44×44
        icon: "h-10 w-10 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  /** Accessible label for icon-only buttons (required when no text child) */
  "aria-label"?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            {/* Spinner using CSS border — no extra dep */}
            <span
              className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
              aria-hidden="true"
            />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
