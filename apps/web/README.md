# BuddhaPets — web

The customer-facing frontend. WooCommerce (at `cms.buddhapets.co.za`) is the
commerce engine; this app is everything people actually see.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Woo keys
npm run dev                  # http://localhost:3000
```

## Design tokens

Every brand value lives in one place: the `@theme` block at the top of
`app/globals.css`. It mirrors the "BuddhaPets Brand" design canvas, so
`bg-violet`, `text-ink`, `rounded-card`, `shadow-soft`, `font-display` and the
`bg-tile-*` pastels are all available as Tailwind utilities. Change a colour
there and it changes everywhere — never hard-code a hex in a component.

Two house conventions worth knowing:

- Headlines are Instrument Serif with one italic accent word: use
  `<span className="accent">word</span>` (violet) or `accent-gold` on dark.
- Body copy and all UI text stay Poppins.

## Structure

```
app/                 routes (App Router)
components/ui/       primitives — Button, Eyebrow, SectionHeading, icons
components/sections/ landing page sections, one file each
lib/content.ts       launch copy and catalogue placeholders
lib/woo.ts           server-only WooCommerce REST client
prisma/schema.prisma Calm Quiz storage
```

## Placeholders

Anything in `[brackets]` is waiting on a real fact — reviews, dates, the
business address, publish dates. Never fill these with invented content;
customer reviews in particular must be genuine.
