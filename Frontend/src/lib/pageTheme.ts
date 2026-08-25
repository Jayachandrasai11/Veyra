/**
 * Veyra page canvas themes.
 * Source: design_system/Foundations/colour.md
 *         design_system/Components/card.md
 *
 * Canvas uses --empty-area-gradient. Cards use semantic surfaces.
 * Navy is reserved for Financial Health (and tool result heroes).
 */

export type PageTheme =
  | "home"
  | "money"
  | "insights"
  | "goals"
  | "explore"
  | "connect"
  | "assistant"
  | "settings"
  | "default";

export function pageThemeFromPath(pathname: string): PageTheme {
  if (pathname === "/" || pathname.startsWith("/dashboard")) return "home";
  if (pathname.startsWith("/money")) return "money";
  if (pathname.startsWith("/insights")) return "insights";
  if (pathname.startsWith("/goals")) return "goals";
  if (pathname.startsWith("/explore")) return "explore";
  if (pathname.startsWith("/connect")) return "connect";
  if (pathname.startsWith("/assistant")) return "assistant";
  if (pathname.startsWith("/settings")) return "settings";
  return "default";
}
