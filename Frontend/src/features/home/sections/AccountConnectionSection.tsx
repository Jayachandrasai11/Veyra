/**
 * VEYRA — AccountConnectionSection
 * Source: design_system/Architecture/section2.md
 *
 * Pattern: Account Connection CTA
 * Structure: Eyebrow + Title + Description + Account Types + CTA
 *
 * Rules:
 * - Use global Card foundation
 * - Desktop: CTA aligned right
 * - Mobile: CTA full-width
 * - Account types: Bank (Landmark), Investments (TrendingUp), Credit (CreditCard)
 * - Icon size: 18px, 2px stroke
 * - Primary button, medium size
 * - ArrowRight icon
 */

import { Sparkles, Landmark, TrendingUp, CreditCard, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Progress } from "@/components/ui/Progress/Progress";

interface AccountType {
  icon: React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean; className?: string }>;
  label: string;
}

const accountTypes: AccountType[] = [
  { icon: Landmark, label: "Bank" },
  { icon: TrendingUp, label: "Investments" },
  { icon: CreditCard, label: "Credit" },
];

interface AccountConnectionSectionProps {
  connected?: boolean;
  className?: string;
}

export function AccountConnectionSection({
  connected = false,
  className,
}: AccountConnectionSectionProps) {
  if (connected) {
    return (
      <section className={cn("w-full", className)} aria-labelledby="account-connection-connected">
        <Card>
          <CardContent className="p-[var(--spacing-lg)]">
            <div className="flex items-start gap-[var(--spacing-md)]">
              <div className="flex items-center gap-[var(--spacing-sm)]">
                <div className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-success)]/20">
                  <Check size={20} strokeWidth={2} className="text-[var(--color-success)]" />
                </div>
                <div>
                  <h2
                    id="account-connection-connected"
                    className={cn(
                      "text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)]",
                      "leading-[var(--typography-h2-line)]",
                      "text-[var(--color-text-primary)]"
                    )}
                  >
                    Accounts connected
                  </h2>
                  <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
                    Your financial picture is up to date
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className={cn("w-full", className)} aria-labelledby="account-connection-title">
      <Card surface="brand">
        <CardContent className="p-[var(--spacing-lg)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[var(--spacing-lg)]">
            {/* Left: Content */}
            <div className="flex flex-col gap-[var(--spacing-sm)] flex-1 min-w-0">
              {/* Eyebrow */}
              <div className="flex items-center gap-[var(--spacing-2xs)] text-[var(--color-primary)]">
                <Sparkles size={18} strokeWidth={2} aria-hidden={true} />
                <span className="text-app-label uppercase tracking-wide">
                  Get Started
                </span>
              </div>

              {/* Title */}
              <h2
                id="account-connection-title"
                className={cn(
                  "text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)]",
                  "leading-[var(--typography-h2-line)] tracking-[var(--typography-h2-tracking)]",
                  "text-[var(--color-text-primary)]"
                )}
              >
                Complete your financial picture
              </h2>

              {/* Description */}
              <p
                className={cn(
                  "text-[length:var(--typography-body-size)]",
                  "text-[var(--color-text-secondary)]",
                  "max-w-[480px]"
                )}
              >
                Connect your bank accounts, investments, and credit cards to get personalized insights.
              </p>

              {/* Account Types */}
              <div className="flex items-center gap-[var(--spacing-md)] pt-[var(--spacing-xs)]">
                {accountTypes.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-[var(--spacing-2xs)]"
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                      aria-hidden={true}
                      className="text-[var(--color-text-tertiary)]"
                    />
                    <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Connection progress — onboarding motivation, not pressure */}
              <div className="flex items-center gap-[var(--spacing-sm)] pt-[var(--spacing-xs)] w-full max-w-[380px]">
                <div className="flex-1">
                  <Progress value={66} label="Connection progress: 2 of 3 connected" />
                </div>
                <span className="shrink-0 text-[length:var(--typography-caption-size)] font-semibold text-[var(--color-primary-hover)] tabular-nums">
                  2 of 3 connected
                </span>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="shrink-0 md:self-end">
              <a
                href="/connect"
                className={cn(
                  "inline-flex items-center justify-center gap-[var(--icon-gap)]",
                  "h-10 px-[var(--spacing-md)]",
                  "font-medium rounded-[var(--radius-button)]",
                  "text-[length:var(--typography-label-size)] leading-[var(--typography-label-line)]",
                  "bg-[var(--color-primary)] text-white",
                  "hover:bg-[var(--color-primary-hover)]",
                  "active:opacity-90",
                  "transition-[background-color,color,border-color,box-shadow]",
                  "duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
                  "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                  "focus-visible:outline-offset-[var(--focus-ring-offset)]",
                  "select-none cursor-pointer"
                )}
                aria-label="Connect your financial accounts"
              >
                Connect accounts
                <ArrowRight size={16} strokeWidth={2} aria-hidden={true} />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}