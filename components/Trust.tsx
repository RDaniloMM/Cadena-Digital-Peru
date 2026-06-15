export function Trust() {
  return (
    <section className="bg-lumia-white py-16 sm:py-20" aria-labelledby="trust-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl border border-lumia-primary/10 bg-gradient-to-br from-lumia-primary-soft to-lumia-white p-8 shadow-sm sm:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 id="trust-title" className="text-2xl font-bold text-lumia-ink sm:text-3xl">
                Formalidad gubernamental,
                <br />
                <span className="text-lumia-primary">sin verse fría.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-lumia-muted">
                LUMIA es un proyecto de Gobierno Digital del Perú. Toda la información
                proviene de fuentes oficiales y la lógica vive en archivos abiertos y
                reutilizables, alineados con los principios de interoperabilidad y
                transformación digital del Estado.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Datos basados en entidades oficiales (SUNEDU, MINEDU, MRE).",
                "Lógica abierta en archivos JSON configurables.",
                "Diseño accesible WCAG 2.1 AA.",
                "Sin registro. Sin compartir datos personales.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0 text-lumia-success"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-sm text-lumia-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
