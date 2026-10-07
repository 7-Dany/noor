# Noor web

Landing site for Noor: free teaching material for Arabic & Quran.

Stack: React Router (SSR) · Vite · Tailwind v4 · shadcn/ui (Base UI) · Bun.

## Setup

```bash
cp .env.example .env   # set SESSION_SECRET
bun install
bun run dev
```

## Scripts

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `bun run dev`       | Dev server                       |
| `bun run build`     | Production build                 |
| `bun run start`     | Serve the build                  |
| `bun run lint`      | ESLint (includes design rules)   |
| `bun run typecheck` | Route typegen + `tsc -b`         |
| `bun run format`    | Prettier                         |

## Conventions

- Design values live as tokens in `src/index.css`; app code uses no raw
  colors, arbitrary values or inline styles (enforced by ESLint).
- `src/components/ui` holds self-contained shadcn-style components. App code
  composes them and never restyles them: add a variant instead.
- Text direction is set once in `APP_DIRECTION` (`src/context/app`).
