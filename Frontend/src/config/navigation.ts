import {
  LayoutDashboard,
  Landmark,
  Lightbulb,
  Target,
  Link,
  Compass,
  Bot,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export const mainNavigation: NavGroup[] = [
  {
    items: [
      { label: "Home", href: "/", icon: LayoutDashboard },
      { label: "Money", href: "/money", icon: Landmark },
      { label: "Insights", href: "/insights", icon: Lightbulb },
      { label: "Goals", href: "/goals", icon: Target },
      { label: "Connect", href: "/connect", icon: Link },
      { label: "Explore", href: "/explore", icon: Compass },
    ],
  },
  {
    label: "AI",
    items: [
      { label: "Assistant", href: "/assistant", icon: Bot },
    ],
  },
];

export const secondaryNavigation: NavGroup[] = [
  {
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
