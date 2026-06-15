import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Ruta paso a paso",
    description:
      "Responde 4 preguntas y obtén la cadena exacta de entidades para tu documento y país de destino.",
  },
  {
    title: "Costos y tiempos",
    description:
      "Visualiza el costo y tiempo estimado de cada paso antes de iniciar el trámite.",
  },
  {
    title: "Lista de documentos",
    description:
      "Marca lo que ya tienes listo y descubre qué te falta para estar preparado.",
  },
  {
    title: "Transparente y reutilizable",
    description:
      "Toda la lógica vive en archivos JSON abiertos, alineados con el modelo de Gobierno Digital.",
  },
];

export function FeatureCards() {
  return (
    <section className="bg-lumia-surface py-16 sm:py-20" aria-labelledby="why-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h2 id="why-title" className="text-3xl font-bold text-lumia-ink sm:text-4xl">
            ¿Por qué usar LUMIA?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-lumia-muted">
            Hecho para que tu trámite salga bien a la primera.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full border-lumia-primary/10">
              <h3 className="mb-2 text-lg font-semibold text-lumia-primary">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-lumia-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
