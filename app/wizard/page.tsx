"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/hooks/useWizard";
import { useVerification } from "@/context/VerificationContext";
import { StepCard } from "@/components/ui/StepCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ResolvedRoute } from "@/lib/types/lumia";

export default function WizardPage() {
  const router = useRouter();
  const {
    step,
    totalSteps,
    currentStep,
    answers,
    isFirstStep,
    isLastStep,
    canProceed,
    hydrated,
    setAnswer,
    goNext,
    goBack,
    reset,
    resolveInput,
  } = useWizard();
  const { setRoute, resetDocuments } = useVerification();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    setError(null);
    if (!isLastStep) {
      goNext();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resolveInput),
      });
      const data = (await response.json()) as ResolvedRoute;
      if (!response.ok) {
        setError(
          (data as { message?: string }).message ??
            "No pudimos resolver la ruta. Inténtalo de nuevo."
        );
        setSubmitting(false);
        return;
      }
      resetDocuments();
      setRoute(data);
      router.push("/wizard/result");
    } catch {
      setError("Ocurrió un error de red. Inténtalo de nuevo.");
      setSubmitting(false);
    }
  };

  if (!hydrated) {
    return (
      <main className="mx-auto flex w-full max-w-2xl items-center justify-center px-4 py-24 sm:px-6">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-lumia-primary border-t-transparent" aria-label="Cargando asistente" />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <ProgressBar current={step + 1} total={totalSteps} />
      </div>

      <StepCard
        name={currentStep.id}
        question={currentStep.question}
        options={currentStep.options}
        value={answers[currentStep.id]}
        onChange={setAnswer}
      />

      {error && (
        <Card className="mt-4 border-lumia-error/30 bg-lumia-error/5">
          <p className="text-sm text-lumia-error" role="alert">
            {error}
          </p>
        </Card>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={isFirstStep}
          className="w-full sm:w-auto"
        >
          Atrás
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed || submitting}
          className="w-full sm:w-auto"
        >
          {submitting ? "Resolviendo..." : isLastStep ? "Ver resultado" : "Siguiente"}
        </Button>
      </div>

      <div className="mt-6 text-center">
        <Button variant="ghost" size="sm" onClick={reset}>
          Reiniciar asistente
        </Button>
      </div>
    </main>
  );
}
