import { z } from "zod";

export const resolveInputSchema = z.object({
  documentTypeId: z.string().min(1),
  destinationCountryCode: z.string().length(2).toUpperCase(),
  purpose: z.string().min(1),
  hasOriginalDocument: z.boolean(),
});

export const routeStepSchema = z.object({
  entityId: z.string(),
  action: z.string(),
  cost: z.number().int().min(0),
  days: z.number().int().min(0),
});

export const routeSchema = z.object({
  id: z.string(),
  steps: z.array(routeStepSchema),
  requiredDocuments: z.array(z.string()),
  optionalDocuments: z.array(z.string()),
  totalCost: z.number().int().min(0),
  totalDays: z.number().int().min(0),
});

export const noRouteFoundSchema = z.object({
  id: z.literal("no-route"),
  message: z.string(),
});

export const resolvedRouteSchema = z.union([routeSchema, noRouteFoundSchema]);
