import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, ArrowLeft, ArrowRight, Check, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceByIdWithLanguage, getServices, getServiceFAQs } from "@/data/services";
import PriceTable from "@/components/PriceTable";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { useLanguage } from "@/contexts/LanguageContext";

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

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { openModal } = useInspectionRequest();
  const { language, t } = useLanguage();

  const service = id ? getServiceByIdWithLanguage(id, language) : undefined;
  const services = getServices(language);
  const serviceFAQs = getServiceFAQs(language);

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

  // Get FAQ for this service
  const faq = id ? serviceFAQs[id] : null;

  // FAQ Schema
  const faqSchema = faq && faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  } : null;

  const seoTitle = service.isInnovative
    ? `${service.title} София | Renovivo - Модерни покрития`
    : `${service.title} София | Renovivo - Професионални услуги`;

  const seoDescription = `${service.shortDescription} Професионално изпълнение в София. Гаранция за качество. ☎️ Безплатна консултация!`;

  const customContent = id ? customServiceContent[id] : null;
  const showPriceTable = id && serviceToPriceCategoryMap[id] && !servicesWithoutPrices.includes(id);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={`${service.title}, ${service.title} София, ${service.title} цена, ремонт ${service.title}`} />
        <link rel="canonical" href={`https://renovivo.bg/services/${id}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={service.shortDescription} />
        <meta property="og:url" content={`https://renovivo.bg/services/${id}`} />
        <meta property="og:image" content={service.image} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-20 bg-foreground">
          <div className="container-custom relative z-10">
            {/* Breadcrumb */}
            <VisualBreadcrumb
              items={[
                { label: t('serviceDetail.breadcrumb'), href: "/services" },
                { label: service.title }
              ]}
              className="mb-6 [&_a]:text-background/70 [&_a:hover]:text-primary [&_span[role=link]]:text-background [&_svg]:text-background/50"
            />
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
                  width={800}
                  height={400}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-80 md:h-96 object-cover rounded-xl"
                />

                {/* Description - use custom content if available */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {customContent?.title || t('serviceDetail.description')}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {customContent?.content || service.fullDescription}
                  </div>
                </div>

                {/* Color Variants - only for services with color options */}
                {service.colorVariants && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">{t('serviceDetail.colorVariants')}</h2>
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
                  <h2 className="text-2xl font-bold mb-6">{t('serviceDetail.includes')}</h2>
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
                  <h2 className="text-2xl font-bold mb-6">{t('serviceDetail.process')}</h2>
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
                    <h2 className="text-2xl font-bold">{t('serviceDetail.vsTiles.title')} {service.title} {t('serviceDetail.vsTiles.instead')}</h2>

                    {/* Advantages */}
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6">
                      <h3 className="font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        {t('serviceDetail.vsTiles.advantages')}
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
                      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-4">{t('serviceDetail.vsTiles.considerations')}</h3>
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

                {/* FAQ Section */}
                {faq && faq.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">{t('serviceDetail.faq')}</h2>
                    <Accordion type="single" collapsible className="w-full">
                      {faq.map((item, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {/* Gallery */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('projectDetail.gallery')}</h2>
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
                {/* Price Table - only for services with pricing */}
                {showPriceTable && (
                  <PriceTable
                    categorySlug={serviceToPriceCategoryMap[id!]}
                    title={t('serviceDetail.pricing')}
                    limit={8}
                  />
                )}

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
                      <h3 className="font-bold mb-4">{t('serviceDetail.related')}</h3>
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
                    <h3 className="text-xl font-bold mb-4">{t('serviceDetail.cta.title')}</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      {t('serviceDetail.cta.desc')}
                    </p>

                    {/* Phone Button */}
                    <a href="tel:+359893712919" className="block mb-3">
                      <Button className="w-full" size="lg">
                        <Phone className="h-5 w-5 mr-2" />
                        {t('serviceDetail.cta.contact')}
                      </Button>
                    </a>

                    {/* Inspection Request Button */}
                    <Button
                      variant="outline"
                      className="w-full mb-3"
                      size="lg"
                      onClick={openModal}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      {t('serviceDetail.cta.inspection')}
                    </Button>

                    <p className="text-center text-muted-foreground text-xs mt-4">
                      {t('contact.info.hoursValue')}
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