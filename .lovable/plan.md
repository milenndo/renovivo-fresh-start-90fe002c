
# Рекомпозиция на сайта от `github.com/milenndo/renovivo`

Новото репо е по-нова версия на същия проект (React + Vite + Tailwind + Supabase, същият Layout/Chat/Cookie контекст). Разликите са в съдържанието, дизайна на Hero (видео фон), нови страници и допълнителни данни.

## Какво ЗАПАЗВАМ от текущия проект (точка 2)

- **Backend / Lovable Cloud**: цялата база данни, RLS политики, `has_role` във `private` схема, `user_roles`, `inspection_requests`, storage bucket `project-photos`, всички edge functions (`renovivo-chat`, `send-contact-email`, `send-inspection-email`) и техните текущи защити.
- **Auto-generated**: `src/integrations/supabase/client.ts`, `types.ts`, `.env`, `supabase/config.toml` — не се пипат.
- **SEO надстройката**: `public/llms.txt`, обновените `robots.txt` и `sitemap.xml`, prerender конфигурацията в `vite.config.ts`, JSON-LD schema в `index.html`, метаданните по страници, `SofiaAreasSection`, `docs/seo-report.md`, `docs/blog-plan.md`.
- **Админ панел и MCP**: `src/pages/Admin.tsx`, `src/hooks/useAdminAuth.ts`, целият `src/lib/mcp/` слой, OAuth consent страницата.
- **Email унификация**: `office@renovivo.bg` навсякъде (в новото репо вече е такъв).

## Какво ВЗИМАМ от новото репо

### Съдържание и данни
- `src/data/services.ts` — новия по-широк каталог услуги (microcement, terrazzo, flake-floor, stone-carpet и т.н.) + техните изображения.
- `src/data/projects.ts`, `src/data/blog-posts-local.ts`, `src/data/blog-posts-additional.ts`.
- Всички изображения от `src/assets/images/**` (services, projects, blog, hero-poster, cta-background, quality-work).
- `src/assets/Renovivo_logover.2.svg`, `src/assets/logo.png`.
- Hero видео: `public/videos/hero-background.webm`.

### Компоненти и дизайн
- `src/index.css` и `tailwind.config.ts` — новата дизайн система (цветове, шрифтове, tokens).
- `src/components/layout/{Header,Footer,Layout}.tsx`.
- `src/components/home/{Hero,About,Services,Projects,WhyUs,HowWeWork,PeaceOfMind,BlogPreview,CTA,AIConsultant}.tsx`.
- `src/components/{BeforeAfterSlider,Testimonials,VisualBreadcrumb,NavLink,CookieBanner,CookieSettingsModal,InspectionRequestModal,ScrollToTop}.tsx`.
- `src/components/chat/RenovivoChat.tsx` — новата UI обвивка, но извикванията остават към текущия `renovivo-chat` edge function.
- `src/components/ui/optimized-image.tsx` (нов).
- `src/contexts/LanguageContext.tsx` (нов — многоезичност) + `InspectionRequestContext`, `CookieConsentContext`.

### Страници
Взимат се и се синхронизират с текущите ни SEO метаданни (Helmet блоковете от текущия проект):
`Index, Services, ServiceDetail, InteriorDesign, InnovativeCoatings, Portfolio, ProjectDetail, About, Contact, Blog, BlogPost, VirtualTours, NotFound`.
Заменя се и `Auth.tsx` но с добавка на OAuth consent handling от текущия.
`Admin.tsx` — оставя се текущият.

### Инфраструктура
- `index.html` от новото репо → мърджва се с нашия JSON-LD (Organization/HomeAndConstructionBusiness, FAQPage).
- Нови Supabase миграции за блог постовете (`20251210223000_blog_post_trends_2026.sql`, `20251210230000_blog_post_kitchen_guide.sql`, `20260101000000_blog_post_planning_renovation.sql`, `20260101000001_blog_post_microcement.sql`) — прилагат се допълнително към текущата БД (INSERT-и към `blog_posts` ако такава таблица съществува/се създаде).

## Конфликти, които трябва да решиш преди изпълнение

1. **Цените**: Новото репо въвежда `/pricing`, `/pricing/start`, `/pricing/comfort`, `/pricing/premium` и `PriceTable.tsx`. Ти изрично беше поискал да махнем цените от целия сайт.
   → **Препоръка**: пропускам тези 5 файла и не добавям route-ите. Ако искаш пакетите като страници, но БЕЗ конкретни числа („По запитване"), кажи.

2. **Route `/3d-scanning`** (VirtualTours) — нов в новото репо. Ще добавя маршрута, компонента и запис в `sitemap.xml` + prerender списъка.

3. **Многоезичност (`LanguageContext`)** — новото репо има превключвател на езици. Ще го включа както е (BG default), но реалните преводи, ако не са пълни, ще останат само BG докато не поискаш иначе.

4. **Hero видео (`hero-background.webm`, 2 MB)** — ще се копира в `public/videos/`. Влиза в LCP; ще оставя `hero-poster.jpg` като fallback за prerender/AI ботове.

## Технически стъпки (по ред)

1. Изтегляне на всички файлове от `milenndo/renovivo` (raw GitHub) в работна папка.
2. Копиране на всички binary assets (изображения, svg, видео) под `src/assets/**` и `public/videos/`.
3. Замяна на компоненти/страници от списъка по-горе.
4. Мърдж на `src/data/services.ts` — новия каталог, но без `price`/`priceUnit` полета в UI (или маркирани „По запитване").
5. Мърдж на `index.html`: layout/meta от новото + запазване на нашия JSON-LD и llms.txt хинтове.
6. Обновяване на `vite.config.ts` prerender списъка с новите routes (без `/pricing/*` ако решиш да ги пропуснем).
7. Обновяване на `public/sitemap.xml` с реалните service slugs от новия каталог.
8. Прилагане на новите blog миграции през `supabase--migration`.
9. Замяна на `tailwind.config.ts` и `src/index.css` с новите tokens; проверка че shadcn компонентите продължават да рендират.
10. Build проверка + бърз preview screenshot чрез Playwright.

## Изисква твоя отговор преди build mode

- **Цените**: пропускам ги напълно ✅ / оставям пакетни страници без числа / включвам ги както са в новото репо.
- **Език**: оставяме BG-only ✅ / включваме превключвателя както е.

Като ми потвърдиш тези две, минаваме в build mode и изпълнявам.
