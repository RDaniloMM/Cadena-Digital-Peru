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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <circle cx="24" cy="24" r="22" className="fill-lumia-cyan" />
        <path
          d="M14 32V18h4v10h12v4H14z"
          className="fill-lumia-navy"
        />
        <path
          d="M32 32V18h4v14h-4z"
          className="fill-lumia-navy"
        />
      </svg>
      {showText && (
        <span className={size === "sm" ? "text-base" : "text-xl"}>LUMIA</span>
      )}
    </Link>
  );
}
