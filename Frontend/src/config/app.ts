export const appConfig = {
  name: "Veyra",
  description: "AI-powered personal finance assistant",
  version: "1.0.0",
  url: "https://fermor.app",
  supportEmail: "support@fermor.app",
} as const;

export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 30_000,
} as const;

export const featureFlags = {
  aiAssistant: true,
  goalTracking: true,
  accountSync: false,
  darkMode: true,
} as const;
