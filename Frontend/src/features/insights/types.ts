/**
 * VEYRA — Insights types (canonical)
 * Moved out of the retired home/InsightsSection component.
 */

export type Severity = "positive" | "neutral" | "attention" | "critical";

export interface Insight {
  id: string;
  type: string;
  title: string;
  value?: string;
  description: string;
  severity: Severity;
  action?: {
    label: string;
    href: string;
  };
}

export interface InsightDetailPageProps {
  insight: Insight;
  onBack: () => void;
}
