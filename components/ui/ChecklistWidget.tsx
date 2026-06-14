"use client";

import { useVerification } from "@/context/VerificationContext";
import { Button } from "./Button";
import { labelForDocumentId } from "@/lib/labels";

export function ChecklistWidget() {
  const {
    activeRoute: route,
    readyDocuments,
    toggleDocument,
    resetDocuments,
    preparationIndex,
    light,
  } = useVerification();

  if (!route) {
    return (
      <div className="rounded-xl border border-lumia-navy/10 bg-lumia-white p-6 shadow-sm">
        <p className="text-lumia-muted">
          No hay una ruta activa. Completa el asistente para ver tu lista de
          documentos.
        </p>
      </div>
    );
  }

  const required = route.requiredDocuments.map((id) => ({
    id,
    label: labelForDocumentId(id),
    required: true,
  }));
  const optional = route.optionalDocuments.map((id) => ({
    id,
    label: labelForDocumentId(id),
    required: false,
  }));
  const items = [...required, ...optional];

  return (
    <div className="rounded-xl border border-lumia-navy/10 bg-lumia-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-lumia-navy">
          Documentos requeridos
        </h2>
        <Button variant="ghost" size="sm" onClick={resetDocuments}>
          Reiniciar
        </Button>
      </div>

      <ul className="mb-4 space-y-3">
        {items.map((item) => {
          const checked = readyDocuments.includes(item.id);
          return (
            <li key={item.id}>
              <label
                htmlFor={`check-${item.id}`}
                className={[
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                  checked
                    ? "border-lumia-cyan bg-lumia-sky/40"
                    : "border-lumia-navy/10 bg-lumia-surface hover:bg-lumia-sky/20",
                ].join(" ")}
              >
                <input
                  id={`check-${item.id}`}
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleDocument(item.id)}
                  className="mt-0.5 h-5 w-5 accent-lumia-navy"
                />
                <span className="flex-1 text-sm font-medium text-lumia-ink">
                  {item.label}
                </span>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    item.required
                      ? "bg-lumia-navy/10 text-lumia-navy"
                      : "bg-lumia-cyan/20 text-lumia-navy",
                  ].join(" ")}
                >
                  {item.required ? "Requerido" : "Opcional"}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-lumia-navy/10 pt-4">
        <span className="text-sm text-lumia-muted">
          {readyDocuments.length} de {items.length} listos
        </span>
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold",
            light === "green" && "bg-lumia-green/10 text-lumia-green-dark",
            light === "yellow" && "bg-lumia-yellow/10 text-lumia-yellow-dark",
            light === "red" && "bg-lumia-red/10 text-lumia-red-dark",
          ].join(" ")}
        >
          Índice {preparationIndex}%
        </span>
      </div>
    </div>
  );
}
