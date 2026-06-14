"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listProcedures, removeProcedure, type SavedProcedure } from "@/lib/storage/procedures";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ProceduresPage() {
  const [procedures, setProcedures] = useState<SavedProcedure[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProcedures(listProcedures());
    setHydrated(true);
  }, []);

  const handleRemove = (id: string) => {
    removeProcedure(id);
    setProcedures(listProcedures());
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-2 text-3xl font-bold text-lumia-navy sm:text-4xl">
        Mis trámites
      </h1>
      <p className="mb-8 text-lumia-muted">
        Lista anónima guardada solo en este navegador.
      </p>

      {!hydrated || procedures.length === 0 ? (
        <Card className="text-center">
          <p className="text-lumia-muted">
            Aún no has guardado ningún trámite.
          </p>
          <div className="mt-4">
            <Link href="/wizard" passHref>
              <Button>Empezar un trámite</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <ul className="space-y-4">
          {procedures.map((procedure) => (
            <li key={procedure.id}>
              <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-lumia-navy">
                    {procedure.routeId}
                  </p>
                  <p className="text-sm text-lumia-muted">
                    Guardado el{" "}
                    {new Date(procedure.savedAt).toLocaleDateString("es-PE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-lumia-ink">
                    Índice de preparación:{" "}
                    <span className="font-bold">{procedure.index}%</span>
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(procedure.id)}
                  aria-label={`Eliminar trámite ${procedure.routeId}`}
                >
                  Eliminar
                </Button>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
