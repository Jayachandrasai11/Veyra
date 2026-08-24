/**
 * VEYRA — HomePage
 * Source: design_system/Layout/Dashboard.md
 *
 * Pattern: Dashboard Layout
 * Structure: Welcome → AccountConnection → MoneyOverview → Insights → Goals → AIInsight → Explore
 *
 * Rules:
 * - Use AppShell (provided by route)
 * - Container: max-w-7xl, mx-auto, px-4 sm:px-6 lg:px-8
 * - Section spacing: 32px (space-y-8)
 * - Grid gap: 16px (gap-4)
 * - Use typed mock data from src/data/
 * - Do not hardcode financial values in JSX
 */

import { WelcomeSection } from "../sections/WelcomeSection";
import { InsightTicker } from "../components/InsightTicker";
import { AccountConnectionSection } from "../sections/AccountConnectionSection";
import { MoneyOverviewSection } from "../sections/MoneyOverviewSection";
import { VeyraNoticedSection } from "../sections/VeyraNoticedSection";
import { RecommendedActionsSection } from "../sections/RecommendedActionsSection";
import { RecentActivitySection } from "../sections/RecentActivitySection";
import { GoalsSection } from "../sections/GoalsSection";
import { AIInsightSection } from "../sections/AIInsightSection";
import { ExploreSection } from "../sections/ExploreSection";
import { financialSummary } from "@/data/financial";
import { goals } from "@/data/goals";
import { formatCurrency } from "@/lib/format";

// Map insights data to the intelligence layer (Veyra noticed)
const noticedInsight = {
  change: "Your spending is ₹8,420 higher than your usual monthly average.",
  whyItMatters: "At this pace you'd miss your monthly savings target by about ₹8,400.",
  drivers: "Most of the increase came from dining out and recurring subscriptions.",
  recommendedAction: "Review your recurring expenses and set a ₹12,000 dining limit.",
  ctaLabel: "Review",
  ctaHref: "/insights",
};

// Recommended actions — specific, financial, never generic filler
const recommendedActions = [
  {
    title: "Build your emergency fund",
    insight: "You're ₹5,500 away from your three-month safety target.",
    actionLabel: "Add money",
    href: "/goals",
  },
  {
    title: "Review subscriptions",
    insight: "Recurring expenses increased 12% over the last quarter.",
    actionLabel: "Review",
    href: "/insights",
  },
  {
    title: "Stay on track",
    insight: "You're ahead of schedule on your Emergency Fund goal.",
    actionLabel: "View goal",
    href: "/goals",
  },
];

// Recent activity — compact, last few movements
const recentActivity = [
  { merchant: "Swiggy", category: "Dining", amount: 420, date: "Today", direction: "out" as const },
  { merchant: "Salary credit", category: "Income", amount: financialSummary.monthlyIncome, date: "Mar 1", direction: "in" as const },
  { merchant: "Netflix", category: "Subscriptions", amount: 649, date: "Feb 28", direction: "out" as const },
  { merchant: "Amazon", category: "Shopping", amount: 1240, date: "Feb 27", direction: "out" as const },
];

// Supporting indicators — context behind the net worth figure
const supportingStats = {
  cash: formatCurrency(42300),
  investments: formatCurrency(178250),
  debt: formatCurrency(36440),
  cashFlow: formatCurrency(financialSummary.monthlyIncome - financialSummary.monthlyExpenses),
  cashFlowPositive: true,
};

// What moved the health score this month
const healthFactors = [
  { label: "Savings rate", delta: 8 },
  { label: "Debt utilization", delta: -3 },
  { label: "Emergency fund", delta: 5 },
];

// Map goals data to the format expected by GoalsSection
const goalTopUps: Record<string, number> = {
  "goal-1": 2500,
  "goal-2": 1500,
  "goal-3": 4000,
};
const mappedGoals = goals.slice(0, 4).map((goal) => ({
  id: goal.id,
  title: goal.title,
  currentAmount: goal.currentAmount,
  targetAmount: goal.targetAmount,
  type: goal.category === "Housing" ? "home" as const :
        goal.category === "Savings" ? "emergency" as const :
        goal.category === "Travel" ? "travel" as const :
        goal.category === "Technology" ? "custom" as const : "custom" as const,
  monthlyTopUp: goalTopUps[goal.id],
}));

// AI Insight data
const aiInsightData = {
  id: "ai-1",
  title: "Your savings rate is exceptional",
  insight: "You're saving 42.6% of your income, well above the recommended 20%.",
  explanation: "At this rate, you'll reach your emergency fund goal 3 months ahead of schedule.",
  primaryAction: {
    label: "See what changed",
    href: "/insights",
  },
};

export function HomePage() {
  return (
    <div className="relative isolate flex flex-col gap-8">
      {/* Section 01: Welcome */}
      <WelcomeSection userName="Sai" />

      {/* Animated intelligence ticker — fills the horizontal band after
          the greeting with live money signals (slim, impactful) */}
      <InsightTicker />

      {/* Section 02: Account Connection */}
      <AccountConnectionSection connected={false} />

      {/* Section 03: Money at a Glance */}
      <MoneyOverviewSection
        data={{
          financialHealth: {
            score: 78,
            status: "Healthy",
            trend: {
              state: "positive" as const,
              value: "4 points",
              period: "this month",
            },
            explanation: "Your finances are in great shape. Keep up the consistent savings.",
          },
          netWorth: {
            value: formatCurrency(financialSummary.totalBalance, { compact: false, decimals: 2 }),
            history: financialSummary.balanceHistory,
          },
          month: {
            income: financialSummary.monthlyIncome,
            expenses: financialSummary.monthlyExpenses,
            savings: financialSummary.monthlyIncome - financialSummary.monthlyExpenses,
            savingsRate: financialSummary.savingsRate,
          },
          supporting: supportingStats,
          factors: healthFactors,
        }}
      />

      {/* Section 04: Veyra Intelligence — what changed, why, what to do */}
      <VeyraNoticedSection insight={noticedInsight} />

      {/* Section 05: Recommended for you */}
      <RecommendedActionsSection actions={recommendedActions} />

      {/* Sections 06+07: Goals (7) + Veyra thought (5) — bento pair */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GoalsSection className="lg:col-span-7" goals={mappedGoals} />
        <AIInsightSection className="lg:col-span-5" data={aiInsightData} />
      </div>

      {/* Section 08: Recent activity — compact */}
      <RecentActivitySection items={recentActivity} />

      {/* Section 09: Explore */}
      <ExploreSection />
    </div>
  );
}
