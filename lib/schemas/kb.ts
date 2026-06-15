import { z } from "zod";

export const countrySchema = z.object({
  code: z.string().length(2),
  name: z.string().min(1),
  hague: z.boolean(),
});

export const entitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  description: z.string(),
});

export const routeStepSchema = z.object({
  entityId: z.string().min(1),
  action: z.string().min(1),
  cost: z.number().int().min(0),
  days: z.number().int().min(0),
});

export const routeRuleSchema = z.object({
  id: z.string().min(1),
  match: z.object({
    documentTypeId: z.string().min(1),
    destinationHague: z.boolean(),
    purpose: z.string().min(1),
  }),
  steps: z.array(routeStepSchema).min(1),
  requiredDocuments: z.array(z.string().min(1)),
  optionalDocuments: z.array(z.string().min(1)),
});

export const knowledgeBaseSchema = z.object({
  version: z.string().min(1),
  routes: z.array(routeRuleSchema).min(1),
});

export const countriesSchema = z.object({
  version: z.string().min(1),
  countries: z.array(countrySchema).min(1),
});

export const entitiesSchema = z.object({
  version: z.string().min(1),
  entities: z.array(entitySchema).min(1),
});
