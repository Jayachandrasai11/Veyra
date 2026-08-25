/**
 * Fermor/Veyra — Assistant Page
 * Source: design_system/Interaction/Conversation.md
 *         design_system/Components/AI_components.md
 *
 * Full-page Ask Veyra experience (entry point "assistant").
 * Reuses the same state-driven AskFermorInterface as the
 * header-triggered panel, so behavior stays consistent.
 *
 * Design system: icon-chip header like every other page, and a
 * softly framed conversation canvas on the lavender AI surface.
 */

import { useNavigate } from "react-router";
import { Sparkles } from "lucide-react";
import { AskFermorInterface } from "../AskFermorInterface";

export function AssistantPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[var(--spacing-lg)] pt-[var(--spacing-lg)]">
      {/* Page header */}
      <header className="flex items-start gap-[var(--spacing-md)]">
        <span
          className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-soft)]"
          aria-hidden="true"
        >
          <Sparkles size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
        </span>
        <div className="flex flex-col gap-[var(--spacing-2xs)] min-w-0">
          <p className="text-app-label uppercase tracking-[var(--app-label-tracking)] text-[var(--color-text-secondary)]">
            Veyra Intelligence
          </p>
          <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] leading-[var(--typography-h1-line)] tracking-[var(--typography-h1-tracking)] text-[var(--color-text-primary)]">
            Ask Veyra
          </h1>
          <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[60ch]">
            Your money copilot — ask about spending, goals, or what to do next.
          </p>
        </div>
      </header>

      {/* Conversation canvas */}
      <div
        className="h-[calc(100vh-17rem)] min-h-[480px] rounded-[var(--radius-card)] border border-[#D9E6FA] overflow-hidden shadow-[0_24px_60px_-28px_rgba(11,31,58,0.25)]"
        style={{
          background:
            "linear-gradient(180deg, var(--color-surface-lavender) 0%, #FFFFFF 42%)",
        }}
      >
        <AskFermorInterface
          context={{ entryPoint: "assistant" }}
          onClose={() => navigate("/dashboard")}
          autoFocus
        />
      </div>
    </div>
  );
}
