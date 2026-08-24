/**
 * VEYRA — Input Primitives
 * Source: design_system/Components/inputs_forms.md
 *
 * Foundation: shadcn/ui Input pattern
 *
 * Rules:
 * - Height: 44px default, 48px mobile touch targets
 * - Border: 1px
 * - Radius: --radius-md
 * - States: default | hover | focus | disabled | error | success
 * - Accessible label required (no placeholder-as-label)
 * - Uses React Hook Form + Zod for validation
 */

import { forwardRef, cloneElement, Children } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const inputVariants = cva(
  [
    "flex w-full",
    "rounded-[var(--radius-input)]",
    "border border-[var(--color-border)]",
    "bg-[var(--color-surface-1)]",
    "text-[length:var(--typography-body-size)] text-[var(--color-text-primary)]",
    "placeholder:text-[var(--color-text-disabled)]",
    "transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-fast)]",
    "focus-visible:outline-none",
    "focus-visible:border-[var(--color-primary)]",
    "focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[var(--focus-ring-color)]",
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-[var(--color-surface-2)]",
    "file:border-0 file:bg-transparent file:text-[length:var(--typography-body-sm-size)] file:font-medium",
  ],
  {
    variants: {
      size: {
        default: "h-11 px-[var(--spacing-sm)]",
        sm: "h-9 px-[var(--spacing-xs)] text-[length:var(--typography-body-sm-size)]",
        lg: "h-12 px-[var(--spacing-md)]",
      },
      state: {
        default: "",
        error: [
          "border-[var(--color-error)]",
          "focus-visible:border-[var(--color-error)]",
          "focus-visible:ring-[var(--color-error)]",
        ],
        success: [
          "border-[var(--color-success)]",
          "focus-visible:border-[var(--color-success)]",
          "focus-visible:ring-[var(--color-success)]",
        ],
      },
    },
    defaultVariants: {
      size: "default",
      state: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, state, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(inputVariants({ size, state }), className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

/* ─── Input Wrapper (with label, error, helper) ──────────────── */

interface InputWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

function InputWrapper({
  label,
  htmlFor,
  required,
  error,
  helperText,
  children,
  className,
}: InputWrapperProps) {
  const id = htmlFor;
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const describedById = error ? errorId : helperText ? helperId : undefined;

  // Attach the error/helper description and invalid state to the control
  // so screen readers announce them (InputWrapper owns the message text).
  const control = Children.only(children) as React.ReactElement<Record<string, unknown>>;
  const enhancedControl = cloneElement(control, {
    "aria-describedby": describedById,
    "aria-invalid": error ? true : undefined,
  });

  return (
    <div className={cn("flex flex-col gap-[var(--spacing-2xs)]", className)}>
      <label
        htmlFor={id}
        className="text-[length:var(--typography-label-size)] font-[var(--typography-label-weight)] text-[var(--color-text-primary)]"
      >
        {label}
        {required && (
          <span className="text-[var(--color-error)] ml-[2px]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {enhancedControl}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-[length:var(--typography-caption-size)] text-[var(--color-error)]"
        >
          {error}
        </p>
      )}
      {helperText && !error && (
        <p
          id={helperId}
          className="text-[length:var(--typography-caption-size)] text-[var(--color-text-tertiary)]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

/* ─── Textarea ─────────────────────────────────────────────── */

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: "default" | "error" | "success";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state = "default", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          inputVariants({ state }),
          "min-h-[88px] py-[var(--spacing-sm)] resize-y",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, InputWrapper, Textarea, inputVariants };
