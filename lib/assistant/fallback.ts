import faq from "@/data/faq.json";
import { OUT_OF_SCOPE_MESSAGE } from "./prompts";
import type { AssistantResponse } from "@/lib/types/lumia";

export type FallbackFaqEntry = {
  id: string;
  patterns: string[];
  answer: string;
  suggestions: string[];
};

const faqEntries = (faq.entries ?? []) as FallbackFaqEntry[];

function replaceControlChars(input: string): string {
  return Array.from(input)
    .map((char) => {
      const code = char.charCodeAt(0);
      if ((code >= 0x00 && code <= 0x1f) || (code >= 0x7f && code <= 0x9f)) {
        return " ";
      }
      return char;
    })
    .join("");
}

export function sanitizeInput(input: string): string {
  return replaceControlChars(input)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 2000);
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function scoreEntry(entry: FallbackFaqEntry, normalized: string): number {
  let score = 0;
  for (const pattern of entry.patterns) {
    const normalizedPattern = normalize(pattern);
    if (normalized.includes(normalizedPattern)) {
      score += normalizedPattern.length;
    }
  }
  return score;
}

export function getFallbackResponse(rawMessage: string): AssistantResponse {
  const message = sanitizeInput(rawMessage);
  if (!message) {
    return {
      text: "¿En qué puedo ayudarte sobre certificación, apostilla o legalización de documentos educativos?",
      suggestions: ["¿Qué es apostilla?", "¿Cómo inicio mi trámite?"],
    };
  }

  const normalized = normalize(message);
  const greetings = ["hola", "buenos dias", "buenas tardes", "buenas noches"];
  const isGreeting = greetings.some((g) => normalized.includes(g));

  let best: FallbackFaqEntry | null = null;
  let bestScore = 0;

  for (const entry of faqEntries) {
    const score = scoreEntry(entry, normalized);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) {
    return {
      text: best.answer,
      suggestions: best.suggestions.slice(0, 3),
    };
  }

  if (isGreeting) {
    return {
      text: "Hola, soy Lumi. Puedo ayudarte con certificación, apostilla o legalización de documentos educativos peruanos.",
      suggestions: ["¿Qué es apostilla?", "¿Cómo inicio mi trámite?"],
    };
  }

  return {
    text: OUT_OF_SCOPE_MESSAGE,
    suggestions: ["¿Qué es apostilla?", "¿Cómo inicio mi trámite?"],
  };
}
