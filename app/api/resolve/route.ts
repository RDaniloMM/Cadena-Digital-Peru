import { loadKnowledgeBase, resolveRoute } from "@/lib/engine";
import { resolveInputSchema } from "@/lib/schemas/resolve";
import countries from "@/data/countries.json";
import entities from "@/data/entities.json";
import routes from "@/data/routes.json";

const knowledgeBase = loadKnowledgeBase(routes, countries, entities);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = resolveInputSchema.parse(body);
    const resolved = resolveRoute(input, knowledgeBase);
    return Response.json(resolved);
  } catch (error) {
    if (isZodError(error)) {
      return Response.json(
        { id: "bad-request", message: "Solicitud inválida.", issues: error.issues },
        { status: 400 }
      );
    }
    return Response.json(
      { id: "error", message: "Error interno al resolver la ruta." },
      { status: 500 }
    );
  }
}

function isZodError(error: unknown): error is { issues: unknown[] } {
  return (
    typeof error === "object" &&
    error !== null &&
    "issues" in error &&
    Array.isArray((error as { issues?: unknown }).issues)
  );
}
