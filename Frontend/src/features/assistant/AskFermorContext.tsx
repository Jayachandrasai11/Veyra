/**
 * VEYRA — Ask Veyra Context
 * Source: design_system/Interaction/Conversation.md (rules 18–22, 34)
 *
 * Global open/close state for the Ask Veyra panel so any
 * trigger (header, insight, goal, explore…) can open it with
 * the correct context. Restores focus to the trigger on close.
 */

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import type { AskFermorContextValue } from "./types";

interface AskFermorContextState {
  open: boolean;
  context: AskFermorContextValue;
  openAskFermor: (ctx?: Partial<AskFermorContextValue>) => void;
  closeAskFermor: () => void;
}

const AskFermorContext = createContext<AskFermorContextState | null>(null);

export function AskFermorProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<AskFermorContextValue>({
    entryPoint: "header",
  });
  const lastFocused = useRef<HTMLElement | null>(null);

  const openAskFermor = useCallback((ctx?: Partial<AskFermorContextValue>) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setContext({ entryPoint: "header", ...ctx });
    setOpen(true);
  }, []);

  const closeAskFermor = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus?.();
  }, []);

  return (
      <AskFermorContext.Provider value={{ open, context, openAskFermor, closeAskFermor }}>
      {children}
    </AskFermorContext.Provider>
  );
}

export function useAskFermor(): AskFermorContextState {
  const ctx = useContext(AskFermorContext);
  if (!ctx) throw new Error("useAskFermor must be used within an AskFermorProvider");
  return ctx;
}
