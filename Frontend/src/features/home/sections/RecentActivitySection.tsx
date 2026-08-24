/**
 * Veyra — RecentActivitySection
 * Source: design_system/Architecture/Section8.md
 *
 * Pattern: Recent Activity (compact preview)
 * Structure: Header + "View recent activity" link → /activity + short list
 *
 * Rules:
 * - Direction: icon + sign, never color-alone
 * - Compact by design — the full graph and history live on /activity
 */

import { ArrowDownLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { SectionHeader } from "../components/SectionHeader";
import { formatCurrency } from "@/lib/format";

export interface ActivityItem {
  merchant: string;
  category: string;
  amount: number;
  date: string;
  direction: "in" | "out";
}

interface RecentActivitySectionProps {
  items: ActivityItem[];
  className?: string;
}

export function RecentActivitySection({ items, className }: RecentActivitySectionProps) {
  return (
    <section
      className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)}
      aria-labelledby="recent-activity-title"
    >
      <div className="flex items-end justify-between gap-[var(--spacing-md)]">
        <SectionHeader
          title="Recent activity"
          description="Where your money moved last"
        />
        <Link
          to="/activity"
          className={cn(
            "shrink-0 inline-flex items-center gap-[var(--spacing-2xs)] self-start",
            "rounded-full border border-[#2153E6]/30 px-[var(--spacing-sm)] py-[var(--spacing-2xs)]",
            "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
            "text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
            "focus-visible:outline-offset-[var(--focus-ring-offset)]"
          )}
        >
          View recent activity
          <ArrowRight size={14} strokeWidth={2.5} aria-hidden={true} />
        </Link>
      </div>

      <Card surface="default" frame="rose">
        <CardContent className="p-[var(--spacing-sm)] sm:p-[var(--spacing-md)] flex flex-col divide-y divide-[var(--color-border)]">
          {items.map((item) => {
            const incoming = item.direction === "in";
            const Icon = incoming ? ArrowDownLeft : ArrowUpRight;
            return (
              <div
                key={`${item.merchant}-${item.date}`}
                className={cn(
                  "flex items-center gap-[var(--spacing-md)] px-[var(--spacing-sm)] py-[var(--spacing-xs)]",
                  "rounded-[var(--radius-md)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                  "hover:bg-[var(--color-surface-2)]/70"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    incoming ? "bg-[var(--color-success-soft)]" : "bg-[var(--color-error-soft)]"
                  )}
                  aria-hidden="true"
                >
                  <Icon
                    size={16}
                    strokeWidth={2.5}
                    className={incoming ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}
                  />
                </span>

                <div className="flex-1 min-w-0">
                  <p className="truncate text-[length:var(--typography-label-size)] font-medium text-[var(--color-text-primary)]">
                    {item.merchant}
                  </p>
                  <p className="truncate text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">
                    {item.category}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p
                    className={cn(
                      "text-[length:var(--typography-label-size)] font-semibold tabular-nums",
                      incoming ? "text-[var(--color-success)]" : "text-[var(--color-text-primary)]"
                    )}
                  >
                    {incoming ? "+" : "−"}
                    {formatCurrency(Math.abs(item.amount))}
                  </p>
                  <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}
