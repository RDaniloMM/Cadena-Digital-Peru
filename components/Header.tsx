import Link from "next/link";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/wizard", label: "Asistente" },
  { href: "/transparencia", label: "Transparencia" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-lumia-navy/10 bg-lumia-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-xl font-bold text-lumia-navy">
          LUMIA
        </Link>
        <nav aria-label="Principal">
          <ul className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-lumia-ink hover:text-lumia-cyan focus-visible:rounded"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
