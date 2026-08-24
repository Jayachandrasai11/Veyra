/**
 * VEYRA — GoalItem
 * Source: design_system/Architecture/Section5.md
 *
 * Pattern: Goal Tracking
 * Structure: Icon + Name + Percentage + ProgressBar + Amount
 *
 * Rules:
 * - Progress height: 8px
 * - Track: secondary surface
 * - Fill: --primary
 * - Percentage must be available as text
 * - Amount format: Current / Target
 * - Icons: Home (House), Emergency (ShieldCheck), Car (Car), Education (GraduationCap), Travel (Plane), Custom (Plus)
 * - Icon size: 20px, 2px stroke
 */

import {
  House,
  ShieldCheck,
  Car,
  GraduationCap,
  Plane,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Progress } from "@/components/ui/Progress/Progress";
import { formatCurrency } from "@/lib/format";

type GoalType = "home" | "emergency" | "car" | "education" | "travel" | "custom";

interface GoalItemProps {
  title: string;
  currentAmount: number;
  targetAmount: number;
  type: GoalType;
  /** Recommended monthly contribution — enables forecast + status row */
  monthlyTopUp?: number;
  className?: string;
}

const goalIconMap: Record<GoalType, React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean; className?: string }>> = {
  home: House,
  emergency: ShieldCheck,
  car: Car,
  education: GraduationCap,
  travel: Plane,
  custom: Plus,
};

export function GoalItem({
  title,
  currentAmount,
  targetAmount,
  type,
  monthlyTopUp,
  className,
}: GoalItemProps) {
  const progress = Math.min(Math.round((currentAmount / targetAmount) * 100), 100);
  const Icon = goalIconMap[type];

  // Status + forecast — meaning, not just numbers
  const remaining = Math.max(targetAmount - currentAmount, 0);
  const completed = remaining === 0;
  const status =
    completed
      ? { label: "Completed", tone: "var(--color-success)" }
      : progress >= 60
        ? { label: "On track", tone: "var(--color-success)" }
        : { label: "Needs attention", tone: "#B7791F" };

  let estimate = "";
  if (monthlyTopUp && !completed && monthlyTopUp > 0) {
    const months = Math.max(Math.ceil(remaining / monthlyTopUp), 1);
    estimate = ` · ~${months} ${months === 1 ? "month" : "months"} to go`;
  }

  return (
    <div className={cn("rounded-[var(--radius-md)] bg-white/80 p-[var(--spacing-sm)] shadow-sm flex flex-col gap-[var(--spacing-xs)]", className)}>
      {/* Top row: Icon + Name + Percentage */}
      <div className="flex items-center justify-between gap-[var(--spacing-sm)]">
        <div className="flex items-center gap-[var(--spacing-sm)] min-w-0">
          <Icon size={20} strokeWidth={2} aria-hidden={true} className="shrink-0 text-[var(--color-primary)]" />
          <span className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)] truncate">
            {title}
          </span>
        </div>
        <span className="shrink-0 text-[length:var(--typography-body-sm-size)] font-[var(--typography-label-weight)] text-[var(--color-text-secondary)] tabular-nums">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <Progress value={progress} label={`${title} progress: ${progress}%`} />

      {/* Amount */}
      <div className="flex items-center gap-[var(--spacing-2xs)]">
        <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-secondary)] tabular-nums">
          {formatCurrency(currentAmount, { compact: true })} / {formatCurrency(targetAmount, { compact: true })}
        </span>
      </div>

      {/* Meaning row — status + forecast + recommended contribution */}
      <div className="flex items-center justify-between gap-[var(--spacing-sm)]">
        <span
          className="inline-flex items-center gap-[var(--spacing-2xs)] text-[length:var(--typography-caption-size)] font-medium"
          style={{ color: status.tone as string }}
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: status.tone as string }}
          />
          {status.label}
          {estimate && <span className="text-[var(--color-text-tertiary)] font-normal">{estimate}</span>}
        </span>
        {monthlyTopUp && !completed ? (
          <span className="shrink-0 text-[length:var(--typography-caption-size)] font-medium text-[var(--color-text-secondary)] tabular-nums">
            +{formatCurrency(monthlyTopUp, { compact: true })}/mo recommended
          </span>
        ) : null}
      </div>
    </div>
  );
}
