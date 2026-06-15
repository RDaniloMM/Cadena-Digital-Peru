import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-lumia-sky/30 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-lumia-navy sm:text-6xl">
          Tu ruta de certificación,
          <br className="hidden sm:block" /> clara desde el inicio
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-lumia-muted sm:text-xl">
          LUMIA te dice qué pasos seguir, cuánto puede costar y cuánto tomar
          apostillar o legalizar tus documentos peruanos antes de ir al MRE.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/wizard" passHref>
            <Button size="lg" className="w-full sm:w-auto">
              Empezar trámite
            </Button>
          </Link>
          <Link href="/transparencia" passHref>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Cómo funciona
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
