import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Phone, ArrowRight, Home, Paintbrush, Wrench, Sparkles, Scan, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import VisualBreadcrumb from "@/components/VisualBreadcrumb";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const ServicesPage = () => {
  const { t, language } = useLanguage();

  const serviceCategories = [
    {
      id: "finishing-works",
      title: t('services.cat.finishing'),
      description: t('services.cat.finishing.desc'),
      icon: Paintbrush,
      featured: true,
      items: [
        { name: t('services.item.finishingWorks'), path: "/services/finishing-works", description: t('services.item.finishingWorks.desc') },
        { name: t('services.item.drywall'), path: "/services/drywall-construction", description: t('services.item.drywall.desc') },
        { name: t('services.item.furniture'), path: "/services/custom-furniture", description: t('services.item.furniture.desc') },
        { name: t('services.item.windows'), path: "/services/windows-doors", description: t('services.item.windows.desc') },
        { name: t('services.item.doorsInstall'), path: "/services/doors-installation", description: t('services.item.doorsInstall.desc') },
      ]
    },
    {
      id: "full-renovation",
      title: t('services.cat.renovation'),
      description: t('services.cat.renovation.desc'),
      icon: Home,
      featured: true,
      items: [
        { name: t('services.item.apartment'), path: "/services/apartment-renovation", description: t('services.item.apartment.desc') },
        { name: t('services.item.house'), path: "/services/house-renovation", description: t('services.item.house.desc') },
      ]
    },
    {
      id: "partial-renovations",
      title: t('services.cat.partial'),
      description: t('services.cat.partial.desc'),
      icon: Wrench,
      items: [
        { name: t('services.item.bathroom'), path: "/services/bathroom", description: t('services.item.bathroom.desc') },
        { name: t('services.item.kitchen'), path: "/services/kitchen", description: t('services.item.kitchen.desc') },
        { name: t('services.item.livingRoom'), path: "/services/living-room", description: t('services.item.livingRoom.desc') },
        { name: t('services.item.quickRefresh'), path: "/services/quick-refresh", description: t('services.item.quickRefresh.desc') },
      ]
    },
    {
      id: "innovation",
      title: t('services.cat.innovation'),
      description: t('services.cat.innovation.desc'),
      icon: Sparkles,
      featured: true,
      items: [
        { name: t('services.item.microcement'), path: "/services/microcement", description: t('services.item.microcement.desc') },
        { name: t('services.item.terrazzo'), path: "/services/terrazzo", description: t('services.item.terrazzo.desc') },
        { name: t('services.item.flakeFloor'), path: "/services/flake-floor", description: t('services.item.flakeFloor.desc') },
        { name: t('services.item.stoneCarpet'), path: "/services/stone-carpet", description: t('services.item.stoneCarpet.desc') },
        { name: t('services.item.smart'), path: "/services/smart-installations", description: t('services.item.smart.desc') },
      ]
    },
    {
      id: "digital-services",
      title: t('services.cat.digital'),
      description: t('services.cat.digital.desc'),
      icon: Scan,
      items: [
        { name: t('services.item.virtualTours'), path: "/3d-scanning", description: t('services.item.virtualTours.desc') },
      ]
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t('breadcrumb.home'), "item": "https://renovivo.bg" },
      { "@type": "ListItem", "position": 2, "name": t('services.page.title'), "item": "https://renovivo.bg/services" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{language === 'bg' ? 'Ремонтни услуги София | Renovivo' : 'Renovation Services Sofia | Renovivo'}</title>
        <meta 
          name="description" 
          content={language === 'bg' 
            ? "Професионални ремонтни услуги в София - цялостен ремонт на апартаменти, частични ремонти, довършителни работи, микроцимент, terrazzo, flake floor."
            : "Professional renovation services in Sofia - complete apartment renovations, partial renovations, finishing works, microcement, terrazzo, flake floor."
          } 
        />
        <link rel="canonical" href="https://renovivo.bg/services" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Layout>
        {/* Hero with decorative elements */}
        <section className="relative py-24 bg-foreground overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
          </div>
          
          <div className="container-custom relative z-10">
            <VisualBreadcrumb 
              items={[{ label: t('services.page.title') }]} 
              className="mb-6 [&_a]:text-background/70 [&_a:hover]:text-primary [&_span[role=link]]:text-background [&_svg]:text-background/50"
            />
            <div className="max-w-3xl">
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4 animate-fade-in">
                {t('services.page.catalog')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mt-3 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {t('services.page.allServices')}
              </h1>
              <p className="text-background/80 text-lg md:text-xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {t('services.page.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Services Directory with Masonry Layout */}
        <section className="section-padding relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-40 left-0 w-80 h-80 bg-muted/50 rounded-full blur-2xl" />
          </div>
          
          <div className="container-custom relative z-10">
            {/* Masonry-style grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category, categoryIndex) => (
                <div 
                  key={category.id} 
                  className={cn(
                    "group relative animate-fade-in",
                    category.featured && categoryIndex === 0 && "md:col-span-2 lg:col-span-2",
                    category.featured && categoryIndex === 3 && "lg:row-span-2"
                  )}
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  {/* Category Card with shine effect */}
                  <div className="relative h-full rounded-2xl border border-border bg-card p-6 md:p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30">
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </div>
                    
                    {/* Category header */}
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
                    
                    {/* Service items */}
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <Link 
                          key={item.name} 
                          to={item.path} 
                          className="group/item flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-all duration-300"
                          style={{ animationDelay: `${(categoryIndex * 0.1) + (itemIndex * 0.05)}s` }}
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
                    
                    {/* Decorative corner accent */}
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA with gorgeous design */}
        <section className="relative py-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-background/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-background/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-background/40 rounded-full animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-background/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-background/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="container-custom relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in">
              {t('services.page.cta.title')}
            </h2>
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('services.page.cta.description')}
            </p>
            <a href="tel:+359893712919" className="inline-block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <Phone className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                +359 89 371 29 19
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ServicesPage;
