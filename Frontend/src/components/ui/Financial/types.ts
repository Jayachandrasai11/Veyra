/**
 * Financial Data Types
 * Source: design_system/Patterns/Money.md
 */

export type TrendState = "positive" | "negative" | "neutral";

export interface TrendInfo {
  state: TrendState;
  value: string;
  period: string;
}

export interface FinancialHealth {
  score: number;
  status: "healthy" | "at-risk" | "critical";
  trend?: TrendInfo;
  explanation?: string;
}

export interface MetricData {
  label: string;
  value: string;
  unit?: string;
  trend?: {
    state: TrendState;
    value: string;
    period: string;
  };
  variant?: "default" | "compact" | "featured";
}

export interface CurrencyValue {
  amount: number;
  currency: string;
  formatted?: string;
}