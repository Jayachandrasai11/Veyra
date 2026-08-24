/**
 * Fermor/Veyra — MoneyGraph
 * Source: design_system/Architecture/Section8.md
 *
 * Day-by-day / weekly / monthly money movement chart with a pill
 * toggle. Self-contained: owns its granularity state and datasets.
 *
 * Rules:
 * - Monthly view shows real income vs expense data
 * - Labels are text; color never carries meaning alone
 */

import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/cn";
import { financialSummary } from "@/data/financial";
import { formatCurrency } from "@/lib/format";

type RangeKey = "day" | "week" | "month";
type GraphPoint = { label: string; income?: number; spent?: number };

const DAY_DATA: GraphPoint[] = [
  { label: "Mon", spent: 380 },
  { label: "Tue", spent: 1240 },
  { label: "Wed", spent: 95 },
  { label: "Thu", spent: 620 },
  { label: "Fri", spent: 1480 },
  { label: "Sat", spent: 880 },
  { label: "Sun", spent: 210 },
];

const WEEK_DATA: GraphPoint[] = [
  { label: "W1", spent: 3150 },
  { label: "W2", spent: 2480 },
  { label: "W3", spent: 3960 },
  { label: "W4", spent: 2890 },
  { label: "W5", spent: 3410 },
  { label: "W6", spent: 3842 },
];

const MONTH_DATA: GraphPoint[] = financialSummary.incomeVsExpense.map((m) => ({
  label: m.month,
  income: m.income,
  spent: m.expense,
}));

const RANGE_META: Record<RangeKey, { caption: string }> = {
  day: { caption: "Money out · last 7 days" },
  week: { caption: "Money out · last 6 weeks" },
  month: { caption: "Income vs expenses · last 6 months" },
};

function GraphTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-[var(--spacing-sm)] py-[var(--spacing-xs)] shadow-[var(--shadow-raised)]">
      <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">{label}</p>
      {payload.map((p: any) => (
        <p
          key={p.dataKey}
          className="text-[length:var(--typography-label-size)] font-semibold tabular-nums"
          style={{ color: p.color }}
        >
          {p.name}: {formatCurrency(Math.abs(p.value))}
        </p>
      ))}
    </div>
  );
}

export function MoneyGraph() {
  const [range, setRange] = useState<RangeKey>("month");

  const data = range === "day" ? DAY_DATA : range === "week" ? WEEK_DATA : MONTH_DATA;
  const isMonth = range === "month";

  return (
    <div className="flex flex-col gap-[var(--spacing-sm)]">
      {/* Granularity pills */}
      <div className="flex flex-wrap items-center justify-between gap-[var(--spacing-sm)]">
        <div
          role="tablist"
          aria-label="Graph granularity"
          className="inline-flex rounded-full bg-[var(--color-surface-slate)] p-[3px]"
        >
          {(Object.keys(RANGE_META) as RangeKey[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={range === key}
              onClick={() => setRange(key)}
              className={cn(
                "px-[var(--spacing-sm)] py-1 rounded-full text-[12px] font-semibold capitalize",
                "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]",
                range === key
                  ? "bg-white text-[var(--color-primary-hover)] shadow-sm"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {key === "day" ? "Daily" : key === "week" ? "Weekly" : "Monthly"}
            </button>
          ))}
        </div>
        <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">
          {RANGE_META[range].caption}
        </p>
      </div>

      <div className="h-[200px] w-full" role="img" aria-label={`${RANGE_META[range].caption} chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 4 }} barCategoryGap="28%">
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-tertiary)", fontSize: 11 }}
            />
            <Tooltip content={<GraphTooltip />} cursor={{ fill: "rgba(33,83,230,0.06)" }} />
            {isMonth ? (
              <>
                <Bar dataKey="income" name="In" fill="#2153E6" radius={[6, 6, 0, 0]} maxBarSize={22} />
                <Bar dataKey="spent" name="Out" fill="#F19A8E" radius={[6, 6, 0, 0]} maxBarSize={22} />
              </>
            ) : (
              <Bar
                dataKey="spent"
                name="Out"
                fill="#2153E6"
                fillOpacity={0.85}
                radius={[6, 6, 0, 0]}
                maxBarSize={26}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
