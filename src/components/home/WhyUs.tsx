import { Users, Focus, MessageSquare, Calculator, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const WhyUs = () => {
  const { t } = useLanguage();
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

  const reasons = [
    {
      icon: Users,
      titleKey: 'whyUs.experts.title',
      descKey: 'whyUs.experts.desc',
      accent: 'from-primary/20 to-primary/5',
    },
    {
      icon: Focus,
      titleKey: 'whyUs.detail.title',
      descKey: 'whyUs.detail.desc',
      accent: 'from-primary/15 to-primary/5',
    },
    {
      icon: MessageSquare,
      titleKey: 'whyUs.communication.title',
      descKey: 'whyUs.communication.desc',
      accent: 'from-primary/20 to-primary/5',
    },
    {
      icon: Calculator,
      titleKey: 'whyUs.budget.title',
      descKey: 'whyUs.budget.desc',
      accent: 'from-primary/15 to-primary/5',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-[120px]" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            <span className="w-8 h-0.5 bg-primary" />
            {t('whyUs.label')}
            <span className="w-8 h-0.5 bg-primary" />
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            {t('whyUs.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('whyUs.subtitle')}
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.titleKey}
              className={`group text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-3 overflow-hidden h-full">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-primary/30">
                      <reason.icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 rounded-3xl border-2 border-dashed border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin" style={{ animationDuration: '20s' }} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {t(reason.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(reason.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sofia badge with enhanced styling */}
        <div 
          className={`mt-14 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5 text-foreground px-8 py-4 rounded-full border border-border/50 shadow-lg backdrop-blur-sm group hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <span className="font-semibold text-lg">{t('whyUs.location')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
