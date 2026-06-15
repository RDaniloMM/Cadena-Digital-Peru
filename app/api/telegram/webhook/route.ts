import { handleAssistantRequest } from "@/lib/assistant/handler";
import { sanitizeInput } from "@/lib/assistant/fallback";

const TELEGRAM_API_BASE = "https://api.telegram.org";

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  try {
    const update = (await request.json()) as TelegramUpdate;

    const message = update.message?.text ?? update.edited_message?.text;
    const chatId = update.message?.chat.id ?? update.edited_message?.chat.id;

    if (!message || !chatId || !botToken) {
      return Response.json({ ok: false, error: "Missing message, chat, or bot token" });
    }

    const sessionId = `telegram-${chatId}`;
    const response = await handleAssistantRequest({
      message: sanitizeInput(message),
      sessionId,
      channel: "telegram",
    });

    await sendTelegramMessage(botToken, chatId, response.text, response.suggestions);

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error", error);
    return Response.json({ ok: false, error: "Internal error" });
  }
}

type TelegramChat = { id: number };

type TelegramMessage = {
  message_id: number;
  chat: TelegramChat;
  text?: string;
};

type TelegramUpdate = {
  update_id: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
};

async function sendTelegramMessage(
  botToken: string,
  chatId: number,
  text: string,
  suggestions?: string[]
): Promise<void> {
  const formatted = suggestions?.length
    ? `${text}\n\n${suggestions.map((s) => `• ${s}`).join("\n")}`
    : text;

  const url = `${TELEGRAM_API_BASE}/bot${botToken}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatted,
      parse_mode: undefined,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API error ${response.status}: ${body}`);
  }
}
