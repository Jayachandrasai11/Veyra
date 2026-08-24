/**
 * VEYRA — Settings Domain Types
 * Source: design_system/Architecture/Appshell.md (Settings entry)
 *         design_system/Interaction/Dopmenu.md (Profile / Settings / Security / Help)
 *
 * All settings live under a single normalized configuration object.
 * Section shape is intentionally flat so deep-equality (dirty detection)
 * and localStorage persistence stay trivial.
 */

export type ThemeMode = "light";
export type AccentColor = "blue" | "green" | "violet" | "amber";
export type Density = "comfortable" | "compact";
export type Language = "en" | "hi" | "ta" | "te";
export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";
export type DateFormat = "dd-mm-yyyy" | "mm-dd-yyyy" | "yyyy-mm-dd";

export interface ProfileSettings {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
}

export interface AppearanceSettings {
  theme: ThemeMode;
  accent: AccentColor;
  density: Density;
  reduceMotion: boolean;
}

export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sms: boolean;
  spendingAlerts: boolean;
  goalReminders: boolean;
  insights: boolean;
  weeklySummary: boolean;
  securityAlerts: boolean;
}

export interface PrivacySettings {
  hideBalances: boolean;
  twoFactor: boolean;
  biometric: boolean;
}

export interface LanguageRegionSettings {
  language: Language;
  currency: CurrencyCode;
  dateFormat: DateFormat;
}

export interface Settings {
  profile: ProfileSettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  languageRegion: LanguageRegionSettings;
}
