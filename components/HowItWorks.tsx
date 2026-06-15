const steps = [
  {
    n: 1,
    title: "Cuéntanos tu caso",
    description: "Responde 4 preguntas: tipo de documento, país destino, propósito y si tienes el original.",
  },
  {
    n: 2,
    title: "Recibe tu ruta",
    description: "Te mostramos la cadena exacta de pasos, las entidades que visitarás y los documentos que necesitas.",
  },
  {
    n: 3,
    title: "Verifica y guarda",
    description: "Marca los documentos que ya tienes, conoce tu índice de preparación y guarda tu trámite para seguirlo después.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-lumia-white py-16 sm:py-20" aria-labelledby="how-it-works-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h2 id="how-it-works-title" className="text-3xl font-bold text-lumia-ink sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-lumia-muted">
            Tres pasos simples. Sin letra chica.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="relative rounded-2xl border border-lumia-primary/10 bg-lumia-surface p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lumia-primary text-lg font-bold text-lumia-white">
                  {step.n}
                </span>
                <h3 className="text-lg font-semibold text-lumia-ink">
                  {step.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-lumia-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
