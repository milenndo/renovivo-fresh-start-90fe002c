import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, Home, Paintbrush, Sparkles, Scan, ChevronRight, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInspectionRequest } from "@/contexts/InspectionRequestContext";
import { cn } from "@/lib/utils";

const ServicesPage = () => {
  const { t, language } = useLanguage();
  const { openModal } = useInspectionRequest();
  const isEn = language === "en";

  const serviceCategories = [
    {
      id: "full-renovation",
      title: t("services.cat.renovation"),
      description: t("services.cat.renovation.desc"),
      icon: Home,
      featured: true,
      items: [
        {
          name: t("services.item.apartment"),
          path: "/services/apartment-renovation",
          description: t("services.item.apartment.desc"),
        },
        {
          name: t("services.item.finishingWorks"),
          path: "/services/finishing-works",
          description: t("services.item.finishingWorks.desc"),
        },
        {
          name: t("services.item.house"),
          path: "/services/house-renovation",
          description: t("services.item.house.desc"),
        },
        {
          name: isEn
            ? "Interior Design & 3D Project"
            : "Интериорен дизайн и проектиране",
          path: "/services/interior-design",
          description: isEn
            ? "Functional layouts, 3D visualizations, and technical drawings for execution"
            : "Функционално разпределение, 3D визуализации и технически чертежи за ремонт",
        },
      ],
    },
    {
      id: "finishing-works",
      title: t("services.cat.finishing"),
      description: t("services.cat.finishing.desc"),
      icon: Paintbrush,
      featured: true,
      items: [
        {
          name: t("services.item.furniture"),
          path: "/services/custom-furniture",
          description: t("services.item.furniture.desc"),
        },
        {
          name: t("services.item.drywall"),
          path: "/services/drywall-construction",
          description: t("services.item.drywall.desc"),
        },
        {
          name: t("services.item.doorsInstall"),
          path: "/services/doors-installation",
          description: t("services.item.doorsInstall.desc"),
        },
        {
          name: t("services.item.windows"),
          path: "/services/windows-doors",
          description: t("services.item.windows.desc"),
        },
      ],
    },
    {
      id: "innovation",
      title: t("services.cat.innovation"),
      description: t("services.cat.innovation.desc"),
      icon: Sparkles,
      featured: true,
      items: [
        {
          name: t("services.item.microcement"),
          path: "/services/microcement",
          description: t("services.item.microcement.desc"),
        },
        {
          name: t("services.item.terrazzo"),
          path: "/services/terrazzo",
          description: t("services.item.terrazzo.desc"),
        },
        {
          name: t("services.item.flakeFloor"),
          path: "/services/flake-floor",
          description: t("services.item.flakeFloor.desc"),
        },
        {
          name: t("services.item.stoneCarpet"),
          path: "/services/stone-carpet",
          description: t("services.item.stoneCarpet.desc"),
        },
        {
          name: t("services.item.smart"),
          path: "/services/smart-installations",
          description: t("services.item.smart.desc"),
        },
      ],
    },
    {
      id: "digital-services",
      title: t("services.cat.digital"),
      description: t("services.cat.digital.desc"),
      icon: Scan,
      items: [
        {
          name: t("services.item.virtualTours"),
          path: "/3d-scanning",
          description: t("services.item.virtualTours.desc"),
        },
      ],
    },
  ];

  const allItems = serviceCategories.flatMap((c) => c.items);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("breadcrumb.home"),
        "item": "https://renovivo.bg/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("services.page.title"),
        "item": "https://renovivo.bg/services",
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": isEn
      ? "Turnkey Renovation & Finishing Services in Sofia | Renovivo"
      : "Услуги за цялостни ремонти до ключ и довършителни работи в София | Renovivo",
    "itemListElement": allItems.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "description": item.description,
      "url": `https://renovivo.bg${item.path}`,
    })),
  };

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>
          {isEn
            ? "Turnkey Renovation & Finishing Services in Sofia | Renovivo"
            : "Цялостни ремонти до ключ и довършителни работи в София | Услуги Renovivo"}
        </title>
        <meta
          name="description"
          content={
            isEn
              ? "Complete apartment and house renovations in Sofia, BDS finishing works, custom kitchens, microcement, terrazzo, and 3D laser scanning with a fixed contract price."
              : "Пълен спектър от ремонтни услуги в София — цялостен ремонт на апартаменти и къщи до ключ, довършителни работи по БДС, кухни по поръчка, микроцимент и 3D сканиране."
          }
        />
        <link rel="canonical" href="https://renovivo.bg/services" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative py-24 bg-foreground overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
          </div>

          <div className="container-custom relative z-10">
            <VisualBreadcrumb
              items={[{ label: t("services.page.title") }]}
              className="mb-6 [&_a]:text-background/70 [&_a:hover]:text-primary [&_span[role=link]]:text-background [&_svg]:text-background/50"
            />
            <div className="max-w-3xl">
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
                {t("services.page.catalog")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mt-3 mb-6">
                {t("services.page.allServices")}
              </h1>
              <p className="text-background/80 text-lg md:text-xl leading-relaxed">
                {t("services.page.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Services Directory */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-40 left-0 w-80 h-80 bg-muted/50 rounded-full blur-2xl" />
          </div>

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category, categoryIndex) => (
                <div
                  key={category.id}
                  className={cn(
                    "group relative",
                    category.featured &&
                      categoryIndex === 0 &&
                      "md:col-span-2 lg:col-span-2",
                  )}
                >
                  <div className="relative h-full rounded-2xl border border-border bg-card p-6 md:p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <category.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {category.title}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="group/item flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-all duration-300"
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground group-hover/item:text-primary transition-colors duration-200 truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover/item:text-primary group-hover/item:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />

          <div className="container-custom relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              {t("services.page.cta.title")}
            </h2>
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              {t("services.page.cta.description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                onClick={openModal}
                className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-8 py-6 shadow-2xl transition-all duration-300"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t("cta.inspection")}
              </Button>
              <a href="tel:+359893712919" className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background text-primary-foreground hover:bg-background/10 font-semibold text-lg px-8 py-6"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  +359 89 371 29 19
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ServicesPage;
