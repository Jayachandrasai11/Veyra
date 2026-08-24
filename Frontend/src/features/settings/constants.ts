/**
 * VEYRA — Settings Configuration
 * Source: design_system/Architecture/Appshell.md (Settings entry)
 *         design_system/Interaction/Dopmenu.md (Profile / Security / Help)
 *         design_system/Components/Navigation.md (icon + label + real destination)
 *
 * Configuration-driven sections. Every entry is a real destination within
 * the Settings page (anchored panel), never a dead route.
 */

import {
  User,
  Palette,
  Bell,
  ShieldCheck,
  Link2,
  Globe2,
  Database,
  type LucideIcon,
} from "lucide-react";
import type {
  AccentColor,
  CurrencyCode,
  DateFormat,
  Language,
  Settings,
  ThemeMode,
} from "./types";

export interface SettingsSectionConfig {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const SETTINGS_SECTIONS: SettingsSectionConfig[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Your identity and how Veyra addresses you.",
    icon: User,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Theme, accent, density and motion preferences.",
    icon: Palette,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Choose how Veyra keeps you informed.",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    description: "Protect your account and control visibility.",
    icon: ShieldCheck,
  },
  {
    id: "connected",
    label: "Connected accounts",
    description: "Banks and institutions linked to Veyra.",
    icon: Link2,
  },
  {
    id: "language",
    label: "Language & Region",
    description: "Language, currency and date formatting.",
    icon: Globe2,
  },
  {
    id: "data",
    label: "Data & Privacy",
    description: "Export your data or remove your account.",
    icon: Database,
  },
];

export const DEFAULT_SETTINGS: Settings = {
  profile: {
    fullName: "Aarav Sharma",
    email: "aarav.sharma@fermor.app",
    phone: "+91 98765 43210",
    bio: "Saving toward a calm, intentional financial life.",
  },
  appearance: {
        theme: "light",
    accent: "blue",
    density: "comfortable",
    reduceMotion: false,
  },
  notifications: {
    push: true,
    email: true,
    sms: false,
    spendingAlerts: true,
    goalReminders: true,
    insights: true,
    weeklySummary: true,
    securityAlerts: true,
  },
  privacy: {
    hideBalances: false,
    twoFactor: false,
    biometric: true,
  },
  languageRegion: {
    language: "en",
    currency: "INR",
    dateFormat: "dd-mm-yyyy",
  },
};

/* ─── Option maps (localized display + semantic tokens) ─────────── */

    export const THEME_OPTIONS: { value: ThemeMode; label: string; hint: string }[] = [
      { value: "light", label: "Light", hint: "Always light" },
    ];

export const ACCENT_OPTIONS: { value: AccentColor; label: string; hex: string; soft: string }[] = [
  { value: "blue", label: "Blue", hex: "#2153E6", soft: "#E9EFFF" },
  { value: "green", label: "Green", hex: "#16835B", soft: "#E8F5EC" },
  { value: "violet", label: "Violet", hex: "#6D28D9", soft: "#F1EBFD" },
  { value: "amber", label: "Amber", hex: "#B7791F", soft: "#FFF7E6" },
];

export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "te", label: "తెలుగు (Telugu)" },
];

export const CURRENCY_OPTIONS: { value: CurrencyCode; label: string }[] = [
  { value: "INR", label: "Indian Rupee (₹)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GBP", label: "British Pound (£)" },
];

export const DATE_FORMAT_OPTIONS: { value: DateFormat; label: string }[] = [
  { value: "dd-mm-yyyy", label: "DD-MM-YYYY" },
  { value: "mm-dd-yyyy", label: "MM-DD-YYYY" },
  { value: "yyyy-mm-dd", label: "YYYY-MM-DD" },
];

export const STORAGE_KEY = "fermor.settings";
