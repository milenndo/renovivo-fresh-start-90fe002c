
# Sitewide SEO Rebuild Plan — renovivo.bg

## Phase 0 — Reality check on your audit premise

Before rewriting, I inspected the codebase. Your brief assumes multiple pages share the homepage's `<title>`, description and canonical. That is **not** what the code does today:

- Every important page renders its own `<Helmet>` with a unique `<title>`, `meta description`, `canonical`, `og:url`, and `og:description`. Verified in: `Index`, `Services`, `ServiceDetail` (dynamic per service `id`), `InteriorDesign`, `InnovativeCoatings`, `Portfolio`, `ProjectDetail`, `About`, `Contact`, `Blog`, `BlogPost` (dynamic per slug), plus `noindex` on `Auth`, `Admin`, `NotFound`.
- `index.html` holds only the **sitewide fallback** (`Renovivo | ...` + org description + Organization JSON-LD). That fallback is what a crawler sees only if JS/prerender doesn't run.
- The project **is** prerendered in production (`@prerenderer/rollup-plugin` in `vite.config.ts`) for 21 routes, so Googlebot and GPTBot get the per-route static HTML with the correct per-page tags.

**What is actually likely happening in whatever SEO tool you ran:**

1. The tool crawled the **preview URL** (`*.lovable.app`) or the site **before** the last prerender deploy — in that state a non-JS crawler sees only `index.html`'s homepage tags on every URL. Fix = republish, then re-crawl `https://renovivo.bg`.
2. `/pricing` is listed in your brief but **doesn't exist as a route** in `App.tsx` (we removed pricing recently). It 404s → any tool reporting it as "duplicate homepage metadata" is reporting a ghost URL. Also `vite.config.ts` still prerenders `/prices` which now 404s.
3. `sitemap.xml` includes service slugs that have no matching route (`/services/full-renovation`, `/services/painting`, `/services/flooring`, `/services/electrical`, `/services/plumbing`, `/services/small-repairs`, `/services/microcement`, `/services/terrazzo`, `/services/flake-floor`, `/services/stone-carpet`). These resolve to `ServiceDetail` only if `src/data/services.ts` has a matching `id`; otherwise they render "service not found" with a generic title. Needs to be reconciled.

So the real work isn't "stop sharing homepage metadata" — it's:

- clean up broken/ghost URLs and reconcile sitemap ↔ routes ↔ prerender list,
- tighten each existing per-page title/description to real keyword targets,
- rebuild thin service pages with proper depth,
- add missing schema (Breadcrumb, Service, LocalBusiness with `areaServed`),
- build out the blog content architecture.

## Phase 1 — Technical cleanup (foundational, do first)

1. **Reconcile routes ↔ sitemap ↔ prerender**
   - Read `src/data/services.ts` and list actual valid `:id` values.
   - Remove non-existent slugs from `public/sitemap.xml` and `vite.config.ts` `prerenderRoutes`.
   - Drop `/prices` from prerender list.
   - Add `/services/interior-design` (already a real route) to prerender list.
2. **ServiceDetail "not found" state** — currently returns a page with a generic title. Add `noindex` + proper 404-style copy when `service` is undefined so ghost URLs don't pollute the index.
3. **Canonical hygiene** — audit each Helmet block, confirm `canonical` + `og:url` self-reference the current route (already true, but re-verify for `ServiceDetail` dynamic id and `ProjectDetail`/`BlogPost` slug edge cases).
4. **Sitemap generator** — replace static `public/sitemap.xml` with `scripts/generate-sitemap.ts` wired to `predev`/`prebuild`, sourced from `src/data/services.ts` + published blog posts from the DB, so it can never drift again.
5. **Robots** — already correct; leave as-is.

## Phase 2 — Keyword-to-page map

One primary + 3–5 secondary keywords per money page. Bulgarian, local-intent.

| URL | Primary | Secondary |
|---|---|---|
| `/` | ремонти София | цялостен ремонт апартамент София, фирма за ремонти София, ремонтна фирма София |
| `/services` | ремонтни услуги София | довършителни работи София, вътрешен ремонт София, строителни услуги София |
| `/services/full-renovation` | цялостен ремонт на апартамент София | ремонт апартамент до ключ София, ремонт от А до Я София |
| `/services/bathroom` | ремонт на баня София | ремонт на малка баня София, ВиК ремонт баня, обзавеждане на баня София |
| `/services/kitchen` | ремонт на кухня София | преустройство на кухня, кухненски ремонт до ключ София |
| `/services/painting` | боядисване на апартамент София | латексово боядисване София, шпакловка и боядисване София |
| `/services/interior-design` | интериорен дизайн София | 3D проект интериор София, дизайн на апартамент София |
| `/innovative-coatings` | микроцимент София | terrazzo подове София, декоративни покрития София |
| `/portfolio` | ремонти София снимки преди и след | завършени ремонти София, портфолио ремонти апартамент |
| `/about` | ремонтна фирма София опит | Renovivo екип, надеждна ремонтна фирма София |
| `/contact` | безплатен оглед за ремонт София | оферта за ремонт София, консултация ремонт апартамент София |
| `/blog` | блог за ремонти | съвети за ремонт на апартамент, планиране на ремонт |

## Phase 3 — Rewrite per-page metadata (production-ready)

I'll update titles to ≤60 chars, descriptions 140–160 chars, with primary keyword + Sofia + a differentiator. New values:

- `/` — **Title:** `Ремонти в София | Цялостен ремонт до ключ – Renovivo` · **Desc:** `Ремонти в София от един координиран екип от А до Я. Цялостен ремонт на апартаменти, бани и кухни. Безплатен оглед и писмена оферта.`
- `/services` — `Ремонтни услуги в София – Renovivo | Пълен списък услуги` · `Всички ремонтни услуги в София на едно място: цялостен ремонт, бани, кухни, боядисване, ВиК, електро, микроцимент. Един екип от А до Я.`
- `/services/full-renovation` — `Цялостен ремонт на апартамент в София до ключ | Renovivo` · `Цялостен ремонт на апартамент в София от един екип – от демонтаж до финално почистване. Ясен срок, 24 месеца гаранция, безплатен оглед.`
- `/services/bathroom` — `Ремонт на баня в София до ключ | Renovivo` · `Ремонт на баня в София от А до Я: ВиК, зидария, шпакловка, плочки, санитария. Срок 15–25 работни дни, писмена гаранция 24 месеца.`
- `/services/kitchen` — `Ремонт на кухня в София | Renovivo – цялостно решение`
- `/services/painting` — `Боядисване на апартамент в София | Шпакловка и латекс – Renovivo`
- `/services/interior-design` — `Интериорен дизайн в София | 3D проект и авторски надзор – Renovivo`
- `/innovative-coatings` — `Микроцимент, Terrazzo и декоративни покрития в София | Renovivo`
- `/portfolio` — `Портфолио ремонти в София | Снимки преди/след – Renovivo`
- `/about` — `За Renovivo | Ремонтна фирма в София с координиран екип`
- `/contact` — `Безплатен оглед и оферта за ремонт в София | Renovivo`
- `/blog` — `Блог за ремонти в София | Съвети и планиране – Renovivo`

Every page keeps a self-referencing canonical + og:url, unique og:title/og:description matching the visible H1.

## Phase 4 — Structured data

Additions (per-page via Helmet, plus one sitewide):

- `index.html` — keep Organization/LocalBusiness. Extend to `HomeAndConstructionBusiness` with `areaServed` (София + София-област квартали), `openingHoursSpecification`, `priceRange`, `sameAs` (Facebook, Instagram), `telephone`, `email`.
- Every route — add `BreadcrumbList` JSON-LD (currently only `/` has it).
- Each `/services/*` page — add `Service` schema with `provider`, `areaServed`, `serviceType`.
- `/contact` — `ContactPage` + reuse LocalBusiness.
- `BlogPost` — add proper `BlogPosting` with `author`, `datePublished`, `image`, `mainEntityOfPage`.
- Keep `FAQPage` on `/`; add page-specific FAQPage blocks on `/services/bathroom`, `/services/kitchen`, `/services/full-renovation` (3–5 Qs each).

## Phase 5 — Local SEO

- NAP consistency check: phone `+359 89 371 29 19`, email `office@renovivo.bg`, address "гр. София, България" — align across `index.html`, Footer, Contact, JSON-LD, `llms.txt`.
- Add `areaServed` list of Sofia districts to LocalBusiness schema (Лозенец, Изток, Витоша, Младост, Люлин, Дружба, Овча Купел, Красно село, Студентски град, Център).
- Add a "Работим в тези райони на София" section on `/contact` and `/services` (visible content backing the schema — not a doorway page).
- Add trust signals block (гаранция 24 месеца, писмена оферта, един екип) to service pages consistently.

## Phase 6 — Service page rebuild (per template)

For `full-renovation`, `bathroom`, `kitchen`, `painting`, `interior-design`: expand `src/data/services.ts` entries (or the page bodies) to include the standard blocks: intro → what's included → етапи на работа → материали и методи → срок → фактори за цена → гаранция → FAQ → CTA → related services links. Keep tone premium. Add contextual internal links (bathroom → full-renovation, painting, portfolio, contact).

## Phase 7 — Blog architecture

Ship as outlines only (no thin AI content). Deliver a content brief file (`docs/blog-plan.md`) with 12 prioritized articles: slug, title, meta desc, primary keyword, intent, target internal links to money pages. Examples:

1. `kolko-struva-remont-na-apartament-sofia` → informational → links to `/services/full-renovation`, `/contact`
2. `remont-na-banya-sofia-cena-i-etapi` → commercial-info → `/services/bathroom`
3. `kolko-vreme-otnema-cyalosten-remont` → info → `/services/full-renovation`
4. `mikrociment-banya-plyusove-minusi` → info → `/innovative-coatings`
5. `planirane-na-remont-cheklist` → info → `/services`, `/contact`
6. `kak-da-izberem-remontna-firma-sofia` → commercial-info → `/about`, `/contact`
7. `boyadisvane-na-apartament-cena-faktori` → `/services/painting`
8. `remont-na-malka-banya-idei` → `/services/bathroom`, `/portfolio`
9. `remont-na-kuhnya-otvoreno-prostranstvo` → `/services/kitchen`
10. `chesti-greshki-pri-remont-na-apartament` → `/services/full-renovation`
11. `terrazzo-vs-mikrociment` → `/innovative-coatings`
12. `remont-do-klyuch-kakvo-vklyuchva` → `/services/full-renovation`, `/contact`

## Phase 8 — Internal linking

- Homepage service grid → link each card to its `/services/:id`.
- Service pages → "Свързани услуги" block (3 links) + link to `/portfolio` and `/contact`.
- Portfolio card → link project category to matching service.
- BlogPost → 2–4 in-body links to money pages based on topic; sidebar "Поискайте оглед" CTA.

## Phase 9 — Conversion touch-ups (light, only where SEO overlaps)

- Add trust block (гаранция, един екип, безплатен оглед) above the fold on service pages.
- Sticky "Безплатен оглед" CTA on service and portfolio pages on mobile.
- FAQ accordion at bottom of every service page (also feeds FAQPage schema).

## Phase 10 — Final deliverable

After implementation I'll return: summary of issues found, list of changes, final metadata table (URL/title/desc/canonical/H1/primary kw), schema types per page, internal linking summary, blog plan file location, remaining manual tasks (GSC re-submit, Business Profile updates, backlink outreach).

---

## Suggested execution order (multi-turn, because of size)

This is 3–5 turns of work. I recommend:

- **Turn A (now, if you approve):** Phase 1 (technical cleanup: sitemap generator, remove ghost routes, ServiceDetail noindex-on-missing, reconcile prerender) + Phase 3 (rewrite all page titles/descriptions) + Phase 4 (add BreadcrumbList + Service + expanded LocalBusiness schema).
- **Turn B:** Phase 5 local SEO visible content + Phase 6 service page content expansion for the 5 priority services.
- **Turn C:** Phase 7 blog plan doc + Phase 8 internal linking pass + Phase 9 conversion touches + Phase 10 report.

## Confirm before I start

1. Approve the plan as-is, or tell me which phases to drop / reorder.
2. Confirm the **exact service slugs** you want live. Current `App.tsx` route is `/services/:id` and data lives in `src/data/services.ts` — I'll use whatever's there unless you want new slugs.
3. Any facts I must not invent: number of completed projects, years of experience, team size, specific district coverage. If you give me the real numbers I'll bake them into copy + schema; otherwise I keep copy claim-free.
