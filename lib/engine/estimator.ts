import type { RouteStep } from "@/lib/types/lumia";

export type StepEstimate = RouteStep & {
  stepNumber: number;
};

export type EstimateResult = {
  totalCost: number;
  totalDays: number;
  steps: StepEstimate[];
};

export function estimateSteps(steps: RouteStep[]): EstimateResult {
  const numbered = steps.map((step, index) => ({
    ...step,
    stepNumber: index + 1,
  }));

  return {
    totalCost: steps.reduce((sum, step) => sum + step.cost, 0),
    totalDays: steps.reduce((sum, step) => sum + step.days, 0),
    steps: numbered,
  };
}

export type ReadinessInput = {
  requiredDocuments: string[];
  optionalDocuments: string[];
  readyDocuments: string[];
};

export function computePreparationIndex(input: ReadinessInput): number {
  const requiredTotal = input.requiredDocuments.length;
  const optionalTotal = input.optionalDocuments.length;

  const requiredReady = input.requiredDocuments.filter((doc) =>
    input.readyDocuments.includes(doc)
  ).length;
  const optionalReady = input.optionalDocuments.filter((doc) =>
    input.readyDocuments.includes(doc)
  ).length;

  const requiredScore =
    requiredTotal === 0 ? 0 : (requiredReady / requiredTotal) * 80;
  const optionalScore =
    optionalTotal === 0 ? 0 : (optionalReady / optionalTotal) * 20;

  return Math.min(100, Math.round(requiredScore + optionalScore));
}

export function trafficLightClass(index: number): "red" | "yellow" | "green" {
  if (index < 50) return "red";
  if (index < 90) return "yellow";
  return "green";
}
