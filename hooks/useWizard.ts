"use client";

import { useCallback, useEffect, useState } from "react";
import { wizardSteps, toResolveInput } from "@/lib/wizard/steps";

const STORAGE_KEY = "lumia-wizard";

export type WizardState = {
  step: number;
  answers: Record<string, string | boolean>;
};

function getInitialState(): WizardState {
  if (typeof window === "undefined") {
    return { step: 0, answers: {} };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as WizardState;
      return {
        step: Math.max(0, Math.min(parsed.step, wizardSteps.length - 1)),
        answers: parsed.answers ?? {},
      };
    }
  } catch {
    // Ignore corrupted storage.
  }
  return { step: 0, answers: {} };
}

export function useWizard() {
  const [state, setState] = useState<WizardState>(getInitialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setState(getInitialState());
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const totalSteps = wizardSteps.length;
  const currentStep = wizardSteps[state.step] ?? wizardSteps[0];
  const isFirstStep = state.step === 0;
  const isLastStep = state.step === totalSteps - 1;
  const canProceed =
    state.answers[currentStep.id] !== undefined &&
    state.answers[currentStep.id] !== "";

  const setAnswer = useCallback(
    (value: string | boolean) => {
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [currentStep.id]: value },
      }));
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
    setAnswer,
    goNext,
    goBack,
    reset,
    resolveInput: toResolveInput(state.answers),
  };
}
