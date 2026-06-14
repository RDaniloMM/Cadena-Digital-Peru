"use client";

import { useVerification } from "@/context/VerificationContext";

export function TimeCostSummary() {
  const { activeRoute: route } = useVerification();

  if (!route) {
    return (
      <div className="rounded-xl border border-lumia-navy/10 bg-lumia-white p-6 shadow-sm">
        <p className="text-lumia-muted">
          Completa el asistente para ver el tiempo y costo estimado.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-lumia-navy/10 bg-lumia-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-lumia-navy">
        Estimación del trámite
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-lumia-sky/40 p-4">
          <p className="text-sm text-lumia-muted">Tiempo total estimado</p>
          <p className="text-2xl font-bold text-lumia-navy">
            {route.totalDays} días
          </p>
        </div>
        <div className="rounded-lg bg-lumia-sky/40 p-4">
          <p className="text-sm text-lumia-muted">Costo total estimado</p>
          <p className="text-2xl font-bold text-lumia-navy">
            S/ {route.totalCost}
          </p>
        </div>
      </div>
      <p className="mt-4 text-xs text-lumia-muted">
        Los valores son referenciales y pueden variar según la entidad y el
        país de destino.
      </p>
    </div>
  );
}
