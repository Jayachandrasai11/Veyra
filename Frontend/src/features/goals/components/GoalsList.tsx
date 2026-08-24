/**
 * VEYRA — GoalsList
 * Source: design_system/Patterns/Goal.md
 *
 * Pattern: Goal Progress Section
 * Structure: Section Header + Goal Grid
 *
 * Rules:
 * - Desktop: 1-2 columns grid
 * - Tablet: 1 column
 * - Mobile: 1 column
 * - Show goal status with text (not color-only)
 * - Support loading, empty, error states
 */

import { useNavigate } from "react-router";
import { SectionHeader } from "@/features/home/components/SectionHeader";
import { GoalItem } from "@/features/home/sections/GoalItem";
import { Card, CardContent } from "@/components/ui/Card/Card";
import { Skeleton } from "@/components/ui/Loading/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { Target } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Goal } from "../types";

interface GoalsListProps {
  goals: Goal[];
  loading?: boolean;
  className?: string;
}

export function GoalsList({ goals, loading = false, className }: GoalsListProps) {
  const navigate = useNavigate();
  // Loading state
  if (loading) {
    return (
      <section className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)} aria-labelledby="goals-title">
        <SectionHeader title="Your goals" description="Track your progress" />
        <Card>
          <CardContent className="p-[var(--spacing-lg)] grid gap-[var(--spacing-lg)]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-[var(--spacing-xs)]">
                <div className="flex items-center gap-[var(--spacing-sm)]">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    );
  }

  // Empty state
  if (!goals || goals.length === 0) {
    return (
      <section className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)} aria-labelledby="goals-title">
        <SectionHeader title="Your goals" description="Track your progress" />
        <Card>
          <CardContent>
            <EmptyState
              icon={Target}
              title="No goals yet"
              description="Set your first financial goal to start tracking your progress."
              action={{
                label: "Create goal",
                onClick: () => navigate("/goals"),
              }}
            />
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)} aria-labelledby="goals-title">
      <SectionHeader
        title="Your goals"
        description="Track your progress"
        action={{
          label: "View all",
          href: "/goals",
        }}
      />

      <Card>
        <CardContent className="p-[var(--spacing-lg)] grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-lg)]">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              title={goal.title}
              currentAmount={goal.currentAmount}
              targetAmount={goal.targetAmount}
              type={goal.type}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}