import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Phone, ArrowLeft, ArrowRight, Check, Calendar, Sparkles, Calculator } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceByIdWithLanguage, getServices, getServiceFAQs } from "@/data/services";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Основните високомаржови услуги, които показват KCC обяснение и свързани комплексни услуги
const turnkeyCoreServices = [
  "apartment-renovation",
  "finishing-works",
  "house-renovation",
  "interior-design",
  "custom-furniture",
];

// Свързани високомаржови услуги за вътрешно линкване (Internal Linking за Google & AI)
const relatedTurnkeyServices = [
  {
    nameBg: "Цялостен ремонт на апартамент до ключ",
    nameEn: "Turnkey Apartment Renovation",
    path: "/services/apartment-renovation",
  },
  {
    nameBg: "Цялостни довършителни работи (по БДС)",
    nameEn: "Complete Finishing Works (BDS)",
    path: "/services/finishing-works",
  },
  {
    nameBg: "Кухни и мебели по поръчка",
    nameEn: "Custom Kitchens & Furniture",
    path: "/services/custom-furniture",
  },
  {
    nameBg: "Интериорен дизайн и проектиране",
    nameEn: "Interior Design & 3D Planning",
    path: "/services/interior-design",
  },
  {
    nameBg: "3D Лазерно сканиране и заснемане",
    nameEn: "3D Laser Scanning & Digital Twin",
    path: "/3d-scanning",
  },
];

// Пренасочване на стари URL адреси към реалните канонични страници
const LEGACY_SERVICE_ALIASES: Record<string, string> = {
  "full-renovation": "apartment-renovation",
  "kitchen": "custom-furniture",
  "painting": "finishing-works",
  "shpaklovka": "finishing-works",
  "flooring": "finishing-works",
  "kartene": "apartment-renovation",
  "demolition": "apartment-renovation",
  "electrical": "apartment-renovation",
  "plumbing": "apartment-renovation",
  "heating-ac": "apartment-renovation",
  "drywall": "drywall-construction",
  "doors": "doors-installation",
  "windows": "windows-doors",
  "smart-home": "smart-installations",
};

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { openModal } = useInspectionRequest();
  const { language, t } = useLanguage();
  const isEn = language === "en";

  const service = id ? getServiceByIdWithLanguage(id, language) : undefined;
  const services = getServices(language);
  const serviceFAQs = getServiceFAQs(language);

  if (!service) {
    const alias = id ? LEGACY_SERVICE_ALIASES[id] : undefined;
    return <Navigate to={alias ? `/services/${alias}` : "/services"} replace />;
  }

  const currentIndex = services.findIndex((s) => s.id === id);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService =
    currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  const fullImageUrl = service.image?.startsWith("http")
    ? service.image
    : `https://www.renovivo.bg${service.image}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isEn ? "Home" : "Начало",
        "item": "https://www.renovivo.bg/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isEn ? "Services" : "Услуги",
        "item": "https://www.renovivo.bg/services",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://www.renovivo.bg/services/${id}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.renovivo.bg/services/${id}#service`,
    "name": `${service.title} — ${isEn ? "Sofia" : "гр. София"}`,
    "description": service.fullDescription,
    "url": `https://www.renovivo.bg/services/${id}`,
    "image": fullImageUrl,
    "provider": { "@id": "https://www.renovivo.bg/#organization" },
    "areaServed": [
      {
        "@type": "City",
        "name": "София",
        "sameAs": "https://www.wikidata.org/wiki/Q472",
      },
      {
        "@type": "AdministrativeArea",
        "name": "Софийска област",
      },
    ],
    "serviceType": service.isInnovative
      ? "Иновативни безшевни покрития и настилки"
      : "Цялостни ремонти до ключ и довършителни работи",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": `https://www.renovivo.bg/services/${id}`,
    },
  };

  const faq = id ? serviceFAQs[id] : null;

  const faqSchema =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faq.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer,
            },
          })),
        }
      : null;

  const seoTitle = isEn
    ? `${service.title} in Sofia | Fixed Price & Warranty | Renovivo`
    : `${service.title} в София | Фиксирана цена по договор | Renovivo`;

  const seoDescription = isEn
    ? `${service.shortDescription} Free site inspection in Sofia, detailed BOQ quote, fixed contract price, and 2-year warranty. Call +359 89 371 2919`
    : `${service.shortDescription} Безплатен оглед в София, детайлна КСС оферта, фиксирана цена по договор и 2 години гаранция. Тел. 089 371 2919`;

  const isCoreTurnkey = id ? turnkeyCoreServices.includes(id) : false;

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`https://www.renovivo.bg/services/${id}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`https://www.renovivo.bg/services/${id}`} />
        <meta property="og:image" content={fullImageUrl} />
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
            <VisualBreadcrumb
              items={[
                { label: t("serviceDetail.breadcrumb"), href: "/services" },
                { label: service.title },
              ]}
              className="mb-6 [&_a]:text-background/70 [&_a:hover]:text-primary [&_span[role=link]]:text-background [&_svg]:text-background/50"
            />
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <service.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-background mb-4">
                  {service.title}{" "}
                  <span className="sr-only">
                    {isEn ? "in Sofia — Renovivo" : "в гр. София — Renovivo"}
                  </span>
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
              {/* Left Column: Service Details */}
              <div className="lg:col-span-2 space-y-12">
                <img
                  src={service.image}
                  alt={`${service.title} — ${
                    isEn ? "execution by Renovivo in Sofia" : "изпълнение от Renovivo в София"
                  }`}
                  width={800}
                  height={400}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-80 md:h-96 object-cover rounded-xl"
                />

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {t("serviceDetail.description")}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {service.fullDescription}
                  </div>
                </div>

                {/* Color Variants */}
                {service.colorVariants && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      {t("serviceDetail.colorVariants")}
                    </h2>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {t("serviceDetail.colorNote")}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {service.colorVariants.map((variant) => (
                        <div
                          key={variant.name}
                          className="p-4 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                        >
                          <h3 className="font-semibold text-sm mb-1">{variant.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {variant.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 italic">
                      {t("serviceDetail.colorDisclaimer")}
                    </p>
                  </div>
                )}

                {/* Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {t("serviceDetail.includes")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
                      >
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
                  <h2 className="text-2xl font-bold mb-6">
                    {t("serviceDetail.process")}
                  </h2>
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
                          <p className="text-muted-foreground text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* VS Tiles Comparison */}
                {service.vsTiles && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold">
                      {t("serviceDetail.vsTiles.title")} {service.title}{" "}
                      {t("serviceDetail.vsTiles.instead")}
                    </h2>

                    <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6">
                      <h3 className="font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        {t("serviceDetail.vsTiles.advantages")}
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

                    <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-6">
                      <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-4">
                        {t("serviceDetail.vsTiles.considerations")}
                      </h3>
                      <ul className="space-y-2">
                        {service.vsTiles.disadvantages.map((dis, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-amber-600">•</span>
                            <span>{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold mb-4">
                        {t("serviceDetail.vsTiles.comparison")}
                      </h3>
                      <div className="overflow-x-auto rounded-xl border">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-3 text-left font-semibold">
                                {t("serviceDetail.vsTiles.aspect")}
                              </th>
                              <th className="px-4 py-3 text-left font-semibold text-primary">
                                {service.title}
                              </th>
                              <th className="px-4 py-3 text-left font-semibold">
                                {t("serviceDetail.vsTiles.tiles")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {service.vsTiles.comparison.map((row, i) => (
                              <tr
                                key={i}
                                className={
                                  i % 2 === 0 ? "bg-background" : "bg-muted/30"
                                }
                              >
                                <td className="px-4 py-3 font-medium">{row.aspect}</td>
                                <td className="px-4 py-3 text-primary">
                                  {row.innovative}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                  {row.tiles}
                                </td>
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
                    <h2 className="text-2xl font-bold mb-6">
                      {t("serviceDetail.faq")}
                    </h2>
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
                {service.gallery && service.gallery.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6">
                      {t("projectDetail.gallery")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {service.gallery.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${service.title} — ${
                            isEn ? "project photo" : "реализиран обект в София"
                          } ${index + 1}`}
                          loading="lazy"
                          className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar — Оптимизиран за конвертиране в Цялостен Ремонт */}
              <div className="space-y-6">
                {/* Карта 1: KCC Ценообразуване и Калкулатор */}
                <Card className="border border-primary/20 shadow-lg bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="h-4 w-4" />
                      <span>
                        {isEn ? "Transparent BOQ Pricing" : "Фиксиран бюджет по КСС"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-3">
                      {isEn
                        ? "How do we calculate the exact price?"
                        : "Как формираме точната цена?"}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {isEn
                        ? "Every property in Sofia has specific requirements. Instead of rough guesswork, we prepare a detailed Bill of Quantities (BOQ) after an on-site inspection:"
                        : "Всеки имот в София е различен. Вместо ориентировъчни обещания, изготвяме точна количествено-стойностна сметка (КСС) след оглед на място:"}
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 mb-5">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          {isEn
                            ? "Exact laser measurement of areas and volumes"
                            : "Прецизно заснемане на квадратури и линейни метри"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          {isEn
                            ? "Clear breakdown of labor and certified materials"
                            : "Ясна разбивка за труд и сертифицирани материали"}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>
                          {isEn
                            ? "Fixed final price and deadline in a written contract"
                            : "Фиксирана крайна цена и срок в писмен договор"}
                        </span>
                      </li>
                    </ul>
                    <Link
                      to="/#estimator"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                    >
                      <Calculator className="h-4 w-4" />
                      <span>
                        {isEn
                          ? "Calculate indicative budget (100–500+ €/m²)"
                          : "Сметнете ориентировъчен бюджет (100–500+ €/м²)"}
                      </span>
                    </Link>
                  </CardContent>
                </Card>

                {/* Карта 2: Троянски кон — Пренасочване от частични услуги към Цялостен ремонт */}
                {!isCoreTurnkey && (
                  <Card className="border border-primary/30 bg-primary/5 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-base mb-2">
                        {isEn
                          ? "Planning a Complete Property Renovation?"
                          : "Предстои ви цялостен ремонт на имота?"}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {isEn
                          ? "We execute this service seamlessly as part of a complete turnkey renovation in Sofia — with one accountable project manager, synchronized trades, and custom furniture."
                          : "Изпълняваме тази услуга в пълен синхрон като част от цялостен ремонт до ключ или довършване по БДС в София — с един отговорен технически ръководител за всички етапи."}
                      </p>
                      <Link
                        to="/services/apartment-renovation"
                        className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
                      >
                        <span>
                          {isEn
                            ? "See Turnkey Apartment Renovation"
                            : "Вижте Цялостен ремонт до ключ"}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                )}

                {/* Карта 3: Вътрешни линкове към високомаржовите услуги */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">{t("serviceDetail.related")}</h3>
                    <div className="space-y-2.5">
                      {relatedTurnkeyServices
                        .filter((s) => s.path !== `/services/${id}`)
                        .map((rel) => (
                          <Link
                            key={rel.path}
                            to={rel.path}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-sm font-medium">
                              {isEn ? rel.nameEn : rel.nameBg}
                            </span>
                          </Link>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Карта 4: Sticky CTA за Оглед */}
                <Card className="border-0 shadow-lg sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      {t("serviceDetail.cta.title")}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      {t("serviceDetail.cta.desc")}
                    </p>

                    <Button
                      className="w-full mb-3 font-semibold"
                      size="lg"
                      onClick={openModal}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      {t("serviceDetail.cta.inspection")}
                    </Button>

                    <a href="tel:+359893712919" className="block mb-3">
                      <Button variant="outline" className="w-full" size="lg">
                        <Phone className="h-5 w-5 mr-2" />
                        +359 89 371 29 19
                      </Button>
                    </a>

                    <p className="text-center text-muted-foreground text-xs mt-4">
                      {t("contact.info.hoursValue")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
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
