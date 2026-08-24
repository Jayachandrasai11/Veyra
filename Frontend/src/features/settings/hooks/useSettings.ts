/**
 * VEYRA — Settings State Hook
 * Source: design_system/States/Default.md (idle / saving / saved / error)
 *         design_system/technical/forms.md (validate, persist)
 *
 * Responsibilities:
 *  - Hold a `draft` (working copy) and `saved` (persisted) settings.
 *  - Derive `isDirty` via deep equality (no arbitrary comparison).
 *  - Persist to localStorage on save (simulated async for real feedback).
 *  - Apply Appearance live so theme/accents/motion preview immediately,
 *    while remaining reversible when the user cancels.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ACCENT_OPTIONS, DEFAULT_SETTINGS, STORAGE_KEY } from "../constants";
import type {
  AppearanceSettings,
  Settings,
} from "../types";

const SAVE_DELAY_MS = 700;

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function applyAppearance(appearance: AppearanceSettings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  // Veyra ships light-only — dark mode was removed from Appearance.
  root.classList.remove("dark");

  const accent = ACCENT_OPTIONS.find((a) => a.value === appearance.accent);
  if (accent) {
    root.style.setProperty("--color-accent", accent.hex);
    root.style.setProperty("--color-accent-soft", accent.soft);
  }

  root.classList.toggle("reduce-motion", appearance.reduceMotion);
}

export interface UseSettingsResult {
  draft: Settings;
  saved: Settings;
  isDirty: boolean;
  isSaving: boolean;
  justSaved: boolean;
  saveError: string | null;
  update: <K extends keyof Settings>(
    section: K,
    patch: Partial<Settings[K]>
  ) => void;
  save: () => void;
  cancel: () => void;
}

export function useSettings(): UseSettingsResult {
  const [saved, setSaved] = useLocalStorage<Settings>(STORAGE_KEY, DEFAULT_SETTINGS);
  const [draft, setDraft] = useState<Settings>(saved);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedFlashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live preview of appearance — reverts automatically when draft changes
  // (e.g. on cancel the draft resets to `saved`, re-applying that state).
  useEffect(() => {
    applyAppearance(draft.appearance);
  }, [draft.appearance]);

  const isDirty = useMemo(() => !deepEqual(draft, saved), [draft, saved]);

  const update = useCallback(
    <K extends keyof Settings>(section: K, patch: Partial<Settings[K]>) => {
      setDraft((prev) => ({
        ...prev,
        [section]: { ...prev[section], ...patch },
      }));
      setJustSaved(false);
    },
    []
  );

  const cancel = useCallback(() => {
    setDraft(saved);
    setJustSaved(false);
    setSaveError(null);
  }, [saved]);

  const save = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (savedFlashTimer.current) clearTimeout(savedFlashTimer.current);
    setIsSaving(true);
    setSaveError(null);

    saveTimer.current = setTimeout(() => {
      try {
        setSaved(draft);
        setJustSaved(true);
        setIsSaving(false);
        savedFlashTimer.current = setTimeout(() => setJustSaved(false), 2600);
      } catch {
        setSaveError(
          "We couldn't save your settings. Please try again."
        );
        setIsSaving(false);
      }
    }, SAVE_DELAY_MS);
  }, [draft, setSaved]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (savedFlashTimer.current) clearTimeout(savedFlashTimer.current);
    };
  }, []);

  return {
    draft,
    saved,
    isDirty,
    isSaving,
    justSaved,
    saveError,
    update,
    save,
    cancel,
  };
}
