"use client";

import { useCallback, useEffect, useState } from "react";
import { wizardSteps, toResolveInput } from "@/lib/wizard/steps";

const STORAGE_KEY = "lumia-wizard";

export type WizardState = {
  step: number;
  answers: Record<string, string | boolean>;
};

export function useWizard() {
  const [state, setState] = useState<WizardState>({ step: 0, answers: {} });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as WizardState;
        setState({
          step: Math.max(0, Math.min(parsed.step, wizardSteps.length - 1)),
          answers: parsed.answers ?? {},
        });
      }
    } catch {
      // Ignore corrupted storage.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const totalSteps = wizardSteps.length;
  const currentStep = wizardSteps[state.step] ?? wizardSteps[0];
  const isFirstStep = state.step === 0;
  const isLastStep = state.step === totalSteps - 1;
  const currentAnswer = state.answers[currentStep.id];
  const canProceed =
    currentAnswer !== undefined && currentAnswer !== "";

  const setAnswer = useCallback(
    (value: string | boolean) => {
      setState((prev) => {
        const stepId = wizardSteps[prev.step]?.id ?? currentStep.id;
        return {
          ...prev,
          answers: { ...prev.answers, [stepId]: value },
        };
      });
    },
    [currentStep.id]
  );

  const goNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: Math.min(prev.step + 1, totalSteps - 1),
    }));
  }, [totalSteps]);

  const goBack = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: Math.max(prev.step - 1, 0),
    }));
  }, []);

  const reset = useCallback(() => {
    setState({ step: 0, answers: {} });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    step: state.step,
    totalSteps,
    currentStep,
    answers: state.answers,
    isFirstStep,
    isLastStep,
    canProceed,
    hydrated,
    setAnswer,
    goNext,
    goBack,
    reset,
    resolveInput: toResolveInput(state.answers),
  };
}
