import { assistantRequestSchema } from "@/lib/schemas/assistant";
import { handleAssistantRequest } from "@/lib/assistant/handler";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = assistantRequestSchema.parse(body);
    const response = await handleAssistantRequest(input);
    return Response.json(response);
  } catch (error) {
    if (isZodError(error)) {
      return Response.json(
        { id: "bad-request", message: "Solicitud inválida.", issues: error.issues },
        { status: 400 }
      );
    }

    console.error("Unexpected error in /api/chat", error);
    return Response.json(
      {
        text: "Ups, Guía no pudo responder en este momento. Por favor, inténtalo de nuevo en unos segundos.",
        suggestions: ["¿Qué es apostilla?", "¿Cómo inicio mi trámite?"],
      },
      { status: 200 }
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
