"use client";

import Link from "next/link";
import { useVerification } from "@/context/VerificationContext";
import { RouteChain } from "@/components/ui/RouteChain";
import { TrafficLight } from "@/components/ui/TrafficLight";
import { PreparationIndex } from "@/components/ui/PreparationIndex";
import { TimeCostSummary } from "@/components/ui/TimeCostSummary";
import { DocumentsChecklist } from "@/components/ui/DocumentsChecklist";
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
      {/* Header con mensaje claro para el ciudadano primerizo */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-lumia-primary sm:text-4xl">
          Tu ruta de certificación
        </h1>
        <p className="mt-3 text-base text-lumia-ink sm:text-lg">
          Antes de ir al MRE, asegúrate de tener estos documentos.{" "}
          <strong className="text-lumia-primary">
            Esto es lo que revisan para no rechazarte el trámite.
          </strong>
        </p>
      </div>

      {/* Resumen de estado: semáforo + índice */}
      <section
        aria-label="Tu estado de preparación"
        className="mb-8 grid gap-4 sm:grid-cols-2"
      >
        <TrafficLight />
        <PreparationIndex />
      </section>

      {/* SECCIÓN PRIORITARIA: Documentos requeridos */}
      <section aria-label="Documentos que necesitas" className="mb-8">
        <DocumentsChecklist />
      </section>

      {/* Cadena de trámite */}
      <section aria-label="Pasos del trámite" className="mb-8">
        <Card>
          <header className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lumia-primary text-lumia-white" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h4l3-9 4 18 3-9h4" />
              </svg>
            </span>
            <div>
              <h2 className="text-xl font-semibold text-lumia-primary">
                Cadena del trámite
              </h2>
              <p className="text-sm text-lumia-muted">
                El orden exacto de entidades que visitarás.
              </p>
            </div>
          </header>
          <RouteChain route={route} />
        </Card>
      </section>

      {/* Estimación de tiempo y costo */}
      <section aria-label="Tiempo y costo estimado" className="mb-8">
        <TimeCostSummary />
      </section>

      {/* Acciones */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/verificar" passHref className="w-full sm:w-auto">
          <Button variant="secondary" className="w-full sm:w-auto">
            Ir al verificador
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
    </main>
  );
}
