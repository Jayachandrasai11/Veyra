/**
 * VEYRA — Goals Page
 * Source: design_system/Patterns/Goal.md
 * design_system/Components/card.md
 * design_system/Components/Dialog.md
 * design_system/Interaction/Goalbehv.md
 * design_system/States/ (Default, Load, Error, Empty, Success)
 *
 * Goal Management actions supported:
 * - Create / Set goal
 * - View goal (card → detail, or overflow "View goal")
 * - Edit goal
 * - Delete goal (destructive confirmation)
 */

import { useState } from "react";
import { Target, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { FinancialMetric } from "@/components/ui/Metric/FinancialMetric";
import { formatCurrency } from "@/lib/format";
import { useGoals } from "../hooks/useGoals";
import { GoalCard } from "../components/GoalCard";
import { GoalFormDialog } from "../components/GoalFormDialog";
import { DeleteGoalDialog } from "../components/DeleteGoalDialog";
import type { Goal, GoalFormValues } from "../types";

type DialogState =
  | { mode: "closed" }
  | { mode: "create" }
  | { mode: "edit"; goal: Goal }
  | { mode: "delete"; goal: Goal };

export function GoalsPage() {
  const { goals, loading, error, processing, refetch, addGoal, updateGoal, deleteGoal } = useGoals();
  const [dialog, setDialog] = useState<DialogState>({ mode: "closed" });
  const [justSaved, setJustSaved] = useState(false);

  const openCreate = () => setDialog({ mode: "create" });
  const openEdit = (goal: Goal) => setDialog({ mode: "edit", goal });
  const openDelete = (goal: Goal) => setDialog({ mode: "delete", goal });
  const closeDialog = () => setDialog({ mode: "closed" });

  const handleCreate = async (values: GoalFormValues) => {
    await addGoal(values);
    flashSaved();
    closeDialog();
  };

  const handleEdit = async (values: GoalFormValues) => {
    if (dialog.mode !== "edit") return;
    await updateGoal(dialog.goal.id, values);
    flashSaved();
    closeDialog();
  };

  const handleDelete = async () => {
    if (dialog.mode !== "delete") return;
    await deleteGoal(dialog.goal.id);
    flashSaved();
    closeDialog();
  };

  const flashSaved = () => {
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 3000);
  };

  const pageTitle = (
    <header className="flex flex-col gap-[var(--spacing-2xs)]">
      <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)]">
        Your goals
      </h1>
      <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[60ch]">
        See how close you are, then act on one goal
      </p>
    </header>
  );

  if (loading) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        {pageTitle}
        <Card frame="blue">
          <CardContent className="p-[var(--spacing-lg)]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[var(--spacing-lg)]">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-[var(--spacing-xs)]">
                  <div className="h-5 w-1/3 bg-[var(--color-surface-2)] rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-[var(--color-surface-2)] rounded animate-pulse" />
                  <div className="h-2 w-full rounded-full bg-[var(--color-surface-2)] animate-pulse" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
        {pageTitle}
        <Card frame="amber">
          <CardContent className="p-[var(--spacing-lg)] text-center">
            <p className="text-[var(--color-error)]">{error}</p>
            <Button variant="secondary" className="mt-[var(--spacing-md)]" onClick={() => refetch()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const showEmpty = !goals || goals.length === 0;

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      <div className="flex items-start justify-between gap-[var(--spacing-md)]">
        {pageTitle}
        {!showEmpty && (
          <Button onClick={openCreate} className="shrink-0">
            <Plus size={16} strokeWidth={2} className="mr-[var(--spacing-2xs)]" />
            Create goal
          </Button>
        )}
      </div>

      {justSaved && (
        <div
          role="status"
          className="flex items-center gap-[var(--spacing-sm)] rounded-[var(--radius-md)] bg-[var(--color-surface-green)] px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[length:var(--typography-body-sm-size)] text-[var(--color-text-primary)]"
        >
          <CheckCircle2 size={16} strokeWidth={2} className="text-[var(--color-success)]" aria-hidden="true" />
          Goal updated
        </div>
      )}

      {!showEmpty && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[var(--spacing-md)]">
          <Card surface="green">
            <CardContent className="p-[var(--spacing-lg)]">
              <FinancialMetric
                label="Saved so far"
                value={formatCurrency(
                  goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
                )}
              />
            </CardContent>
          </Card>
          <Card surface="slate">
            <CardContent className="p-[var(--spacing-lg)]">
              <FinancialMetric
                label="Still to go"
                value={formatCurrency(
                  goals.reduce(
                    (sum, goal) => sum + Math.max(goal.targetAmount - goal.currentAmount, 0),
                    0
                  )
                )}
              />
            </CardContent>
          </Card>
          <Card surface="blue">
            <CardContent className="p-[var(--spacing-lg)]">
              <FinancialMetric
                label="On track"
                value={`${goals.filter((goal) => goal.status === "on-track" || goal.status === "ahead").length}`}
                supportingText={`${goals.length} goals in total`}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {showEmpty ? (
        <Card frame="blue">
          <CardContent className="p-[var(--spacing-lg)]">
            <EmptyState
              icon={Target}
              title="You haven't created a financial goal yet."
              description="Create a goal and let Veyra help you stay on track."
              action={{ label: "Create a goal", onClick: openCreate }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[var(--spacing-lg)]">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onEdit={openEdit} onDelete={openDelete} />
          ))}
          <button
            type="button"
            onClick={openCreate}
            className="flex min-h-[140px] flex-col items-center justify-center gap-[var(--spacing-sm)] rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)] transition-colors"
            aria-label="Create goal"
          >
            <Plus size={24} strokeWidth={2} aria-hidden="true" />
            <span className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]">
              Create goal
            </span>
          </button>
        </div>
      )}

      <GoalFormDialog
        open={dialog.mode === "create" || dialog.mode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
        initialGoal={dialog.mode === "edit" ? dialog.goal : null}
        submitting={processing}
        onSubmit={dialog.mode === "edit" ? handleEdit : handleCreate}
      />

      <DeleteGoalDialog
        open={dialog.mode === "delete"}
        onOpenChange={(open) => !open && closeDialog()}
        goal={dialog.mode === "delete" ? dialog.goal : null}
        processing={processing}
        onConfirm={handleDelete}
      />
    </div>
  );
}
