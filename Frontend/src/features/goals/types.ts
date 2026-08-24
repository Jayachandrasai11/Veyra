/**
 * VEYRA — Goals Types
 * Source: design_system/Patterns/Goal.md
 */

import type { LucideIcon } from "lucide-react";
import { House, ShieldCheck, Car, GraduationCap, Plane, Plus } from "lucide-react";

export type GoalType = "home" | "emergency" | "car" | "education" | "travel" | "custom";

/**
 * Values captured by the Create/Edit goal form.
 * `currentAmount` and `monthlyContribution` are optional on the form
 * but normalised to numbers (defaulting to 0) when persisted.
 */
export interface GoalFormValues {
  title: string;
  targetAmount: number;
  targetDate?: string;
  currentAmount?: number;
  monthlyContribution?: number;
  type: GoalType;
}

export type GoalStatus = "not-started" | "in-progress" | "on-track" | "ahead" | "near-target" | "completed" | "over-target" | "paused" | "at-risk";

export interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  targetDate?: string;
  type: GoalType;
  monthlyContribution: number;
  status: GoalStatus;
}

export interface GoalDetailData {
  goal: Goal;
  progress: number;
  timeRemaining: {
    months: number;
    years: number;
  };
  currentPace: number;
  requiredPace: number;
  estimatedCompletion?: string;
  projection: {
    scenarios: Array<{
      label: string;
      projectedAmount: number;
      onTrack: boolean;
    }>;
  };
}

export interface GoalProgress {
  current: number;
  target: number;
  percentage: number;
}

export const goalTypeIcons: Record<GoalType, LucideIcon> = {
  home: House,
  emergency: ShieldCheck,
  car: Car,
  education: GraduationCap,
  travel: Plane,
  custom: Plus,
};

export const statusLabels: Record<GoalStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "on-track": "On Track",
  "ahead": "Ahead of Schedule",
  "near-target": "Near Target",
  "completed": "Completed",
  "over-target": "Target Exceeded",
  "paused": "Paused",
  "at-risk": "At Risk",
};