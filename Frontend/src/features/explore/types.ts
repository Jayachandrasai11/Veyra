/**
 * VEYRA — Explore Types
 * Source: design_system/Patterns/explore.md
 */

import type { LucideIcon } from "lucide-react";

export type ExploreCategoryId = "plan" | "compare" | "calculate" | "learn";

export type ExploreSurface = "default" | "blue" | "sky" | "navy" | "green" | "slate" | "warm" | "lavender" | "brand";

export interface ExploreTool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export interface ExploreCategory {
  id: ExploreCategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Tinted surface for visual hierarchy (Plan→blue, Compare→slate, Calculate→white, Learn→warm) */
  surface: ExploreSurface;
  tools: ExploreTool[];
}