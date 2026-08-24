/**
 * VEYRA — Privacy & Security Settings Section
 * Source: design_system/Interaction/Dopmenu.md (Security actions explicit)
 *         design_system/Components/Dialog.md (focus trap, escape, overlay)
 *         design_system/Components/inputs_forms.md (validation)
 */

import { useState } from "react";
import { Lock, Fingerprint, EyeOff, LogOut } from "lucide-react";
import { cn } from "@/lib/cn";
import { Switch } from "@/components/ui/Switch/Switch";
import { Button } from "@/components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/ui/Dialog/Dialog";
import { Input } from "@/components/ui/Input/Input";
import { SettingGroup, SettingRow, Separator } from "../SettingsPrimitives";
import type { PrivacySettings } from "../../types";

interface PrivacySecuritySectionProps {
  value: PrivacySettings;
  update: (patch: Partial<PrivacySettings>) => void;
}

function ChangePasswordDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setCurrent("");
    setNext("");
    setConfirm("");
    setErrors({});
    setSubmitting(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit() {
    const nextErrors: Record<string, string> = {};
    if (!current) nextErrors.current = "Enter your current password.";
    if (next.length < 8) nextErrors.next = "Use at least 8 characters.";
    if (confirm !== next) nextErrors.confirm = "Passwords don't match.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      reset();
      onClose();
    }, 700);
  }

  return (
    <Dialog open={open}>
      <DialogContent aria-label="Change password" onEscapeKeyDown={handleClose} onInteractOutside={handleClose}>
        <DialogHeader title="Change password" description="Use a strong password you don't reuse elsewhere." onClose={handleClose} />
        <DialogBody className="flex flex-col gap-[var(--spacing-md)]">
          <div className="flex flex-col gap-[var(--spacing-2xs)]">
            <label htmlFor="pw-current" className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
              Current password
            </label>
            <Input
              id="pw-current"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              state={errors.current ? "error" : "default"}
              aria-invalid={errors.current ? "true" : undefined}
              aria-describedby={errors.current ? "pw-current-error" : undefined}
            />
            {errors.current && (
              <p id="pw-current-error" role="alert" className="text-[length:var(--typography-caption-size)] text-[var(--color-error)]">
                {errors.current}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-[var(--spacing-2xs)]">
            <label htmlFor="pw-next" className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
              New password
            </label>
            <Input
              id="pw-next"
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              state={errors.next ? "error" : "default"}
              aria-invalid={errors.next ? "true" : undefined}
              aria-describedby={errors.next ? "pw-next-error" : undefined}
            />
            {errors.next && (
              <p id="pw-next-error" role="alert" className="text-[length:var(--typography-caption-size)] text-[var(--color-error)]">
                {errors.next}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-[var(--spacing-2xs)]">
            <label htmlFor="pw-confirm" className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
              Confirm new password
            </label>
            <Input
              id="pw-confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              state={errors.confirm ? "error" : "default"}
              aria-invalid={errors.confirm ? "true" : undefined}
              aria-describedby={errors.confirm ? "pw-confirm-error" : undefined}
            />
            {errors.confirm && (
              <p id="pw-confirm-error" role="alert" className="text-[length:var(--typography-caption-size)] text-[var(--color-error)]">
                {errors.confirm}
              </p>
            )}
          </div>
        </DialogBody>
        <DialogFooter
          secondaryAction={{ label: "Cancel", onClick: handleClose }}
          primaryAction={{
            label: "Update password",
            onClick: handleSubmit,
            loading: submitting,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export function PrivacySecuritySection({ value, update }: PrivacySecuritySectionProps) {
  const [pwOpen, setPwOpen] = useState(false);

  return (
    <>
      <SettingGroup title="Visibility" description="Control what's visible at a glance.">
        <SettingRow
          title={
            <span className="flex items-center gap-[var(--spacing-2xs)]">
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" className="text-[var(--color-text-tertiary)]" />
              Privacy mode
            </span>
          }
          description="Hide balances and amounts until you choose to reveal them."
          htmlFor="privacy-hide-balances"
          control={
            <Switch
              id="privacy-hide-balances"
              checked={value.hideBalances}
              onCheckedChange={(v) => update({ hideBalances: v })}
              aria-label="Privacy mode"
            />
          }
        />
      </SettingGroup>

      <Separator />

      <SettingGroup title="Account security" description="Keep your Veyra account protected.">
        <SettingRow
          title={
            <span className="flex items-center gap-[var(--spacing-2xs)]">
              <Lock size={16} strokeWidth={2} aria-hidden="true" className="text-[var(--color-text-tertiary)]" />
              Two-factor authentication
            </span>
          }
          description="Require a second step when signing in on a new device."
          htmlFor="privacy-2fa"
          control={
            <Switch
              id="privacy-2fa"
              checked={value.twoFactor}
              onCheckedChange={(v) => update({ twoFactor: v })}
              aria-label="Two-factor authentication"
            />
          }
        />
        <SettingRow
          title={
            <span className="flex items-center gap-[var(--spacing-2xs)]">
              <Fingerprint size={16} strokeWidth={2} aria-hidden="true" className="text-[var(--color-text-tertiary)]" />
              Biometric unlock
            </span>
          }
          description="Use Face or fingerprint to unlock Veyra on this device."
          htmlFor="privacy-biometric"
          control={
            <Switch
              id="privacy-biometric"
              checked={value.biometric}
              onCheckedChange={(v) => update({ biometric: v })}
              aria-label="Biometric unlock"
            />
          }
        />
        <SettingRow
          title="Password"
          description="Change the password used to sign in."
          htmlFor="privacy-change-pw"
          control={
            <Button
              id="privacy-change-pw"
              variant="outline"
              size="sm"
              onClick={() => setPwOpen(true)}
              className={cn("w-full sm:w-auto")}
            >
              Change password
            </Button>
          }
        />
      </SettingGroup>

      <Separator />

      <SettingGroup title="Sessions" description="Devices currently signed in to your account.">
        <SettingRow
          title="Sign out everywhere"
          description="End all sessions, including this one. You'll sign in again."
          htmlFor="privacy-signout"
          control={
            <Button
              id="privacy-signout"
              variant="ghost"
              size="sm"
              className={cn("w-full text-[var(--color-error)] hover:bg-[var(--color-error-soft)] sm:w-auto")}
            >
              <LogOut size={16} strokeWidth={2} aria-hidden="true" />
              Sign out all
            </Button>
          }
        />
      </SettingGroup>

      <ChangePasswordDialog open={pwOpen} onClose={() => setPwOpen(false)} />
    </>
  );
}
