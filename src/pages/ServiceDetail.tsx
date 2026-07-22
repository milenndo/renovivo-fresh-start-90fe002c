import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, ArrowLeft, ArrowRight, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceById, services } from "@/data/services";


// Mapping service IDs to price category slugs
const serviceToPriceCategoryMap: Record<string, string> = {
  "plumbing": "vik",
  "electrical": "elektro",
  "painting": "boyadisvane",
  "flooring": "podovi-nastilki",
  // Innovative coatings
  "microcement": "inovativni-pokritia",
  "terrazzo": "inovativni-pokritia",
  "flake-floor": "inovativni-pokritia",
  "stone-carpet": "inovativni-pokritia",
  // New services from price list
  "shpaklovka": "shpaklovka",
  "suho-stroitelstvo": "suho-stroitelstvo",
  "kartene": "kartene",
  "plochki": "plochki",
  "suhi-podove": "suho-stroitelstvo",
  "heating-ac": "vik",
};

// Services that should NOT show price tables (individual projects)
const servicesWithoutPrices = [
  "full-renovation",
  "bathroom", 
  "kitchen",
  "interior-design",
  "gipsokarton-design",
];

// Custom content for services without prices
const customServiceContent: Record<string, { title: string; content: string; showRelated?: boolean }> = {
  "kitchen": {
    title: "Ремонт на кухня по поръчка",
    content: "Кухнята е сърцето на дома и изисква безкомпромисно планиране. Ние не предлагаме стандартни решения, а цялостна изработка на кухни по поръчка, съобразени с ергономията и спецификата на Вашето помещение. Поемаме целия процес: от демонтаж и корекция на ВиК и Ел. инсталации до прецизния монтаж на мебелите и уредите. Цената се формира индивидуално след оглед и избор на материали и механизми."
  },
  "bathroom": {
    title: "Комплексен ремонт на баня",
    content: "Превръщаме банята в спа зона. Извършваме комплексно изпълнение: къртене, подмяна на инсталации, професионална хидроизолация, монтаж на структури за вграждане и линейни сифони. Специализирани сме в сложни изпълнения като герунг рязане на плочки (45 градуса), изработка на ниши и скриване на тръби. Гарантираме водоплътност и дълготрайна естетика."
  },
  "full-renovation": {
    title: "Цялостен ремонт - процес",
    content: "Цялостният ремонт е сложен логистичен и технически процес, който ние управляваме вместо Вас.\n\nЕтапи на работа:\n1. Оглед и заснемане на обекта.\n2. Изготвяне на подробен бюджет и график.\n3. Демонтаж и подготовка на основата.\n4. Изграждане на нови инсталации (ВиК, Ел, ОВК).\n5. Довършителни работи (шпакловка, замазка, настилки, боя).\n6. Монтаж и почистване.\n\nНие координираме всички екипи, за да спазим сроковете и качеството.",
    showRelated: true
  },
  "interior-design": {
    title: "Проект и Интериорен Дизайн",
    content: "Всеки дом носи духа на своите обитатели. Услугата 'Проект и Дизайн' е създадена, за да визуализира Вашите мечти преди старта на ремонта. Ние създаваме функционално зониране, 3D визуализации и пълна техническа документация. Тъй като всеки стил и квадратура са различни, цената за проект се определя строго индивидуално след среща и обсъждане на Вашите нужди."
  },
  "gipsokarton-design": {
    title: "Дизайнерски решения от гипсокартон",
    content: "Гипсокартонът позволява създаването на уникални форми, скрито осветление и декоративни тавани. Цената за тези изпълнения не може да бъде фиксирана, тъй като зависи от сложността на кривите, детайлите и височината на изпълнение. Свържете се с нас за индивидуална оферта."
  }
};

// Related services for full renovation
const relatedServicesForFullRenovation = [
  { name: "Ел. Услуги", path: "/services/electrical" },
  { name: "ВиК", path: "/services/plumbing" },
  { name: "Отопление и Климатизация", path: "/services/heating-ac" },
  { name: "Шпакловка", path: "/services/shpaklovka" },
  { name: "Настилки", path: "/services/flooring" },
];

// Per-slug SEO overrides for money pages (title ≤ 60ch, desc 140–160ch)
const serviceSeoOverrides: Record<string, { title: string; description: string }> = {
  "full-renovation": {
    title: "Цялостен ремонт на апартамент в София до ключ | Renovivo",
    description: "Цялостен ремонт на апартамент в София от един координиран екип – от демонтаж до финално почистване. Ясен срок, писмена оферта, 24 месеца гаранция.",
  },
  "bathroom": {
    title: "Ремонт на баня в София до ключ | Renovivo",
    description: "Ремонт на баня в София от А до Я: ВиК, зидария, шпакловка, плочки, санитария. Срок 15–25 работни дни и писмена гаранция 24 месеца.",
  },
  "kitchen": {
    title: "Ремонт на кухня в София | Renovivo – цялостно решение",
    description: "Ремонт на кухня в София: демонтаж, ВиК и електро, шпакловка, плочки и монтаж на мебели и уреди. Един екип, писмена оферта, ясен срок.",
  },
  "painting": {
    title: "Боядисване на апартамент в София | Шпакловка и латекс – Renovivo",
    description: "Боядисване и шпакловка на апартаменти в София с качествени латексови бои. Прецизна подготовка, чиста работа и писмена гаранция.",
  },
  "microcement": {
    title: "Микроцимент в София | Безшевно покритие за бани и подове – Renovivo",
    description: "Полагане на микроцимент в София за бани, стени и подове. Безшевно, водоотблъскващо, върху стари плочки без демонтаж. Над 50 цвята.",
  },
  "terrazzo": {
    title: "Terrazzo подове в София | Модерна мозайка – Renovivo",
    description: "Полагане на Terrazzo подове в София – модерен прочит на венецианската мозайка. Безшевна повърхност, безкрайни цветови комбинации.",
  },
  "plumbing": {
    title: "ВиК услуги в София | Водопровод и канализация – Renovivo",
    description: "Професионални ВиК услуги в София: изграждане на нови инсталации, ремонт, монтаж на санитария. Част от нашия координиран ремонтен екип.",
  },
  "electrical": {
    title: "Електро услуги в София | Ел. инсталации и ремонт – Renovivo",
    description: "Електро услуги в София: ново окабеляване, ремонт на инсталации, табла и осветление. Изпълнение по норматив с писмена гаранция.",
  },
  "flooring": {
    title: "Подови настилки в София | Ламинат, паркет, винил – Renovivo",
    description: "Монтаж на подови настилки в София: ламинат, паркет, винилови подове. Прецизна подготовка на основата и качествено изпълнение.",
  },
};

// FAQ per priority service — feeds FAQPage schema and future accordion
const serviceFaqs: Record<string, { q: string; a: string }[]> = {
  "full-renovation": [
    { q: "Колко време отнема цялостен ремонт на апартамент в София?", a: "Стандартен цялостен ремонт на 2–3 стаен апартамент в София отнема между 8 и 14 седмици в зависимост от квадратура, обхват на СМР и избраните материали." },
    { q: "Какво включва цялостният ремонт до ключ?", a: "Демонтаж, ВиК и електро, зидария, шпакловка, замазка, настилки, боядисване, монтаж на санитария, врати и осветление, както и финално почистване." },
    { q: "Давате ли писмена оферта преди старта?", a: "Да. След безплатен оглед изготвяме подробна писмена оферта с етапи, срокове и цени, която е основа на договора." },
    { q: "Каква гаранция получавам?", a: "Renovivo предоставя писмена гаранция от 24 месеца за строително-монтажните работи и производителска гаранция за вложените материали." },
  ],
  "bathroom": [
    { q: "Колко време отнема ремонт на баня в София?", a: "Стандартен ремонт на баня отнема 15–25 работни дни: демонтаж, ВиК, зидария, хидроизолация, шпакловка, плочки и монтаж на санитария." },
    { q: "Работите ли по малки бани в панелни блокове?", a: "Да. Малките бани в панелни блокове са една от най-честите ни задачи – оптимизираме нишите, скриваме тръби и правим монтаж на структури за вграждане." },
    { q: "Правите ли хидроизолация?", a: "Да, професионалната хидроизолация под плочки е задължителна част от всеки наш ремонт на баня." },
    { q: "Мога ли да получа оферта преди огледа?", a: "Ориентировъчна оферта е възможна по снимки, но окончателната писмена оферта се изготвя след безплатен оглед на място." },
  ],
  "kitchen": [
    { q: "Правите ли кухни по поръчка заедно с ремонта?", a: "Да, координираме СМР работата с изработката на кухненски мебели по поръчка и монтажа на уреди, за да съвпаднат ВиК, електро и вентилация." },
    { q: "Колко време отнема ремонт на кухня?", a: "В зависимост от обхвата – от 3 до 6 седмици, включително подмяна на инсталации, шпакловка, плочки и монтаж на мебелите." },
    { q: "Можете ли да съборите стена към хола?", a: "Да, при неносеща стена. При носеща подготвяме конструктивно становище от инженер преди намеса." },
  ],
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const service = id ? getServiceById(id) : undefined;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const currentIndex = services.findIndex((s) => s.id === id);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": "Услуги", "item": "https://renovivo.bg/services" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://renovivo.bg/services/${id}` }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.fullDescription,
    "url": `https://renovivo.bg/services/${id}`,
    "image": service.image,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Renovivo",
      "telephone": "+359893712919",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "София",
        "addressCountry": "BG"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "София"
    },
    "serviceType": service.isInnovative ? "Иновативни покрития" : "Ремонтни услуги"
  };

  const seoOverride = id ? serviceSeoOverrides[id] : undefined;
  const seoTitle = seoOverride?.title ?? (service.isInnovative
    ? `${service.title} в София | Renovivo – модерни покрития`
    : `${service.title} в София | Renovivo`);
  const seoDescription = seoOverride?.description ?? `${service.shortDescription} Изпълнение в София от координиран екип, писмена оферта и 24 месеца гаранция.`;

  const faqs = id ? serviceFaqs[id] : undefined;
  const faqSchema = faqs && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const customContent = id ? customServiceContent[id] : null;
  const showPriceTable = id && serviceToPriceCategoryMap[id] && !servicesWithoutPrices.includes(id);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`https://renovivo.bg/services/${id}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`https://renovivo.bg/services/${id}`} />
        <meta property="og:image" content={service.image} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            <Link
              to="/services"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Обратно към услугите
            </Link>
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <service.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-background mb-4">
                  {service.title}
                </h1>
                <p className="text-background/80 text-lg max-w-2xl">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Main Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 md:h-96 object-cover rounded-xl"
                />

                {/* Description - use custom content if available */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {customContent?.title || "Описание"}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {customContent?.content || service.fullDescription}
                  </div>
                </div>

                {/* Color Variants - only for services with color options */}
                {service.colorVariants && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Цветови варианти</h2>
                    <p className="text-muted-foreground mb-4 text-sm">
                      Съчетаването на пигменти и естествени камъни дава безкрайни възможности за цвят и дизайн, 
                      като същевременно добавят визуален ефект и характер на проекта.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {service.colorVariants.map((variant) => (
                        <div 
                          key={variant.name} 
                          className="p-4 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                        >
                          <h4 className="font-semibold text-sm mb-1">{variant.name}</h4>
                          <p className="text-xs text-muted-foreground">{variant.description}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 italic">
                      * Действителните цветове може да се различават от представените. 
                      Съветваме ви да видите физическа цветна мостра, за да потвърдите избора си.
                    </p>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Какво включва</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Нашият процес</h2>
                  <div className="space-y-6">
                    {service.process.map((step, index) => (
                      <div key={step.step} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            {step.step}
                          </div>
                          {index < service.process.length - 1 && (
                            <div className="w-0.5 flex-grow bg-border mt-2" />
                          )}
                        </div>
                        <div className="pb-6">
                          <h3 className="font-semibold mb-1">{step.title}</h3>
                          <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VS Tiles Comparison - only for innovative services */}
                {service.vsTiles && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold">Защо да изберете {service.title} вместо плочки?</h2>
                    
                    {/* Advantages */}
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6">
                      <h3 className="font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        Предимства пред плочките
                      </h3>
                      <ul className="space-y-2">
                        {service.vsTiles.advantages.map((adv, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Disadvantages */}
                    <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-6">
                      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-4">Какво да имате предвид</h3>
                      <ul className="space-y-2">
                        {service.vsTiles.disadvantages.map((dis, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-amber-600">•</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Comparison Table */}
                    <div>
                      <h3 className="font-bold mb-4">Детайлно сравнение</h3>
                      <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">Аспект</th>
                              <th className="px-4 py-3 text-left font-semibold text-primary">{service.title}</th>
                              <th className="px-4 py-3 text-left font-semibold">Плочки</th>
                            </tr>
                          </thead>
                          <tbody>
                            {service.vsTiles.comparison.map((row, i) => (
                              <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                                <td className="px-4 py-3 font-medium">{row.aspect}</td>
                                <td className="px-4 py-3 text-primary">{row.innovative}</td>
                                <td className="px-4 py-3 text-muted-foreground">{row.tiles}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Gallery */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Галерия</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${service.title} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">

                {/* Custom content for individual project services */}
                {id && servicesWithoutPrices.includes(id) && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4">Защо не посочваме цена?</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Всеки проект е уникален и изисква индивидуален подход. Цената зависи от множество фактори:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Квадратура и сложност на обекта</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Избрани материали и оборудване</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Текущо състояние на помещението</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Специфични изисквания и желания</span>
                        </li>
                      </ul>
                      <p className="text-sm font-medium text-primary">
                        Заявете безплатен оглед за точна оферта!
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Related services for full renovation */}
                {(id === "full-renovation" || customContent?.showRelated) && (
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-4">Свързани услуги</h3>
                      <div className="space-y-3">
                        {relatedServicesForFullRenovation.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <ArrowRight className="h-4 w-4 text-primary" />
                            <span className="text-sm">{service.name}</span>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Card */}
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Имате нужда от тази услуга?</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Свържете се с нас за безплатна консултация и индивидуална оферта.
                    </p>
                    <a href="tel:+359893712919" className="block">
                      <Button className="w-full" size="lg">
                        <Phone className="h-5 w-5 mr-2" />
                        Обадете се сега
                      </Button>
                    </a>
                    <p className="text-center text-muted-foreground text-xs mt-4">
                      Пон-Пет: 8:00 - 18:00
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 border-t">
          <div className="container-custom">
            <div className="flex justify-between items-center">
              {prevService ? (
                <Link
                  to={`/services/${prevService.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm">{prevService.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextService && (
                <Link
                  to={`/services/${nextService.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-sm">{nextService.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ServiceDetail;