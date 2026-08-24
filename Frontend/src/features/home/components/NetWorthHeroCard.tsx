/**
 * Veyra — NetWorthHeroCard
 * Source: design_system/Layout/Dashboard.md (bento hero)
 *
 * Premium net-worth hero: eyebrow label, full-precision figure,
 * gradient area chart of balanceHistory, semantic trend pill,
 * and a "last N months" caption chip.
 */

import { useId } from "react";
import {
  ArrowRight,
  ArrowDownRight,
  Minus,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";

type TrendState = "positive" | "negative" | "neutral";

export interface NetWorthHistoryPoint {
  date: string;
  balance: number;
}

interface NetWorthHeroCardProps {
  label?: string;
  /** Pre-formatted headline figure */
  value: string;
  history: NetWorthHistoryPoint[];
  /** Where "View breakdown" points */
  href?: string;
  className?: string;
}

const trendConfig: Record<TrendState, {
  icon: React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean }>;
  bg: string;
  color: string;
  word: string;
}> = {
  positive: { icon: TrendingUp, bg: "var(--color-success-soft)", color: "var(--color-success)", word: "up" },
  negative: { icon: ArrowDownRight, bg: "var(--color-error-soft)", color: "var(--color-error)", word: "down" },
  neutral: { icon: Minus, bg: "var(--color-surface-slate)", color: "var(--color-text-secondary)", word: "flat" },
};

function monthShort(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleString("en-US", { month: "short" });
}

function formatBalance(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function NetWorthHeroCard({
  label = "Net Worth",
  value,
  history,
  href = "/money",
  className,
}: NetWorthHeroCardProps) {
  const gradientId = useId();
  const points = history.map((p) => ({ ...p, month: monthShort(p.date) }));
  const monthsSpanned = Math.max(points.length, 1);

  let state: TrendState = "neutral";
  let changePct = 0;
  if (points.length >= 2 && points[0].balance !== 0) {
    changePct =
      ((points[points.length - 1].balance - points[0].balance) /
        Math.abs(points[0].balance)) *
      100;
    state = changePct > 0 ? "positive" : changePct < 0 ? "negative" : "neutral";
  }

  const trend = trendConfig[state];
  const TrendIcon = trend.icon;

  return (
    <Card frame="white" surface="default" className={cn("w-full card-hover", className)}>
      <CardContent className="p-[var(--spacing-xl)] flex flex-col gap-[var(--spacing-md)]">
        {/* Eyebrow + trend pill */}
        <div className="flex items-center justify-between gap-[var(--spacing-md)]">
          <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]">
            {label}
          </p>
          <div
            className="inline-flex items-center gap-[var(--spacing-2xs)] rounded-full px-3 py-1 text-[length:var(--typography-caption-size)] font-semibold"
            style={{ backgroundColor: trend.bg, color: trend.color }}
            role="img"
            aria-label={`${trend.word} ${Math.abs(changePct).toFixed(1)}% over ${monthsSpanned} months`}
          >
            <TrendIcon size={14} strokeWidth={2.5} aria-hidden={true} />
            <span>
              {state === "negative" ? "−" : "+"}
              {Math.abs(changePct).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Headline figure */}
        <p
          style={{
            fontSize: "var(--typography-financial-hero-size)",
            fontWeight: "var(--typography-financial-hero-weight)",
            lineHeight: "var(--typography-financial-hero-line)",
            letterSpacing: "var(--typography-financial-hero-tracking)",
            fontVariantNumeric: "tabular-nums",
            color: "var(--color-text-primary)",
          }}
        >
          {value}
        </p>

        {/* Gradient area chart */}
        <div
          className="h-[168px] w-full"
          role="img"
          aria-label={`Net worth trend across ${monthsSpanned} months`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={24}
                tick={{ fill: "var(--color-text-tertiary)", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-border)", strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const point = payload[0].payload as NetWorthHistoryPoint & { month: string };
                  return (
                    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2 shadow-[var(--shadow-overlay)]">
                      <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">
                        {point.month}
                      </p>
                      <p className="text-[length:var(--typography-label-size)] font-semibold text-[var(--color-text-primary)] tabular-nums">
                        {formatBalance(point.balance)}
                      </p>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 2,
                  stroke: "var(--color-surface-1)",
                  fill: "var(--color-primary)",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Caption chip + breakdown link */}
        <div className="flex items-center justify-between gap-[var(--spacing-md)]">
          <span className="inline-flex items-center rounded-full bg-[var(--color-surface-slate)] px-3 py-1 text-[length:var(--typography-caption-size)] font-medium uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
            Last {monthsSpanned} months
          </span>
          <a
            href={href}
            className={cn(
              "inline-flex items-center gap-[var(--spacing-2xs)]",
              "text-[length:var(--typography-label-size)] font-medium",
              "text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]",
              "hover:underline underline-offset-2",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]"
            )}
          >
            View breakdown
            <ArrowRight size={14} strokeWidth={2} aria-hidden={true} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
