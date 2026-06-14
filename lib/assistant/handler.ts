import { assistantResponseSchema } from "@/lib/schemas/assistant";
import { SYSTEM_PROMPT } from "./prompts";
import { getFallbackResponse, sanitizeInput } from "./fallback";
import type { AssistantResponse, Channel } from "@/lib/types/lumia";

export type AssistantHandlerInput = {
  message: string;
  sessionId: string;
  channel: Channel;
};

function buildWebhookUrl(): string | null {
  const base = process.env.N8N_WEBHOOK_URL;
  if (!base) return null;

  const path = process.env.N8N_WEBHOOK_CHAT_PATH ?? "";
  return path ? `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}` : base;
}

async function callN8nWebhook(
  url: string,
  input: AssistantHandlerInput
): Promise<AssistantResponse | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: sanitizeInput(input.message),
        sessionId: input.sessionId,
        channel: input.channel,
        systemPrompt: SYSTEM_PROMPT,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(`n8n webhook returned ${response.status}: ${await response.text()}`);
      return null;
    }

    const data = await response.json();
    const parsed = assistantResponseSchema.safeParse(data);
    if (!parsed.success) {
      console.warn("n8n webhook response did not match expected schema", parsed.error);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.warn("n8n webhook call failed", error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function handleAssistantRequest(
  input: AssistantHandlerInput
): Promise<AssistantResponse> {
  const url = buildWebhookUrl();

  if (url) {
    const n8nResponse = await callN8nWebhook(url, input);
    if (n8nResponse) {
      return n8nResponse;
    }
  }

  return getFallbackResponse(input.message);
}
