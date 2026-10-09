# Noor web: build checklist

Work top to bottom, one item at a time.

## Decisions

- [x] Header navigates between pages only (no section anchors)
- [x] Pages: `/` (home), `/materials`, `/pricing`; auth at `/login`, `/signup`
- [x] Material cards use the canvas design (icon chip, numeral, glyph, stats panel, pill CTA)
- [x] Home deck stays as the teaser; the full card catalog lives on `/materials`
- [x] Progress tracking is Premium and lives in the dashboard, not on the materials page (cards stay plain)
- [x] Premium includes: all games, fast access to new material, progress tracking, and more (full list TBD)
- [x] Design values live as tokens or `@utility` classes in `index.css` (lint enforces it; no `allow` exceptions)
- [x] Keep `src/hooks/use-mobile.ts` (wanted later, do not delete)
- [ ] Auth backend (own server, Supabase, Clerk, ...)
- [ ] Text direction: `APP_DIRECTION` is `ltr` for now
- [ ] Premium wording: "early access" (pricing heading) vs "fast access to new material" (plan). Pick one
- [ ] Landing CTA target: `/materials` today, checklist said `/signup`. Pick one

## 0. Cleanup (once)

- [x] Review fixes applied (theme, 404, a11y, Button variants)
- [x] Delete unused `ui/` components, `assets/react.svg`, `public/vite.svg` (`use-mobile.ts` kept on purpose)
- [x] `bun remove @fontsource/ibm-plex-sans-arabic @fontsource-variable/outfit`
- [x] `bun remove shadcn && bun add -d shadcn`
- [x] Add favicon (`public/favicon.svg`) and wire it in `root.tsx`
- [x] Replace arbitrary Tailwind values with tokens (16 lint errors in material-card, site-cta, site-footer, material-stack)
- [x] `bun run format && bun run lint && bun run typecheck` all pass

## 1. Header and routes

- [x] Nav: Materials to `/materials`, Pricing to `/pricing`
- [x] Log in to `/login`, Start free to `/signup`
- [x] Active link state
- [x] Mobile sheet menu uses the same links
- [x] Register routes in `routes.ts` (shared `site-layout` for home, materials, pricing; auth pages stand alone; all four are placeholders)

## 2. Materials page

- [x] `MaterialCard` component (`tone` variant, self-contained)
- [x] `/materials` route with the card grid
- [x] Coming-soon card state (Quran Library: disabled button for now)
- [x] Page meta (title, description)
- [x] Card CTAs link to `/materials/:id` detail pages (loader 404s unknown ids, per-material meta)
- [x] Quran Library routes like the rest (disabled state removed; detail page is the placeholder)

## 3. Pricing page

- [x] Plans section (Free and Premium cards with fan layout)
- [x] FAQ (accordion)
- [x] Page meta
- [ ] Finish the Premium feature list (still ends with "More as we add it"; "Quizzes and notes" is not in the decisions)
- [ ] Write the real answer for "Can I cancel any time?" (placeholder text is visible)
- [ ] Clarify who "free for teachers" covers, and what happens when Premium lapses
- [ ] More FAQs: free trial, payment methods, school/group pricing
- [ ] Closing CTA to `/signup`

## 4. Landing page sections

- [x] Hero and deck
- [x] Closing CTA band (`SiteCta`)
- [x] Footer shell (brand, Materials, Pricing, Log in, copyright)
- [ ] How it works (3 steps)
- [ ] What's inside (numbers strip derived from `MATERIALS` in `src/data/materials.ts`)
- [ ] Why Noor (3 to 4 benefits)
- [ ] Free vs Premium teaser linking to `/pricing` (reuse `PLANS`)
- [ ] Footer: add Terms, Privacy, contact links
- [ ] Optional: lesson preview (sample slide)

## 5. Auth UI

- [ ] `/login` form (Field, Input, Button)
- [ ] `/signup` form
- [ ] Connect to the chosen backend

## 5b. Dashboard (Premium progress tracking)

- [ ] `/dashboard` route (auth required; Premium sees progress, free users see an upsell to `/pricing`)
- [ ] Per-material progress view (not started / in progress / done)
- [ ] Wire real tracking data once the backend exists

## 6. Polish and infrastructure

- [ ] Social meta on every route: `og:title`, `og:description`, `og:image`, `twitter:card`
- [ ] Styled error/404 page inside the site layout (use `Empty`, link home)
- [ ] "Skip to content" link in the layout

## 7. Later

- [ ] `/materials/:id` pages once there is content
- [ ] Terms and Privacy pages
- [ ] Notify-me email capture for the Quran Library
- [ ] Testimonials (only with real ones)
- [ ] Tests and CI (`lint` + `typecheck`)

## 8. Refactor: one Card + component audit

Done:

- [x] Install shadcn `card`, fold in `tone` + `pattern="material" | "price"` variants (`src/components/ui/card.tsx`)
- [x] Migrate `grid.tsx` and `plans.tsx` to `Card`; delete `custom/material-card.tsx`, `custom/price-card.tsx`, `/card-test` route
- [x] `Plan["tone"]` uses `Tone` from `ui/card` (data no longer imports deleted UI)
- [x] Merge `material-stack/` trio into one `landing/stack.tsx` (`Stack` + `StackReceipt`); `useSettled` → `hooks/`, `pad` → `lib/utils.ts`
- [x] Flatten `pages/`: `landing/heading.tsx`, `landing/stack.tsx`, `materials/heading.tsx`, `materials/grid.tsx`, `pricing/heading.tsx`, `pricing/faq.tsx`; header → `components/sections/`
- [x] `Stack` composite: `items` prop (data in), `StackCard` deck body converged onto `Card` slots, tree comment on file
- [x] Watermark fix (bare `text-*` token + color in one `cn()` gets eaten; use `text-(length:…)`), tone buttons get visible 1px border + arrow CTA to match header
- [x] `index.css` cleanup: drop dead tokens (`text-lead`, `leading-arabic`, `leading-premium`, `font-quran`), map disc colors, drop redundant dark `cta`, fix stale refs
- [x] Delete unused `Button` `light` variant; icons barrel (`components/icons/index.ts`); `YEAR` const in footer/header; `Cta` pill back to stock metrics
- [x] Comments describe code only (no mockup/process refs); narration pruned, constraints kept
- [x] `Cta` composite slots (`CtaContent/Title/Description/Action`); `page.tsx` per folder, route files render pages only; short names (`Cta`, `Header`, `Footer`)
- [x] `Heading` composite (`HeadingEyebrow/Title/Lead`, `HeadingAccent`); all three page headings compose it

Still to do:

- [x] `custom/deck.tsx` — frame through `Card pattern="deck"`, `DeckCard` takes `tone` prop (data no longer imports deck types), state/actions contexts split (swipes skip pure controls)
- [x] `custom/receipt.tsx` — decided: stays independent (ruled-paper grid vs free-flow slips; shared leaves already shared)
- [ ] `custom/plan-fan.tsx` — page layout, not a component (stays with pricing until a third plan forces a generic `Fan`)
- [ ] Headings done above; fourth heading reuses the composite, no new pattern
- [ ] Auth forms (`/login`, `/signup`) — install shadcn `field` + `input` (+ `label`) and adjust, when section 5 starts
- [ ] "Coming soon" badge (section 2 item) — install shadcn `badge` and adjust, when needed
