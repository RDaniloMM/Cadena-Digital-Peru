import { documentTypeLabels, purposeLabels } from "@/lib/labels";
import countries from "@/data/countries.json";

export type WizardStepType = "select" | "boolean";

export type WizardStepOption = {
  value: string;
  label: string;
};

export type WizardStep = {
  id: string;
  question: string;
  type: WizardStepType;
  options?: WizardStepOption[];
};

const countryOptions: WizardStepOption[] = countries.countries.map((c) => ({
  value: c.code,
  label: c.name,
}));

export const wizardSteps: WizardStep[] = [
  {
    id: "documentType",
    question: "¿Qué tipo de documento necesitas certificar?",
    type: "select",
    options: Object.entries(documentTypeLabels).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    id: "country",
    question: "¿A qué país va dirigido el documento?",
    type: "select",
    options: countryOptions,
  },
  {
    id: "purpose",
    question: "¿Cuál es el propósito del trámite?",
    type: "select",
    options: Object.entries(purposeLabels).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    id: "hasOriginal",
    question: "¿Cuentas con el documento original?",
    type: "boolean",
  },
];

export function toResolveInput(
  answers: Record<string, string | boolean>
): {
  documentTypeId: string;
  destinationCountryCode: string;
  purpose: string;
  hasOriginalDocument: boolean;
} {
  return {
    documentTypeId: String(answers.documentType ?? ""),
    destinationCountryCode: String(answers.country ?? ""),
    purpose: String(answers.purpose ?? ""),
    hasOriginalDocument: answers.hasOriginal === true || answers.hasOriginal === "true",
  };
}
