/**
 * VEYRA - WelcomeSection
 */

import { TrendingUp, PiggyBank, ArrowUpRight, ArrowUp } from "lucide-react";
import { PageHeader } from "../components/PageHeader";

interface WelcomeSectionProps {
  userName?: string;
}

export function WelcomeSection({ userName }: WelcomeSectionProps) {
  return (
    <div className="relative">
      {/* White money-planning symbols on brand blue — right of the greeting.
          Inline styles only: guaranteed rendering regardless of utility
          generation, breakpoints, or theme variable resolution. */}
      <div
        aria-hidden="true"
        className="hidden md:flex items-center gap-3"
        style={{ position: "absolute", right: "4%", top: "50%", transform: "translateY(-50%)" }}
      >
        <span
          style={{
            position: "absolute",
            left: "-38px",
            top: "-16px",
            display: "inline-flex",
          }}
        >
          <ArrowUp size={14} strokeWidth={2.5} color="rgba(33,83,230,0.45)" />
        </span>
        <span
          style={{
            position: "absolute",
            left: "-18px",
            bottom: "-20px",
            display: "inline-flex",
          }}
        >
          <ArrowUpRight size={12} strokeWidth={2.5} color="rgba(33,83,230,0.6)" />
        </span>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 9999,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(33,83,230,0.10)",
            border: "1px solid rgba(33,83,230,0.25)",
          }}
        >
          <PiggyBank size={14} strokeWidth={2} color="#2153E6" />
        </span>
        <span
          style={{
            width: 56,
            height: 56,
            borderRadius: 20,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            background: "linear-gradient(140deg, #3D68F0 0%, #2153E6 55%, #12379B 100%)",
            boxShadow: "0 16px 36px -12px rgba(33,83,230,0.6)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <TrendingUp size={26} strokeWidth={2.2} />
        </span>
      </div>

      <div className="relative z-10">
        <PageHeader userName={userName} />
      </div>
    </div>
  );
}