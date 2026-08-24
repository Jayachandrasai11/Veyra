/**
 * VEYRA — Loading / Skeleton
 * Source: design_system/Components/Load.md
 *
 * Reusable skeleton placeholder.
 * Used by all sections during loading states.
 * Shape is controlled by className (width / height / radius).
 */

import { cn } from "@/lib/cn";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-sm)]",
        "bg-[var(--color-surface-3)]",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Skeleton that matches a text line */
export function SkeletonText({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={cn("h-[var(--typography-body-sm-line)] w-3/4", className)}
      {...props}
    />
  );
}

/** Skeleton that matches a metric card */
export function SkeletonMetric({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-[var(--spacing-xs)]", className)}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}
