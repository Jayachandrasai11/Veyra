/**
 * VEYRA — Data & Privacy Settings Section
 * Source: design_system/Components/buttons.md (destructive variant)
 *         design_system/Components/Dialog.md (destructive confirm)
 *         design_system/UX Writing/buttons.md (clear, explicit labels)
 */

import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/ui/Dialog/Dialog";
import { Alert } from "@/components/ui/Alert/Alert";
import { SettingGroup, SettingRow, Separator } from "../SettingsPrimitives";

export function DataPrivacySection() {
  const [exporting, setExporting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleExport() {
    setExporting(true);
    setTimeout(() => setExporting(false), 900);
  }

  function handleDelete() {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setDeleteOpen(false);
    }, 900);
  }

  return (
    <>
      <SettingGroup title="Your data" description="Take your information with you at any time.">
        <SettingRow
          title="Export data"
          description="Download a copy of your profiles, goals, and history as JSON."
          htmlFor="data-export"
          control={
            <Button
              id="data-export"
              variant="outline"
              size="sm"
              onClick={handleExport}
              loading={exporting}
              className="w-full sm:w-auto"
            >
              {!exporting && <Download size={16} strokeWidth={2} aria-hidden="true" />}
              {exporting ? "Preparing…" : "Export data"}
            </Button>
          }
        />
      </SettingGroup>

      <Separator />

      <SettingGroup title="Remove account" description="Permanently delete your Veyra account and data.">
        <Alert
          variant="error"
          title="This action is irreversible"
          description="Once deleted, your account, goals, and linked data cannot be recovered."
        />
        <SettingRow
          title="Delete account"
          description="Remove your account and all associated data."
          htmlFor="data-delete"
          control={
            <Button
              id="data-delete"
              variant="destructive"
              size="sm"
              onClick={() => setDeleteOpen(true)}
              className={cn("w-full sm:w-auto")}
            >
              <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
              Delete account
            </Button>
          }
        />
      </SettingGroup>

      <Dialog open={deleteOpen}>
        <DialogContent aria-label="Delete your account" onEscapeKeyDown={() => setDeleteOpen(false)} onInteractOutside={() => setDeleteOpen(false)}>
          <DialogHeader title="Delete your account?" description="This permanently removes your data and cannot be undone." onClose={() => setDeleteOpen(false)} />
          <DialogBody>
            <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
              You'll be signed out immediately and all goals, insights, and connected accounts will be erased.
            </p>
          </DialogBody>
          <DialogFooter
            secondaryAction={{ label: "Cancel", onClick: () => setDeleteOpen(false) }}
            primaryAction={{
              label: "Delete account",
              onClick: handleDelete,
              loading: deleting,
              destructive: true,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
