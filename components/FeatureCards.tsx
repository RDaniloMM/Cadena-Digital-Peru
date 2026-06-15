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
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-lumia-navy sm:text-3xl">
          ¿Por qué usar LUMIA?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full">
              <h3 className="mb-2 text-lg font-semibold text-lumia-navy">
                {feature.title}
              </h3>
              <p className="text-sm text-lumia-muted">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
