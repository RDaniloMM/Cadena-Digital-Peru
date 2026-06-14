import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-lumia-navy sm:text-5xl">
          LUMIA
        </h1>
        <p className="mt-3 text-lg text-lumia-muted">
          Ruta Digital de Certificación para títulos educativos peruanos.
        </p>
      </section>

      <Card className="mb-6">
        <h2 className="mb-4 text-xl font-semibold text-lumia-navy">
          Sistema de diseño
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button>Primario</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button disabled>Deshabilitado</Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-semibold text-lumia-navy">
          Progreso del asistente
        </h2>
        <ProgressBar current={2} total={5} label="Paso 2 de 5" />
      </Card>
    </main>
  );
}
