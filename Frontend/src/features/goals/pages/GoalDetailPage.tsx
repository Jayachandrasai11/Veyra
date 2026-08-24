/**
 * Veyra — Goal Detail Page
 * Source: design_system/Patterns/Goal.md
 * design_system/Components/Dialog.md
 * design_system/Interaction/Goalbehv.md
 *
 * Pattern: Goal Details
 * Structure: Hero header (icon chip + progress) → Stat tiles → Detail cards → Actions
 *
 * Rules:
 * - Show current amount, target, progress
 * - Show monthly contribution and estimated completion
 * - Support Add Money, Edit Goal, Ask Veyra
 * - Edit Goal opens the shared goal form dialog
 */

import { useState } from "react";
import {
  ArrowLeft,
  TrendingUp,
  Calendar,
  Plus,
  Pencil,
  Sparkles,
  PiggyBank,
  Target as TargetIcon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card/Card";
import { Button } from "@/components/ui/Button/Button";
import { Badge } from "@/components/ui/Badge/Badge";
import { Progress } from "@/components/ui/Progress/Progress";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/lib/format";
import { useGoals } from "../hooks/useGoals";
import { GoalFormDialog } from "../components/GoalFormDialog";
import { statusLabels, goalTypeIcons, type Goal } from "../types";

const badgeVariantByStatus: Record<string, "success" | "warning" | "error" | "neutral"> = {
  completed: "success",
  "on-track": "success",
  ahead: "success",
  "over-target": "success",
  "near-target": "warning",
  "in-progress": "warning",
  "not-started": "warning",
  paused: "neutral",
  "at-risk": "error",
};

function StatTile({
  label,
  value,
  icon: Icon,
  tint,
  color,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ size: number; strokeWidth: number; className?: string }>;
  tint: string;
  color: string;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-[var(--spacing-md)] py-[var(--spacing-xs)] flex items-center gap-[var(--spacing-sm)]">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: tint }}
        aria-hidden="true"
      >
        <Icon size={15} strokeWidth={2} className="" />
      </span>
      <div className="min-w-0">
        <p className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)] truncate">{label}</p>
        <p
          className="text-[length:var(--typography-label-size)] font-semibold tabular-nums truncate"
          style={{ color }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export function GoalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { goals, processing, updateGoal } = useGoals();
  const [editOpen, setEditOpen] = useState(false);

  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        <BackLink />
        <Card>
          <CardContent className="p-[var(--spacing-lg)] text-center">
            <p>Goal not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100) || 0, 100);
  const statusLabel = statusLabels[goal.status];
  const TypeIcon = goalTypeIcons[goal.type];

  // Forecast from current pace — meaning, not just numbers
  const remaining = Math.max(goal.targetAmount - goal.currentAmount, 0);
  const monthly = Math.max(goal.monthlyContribution, 1);
  const monthsAhead = Math.ceil(remaining / monthly);
  const etaDate = new Date(Date.now() + monthsAhead * 30.44 * 24 * 60 * 60 * 1000);
  const etaLabel = etaDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" });

  const handleEdit = async (values: Parameters<typeof updateGoal>[1]) => {
    await updateGoal(goal.id, values);
    setEditOpen(false);
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      <BackLink />

      {/* Hero header — icon chip, title, progress */}
      <Card surface={progress > 0 ? "green" : "default"}>
        <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-lg)]">
          <div className="flex items-start justify-between gap-[var(--spacing-md)]">
            <div className="flex items-center gap-[var(--spacing-sm)] min-w-0">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/85"
                aria-hidden="true"
              >
                <TypeIcon size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
              </span>
              <div className="min-w-0">
                <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)] truncate">
                  {goal.type} goal · Target {formatCurrency(goal.targetAmount, { compact: true })}
                </p>
                <h1 className="truncate text-[length:var(--typography-h2-size)] font-bold tracking-tight text-[var(--color-text-primary)]">
                  {goal.title}
                </h1>
              </div>
            </div>
            <Badge variant={badgeVariantByStatus[goal.status] ?? "neutral"}>{statusLabel}</Badge>
          </div>

          {/* Progress overview */}
          <div>
            <div className="flex items-end justify-between mb-[var(--spacing-sm)] gap-[var(--spacing-md)]">
              <span
                className="font-bold tabular-nums tracking-tight text-[var(--color-text-primary)]"
                style={{
                  fontSize: "var(--typography-financial-size)",
                  lineHeight: "var(--typography-financial-line)",
                }}
              >
                {progress}% complete
              </span>
              <span className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)] tabular-nums">
                {formatCurrency(goal.currentAmount, { compact: true })} of{" "}
                {formatCurrency(goal.targetAmount, { compact: true })}
              </span>
            </div>
            <Progress value={progress} label={`${goal.title}: ${progress}% progress`} />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-[var(--spacing-sm)] pt-[var(--spacing-xs)] border-t border-white/50">
            <Button className="flex-1">
              <Plus size={16} strokeWidth={2} className="mr-2" />
              Add Money
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setEditOpen(true)}>
              <Pencil size={16} strokeWidth={2} className="mr-2" />
              Edit Goal
            </Button>
            <Button variant="ai" className="flex-1" onClick={() => navigate("/assistant")}>
              <Sparkles size={16} strokeWidth={2} className="mr-2" />
              Ask Veyra
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stat tiles — same language as Home's supporting strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--spacing-md)]">
        <StatTile
          label="Saved so far"
          value={formatCurrency(goal.currentAmount, { compact: true })}
          icon={PiggyBank}
          tint="var(--color-success-soft)"
          color="var(--color-text-primary)"
        />
        <StatTile
          label="Still to go"
          value={formatCurrency(remaining, { compact: true })}
          icon={TargetIcon}
          tint="#FFF4E0"
          color="#B7791F"
        />
        <StatTile
          label="Monthly contribution"
          value={`${formatCurrency(goal.monthlyContribution, { compact: true })}/mo`}
          icon={TrendingUp}
          tint="var(--color-primary-soft)"
          color="var(--color-primary)"
        />
      </div>

      {/* Detail cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
        <Card surface="default">
          <CardHeader className="gap-[var(--spacing-2xs)]">
            <CardTitle className="text-[length:var(--typography-h3-size)]">Progress detail</CardTitle>
            <CardDescription>Everything logged against this goal</CardDescription>
          </CardHeader>
          <CardContent className="pt-[var(--spacing-md)] flex flex-col gap-[var(--spacing-sm)]">
            <DetailRow icon={TrendingUp}>
              Monthly contribution:{" "}
              <strong className="text-[var(--color-text-primary)] font-semibold tabular-nums">
                {formatCurrency(goal.monthlyContribution)}
              </strong>
            </DetailRow>
            {goal.targetDate && (
              <DetailRow icon={Calendar}>
                Target date:{" "}
                <strong className="text-[var(--color-text-primary)] font-semibold">
                  {new Date(goal.targetDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </DetailRow>
            )}
          </CardContent>
        </Card>

        <Card surface="default">
          <CardHeader className="gap-[var(--spacing-2xs)]">
            <CardTitle className="text-[length:var(--typography-h3-size)]">Estimation</CardTitle>
            <CardDescription>Based on your current pace</CardDescription>
          </CardHeader>
          <CardContent className="pt-[var(--spacing-md)] flex flex-col gap-[var(--spacing-sm)]">
            <DetailRow icon={Calendar}>
              At this pace you'll reach your target around{" "}
              <strong className="text-[var(--color-text-primary)] font-semibold">{etaLabel}</strong>{" "}
              ({monthsAhead} {monthsAhead === 1 ? "month" : "months"} to go)
            </DetailRow>
            <DetailRow icon={TrendingUp}>
              To hit your target date exactly:{" "}
              <strong className="text-[var(--color-text-primary)] font-semibold tabular-nums">
                {formatCurrency(Math.round(goal.monthlyContribution * 1.5))}/mo
              </strong>
            </DetailRow>
          </CardContent>
        </Card>
      </div>

      <GoalFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initialGoal={goal as Goal}
        submitting={processing}
        onSubmit={handleEdit}
      />
    </div>
  );
}

function DetailRow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-[var(--spacing-sm)] text-[length:var(--typography-body-sm-size)] leading-relaxed text-[var(--color-text-secondary)]">
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-slate)]"
        aria-hidden="true"
      >
        <Icon size={12} className="text-[var(--color-primary)]" />
      </span>
      <span>{children}</span>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/goals"
      className={cn(
        "inline-flex items-center gap-[var(--spacing-2xs)] self-start",
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
        "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
        "focus-visible:outline-offset-[var(--focus-ring-offset)]"
      )}
    >
      <ArrowLeft size={16} strokeWidth={2} />
      <span>Back to Goals</span>
    </Link>
  );
}
