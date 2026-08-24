/**
 * VEYRA — Profile Settings Section
 * Source: design_system/Interaction/Dopmenu.md (Profile identity)
 *         design_system/Components/inputs_forms.md (labels, validation)
 *         design_system/States/Error.md (inline, not color-only)
 */

import { Input, Textarea } from "@/components/ui/Input/Input";
import { SettingGroup, SettingRow } from "../SettingsPrimitives";
import type { ProfileSettings } from "../../types";

interface ProfileSectionProps {
  value: ProfileSettings;
  update: (patch: Partial<ProfileSettings>) => void;
  errors: Record<string, string>;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-[length:var(--typography-caption-size)] text-[var(--color-error)]">
      {message}
    </p>
  );
}

export function ProfileSection({ value, update, errors }: ProfileSectionProps) {
  return (
    <SettingGroup title="Your details" description="This is how Veyra addresses you and others.">
      <SettingRow
        title="Full name"
        description="Shown on your profile and account menu."
        htmlFor="profile-name"
        control={
          <div className="flex w-full flex-col gap-[var(--spacing-2xs)] sm:w-[320px]">
            <Input
              id="profile-name"
              value={value.fullName}
              onChange={(e) => update({ fullName: e.target.value })}
              state={errors.fullName ? "error" : "default"}
              aria-required="true"
              aria-invalid={errors.fullName ? "true" : undefined}
              aria-describedby={errors.fullName ? "profile-name-error" : undefined}
              placeholder="Your full name"
            />
            <FieldError id="profile-name-error" message={errors.fullName} />
          </div>
        }
      />

      <SettingRow
        title="Email"
        description="Used for sign-in and important notices."
        htmlFor="profile-email"
        control={
          <div className="flex w-full flex-col gap-[var(--spacing-2xs)] sm:w-[320px]">
            <Input
              id="profile-email"
              type="email"
              value={value.email}
              onChange={(e) => update({ email: e.target.value })}
              state={errors.email ? "error" : "default"}
              aria-required="true"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "profile-email-error" : undefined}
              placeholder="you@example.com"
            />
            <FieldError id="profile-email-error" message={errors.email} />
          </div>
        }
      />

      <SettingRow
        title="Phone"
        htmlFor="profile-phone"
        control={
          <div className="flex w-full flex-col gap-[var(--spacing-2xs)] sm:w-[320px]">
            <Input
              id="profile-phone"
              type="tel"
              value={value.phone}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="+91 00000 00000"
            />
          </div>
        }
      />

      <SettingRow
        title="Bio"
        description="A short line about your financial goals."
        htmlFor="profile-bio"
        control={
          <div className="flex w-full flex-col gap-[var(--spacing-2xs)] sm:w-[320px]">
            <Textarea
              id="profile-bio"
              value={value.bio}
              maxLength={160}
              onChange={(e) => update({ bio: e.target.value })}
              aria-describedby="profile-bio-count"
            />
            <p
              id="profile-bio-count"
              className="text-right text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]"
            >
              {value.bio.length}/160
            </p>
          </div>
        }
      />
    </SettingGroup>
  );
}
