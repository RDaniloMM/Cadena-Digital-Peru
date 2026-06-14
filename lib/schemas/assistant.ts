import { z } from "zod";

export const assistantRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  sessionId: z.string().uuid(),
  channel: z.enum(["web", "telegram"]),
});

export const assistantResponseSchema = z.object({
  text: z.string(),
  suggestions: z.array(z.string()).max(3),
  routeHint: z.string().optional(),
});
