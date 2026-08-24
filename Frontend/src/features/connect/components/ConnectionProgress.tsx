/**
 * VEYRA — ConnectionProgress
 * Source: design_system/States/Reconnecting.md (07.18)
 *         design_system/States/Permission.md (07.17)
 *         design_system/States/Processing.md (07.9)
 *
 * One component whose content changes by state. It must clearly
 * distinguish: connecting / authenticating / syncing / success /
 * error / needs-attention / permission-denied / reconnecting.
 * Permission problems are a recoverable state (Reconnect), not a
 * generic error.
 */

import { cn } from "@/lib/cn";
import {
  Plug,
  KeyRound,
  Database,
  RefreshCw,
  Loader2,
  Check,
  AlertCircle,
  Lock,
  WifiOff,
  AlertTriangle,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { ConnectionStatus } from "../types";

export type ConnectionErrorType = "permission-denied" | "network-error" | "auth-failed";

interface ConnectionProgressProps {
  status: ConnectionStatus;
  error?: string;
  errorType?: ConnectionErrorType;
  onReconnect?: () => void;
  onComplete?: () => void;
  className?: string;
}

interface StatusConfig {
  icon: LucideIcon;
  spinning?: boolean;
  title: string;
  description: string;
  tone: "neutral" | "success" | "warning" | "error";
}

export function ConnectionProgress({
  status,
  error,
  errorType,
  onReconnect,
  onComplete,
  className
}: ConnectionProgressProps) {
  const getStatusConfig = (): StatusConfig => {
    switch (status) {
      case "connecting":
        return {
          icon: Plug,
          spinning: true,
          title: "Connecting account...",
          description: "Please wait while we establish the connection.",
          tone: "neutral"
        };
      case "authenticating":
        return {
          icon: KeyRound,
          spinning: true,
          title: "Authenticating...",
          description: "Verifying your credentials with the financial institution.",
          tone: "neutral"
        };
      case "fetching":
        return {
          icon: Database,
          spinning: true,
          title: "Fetching data...",
          description: "Retrieving your account information.",
          tone: "neutral"
        };
      case "syncing":
        return {
          icon: RefreshCw,
          spinning: true,
          title: "Syncing transactions...",
          description: "Processing your financial data.",
          tone: "neutral"
        };
      case "reconnecting":
        return {
          icon: Loader2,
          spinning: true,
          title: "Reconnecting...",
          description: "Re-establishing the connection to your institution.",
          tone: "neutral"
        };
      case "success":
        return {
          icon: Check,
          title: "Account connected",
          description: "Your financial data has been successfully synced.",
          tone: "success"
        };
      case "needs-attention":
        return {
          icon: AlertTriangle,
          title: "Additional verification required",
          description: "Your institution requires extra authentication steps.",
          tone: "warning"
        };
      case "error":
        if (errorType === "permission-denied") {
          return {
            icon: Lock,
            title: "Permission needed",
            description:
              error ||
              "Your bank declined the connection request. Re-authorize to continue.",
            tone: "warning"
          };
        }
        if (errorType === "network-error") {
          return {
            icon: WifiOff,
            title: "Network error",
            description:
              "We couldn't reach your bank. Check your connection and try again.",
            tone: "warning"
          };
        }
        return {
          icon: AlertCircle,
          title: error || "Connection failed",
          description: "We couldn't connect your account.",
          tone: "error"
        };
      case "idle":
      default:
        return {
          icon: HelpCircle,
          title: "Ready to connect",
          description: "Please follow the prompts to connect your account.",
          tone: "neutral"
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const toneClasses: Record<StatusConfig["tone"], string> = {
    neutral: "text-[var(--color-text-tertiary)]",
    success: "text-[var(--color-success)]",
    warning: "text-[var(--color-warning)]",
    error: "text-[var(--color-error)]",
  };

  const isError = status === "error" || status === "needs-attention";
  const isSuccess = status === "success";

  // Permission-denied is a recoverable state: primary action is Reconnect.
  const reconnectLabel =
    status === "error" && errorType === "permission-denied" ? "Reconnect" : "Try again";

  return (
    <div className={cn("flex flex-col items-center gap-[var(--spacing-md)] py-[var(--spacing-xl)]", className)}>
      <div className="flex flex-col items-center gap-[var(--spacing-sm)]">
        <div className={cn("flex items-center justify-center h-12 w-12", toneClasses[config.tone])}>
          <Icon
            size={28}
            strokeWidth={2}
            aria-hidden={true}
            className={config.spinning ? "animate-spin" : undefined}
          />
        </div>
        <h2 className="text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)] text-center text-[var(--color-text-primary)]">
          {config.title}
        </h2>
        <p className="text-[length:var(--typography-body-size)] text-center text-[var(--color-text-secondary)] max-w-[480px]">
          {config.description}
        </p>
      </div>

      {isSuccess && onComplete && (
        <button
          type="button"
          onClick={onComplete}
          className="px-[var(--spacing-lg)] py-[var(--spacing-sm)] rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--spacing-sm)] transition-colors"
        >
          Continue
        </button>
      )}

      {isError && onReconnect && (
        <button
          type="button"
          onClick={onReconnect}
          aria-label={reconnectLabel}
          className="px-[var(--spacing-lg)] py-[var(--spacing-sm)] rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--spacing-sm)] transition-colors"
        >
          {reconnectLabel}
        </button>
      )}
    </div>
  );
}
