export type Channel = "web" | "telegram";

export type DocumentType = {
  id: string;
  name: string;
  category: "academic" | "legal" | "personal";
  requiresOriginal: boolean;
};

export type Entity = {
  id: string;
  name: string;
  shortName: string;
  description: string;
};

export type Signature = {
  entityId: string;
  action: string;
  cost: number;
  days: number;
};

export type RouteRule = {
  id: string;
  match: {
    documentTypeId: string;
    destinationHague: boolean;
    purpose: string;
  };
  steps: RouteStep[];
  requiredDocuments: string[];
  optionalDocuments: string[];
};

export type RouteStep = {
  entityId: string;
  action: string;
  cost: number;
  days: number;
};

export type Route = {
  id: string;
  steps: RouteStep[];
  requiredDocuments: string[];
  optionalDocuments: string[];
  totalCost: number;
  totalDays: number;
};

export type NoRouteFound = {
  id: "no-route";
  message: string;
};

export type ResolvedRoute = Route | NoRouteFound;

export function isNoRoute(route: ResolvedRoute): route is NoRouteFound {
  return route.id === "no-route";
}

export function isRoute(route: ResolvedRoute): route is Route {
  return route.id !== "no-route";
}

export type ResolveInput = {
  documentTypeId: string;
  destinationCountryCode: string;
  purpose: string;
  hasOriginalDocument: boolean;
};

export type UserAnswer = {
  questionId: string;
  value: string | boolean;
};

export type WizardState = {
  step: number;
  answers: Record<string, string | boolean>;
  history: number[];
};

export type AssistantRequest = {
  message: string;
  sessionId: string;
  channel: Channel;
};

export type AssistantResponse = {
  text: string;
  suggestions: string[];
  routeHint?: string;
};

export type Country = {
  code: string;
  name: string;
  hague: boolean;
};

export type KnowledgeBase = {
  version: string;
  routes: RouteRule[];
};
