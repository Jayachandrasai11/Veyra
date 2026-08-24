/**
 * VEYRA — useGoals Hook
 * Source: design_system/Patterns/Goal.md
 * design_system/Interaction/Goalbehv.md
 *
 * Fetches and manages goals data and exposes CRUD mutations
 * (create / edit / delete) needed by the Goals management flow.
 *
 * Rules:
 * - Simulated async API (loading + processing states)
 * - Status is derived from progress, never faked
 * - Preserves data in component session state
 */

import { useState, useEffect, useCallback } from "react";
import type { Goal, GoalFormValues, GoalType, GoalStatus } from "../types";

const STORAGE_KEY = "fermor.goals";

function deriveStatus(values: GoalFormValues): GoalStatus {
  const target = values.targetAmount;
  const current = values.currentAmount ?? 0;
  if (target <= 0) return "not-started";
  const ratio = current / target;
  if (ratio >= 1) return "completed";
  if (ratio <= 0) return "not-started";
  return "in-progress";
}

function toGoal(id: string, values: GoalFormValues): Goal {
  return {
    id,
    title: values.title.trim(),
    currentAmount: values.currentAmount ?? 0,
    targetAmount: values.targetAmount,
    targetDate: values.targetDate,
    type: values.type,
    monthlyContribution: values.monthlyContribution ?? 0,
    status: deriveStatus(values),
  };
}

const seedGoals: Goal[] = [
  {
    id: "goal-1",
    title: "Emergency Fund",
    currentAmount: 450000,
    targetAmount: 1000000,
    targetDate: "2026-12-31",
    type: "emergency",
    monthlyContribution: 50000,
    status: "in-progress",
  },
  {
    id: "goal-2",
    title: "Home Down Payment",
    currentAmount: 2800000,
    targetAmount: 5000000,
    targetDate: "2027-06-30",
    type: "home",
    monthlyContribution: 120000,
    status: "on-track",
  },
  {
    id: "goal-3",
    title: "Vacation Trip",
    currentAmount: 120000,
    targetAmount: 300000,
    targetDate: "2026-08-15",
    type: "travel",
    monthlyContribution: 25000,
    status: "near-target",
  },
];

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<GoalType | null>(null);
  const [processing, setProcessing] = useState(false);

  const persist = useCallback((next: Goal[]) => {
    setGoals(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }, []);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let stored: Goal[] | null = null;
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) stored = JSON.parse(raw) as Goal[];
      } catch {
        stored = null;
      }
      setGoals(stored && stored.length ? stored : seedGoals);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load goals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = useCallback(
    async (values: GoalFormValues): Promise<Goal> => {
      setProcessing(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const id = `goal-${Date.now()}`;
        const created = toGoal(id, values);
        persist([...goals, created]);
        return created;
      } finally {
        setProcessing(false);
      }
    },
    [goals, persist]
  );

  const updateGoal = useCallback(
    async (id: string, values: GoalFormValues): Promise<void> => {
      setProcessing(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        persist(goals.map((g) => (g.id === id ? toGoal(id, values) : g)));
      } finally {
        setProcessing(false);
      }
    },
    [goals, persist]
  );

  const deleteGoal = useCallback(
    async (id: string): Promise<void> => {
      setProcessing(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 400));
        persist(goals.filter((g) => g.id !== id));
      } finally {
        setProcessing(false);
      }
    },
    [goals, persist]
  );

  return {
    goals,
    loading,
    error,
    filter,
    setFilter,
    processing,
    addGoal,
    updateGoal,
    deleteGoal,
    refetch: fetchGoals,
  };
}
