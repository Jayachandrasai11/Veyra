/**
 * Fermor/Veyra — Recent Activity Page
 * Source: design_system/Architecture/Section8.md
 *
 * Full activity view: money graph (daily / weekly / monthly),
 * type filter chips, and the complete movement list.
 */

import { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, ReceiptText } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { MoneyGraph } from "../components/MoneyGraph";
import { formatCurrency } from "@/lib/format";
import { financialSummary } from "@/data/financial";

type Filter = "all" | "in" | "out";

interface ActivityRow {
  merchant: string;
  category: string;
  amount: number;
  date: string;
  direction: "in" | "out";
}

const ACTIVITY: ActivityRow[] = [
  { merchant: "Swiggy", category: "Dining", amount: 420, date: "Today", direction: "out" },
  { merchant: "Salary credit", category: "Income", amount: financialSummary.monthlyIncome, date: "Mar 1", direction: "in" },
  { merchant: "Netflix", category: "Subscriptions", amount: 649, date: "Feb 28", direction: "out" },
  { merchant: "Amazon", category: "Shopping", amount: 1240, date: "Feb 27", direction: "out" },
  { merchant: "Zomato", category: "Dining", amount: 380, date: "Feb 25", direction: "out" },
  { merchant: "Uber", category: "Transport", amount: 240, date: "Feb 24", direction: "out" },
  { merchant: "Electricity bill", category: "Utilities", amount: 1860, date: "Feb 22", direction: "out" },
  { merchant: "Freelance payout", category: "Income", amount: 8500, date: "Feb 20", direction: "in" },
  { merchant: "Big Bazaar", category: "Groceries", amount: 2140, date: "Feb 18", direction: "out" },
  { merchant: "Spotify", category: "Subscriptions", amount: 119, date: "Feb 15", direction: "out" },
];

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "in", label: "Income" },
  { id: "out", label: "Expenses" },
];

export function RecentActivityPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const rows = ACTIVITY.filter((a) => filter === "all" || a.direction === filter);

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      {/* Page header */}
      <header className="flex items-start gap-[var(--spacing-md)]">
        <span
          className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]"
          aria-hidden="true"
        >
          <ReceiptText size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
        </span>
        <div className="flex flex-col gap-[var(--spacing-2xs)] min-w-0">
          <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]">
            Activity
          </p>
          <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)]">
            Recent activity
          </h1>
          <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[60ch]">
            Every movement of your money — day by day, week by week.
          </p>
        </div>
      </header>

      {/* Money graph */}
      <Card surface="default">
        <CardContent className="p-[var(--spacing-lg)]">
          <MoneyGraph />
        </CardContent>
      </Card>

      {/* Type filter + full list */}
      <div className="flex flex-col gap-[var(--spacing-md)]">
        <div
          role="tablist"
          aria-label="Filter activity by type"
          className="inline-flex self-start rounded-full bg-[var(--color-surface-slate)] p-[3px]"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-[var(--spacing-md)] py-1.5 rounded-full text-[12px] font-semibold",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]",
                filter === f.id
                  ? "bg-white text-[var(--color-primary-hover)] shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Card surface="default">
          <CardContent className="p-[var(--spacing-sm)] sm:p-[var(--spacing-md)] flex flex-col divide-y divide-[var(--color-border)]">
            {rows.map((item) => {
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
            {rows.length === 0 && (
              <p className="py-[var(--spacing-md)] text-center text-[var(--color-text-secondary)]">
                Nothing here for this filter yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
