"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { isNoRoute, type ResolvedRoute, type Route } from "@/lib/types/lumia";
import {
  computePreparationIndex,
  trafficLightClass,
} from "@/lib/engine/estimator";

type VerificationContextValue = {
  route: ResolvedRoute | null;
  activeRoute: Route | null;
  readyDocuments: string[];
  preparationIndex: number;
  light: "red" | "yellow" | "green";
  setRoute: (route: ResolvedRoute | null) => void;
  toggleDocument: (id: string) => void;
  resetDocuments: () => void;
  isReady: (id: string) => boolean;
};

const VerificationContext = createContext<VerificationContextValue | null>(
  null
);

const ROUTE_KEY = "lumia-current-route";
const DOCS_KEY = "lumia-ready-documents";

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [route, setRouteState] = useState<ResolvedRoute | null>(null);
  const [readyDocuments, setReadyDocuments] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedRoute = localStorage.getItem(ROUTE_KEY);
      const storedDocs = localStorage.getItem(DOCS_KEY);
      if (storedRoute) {
        setRouteState(JSON.parse(storedRoute) as ResolvedRoute);
      }
      if (storedDocs) {
        setReadyDocuments(JSON.parse(storedDocs) as string[]);
      }
    } catch {
      // Ignore malformed localStorage values.
    }
    setHydrated(true);
  }, []);

  const setRoute = useCallback((next: ResolvedRoute | null) => {
    setRouteState(next);
    if (next) {
      localStorage.setItem(ROUTE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(ROUTE_KEY);
    }
  }, []);

  const toggleDocument = useCallback((id: string) => {
    setReadyDocuments((prev) => {
      const next = prev.includes(id)
        ? prev.filter((doc) => doc !== id)
        : [...prev, id];
      localStorage.setItem(DOCS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetDocuments = useCallback(() => {
    setReadyDocuments([]);
    localStorage.removeItem(DOCS_KEY);
  }, []);

  const isReady = useCallback(
    (id: string) => readyDocuments.includes(id),
    [readyDocuments]
  );

  const activeRoute = useMemo<Route | null>(() => {
    if (!route || isNoRoute(route)) return null;
    return route;
  }, [route]);

  const preparationIndex = useMemo(() => {
    if (!activeRoute) return 0;
    return computePreparationIndex({
      requiredDocuments: activeRoute.requiredDocuments,
      optionalDocuments: activeRoute.optionalDocuments,
      readyDocuments,
    });
  }, [activeRoute, readyDocuments]);

  const light = useMemo(
    () => trafficLightClass(preparationIndex),
    [preparationIndex]
  );

  const value = useMemo(
    () => ({
      route,
      activeRoute,
      readyDocuments,
      preparationIndex,
      light,
      setRoute,
      toggleDocument,
      resetDocuments,
      isReady,
    }),
    [
      route,
      activeRoute,
      readyDocuments,
      preparationIndex,
      light,
      setRoute,
      toggleDocument,
      resetDocuments,
      isReady,
    ]
  );

  // Prevent mismatched SSR/hydration output.
  if (!hydrated) {
    return (
      <VerificationContext.Provider
        value={{
          route: null,
          activeRoute: null,
          readyDocuments: [],
          preparationIndex: 0,
          light: "red",
          setRoute: () => {},
          toggleDocument: () => {},
          resetDocuments: () => {},
          isReady: () => false,
        }}
      >
        {children}
      </VerificationContext.Provider>
    );
  }

  return (
    <VerificationContext.Provider value={value}>
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification(): VerificationContextValue {
  const ctx = useContext(VerificationContext);
  if (!ctx) {
    throw new Error(
      "useVerification must be used within a VerificationProvider"
    );
  }
  return ctx;
}
