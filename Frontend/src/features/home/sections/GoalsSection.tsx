/**
 * VEYRA — GoalsSection
 * Source: design_system/Architecture/Section5.md
 *
 * Pattern: Goal Tracking
 * Structure: SectionHeader + GoalList
 *
 * Rules:
 * - Home shows 3-4 relevant active goals
 * - Full-width list
 * - "View all" Arrow Link to Goals page
 * - Progress clamped 0-100%
 * - GoalItem: Icon + Name + Percentage + ProgressBar + Amount
 */

import { Card, CardContent } from "@/components/ui/Card/Card";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import { SectionHeader } from "../components/SectionHeader";
import { GoalItem } from "./GoalItem";
import { Skeleton } from "@/components/ui/Loading/Skeleton";
import { Target } from "lucide-react";
import { cn } from "@/lib/cn";

type GoalType = "home" | "emergency" | "car" | "education" | "travel" | "custom";

interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  type: GoalType;
  monthlyTopUp?: number;
}

interface GoalsSectionProps {
  goals: Goal[];
  loading?: boolean;
  className?: string;
}

export function GoalsSection({ goals, loading = false, className }: GoalsSectionProps) {
  if (loading) {
    return (
      <section className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)}>
        <SectionHeader title="Your goals" description="Track your progress" />
        <Card>
          <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-lg)]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-[var(--spacing-xs)]">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <section className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)}>
        <SectionHeader title="Your goals" description="Track your progress" />
        <Card>
          <CardContent>
            <EmptyState
              icon={Target}
              title="No goals yet"
              description="Set your first financial goal to start tracking your progress."
              action={{
                label: "Create goal",
                onClick: () => {},
              }}
            />
          </CardContent>
        </Card>
      </section>
    );
  }

  // Display only 3-4 goals on Home
  const displayGoals = goals.slice(0, 4);

  return (
    <section
      className={cn("w-full flex flex-col gap-[var(--spacing-md)]", className)}
      aria-labelledby="goals-title"
    >
      <SectionHeader
        title="Your goals"
        description="Track your progress"
        action={{
          label: "View all",
          href: "/goals",
        }}
      />

      {/* Green surface carries the target-rings artwork — money planning motif */}
      <Card surface="green" decoration="target">
        <CardContent className="p-[var(--spacing-lg)] flex flex-col gap-[var(--spacing-lg)]">
          {displayGoals.map((goal) => (
            <GoalItem
              key={goal.id}
              title={goal.title}
              currentAmount={goal.currentAmount}
              targetAmount={goal.targetAmount}
              type={goal.type}
              monthlyTopUp={goal.monthlyTopUp}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
