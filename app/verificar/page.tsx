"use client";

import Link from "next/link";
import { useVerification } from "@/context/VerificationContext";
import { ChecklistWidget } from "@/components/ui/ChecklistWidget";
import { TrafficLight } from "@/components/ui/TrafficLight";
import { PreparationIndex } from "@/components/ui/PreparationIndex";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { labelForDocumentId } from "@/lib/labels";

export default function VerifyPage() {
  const { activeRoute: route, readyDocuments } = useVerification();

  if (!route) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <Card className="text-center">
          <h1 className="text-2xl font-bold text-lumia-primary">
            Verifica tus documentos
          </h1>
          <p className="mt-3 text-lumia-muted">
            Primero resuelve una ruta en el asistente para cargar la lista de
            documentos correspondiente.
          </p>
          <div className="mt-6">
            <Link href="/wizard" passHref>
              <Button>Ir al asistente</Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  const required = route.requiredDocuments;
  const optional = route.optionalDocuments;
  const readyRequired = required.filter((id) => readyDocuments.includes(id));
  const readyOptional = optional.filter((id) => readyDocuments.includes(id));
  const missing = required.filter((id) => !readyDocuments.includes(id));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-2 text-3xl font-bold text-lumia-primary sm:text-4xl">
        Verificador de documentos
      </h1>
      <p className="mb-8 text-lumia-muted">
        Revisa lo que ya tienes listo y lo que aún necesitas para completar tu
        trámite.
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ChecklistWidget />
          <Card>
            <h2 className="mb-4 text-xl font-semibold text-lumia-primary">
              Resumen de estado
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatusBox
                label="Requeridos listos"
                value={`${readyRequired.length} / ${required.length}`}
              />
              <StatusBox
                label="Opcionales listos"
                value={`${readyOptional.length} / ${optional.length}`}
              />
              <StatusBox
                label="Pendientes"
                value={String(missing.length)}
                variant="warning"
              />
            </div>
            {missing.length > 0 && (
              <div className="mt-4">
                  <h3 className="mb-2 text-sm font-semibold text-lumia-primary">
                  Documentos aún pendientes
                </h3>
                <ul className="list-inside list-disc text-sm text-lumia-muted">
                  {missing.map((id) => (
                    <li key={id}>{labelForDocumentId(id)}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>

        <aside className="space-y-6">
          <TrafficLight />
          <PreparationIndex />
        </aside>
      </div>
    </main>
  );
}

function StatusBox({
  label,
  value,
  variant = "default",
}: {
  label: string;
  value: string;
  variant?: "default" | "warning";
}) {
  return (
    <div
      className={[
        "rounded-lg p-4",
        variant === "warning"
          ? "bg-lumia-warning/10 text-lumia-warning-dark"
          : "bg-lumia-primary-soft text-lumia-primary",
      ].join(" ")}
    >
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
