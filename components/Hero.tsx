import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-lumia-primary-soft via-lumia-white to-lumia-surface py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-lumia-primary/20 bg-lumia-white/80 px-4 py-1.5 text-sm font-medium text-lumia-primary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-lumia-success" aria-hidden="true" />
            Gobierno Digital · Perú
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-lumia-ink sm:text-5xl lg:text-6xl">
            Tu ruta <span className="text-lumia-primary">clara y sencilla</span>
            <br className="hidden sm:block" /> para apostillar
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-lumia-muted sm:text-xl">
            Te guiamos paso a paso para apostillar sin adivinar. Sabes qué documentos
            necesitas, dónde ir y cuánto toma — antes de pisar el MRE.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/wizard" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                Empezar trámite
                <span aria-hidden="true" className="ml-2">→</span>
              </Button>
            </Link>
            <a
              href="https://t.me/ApostillaMREBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-lumia-primary/20 bg-lumia-white px-6 py-3 text-base font-semibold text-lumia-primary shadow-sm transition-all hover:border-lumia-primary hover:bg-lumia-primary-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumia-primary sm:w-auto"
              aria-label="Abrir el bot de Telegram Apostilla MRE en una nueva pestaña"
            >
              <TelegramIcon />
              Hablar por Telegram
            </a>
          </div>

          <p className="mt-6 text-sm text-lumia-muted">
            Gratis · Anónimo · Sin registro
          </p>
        </div>

        {/* Visual hint: certificate chain mockup */}
        <div className="mt-16 hidden justify-center sm:flex">
          <div className="rounded-2xl border border-lumia-primary/10 bg-lumia-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-sm font-semibold text-lumia-ink">
              <Image src="/logo.webp" alt="" width={32} height={32} className="object-contain" aria-hidden="true" />
              Tu cadena de certificación
            </div>
            <ol className="mt-4 space-y-3">
              {["SUNEDU · Validar título", "MINEDU · Certificar título", "MRE · Apostillar"].map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lumia-primary text-sm font-bold text-lumia-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-lumia-ink">{step}</span>
                  <span className="ml-auto text-xs text-lumia-muted">
                    {["5 días", "3 días", "2 días"][i]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function TelegramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}
