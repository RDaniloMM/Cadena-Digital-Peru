import type {
  Country,
  Entity,
  KnowledgeBase,
  ResolveInput,
  ResolvedRoute,
  Route,
  RouteRule,
} from "@/lib/types/lumia";
import { validateKnowledgeBase } from "./validator";

export type LoadedKnowledgeBase = {
  countries: Country[];
  entities: Entity[];
  knowledgeBase: KnowledgeBase;
};

export function loadKnowledgeBase(
  routes: unknown,
  countries: unknown,
  entities: unknown
): LoadedKnowledgeBase {
  validateKnowledgeBase({ routes, countries, entities });
  return {
    countries: (countries as { countries: Country[] }).countries,
    entities: (entities as { entities: Entity[] }).entities,
    knowledgeBase: routes as KnowledgeBase,
  };
}

export function isHagueDestination(
  countryCode: string,
  countries: Country[]
): boolean | null {
  const country = countries.find(
    (c) => c.code.toUpperCase() === countryCode.toUpperCase()
  );
  return country ? country.hague : null;
}

function matchRule(rule: RouteRule, input: ResolveInput, hague: boolean): boolean {
  if (rule.match.documentTypeId !== input.documentTypeId) return false;
  if (rule.match.destinationHague !== hague) return false;
  if (rule.match.purpose !== "any" && rule.match.purpose !== input.purpose) {
    return false;
  }
  return true;
}

function ruleSpecificity(rule: RouteRule): number {
  // Exact purpose matches are more specific than wildcard "any".
  return rule.match.purpose === "any" ? 0 : 1;
}

export function resolveRoute(
  input: ResolveInput,
  kb: LoadedKnowledgeBase
): ResolvedRoute {
  const hague = isHagueDestination(input.destinationCountryCode, kb.countries);

  if (hague === null) {
    return {
      id: "no-route",
      message: `País no soportado: "${input.destinationCountryCode}". Contacta a Guía para más información.`,
    };
  }

  const candidates = kb.knowledgeBase.routes.filter((rule) =>
    matchRule(rule, input, hague)
  );

  if (candidates.length === 0) {
    return {
      id: "no-route",
      message:
        "No encontramos una ruta para esta combinación de documento, país y propósito. Contacta a Guía para orientación.",
    };
  }

  // Prefer the most specific rule (exact purpose over "any").
  candidates.sort((a, b) => ruleSpecificity(b) - ruleSpecificity(a));
  const matched = candidates[0];

  const totalCost = matched.steps.reduce((sum, step) => sum + step.cost, 0);
  const totalDays = matched.steps.reduce((sum, step) => sum + step.days, 0);

  const route: Route = {
    id: matched.id,
    steps: matched.steps,
    requiredDocuments: matched.requiredDocuments,
    optionalDocuments: matched.optionalDocuments,
    totalCost,
    totalDays,
  };

  return route;
}

export function getEntityMap(
  entities: Entity[]
): Map<string, Entity> {
  return new Map(entities.map((e) => [e.id, e]));
}
