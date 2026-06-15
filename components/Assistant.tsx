"use client";

import { useCallback, useEffect, useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { getOrCreateSessionId, sendChatMessage } from "@/lib/assistant/client";
import type { ChatMessage } from "./ChatPanel";

export function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSend = useCallback(
    async (text: string) => {
      if (!sessionId) return;

      addMessage({ id: crypto.randomUUID(), role: "user", text });
      setIsLoading(true);

      try {
        const response = await sendChatMessage(text, sessionId);
        addMessage({
          id: crypto.randomUUID(),
          role: "assistant",
          text: response.text,
          suggestions: response.suggestions,
        });
      } catch {
        addMessage({
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Ups, Lumi no pudo responder en este momento. Inténtalo de nuevo en unos segundos.",
          suggestions: ["¿Qué es apostilla?", "¿Cómo inicio mi trámite?"],
        });
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId]
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {isOpen && (
        <ChatPanel
          messages={messages}
          onSend={handleSend}
          onSuggestionClick={handleSend}
          isLoading={isLoading}
          onClose={() => setIsOpen(false)}
        />
      )}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Cerrar chat con Lumi" : "Abrir chat con Lumi"}
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-lumia-primary text-lumia-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumia-primary"
      >
        <span className="sr-only">Lumi</span>
        <ChatIcon />
      </button>
    </div>
  );
}

function ChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
