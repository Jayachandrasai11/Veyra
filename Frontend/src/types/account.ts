import type { Currency } from "./common";

export type AccountType =
  | "checking"
  | "savings"
  | "investment"
  | "credit"
  | "loan"
  | "mortgage";

export type AccountStatus = "active" | "inactive" | "frozen";

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  balance: number;
  currency: Currency;
  status: AccountStatus;
  lastSynced: string;
  color?: string;
  icon?: string;
}

export interface AccountSummary {
  totalBalance: number;
  totalAccounts: number;
  netWorth: number;
  monthlyChange: number;
  monthlyChangePercent: number;
}
