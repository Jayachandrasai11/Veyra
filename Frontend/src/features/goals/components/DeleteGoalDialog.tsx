/**
 * VEYRA — DeleteGoalDialog
 * Source: design_system/Components/Dialog.md
 * design_system/Interaction/Confirm.md
 * design_system/Ux_writing/confirmations.md
 *
 * Destructive confirmation dialog for deleting a goal.
 *
 * Rules:
 * - Destructive action must NOT rely on color alone (icon + label).
 * - Keyboard accessible; Escape + backdrop close.
 * - "Delete goal" uses the destructive button variant.
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/ui/Dialog/Dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Goal being deleted (used to show its name). */
  goal?: { title: string } | null;
  /** Loading state while the deletion is in flight. */
  processing?: boolean;
  onConfirm: () => void;
}

export function DeleteGoalDialog({
  open,
  onOpenChange,
  goal,
  processing = false,
  onConfirm,
}: DeleteGoalDialogProps) {
  const name = goal?.title ?? "this goal";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onEscapeKeyDown={() => onOpenChange(false)}
        onInteractOutside={() => onOpenChange(false)}
      >
        <DialogHeader
          title="Delete goal?"
          description={`Are you sure you want to delete "${name}"?`}
          onClose={() => onOpenChange(false)}
        />
        <DialogBody>
          <div className="flex items-start gap-[var(--spacing-sm)] rounded-[var(--radius-md)] bg-[var(--color-surface-2)] p-[var(--spacing-md)]">
            <AlertTriangle
              size={18}
              strokeWidth={2}
              className="mt-[2px] shrink-0 text-[var(--color-error)]"
              aria-hidden="true"
            />
            <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
              Your goal progress and target will no longer appear in Veyra.
            </p>
          </div>
        </DialogBody>
        <DialogFooter
          secondaryAction={{ label: "Cancel", onClick: () => onOpenChange(false) }}
          primaryAction={{
            label: "Delete goal",
            destructive: true,
            loading: processing,
            disabled: processing,
            onClick: onConfirm,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
