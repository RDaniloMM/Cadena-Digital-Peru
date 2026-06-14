import { getEntityMap, loadKnowledgeBase } from "@/lib/engine";
import countries from "@/data/countries.json";
import entities from "@/data/entities.json";
import routes from "@/data/routes.json";

const knowledgeBase = loadKnowledgeBase(routes, countries, entities);

export async function GET() {
  const entityMap = getEntityMap(knowledgeBase.entities);

  const templates = knowledgeBase.knowledgeBase.routes.map((rule) => ({
    id: rule.id,
    match: rule.match,
    steps: rule.steps.map((step) => ({
      ...step,
      entity: entityMap.get(step.entityId) ?? null,
    })),
    requiredDocuments: rule.requiredDocuments,
    optionalDocuments: rule.optionalDocuments,
  }));

  return Response.json({
    version: knowledgeBase.knowledgeBase.version,
    count: templates.length,
    routes: templates,
  });
}
