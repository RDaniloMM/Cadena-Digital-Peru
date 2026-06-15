import {
  countriesSchema,
  entitiesSchema,
  knowledgeBaseSchema,
} from "@/lib/schemas/kb";

export type KnowledgeBaseFiles = {
  routes: unknown;
  countries: unknown;
  entities: unknown;
};

export function validateKnowledgeBase(files: KnowledgeBaseFiles): void {
  const routesResult = knowledgeBaseSchema.safeParse(files.routes);
  if (!routesResult.success) {
    throw new Error(
      `Invalid data/routes.json: ${routesResult.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ")}`
    );
  }

  const countriesResult = countriesSchema.safeParse(files.countries);
  if (!countriesResult.success) {
    throw new Error(
      `Invalid data/countries.json: ${countriesResult.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ")}`
    );
  }

  const entitiesResult = entitiesSchema.safeParse(files.entities);
  if (!entitiesResult.success) {
    throw new Error(
      `Invalid data/entities.json: ${entitiesResult.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ")}`
    );
  }

  const entityIds = new Set(entitiesResult.data.entities.map((e) => e.id));
  for (const route of routesResult.data.routes) {
    for (const step of route.steps) {
      if (!entityIds.has(step.entityId)) {
        throw new Error(
          `Route "${route.id}" references unknown entity "${step.entityId}"`
        );
      }
    }
  }
}
