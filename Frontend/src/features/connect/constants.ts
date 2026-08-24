import { Landmark, TrendingUp, CreditCard } from "lucide-react";
import type { AccountTypeInfo, Institution, AccountType } from "./types";

export const accountTypes: AccountTypeInfo[] = [
  {
    id: "bank",
    name: "Bank Account",
    icon: Landmark,
    description: "Checking, savings, and savings accounts"
  },
  {
    id: "investment",
    name: "Investment Account",
    icon: TrendingUp,
    description: "Brokerage, retirement, and other investment accounts"
  },
  {
    id: "credit",
    name: "Credit Account",
    icon: CreditCard,
    description: "Credit cards and loans"
  }
];

export const mockInstitutions: Institution[] = [
  {
    id: "chase",
    name: "Chase Bank",
    logo: "🟥",
    type: "bank"
  },
  {
    id: "wells-fargo",
    name: "Wells Fargo",
    logo: "🟦",
    type: "bank"
  },
  {
    id: "bofa",
    name: "Bank of America",
    logo: "⬜",
    type: "bank"
  },
  {
    id: "schwab",
    name: "Charles Schwab",
    logo: "🟪",
    type: "investment"
  },
  {
    id: "fidelity",
    name: "Fidelity Investments",
    logo: "🟨",
    type: "investment"
  },
  {
    id: "vanguard",
    name: "Vanguard",
    logo: "🟩",
    type: "investment"
  },
  {
    id: "citibank",
    name: "Citi Credit Card",
    logo: "🟦",
    type: "credit"
  },
  {
    id: "amex",
    name: "American Express",
    logo: "🟥",
    type: "credit"
  }
];

export const authText: Record<AccountType, { title: string; description: string; fieldLabel: string; fieldPlaceholder: string }> = {
  bank: {
    title: "Connect your bank account",
    description: "Enter your credentials to securely link your account.",
    fieldLabel: "Bank ID or Username",
    fieldPlaceholder: "Enter your bank username or ID"
  },
  investment: {
    title: "Connect your investment account",
    description: "Enter your credentials to securely link your account.",
    fieldLabel: "Investment Platform ID",
    fieldPlaceholder: "Enter your investment platform username"
  },
  credit: {
    title: "Connect your credit account",
    description: "Enter your credentials to securely link your account.",
    fieldLabel: "Credit Card ID",
    fieldPlaceholder: "Enter your cardholder ID"
  }
};