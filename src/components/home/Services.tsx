import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Paintbrush,
  Droplets,
  Hammer,
  Layers,
  Grid3X3,
  Zap,
  Wrench,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

// Service images
import fullRenovationImg from "@/assets/images/services/full-renovation.jpg";
import bathroomImg from "@/assets/images/services/bathroom.jpg";
import kitchenImg from "@/assets/images/services/kitchen.jpg";
import microcementImg from "@/assets/images/services/microcement.jpg";
import terrazzoImg from "@/assets/images/services/terrazzo.jpg";
import flakeFloorImg from "@/assets/images/services/flake-floor.jpg";
import stoneCarpetImg from "@/assets/images/services/stone-carpet.jpg";
import karteneImg from "@/assets/images/services/kartene.png";
import paintingImg from "@/assets/images/services/painting.jpg";
import flooringImg from "@/assets/images/services/flooring.jpg";
import electricalImg from "@/assets/images/services/electrical.jpg";
import plumbingImg from "@/assets/images/services/plumbing.jpg";

const Services = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      id: "full-renovations",
      titleKey: "services.category.full",
      icon: Home,
      gradient: "from-primary/20 via-primary/5 to-transparent",
      accentColor: "primary",
      services: [
        {
          id: "full-renovation",
          path: "/services/full-renovation",
          icon: Home,
          titleKey: "service.fullRenovation.title",
          descKey: "service.fullRenovation.desc",
          image: fullRenovationImg,
          featured: true,
        },
        {
          id: "bathroom",
          path: "/services/bathroom",
          icon: Droplets,
          titleKey: "service.bathroom.title",
          descKey: "service.bathroom.desc",
          image: bathroomImg,
        },
        {
          id: "kitchen",
          path: "/services/kitchen",
          icon: Grid3X3,
          titleKey: "service.kitchen.title",
          descKey: "service.kitchen.desc",
          image: kitchenImg,
        },
      ],
    },
    {
      id: "specialized-coatings",
      titleKey: "services.category.coatings",
      icon: Layers,
      gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
      accentColor: "amber",
      services: [
        {
          id: "microcement",
          path: "/services/microcement",
          icon: Layers,
          titleKey: "service.microcement.title",
          descKey: "service.microcement.desc",
          image: microcementImg,
          featured: true,
        },
        {
          id: "terrazzo",
          path: "/services/terrazzo",
          icon: Sparkles,
          titleKey: "service.terrazzo.title",
          descKey: "service.terrazzo.desc",
          image: terrazzoImg,
        },
        {
          id: "flake-floor",
          path: "/services/flake-floor",
          icon: Layers,
          titleKey: "service.flakeFloor.title",
          descKey: "service.flakeFloor.desc",
          image: flakeFloorImg,
        },
        {
          id: "stone-carpet",
          path: "/services/stone-carpet",
          icon: Layers,
          titleKey: "service.stoneCarpet.title",
          descKey: "service.stoneCarpet.desc",
          image: stoneCarpetImg,
        },
      ],
    },
    {
      id: "preparation-finishing",
      titleKey: "services.category.finishing",
      icon: Paintbrush,
      gradient: "from-foreground/10 via-foreground/5 to-transparent",
      accentColor: "foreground",
      services: [
        {
          id: "demolition",
          path: "/services/demolition",
          icon: Hammer,
          titleKey: "service.demolition.title",
          descKey: "service.demolition.desc",
          image: karteneImg,
        },
        {
          id: "painting",
          path: "/services/shpaklovka",
          icon: Paintbrush,
          titleKey: "service.painting.title",
          descKey: "service.painting.desc",
          image: paintingImg,
        },
        {
          id: "flooring",
          path: "/services/flooring",
          icon: Grid3X3,
          titleKey: "service.flooring.title",
          descKey: "service.flooring.desc",
          image: flooringImg,
        },
        {
          id: "electrical",
          path: "/services/electrical",
          icon: Zap,
          titleKey: "service.electrical.title",
          descKey: "service.electrical.desc",
          image: electricalImg,
        },
        {
          id: "plumbing",
          path: "/services/plumbing",
          icon: Wrench,
          titleKey: "service.plumbing.title",
          descKey: "service.plumbing.desc",
          image: plumbingImg,
        },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 md:mb-20 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              {t('services.label')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">{t('services.title').split(' ').slice(0, -1).join(' ')} </span>
            <span className="text-primary">{t('services.title').split(' ').slice(-1)}</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Category Tabs - Pill Style */}
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300",
                  activeCategory === category.id
                    ? "bg-foreground text-background shadow-lg shadow-foreground/20 scale-105"
                    : "bg-muted hover:bg-muted/80 text-foreground hover:shadow-md"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-colors",
                  activeCategory === category.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
                <span>{t(category.titleKey)}</span>
                <span className={cn(
                  "ml-1 px-2 py-0.5 rounded-full text-xs font-bold transition-colors",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground/20 text-muted-foreground"
                )}>
                  {category.services.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid - Masonry-like Layout */}
        <div className={cn(
          "transition-all duration-700 delay-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {currentCategory.services.map((service, index) => {
              const Icon = service.icon;
              const isFeatured = service.featured;
              const isHovered = hoveredCard === service.id;

              return (
                <Link
                  key={service.id}
                  to={service.path}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl transition-all duration-500",
                    isFeatured && "lg:col-span-2 lg:row-span-2",
                    isHovered ? "scale-[1.02] z-10" : "scale-100"
                  )}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Card Container */}
                  <div className={cn(
                    "relative h-full min-h-[280px] md:min-h-[320px] bg-card rounded-2xl overflow-hidden",
                    "shadow-lg hover:shadow-2xl transition-shadow duration-500",
                    "border border-border/50 hover:border-primary/30"
                  )}>
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <img
                        src={service.image}
                        alt={t(service.titleKey)}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-700",
                          isHovered ? "scale-110" : "scale-100"
                        )}
                      />
                      {/* Gradient Overlay */}
                      <div className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        "bg-gradient-to-t from-foreground via-foreground/60 to-foreground/20",
                        isHovered ? "opacity-90" : "opacity-80"
                      )} />
                      
                      {/* Animated Shine Effect */}
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent",
                        "translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"
                      )} />
                    </div>

                    {/* Content */}
                    <div className="relative h-full p-6 md:p-8 flex flex-col justify-end">
                      {/* Icon Badge */}
                      <div className={cn(
                        "absolute top-6 left-6 w-12 h-12 rounded-xl flex items-center justify-center",
                        "bg-primary/90 backdrop-blur-sm shadow-lg",
                        "transition-transform duration-300",
                        isHovered ? "scale-110 rotate-3" : "scale-100"
                      )}>
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>

                      {/* Featured Badge */}
                      {isFeatured && (
                        <div className="absolute top-6 right-6">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                            <Sparkles className="h-3 w-3" />
                            {t('services.featured') || 'Featured'}
                          </span>
                        </div>
                      )}

                      {/* Title & Description */}
                      <div className="space-y-3">
                        <h3 className={cn(
                          "text-2xl md:text-3xl font-bold text-background transition-transform duration-300",
                          isHovered ? "translate-y-0" : "translate-y-1"
                        )}>
                          {t(service.titleKey)}
                        </h3>
                        <p className={cn(
                          "text-background/80 text-sm md:text-base leading-relaxed line-clamp-2 transition-all duration-300",
                          isHovered ? "opacity-100 translate-y-0" : "opacity-90 translate-y-1"
                        )}>
                          {t(service.descKey)}
                        </p>
                      </div>

                      {/* CTA Arrow */}
                      <div className={cn(
                        "mt-6 flex items-center gap-2 text-primary font-semibold transition-all duration-300",
                        isHovered ? "gap-4" : "gap-2"
                      )}>
                        <span className="text-sm uppercase tracking-wider">{t('services.learnMore')}</span>
                        <div className={cn(
                          "w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300",
                          isHovered ? "w-12" : "w-10"
                        )}>
                          <ArrowRight className={cn(
                            "h-5 w-5 text-primary-foreground transition-transform duration-300",
                            isHovered ? "translate-x-1" : ""
                          )} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <div className={cn(
          "text-center mt-16 transition-all duration-1000 delay-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Link to="/services">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-foreground hover:bg-foreground/90 text-background px-10 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('services.viewAll')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
