/**
 * Veyra — MonthlySplitCard
 * Source: design_system/Layout/Dashboard.md
 *
 * Unified "this month" mechanics card: income figure on the left,
 * one proportional allocation bar splitting it into Expenses and
 * Savings, legend beneath, savings-rate badge in header.
 *
 * Rules:
 * - Segments proportional to real values (area = instant comparison)
 * - Bar fills once on mount via .animate-grow-x (reduced-motion safe)
 * - Never color-alone: legend pairs dot + name + share + amount
 */

import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { formatCurrency } from "@/lib/format";

export interface MonthSplit {
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
}

interface MonthlySplitCardProps {
  month: MonthSplit;
  className?: string;
}

function LegendItem({
  label,
  share,
  amount,
}: {
  label: string;
  share: string;
  amount: string;
}) {
  return (
    <div className="flex items-center gap-[var(--spacing-2xs)]">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]"
      />
      <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
        {label} · {share}
      </span>
      <span className="text-[length:var(--typography-caption-size)] font-semibold tabular-nums text-[var(--color-primary-hover)]">
        {amount}
      </span>
    </div>
  );
}

export function MonthlySplitCard({ month, className }: MonthlySplitCardProps) {
  const allocated = month.expenses + month.savings;
  const expenseShare = allocated > 0 ? Math.round((month.expenses / allocated) * 100) : 50;
  const savingsShare = 100 - expenseShare;

  return (
    <Card frame="blue" surface="default" className={cn("w-full", className)}>
      <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-md)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-[var(--spacing-sm)]">
          <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]">
            This month
          </p>
          <span className="inline-flex items-center rounded-[var(--radius-full)] border border-[#2153E6]/25 bg-[var(--color-primary-soft)] px-3 py-[2px] text-[length:var(--typography-caption-size)] font-bold tabular-nums text-[var(--color-primary-hover)]">
            {month.savingsRate}% saved
          </span>
        </div>

        {/* Income + allocation bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-[var(--spacing-md)]"
          role="img"
          aria-label={`This month: ${formatCurrency(month.income)} income, ${formatCurrency(month.expenses)} to expenses (${expenseShare}%), ${formatCurrency(month.savings)} to savings (${savingsShare}%). Savings rate ${month.savingsRate}%.`}
        >
          <div className="shrink-0 flex flex-col">
            <span className="text-[length:var(--typography-caption-size)] uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
              Income
            </span>
            <span
              className="font-semibold tabular-nums text-[var(--color-text-primary)]"
              style={{
                fontSize: "var(--typography-h3-size)",
                lineHeight: 1.2,
              }}
            >
              {formatCurrency(month.income)}
            </span>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-[var(--spacing-xs)]">
            <div className="flex h-2.5 w-full gap-[3px]">
              <div
                className="animate-grow-x rounded-full bg-[#F97316]"
                style={{ width: `${expenseShare}%` }}
              />
              <div
                className="animate-grow-x rounded-full bg-[#34D399]"
                style={{
                  width: `${savingsShare}%`,
                  animationDelay: "120ms",
                }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-[var(--spacing-md)] gap-y-[var(--spacing-2xs)]">
              <LegendItem
                label="Expenses"
                share={`${expenseShare}%`}
                amount={formatCurrency(month.expenses)}
              />
              <LegendItem
                label="Savings"
                share={`${savingsShare}%`}
                amount={formatCurrency(month.savings)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
