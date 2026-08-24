/**
 * VEYRA — Settings Save Bar
 * Source: design_system/States/Default.md (saving / saved)
 *         design_system/Components/buttons.md (primary / ghost)
 *         design_system/Deisgntokens/master.md §24 (motion tokens)
 *
 * Sticky action footer for the active panel. Visible only when there is
 * something to communicate (unsaved changes, success, or error) so it never
 * occupies layout space while idle.
 */

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button/Button";
import { Alert } from "@/components/ui/Alert/Alert";
import { Check, TriangleAlert } from "lucide-react";

interface SettingsSaveBarProps {
  isDirty: boolean;
  isSaving: boolean;
  justSaved: boolean;
  saveError: string | null;
  /** When true the save action is prevented (e.g. invalid input). */
  blocked?: boolean;
  blockedHint?: string;
  onSave: () => void;
  onCancel: () => void;
}

export function SettingsSaveBar({
  isDirty,
  isSaving,
  justSaved,
  saveError,
  blocked = false,
  blockedHint,
  onSave,
  onCancel,
}: SettingsSaveBarProps) {
  if (!isDirty && !justSaved && !saveError && !blocked) return null;

  const saveDisabled = !isDirty || isSaving || blocked;

  return (
    <div
      role="region"
      aria-label="Settings actions"
      className={cn(
        "sticky bottom-0 z-[var(--z-sticky)] mt-[var(--spacing-lg)]",
        "-mx-[var(--container-padding-mobile)] md:-mx-[var(--container-padding-tablet)] xl:-mx-[var(--container-padding-desktop)]",
        "px-[var(--container-padding-mobile)] md:px-[var(--container-padding-tablet)] xl:px-[var(--container-padding-desktop)]",
        "border-t border-[var(--color-border)] bg-[var(--color-surface-1)]/95 backdrop-blur",
        "pb-[var(--spacing-md)] pt-[var(--spacing-sm)]"
      )}
    >
      {saveError && (
        <div className="mb-[var(--spacing-sm)]">
          <Alert variant="error" title="Couldn't save" description={saveError} />
        </div>
      )}

      <div className="flex items-center justify-between gap-[var(--spacing-md)]">
        <p
          aria-live="polite"
          className={cn(
            "flex items-center gap-[var(--spacing-2xs)] min-w-0",
            "text-[length:var(--typography-body-sm-size)]",
            justSaved ? "text-[var(--color-success)]" : "text-[var(--color-text-secondary)]"
          )}
        >
          {justSaved ? (
            <>
              <Check size={16} strokeWidth={2} aria-hidden="true" />
              <span className="truncate">All changes saved</span>
            </>
          ) : isDirty ? (
            <span className="truncate">You have unsaved changes</span>
          ) : blocked && blockedHint ? (
            <span className="truncate text-[var(--color-error)]">{blockedHint}</span>
          ) : (
            <span className="flex items-center gap-[var(--spacing-2xs)] text-[var(--color-warning)]">
              <TriangleAlert size={16} strokeWidth={2} aria-hidden="true" />
              <span className="truncate">Save failed</span>
            </span>
          )}
        </p>

        <div className="flex items-center gap-[var(--spacing-sm)] shrink-0">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={!isDirty || isSaving}
            aria-label="Discard unsaved changes"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onSave}
            loading={isSaving}
            disabled={saveDisabled}
            aria-label="Save settings"
          >
            {isSaving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
