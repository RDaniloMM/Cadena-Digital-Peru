"use client";

import { useVerification } from "@/context/VerificationContext";
import { Button } from "./Button";
import { labelForDocumentId } from "@/lib/labels";

export function DocumentsChecklist() {
  const {
    activeRoute: route,
    readyDocuments,
    toggleDocument,
    resetDocuments,
  } = useVerification();

  if (!route) return null;

  const required = route.requiredDocuments.map((id) => ({
    id,
    label: labelForDocumentId(id),
  }));
  const optional = route.optionalDocuments.map((id) => ({
    id,
    label: labelForDocumentId(id),
  }));
  const requiredReady = required.filter((d) => readyDocuments.includes(d.id)).length;
  const allRequiredReady = requiredReady === required.length && required.length > 0;

  return (
    <div
      className={[
        "rounded-2xl border-2 p-6 shadow-sm sm:p-8",
        allRequiredReady
          ? "border-lumia-success/40 bg-gradient-to-br from-lumia-success/5 to-lumia-white"
          : "border-lumia-primary/30 bg-gradient-to-br from-lumia-primary-soft/60 to-lumia-white",
      ].join(" ")}
    >
      {/* Header con callout */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span
            className={[
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              allRequiredReady ? "bg-lumia-success" : "bg-lumia-primary",
            ].join(" ")}
            aria-hidden="true"
          >
            {allRequiredReady ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-lumia-white">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lumia-white">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M9 13h6" />
                <path d="M9 17h6" />
              </svg>
            )}
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-lumia-primary">
              Paso 1 — No te rechazan si tienes esto
            </p>
            <h2 className="mt-1 text-2xl font-bold text-lumia-primary sm:text-3xl">
              Documentos requeridos
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-lumia-ink sm:text-base">
              Marca lo que ya tienes. Estos son los documentos que el MRE te
              va a pedir. Si te falta alguno, te rechazan el trámite el mismo
              día.
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={resetDocuments}>
          Reiniciar
        </Button>
      </header>

      {/* Contador */}
      <div className="mb-6 flex items-center gap-2 text-sm font-semibold">
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full px-3 py-1",
            allRequiredReady
              ? "bg-lumia-success/10 text-lumia-success-dark"
              : "bg-lumia-primary-soft text-lumia-primary",
          ].join(" ")}
        >
          {requiredReady} de {required.length} listos
        </span>
        {allRequiredReady && (
          <span className="inline-flex items-center gap-1 rounded-full bg-lumia-success px-3 py-1 text-lumia-white">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Listo para ir al MRE
          </span>
        )}
      </div>

      {/* Lista de documentos requeridos */}
      <ul className="mb-6 space-y-2">
        {required.map((doc) => {
          const checked = readyDocuments.includes(doc.id);
          return (
            <li key={doc.id}>
              <label
                htmlFor={`req-${doc.id}`}
                className={[
                  "flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors",
                  checked
                    ? "border-lumia-success bg-lumia-white shadow-sm"
                    : "border-lumia-primary/20 bg-lumia-white hover:border-lumia-primary hover:bg-lumia-primary-soft/30",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                    checked
                      ? "border-lumia-success bg-lumia-success text-lumia-white"
                      : "border-lumia-primary/30 bg-lumia-white",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {checked && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </span>
                <input
                  id={`req-${doc.id}`}
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleDocument(doc.id)}
                  className="sr-only"
                />
                <span
                  className={[
                    "flex-1 text-sm font-medium sm:text-base",
                    checked ? "text-lumia-muted line-through" : "text-lumia-ink",
                  ].join(" ")}
                >
                  {doc.label}
                </span>
                <span className="rounded-full bg-lumia-primary/10 px-2 py-0.5 text-xs font-semibold text-lumia-primary">
                  Requerido
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {/* Opcionales */}
      {optional.length > 0 && (
        <details className="group rounded-xl border border-lumia-primary/10 bg-lumia-white/60 p-4">
          <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-lumia-primary">
            <svg
              className="h-4 w-4 transition-transform group-open:rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            Opcionales ({optional.length})
            <span className="font-normal text-lumia-muted">
              — pueden ayudar pero no son obligatorios
            </span>
          </summary>
          <ul className="mt-3 space-y-2">
            {optional.map((doc) => {
              const checked = readyDocuments.includes(doc.id);
              return (
                <li key={doc.id}>
                  <label
                    htmlFor={`opt-${doc.id}`}
                    className={[
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                      checked
                        ? "border-lumia-primary bg-lumia-primary-soft"
                        : "border-lumia-primary/10 bg-lumia-white hover:bg-lumia-primary-soft/40",
                    ].join(" ")}
                  >
                    <input
                      id={`opt-${doc.id}`}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDocument(doc.id)}
                      className="h-5 w-5 accent-lumia-primary"
                    />
                    <span
                      className={[
                        "flex-1 text-sm",
                        checked ? "text-lumia-muted line-through" : "text-lumia-ink",
                      ].join(" ")}
                    >
                      {doc.label}
                    </span>
                    <span className="rounded-full bg-lumia-primary-soft px-2 py-0.5 text-xs font-semibold text-lumia-primary-hover">
                      Opcional
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </details>
      )}
    </div>
  );
}
