# BuddhaPets — Hybrid Build Spec (v1)

**Decided:** 28 Aug 2026 · Stack: WooCommerce engine + custom Next.js frontend · Host: Contabo VPS
**V1 signature features:** Calm Quiz → Zen Plan, Ritual Bundle Builder
**Design:** Premium variant of the Pepito direction (see the BuddhaPets Brand canvas — purple/pink, Poppins, pastel tiles)

---

## 1. Architecture

```
                        Cloudflare (DNS, CDN, WAF, free tier)
                                      |
                         Contabo VPS (Ubuntu 24.04)
                                      |
                            Nginx reverse proxy + TLS
                     /                                \
        buddhapets.co.za                        cms.buddhapets.co.za
        Next.js 15 (Node, pm2 or Docker)      WordPress + WooCommerce
        - Landing page (premium design)       - Product catalog & inventory
        - Catalog + product pages             - Orders, refunds, coupons
        - Calm Quiz + Zen Plan                - Paystack + Payfast plugins
        - Bundle builder                      - Woo REST API + Store API
        - Journal (SEO content)               - wp-admin = your back office
                     \                                /
                      MariaDB (Woo)  ·  Postgres (quiz/Prisma)
                      Brevo (email automation, free tier)
```

**The split:** WooCommerce solves the boring-but-hard problems (cart, orders, tax, refunds, payment plugins). Next.js owns everything the customer sees, which is where "premium" lives. The two talk over the Woo REST API (server-side, key-authenticated) and Store API (cart).

**Checkout strategy (v1):** Next.js builds the cart via the Woo Store API, then hands off to the WooCommerce checkout page (styled to match the brand) where the official **Paystack** and **Payfast** plugins handle payment. This means zero custom payment code and no PCI surface in v1. A fully headless checkout is a v2 upgrade, only if the handoff measurably hurts conversion.

## 2. The Calm Quiz → Zen Plan (conversion engine)

- 6–8 step quiz, one question per screen (pet type, triggers, stress signals, routine, owner goals). Built in Next.js, state client-side, ~2 minutes.
- Scoring maps answers to one of 4–6 **named plans** ("The Thunder Protocol", "The Home-Alone Ritual", …). Each plan = a one-paragraph ritual + 2–3 matched products + a bundle CTA.
- Email gate *after* showing a teaser of the result (higher completion than gating upfront).
- On submit, an API route: stores the result (Postgres via Prisma), creates/updates the Woo customer with a plan tag (Woo REST), and fires a Brevo automation (deliver plan → day-2 ritual tip → day-4 bundle offer with the 60-Day Guarantee).
- The quiz result page IS the Zen Plan — shareable URL, pre-filled cart button.

## 3. Ritual Bundle Builder (AOV engine)

- V1 keeps pricing logic inside Woo: each bundle is a Woo product assembled with a bundle plugin (WPC Product Bundles free tier, or Woo's native grouped products + an auto-applied coupon).
- Next.js renders the premium picker UI (choose your bed → chew → guide, live price with "save 15%"), then adds the matching bundle SKU/coupon to the cart via Store API.
- Zen Plans deep-link into the builder with their products pre-selected.

## 4. VPS layout (Contabo)

| Concern | Choice |
|---|---|
| OS | Ubuntu 24.04 LTS |
| Runtime | Docker Compose: nginx, wordpress (php-fpm), mariadb, postgres, nextjs — one `infra/` folder, reproducible |
| TLS | Let's Encrypt via certbot or Caddy/Traefik |
| Security | UFW (80/443/SSH only), Fail2Ban, SSH keys only — per your VPS checklist doc |
| Backups | Nightly `mysqldump` + `pg_dump` + wp-content to Contabo object storage or Backblaze B2 |
| CDN/cache | Cloudflare in front; Next.js ISR for catalog pages so product pages are static-fast |
| Region | Pick Contabo **US East** if most customers are US; admin latency from SA is irrelevant |

## 5. Repo & project structure

```
buddhapets/
  apps/web/          Next.js 15, TypeScript, Tailwind (design tokens from the brand canvas)
  apps/web/prisma/   Quiz schema (QuizResult, PlanAssignment)
  infra/             docker-compose.yml, nginx conf, .env.example
  wp/                wp-content only (child theme for checkout styling, must-use plugins)
  Docs/              specs (this file), brand assets
```

## 6. Supporting services

- **Email:** Brevo free tier (300/day) — quiz flows, abandoned cart (Woo webhook → Brevo event).
- **Analytics:** Plausible (self-host on the same VPS) + Meta/TikTok pixels for ads.
- **Payments:** Paystack + Payfast Woo plugins from day one; PayPal via FNB as v1.1.
- **Fulfillment:** CJdropshipping — manual order placement below ~10 orders/day, CJ API integration later.
- **Currency:** price and settle in USD; Woo multi-currency display later if data shows non-US traffic.

## 7. Build order (~5 weeks part-time)

1. **Week 1 — Engine room.** VPS hardening, Docker stack up, WP + Woo installed, Paystack/Payfast sandbox, first 10 products imported from CJ.
2. **Week 2 — Design system.** Next.js scaffold, Tailwind tokens from the brand board, landing page built for real (hero photo, not gradient).
3. **Week 3 — Catalog.** Collection + product pages via Woo REST with ISR, cart via Store API, checkout handoff styled.
4. **Week 4 — Calm Quiz.** Quiz flow, scoring, Zen Plan pages, Prisma storage, Brevo automation, Woo tagging.
5. **Week 5 — Bundles + launch prep.** Bundle builder UI + Woo bundle products, journal with 3 articles, SEO/meta/OG, Plausible, backup cron, test orders end-to-end in sandbox, then live keys.

## 8. Deferred (v2 backlog)

Headless checkout · AI Zen Assistant chatbot · ZenChews subscriptions + Monthly Calm Box · calm sounds player · per-product live delivery estimates · Karma points loyalty · pet profiles with evolving quiz scores · CJ API auto-fulfillment.

---

*Costs unchanged from the launch plan (~$500 launch, ads dominate). The Pepito theme license is NOT needed on this path — the design is our own premium variant, and Woo runs headless with a near-blank theme.*
