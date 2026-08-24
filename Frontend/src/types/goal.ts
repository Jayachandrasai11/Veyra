export type GoalPriority = "low" | "medium" | "high";

export type GoalStatus = "on-track" | "at-risk" | "behind" | "completed";

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: GoalPriority;
  status: GoalStatus;
  category: string;
  icon?: string;
  color?: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  targetAmount: number;
  completed: boolean;
  completedAt?: string;
}

export interface GoalSummary {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  totalSaved: number;
  totalTarget: number;
  overallProgress: number;
}
