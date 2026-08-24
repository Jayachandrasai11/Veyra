/**
 * VEYRA — ErrorBoundary
 *
 * Catches runtime render crashes and shows a branded fallback
 * instead of a white screen. Class component is required
 * (React has no hook equivalent for componentDidCatch).
 */

import { Component, type ReactNode } from "react";
import { VeyraMark } from "@/components/brand/VeyraBrand";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    // Surface for host-level logging (e.g. platform log drains)
    console.error("Veyra render error:", error);
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center"
        style={{ background: "linear-gradient(180deg, #F7F9FF 0%, #EEF3FE 100%)" }}
      >
        <VeyraMark size={56} />
        <div>
          <h1 className="text-[length:var(--typography-h2-size)] font-bold text-[var(--color-text-primary)] tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-2 text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-md">
            An unexpected error interrupted your session. Reloading usually fixes it — your data is safe.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex h-11 px-6 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Reload Veyra
        </button>
      </div>
    );
  }
}
