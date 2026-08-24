/**
 * VEYRA — Dialog
 * Source: design_system/Components/Dialog.md
 *
 * Foundation: shadcn/ui Dialog pattern
 *
 * Rules:
 * - Short focused interaction
 * - Focus trapping
 * - Escape to close
 * - Focus restoration
 * - Close icon: Lucide X, 20px, 44x44px touch target
 * - Responsive width (mobile: full width with margin)
 * - Loading state disables submit
 */

import { forwardRef, useRef } from "react";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open, children }: DialogProps) {
  if (!open) return null;

  return <DialogPortal>{children}</DialogPortal>;
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[var(--z-modal)]">{children}</div>;
}

const DialogOverlay = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-[var(--z-overlay)]",
        "bg-black/40",
        "pointer-events-none",
        "transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-fast)]",
        className
      )}
      {...props}
    />
  )
);
DialogOverlay.displayName = "DialogOverlay";

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onEscapeKeyDown?: () => void;
  onInteractOutside?: () => void;
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, onEscapeKeyDown, onInteractOutside, children, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);

    // Move focus inside, trap Tab, and restore focus on close.
    // DialogContent is only mounted while the dialog is open, so the trap
    // is active for its whole lifetime and restores focus on unmount.
    useFocusTrap(true, innerRef);

    // Handle escape key
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onEscapeKeyDown?.();
      }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onInteractOutside?.();
      }
    };

    const setRefs = (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node;
    };

    return (
      <>
        <div
          className="fixed inset-0 bg-black/40"
          aria-hidden="true"
          onClick={onInteractOutside}
        />
        <div
          className="fixed inset-0 flex items-center justify-center p-[var(--spacing-md)] md:p-[var(--spacing-xl)]"
          style={{ pointerEvents: 'none' }}
        >
          <div
            ref={setRefs}
            role="dialog"
            aria-modal="true"
            onKeyDown={handleKeyDown}
            className={cn(
              "relative",
              "w-full max-w-lg",
              "bg-[var(--color-surface-1)]",
              "border border-[var(--color-border)]",
              "rounded-[var(--radius-xl)]",
              "shadow-[var(--shadow-overlay)]",
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-normal)]",
              "max-h-[85vh] overflow-y-auto",
              className
            )}
            style={{ pointerEvents: 'auto' }}
            onClick={handleBackdropClick}
            {...props}
          >
            {children}
          </div>
        </div>
      </>
    );
  }
);
DialogContent.displayName = "DialogContent";

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  onClose?: () => void;
}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, title, description, onClose, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-start justify-between gap-[var(--spacing-md)]",
        "p-[var(--spacing-xl)] pb-0",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">
        <h2 className="text-[length:var(--typography-h3-size)] font-[var(--typography-h3-weight)] text-[var(--color-text-primary)] leading-[var(--typography-h3-line)]">
          {title}
        </h2>
        {description && (
          <p className="text-[length:var(--typography-body-sm-size)] text-[var(--color-text-secondary)] mt-[var(--spacing-2xs)]">
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className={cn(
            "shrink-0 rounded-[var(--radius-md)] p-[var(--spacing-xs)]",
            "text-[var(--color-text-secondary)]",
            "hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]",
            "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
            "focus-visible:outline-offset-[var(--focus-ring-offset)]",
            "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
          )}
        >
          <X size={20} strokeWidth={2} aria-hidden={true} />
        </button>
      )}
    </div>
  )
);
DialogHeader.displayName = "DialogHeader";

const DialogBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-[var(--spacing-xl)] py-[var(--spacing-lg)]", className)}
      {...props}
    />
  )
);
DialogBody.displayName = "DialogBody";

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    destructive?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, primaryAction, secondaryAction, ...props }, ref) => {
    if (!primaryAction && !secondaryAction) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-[var(--spacing-sm)]",
          "p-[var(--spacing-xl)] pt-0",
          className
        )}
        {...props}
      >
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className={cn(
              "inline-flex items-center justify-center",
              "h-10 px-[var(--spacing-md)]",
              "rounded-[var(--radius-button)]",
              "bg-[var(--color-surface-2)] border border-[var(--color-border)]",
              "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
              "text-[var(--color-text-primary)]",
              "hover:bg-[var(--color-surface-3)]",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]"
            )}
          >
            {secondaryAction.label}
          </button>
        )}
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled || primaryAction.loading}
            className={cn(
              "inline-flex items-center justify-center gap-[var(--spacing-xs)]",
              "h-10 px-[var(--spacing-md)]",
              "rounded-[var(--radius-button)]",
              "text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)]",
              "focus-visible:outline-[var(--focus-ring-width)] focus-visible:outline-[var(--focus-ring-color)]",
              "focus-visible:outline-offset-[var(--focus-ring-offset)]",
              "disabled:opacity-40 disabled:pointer-events-none",
              "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
              primaryAction.destructive
                ? "bg-[var(--color-error)] text-white hover:opacity-90"
                : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
            )}
          >
            {primaryAction.loading && (
              <span
                className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                aria-hidden="true"
              />
            )}
            {primaryAction.label}
          </button>
        )}
      </div>
    );
  }
);
DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
};
