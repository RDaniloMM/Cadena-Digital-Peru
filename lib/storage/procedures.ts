const STORAGE_KEY = "lumia-procedures";

export type SavedProcedure = {
  id: string;
  routeId: string;
  index: number;
  savedAt: string;
};

export function listProcedures(): SavedProcedure[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? (JSON.parse(stored) as SavedProcedure[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProcedure(input: {
  routeId: string;
  index: number;
}): SavedProcedure {
  const procedures = listProcedures();
  const procedure: SavedProcedure = {
    id: crypto.randomUUID(),
    routeId: input.routeId,
    index: input.index,
    savedAt: new Date().toISOString(),
  };
  procedures.push(procedure);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(procedures));
  return procedure;
}

export function removeProcedure(id: string): void {
  const procedures = listProcedures().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(procedures));
}
