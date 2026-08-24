import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import type { AuthStep } from "../types";

interface AuthenticationFormProps {
  step: AuthStep;
  onSubmit: (data: { username: string; password: string }) => void;
  onCancel?: () => void;
  className?: string;
}

export function AuthenticationForm({
  step,
  onSubmit,
  onCancel,
  className
}: AuthenticationFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setIsLoading(true);
    setTimeout(() => {
      onSubmit({ username, password });
      setIsLoading(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-[var(--spacing-md)]", className)}>
      <div>
        <h2 className="text-[length:var(--typography-h2-size)] font-[var(--typography-h2-weight)] text-[var(--color-text-primary)] mb-[var(--spacing-xs)]">
          {step.title}
        </h2>
        <p className="text-[length:var(--typography-body-size)] text-[var(--color-text-secondary)]">
          {step.description}
        </p>
      </div>

      <div className="space-y-[var(--spacing-sm)]">
        <div>
          <label htmlFor="username" className="block text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)] mb-[var(--spacing-2xs)]">
            {step.fieldLabel}
          </label>
          <Input
            id="username"
            type="text"
            placeholder={step.fieldPlaceholder}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)] mb-[var(--spacing-2xs)]">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex gap-[var(--spacing-sm)]">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" loading={isLoading}>
          Continue
        </Button>
      </div>
    </form>
  );
}