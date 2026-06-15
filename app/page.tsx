import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { HowItWorks } from "@/components/HowItWorks";
import { PainPoints } from "@/components/PainPoints";
import { Trust } from "@/components/Trust";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <FeatureCards />
      <PainPoints />
      <Trust />
      <CTASection />
      <section className="border-t border-lumia-navy/10 bg-lumia-white py-10">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-sm font-medium text-lumia-muted">
            Proyecto orientado a la transformación digital del Estado peruano ·
            Datos referenciales
          </p>
        </div>
      </section>
    </main>
  );
}

function CTASection() {
  return (
    <section className="bg-gradient-to-br from-lumia-primary to-lumia-primary-hover py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-lumia-white sm:text-4xl">
          ¿Listo para empezar tu trámite?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-lumia-white/90">
          Son 4 preguntas simples y te diremos exactamente qué hacer. Sin adivinar.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/wizard" passHref>
            <Button
              size="lg"
              className="w-full bg-lumia-white text-lumia-primary hover:bg-lumia-primary-soft sm:w-auto"
            >
              Empezar trámite
              <span aria-hidden="true" className="ml-2">→</span>
            </Button>
          </Link>
          <a
            href="https://t.me/ApostillaMREBot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-lumia-white/40 bg-transparent px-6 py-3 text-base font-semibold text-lumia-white transition-colors hover:border-lumia-white hover:bg-lumia-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumia-white sm:w-auto"
          >
            O usar el bot de Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
