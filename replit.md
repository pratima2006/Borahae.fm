# borahae.fm

borahae.fm is a BTS ARMY streaming tracker for discovering official missions, watching YouTube videos, and keeping a persistent stream journal.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/borahae-fm/src/App.tsx` — authenticated/public routes, dashboard, missions player, video shelf, history, and settings
- `artifacts/borahae-fm/src/index.css` — white and purple visual language, typography, motion, and surface tokens
- `artifacts/api-server/src/routes/borahae.ts` — profile, dashboard, YouTube metadata, videos, streams, history, and leaderboard APIs
- `lib/api-spec/openapi.yaml` — source of truth for the generated API client and Zod contracts
- `lib/db/src/schema/borahae.ts` — persistent profile, video, and stream tables

## Architecture decisions

- Clerk owns browser authentication and Google provider configuration; API access uses the Clerk session cookie.
- Completed streams are recorded from the official YouTube IFrame Player API `ENDED` event and guarded once per player session.
- YouTube metadata is fetched server-side so the API key never reaches the browser.
- Video rows are shared across ARMY; stream history is scoped to the signed-in user.

## Product

Users can sign in with Google, save their profile, browse BANGTANTV missions, play official YouTube videos in-app, add and search videos by real metadata, track completed streams, filter history by member, and view the community leaderboard.

## User preferences

- White and purple theme.
- Use official YouTube IFrame Player API with `enablejsapi=1`.
- Completed playback increments the stream count.

## Gotchas

- Keep `YOUTUBE_API_KEY` server-side; never expose it in frontend code.
- Run API codegen after changing `lib/api-spec/openapi.yaml`.
- Use number schemas for integer-like API values in this workspace's current Zod generator compatibility layer.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
