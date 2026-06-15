import PDFDocument from "pdfkit";
import { createWriteStream, existsSync } from "node:fs";
import { resolve } from "node:path";

const OUTPUT = resolve(process.cwd(), "propuesta-solucion-lumia.pdf");
const PROD_URL = "https://lumia-bot.vercel.app";

const PRIMARY = "#1D4ED8";
const PRIMARY_HOVER = "#1E40AF";
const INK = "#1E293B";
const MUTED = "#64748B";
const SURFACE = "#F8FAFC";

type Section = { title: string; body: string };

const sections: Section[] = [
  {
    title: "1. Resumen ejecutivo",
    body:
      "LUMIA es una aplicación web móvil-first que guía a ciudadanos peruanos a través de la cadena exacta de certificación necesaria para apostillar o legalizar títulos educativos antes de acudir al Ministerio de Relaciones Exteriores (MRE). El objetivo principal es evitar que el trámite sea rechazado la primera vez, ofreciendo una ruta clara, paso a paso, con asistencia conversacional disponible tanto en la web como en Telegram.",
  },
  {
    title: "2. Problema que resuelve",
    body:
      "Miles de peruanos intentan apostillar o legalizar sus títulos educativos cada año. La mayoría llega al MRE sin tener claros los pasos previos, las entidades que debe visitar, el orden correcto ni los documentos que le van a pedir. Esto genera:\n\n• Trámites rechazados en ventanilla por falta de un documento o de una certificación previa.\n• Pérdida de tiempo y dinero (traslados, colas, pagos duplicados).\n• Dependencia de conocidos, tramitadores o intermediarios.\n• Desconfianza en los canales digitales del Estado.\n\nLos ciudadanos manifiestan repetidamente: 'Tengo miedo de equivocarme', 'No sé qué documento sigue', 'Quiero que alguien me acompañe' y 'No entiendo los términos'.",
  },
  {
    title: "3. Propuesta de valor",
    body:
      "LUMIA entrega al ciudadano, en menos de un minuto, la cadena exacta que debe seguir para su caso específico, con los documentos que necesita, los tiempos estimados, los costos referenciales y un verificador interactivo que le indica si está listo para ir al MRE.\n\nValores diferenciales:\n\n• Claridad: lenguaje cercano, sin tecnicismos.\n• Confianza: información basada en entidades oficiales (SUNEDU, MINEDU, MRE, notarías, consulados).\n• Acompañamiento: asistente conversacional Lumi, disponible en web y Telegram.\n• Simplicidad: una pregunta por pantalla, un paso a la vez.\n• Formalidad sin frialdad: diseño accesible WCAG 2.1 AA, paleta institucional azul, pero cercano y moderno.\n• Sin fricción: sin login, sin datos personales, funciona de forma anónima en el navegador.",
  },
  {
    title: "4. Usuario objetivo",
    body:
      "Ciudadano peruano, mayor de 18 años, que necesita apostillar o legalizar un título educativo (bachiller, maestría, doctorado, certificado de estudios o certificado de educación básica/secundaria) para:\n\n• Estudiar en el extranjero.\n• Trabajar fuera del país.\n• Trámites de residencia.\n• Otros fines formales.\n\nPerfil digital: smartphone Android/iOS, conexión a internet, usuario de Telegram y/o navegador web. Puede ser un usuario que hace este trámite por primera vez y no conoce el proceso.",
  },
  {
    title: "5. Funcionalidades del MVP",
    body:
      "1. Landing page con propuesta de valor, acceso al asistente y acceso al bot de Telegram.\n2. Asistente guiado de 4 pasos: tipo de documento, país destino, propósito, disponibilidad del original.\n3. Resultado con cadena de certificación, semáforo de preparación, índice de preparación (0-100), estimación de tiempo y costo, y checklist interactivo de documentos.\n4. Verificador de documentos: el ciudadano marca lo que ya tiene y ve en vivo si está listo para el MRE.\n5. Asistente Lumi (chat) conectado al mismo workflow de n8n que el bot de Telegram.\n6. Bot de Telegram con paridad de respuestas con la web.\n7. 'Mis trámites': lista anónima guardada en el navegador, sin registro.\n8. Página de arquitectura y transparencia, alineada con Gobierno Digital.",
  },
  {
    title: "6. Stack técnico",
    body:
      "Frontend: Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript 6.\n\nBackend: API Routes de Next.js como capa interna, n8n como orquestador del asistente (opcional, con fallback local basado en FAQ en JSON).\n\nBase de reglas: archivos JSON versionados (rutas, países, entidades, FAQ). Configurables sin modificar código.\n\nAlmacenamiento: localStorage del navegador para 'Mis trámites' y estado del wizard. Sin base de datos.\n\nDespliegue: Vercel (frontend + API) y n8n (workflow del asistente).\n\nAccesibilidad: WCAG 2.1 AA, mobile-first, contraste de paleta validado.",
  },
  {
    title: "7. Modelo de datos (motor de reglas)",
    body:
      "La lógica vive en archivos JSON:\n\n• data/routes.json: plantillas de cadenas de certificación (SUNEDU → MINEDU → MRE → consulado, etc.) con costos y tiempos por paso.\n• data/countries.json: países miembros y no miembros del Convenio de La Haya.\n• data/entities.json: SUNEDU, MINEDU, MRE, notarías, consulados, con descripción y nombre corto.\n• data/faq.json: preguntas frecuentes para el fallback del asistente.\n\nEl motor (lib/engine/resolver.ts) toma las respuestas del usuario y devuelve la ruta aplicable, o un mensaje claro si no hay coincidencia.",
  },
  {
    title: "8. Integración multi-canal (web + Telegram)",
    body:
      "Para cumplir el objetivo de 'una sola fuente de verdad' entre canales, el chat web y el bot de Telegram:\n\n1. Comparten el mismo handler en lib/assistant/handler.ts.\n2. Llaman al mismo webhook de n8n (configurable vía N8N_WEBHOOK_URL).\n3. Cuando n8n no está configurado, ambos usan el mismo fallback local (FAQ en JSON).\n4. El payload enviado es el mismo: { message, sessionId, channel, systemPrompt }.\n5. La respuesta esperada es la misma: { text, suggestions }.\n\nEsto evita duplicar lógica entre canales y permite que las mejoras al motor impacten simultáneamente en web y Telegram.",
  },
  {
    title: "9. Diseño y experiencia de usuario",
    body:
      "Paleta: primario #1D4ED8 (azul confianza), secundario #3B82F6, éxito #16A34A, advertencia #F59E0B, error #DC2626, fondo #F8FAFC, cards #FFFFFF.\n\nTipografía: Inter, escala H1 40px/700, H2 28px/700, body 16px/400.\n\nEspaciado: múltiplos de 8 px.\n\nComponentes: botones con radio 12px y altura 48px, cards con radio 16px y padding 24px, barra de progreso siempre visible en el wizard.\n\nMobile-first: el 80-90% del tráfico esperado llega desde celular. Botones mínimo 48px, texto mínimo 16px, un campo por pantalla.\n\nAsistente IA: se llama 'Guía' (en el código, branding) y aparece como botón flotante en la esquina inferior derecha. En la UI mostrada al usuario se identifica como Lumi.",
  },
  {
    title: "10. Arquitectura y despliegue",
    body:
      "Aplicación Next.js 16 desplegada en Vercel. Variables de entorno: N8N_WEBHOOK_URL, N8N_WEBHOOK_CHAT_PATH, TELEGRAM_BOT_TOKEN, LUMIA_API_URL.\n\nEl workflow de n8n (n8n/workflows/guia-assistant.json) está incluido como plantilla y puede importarse a cualquier instancia de n8n.\n\nConfiguración Vercel: vercel.json define framework, install y build commands. next.config.ts añade headers de seguridad (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).\n\nLa lógica del motor de reglas está aislada de la UI, lo que permite reutilizar la misma base JSON en otras interfaces (apps móviles, otros portales del Estado) sin duplicar trabajo.",
  },
  {
    title: "11. Alineación con Gobierno Digital del Perú",
    body:
      "LUMIA se alinea con los principios de la Estrategia de Gobierno Digital:\n\n• Interoperabilidad: JSON abierto y reutilizable.\n• Datos abiertos: rutas y entidades expuestas.\n• Diseño centrado en el ciudadano: mobile-first, accesible, claro.\n• Reutilización: cualquier institución puede tomar la base de reglas y adaptarla.\n• Transformación digital: demuestra que se pueden entregar servicios públicos con tecnología moderna, sin perder la formalidad.\n• Sin datos personales: privacidad por diseño.",
  },
  {
    title: "12. Métricas de éxito propuestas",
    body:
      "Para un MVP de hackathon, las métricas inmediatas son cualitativas y de adopción:\n\n• Ciudadanos que completan el asistente y obtienen una ruta.\n• Ciudadanos que marcan todos los documentos requeridos como listos (índice de preparación = 100).\n• Conversaciones con Lumi resueltas sin salir del scope.\n• Trámites guardados en 'Mis trámites' para seguimiento.\n\nEn una siguiente fase, se podrían agregar métricas de impacto real (consultas al MRE evitadas, satisfacción, tasa de rechazo reportada por usuarios).",
  },
  {
    title: "13. Trabajo futuro",
    body:
      "• Conectar con APIs oficiales (SUNEDU, MRE) para validar estado en tiempo real.\n• Agregar más tipos de documentos (no solo educativos) según demanda.\n• Soporte multi-idioma (quechua, aimara).\n• Notificaciones de seguimiento en Telegram.\n• Persistencia server-side opcional con KV/Upstash para compartir trámite entre dispositivos.\n• Auditoría de accesibilidad con Lighthouse y axe.\n• Tests E2E con Playwright.",
  },
];

function newDoc(): PDFKit.PDFDocument {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 60, right: 60 },
    info: {
      Title: "LUMIA — Propuesta de Solución",
      Author: "LUMIA",
      Subject: "Ruta Digital de Certificación",
    },
  });
  doc.pipe(createWriteStream(OUTPUT));
  return doc;
}

function header(doc: PDFKit.PDFDocument, title: string) {
  doc.fillColor(PRIMARY).fontSize(22).font("Helvetica-Bold").text(title, { align: "left" });
  doc.moveDown(0.3);
  doc
    .strokeColor(PRIMARY)
    .lineWidth(2)
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .stroke();
  doc.moveDown(0.8);
  doc.fillColor(INK);
}

function section(doc: PDFKit.PDFDocument, s: Section) {
  if (doc.y > 700) doc.addPage();
  doc.fillColor(PRIMARY).fontSize(13).font("Helvetica-Bold").text(s.title);
  doc.moveDown(0.3);
  doc.fillColor(INK).fontSize(10.5).font("Helvetica").text(s.body, {
    align: "justify",
    lineGap: 2,
    paragraphGap: 4,
  });
  doc.moveDown(0.8);
}

function main() {
  if (existsSync(OUTPUT)) {
    console.log(`Overwriting ${OUTPUT}`);
  }
  const doc = newDoc();

  // Cover
  doc
    .fillColor(PRIMARY)
    .fontSize(32)
    .font("Helvetica-Bold")
    .text("LUMIA", { align: "center" });
  doc.moveDown(0.3);
  doc
    .fillColor(PRIMARY_HOVER)
    .fontSize(14)
    .font("Helvetica")
    .text("Ruta Digital de Certificación", { align: "center" });
  doc.moveDown(0.5);
  doc
    .fillColor(MUTED)
    .fontSize(11)
    .font("Helvetica-Oblique")
    .text("Tu ruta clara y sencilla", { align: "center" });
  doc.moveDown(2);

  doc
    .fillColor(PRIMARY)
    .fontSize(18)
    .font("Helvetica-Bold")
    .text("Propuesta de Solución", { align: "center" });
  doc.moveDown(0.3);
  doc
    .fillColor(MUTED)
    .fontSize(10)
    .font("Helvetica")
    .text("Junio 2026 · Hackathon Cadena Digital Perú", { align: "center" });
  doc.moveDown(2);

  // Production link box
  const boxY = doc.y;
  const boxX = doc.page.margins.left;
  const boxW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  doc
    .roundedRect(boxX, boxY, boxW, 60, 8)
    .fillAndStroke(PRIMARY, PRIMARY);
  doc
    .fillColor("#FFFFFF")
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("DEMO EN PRODUCCIÓN", boxX, boxY + 10, {
      width: boxW,
      align: "center",
    });
  doc
    .fontSize(13)
    .font("Helvetica-Bold")
    .text(PROD_URL, boxX, boxY + 30, {
      width: boxW,
      align: "center",
      link: PROD_URL,
    });
  doc.y = boxY + 70;
  doc.fillColor(INK);

  // About box
  doc.moveDown(1);
  doc
    .fillColor(INK)
    .fontSize(11)
    .font("Helvetica")
    .text(
      "LUMIA es el nombre de la aplicación. Lumi es el nombre del asistente conversacional. La propuesta que sigue detalla el problema, la solución, el stack, la arquitectura, el modelo de datos y la alineación con Gobierno Digital del Perú.",
      { align: "justify" }
    );

  doc.addPage();

  // Table of contents (manual)
  header(doc, "Contenido");
  const toc = sections.map((s, i) => `${i + 2}. ${s.title.replace(/^\d+\.\s*/, "")}`);
  doc.fontSize(10.5).font("Helvetica").fillColor(INK);
  toc.forEach((t) => doc.text(t, { lineGap: 2 }));
  doc.moveDown(1);

  // Sections
  sections.forEach((s) => section(doc, s));

  // Footer page with production link
  doc.addPage();
  header(doc, "Más información");
  doc
    .fontSize(11)
    .fillColor(INK)
    .font("Helvetica")
    .text("Demo en producción:", { continued: false });
  doc.moveDown(0.3);
  doc
    .fillColor(PRIMARY)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text(PROD_URL, { link: PROD_URL });
  doc.moveDown(0.6);
  doc
    .fillColor(INK)
    .font("Helvetica")
    .fontSize(11)
    .text("Repositorio:", { continued: false });
  doc.moveDown(0.3);
  doc
    .fillColor(PRIMARY)
    .font("Helvetica-Bold")
    .fontSize(13)
    .text("https://github.com/RDaniloMM/Cadena-Digital-Peru", {
      link: "https://github.com/RDaniloMM/Cadena-Digital-Peru",
    });
  doc.moveDown(1);
  doc
    .fillColor(MUTED)
    .fontSize(9)
    .font("Helvetica-Oblique")
    .text(
      "Documento generado automáticamente. LUMIA es un proyecto de transformación digital alineado con Gobierno Digital del Perú. Datos referenciales sujetos a validación de las entidades oficiales."
    );

  doc.end();
  console.log(`PDF written to ${OUTPUT}`);
}

main();
