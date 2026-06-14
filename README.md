# LUMIA — Ruta Digital de Certificación

LUMIA guides Peruvian citizens through the apostille/legalization certification chain for educational titles before they visit the Ministry of Foreign Affairs (MRE).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [n8n](https://n8n.io/) (assistant workflow)

## Prerequisites

- Node.js 22+ (see `.nvmrc`)
- pnpm 11+

## Getting started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the Next.js dev server with Turbopack |
| `pnpm build` | Build the production application |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript without emitting |

## Project structure

```
app/              # Next.js App Router pages and API routes
components/       # React components and design system
lib/              # Types, schemas, engine, and utilities
data/             # JSON knowledge base (routes, entities, countries)
```

## Knowledge base

Certification rules live as JSON files under `data/`. Update them and redeploy to change behavior without touching application code.

The engine validates `data/routes.json` against the JSON Schema at build/import time; an invalid knowledge base fails the build immediately.

## Internal API

### `POST /api/resolve`

Resolve a certification route from citizen answers.

```bash
curl -X POST http://localhost:3000/api/resolve \
  -H "Content-Type: application/json" \
  -d '{
    "documentTypeId": "academic-degree",
    "destinationCountryCode": "ES",
    "purpose": "study",
    "hasOriginalDocument": true
  }'
```

Response (Hague destination):

```json
{
  "id": "edu-degree-hague-study",
  "steps": [
    { "entityId": "sunedu", "action": "validate-degree", "cost": 50, "days": 5 },
    { "entityId": "minedu", "action": "certify-degree", "cost": 30, "days": 3 },
    { "entityId": "mre", "action": "apostille", "cost": 20, "days": 2 }
  ],
  "requiredDocuments": ["original-degree", "sunedu-validation", "minedu-certification"],
  "optionalDocuments": ["translation", "legal-translation"],
  "totalCost": 100,
  "totalDays": 10
}
```

### `GET /api/routes`

List available route templates.

```bash
curl http://localhost:3000/api/routes
```

## Engine tests

Run a lightweight engine smoke test without a test runner:

```bash
pnpm test:engine
```

## Deployment

The project is configured for [Vercel](https://vercel.com/):

1. Push the repository.
2. Import the project in Vercel.
3. Set the environment variables from `.env.example`.
4. Deploy.

## License

MIT
