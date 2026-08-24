/**
 * VEYRA — Ask Veyra Session Hook
 * Source: design_system/States/Aistates.md
 *         design_system/Interaction/Conversation.md
 *         design_system/Technical/ai.md
 *
 * One state-driven session (per Aistates rule: do not build a
 * component per state). Drives:
 *   idle → thinking → streaming → complete
 *   clarification (assistant asks for more)
 *   error (with retry recovery)
 *   rate-limited (burst protection + cooldown)
 *
 * Responses are mocked via generateMockResponse. No network.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { generateMockResponse, getInitialSuggestions } from "./mockResponses";
import type {
  AskFermorContextValue,
  AskFermorStatus,
  FermorMessage,
} from "./types";

const THINKING_MS = 700;
const STREAM_CHUNK = 3;
const STREAM_TICK_MS = 18;
const RATE_WINDOW_MS = 12_000;
const RATE_MAX_ATTEMPTS = 4;
const RATE_COOLDOWN_S = 8;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface UseAskFermorSession {
  messages: FermorMessage[];
  status: AskFermorStatus;
  input: string;
  setInput: (value: string) => void;
  send: (text: string) => void;
  retry: () => void;
  rateLimitSeconds: number;
  initialSuggestions: string[];
}

export function useAskFermorSession(
  context: AskFermorContextValue
): UseAskFermorSession {
  const [messages, setMessages] = useState<FermorMessage[]>([]);
  const [status, setStatus] = useState<AskFermorStatus>("idle");
  const [input, setInput] = useState("");
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  const idRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const attemptsRef = useRef<number[]>([]);
  const cooldownRef = useRef<number | null>(null);
  const lastUserTextRef = useRef<string>("");

  const nextId = () => `m${++idRef.current}`;
  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Clean up any pending timers on unmount.
  useEffect(() => {
    return () => {
      clearTimer();
      if (cooldownRef.current !== null) window.clearInterval(cooldownRef.current);
    };
  }, []);

  const initialSuggestions = getInitialSuggestions(
    context.entryPoint,
    context.sourceLabel
  );

  const enterRateLimit = useCallback(() => {
    setStatus("rate-limited");
    setRateLimitSeconds(RATE_COOLDOWN_S);
    if (cooldownRef.current !== null) window.clearInterval(cooldownRef.current);
    cooldownRef.current = window.setInterval(() => {
      setRateLimitSeconds((s) => {
        if (s <= 1) {
          if (cooldownRef.current !== null) window.clearInterval(cooldownRef.current);
          cooldownRef.current = null;
          setStatus((prev) => (prev === "rate-limited" ? "complete" : prev));
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, []);

  const finishStream = useCallback(
    (msgId: string, result: ReturnType<typeof generateMockResponse>) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msgId
            ? {
                ...m,
                content: result.content,
                status: "complete",
                clarification: result.kind === "clarification",
                suggestions: result.suggestions,
              }
            : m
        )
      );
      setStatus(result.kind === "clarification" ? "clarification" : "complete");
    },
    []
  );

  const runAssistant = useCallback(
    (userText: string, retry: boolean) => {
      setStatus("thinking");
      const result = generateMockResponse({
        text: userText,
        entryPoint: context.entryPoint,
        sourceLabel: context.sourceLabel,
        retry,
      });

      window.setTimeout(() => {
        if (result.kind === "error") {
          setMessages((prev) => [
            ...prev,
            {
              id: nextId(),
              role: "assistant",
              content: result.content,
              status: "error",
              suggestions: result.suggestions,
            },
          ]);
          setStatus("error");
          return;
        }

        const msgId = nextId();
        setMessages((prev) => [
          ...prev,
          { id: msgId, role: "assistant", content: "", status: "streaming" },
        ]);
        setStatus("streaming");

        if (prefersReducedMotion()) {
          finishStream(msgId, result);
          return;
        }
        const full = result.content;
        let i = 0;
        const tick = () => {
          i = Math.min(full.length, i + STREAM_CHUNK);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, content: full.slice(0, i) } : m
            )
          );
          if (i < full.length) {
            timerRef.current = window.setTimeout(tick, STREAM_TICK_MS);
          } else {
            finishStream(msgId, result);
          }
        };
        timerRef.current = window.setTimeout(tick, STREAM_TICK_MS);
      }, THINKING_MS);
    },
    [context.entryPoint, context.sourceLabel, finishStream]
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;
      if (status === "thinking" || status === "streaming" || status === "rate-limited") {
        return;
      }

      // Burst protection: throttle excessive rapid sends.
      const now = Date.now();
      attemptsRef.current = attemptsRef.current.filter(
        (t) => now - t < RATE_WINDOW_MS
      );
      attemptsRef.current.push(now);
      if (attemptsRef.current.length > RATE_MAX_ATTEMPTS) {
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "user", content: text, status: "complete" },
        ]);
        lastUserTextRef.current = text;
        enterRateLimit();
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", content: text, status: "complete" },
      ]);
      lastUserTextRef.current = text;
      setInput("");
      runAssistant(text, false);
    },
    [status, runAssistant, enterRateLimit]
  );

  const retry = useCallback(() => {
    if (status === "thinking" || status === "streaming" || status === "rate-limited") {
      return;
    }
    const text = lastUserTextRef.current;
    if (!text) return;
    // Remove the trailing error assistant message before retrying.
    setMessages((prev) => {
      const copy = [...prev];
      if (copy.length && copy[copy.length - 1].status === "error") copy.pop();
      return copy;
    });
    runAssistant(text, true);
  }, [status, runAssistant]);

  return {
    messages,
    status,
    input,
    setInput,
    send,
    retry,
    rateLimitSeconds,
    initialSuggestions,
  };
}
