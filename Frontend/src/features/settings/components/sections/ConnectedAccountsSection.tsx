/**
 * VEYRA — Connected Accounts Settings Section
 * Source: design_system/Components/Empty.md (no connections state)
 *         design_system/Components/Badge.md (status badges)
 *         design_system/UX Writing/terminology.md (clear labels)
 */

import { useState } from "react";
import { useNavigate } from "react-router";
import { Landmark, Wallet, LineChart, CreditCard, Unplug, RefreshCw } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button/Button";
import { Badge } from "@/components/ui/Badge/Badge";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { SettingGroup } from "../SettingsPrimitives";

interface ConnectedAccount {
  id: string;
  name: string;
  institution: string;
  type: "bank" | "broker" | "wallet" | "card";
  lastSync: string;
  status: "connected" | "error";
}

const INITIAL_ACCOUNTS: ConnectedAccount[] = [
  { id: "acc-1", name: "Main Checking", institution: "Chase", type: "bank", lastSync: "2 min ago", status: "connected" },
  { id: "acc-2", name: "High-Yield Savings", institution: "Marcus", type: "bank", lastSync: "2 min ago", status: "connected" },
  { id: "acc-3", name: "Investment Portfolio", institution: "Fidelity", type: "broker", lastSync: "1 hr ago", status: "connected" },
  { id: "acc-4", name: "Credit Card", institution: "Amex", type: "card", lastSync: "2 min ago", status: "error" },
];

const typeIcon = {
  bank: Landmark,
  broker: LineChart,
  wallet: Wallet,
  card: CreditCard,
} as const;

export function ConnectedAccountsSection() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(INITIAL_ACCOUNTS);

  function disconnect(id: string) {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }

  if (accounts.length === 0) {
    return (
      <SettingGroup title="Linked accounts">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-1)]">
          <EmptyState
            icon={Unplug}
            title="No connected accounts"
            description="Link a bank or institution to let Veyra track your finances automatically."
            action={{ label: "Connect an account", onClick: () => navigate("/connect") }}
          />
        </div>
      </SettingGroup>
    );
  }

  return (
    <SettingGroup title="Linked accounts" description="Manage the institutions Veyra can read.">
      <div className="flex flex-col gap-[var(--spacing-sm)]">
        {accounts.map((account) => {
          const Icon = typeIcon[account.type];
          const error = account.status === "error";
          return (
            <div
              key={account.id}
              className="flex items-center gap-[var(--spacing-sm)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-1)] p-[var(--spacing-md)]"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)]",
                  error ? "bg-[var(--color-error-soft)] text-[var(--color-error)]" : "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                )}
              >
                <Icon size={18} strokeWidth={2} />
              </span>

              <div className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-2xs)]">
                <div className="flex flex-wrap items-center gap-[var(--spacing-2xs)]">
                  <span className="text-[length:var(--typography-body-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
                    {account.name}
                  </span>
                  {error ? (
                    <Badge variant="error">Sync issue</Badge>
                  ) : (
                    <Badge variant="success">Connected</Badge>
                  )}
                </div>
                <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                  {account.institution}
                  <span className="mx-[var(--spacing-2xs)] text-[var(--color-text-tertiary)]">·</span>
                  <span className="inline-flex items-center gap-[var(--spacing-2xs)]">
                    <RefreshCw size={12} strokeWidth={2} aria-hidden="true" />
                    {error ? "Last sync failed" : `Synced ${account.lastSync}`}
                  </span>
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="shrink-0 text-[var(--color-error)] hover:bg-[var(--color-error-soft)]"
                onClick={() => disconnect(account.id)}
                aria-label={`Disconnect ${account.name}`}
              >
                Disconnect
              </Button>
            </div>
          );
        })}
      </div>
    </SettingGroup>
  );
}
