import { cn } from "@/lib/cn";
import { Check } from "lucide-react";
import type { Institution } from "../types";

interface InstitutionPickerProps {
  institutions: Institution[];
  selectedId?: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function InstitutionPicker({
  institutions,
  selectedId,
  onSelect,
  className
}: InstitutionPickerProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {institutions.map((inst) => {
        const isSelected = inst.id === selectedId;
        return (
          <button
            key={inst.id}
            onClick={() => onSelect(inst.id)}
            className={cn(
              "w-full flex items-center gap-[var(--spacing-md)] card-hover",
              "rounded-[var(--radius-lg)] border",
              isSelected
                ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/25 bg-[var(--color-primary-soft)]/40"
                : "border-[var(--color-border)] bg-[var(--color-surface-1)] hover:border-[var(--color-primary)]",
              "px-[var(--spacing-lg)] py-[var(--spacing-md)] text-left cursor-pointer",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)] focus-visible:outline-offset-[var(--focus-ring-offset)]"
            )}
          >
            {/* Institution chip */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[var(--color-border)] shrink-0">
              {inst.logo}
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-[length:var(--typography-label-size)] font-semibold text-[var(--color-text-primary)] truncate">
                {inst.name}
              </div>
              <div className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)]">
                {inst.type === "bank" ? "Bank Account" :
                 inst.type === "investment" ? "Investment Account" :
                 "Credit Account"}
              </div>
            </div>
            {isSelected && (
              <span
                aria-hidden="true"
                className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white"
              >
                <Check size={14} strokeWidth={3} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}