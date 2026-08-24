/**
 * VEYRA — Alert
 * Source: design_system/Components/Alerts.md
 *
 * Structure: Icon → Title → Description → Action → Close
 * Variants: info | success | warning | error
 *
 * Rules:
 * - Icon: 18px
 * - Use semantic color tokens
 * - Accessible without color (icon + text)
 * - Keyboard accessible
 * - Screen reader support
 */

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

const alertVariants = cva(
  [
    "relative flex items-start gap-[var(--spacing-sm)]",
    "w-full rounded-[var(--radius-md)]",
    "border",
    "p-[var(--spacing-md)]",
    "transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-fast)]",
  ],
  {
    variants: {
      variant: {
        info: [
          "bg-[var(--color-info-soft)] border-[var(--color-info)]/20",
          "text-[var(--color-info)]",
        ],
        success: [
          "bg-[var(--color-success-soft)] border-[var(--color-success)]/20",
          "text-[var(--color-success)]",
        ],
        warning: [
          "bg-[var(--color-warning-soft)] border-[var(--color-warning)]/20",
          "text-[var(--color-warning)]",
        ],
        error: [
          "bg-[var(--color-error-soft)] border-[var(--color-error)]/20",
          "text-[var(--color-error)]",
        ],
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const iconMap: Record<string, React.ComponentType<{ size: number; strokeWidth: number; "aria-hidden": boolean; className?: string }>> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

const srLabelMap: Record<string, string> = {
  info: "Information",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", title, description, action, onClose, children, ...props }, ref) => {
    const Icon = iconMap[variant ?? "info"];
    const srLabel = srLabelMap[variant ?? "info"];

    return (
      <div
        ref={ref}
        role="alert"
        aria-live={variant === "error" ? "assertive" : "polite"}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon size={18} strokeWidth={2} aria-hidden={true} className="shrink-0 mt-[2px]" />
        <div className="flex-1 min-w-0">
          <span className="sr-only">{srLabel}: </span>
          {title && (
            <p className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]">
              {title}
            </p>
          )}
          {description && (
            <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)] mt-[var(--spacing-2xs)]">
              {description}
            </p>
          )}
          {children}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                "mt-[var(--spacing-sm)]",
                "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
                "text-[var(--color-primary)] underline-offset-2 hover:underline",
                "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
                "focus-visible:outline-offset-[var(--focus-ring-offset)]"
              )}
            >
              {action.label}
            </button>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss alert"
            className={cn(
              "shrink-0 rounded-[var(--radius-sm)] p-[var(--spacing-2xs)]",
              "text-[var(--color-text-secondary)]",
              "hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
            )}
          >
            <X size={16} strokeWidth={2} aria-hidden={true} />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
