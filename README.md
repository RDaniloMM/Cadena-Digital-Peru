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
|---|---|---|
| `pnpm dev` | Start the Next.js dev server with Turbopack |
| `pnpm build` | Build the production application |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript without emitting |
| `pnpm test:engine` | Run engine smoke tests |

## Project structure

```
app/              # Next.js App Router pages and API routes
components/       # React components and design system
lib/              # Types, schemas, engine, and utilities
context/          # React context providers
hooks/            # Custom React hooks
data/             # JSON knowledge base (routes, entities, countries)
n8n/              # n8n workflow templates
scripts/          # Build-time / smoke-test scripts
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

### `POST /api/chat`

Send a message to Guía, the LUMIA assistant. The endpoint forwards the message to the configured n8n workflow; if no workflow is configured, it falls back to a local FAQ based on the JSON knowledge base.

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "¿Qué es apostilla?",
    "sessionId": "anon-session-id",
    "channel": "web"
  }'
```

Response:

```json
{
  "text": "La apostilla es una certificación...",
  "suggestions": ["¿Qué países aceptan apostilla?", "¿Cómo inicio mi trámite?"]
}
```

### `POST /api/telegram/webhook`

Telegram bot webhook. Normalizes Telegram updates and routes them through the same assistant handler as the web chat, then replies via the Telegram Bot API.

## Assistant Guía

The floating chat component (`Guía`) is available on every page. It:

- Opens/closes with a bottom-right button.
- Traps focus inside the panel and closes with `Esc`.
- Generates a session ID stored in `localStorage` so the conversation thread is stable across reloads.
- Falls back to a local FAQ when `N8N_WEBHOOK_URL` is not set.

## Engine tests

Run a lightweight engine smoke test without a test runner:

```bash
pnpm test:engine
```

## Accessibility & mobile-first notes

- WCAG 2.1 AA is the target: logical focus order, visible focus indicators, skip-to-content link, `aria-live` regions for result updates, and keyboard-operable wizard.
- Color is never the only indicator: the preparation traffic light pairs a colored dot with text labels.
- Touch targets are at least 40 px (most interactive targets are 44–48 px).
- Form inputs use a minimum 16 px font size to prevent zoom on iOS.
- Animations respect `prefers-reduced-motion`.
- The responsive navigation collapses to an accessible hamburger menu on small viewports.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Description |
|---|---|---|
| `N8N_WEBHOOK_URL` | No | Base URL of the n8n webhook. Leave empty to use the local FAQ fallback. |
| `N8N_WEBHOOK_CHAT_PATH` | No | Optional path appended to `N8N_WEBHOOK_URL` (default: `chat`). |
| `TELEGRAM_BOT_TOKEN` | Only for Telegram | Token from [@BotFather](https://t.me/botfather). |
| `LUMIA_API_URL` | Only for n8n workflow | Public URL of this app so n8n can call `/api/resolve`. |

## n8n setup

1. Import `n8n/workflows/guia-assistant.json` into your n8n instance.
2. Set the webhook path to match `N8N_WEBHOOK_CHAT_PATH` (default `chat`).
3. Configure `LUMIA_API_URL` so the workflow can call `/api/resolve`.
4. Copy the webhook URL into `N8N_WEBHOOK_URL`.

## Telegram bot setup

1. Create a bot with [@BotFather](https://t.me/botfather) and copy the token to `TELEGRAM_BOT_TOKEN`.
2. Set the webhook to your public URL:

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://<your-domain>/api/telegram/webhook"}'
```

3. The Telegram webhook consumes the same assistant handler as the web chat, so answers stay identical across channels.

## Deployment checklist

1. **Environment**
   - Node.js 22+ on the build host.
   - pnpm 11+ (`packageManager` field pins `pnpm@11.1.3`).
   - `pnpm install --frozen-lockfile` in CI.

2. **Vercel**
   - Import the repository in [Vercel](https://vercel.com/).
   - `next.config.ts` sets security headers and image optimization.
   - `vercel.json` pins the install/build commands to pnpm.
   - Add the environment variables from `.env.example` in the Vercel dashboard.
   - Optional: set `KV_URL` / `KV_TOKEN` if you enable server-side cross-channel chat context later.

3. **Before going live**
   - Run `pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm test:engine`, and `pnpm build` locally.
   - Smoke-test all routes: `/`, `/wizard`, `/wizard/result`, `/verificar`, `/transparencia`, `/tramites`.
   - Test the wizard on 320 px, 375 px, 768 px, and 1024 px viewports.
   - Verify Guía fallback answers when `N8N_WEBHOOK_URL` is empty.
   - Configure a real n8n webhook and run an end-to-end assistant test.
   - Set the Telegram bot webhook only after deploying to a public HTTPS URL.

## Architecture notes

- **Route engine**: pure TypeScript functions in `lib/engine/` that read versioned JSON rules. No database is required for resolution.
- **State**: anonymous and client-side. Wizard answers live in `localStorage`; the current route and checklist live in `localStorage`; saved procedures live in `localStorage`.
- **Assistant**: shared handler in `lib/assistant/handler.ts` used by `/api/chat` and `/api/telegram/webhook`. n8n is optional; a keyword FAQ fallback covers common questions.
- **Multi-channel parity**: web chat and Telegram normalize into the same request shape and receive equivalent answers because they share the same handler and optional n8n workflow.
- **Security headers**: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` are set in `next.config.ts`.

## License

[MIT](./LICENSE)
