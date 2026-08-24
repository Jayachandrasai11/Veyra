/**
 * Veyra — FinancialOverview (Money At A Glance)
 * Source: design_system/Patterns/Money.md
 *
 * Pattern: Dashboard Summary
 * Structure:
 *   FinancialOverview
 *   ├── Section Header
 *   ├── Financial Health Summary
 *   └── KPI Grid
 *       ├── Net Worth
 *       ├── Investments
 *       └── Savings Rate
 *
 * Rules:
 * - Financial Health must visually dominate KPIs
 * - 3-column grid on desktop, 2 on tablet, 1-2 on mobile
 * - Use FinancialMetric for each KPI
 * - Use FinancialHealthSummary for primary display
 */

import { SectionHeader } from "@/features/home/components/SectionHeader";
import { FinancialHealthSummary } from "./FinancialHealthSummary";
import { FinancialMetric } from "@/components/ui/Metric/FinancialMetric";
import type { FinancialHealth, MetricData } from "./types";

interface FinancialOverviewProps {
  health: FinancialHealth;
  metrics: MetricData[];
  className?: string;
}

export function FinancialOverview({ health, metrics, className }: FinancialOverviewProps) {
  return (
    <section className={className} aria-labelledby="financial-overview-heading">
      <SectionHeader
        title="Money at a glance"
        description="Your current financial position"
      />

      {/* Financial Health Summary */}
      <FinancialHealthSummary
        score={health.score}
        status={health.status}
        trend={health.trend}
        explanation={health.explanation}
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[var(--spacing-md)] mt-[var(--spacing-lg)]">
        {metrics.map((metric) => (
          <FinancialMetric
            key={metric.label}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            trend={metric.trend}
            variant={metric.variant}
          />
        ))}
      </div>
    </section>
  );
}