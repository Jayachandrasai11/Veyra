/**
 * VEYRA — Badge
 * Source: design_system/Components/Badge.md
 *
 * Variants: default | success | warning | error | info | neutral
 * Uses Veyra semantic color tokens.
 * Radius: --radius-full (pill)
 */

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-[var(--spacing-2xs)]",
    "px-[var(--spacing-xs)] py-[var(--spacing-2xs)]",
    "rounded-[var(--radius-full)]",
    "text-[length:var(--typography-caption-size)] font-[var(--typography-label-weight)]",
    "leading-[var(--typography-caption-line)]",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-primary-soft)] text-[var(--color-primary)]",
        ],
        success: [
          "bg-[var(--color-success-soft)] text-[var(--color-success)]",
        ],
        warning: [
          "bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
        ],
        error: [
          "bg-[var(--color-error-soft)] text-[var(--color-error)]",
        ],
        info: [
          "bg-[var(--color-info-soft)] text-[var(--color-info)]",
        ],
        neutral: [
          "bg-[var(--color-surface-2)] text-[var(--color-text-secondary)]",
          "border border-[var(--color-border)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
