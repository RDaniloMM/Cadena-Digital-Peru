"use client";

import { useVerification } from "@/context/VerificationContext";

export function TrafficLight() {
  const { light, preparationIndex } = useVerification();

  const config = {
    red: {
      label: "Falta mucho",
      description: "Aún te faltan documentos importantes.",
      dot: "bg-lumia-error",
    },
    yellow: {
      label: "En progreso",
      description: "Ya tienes parte de la documentación.",
      dot: "bg-lumia-warning",
    },
    green: {
      label: "Listo para iniciar",
      description: "Tienes la mayoría de los documentos.",
      dot: "bg-lumia-success",
    },
  }[light];

  return (
    <div className="rounded-xl border border-lumia-primary/10 bg-lumia-white p-6 shadow-sm" aria-live="polite" aria-atomic="true">
      <h2 className="mb-4 text-xl font-semibold text-lumia-primary">
        Estado de preparación
      </h2>
      <div className="flex items-center gap-4">
        <span
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            config.dot,
          ].join(" ")}
          aria-hidden="true"
        >
          <span className="h-4 w-4 rounded-full bg-lumia-white" />
        </span>
        <div>
          <p className="text-lg font-semibold text-lumia-ink">{config.label}</p>
          <p className="text-sm text-lumia-muted">{config.description}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-lumia-ink">
        Índice de preparación:{" "}
        <span className="font-bold">{preparationIndex}%</span>
      </p>
    </div>
  );
}
