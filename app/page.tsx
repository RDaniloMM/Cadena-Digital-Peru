import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureCards />
      <section className="border-t border-lumia-navy/10 bg-lumia-white py-12">
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
