/**
 * Fermor Tailwind CSS v4 Configuration
 * ─────────────────────────────────────
 * Tailwind v4 uses CSS-based config via @tailwindcss/vite plugin.
 * This file exists for editor tooling and IDE intellisense only.
 * Actual theme tokens live in src/styles/tokens.css and src/styles/tailwind-theme.css.
 */
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
} satisfies Config;
