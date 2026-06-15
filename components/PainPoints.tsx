const pains = [
  {
    quote: "Tengo miedo de equivocarme y que rechacen mi trámite.",
    answer: "Verificas cada documento con el verificador interactivo antes de ir al MRE.",
    icon: "shield",
  },
  {
    quote: "No sé qué documento sigue.",
    answer: "Tu ruta paso a paso te dice exactamente el orden y dónde ir.",
    icon: "path",
  },
  {
    quote: "Quiero que alguien me acompañe.",
    answer: "Lumi, nuestro asistente, responde tus dudas sobre certificación y apostilla.",
    icon: "chat",
  },
  {
    quote: "No entiendo los términos.",
    answer: "Lenguaje claro, sin tecnicismos. Todo explicado en español simple.",
    icon: "globe",
  },
];

export function PainPoints() {
  return (
    <section className="bg-lumia-surface py-16 sm:py-20" aria-labelledby="pain-points-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-lumia-primary">
            Entendemos tu frustración
          </p>
          <h2 id="pain-points-title" className="mt-2 text-3xl font-bold text-lumia-ink sm:text-4xl">
            ¿Te suena familiar?
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pains.map((pain) => (
            <article
              key={pain.quote}
              className="rounded-2xl border border-lumia-primary/10 bg-lumia-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <PainIcon name={pain.icon} />
                <div>
                  <p className="text-base font-semibold italic text-lumia-ink">
                    &ldquo;{pain.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-lumia-muted">
                    <span className="font-semibold text-lumia-primary">LUMIA:</span>{" "}
                    {pain.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainIcon({ name }: { name: string }) {
  const common = "h-8 w-8 shrink-0 text-lumia-primary";
  if (name === "shield") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (name === "path") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden="true">
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M7 6h7a4 4 0 0 1 4 4v6" />
        <path d="M11 10l-4-4 4-4" />
      </svg>
    );
  }
  if (name === "chat") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={common} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
