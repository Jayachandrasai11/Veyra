import type { Currency, Timeframe } from "./common";

export interface Transaction {
  id: string;
  accountId: string;
  description: string;
  amount: number;
  currency: Currency;
  category: string;
  date: string;
  type: "income" | "expense" | "transfer";
  status: "pending" | "completed" | "failed";
}

export interface BalanceHistory {
  date: string;
  balance: number;
}

export interface SpendingByCategory {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface IncomeVsExpense {
  month: string;
  income: number;
  expense: number;
}

export interface FinancialSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  balanceHistory: BalanceHistory[];
  spendingByCategory: SpendingByCategory[];
  incomeVsExpense: IncomeVsExpense[];
}

export interface FinancialOverview {
  netWorth: number;
  netWorthChange: number;
  netWorthChangePercent: number;
  totalAssets: number;
  totalLiabilities: number;
  monthlyCashFlow: number;
  timeframe: Timeframe;
}
