"use client";

import type { ReactNode } from "react";
import { VerificationProvider } from "@/context/VerificationContext";

export function ClientProviders({ children }: { children: ReactNode }) {
  return <VerificationProvider>{children}</VerificationProvider>;
}
