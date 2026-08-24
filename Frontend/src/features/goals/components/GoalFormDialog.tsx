/**
 * VEYRA — GoalFormDialog
 * Source: design_system/Components/Dialog.md
 * design_system/Interaction/Goalbehv.md
 * design_system/Ux_writing/buttons.md
 *
 * Create / Edit goal form dialog.
 *
 * Fields (per Goal Management spec):
 * - Goal name (required)
 * - Target amount (required)
 * - Target date (optional)
 * - Current amount (optional)
 * - Monthly contribution (optional)
 *
 * Primary action: "Create goal" / "Save changes"
 * Secondary action: "Cancel"
 * Reused for both create and edit by passing `initialGoal`.
 */

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/ui/Dialog/Dialog";
import { Input, InputWrapper } from "@/components/ui/Input/Input";
import { type Goal, type GoalFormValues, type GoalType } from "../types";

interface GoalFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided, the dialog operates in edit mode. */
  initialGoal?: Goal | null;
  /** Loading state while the mutation is in flight. */
  submitting?: boolean;
  onSubmit: (values: GoalFormValues) => void;
}

const GOAL_TYPES: GoalType[] = ["home", "emergency", "car", "education", "travel", "custom"];

interface FormState {
  title: string;
  targetAmount: string;
  targetDate: string;
  currentAmount: string;
  monthlyContribution: string;
  type: GoalType;
}

const EMPTY_FORM: FormState = {
  title: "",
  targetAmount: "",
  targetDate: "",
  currentAmount: "",
  monthlyContribution: "",
  type: "custom",
};

function fromGoal(goal: Goal | null | undefined): FormState {
  if (!goal) return EMPTY_FORM;
  return {
    title: goal.title,
    targetAmount: String(goal.targetAmount),
    targetDate: goal.targetDate ?? "",
    currentAmount: goal.currentAmount ? String(goal.currentAmount) : "",
    monthlyContribution: goal.monthlyContribution ? String(goal.monthlyContribution) : "",
    type: goal.type,
  };
}

export function GoalFormDialog({
  open,
  onOpenChange,
  initialGoal,
  submitting = false,
  onSubmit,
}: GoalFormDialogProps) {
  const isEdit = Boolean(initialGoal);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset the form whenever the dialog opens for a different goal.
  useEffect(() => {
    if (open) {
      setForm(fromGoal(initialGoal));
      setErrors({});
    }
  }, [open, initialGoal]);

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = (): GoalFormValues | null => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = "Goal name is required";

    const target = Number(form.targetAmount);
    if (!form.targetAmount.trim() || !Number.isFinite(target) || target <= 0) {
      next.targetAmount = "Enter a target amount greater than 0";
    }

    const current = form.currentAmount.trim() ? Number(form.currentAmount) : 0;
    if (form.currentAmount.trim() && (!Number.isFinite(current) || current < 0)) {
      next.currentAmount = "Current amount cannot be negative";
    }

    const monthly = form.monthlyContribution.trim() ? Number(form.monthlyContribution) : 0;
    if (form.monthlyContribution.trim() && (!Number.isFinite(monthly) || monthly < 0)) {
      next.monthlyContribution = "Monthly contribution cannot be negative";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return null;

    return {
      title: form.title,
      targetAmount: target,
      targetDate: form.targetDate || undefined,
      currentAmount: current,
      monthlyContribution: monthly,
      type: form.type,
    };
  };

  const handleSubmit = async () => {
    const values = validate();
    if (values) await onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onEscapeKeyDown={() => onOpenChange(false)}
        onInteractOutside={() => onOpenChange(false)}
      >
        <DialogHeader
          title={isEdit ? "Edit goal" : "Create goal"}
          description={
            isEdit
              ? "Update your goal details and progress."
              : "Set a target and let Veyra help you stay on track."
          }
          onClose={() => onOpenChange(false)}
        />
        <DialogBody className="flex flex-col gap-[var(--spacing-lg)]">
          <InputWrapper
            label="Goal name"
            htmlFor="goal-name"
            required
            error={errors.title}
          >
            <Input
              id="goal-name"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="e.g. Home Down Payment"
              state={errors.title ? "error" : "default"}
            />
          </InputWrapper>

          <InputWrapper
            label="Target amount"
            htmlFor="goal-target"
            required
            error={errors.targetAmount}
          >
            <Input
              id="goal-target"
              type="number"
              inputMode="numeric"
              min={0}
              value={form.targetAmount}
              onChange={(e) => setField("targetAmount", e.target.value)}
              placeholder="₹ 500000"
              state={errors.targetAmount ? "error" : "default"}
            />
          </InputWrapper>

          <InputWrapper label="Target date" htmlFor="goal-date" helperText="Optional">
            <Input
              id="goal-date"
              type="date"
              value={form.targetDate}
              onChange={(e) => setField("targetDate", e.target.value)}
            />
          </InputWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
            <InputWrapper
              label="Current amount"
              htmlFor="goal-current"
              helperText="Optional"
              error={errors.currentAmount}
            >
              <Input
                id="goal-current"
                type="number"
                inputMode="numeric"
                min={0}
                value={form.currentAmount}
                onChange={(e) => setField("currentAmount", e.target.value)}
                placeholder="₹ 0"
                state={errors.currentAmount ? "error" : "default"}
              />
            </InputWrapper>

            <InputWrapper
              label="Monthly contribution"
              htmlFor="goal-monthly"
              helperText="Optional"
              error={errors.monthlyContribution}
            >
              <Input
                id="goal-monthly"
                type="number"
                inputMode="numeric"
                min={0}
                value={form.monthlyContribution}
                onChange={(e) => setField("monthlyContribution", e.target.value)}
                placeholder="₹ 0"
                state={errors.monthlyContribution ? "error" : "default"}
              />
            </InputWrapper>
          </div>

          <InputWrapper label="Goal type" htmlFor="goal-type">
            <select
              id="goal-type"
              value={form.type}
              onChange={(e) => setField("type", e.target.value as GoalType)}
              className="flex h-11 w-full rounded-[var(--radius-input)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-[var(--spacing-sm)] text-[length:var(--typography-body-size)] text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[var(--focus-ring-color)]"
            >
              {GOAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </InputWrapper>
        </DialogBody>
        <DialogFooter
          secondaryAction={{ label: "Cancel", onClick: () => onOpenChange(false) }}
          primaryAction={{
            label: isEdit ? "Save changes" : "Create goal",
            loading: submitting,
            disabled: submitting,
            onClick: handleSubmit,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
