"use client";

import type { Route } from "@/lib/types/lumia";
import entities from "@/data/entities.json";
import { labelForAction } from "@/lib/labels";

export type RouteChainProps = {
  route: Route;
};

export function RouteChain({ route }: RouteChainProps) {
  const entityMap = new Map(entities.entities.map((e) => [e.id, e]));

  return (
    <ol className="relative ml-2 border-l-2 border-lumia-primary/20 pl-6 sm:ml-4">
      {route.steps.map((step, index) => {
        const entity = entityMap.get(step.entityId);
        return (
          <li key={index} className="mb-8 last:mb-0">
            <span
              className="absolute -left-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-lumia-primary ring-4 ring-lumia-surface"
              aria-hidden="true"
            >
              <span className="h-2 w-2 rounded-full bg-lumia-white" />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold uppercase tracking-wide text-lumia-primary">
                {entity?.shortName ?? step.entityId}
              </span>
              <h3 className="text-lg font-medium text-lumia-ink">
                {labelForAction(step.action)}
              </h3>
              <p className="text-sm text-lumia-muted">
                {entity?.description ?? ""}
              </p>
              <p className="text-sm text-lumia-ink">
                Costo estimado: <strong>S/ {step.cost}</strong> · Tiempo:{" "}
                <strong>{step.days} días</strong>
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
