import { Card } from "@/components/ui/Card";
import routes from "@/data/routes.json";

export default function TransparencyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="mb-6 text-3xl font-bold text-lumia-navy sm:text-4xl">
        Transparencia
      </h1>

      <div className="space-y-6">
        <Card>
          <h2 className="mb-3 text-xl font-semibold text-lumia-navy">
            ¿Qué es LUMIA?
          </h2>
          <p className="text-lumia-ink">
            LUMIA es una ruta digital de certificación que ayuda a ciudadanos
            peruanos a entender, antes de ir a una ventanilla, qué pasos deben
            seguir para apostillar o legalizar sus documentos educativos. La
            lógica está basada en reglas públicas y revisables almacenadas en
            archivos JSON.
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-semibold text-lumia-navy">
            ¿Cómo se calcula una ruta?
          </h2>
          <ol className="list-inside list-decimal space-y-2 text-lumia-ink">
            <li>El ciudadano responde 4 preguntas en el asistente.</li>
            <li>El motor consulta la base de conocimiento JSON.</li>
            <li>Se determina si el país de destino es parte del Convenio de La Haya.</li>
            <li>Se selecciona la regla más específica y se devuelve la cadena de entidades.</li>
            <li>Se calculan tiempos, costos e índice de preparación en función de los documentos listos.</li>
          </ol>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-semibold text-lumia-navy">
            Fuentes de datos
          </h2>
          <ul className="space-y-2 text-lumia-ink">
            <li>
              <strong>Reglas de ruta:</strong> <code>data/routes.json</code> ·
              versionada y rastreable en git.
            </li>
            <li>
              <strong>Países y Convenio de La Haya:</strong>{" "}
              <code>data/countries.json</code>.
            </li>
            <li>
              <strong>Entidades:</strong> <code>data/entities.json</code> con
              SUNEDU, MINEDU, MRE, consulados y notarías.
            </li>
          </ul>
          <p className="mt-3 text-sm text-lumia-muted">
            Actualmente la base de reglas está en la versión{" "}
            <strong>{routes.version}</strong>. Los costos y tiempos son
            referenciales y deben validarse con cada entidad.
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-semibold text-lumia-navy">
            Modelo de reutilización
          </h2>
          <p className="text-lumia-ink">
            Toda la base de conocimiento y el motor de resolución se publican
            como código abierto. Otros equipos o instituciones pueden reutilizar
            la misma estructura JSON, adaptar las reglas a su dominio y
            construir interfaces alternativas sin costo de licencia.
          </p>
        </Card>

        <Card>
          <h2 className="mb-3 text-xl font-semibold text-lumia-navy">
            Alineación con Gobierno Digital
          </h2>
          <p className="text-lumia-ink">
            LUMIA sigue los principios de interoperabilidad, datos abiertos y
            diseño centrado en el ciudadano promovidos por el modelo de
            Gobierno Digital. No almacena datos personales: el asistente y la
            lista de trámites funcionan de forma anónima en el navegador.
          </p>
        </Card>
      </div>
    </main>
  );
}
