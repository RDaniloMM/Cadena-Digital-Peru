# LUMIA — Ruta Digital de Certificación

LUMIA guides Peruvian citizens through the apostille/legalization certification chain for educational titles before they visit the Ministry of Foreign Affairs (MRE).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, React 19, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (sessions)
- [n8n](https://n8n.io/) (assistant workflow)

## Prerequisites

- Node.js 22+ (see `.nvmrc`)
- npm 10+

## Getting started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server with Turbopack |
| `npm run build` | Build the production application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting |

## Project structure

```
app/              # Next.js App Router pages and API routes
components/       # React components and design system
lib/              # Types, schemas, engine, and utilities
data/             # JSON knowledge base (routes, entities, countries)
```

## Knowledge base

Certification rules live as JSON files under `data/`. Update them and redeploy to change behavior without touching application code.

## Deployment

The project is configured for [Vercel](https://vercel.com/):

1. Push the repository.
2. Import the project in Vercel.
3. Set the environment variables from `.env.example`.
4. Deploy.

## License

MIT
