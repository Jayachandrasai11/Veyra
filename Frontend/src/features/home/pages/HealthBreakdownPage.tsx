/**
 * Fermor/Veyra — Health Breakdown Page
 * Source: design_system/Architecture/Section3.md (Financial Health)
 *
 * Purpose-built destination for "View health breakdown":
 * score ring → influencers (what moved the score) → guidance cards.
 *
 * Rules:
 * - Numbers stay the strongest elements; artwork never competes
 * - Deltas pair sign + arrow icon, never color-alone
 */

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  HeartPulse,
  PiggyBank,
  CreditCard,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Progress } from "@/components/ui/Progress/Progress";

interface Factor {
  label: string;
  delta: number;
  icon: React.ComponentType<{ size: number; strokeWidth: number; className?: string }>;
  tint: string;
  color: string;
  detail: string;
}

const FACTORS: Factor[] = [
  {
    label: "Savings rate",
    delta: 8,
    icon: PiggyBank,
    tint: "var(--color-success-soft)",
    color: "var(--color-success)",
    detail: "You saved 42.6% of income this month — well above the healthy band.",
  },
  {
    label: "Debt utilization",
    delta: -3,
    icon: CreditCard,
    tint: "var(--color-error-soft)",
    color: "var(--color-error)",
    detail: "Card utilization crossed 40%. Paying down ₹4,000 restores points fast.",
  },
  {
    label: "Emergency fund",
    delta: 5,
    icon: ShieldCheck,
    tint: "var(--color-primary-soft)",
    color: "var(--color-primary)",
    detail: "Your buffer now covers 2.7 months of expenses — climbing steadily.",
  },
];

const SCORE = 78;

export function HealthBreakdownPage() {
  const [activeFactor, setActiveFactor] = useState<string | null>(null);

  const ring = 2 * Math.PI * 52;
  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      {/* Back */}
      <Link
        to="/money"
        className={cn(
          "inline-flex items-center gap-[var(--spacing-2xs)] self-start",
          "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
          "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
          "focus-visible:outline-offset-[var(--focus-ring-offset)]"
        )}
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to Money
      </Link>

      {/* Page header */}
      <header className="flex items-start gap-[var(--spacing-md)]">
        <span
          className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]"
          aria-hidden="true"
        >
          <HeartPulse size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
        </span>
        <div className="flex flex-col gap-[var(--spacing-2xs)] min-w-0">
          <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]">
            Financial health
          </p>
          <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)]">
            Health breakdown
          </h1>
          <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[60ch]">
            Why your score is where it is — factor by factor.
          </p>
        </div>
      </header>

      {/* Score ring + status */}
      <Card surface="default" decoration="trend" className="w-full">
        <CardContent className="p-[var(--spacing-xl)] flex flex-col sm:flex-row items-center gap-[var(--spacing-xl)]">
          {/* Ring gauge */}
          <div className="relative h-[132px] w-[132px] shrink-0" role="img" aria-label={`Financial health score ${SCORE} out of 100`}>
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-surface-slate)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(ring * SCORE) / 100} ${ring}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="font-bold tabular-nums tracking-tight text-[var(--color-text-primary)]"
                style={{ fontSize: "var(--typography-financial-size)", lineHeight: 1 }}
              >
                {SCORE}
              </span>
              <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">/ 100</span>
            </div>
          </div>

          {/* Status narrative */}
          <div className="flex flex-col gap-[var(--spacing-sm)] min-w-0">
            <div className="flex items-center gap-[var(--spacing-sm)]">
              <Badge>Healthy</Badge>
              <span
                className="inline-flex items-center gap-1 rounded-full px-[var(--spacing-sm)] py-[var(--spacing-2xs)] text-[length:var(--typography-caption-size)] font-semibold"
                style={{
                  backgroundColor: "var(--color-success-soft)",
                  color: "var(--color-success)",
                }}
                aria-label="Up 4 points this month"
              >
                <TrendingUp size={12} strokeWidth={2.5} aria-hidden={true} />
                ↑ 4 points · this month
              </span>
            </div>
            <p className="text-[length:var(--typography-body-size)] leading-relaxed text-[var(--color-text-secondary)] max-w-[52ch]">
              Strong savings momentum lifted your score, partly offset by rising card usage. Two of three factors are moving the right way — keep the streak going.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Influencers */}
      <section aria-labelledby="influencers-title" className="flex flex-col gap-[var(--spacing-md)]">
        <h2 id="influencers-title" className="text-[length:var(--typography-h2-size)] font-bold tracking-tight text-[var(--color-text-primary)]">
          What's influencing your score
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-md)]">
          {FACTORS.map((f) => {
            const positive = f.delta >= 0;
            const DeltaIcon = positive ? TrendingUp : TrendingDown;
            const open = activeFactor === f.label;
            return (
              <Card
                key={f.label}
                surface="default"
                className={cn("card-hover cursor-pointer", open && "border-[var(--color-primary)]")}
                onClick={() => setActiveFactor(open ? null : f.label)}
              >
                <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-sm)]">
                  <div className="flex items-center justify-between gap-[var(--spacing-sm)]">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: f.tint, color: f.color }}
                      aria-hidden="true"
                    >
                      <f.icon size={18} strokeWidth={2} />
                    </span>
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-[var(--spacing-xs)] py-[var(--spacing-2xs)] text-[length:var(--typography-caption-size)] font-semibold tabular-nums"
                      style={{
                        backgroundColor: positive ? "var(--color-success-soft)" : "var(--color-error-soft)",
                        color: f.color,
                      }}
                    >
                      <DeltaIcon size={11} strokeWidth={2.5} aria-hidden={true} />
                      {positive ? "+" : "−"}{Math.abs(f.delta)}
                    </span>
                  </div>
                  <p className="text-[length:var(--typography-label-size)] font-semibold text-[var(--color-text-primary)]">
                    {f.label}
                  </p>
                  {/* Impact magnitude */}
                  <Progress value={Math.abs(f.delta) * 10} label={`${f.label} impact: ${Math.abs(f.delta)} points`} />
                  {open && (
                    <p className="text-[length:var(--typography-body-sm-size)] leading-relaxed text-[var(--color-text-secondary)] pt-[var(--spacing-2xs)] border-t border-[var(--color-border)]">
                      {f.detail}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Guidance */}
      <section aria-labelledby="guidance-title" className="flex flex-col gap-[var(--spacing-md)]">
        <h2 id="guidance-title" className="text-[length:var(--typography-h2-size)] font-bold tracking-tight text-[var(--color-text-primary)]">
          Keep the momentum
        </h2>
        <Card surface="default">
          <CardContent className="p-[var(--spacing-lg)] flex flex-col sm:flex-row gap-[var(--spacing-md)]">
            <GuideLink to="/goals" label="Top up your emergency fund" hint="+5 more points within reach" />
            <GuideLink to="/insights" label="Trim card spend this month" hint="Recover the −3 from utilization" />
            <GuideLink to="/activity" label="Watch daily outflow" hint="Spot leaks before they add up" />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full bg-[var(--color-success-soft)] px-[var(--spacing-sm)] py-1 text-[length:var(--typography-caption-size)] font-semibold text-[var(--color-success)]"
    >
      {children}
    </span>
  );
}

function GuideLink({ to, label, hint }: { to: string; label: string; hint: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "group flex-1 flex items-center justify-between gap-[var(--spacing-md)]",
        "rounded-[var(--radius-md)] border border-[var(--color-border)] px-[var(--spacing-md)] py-[var(--spacing-sm)]",
        "hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]/50",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]"
      )}
    >
      <span className="min-w-0">
        <span className="block truncate text-[length:var(--typography-label-size)] font-semibold text-[var(--color-text-primary)]">
          {label}
        </span>
        <span className="block truncate text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)]">
          {hint}
        </span>
      </span>
      <ArrowRight
        size={16}
        strokeWidth={2}
        aria-hidden={true}
        className="shrink-0 text-[var(--color-primary)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-fast)] group-hover:translate-x-0.5"
      />
    </Link>
  );
}
