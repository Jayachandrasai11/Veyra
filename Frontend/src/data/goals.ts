import type { Goal } from "@/types/goal";

export const goals: Goal[] = [
  {
    id: "goal-1",
    title: "Emergency Fund",
    description: "Build 6 months of living expenses",
    targetAmount: 30000,
    currentAmount: 24500,
    deadline: "2026-12-31",
    priority: "high",
    status: "on-track",
    category: "Savings",
    color: "#16803c",
    milestones: [
      { id: "m1-1", title: "First $10K", targetAmount: 10000, completed: true, completedAt: "2026-03-15" },
      { id: "m1-2", title: "Halfway ($15K)", targetAmount: 15000, completed: true, completedAt: "2026-05-20" },
      { id: "m1-3", title: "$20K milestone", targetAmount: 20000, completed: true, completedAt: "2026-07-10" },
      { id: "m1-4", title: "Full emergency fund", targetAmount: 30000, completed: false },
    ],
  },
  {
    id: "goal-2",
    title: "Vacation Fund",
    description: "Save for a two-week trip to Japan",
    targetAmount: 8000,
    currentAmount: 3200,
    deadline: "2027-06-01",
    priority: "medium",
    status: "on-track",
    category: "Travel",
    color: "#2094f3",
    milestones: [
      { id: "m2-1", title: "Flights covered", targetAmount: 3000, completed: true, completedAt: "2026-08-01" },
      { id: "m2-2", title: "Hotel fund", targetAmount: 6000, completed: false },
      { id: "m2-3", title: "Full trip fund", targetAmount: 8000, completed: false },
    ],
  },
  {
    id: "goal-3",
    title: "Down Payment",
    description: "Save for a house down payment",
    targetAmount: 80000,
    currentAmount: 32000,
    deadline: "2028-01-01",
    priority: "high",
    status: "at-risk",
    category: "Housing",
    color: "#b7791f",
    milestones: [
      { id: "m3-1", title: "First $20K", targetAmount: 20000, completed: true, completedAt: "2026-04-01" },
      { id: "m3-2", title: "25% there", targetAmount: 40000, completed: false },
      { id: "m3-3", title: "Halfway", targetAmount: 80000, completed: false },
    ],
  },
  {
    id: "goal-4",
    title: "New Laptop",
    description: "Replace aging work laptop",
    targetAmount: 2500,
    currentAmount: 2500,
    deadline: "2026-09-01",
    priority: "low",
    status: "completed",
    category: "Technology",
    color: "#2153E6",
    milestones: [
      { id: "m4-1", title: "Laptop fund complete", targetAmount: 2500, completed: true, completedAt: "2026-08-10" },
    ],
  },
];

export const goalSummary = {
  totalGoals: goals.length,
  activeGoals: goals.filter((g) => g.status !== "completed").length,
  completedGoals: goals.filter((g) => g.status === "completed").length,
  totalSaved: goals.reduce((sum, g) => sum + g.currentAmount, 0),
  totalTarget: goals.reduce((sum, g) => sum + g.targetAmount, 0),
  overallProgress: Math.round(
    (goals.reduce((sum, g) => sum + g.currentAmount, 0) /
      goals.reduce((sum, g) => sum + g.targetAmount, 0)) *
      100,
  ),
};
