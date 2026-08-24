/**
 * VEYRA — useFocusTrap
 *
 * Keyboard accessibility primitive used by Dialogs, Drawers and Menus.
 *
 * Behavior (per design_system/technical/accessibility.md + States/Focud.md):
 * - When active: move focus inside the container (or to initialFocusRef).
 * - Trap Tab / Shift+Tab within the container while open.
 * - On deactivate (close/unmount): restore focus to the previously
 *   focused element (the trigger), so focus is never lost.
 * - Optionally handle Escape via onEscape.
 */

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export interface FocusTrapOptions {
  /** Called when Escape is pressed inside the container. */
  onEscape?: () => void;
  /** Element to focus when the trap activates (defaults to first focusable). */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Restore focus to the previous element on deactivate (default true). */
  restoreFocus?: boolean;
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
}

export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  containerRef: RefObject<T | null>,
  options: FocusTrapOptions = {}
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onEscapeRef = useRef(options.onEscape);

  // Keep the latest onEscape without re-running the trap effect on every render.
  useEffect(() => {
    onEscapeRef.current = options.onEscape;
  }, [options.onEscape]);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const focusables = getFocusable(container);
    const initial =
      options.initialFocusRef?.current ?? focusables[0] ?? container;

    if (initial === container && !container.hasAttribute("tabindex")) {
      container.setAttribute("tabindex", "-1");
    }
    initial.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onEscapeRef.current?.();
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable(container);
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      if (options.restoreFocus !== false) {
        previouslyFocused.current?.focus?.();
      }
    };
  }, [active, containerRef, options.initialFocusRef, options.restoreFocus]);
}
