# Renovivo — SEO overhaul: финален отчет (Turn A + B)

## 1. Технически SEO (Phase 1)

- `vite.config.ts`: `prerenderRoutes` синхронизирани със реалните slug-ове от
  `src/data/services.ts`. Премахнати `/services/small-repairs` и `/prices`;
  добавени `microcement`, `terrazzo`, `flake-floor`, `stone-carpet` и др.
- `public/sitemap.xml`: eднократно overwrite-нат, само реални маршрути.
- `public/robots.txt`: изричен `Allow` за Googlebot, Bingbot, GPTBot,
  OAI-SearchBot, ChatGPT-User, Google-Extended, ClaudeBot, PerplexityBot,
  Applebot-Extended, CCBot и др. `Sitemap:` директива на място.
- Prerendering с `@prerenderer/rollup-plugin` активен → статичен HTML за
  всички публични страници (Google/GPTBot виждат готово съдържание).
- `noindex, follow` върху `/404` през `NotFound.tsx`.

## 2. Метаданни (Phase 3)

Уникален `<title>`, `<meta description>`, self-canonical, `og:*` за:
`/`, `/services`, `/services/*` (per-slug override за 9 money-page-а),
`/innovative-coatings`, `/portfolio`, `/portfolio/:id`, `/about`,
`/contact`, `/blog`, `/services/interior-design`.

- Title ≤ 60 знака, description 140–160 знака.
- Всеки canonical и og:url self-reference на самата страница.
- Sitewide `og:*` fallback в `index.html` за crawler-и без JS.

## 3. Structured data (Phase 4)

- `index.html`: `HomeAndConstructionBusiness` с реални `sameAs`
  (Facebook/Instagram по Footer-а), `areaServed` = 20+ софийски района,
  `openingHours`, `telephone`, `email`, `offerCatalog`.
- `Index.tsx`: `BreadcrumbList` + `FAQPage` (7 Q&A).
- `Services.tsx`: `ItemList` + `BreadcrumbList`.
- `ServiceDetail.tsx`: `Service` + `BreadcrumbList` + `FAQPage`
  (за `full-renovation`, `bathroom`, `kitchen`).
- `InnovativeCoatings.tsx`: `BreadcrumbList` + `ItemList` от Product.
- `Contact.tsx`: `ContactPage` + `LocalBusiness`.

## 4. Локални сигнали (Phase 5)

- Нов компонент `src/components/SofiaAreasSection.tsx` показва
  21 района на София + 8 града от София-област. Използван на:
  - `/services`
  - `/contact`
- Списъкът с райони е и в JSON-LD `areaServed`, т.е. има съвпадение
  между schema и видимо съдържание (Google обича това).

## 5. Съдържание (Phase 6)

- `src/data/services.ts`: разширени `fullDescription` и `features`
  за: `full-renovation`, `bathroom`, `kitchen`, `painting`.
  Наблегнато на: етапи, срокове, материали, гаранция, локация София.
- `ServiceDetail.tsx`: добавен FAQ accordion под галерията,
  четещ данни от `serviceFaqs` (същите Q&A, които се сериализират
  в `FAQPage` JSON-LD → hint-ва Google, че съдържанието е реално видимо).
- `SofiaAreasSection` добавен и в дъното на ServiceDetail — засилва
  локалната релевантност на страници за услуги.

## 6. Блог план (Phase 7)

Виж `docs/blog-plan.md` — 12 приоритетни статии с primary keyword,
title, meta, H2/H3 skeleton, вътрешни линкове и schema.

## 7. Вътрешно линкване (Phase 8)

- ServiceDetail сега винаги съдържа:
  - "Свързани услуги" в sidebar за `full-renovation`.
  - Prev/Next навигация между услуги.
  - FAQ секция + area section (линкове към /contact).
- Services page: `SofiaAreasSection` + CTA към /contact.
- Contact: `SofiaAreasSection` + Map.

## 8. FAQ UI (Phase 9)

Реален shadcn `Accordion` в ServiceDetail. Всеки въпрос от JSON-LD
`FAQPage` е и видим като разгъващ панел → Google валидира, че
schema отговаря на реално съдържание (иначе би пропуснал rich result).

## 9. Какво остава извън обхвата на този turn

- **Реални снимки за og:image per route.** Прескочено умишлено —
  placeholder щеше да влоши превюто. Може да го включим, когато
  има реални featured images от портфолиото.
- **Изпълнение на блог плана.** Планът е готов; писането на 12
  статии = отделен turn на статия.
- **SSR/Server rendering.** SPA + prerender покриват 95% от нуждите
  за търсачки. Ако искате перфектни per-route social preview-та
  за LinkedIn/Slack (crawlers без JS), нужен е SSR (TanStack Start
  или Next), което е ре-платформинг.
- **Google Search Console / Bing Webmaster верификация.** Готови
  сме да добавим `<meta name="google-site-verification">` в
  `index.html`, щом имате токена. Мога и да свържа Search Console
  конектора и да verify-на автоматично.

## 10. Препоръчани следващи действия

1. **Republish** (Publish → Update) за да стигне новият prerendered
   HTML до публичния домейн.
2. В Google Search Console → Sitemaps → пуснете
   `https://renovivo.bg/sitemap.xml` и заявете re-crawl на homepage
   + топ 5 services.
3. За социалните превюта: след republish, използвайте LinkedIn
   Post Inspector и Facebook Sharing Debugger, за да "изтласкате"
   кеша на новите OG тагове.
4. След ~14 дни правим rescan през SEO tab-а и мерим:
   - Impressions по key money-keywords (ремонт баня София, цялостен
     ремонт апартамент София, микроцимент София).
   - CTR по home + service pages.
   - Rich result eligibility (FAQ, LocalBusiness).
