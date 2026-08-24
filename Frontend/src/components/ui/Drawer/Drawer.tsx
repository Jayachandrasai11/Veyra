/**
 * VEYRA — Drawer / Sheet
 * Source: design_system/Components/Drawer.md
 *
 * Foundation: shadcn/ui Sheet pattern
 *
 * Rules:
 * - Side navigation: left/right
 * - Contextual mobile actions: bottom
 * - Width: 280-320px (side)
 * - Overlay: subtle background
 * - Close: Lucide X, 20px, 44x44px touch target
 * - Focus management + Escape + focus restoration
 * - No bounce, controlled slide + opacity
 */

import { forwardRef, useRef } from "react";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type DrawerDirection = "left" | "right" | "bottom";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  direction?: DrawerDirection;
  children: React.ReactNode;
}

function Drawer({ open, direction = "left", children }: DrawerProps) {
  if (!open) return null;

  return <DrawerPortal direction={direction}>{children}</DrawerPortal>;
}

function DrawerPortal({ children }: { direction: DrawerDirection; children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[var(--z-modal)]">{children}</div>;
}

interface DrawerOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, onClick, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      onClick={onClick}
      className={cn(
        "fixed inset-0 z-[var(--z-overlay)]",
        "bg-black/40",
        "transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-fast)]",
        className
      )}
      {...props}
    />
  )
);
DrawerOverlay.displayName = "DrawerOverlay";

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: DrawerDirection;
  onEscapeKeyDown?: () => void;
  onInteractOutside?: () => void;
}

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, direction = "left", onEscapeKeyDown, onInteractOutside, children, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);

    // Move focus inside, trap Tab, and restore focus on close.
    // DrawerContent is only mounted while the drawer is open, so the trap
    // is active for its whole lifetime and restores focus on unmount.
    useFocusTrap(true, innerRef);

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

    const directionClasses = {
      left: [
        "top-0 left-0 h-full",
        "w-[var(--sidebar-width)]",
        "transition-transform duration-[var(--duration-normal)] ease-[var(--ease-normal)]",
        "data-[state=open]:translate-x-0 -translate-x-full",
      ],
      right: [
        "top-0 right-0 h-full",
        "w-[280px] sm:w-[320px]",
        "transition-transform duration-[var(--duration-normal)] ease-[var(--ease-normal)]",
        "data-[state=open]:translate-x-0 translate-x-full",
      ],
      bottom: [
        "bottom-0 left-0 right-0",
        "max-h-[85vh] rounded-t-[var(--radius-xl)]",
        "transition-transform duration-[var(--duration-normal)] ease-[var(--ease-normal)]",
        "data-[state=open]:translate-y-0 translate-y-full",
      ],
    };

    return (
      <div
        className="fixed inset-0 z-[var(--z-modal)]"
        onClick={handleBackdropClick}
      >
        <DrawerOverlay />
        <div
          ref={setRefs}
          role="dialog"
          aria-modal="true"
          data-state="open"
          onKeyDown={handleKeyDown}
          className={cn(
            "fixed z-[var(--z-modal)]",
            "flex flex-col",
            "bg-[var(--color-surface-1)]",
            "shadow-[var(--shadow-overlay)]",
            directionClasses[direction],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);
DrawerContent.displayName = "DrawerContent";

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  onClose?: () => void;
}

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, title, description, onClose, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-start justify-between gap-[var(--spacing-md)]",
        "p-[var(--spacing-lg)] pb-0",
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
          aria-label="Close drawer"
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
DrawerHeader.displayName = "DrawerHeader";

const DrawerBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto p-[var(--spacing-lg)]",
        className
      )}
      {...props}
    />
  )
);
DrawerBody.displayName = "DrawerBody";

const DrawerFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-[var(--spacing-sm)] p-[var(--spacing-lg)] pt-0",
        className
      )}
      {...props}
    />
  )
);
DrawerFooter.displayName = "DrawerFooter";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
};
