import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LUMIA — Ruta Digital de Certificación",
  description:
    "Descubre la cadena de apostilla o legalización para tus títulos educativos antes de ir al MRE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-lumia-surface text-lumia-ink antialiased">
        {children}
      </body>
    </html>
  );
}
