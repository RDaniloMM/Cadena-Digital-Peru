export const documentTypeLabels: Record<string, string> = {
  "academic-degree": "Título universitario (grado o maestría)",
  "academic-transcript": "Certificado de estudios / transcript",
  "primary-secondary-certificate": "Certificado de educación básica o secundaria",
  "notarized-copy": "Copia certificada de un documento",
};

export const purposeLabels: Record<string, string> = {
  study: "Estudios",
  work: "Trabajo",
  residence: "Residencia",
  other: "Otro",
};

export const documentLabels: Record<string, string> = {
  "original-degree": "Título original",
  "sunedu-validation": "Constancia de validación SUNEDU",
  "minedu-certification": "Certificación MINEDU",
  "work-offer": "Carta de trabajo / oferta laboral",
  translation: "Traducción simple",
  "legal-translation": "Traducción pública / legalizada",
  "original-transcript": "Certificado de estudios original",
  "original-certificate": "Certificado de educación básica original",
  "original-document": "Documento original",
  "notary-certified-copy": "Copia certificada por notario",
  "mre-legalization": "Legalización del MRE",
  "consulate-appointment": "Cita en consulado",
};

export const actionLabels: Record<string, string> = {
  "validate-degree": "Validar título",
  "certify-degree": "Certificar título",
  apostille: "Apostillar",
  legalize: "Legalizar",
  "consular-legalization": "Legalización consular",
  "certify-transcript": "Certificar estudios",
  "certify-certificate": "Certificar certificado",
  "certify-copy": "Certificar copia",
};

export function labelForDocumentId(id: string): string {
  return documentLabels[id] ?? id;
}

export function labelForAction(action: string): string {
  return actionLabels[action] ?? action;
}
