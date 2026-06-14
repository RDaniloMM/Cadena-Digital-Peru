"use client";

import { useVerification } from "@/context/VerificationContext";

export function PreparationIndex() {
  const { preparationIndex, light } = useVerification();

  const colorClass =
    light === "green"
      ? "text-lumia-green"
      : light === "yellow"
      ? "text-lumia-yellow"
      : "text-lumia-red";

  return (
    <div className="rounded-xl border border-lumia-navy/10 bg-lumia-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold text-lumia-navy">
        Índice de preparación
      </h2>
      <div className="flex items-end gap-3">
        <span className={["text-5xl font-bold", colorClass].join(" ")}>
          {preparationIndex}
        </span>
        <span className="mb-2 text-xl text-lumia-muted">/ 100</span>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-lumia-navy/10">
        <div
          className={[
            "h-full rounded-full transition-all duration-500 ease-out",
            light === "green" && "bg-lumia-green",
            light === "yellow" && "bg-lumia-yellow",
            light === "red" && "bg-lumia-red",
          ].join(" ")}
          style={{ width: `${preparationIndex}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
