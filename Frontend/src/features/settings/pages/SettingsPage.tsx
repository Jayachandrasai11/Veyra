/**
 * VEYRA — Settings Page
 * Source: design_system/Architecture/Appshell.md (Settings entry, content alignment)
 *         design_system/Foundations/responsive.md (mobile → stacked, desktop → 2-col)
 *         design_system/States/Default.md (idle / dirty / saving / saved)
 *
 * Responsive settings hub:
 *  - Desktop/tablet: sticky vertical section nav + active panel (2-col grid)
 *  - Mobile: horizontal scroll section strip + stacked panel
 *  - Dirty/saving/saved states surfaced via the sticky save bar
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Settings } from "lucide-react";
import { cn } from "@/lib/cn";
import { useResponsive } from "@/hooks/useResponsive";
import { SETTINGS_SECTIONS } from "../constants";
import { useSettings } from "../hooks/useSettings";
import { SettingsNav } from "../components/SettingsNav";
import { SettingsPanel } from "../components/SettingsPanel";
import { SettingsSaveBar } from "../components/SettingsSaveBar";
import { ProfileSection } from "../components/sections/ProfileSection";
import { AppearanceSection } from "../components/sections/AppearanceSection";
import { NotificationsSection } from "../components/sections/NotificationsSection";
import { PrivacySecuritySection } from "../components/sections/PrivacySecuritySection";
import { ConnectedAccountsSection } from "../components/sections/ConnectedAccountsSection";
import { LanguageRegionSection } from "../components/sections/LanguageRegionSection";
import { DataPrivacySection } from "../components/sections/DataPrivacySection";
import type { ProfileSettings } from "../types";

function validateProfile(p: ProfileSettings): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!p.fullName.trim()) errors.fullName = "Name is required.";
  if (!p.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

export function SettingsPage() {
  const { draft, isDirty, isSaving, justSaved, saveError, update, save, cancel } = useSettings();
  const [activeId, setActiveId] = useState(SETTINGS_SECTIONS[0].id);
  const { isDesktop } = useResponsive();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Settings · Veyra";
  }, []);

  // On mobile, bring the panel into view when switching sections.
  useEffect(() => {
    if (!isDesktop && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeId, isDesktop]);

  const profileErrors = useMemo(() => validateProfile(draft.profile), [draft.profile]);
  const hasErrors = Object.keys(profileErrors).length > 0;

  const active = SETTINGS_SECTIONS.find((s) => s.id === activeId) ?? SETTINGS_SECTIONS[0];

  function renderActivePanel() {
    switch (active.id) {
      case "profile":
        return (
          <ProfileSection
            value={draft.profile}
            update={(patch) => update("profile", patch)}
            errors={profileErrors}
          />
        );
      case "appearance":
        return <AppearanceSection value={draft.appearance} update={(patch) => update("appearance", patch)} />;
      case "notifications":
        return <NotificationsSection value={draft.notifications} update={(patch) => update("notifications", patch)} />;
      case "privacy":
        return <PrivacySecuritySection value={draft.privacy} update={(patch) => update("privacy", patch)} />;
      case "connected":
        return <ConnectedAccountsSection />;
      case "language":
        return <LanguageRegionSection value={draft.languageRegion} update={(patch) => update("languageRegion", patch)} />;
      case "data":
        return <DataPrivacySection />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col gap-[var(--section-gap-desktop)] pt-[var(--spacing-lg)]">
      {/* Page header */}
      <header className="flex items-start gap-[var(--spacing-md)]">
        <span
          className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]"
          aria-hidden="true"
        >
          <Settings size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
        </span>
        <div className="flex flex-col gap-[var(--spacing-2xs)] min-w-0">
          <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]">
            Settings
          </p>
          <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)]">
            Manage your workspace
          </h1>
          <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
            Profile, preferences, and how Veyra works for you.
          </p>
        </div>
      </header>

      {/* Nav + active panel */}
      <div className={cn("grid grid-cols-1 gap-[var(--spacing-xl)] xl:grid-cols-[260px_minmax(0,1fr)]")}>
        <SettingsNav sections={SETTINGS_SECTIONS} activeId={activeId} onSelect={setActiveId} />

        <div
          ref={panelRef}
          id="settings-panel"
          role="tabpanel"
          aria-labelledby={`settings-tab-${active.id}`}
          className="min-w-0"
        >
          <SettingsPanel section={active}>{renderActivePanel()}</SettingsPanel>
        </div>
      </div>

      <SettingsSaveBar
        isDirty={isDirty}
        isSaving={isSaving}
        justSaved={justSaved}
        saveError={saveError}
        blocked={hasErrors}
        blockedHint="Fix the highlighted fields to save."
        onSave={save}
        onCancel={cancel}
      />
    </div>
  );
}
