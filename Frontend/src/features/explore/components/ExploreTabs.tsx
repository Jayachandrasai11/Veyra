/**
 * VEYRA — Explore Category Tabs
 * Source: design_system/Components/Tabs.md
 *         design_system/Interaction/navigation.md
 *
 * Filter Explore by category. The active tab is driven by
 * the URL (source of truth for active navigation), not local state.
 */

import { Tabs, TabsTrigger } from "@/components/ui/Tabs/Tabs";
import { useNavigate, useParams } from "react-router";
import { exploreCategories } from "../exploreData";

export function ExploreTabs() {
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>();
  const active = category ?? "all";

  const tabs = [
    { id: "all", label: "All" },
    ...exploreCategories.map((c) => ({ id: c.id, label: c.name })),
  ];

  return (
    <Tabs
      variant="underline"
      value={active}
      onValueChange={(value) =>
        navigate(value === "all" ? "/explore" : `/explore/${value}`)
      }
      className="max-w-full"
      aria-label="Filter Explore by category"
    >
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          active={active === tab.id}
          onClick={() => navigate(tab.id === "all" ? "/explore" : `/explore/${tab.id}`)}
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </Tabs>
  );
}
