"use client";

import Link from "next/link";
import { useVerification } from "@/context/VerificationContext";
import { RouteChain } from "@/components/ui/RouteChain";
import { TrafficLight } from "@/components/ui/TrafficLight";
import { PreparationIndex } from "@/components/ui/PreparationIndex";
import { TimeCostSummary } from "@/components/ui/TimeCostSummary";
import { ChecklistWidget } from "@/components/ui/ChecklistWidget";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { saveProcedure } from "@/lib/storage/procedures";
import { isNoRoute } from "@/lib/types/lumia";

export default function ResultPage() {
  const { route, preparationIndex } = useVerification();

  if (!route) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <Card className="text-center">
          <h1 className="text-2xl font-bold text-lumia-primary">
            Aún no hay una ruta
          </h1>
          <p className="mt-3 text-lumia-muted">
            Completa el asistente para descubrir tu cadena de certificación.
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

  if (isNoRoute(route)) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        <Card className="text-center">
          <h1 className="text-2xl font-bold text-lumia-primary">
            No encontramos una ruta
          </h1>
          <p className="mt-3 text-lumia-muted">{route.message}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/wizard" passHref>
              <Button variant="secondary">Volver al asistente</Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  const handleSave = () => {
    saveProcedure({ routeId: route.id, index: preparationIndex });
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-2 text-3xl font-bold text-lumia-primary sm:text-4xl">
        Tu ruta de certificación
      </h1>
      <p className="mb-8 text-lumia-muted">
        Revisa los pasos, marca los documentos que ya tienes y guarda el
        trámite para seguirlo después.
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <h2 className="mb-6 text-xl font-semibold text-lumia-primary">
              Cadena de trámite
            </h2>
            <RouteChain route={route} />
          </Card>
          <TimeCostSummary />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/verificar" passHref className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                Verificar documentos
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full sm:w-auto"
              onClick={handleSave}
            >
              Guardar en mis trámites
            </Button>
          </div>
        </div>

        <aside className="space-y-6">
          <TrafficLight />
          <PreparationIndex />
          <ChecklistWidget />
        </aside>
      </div>
    </main>
  );
}
