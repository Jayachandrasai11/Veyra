import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import { AppShell } from "@/components/layout/AppShell/AppShell";

const HomePage = lazy(() => import("@/features/home/pages/HomePage").then((m) => ({ default: m.HomePage })));
const RecentActivityPage = lazy(() => import("@/features/home/pages/RecentActivityPage").then((m) => ({ default: m.RecentActivityPage })));
const HealthBreakdownPage = lazy(() => import("@/features/home/pages/HealthBreakdownPage").then((m) => ({ default: m.HealthBreakdownPage })));
const MoneyPage = lazy(() => import("@/features/money/pages/MoneyPage").then((m) => ({ default: m.MoneyPage })));
const InsightsPage = lazy(() => import("@/features/insights/pages/InsightsPage").then((m) => ({ default: m.InsightsPage })));
const SavingsRateAboveAveragePage = lazy(() => import("@/features/insights/pages/SavingsRateAboveAveragePage").then((m) => ({ default: m.SavingsRateAboveAveragePage })));
const UnusualSpendingPage = lazy(() => import("@/features/insights/pages/UnusualSpendingPage").then((m) => ({ default: m.UnusualSpendingPage })));
const InvestmentOpportunityPage = lazy(() => import("@/features/insights/pages/InvestmentOpportunityPage").then((m) => ({ default: m.InvestmentOpportunityPage })));
const GoalsPage = lazy(() => import("@/features/goals/pages/GoalsPage").then((m) => ({ default: m.GoalsPage })));
const GoalDetailPage = lazy(() => import("@/features/goals/pages/GoalDetailPage").then((m) => ({ default: m.GoalDetailPage })));
const ConnectPage = lazy(() => import("@/features/connect/pages/ConnectPage").then((m) => ({ default: m.ConnectPage })));
const ExplorePage = lazy(() => import("@/features/explore/pages/ExplorePage").then((m) => ({ default: m.ExplorePage })));
const ToolPage = lazy(() => import("@/features/explore/pages/ToolPage").then((m) => ({ default: m.ToolPage })));
const AssistantPage = lazy(() => import("@/features/assistant/pages/AssistantPage").then((m) => ({ default: m.AssistantPage })));
const SettingsPage = lazy(() => import("@/features/settings/pages/SettingsPage").then((m) => ({ default: m.SettingsPage })));
const PlansPage = lazy(() => import("@/features/plans/pages/PlansPage").then((m) => ({ default: m.PlansPage })));
const NotFoundPage = lazy(() => import("@/features/not-found/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));
const LandingPage = lazy(() => import("@/features/landing/pages/LandingPage").then((m) => ({ default: m.LandingPage })));

function PageSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4 p-6 animate-pulse" aria-label="Loading page content">
      <div className="h-8 w-48 bg-slate-200/80 rounded-md" />
      <div className="h-4 w-72 bg-slate-200/60 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="h-40 bg-slate-200/60 rounded-2xl" />
        <div className="h-40 bg-slate-200/60 rounded-2xl" />
        <div className="h-40 bg-slate-200/60 rounded-2xl" />
      </div>
      <div className="h-64 bg-slate-200/50 rounded-2xl mt-4" />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        {/* Landing page is the entry point */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/money" element={<MoneyPage />} />
          <Route path="/activity" element={<RecentActivityPage />} />
          <Route path="/health" element={<HealthBreakdownPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/savings-rate-above-average" element={<SavingsRateAboveAveragePage />} />
          <Route path="/insights/unusual-spending" element={<UnusualSpendingPage />} />
          <Route path="/insights/investment-opportunity" element={<InvestmentOpportunityPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/goals/:id" element={<GoalDetailPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:category" element={<ExplorePage />} />
          <Route path="/explore/:category/:tool" element={<ToolPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/plans" element={<PlansPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
