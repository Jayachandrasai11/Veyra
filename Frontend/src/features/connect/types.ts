import type { LucideIcon } from "lucide-react";

export type AccountType = "bank" | "investment" | "credit";

export type ConnectionStatus = 
  | "idle" 
  | "connecting" 
  | "authenticating" 
  | "fetching" 
  | "syncing" 
  | "reconnecting"
  | "success" 
  | "error" 
  | "needs-attention" 
  | "disconnected";

export interface AccountTypeInfo {
  id: AccountType;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface Institution {
  id: string;
  name: string;
  logo: string;
  type: AccountType;
}

export interface AuthStep {
  title: string;
  description: string;
  fieldLabel: string;
  fieldPlaceholder: string;
}

export interface SimulatedConnection {
  institution: Institution;
  accountType: AccountType;
  username: string;
  password: string;
}

export interface ConnectionResult {
  id: string;
  institutionName: string;
  accountType: AccountType;
  status: "success" | "error";
  errorType?: "permission-denied" | "network-error" | "auth-failed";
  errorMessage?: string;
  syncedAt?: string;
}