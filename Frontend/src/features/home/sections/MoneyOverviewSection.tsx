/**
 * VEYRA — MoneyOverviewSection
 * Source: design_system/Architecture/Section3.md + Layout/Dashboard.md (bento)
 *
 * Pattern: Money Overview
 * Structure: SectionHeader + [NetWorthHero | Financial Health] bento pair
 *            + supporting indicator chips + monthly allocation-split card
 *
 * Rules:
 * - Hero (net worth chart) 8 cols, navy health anchor 4 cols on lg
 * - Supporting stats: context under the hero, never competing with it
 * - Health rail explains WHY the score moved (factors with deltas)
 */

import {
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  Minus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { SectionHeader } from "../components/SectionHeader";
import { NetWorthHeroCard, type NetWorthHistoryPoint } from "../components/NetWorthHeroCard";
import { MonthlySplitCard } from "../components/MonthlySplitCard";
import { formatCurrency } from "@/lib/format";

type TrendState = "positive" | "negative" | "neutral";

interface MoneyOverviewData {
  financialHealth: {
    score: number;
    status: string;
    trend: {
      state: TrendState;
      value: string;
      period: string;
    };
    explanation: string;
  };
  netWorth: {
    value: string;
    history: NetWorthHistoryPoint[];
  };
  /** Monthly mechanics for the allocation-split card */
  month: {
    income: number;
    expenses: number;
    savings: number;
    savingsRate: number;
  };
  /** Supporting indicators — context for the net worth figure */
  supporting: {
    cash: string;
    investments: string;
    debt: string;
    cashFlow: string;
    cashFlowPositive: boolean;
  };
  /** Score influencers — why the health score moved */
  factors: {
    label: string;
    delta: number;
  }[];
}

interface MoneyOverviewSectionProps {
  data: MoneyOverviewData;
  className?: string;
}

const trendIconByState = {
  positive: TrendingUp,
  negative: TrendingDown,
  neutral: Minus,
} as const;

const trendChipBg = {
  positive: "var(--color-success-soft)",
  negative: "var(--color-error-soft)",
  neutral: "var(--color-surface-slate)",
} as const;

const trendColor = {
  positive: "var(--color-success)",
  negative: "var(--color-error)",
  neutral: "var(--color-surface-navy-text-muted)",
} as const;

export function MoneyOverviewSection({ data, className }: MoneyOverviewSectionProps) {
  const { financialHealth, netWorth, month, supporting, factors } = data;

  const TrendIcon = trendIconByState[financialHealth.trend.state];

  return (
    <section
      className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)}
      aria-labelledby="money-overview-title"
    >
      <SectionHeader
        title="Money at a glance"
        description="Your current financial position"
      />

      {/* Bento row — hero chart 8 / navy health anchor 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--spacing-md)]">
        <NetWorthHeroCard
          className="lg:col-span-8"
          value={netWorth.value}
          history={netWorth.history}
        />

        {/* Financial Health — LEVEL 1 navy anchor (card.md mapping) */}
        <Card className="lg:col-span-4" surface="navy" decoration="trend">
          <CardContent className="p-[var(--spacing-lg)] h-full flex flex-col gap-[var(--spacing-xs)]">
            <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-surface-navy-text-muted)]">
              Financial Health
            </p>

            <div className="flex items-baseline gap-[var(--spacing-xs)]">
              <span
                style={{
                  fontSize: "var(--app-financial-primary-size)",
                  fontWeight: "var(--app-financial-primary-weight)",
                  lineHeight: "var(--app-financial-primary-line)",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "var(--app-financial-primary-tracking)",
                  color: "var(--color-text-primary)",
                }}
              >
                {financialHealth.score}
              </span>
              <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                / 100
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-[var(--spacing-sm)]">
              <span className="text-[length:var(--typography-label-size)] font-semibold text-[var(--color-text-primary)]">
                {financialHealth.status}
              </span>
              <div
                className="inline-flex items-center gap-[var(--spacing-2xs)] rounded-full px-[var(--spacing-xs)] py-[var(--spacing-2xs)] text-[length:var(--typography-caption-size)] font-medium"
                style={{ backgroundColor: trendChipBg[financialHealth.trend.state], color: trendColor[financialHealth.trend.state] }}
                role="img"
                aria-label={`${financialHealth.trend.state} ${financialHealth.trend.value} ${financialHealth.trend.period}`}
              >
                <TrendIcon size={14} strokeWidth={2.5} aria-hidden={true} />
                <span>
                  {financialHealth.trend.value} {financialHealth.trend.period}
                </span>
              </div>
            </div>

            <p className="text-[length:var(--typography-body-sm-size)] leading-[var(--typography-body-sm-line)] text-[var(--color-text-secondary)]">
              {financialHealth.explanation}
            </p>

            {/* Score influencers — explain WHY the score moved */}
            {factors.length > 0 && (
              <div className="flex flex-col gap-[var(--spacing-2xs)]">
                <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-surface-navy-text-muted)]">
                  What's influencing your score
                </p>
                {factors.map((f) => {
                  const positive = f.delta >= 0;
                  const DeltaIcon = positive ? TrendingUp : TrendingDown;
                  return (
                    <div key={f.label} className="flex items-center justify-between gap-[var(--spacing-sm)]">
                      <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)] truncate">
                        {f.label}
                      </span>
                      <span
                        className="shrink-0 inline-flex items-center gap-1 text-[length:var(--typography-caption-size)] font-semibold tabular-nums"
                        style={{ color: positive ? "var(--color-success)" : "var(--color-error)" }}
                      >
                        <DeltaIcon size={12} strokeWidth={2.5} aria-hidden={true} />
                        {positive ? "+" : "−"}
                        {Math.abs(f.delta)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <a
              href="/health"
              className={cn(
                "mt-auto inline-flex items-center gap-[var(--spacing-2xs)] self-start pt-[var(--spacing-2xs)]",
                "text-[length:var(--typography-label-size)] font-medium",
                "text-[var(--color-surface-navy-text)]",
                "hover:underline underline-offset-2",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]"
              )}
            >
              View health breakdown
              <ArrowRight size={14} strokeWidth={2} aria-hidden={true} />
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Supporting indicators — context under the hero, never competing with it */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[var(--spacing-sm)]">
        {[
          { label: "Cash", value: supporting.cash },
          { label: "Investments", value: supporting.investments },
          { label: "Debt", value: supporting.debt },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-[var(--spacing-md)] py-[var(--spacing-xs)]"
          >
            <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">{s.label}</p>
            <p className="text-[length:var(--typography-label-size)] font-semibold text-[var(--color-text-primary)] tabular-nums">
              {s.value}
            </p>
          </div>
        ))}
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-[var(--spacing-md)] py-[var(--spacing-xs)] flex items-center gap-[var(--spacing-sm)]">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: supporting.cashFlowPositive ? "var(--color-success-soft)" : "var(--color-error-soft)",
              color: supporting.cashFlowPositive ? "var(--color-success)" : "var(--color-error)",
            }}
            aria-hidden="true"
          >
            {supporting.cashFlowPositive ? (
              <ArrowDownLeft size={15} strokeWidth={2} />
            ) : (
              <ArrowUpRight size={15} strokeWidth={2} />
            )}
          </span>
          <div className="min-w-0">
            <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">Monthly cash flow</p>
            <p
              className="text-[length:var(--typography-label-size)] font-semibold tabular-nums truncate"
              style={{ color: supporting.cashFlowPositive ? "var(--color-success)" : "var(--color-error)" }}
            >
              {supporting.cashFlow} / mo
            </p>
          </div>
        </div>
      </div>

      {/* Monthly mechanics — one unified allocation-split card */}
      <MonthlySplitCard month={month} />
    </section>
  );
}

export { formatCurrency };
