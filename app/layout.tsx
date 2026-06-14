import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Assistant } from "@/components/Assistant";
import { ClientProviders } from "@/components/providers/ClientProviders";
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
      <body className="flex min-h-screen flex-col bg-lumia-surface font-sans text-lumia-ink antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-lumia-navy focus:px-4 focus:py-2 focus:text-lumia-white"
        >
          Saltar al contenido principal
        </a>
        <ClientProviders>
          <Header />
          <div id="contenido" className="flex-1" tabIndex={-1}>
            {children}
          </div>
          <Footer />
          <Assistant />
        </ClientProviders>
      </body>
    </html>
  );
}
