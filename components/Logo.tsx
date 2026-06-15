import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  showText?: boolean;
  size?: "sm" | "md";
};

export function Logo({ showText = true, size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? 28 : 36;
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-lg font-bold text-lumia-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lumia-cyan"
      aria-label="LUMIA — Inicio"
    >
      <Image
        src="/logo.webp"
        alt=""
        width={iconSize}
        height={iconSize}
        priority
        className="shrink-0"
        aria-hidden="true"
      />
      {showText && (
        <span className={size === "sm" ? "text-base" : "text-xl"}>LUMIA</span>
      )}
    </Link>
  );
}
