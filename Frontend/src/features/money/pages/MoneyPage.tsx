/**
 * Veyra — Money Page (Money at a Glance deep view)
 * Source: design_system/Patterns/Money.md
 *         design_system/Architecture/section3.md
 *         design_system/Patterns/Financial.md
 *
 * Pattern: Money Overview (deeper view)
 * Structure:
 *   - Financial Health Summary (primary, with "See why" → /insights)
 *   - KPI Grid (Net Worth, Investments, Savings Rate, plus expanded metrics)
 *   - Balance History (Recharts area chart)
 *   - Spending by Category
 *
 * Rules:
 * - Reuse FinancialHealthSummary, FinancialMetric, Card, SectionHeader
 * - Reuse existing financial data from src/data/financial
 * - Reuse existing formatting utilities
 * - Support loading, empty, error, stale states
 * - Use Veyra semantic tokens only
 */

import { ArrowLeft, TrendingUp, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, type Surface } from "@/components/ui/Card/Card";
import { FinancialHealthSummary } from "@/components/ui/Financial/FinancialHealthSummary";
import { FinancialMetric } from "@/components/ui/Metric/FinancialMetric";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { RecentActivitySection } from "@/features/home/sections/RecentActivitySection";
import { financialSummary } from "@/data/financial";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/cn";
import { colors, shadows } from "@/config/tokens";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Period = (typeof periodOptions)[number];

interface ChartDataPoint {
  date: string;
  dateShort: string;
  thisPeriod: number;
  lastPeriod: number;
}

const periodOptions = ["Monthly", "Weekly", "Yearly"] as const;

const thisPeriodBalance = financialSummary.totalBalance;
const lastPeriodBalance = thisPeriodBalance * 0.923;
const percentChange = ((thisPeriodBalance - lastPeriodBalance) / lastPeriodBalance) * 100;

const monthlyData: ChartDataPoint[] = financialSummary.balanceHistory.map((d, i) => ({
  date: new Date(d.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
  dateShort: new Date(d.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
  thisPeriod: d.balance,
  lastPeriod: [152800, 156500, 160100, 163800, 167500, 170610.65][i] ?? d.balance * 0.95,
}));

const weeklyData: ChartDataPoint[] = [
  { date: "Week 1", dateShort: "Week 1, Aug 2026", thisPeriod: 178200, lastPeriod: 173100 },
  { date: "Week 2", dateShort: "Week 2, Aug 2026", thisPeriod: 180500, lastPeriod: 175200 },
  { date: "Week 3", dateShort: "Week 3, Aug 2026", thisPeriod: 182100, lastPeriod: 177800 },
  { date: "Week 4", dateShort: "Week 4, Aug 2026", thisPeriod: 183400, lastPeriod: 179100 },
  { date: "Week 5", dateShort: "Week 5, Aug 2026", thisPeriod: 184110, lastPeriod: 180500 },
  { date: "Week 6", dateShort: "Week 6, Aug 2026", thisPeriod: 185000, lastPeriod: 181200 },
  { date: "Week 7", dateShort: "Week 7, Aug 2026", thisPeriod: 186300, lastPeriod: 182800 },
  { date: "Week 8", dateShort: "Week 8, Aug 2026", thisPeriod: 187100, lastPeriod: 184000 },
];

const yearlyData: ChartDataPoint[] = [
  { date: "2021", dateShort: "2021", thisPeriod: 98000, lastPeriod: 92000 },
  { date: "2022", dateShort: "2022", thisPeriod: 118500, lastPeriod: 105000 },
  { date: "2023", dateShort: "2023", thisPeriod: 142000, lastPeriod: 126000 },
  { date: "2024", dateShort: "2024", thisPeriod: 163500, lastPeriod: 148000 },
  { date: "2025", dateShort: "2025", thisPeriod: 176800, lastPeriod: 162000 },
  { date: "2026", dateShort: "2026", thisPeriod: 184110, lastPeriod: 170000 },
];

const periodDataMap: Record<Period, ChartDataPoint[]> = {
  Monthly: monthlyData,
  Weekly: weeklyData,
  Yearly: yearlyData,
};

const spendingData = financialSummary.spendingByCategory.map((c) => ({
  category: c.category,
  amount: c.amount,
  percentage: c.percentage,
  color: c.color,
}));

const incomeVsExpenseData = financialSummary.incomeVsExpense.map((d) => ({
  month: d.month,
  income: d.income,
  expense: d.expense,
}));

/* Semantic surfaces per KPI — calm 70/20/10 distribution (card.md):
   neutral anchors + blue investments tint + green savings tint. */
const kpiSurfaces: Record<string, Surface> = {
  "Net Worth": "default",
  "Investments": "blue",
  "Savings Rate": "green",
  "Monthly Income": "blue",
  "Monthly Expenses": "slate",
  "Cash Flow": "slate",
};

export function MoneyPage() {
  const monthlyCashFlow = financialSummary.monthlyIncome - financialSummary.monthlyExpenses;
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Monthly");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const activeData = periodDataMap[selectedPeriod];

  const kpiMetrics = [
    {
      label: "Net Worth",
      value: formatCurrency(financialSummary.totalBalance, { compact: true }),
      trend: { state: "positive" as const, value: "6.2%", period: "this month" },
    },
    {
      label: "Investments",
      value: formatCurrency(1120000, { compact: true }),
      trend: { state: "positive" as const, value: "8.4%", period: "this month" },
    },
    {
      label: "Savings Rate",
      value: `${financialSummary.savingsRate.toFixed(1)}`,
      unit: "%",
      trend: { state: "positive" as const, value: "3 pts", period: "this month" },
    },
    {
      label: "Monthly Income",
      value: formatCurrency(financialSummary.monthlyIncome, { compact: true }),
      trend: { state: "neutral" as const, value: "0%", period: "vs last month" },
    },
    {
      label: "Monthly Expenses",
      value: formatCurrency(financialSummary.monthlyExpenses, { compact: true }),
      trend: { state: "negative" as const, value: "4.1%", period: "vs last month" },
    },
    {
      label: "Cash Flow",
      value: formatCurrency(monthlyCashFlow, { compact: true }),
      trend: {
        state: (monthlyCashFlow >= 0 ? "positive" : "negative") as "positive" | "negative",
        value: "12.3%",
        period: "vs last month",
      },
    },
  ];

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      {/* Section 1: Financial Health Summary (primary) */}
      <section aria-labelledby="money-page-title">
        <div className="flex items-center justify-between gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
          <div className="flex flex-col gap-[var(--spacing-2xs)]">
            <h1
              id="money-page-title"
              className={cn(
                "text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)]",
                "leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)]",
                "text-[var(--color-text-primary)]"
              )}
            >
              Money at a glance
            </h1>
            <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
              Your current financial position at a deeper level
            </p>
          </div>
          <a
            href="/"
            className={cn(
              "shrink-0 inline-flex items-center gap-[var(--spacing-2xs)]",
              "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
              "text-[var(--color-primary)] hover:underline underline-offset-2",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
            )}
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden={true} />
            Back to Home
          </a>
        </div>

        <div className="flex flex-col gap-[var(--spacing-md)]">
          {/* Financial Health — LEVEL 1 navy anchor (renders its own card) */}
          <FinancialHealthSummary
            score={78}
            status="healthy"
            trend={{
              state: "positive",
              value: "4 points",
              period: "this month",
            }}
            explanation="Your finances are in great shape. Keep up the consistent savings."
            onSeeWhy={() => {
              window.location.href = "/insights";
            }}
            lastUpdated="2026-08-22T10:30:00Z"
            variant="financial"
          />
        </div>
      </section>

      {/* Section 2: KPI Grid */}
      <section aria-labelledby="money-kpis-title">
        <SectionHeader
          title="Your financial KPIs"
          description="Key metrics tracking your financial journey"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[var(--spacing-md)]">
          {kpiMetrics.map((metric) => (
            <Card key={metric.label} surface={kpiSurfaces[metric.label] ?? "default"} frame="blue" className="card-hover">
              <CardContent className="p-[var(--spacing-2xs)] px-[var(--spacing-sm)]">
                <FinancialMetric
                  label={metric.label}
                  value={metric.value}
                  unit={metric.unit}
                  trend={metric.trend}
                  variant="compact"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 3: Balance History Trend */}
      <section aria-labelledby="balance-history-title">
        <Card className="card-hover" frame="green">
          <CardContent className="p-[var(--spacing-lg)]">
            {/* Header */}
            <div className="flex items-center justify-between gap-[var(--spacing-md)] mb-[var(--spacing-lg)]">
              <h2
                id="balance-history-title"
                className={cn(
                  "text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)]",
                  "leading-[var(--typography-h3-line)] tracking-[var(--typography-h3-tracking)]",
                  "text-[var(--color-text-primary)]"
                )}
              >
                Balance history
              </h2>
              <div
                ref={dropdownRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={cn(
                    "inline-flex items-center gap-[var(--spacing-2xs)]",
                    "px-[var(--spacing-sm)] py-[var(--spacing-2xs)]",
                    "border border-[var(--color-border)] rounded-[var(--radius-md)]",
                    "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
                    "text-[var(--color-text-secondary)]",
                    "hover:bg-[var(--color-surface-2)] transition-colors duration-[var(--duration-fast)]"
                  )}
                >
                  {selectedPeriod}
                  <ChevronDown
                    size={14}
                    strokeWidth={2}
                    aria-hidden={true}
                    className={cn(
                      "transition-transform duration-[var(--duration-fast)]",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className={cn(
                      "absolute right-0 top-full mt-[var(--spacing-2xs)]",
                      "z-50 min-w-[140px]",
                      "border border-[var(--color-border)] rounded-[var(--radius-md)]",
                      "bg-[var(--color-surface-1)]",
                      "shadow-[var(--shadow-overlay)]",
                      "py-[var(--spacing-2xs)]"
                    )}
                    style={{ boxShadow: shadows.overlay }}
                  >
                    {periodOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setSelectedPeriod(option);
                          setDropdownOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between gap-[var(--spacing-sm)]",
                          "px-[var(--spacing-md)] py-[var(--spacing-2xs)]",
                          "text-[length:var(--typography-body-sm-size)]",
                          "hover:bg-[var(--color-surface-2)] transition-colors duration-[var(--duration-fast)]",
                          selectedPeriod === option
                            ? "text-[var(--color-text-primary)] font-medium"
                            : "text-[var(--color-text-secondary)]"
                        )}
                      >
                        {option}
                        {selectedPeriod === option && (
                          <Check size={14} strokeWidth={2.5} className="text-[var(--color-primary)]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Total Balance Summary */}
            <div className="flex items-baseline gap-[var(--spacing-sm)] mb-[var(--spacing-md)]">
              <span
                className="text-[length:var(--typography-financial-hero-size)] font-[var(--typography-financial-hero-weight)] leading-[var(--typography-financial-hero-line)] tracking-[var(--typography-financial-hero-tracking)] text-[var(--color-text-primary)] [font-variant-numeric:tabular-nums]"
              >
                {formatCurrency(thisPeriodBalance, { compact: false })}
              </span>
              <span className="inline-flex items-center gap-[var(--spacing-2xs)] text-[var(--color-success)]">
                <TrendingUp size={16} strokeWidth={2.5} aria-hidden={true} />
                <span className="text-[length:var(--typography-body-sm-size)] font-medium">
                  ↑{percentChange.toFixed(1)}%
                </span>
              </span>
              <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                from last period
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
              <div className="flex items-center gap-[var(--spacing-2xs)]">
                <span
                  className="h-2.5 w-2.5 rounded-[var(--radius-full)]"
                  style={{ backgroundColor: colors.primary }}
                  aria-hidden={true}
                />
                <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                  This period
                </span>
              </div>
              <div className="flex items-center gap-[var(--spacing-2xs)]">
                <span
                  className="h-2.5 w-2.5 rounded-[var(--radius-full)]"
                  style={{ backgroundColor: colors.info }}
                  aria-hidden={true}
                />
                <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                  Last period
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeData}>
                  <CartesianGrid
                    stroke={colors.border}
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-text-tertiary)",
                      fontSize: 12,
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-text-tertiary)",
                      fontSize: 12,
                    }}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div
                            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] p-[var(--spacing-md)] shadow-[var(--shadow-overlay)]"
                            style={{
                              boxShadow: shadows.overlay,
                            }}
                          >
                            <p className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)] mb-[var(--spacing-sm)]">
                              Total Revenue
                            </p>
                            {payload.map((entry, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between gap-[var(--spacing-md)]"
                              >
                                <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                                  {entry.name === "thisPeriod" ? data.dateShort : ""}
                                </span>
                                <span
                                  className="text-[length:var(--typography-body-sm-size)] font-medium"
                                  style={{ color: entry.color }}
                                >
                                  {formatCurrency(entry.value as number, { compact: true })}
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="thisPeriod"
                    name="This period"
                    stroke={colors.primary}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: colors.primary }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lastPeriod"
                    name="Last period"
                    stroke={colors.info}
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    dot={false}
                    activeDot={{ r: 4, fill: colors.info }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section 4: Spending by Category + Income vs Expense */}
      <section>
        <SectionHeader
          title="Spending breakdown"
          description="Where your money goes each month"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--spacing-md)]">
          {/* Spending by Category */}
          <Card className="card-hover" frame="green">
            <CardContent className="p-[var(--spacing-lg)]">
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <p className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-secondary)]">
                  Monthly spending
                </p>
                {spendingData.map((item) => (
                  <div
                    key={item.category}
                    className="flex flex-col gap-[var(--spacing-2xs)]"
                  >
                    <div className="flex items-center gap-[var(--spacing-sm)]">
                      <div
                        className="h-3 w-3 shrink-0 rounded-[var(--radius-xs)]"
                        style={{ backgroundColor: item.color }}
                        aria-hidden="true"
                      />
                      <span className="flex-1 text-[length:var(--typography-body-sm-size)] text-[var(--color-text-primary)]">
                        {item.category}
                      </span>
                      <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)] tabular-nums">
                        {formatCurrency(item.amount)}
                      </span>
                      <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)] w-12 text-right tabular-nums">
                        {item.percentage}%
                      </span>
                    </div>
                    {/* Share-of-spending bar — reinforces the printed percentage */}
                    <div
                      className="h-1 w-full overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-surface-2)]"
                      role="presentation"
                    >
                      <div
                        className="h-full rounded-[var(--radius-full)]"
                        style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Income vs Expense */}
          <Card className="card-hover" frame="green">
            <CardContent className="p-[var(--spacing-lg)]">
              <div className="flex flex-col gap-[var(--spacing-sm)]">
                <p className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-secondary)]">
                  Income vs Expenses
                </p>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={incomeVsExpenseData}>
                      <CartesianGrid
                        stroke={colors.border}
                        strokeDasharray="4 4"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "var(--color-text-tertiary)",
                          fontSize: 12,
                        }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "var(--color-text-tertiary)",
                          fontSize: 12,
                        }}
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-surface-1)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "var(--radius-md)",
                        }}
                        labelStyle={{
                          color: "var(--color-text-primary)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="var(--color-success)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="var(--color-error)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-end gap-[var(--spacing-md)]">
                  <div className="flex items-center gap-[var(--spacing-2xs)]">
                    <div
                      className="h-2 w-2 rounded-[var(--radius-full)]"
                      style={{ backgroundColor: "var(--color-success)" }}
                    />
                    <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
                      Income
                    </span>
                  </div>
                  <div className="flex items-center gap-[var(--spacing-2xs)]">
                    <div
                      className="h-2 w-2 rounded-[var(--radius-full)]"
                      style={{ backgroundColor: "var(--color-error)" }}
                    />
                    <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
                      Expenses
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Section 5: Recent Activity — compact movement list */}
      <RecentActivitySection
        items={[
          { merchant: "Swiggy", category: "Dining", amount: 420, date: "Today", direction: "out" },
          { merchant: "Salary credit", category: "Income", amount: financialSummary.monthlyIncome, date: "Mar 1", direction: "in" },
          { merchant: "Netflix", category: "Subscriptions", amount: 649, date: "Feb 28", direction: "out" },
          { merchant: "Amazon", category: "Shopping", amount: 1240, date: "Feb 27", direction: "out" },
          { merchant: "Zomato", category: "Dining", amount: 380, date: "Feb 25", direction: "out" },
        ]}
      />
    </div>
  );
}
