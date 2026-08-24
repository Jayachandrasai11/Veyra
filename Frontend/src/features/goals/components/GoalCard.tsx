/**
 * VEYRA — GoalCard
 * Source: design_system/Patterns/Goal.md
 * design_system/Components/card.md
 * design_system/Components/Dropdown.md
 * design_system/Interaction/Dopmenu.md
 * design_system/Interaction/Goalbehv.md
 *
 * Goal card for the Goals collection page.
 *
 * Interaction:
 * - Clicking the main card → Goal Details (mouse + keyboard).
 * - Overflow menu (real button, aria-label "Goal actions") exposes
 *   View goal / Edit goal / Delete goal and must NOT trigger card navigation.
 * - Menu is keyboard accessible; Delete is a destructive item.
 */

import { useState } from "react";
import { useNavigate } from "react-router";
import { MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card/Card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/Dropdown/Dropdown";
import { Progress } from "@/components/ui/Progress/Progress";
import { formatCurrency } from "@/lib/format";
import { goalTypeIcons, statusLabels, type Goal } from "../types";
import type { Surface } from "@/components/ui/Card/Card";

const goalSurface: Record<Goal["status"], Surface> = {
  completed: "green",
  "over-target": "green",
  ahead: "green",
  "on-track": "green",
  "near-target": "sky",
  "in-progress": "default",
  "not-started": "slate",
  paused: "slate",
  "at-risk": "warm",
};

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
}

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const progress = Math.min(
    Math.round((goal.currentAmount / goal.targetAmount) * 100) || 0,
    100
  );
  const Icon = goalTypeIcons[goal.type];

  const goToDetail = () => navigate(`/goals/${goal.id}`);

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToDetail();
    }
  };

  return (
    <Card interactive className="relative card-hover" surface={goalSurface[goal.status]}>
      <div
        role="button"
        tabIndex={0}
        onClick={goToDetail}
        onKeyDown={handleCardKeyDown}
        aria-label={`View ${goal.title} goal`}
        className="flex flex-col gap-[var(--spacing-sm)] p-[var(--spacing-lg)] cursor-pointer rounded-[var(--radius-card)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
      >
        <div className="flex items-center justify-between gap-[var(--spacing-sm)]">
          <div className="flex items-center gap-[var(--spacing-sm)] min-w-0">
            <span className="flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-surface-2)] h-9 w-9 shrink-0">
              <Icon size={18} strokeWidth={2} aria-hidden="true" className="text-[var(--color-text-secondary)]" />
            </span>
            <h3 className="text-[length:var(--typography-h3-size)] font-semibold text-[var(--color-text-primary)] truncate">
              {goal.title}
            </h3>
          </div>
          <span className="shrink-0 text-[length:var(--typography-body-sm-size)] font-semibold text-[var(--color-text-secondary)] tabular-nums">
            {progress}%
          </span>
        </div>

        <div className="flex items-center justify-between gap-[var(--spacing-sm)] text-sm text-[var(--color-text-secondary)]">
          <span className="tabular-nums">
            {formatCurrency(goal.currentAmount, { compact: true })} / {formatCurrency(goal.targetAmount, { compact: true })}
          </span>
          <span className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]">
            {statusLabels[goal.status]}
          </span>
        </div>

        <Progress value={progress} label={`${goal.title}: ${progress}% progress`} />
      </div>

      {/* Overflow actions — aligned to card content padding */}
      <div className="absolute right-[var(--spacing-lg)] top-[var(--spacing-lg)]">
        <DropdownMenu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          align="end"
          trigger={
            <DropdownMenuTrigger
              aria-label="Goal actions"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((o) => !o);
              }}
              className="flex items-center justify-center h-10 w-10 min-h-[44px] min-w-[44px] rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)] focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)] transition-colors"
            >
              <MoreVertical size={20} strokeWidth={2} aria-hidden="true" />
            </DropdownMenuTrigger>
          }
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
              goToDetail();
            }}
          >
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
            View goal
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
              onEdit(goal);
            }}
          >
            <Pencil size={16} strokeWidth={2} aria-hidden="true" />
            Edit goal
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            destructive
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(false);
              onDelete(goal);
            }}
          >
            <Trash2 size={16} strokeWidth={2} aria-hidden="true" />
            Delete goal
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </Card>
  );
}
