"use client";

import { useVerification } from "@/context/VerificationContext";

export function PreparationIndex() {
  const { preparationIndex, light } = useVerification();

  const colorClass =
    light === "green"
      ? "text-lumia-success-dark"
      : light === "yellow"
      ? "text-lumia-warning-dark"
      : "text-lumia-error-dark";

  return (
    <div
      className="rounded-xl border border-lumia-primary/10 bg-lumia-white p-6 shadow-sm"
      aria-live="polite"
      aria-atomic="true"
    >
      <h2 className="mb-2 text-xl font-semibold text-lumia-primary">
        Índice de preparación
      </h2>
      <div className="flex items-end gap-3">
        <span className={["text-5xl font-bold", colorClass].join(" ")}>
          {preparationIndex}
        </span>
        <span className="mb-2 text-xl text-lumia-muted">/ 100</span>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-lumia-primary/10">
        <div
          className={[
            "h-full rounded-full transition-all duration-500 ease-out",
            light === "green" && "bg-lumia-success",
            light === "yellow" && "bg-lumia-warning",
            light === "red" && "bg-lumia-error",
          ].join(" ")}
          style={{ width: `${preparationIndex}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
