import { useNavigate } from "react-router";
import { Button } from "@/components/ui/Button/Button";
import { cn } from "@/lib/cn";
import { Bot } from "lucide-react";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "min-h-[60vh]",
        "gap-[var(--spacing-md)]",
        "py-[var(--spacing-4xl)] px-[var(--spacing-lg)]"
      )}
    >
      <div
        className="flex items-center justify-center rounded-[var(--radius-lg)]"
        style={{
          width: "64px",
          height: "64px",
          backgroundColor: "var(--color-surface-2)",
        }}
        aria-hidden="true"
      >
        <Bot size={32} strokeWidth={2} color="var(--color-text-tertiary)" />
      </div>

      <div className="flex flex-col gap-[var(--spacing-2xs)]">
        <h1 className="text-[length:var(--typography-h1-size)] font-[var(--typography-h1-weight)] text-[var(--color-text-primary)]">
          Page not found
        </h1>
        <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)] max-w-[360px]">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>

      <div className="flex gap-[var(--spacing-sm)] mt-[var(--spacing-sm)]">
        <Button variant="primary" size="sm" onClick={() => navigate("/")}>
          Go to Home
        </Button>
        <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
