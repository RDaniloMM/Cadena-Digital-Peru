"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  suggestions?: string[];
};

type ChatPanelProps = {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onSuggestionClick: (text: string) => void;
  isLoading: boolean;
  onClose: () => void;
};

function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableSelectors =
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
      );

    const first = getFocusable()[0];
    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, isActive]);
}

export function ChatPanel({
  messages,
  onSend,
  onSuggestionClick,
  isLoading,
  onClose,
}: ChatPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");

  useFocusTrap(panelRef, true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Chat con Guía"
      className="fixed inset-x-4 bottom-20 top-auto z-50 flex max-h-[min(80vh,32rem)] w-auto max-w-sm flex-col overflow-hidden rounded-2xl border border-lumia-navy/10 bg-lumia-white shadow-2xl sm:bottom-24 sm:right-6 sm:left-auto sm:w-[calc(100vw-2rem)]"
    >
      <div className="flex items-center justify-between border-b border-lumia-navy/10 bg-lumia-navy px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-lumia-cyan" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-lumia-white">Guía</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar chat"
          className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg text-lumia-white hover:bg-lumia-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lumia-cyan"
          <CloseIcon />
        </button>
      </div>

      <div
        className="flex-1 space-y-4 overflow-y-auto p-4"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 && (
          <p className="text-sm text-lumia-muted">
            Hola, soy Guía. ¿En qué puedo ayudarte sobre certificación, apostilla o legalización?
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                message.role === "user"
                  ? "rounded-br-sm bg-lumia-navy text-lumia-white"
                  : "rounded-bl-sm bg-lumia-sky text-lumia-ink"
              }`}
            >
              {message.text}
            </div>
            {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {message.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => onSuggestionClick(suggestion)}
                    className="min-h-[40px] rounded-full border border-lumia-navy/10 bg-lumia-white px-3 py-1.5 text-sm text-lumia-navy hover:bg-lumia-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-lumia-cyan"
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-lumia-muted">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-lumia-navy/20 border-t-lumia-navy" />
            Guía está escribiendo…
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-lumia-navy/10 bg-lumia-surface p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta…"
            rows={1}
            className="max-h-32 min-h-[48px] flex-1 resize-none rounded-lg border border-lumia-navy/10 bg-lumia-white px-3 py-2 text-base text-lumia-ink placeholder:text-lumia-muted focus:border-lumia-cyan focus:outline-none"
            aria-label="Mensaje para Guía"
            aria-describedby="chat-hint"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            aria-label="Enviar mensaje"
          >
            Enviar
          </Button>
        </div>
        <p id="chat-hint" className="mt-2 text-sm text-lumia-muted">
          Guía responde sobre certificación, apostilla y legalización de documentos educativos.
        </p>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
