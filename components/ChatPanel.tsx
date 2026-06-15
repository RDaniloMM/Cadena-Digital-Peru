"use client";

import Image from "next/image";
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
      aria-label="Chat con Lumi"
      className="fixed inset-x-4 bottom-20 top-auto z-50 flex max-h-[min(85vh,36rem)] w-auto max-w-sm flex-col overflow-hidden rounded-3xl border border-lumia-navy/10 bg-lumia-white shadow-2xl ring-1 ring-black/5 sm:bottom-24 sm:right-6 sm:left-auto sm:w-[28rem]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-lumia-navy/10 bg-gradient-to-r from-lumia-navy to-lumia-cyan px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-lumia-white shadow-sm">
            <Image
              src="/logo.webp"
              alt=""
              width={28}
              height={28}
              className="object-contain"
              aria-hidden="true"
            />
          </div>
          <div>
            <h2 className="text-sm font-bold text-lumia-white">Lumi</h2>
            <p className="text-xs text-lumia-white/80">Asistente de certificación</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar chat"
          className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full text-lumia-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lumia-white"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Messages */}
      <div
        className="flex-1 space-y-5 overflow-y-auto bg-lumia-surface p-4"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.length === 0 && (
          <div className="flex gap-3">
            <AssistantAvatar />
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-lumia-white px-4 py-3 text-sm text-lumia-ink shadow-sm">
              <p className="font-medium text-lumia-navy">Hola, soy Lumi</p>
              <p className="mt-1 text-lumia-muted">
                ¿En qué puedo ayudarte sobre certificación, apostilla o legalización?
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {message.role === "assistant" && <AssistantAvatar />}
            <div
              className={`flex max-w-[85%] flex-col ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  message.role === "user"
                    ? "rounded-br-sm bg-lumia-navy text-lumia-white"
                    : "rounded-tl-sm bg-lumia-white text-lumia-ink"
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
                      className="min-h-[36px] rounded-full border border-lumia-cyan/30 bg-lumia-white px-4 py-1.5 text-sm font-medium text-lumia-navy shadow-sm transition-colors hover:border-lumia-cyan hover:bg-lumia-sky focus-visible:outline focus-visible:outline-2 focus-visible:outline-lumia-cyan"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <AssistantAvatar />
            <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-lumia-white px-4 py-3 text-sm text-lumia-muted shadow-sm">
              <span className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-lumia-muted [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-lumia-muted [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-lumia-muted" />
              </span>
              <span className="sr-only">Lumi está escribiendo</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-lumia-navy/10 bg-lumia-white p-3">
        <div className="flex items-end gap-2 rounded-2xl border border-lumia-navy/10 bg-lumia-surface p-2 focus-within:border-lumia-cyan focus-within:ring-2 focus-within:ring-lumia-cyan/20">
          <textarea
            ref={inputRef}
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta…"
            rows={1}
            className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-base text-lumia-ink placeholder:text-lumia-muted focus:outline-none"
            aria-label="Mensaje para Lumi"
            aria-describedby="chat-hint"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            aria-label="Enviar mensaje"
            className="h-10 w-10 rounded-full p-0"
          >
            <SendIcon />
          </Button>
        </div>
        <p id="chat-hint" className="mt-2 text-center text-xs text-lumia-muted">
          Lumi responde sobre certificación, apostilla y legalización de documentos educativos.
        </p>
      </div>
    </div>
  );
}

function AssistantAvatar() {
  return (
    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-lumia-white shadow-sm ring-1 ring-lumia-navy/10">
      <Image
        src="/logo.webp"
        alt=""
        fill
        sizes="32px"
        className="object-contain p-0.5"
        aria-hidden="true"
      />
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

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4 20-7z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
